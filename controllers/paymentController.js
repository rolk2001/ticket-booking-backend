/**
 * @file paymentController.js
 * @brief Contrôleur pour la gestion des paiements et de l'intégration NotchPay.
 * Gère l'initiation, la réception de webhook et la génération de tickets.
 */
// controllers/paymentController.js
const axios = require('axios');
const Payment = require('../models/Payment');
const Reservation = require('../models/Reservation');
const Schedule = require('../models/Schedule');
const Ticket = require('../models/Ticket');
const qrcode = require('qrcode');

/**
 * @brief (Obsolète) Simule le paiement et la génération de ticket.
 * @param {Object} req Requête HTTP Express.
 * @param {Object} res Réponse HTTP Express.
 * @returns {void}
 * @deprecated
 * @example
 * processPayment(req, res);
 */
exports.processPayment = async (req, res) => {
  // Cette fonction est maintenant obsolète, nous utilisons le webhook
  res.status(404).json({ message: "Cette route n'est plus utilisée." });
};

/**
 * @brief Gère le webhook NotchPay pour la confirmation de paiement et la génération du ticket.
 * @param {Object} req Requête HTTP Express.
 * @param {Object} res Réponse HTTP Express.
 * @returns {void}
 * @example
 * handleNotchPayWebhook(req, res);
 */
exports.handleNotchPayWebhook = async (req, res) => {
  console.log('Webhook NotchPay reçu !', req.body);

  console.log('\n==============================');
  console.log('==> NOTCHPAY WEBHOOK APPELÉ <==');
  console.log('==============================\n');
  console.log('\n--- WEBHOOK NOTCH PAY REÇU ---');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Headers:', req.headers);
  console.log('Body complet:', JSON.stringify(req.body, null, 2));

  const event = req.body;

  // NotchPay envoie le statut dans event.status ou event.data.status
  const status = event.status || (event.data && event.data.status);

  if (status === 'complete' || status === 'success') {
    // Pour compatibilité, on récupère la transaction dans event ou event.data
    const transaction = event.data || event;
    console.log('Événement "payment.complete" détecté.');
    console.log('Données de transaction reçues:', JSON.stringify(transaction, null, 2));

    // Hypothèse : la référence est dans `merchant_reference`.
    const merchantReference = transaction.merchant_reference || transaction.reference;
    if (!merchantReference) {
      console.error('ERREUR: Impossible de trouver une référence de marchand (merchant_reference) dans le payload du webhook.');
      return res.status(400).send('Référence de marchand manquante.');
    }
    console.log('Référence de marchand utilisée:', merchantReference);

    // Extraire l'ID de réservation de la référence (format: reservationId_timestamp)
    const reservationId = merchantReference.split('_')[0];
    console.log(`ID de réservation extrait: ${reservationId}`);

    try {
      // On populate pour avoir les détails nécessaires pour le ticket
      const reservation = await Reservation.findById(reservationId)
        .populate('user')
        .populate({
          path: 'schedule',
          populate: [
            { path: 'bus' },
            { path: 'terminal_depart' },
            { path: 'terminal_arrivee' }
          ]
        });

      if (!reservation) {
        console.error(`Webhook: Réservation non trouvée pour la référence ${reservationId}`);
        return res.status(404).send('Réservation non trouvée.');
      }

      if (reservation.statut === 'confirmée') {
        console.log(`Webhook: La réservation ${reservationId} est déjà confirmée.`);
        return res.status(200).send('Réservation déjà confirmée.');
      }

      reservation.statut = 'confirmée';
      
      const payment = new Payment({
        reservation_id: reservation._id,
        montant: transaction.amount,
        moyen: transaction.channel || 'NotchPay',
        status: 'succès',
        transaction_id: transaction.id,
      });

      // Les données à encoder dans le QR code
      const ticketData = {
        reservationId: reservation._id.toString(),
        passager: reservation.user.nom,
        email: reservation.user.email,
        trajet: `${reservation.schedule.terminal_depart.nom} -> ${reservation.schedule.terminal_arrivee.nom}`,
        date: new Date(reservation.schedule.date_depart).toLocaleDateString('fr-FR'),
        heure: new Date(reservation.schedule.date_depart).toLocaleTimeString('fr-FR'),
        bus: reservation.schedule.bus.nom,
        places: reservation.nombre_places,
        transactionId: transaction.id
      };

      // Génération du QR code
      const qrCodeDataURL = await qrcode.toDataURL(JSON.stringify(ticketData));

      const ticket = new Ticket({
        reservation_id: reservation._id,
        user_id: reservation.user._id,
        schedule_id: reservation.schedule._id,
        qr_code: qrCodeDataURL
      });
      
      // On sauvegarde tout en parallèle pour plus d'efficacité
      await Promise.all([
        reservation.save(),
        payment.save(),
        ticket.save()
      ]);

      console.log(`Webhook: Paiement confirmé et ticket créé pour la réservation ${reservationId}`);
      
    } catch (error) {
      console.error(`Webhook: ERREUR lors du traitement de la réservation ${reservationId}:`, error);
      return res.status(500).send('Erreur interne du serveur.');
    }
  } else {
    console.log(`Événement de statut "${status}" reçu et ignoré.`);
  }

  // Toujours répondre rapidement à Notch Pay avec un statut 200
  console.log('Réponse au webhook: Statut 200 - OK');
  res.status(200).send('Webhook reçu avec succès.');
};

/**
 * @brief Initialise un paiement NotchPay pour une réservation donnée.
 * @param {Object} req Requête HTTP Express (body: reservationId).
 * @param {Object} res Réponse HTTP Express.
 * @returns {void}
 * @example
 * initiatePayment(req, res);
 */
exports.initiatePayment = async (req, res) => {
  console.log('=== DÉBUT initiatePayment ===');
  console.log('Body reçu:', req.body);
  console.log('User:', req.user);
  
  const { reservationId } = req.body;
  const userId = req.user.userId; // Correction: utiliser userId au lieu de id

  console.log('Recherche avec:', { reservationId, userId });

  try {
    const reservation = await Reservation.findOne({ _id: reservationId, user: userId })
      .populate('user')
      .populate({
        path: 'schedule',
        populate: [
          { path: 'terminal_depart' },
          { path: 'terminal_arrivee' }
        ]
      });

    console.log('Réservation trouvée:', reservation ? 'OUI' : 'NON');
    if (reservation) {
      console.log('Détails réservation:', {
        id: reservation._id,
        statut: reservation.statut,
        user: reservation.user ? reservation.user.nom : 'N/A',
        schedule: reservation.schedule ? 'OUI' : 'NON'
      });
    }

    if (!reservation) {
      console.log(`Réservation non trouvée: reservationId=${reservationId}, userId=${userId}`);
      return res.status(404).json({ message: 'Réservation non trouvée ou non autorisée.' });
    }

    if (reservation.statut === 'confirmée') {
        return res.status(400).json({ message: 'Cette réservation est déjà confirmée.' });
    }

    console.log('Calcul du montant...');
    const totalAmount = reservation.schedule.prix * reservation.nombre_places;
    const user = reservation.user;
    const schedule = reservation.schedule;

    console.log('Données pour Notch Pay:', {
      totalAmount,
      userNom: user.nom,
      userEmail: user.email,
      depart: schedule.terminal_depart ? schedule.terminal_depart.nom : 'N/A',
      arrivee: schedule.terminal_arrivee ? schedule.terminal_arrivee.nom : 'N/A'
    });

    const notchPayData = {
      amount: totalAmount,
      currency: 'XAF',
      description: `Paiement pour ${reservation.nombre_places} ticket(s) - ${schedule.terminal_depart.nom} vers ${schedule.terminal_arrivee.nom}`,
      // Générer une référence unique en ajoutant un timestamp
      reference: `${reservation._id.toString()}_${Date.now()}`,
      customer: {
        email: user.email,
        name: user.nom,
        phone: user.telephone
      },
      // L'URL où Notch Pay enverra le statut final du paiement
      callback_url: `${process.env.BACKEND_URL}/api/payments/notchpay-webhook`,
    };

    const notchPayHeaders = {
      'Authorization': process.env.NOTCHPAY_PUBLIC_KEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    
    console.log("Initiating payment with Notch Pay:", notchPayData);
    console.log("Headers:", notchPayHeaders);

    const response = await axios.post('https://api.notchpay.co/payments', notchPayData, { headers: notchPayHeaders });

    console.log("Notch Pay response:", response.data);

    if (response.data.status === 'Accepted') {
       // On met à jour ou on crée un paiement avec le statut 'initié'
       await Payment.findOneAndUpdate(
        { reservation_id: reservation._id },
        {
          montant: totalAmount,
          moyen: 'NotchPay',
          status: 'en attente',
          transaction_id: response.data.transaction.reference,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      
      // On renvoie l'URL de paiement au frontend
      res.json({ authorization_url: response.data.authorization_url });
    } else {
      res.status(400).json({ message: 'Impossible d\'initier le paiement avec Notch Pay.', details: response.data });
    }

  } catch (error) {
    console.error('=== ERREUR DÉTAILLÉE ===');
    console.error('Type d\'erreur:', error.constructor.name);
    console.error('Message:', error.message);
    if (error.response) {
      console.error('Réponse API:', error.response.data);
      console.error('Status:', error.response.status);
    }
    console.error('Stack trace:', error.stack);
    console.error('Erreur lors de l\'initiation du paiement Notch Pay:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Erreur serveur lors de l\'initiation du paiement.' });
  }
};
/**
 * @file reservationController.js
 * @module controllers/reservationController
 * @brief Contrôleur pour la gestion des réservations : création, consultation et sièges réservés.
 * @description Permet de créer une réservation, de consulter les réservations de l'utilisateur connecté et de récupérer les sièges réservés pour un horaire donné. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
 */
// controllers/reservationController.js
const Reservation = require('../models/Reservation');
const Schedule = require('../models/Schedule');
const Ticket = require('../models/Ticket');
const QRCode = require('qrcode');

/**
 * Crée une nouvelle réservation et génère un ticket avec QR code.
 *
 * @function creerReservation
 * @memberof module:controllers/reservationController
 * @param {Express.Request} req - Requête HTTP Express (body: schedule, nombre_places, seat). L'utilisateur doit être authentifié (req.user.userId).
 * @param {Express.Response} res - Réponse HTTP Express.
 * @returns {Promise<void>} Réponse JSON contenant la réservation et le ticket généré, ou un message d'erreur.
 *
 * @throws {404} Si l'horaire n'est pas trouvé.
 * @throws {400} Si pas assez de places disponibles.
 * @throws {500} Si une erreur survient lors de la création.
 *
 * @example
 * // Appel depuis une route Express
 * router.post('/reservation', creerReservation);
 *
 * @see module:models/Reservation
 * @see module:models/Ticket
 * @see module:models/Schedule
 * @see module:models/User
 * @see module:models/Message
 * @see module:utils/sendOtpMail
 */

const Message = require('../models/Message');
const User = require('../models/User');
const sendMail = require('../utils/sendOtpMail');

exports.creerReservation = async (req, res) => {
  try {
    const { schedule: scheduleId, nombre_places, seat } = req.body;
    const userId = req.user.userId;

    // On veut le bus pour le nom de compagnie
    const schedule = await Schedule.findById(scheduleId).populate('bus');
    if (!schedule) {
      return res.status(404).json({ message: "Horaire non trouvé" });
    }

    if (schedule.places_disponibles < nombre_places) {
      return res.status(400).json({ message: "Pas assez de places disponibles" });
    }

    // Créer la réservation
    const reservation = new Reservation({ 
      user: userId, 
      schedule: scheduleId, 
      nombre_places 
    });
    await reservation.save();


    // Récupérer l'utilisateur pour le QR code
    const user = await User.findById(userId);
    // Date de paiement = date de création du ticket (sera créée juste après)
    // Date de départ = schedule.date_depart
    // Numéro de siège = seat
    // Email = user.email
    // Nom = user.nom
    // On prépare un objet JSON pour le QR code
    const qrPayload = {
      nom: user?.nom || '',
      email: user?.email || '',
      siege: seat || 'Non assigné',
      datePaiement: new Date().toISOString(),
      dateDepart: schedule.date_depart ? new Date(schedule.date_depart).toISOString() : '',
    };
    const qrText = JSON.stringify(qrPayload);
    const qr_code = await QRCode.toDataURL(qrText);

    // Créer le ticket avec le QR code
    const ticket = new Ticket({
      reservation_id: reservation._id,
      user_id: userId,
      schedule: scheduleId,
      seat: seat || 'Non assigné',
      qr_code
    });
    await ticket.save();

    schedule.places_disponibles -= nombre_places;
    await schedule.save();

    // --- ENVOI MESSAGE AUTOMATIQUE ---
    if (user) {
      const subject = "Confirmation de réservation";
      const bodyText = `Bonjour ${user.nom || ''},\n\nVotre réservation a bien été prise en compte. Merci de procéder au paiement dans les 30 minutes, sans quoi elle sera annulée automatiquement.\n\nCordialement,\nL’équipe Ticket Bus CM`;
      const bodyHtml = bodyText.replace(/\n/g, '<br>');
      // Message interne
      const message = new Message({
        to: [userId],
        from: null,
        subject,
        body: bodyText,
      });
      await message.save();
      // Email
      await sendMail(user.email, subject, bodyHtml);
    }

    res.status(201).json({ message: "Réservation créée avec succès", reservation, ticket });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la réservation.", error: error.message });
  }
};

/**
 * Récupère les réservations de l'utilisateur connecté.
 *
 * @function mesReservations
 * @memberof module:controllers/reservationController
 * @param {Express.Request} req - Requête HTTP Express (utilisateur authentifié).
 * @param {Express.Response} res - Réponse HTTP Express.
 * @returns {Promise<void>} Réponse JSON contenant la liste des réservations ou un message d'erreur.
 *
 * @throws {500} Si une erreur survient lors de la récupération.
 *
 * @example
 * // Appel depuis une route Express
 * router.get('/mes-reservations', mesReservations);
 *
 * @see module:models/Reservation
 */
exports.mesReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.userId })
      .populate({
        path: 'schedule',
        populate: [
          { path: 'bus' },
          { path: 'terminal_depart' },
          { path: 'terminal_arrivee' }
        ]
      })
      .sort({ createdAt: -1 });

    res.json(reservations);
  } catch (error) {
    console.error("Erreur dans mesReservations:", error);
    res.status(500).json({ message: "Erreur lors de la récupération de vos réservations.", error: error.message });
  }
};

/**
 * Récupère la liste des sièges réservés pour un horaire donné.
 *
 * @function getReservedSeats
 * @memberof module:controllers/reservationController
 * @param {Express.Request} req - Requête HTTP Express (params: scheduleId).
 * @param {Express.Response} res - Réponse HTTP Express.
 * @returns {Promise<void>} Réponse JSON contenant la liste des sièges réservés ou un message d'erreur.
 *
 * @throws {500} Si une erreur survient lors de la récupération.
 *
 * @example
 * // Appel depuis une route Express
 * router.get('/reserved-seats/:scheduleId', getReservedSeats);
 *
 * @see module:models/Ticket
 */
exports.getReservedSeats = async (req, res) => {
  try {
    const { scheduleId } = req.params;
    const tickets = await Ticket.find({ schedule: scheduleId });
    const reservedSeats = tickets
      .map(t => t.seat)
      .filter(seat => seat && seat !== 'Non assigné');
    res.json(reservedSeats);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des sièges réservés.", error: error.message });
  }
};
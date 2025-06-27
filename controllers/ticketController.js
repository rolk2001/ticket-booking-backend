const Ticket = require('../models/Ticket');
const Reservation = require('../models/Reservation');

/**
 * @file ticketController.js
 * @module controllers/ticketController
 * @brief Contrôleur pour la gestion des tickets : récupération par réservation et sièges réservés.
 * @description Permet de récupérer le ticket associé à une réservation et la liste des sièges réservés pour un horaire donné. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
 */

/**
 * @brief Récupère le ticket associé à une réservation pour l'utilisateur connecté.
 * @param {Object} req Requête HTTP Express (params: reservationId).
 * @param {Object} res Réponse HTTP Express.
 * @returns {void}
 * @example
 * getTicketByReservationId(req, res);
 */
exports.getTicketByReservationId = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const userId = req.user.userId;

    // 1. Vérifier que la réservation appartient bien à l'utilisateur connecté
    const reservation = await Reservation.findOne({ _id: reservationId, user: userId });
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée ou non autorisée.' });
    }

    // 2. Récupérer le ticket associé
    const ticket = await Ticket.findOne({ reservation_id: reservationId })
      .populate({
        path: 'reservation_id',
        populate: {
          path: 'schedule',
          populate: [
            { path: 'bus' },
            { path: 'terminal_depart' },
            { path: 'terminal_arrivee' }
          ]
        }
      })
      .populate('user_id', 'nom telephone'); // Récupérer le nom et le téléphone de l'utilisateur

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket non trouvé. Le paiement n\'a peut-être pas encore été traité.' });
    }

    res.json(ticket);

  } catch (error) {
    console.error('Erreur lors de la récupération du ticket:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

/**
 * @brief Récupère la liste des sièges réservés pour un horaire donné.
 * @param {Object} req Requête HTTP Express (params: scheduleId).
 * @param {Object} res Réponse HTTP Express.
 * @returns {void}
 * @example
 * getReservedSeats(req, res);
 */
exports.getReservedSeats = async (req, res) => {
  try {
    const { scheduleId } = req.params;
    // Attention au nom du champ : c'est "schedule" ou "schedule_id" selon ton modèle Ticket
    const tickets = await Ticket.find({ schedule: scheduleId });
    // Ne retourne que les sièges effectivement réservés (numéros valides)
    const reservedSeats = tickets
      .map(t => t.seat)
      .filter(seat => seat && seat !== 'Non assigné');
    res.json(reservedSeats);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des sièges réservés.' });
  }
};
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
 * Récupère le ticket associé à une réservation pour l'utilisateur connecté.
 *
 * @function getTicketByReservationId
 * @memberof module:controllers/ticketController
 * @param {Express.Request} req - Requête HTTP Express (params: reservationId, utilisateur authentifié).
 * @param {Express.Response} res - Réponse HTTP Express.
 * @returns {Promise<void>} Réponse JSON contenant le ticket ou un message d'erreur.
 *
 * @throws {404} Si la réservation n'est pas trouvée ou non autorisée.
 * @throws {404} Si le ticket n'est pas trouvé.
 * @throws {500} Si une erreur survient lors de la récupération.
 *
 * @example
 * // Appel depuis une route Express
 * router.get('/ticket/:reservationId', getTicketByReservationId);
 *
 * @see module:models/Ticket
 * @see module:models/Reservation
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
 * Récupère la liste des sièges réservés pour un horaire donné.
 *
 * @function getReservedSeats
 * @memberof module:controllers/ticketController
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
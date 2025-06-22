const Ticket = require('../models/Ticket');
const Reservation = require('../models/Reservation');

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
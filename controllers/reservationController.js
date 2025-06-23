// controllers/reservationController.js
const Reservation = require('../models/Reservation');
const Schedule = require('../models/Schedule');
const Ticket = require('../models/Ticket');

// Créer une réservation
exports.creerReservation = async (req, res) => {
  try {
    const { schedule: scheduleId, nombre_places, seat } = req.body;
    const userId = req.user.userId;

    const schedule = await Schedule.findById(scheduleId);
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

    // Créer le ticket avec le siège choisi
    const ticket = new Ticket({
      reservation_id: reservation._id,
      user_id: userId,
      schedule: scheduleId,
      seat: seat || 'Non assigné'
    });
    await ticket.save();

    schedule.places_disponibles -= nombre_places;
    await schedule.save();

    res.status(201).json({ message: "Réservation créée avec succès", reservation, ticket });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la réservation.", error: error.message });
  }
};

// Obtenir les réservations de l'utilisateur connecté
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

// Obtenir les sièges réservés pour un horaire donné
exports.getReservedSeats = async (req, res) => {
  const { scheduleId } = req.params;
  const tickets = await Ticket.find({ schedule_id: scheduleId });
  const reservedSeats = tickets.map(t => t.seat);
  res.json(reservedSeats);
};
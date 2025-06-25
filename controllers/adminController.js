const Bus = require('../models/Bus');
const Terminal = require('../models/Terminal');
const Schedule = require('../models/Schedule');
const Reservation = require('../models/Reservation');
const Ticket = require('../models/Ticket');
const Payment = require('../models/Payment');
const User = require('../models/User');
const Message = require('../models/Message');
const sendOtpMail = require('../utils/sendOtpMail'); // réutilise ton utilitaire mail

// ===== DASHBOARD STATISTIQUES =====
const getDashboardStats = async (req, res) => {
  try {
    const totalBuses = await Bus.countDocuments();
    const totalTerminals = await Terminal.countDocuments();
    const totalSchedules = await Schedule.countDocuments();
    const totalReservations = await Reservation.countDocuments();
    const totalTickets = await Ticket.countDocuments();
    const totalUsers = await User.countDocuments({ type: 'client' });
    
    // Réservations récentes
    const recentReservations = await Reservation.find()
      .populate('user', 'nom email')
      .populate('schedule')
      .sort({ createdAt: -1 })
      .limit(5);

    // Revenus (simulation)
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'succès' } },
      { $group: { _id: null, total: { $sum: '$montant' } } }
    ]);

    res.json({
      stats: {
        totalBuses,
        totalTerminals,
        totalSchedules,
        totalReservations,
        totalTickets,
        totalUsers,
        totalRevenue: totalRevenue[0]?.total || 0
      },
      recentReservations
    });
  } catch (error) {
    console.error('Erreur getDashboardStats:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ===== GESTION DES BUS =====
const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find().sort({ createdAt: -1 });
    res.json(buses);
  } catch (error) {
    console.error('Erreur getAllBuses:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const createBus = async (req, res) => {
  try {
    const { numero, capacite, compagnie, type_bus } = req.body;
    
    const newBus = new Bus({
      numero,
      capacite,
      compagnie,
      type_bus
    });
    
    await newBus.save();
    res.status(201).json(newBus);
  } catch (error) {
    console.error('Erreur createBus:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const bus = await Bus.findByIdAndUpdate(id, updateData, { new: true });
    if (!bus) {
      return res.status(404).json({ message: 'Bus non trouvé' });
    }
    
    res.json(bus);
  } catch (error) {
    console.error('Erreur updateBus:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const deleteBus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const bus = await Bus.findByIdAndDelete(id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus non trouvé' });
    }
    
    res.json({ message: 'Bus supprimé avec succès' });
  } catch (error) {
    console.error('Erreur deleteBus:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ===== GESTION DES TERMINAUX =====
const getAllTerminals = async (req, res) => {
  try {
    const terminals = await Terminal.find().sort({ createdAt: -1 });
    res.json(terminals);
  } catch (error) {
    console.error('Erreur getAllTerminals:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const createTerminal = async (req, res) => {
  try {
    const { nom, ville, adresse } = req.body;
    
    const newTerminal = new Terminal({
      nom,
      ville,
      adresse
    });
    
    await newTerminal.save();
    res.status(201).json(newTerminal);
  } catch (error) {
    console.error('Erreur createTerminal:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateTerminal = async (req, res) => {
  try {
    const { id } = req.params;
    const terminal = await Terminal.findByIdAndUpdate(id, req.body, { new: true });
    if (!terminal) {
      return res.status(404).json({ message: 'Terminal non trouvé' });
    }
    res.json(terminal);
  } catch (error) {
    console.error('Erreur updateTerminal:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const deleteTerminal = async (req, res) => {
  try {
    const { id } = req.params;
    const terminal = await Terminal.findByIdAndDelete(id);
    if (!terminal) {
      return res.status(404).json({ message: 'Terminal non trouvé' });
    }
    res.json({ message: 'Terminal supprimé avec succès' });
  } catch (error) {
    console.error('Erreur deleteTerminal:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ===== GESTION DES HORAIRES =====
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate('bus')
      .populate('terminal_depart')
      .populate('terminal_arrivee')
      .sort({ date_depart: -1 });
    res.json(schedules);
  } catch (error) {
    console.error('Erreur getAllSchedules:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const createSchedule = async (req, res) => {
  try {
    const { 
      bus, 
      terminal_depart, 
      terminal_arrivee, 
      date_depart, 
      date_arrivee, 
      prix, 
      places_disponibles 
    } = req.body;
    
    const newSchedule = new Schedule({
      bus,
      terminal_depart,
      terminal_arrivee,
      date_depart,
      date_arrivee,
      prix,
      places_disponibles
    });
    
    await newSchedule.save();
    
    // Récupérer le schedule avec les données populées
    const populatedSchedule = await Schedule.findById(newSchedule._id)
      .populate('bus')
      .populate('terminal_depart')
      .populate('terminal_arrivee');
    
    res.status(201).json(populatedSchedule);
  } catch (error) {
    console.error('Erreur createSchedule:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findByIdAndUpdate(id, req.body, { new: true })
      .populate('bus')
      .populate('terminal_depart')
      .populate('terminal_arrivee');
      
    if (!schedule) {
      return res.status(404).json({ message: 'Horaire non trouvé' });
    }
    res.json(schedule);
  } catch (error) {
    console.error('Erreur updateSchedule:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findByIdAndDelete(id);
    if (!schedule) {
      return res.status(404).json({ message: 'Horaire non trouvé' });
    }
    res.json({ message: 'Horaire supprimé avec succès' });
  } catch (error) {
    console.error('Erreur deleteSchedule:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ===== GESTION DES RÉSERVATIONS =====
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('user', 'nom email telephone')
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
    console.error('Erreur getAllReservations:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;
    
    const reservation = await Reservation.findByIdAndUpdate(
      id, 
      { statut }, 
      { new: true }
    ).populate('user schedule');
    
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    
    res.json(reservation);
  } catch (error) {
    console.error('Erreur updateReservationStatus:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ===== GESTION DES PAIEMENTS =====
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ status: 'succès' })
      .populate({
        path: 'reservation_id',
        populate: [
          {
            path: 'user',
            select: 'nom email telephone'
          },
          {
            path: 'schedule',
            populate: [
              { path: 'bus', select: 'numero compagnie' },
              { path: 'terminal_depart', select: 'nom ville' },
              { path: 'terminal_arrivee', select: 'nom ville' }
            ]
          }
        ]
      })
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    console.error('Erreur getAllPayments:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ===== GESTION DES TICKETS =====
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate('reservation')
      .populate({
        path: 'reservation',
        populate: [
          { path: 'user', select: 'nom email' },
          { path: 'schedule', populate: ['bus', 'terminal_depart', 'terminal_arrivee'] }
        ]
      })
      .sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    console.error('Erreur getAllTickets:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ===== GESTION DES UTILISATEURS =====
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ type: 'client' })
      .select('-mot_de_passe')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Erreur getAllUsers:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, email, telephone, type } = req.body;

    // On ne met à jour que les champs fournis
    const updateData = { nom, email, telephone, type };

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-mot_de_passe');
    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Erreur updateUser:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Sécurité : un admin ne peut pas se supprimer lui-même
    if (req.user.userId === id) {
      return res.status(400).json({ message: 'Un administrateur ne peut pas se supprimer lui-même.' });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur deleteUser:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { to, subject, body } = req.body;
    const message = new Message({ to, subject, body });
    await message.save();

    // Envoi d'e-mail à chaque destinataire
    const users = await User.find({ _id: { $in: to } });
    for (const user of users) {
      await sendOtpMail(user.email, `${subject}\n\n${body}`);
    }

    res.status(201).json({ message: 'Message envoyé et enregistré.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'envoi du message.' });
  }
};

const getAllMessages = async (req, res) => {
  const messages = await Message.find().populate('to', 'nom email').sort({ sentAt: -1 });
  res.json(messages);
};

const getUserMessages = async (req, res) => {
  const { userId } = req.params;
  const messages = await Message.find({ to: userId }).sort({ sentAt: -1 });
  res.json(messages);
};

const markAsRead = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  await Message.findByIdAndUpdate(id, { $addToSet: { readBy: userId } });
  res.json({ message: 'Message marqué comme lu.' });
};

const getInbox = async (req, res) => {
  try {
    const adminId = req.user._id;
    const messages = await Message.find({ to: { $in: [adminId] }, from: { $ne: null } })
      .sort({ sentAt: -1 })
      .populate('from', 'nom email');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la boîte de réception." });
  }
};

// ===== GESTION DES MESSAGES (SUPPRESSION) =====
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.json({ message: 'Message supprimé avec succès' });
  } catch (error) {
    console.error('Erreur deleteMessage:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  getDashboardStats,
  getAllBuses,
  createBus,
  updateBus,
  deleteBus,
  getAllTerminals,
  createTerminal,
  updateTerminal,
  deleteTerminal,
  getAllSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getAllReservations,
  updateReservationStatus,
  getAllPayments,
  getAllTickets,
  getAllUsers,
  updateUser,
  deleteUser,
  sendMessage,
  getAllMessages,
  getUserMessages,
  markAsRead,
  getInbox,
  deleteMessage
};
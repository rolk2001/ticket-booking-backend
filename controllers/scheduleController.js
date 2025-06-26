/**
 * Contrôleur pour la gestion des horaires : création, listing et récupération par ID.
 */
// controllers/scheduleController.js
const Schedule = require('../models/Schedule');
const Bus = require('../models/Bus');

/**
 * Crée un nouvel horaire pour un bus donné.
 * @route POST /api/schedules
 * @param {string} bus_id - Identifiant du bus
 * @param {string} origine - Terminal de départ
 * @param {string} destination - Terminal d'arrivée
 * @param {string} heure_depart - Heure de départ
 * @param {string} heure_arrivee - Heure d'arrivée
 * @param {number} prix - Prix du trajet
 * @returns {Object} Message de succès et horaire créé
 */
exports.creerHoraire = async (req, res) => {
  try {
    const { bus_id, origine, destination, heure_depart, heure_arrivee, prix } = req.body;
    
    const bus = await Bus.findById(bus_id);
    if (!bus) return res.status(404).json({ message: "Bus non trouvé" });

    if (origine === destination) {
      return res.status(400).json({ message: "L'origine et la destination ne peuvent pas être identiques." });
    }

    const schedule = new Schedule({
      bus_id,
      origine,
      destination,
      heure_depart,
      heure_arrivee,
      prix,
      places_disponibles: bus.capacite,
    });
    
    await schedule.save();
    res.status(201).json({ message: "Horaire créé avec succès", schedule });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Liste tous les horaires, avec possibilité de filtrer par origine, destination et date.
 * @route GET /api/schedules
 * @param {string} origine - Terminal de départ (query)
 * @param {string} destination - Terminal d'arrivée (query)
 * @param {string} date - Date du trajet (query)
 * @returns {Array} Liste des horaires
 */
exports.listerHoraires = async (req, res) => {
  try {
    const { origine, destination, date } = req.query;
    const filtre = {};

    if (origine) {
      filtre.terminal_depart = origine;
    }
    if (destination) {
      filtre.terminal_arrivee = destination;
    }
    if (date) {
      const debutJour = new Date(date);
      debutJour.setHours(0, 0, 0, 0);

      const finJour = new Date(date);
      finJour.setHours(23, 59, 59, 999);

      filtre.date_depart = { $gte: debutJour, $lte: finJour };
    }

    const schedules = await Schedule.find(filtre)
      .populate('bus')
      .populate('terminal_depart')
      .populate('terminal_arrivee');
      
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des horaires.", error: error.message });
  }
};

/**
 * Récupère un horaire par son identifiant.
 * @route GET /api/schedules/:id
 * @param {string} id - Identifiant de l'horaire
 * @returns {Object} Horaire ou message d'erreur
 */
exports.recupererHoraire = async (req, res) => {
  // ... (le reste du fichier reste inchangé)
};

// ... (on ajoutera modifier/supprimer plus tard si besoin)
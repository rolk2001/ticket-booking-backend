// controllers/scheduleController.js
const Schedule = require('../models/Schedule');
const Bus = require('../models/Bus');

// Créer un horaire
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

// Lister tous les horaires, avec possibilité de filtrer
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

// Récupérer un horaire par son ID
exports.recupererHoraire = async (req, res) => {
  // ... (le reste du fichier reste inchangé)
};

// ... (on ajoutera modifier/supprimer plus tard si besoin)
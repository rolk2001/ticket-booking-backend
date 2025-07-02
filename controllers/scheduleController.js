/**
 * @file scheduleController.js
 * @module controllers/scheduleController
 * @brief Contrôleur pour la gestion des horaires : création, listing et récupération par ID.
 * @description Permet de créer, lister et récupérer les horaires de bus. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
 */
// controllers/scheduleController.js
const Schedule = require('../models/Schedule');
const Bus = require('../models/Bus');

/**
 * Crée un nouvel horaire pour un bus donné.
 *
 * @function creerHoraire
 * @memberof module:controllers/scheduleController
 * @param {Express.Request} req - Requête HTTP Express (body: bus_id, origine, destination, heure_depart, heure_arrivee, prix).
 * @param {Express.Response} res - Réponse HTTP Express.
 * @returns {Promise<void>} Réponse JSON avec l'horaire créé ou un message d'erreur.
 *
 * @throws {404} Si le bus n'est pas trouvé.
 * @throws {400} Si l'origine et la destination sont identiques.
 * @throws {500} Si une erreur survient lors de la création.
 *
 * @example
 * // Appel depuis une route Express
 * router.post('/horaires', creerHoraire);
 *
 * @see module:models/Schedule
 * @see module:models/Bus
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
 *
 * @function listerHoraires
 * @memberof module:controllers/scheduleController
 * @param {Express.Request} req - Requête HTTP Express (query: origine, destination, date).
 * @param {Express.Response} res - Réponse HTTP Express.
 * @returns {Promise<void>} Réponse JSON contenant la liste des horaires ou un message d'erreur.
 *
 * @throws {500} Si une erreur survient lors de la récupération.
 *
 * @example
 * // Appel depuis une route Express
 * router.get('/horaires', listerHoraires);
 *
 * @see module:models/Schedule
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
 * @brief Récupère un horaire par son identifiant.
 * @param {Object} req Requête HTTP Express (params: id).
 * @param {Object} res Réponse HTTP Express.
 * @returns {void}
 * @example
 * recupererHoraire(req, res);
 */
exports.recupererHoraire = async (req, res) => {
  // ... (le reste du fichier reste inchangé)
};

// ... (on ajoutera modifier/supprimer plus tard si besoin)
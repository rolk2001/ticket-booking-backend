## Modules

<dl>
<dt><a href="#module_app">app</a></dt>
<dd><p>Configure les middlewares, les routes, la gestion des erreurs et les options CORS pour l'API Ticket Bus CM.</p>
</dd>
<dt><a href="#module_controllers/adminController">controllers/adminController</a></dt>
<dd><p>Permet d'obtenir des statistiques, de gérer les entités principales et de communiquer avec les utilisateurs. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.</p>
</dd>
<dt><a href="#module_controllers/authController">controllers/authController</a></dt>
<dd><p>authController.js</p>
</dd>
<dt><a href="#module_controllers/busController">controllers/busController</a></dt>
<dd><p>Permet d'ajouter, modifier et lister les bus. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.</p>
</dd>
<dt><a href="#module_controllers/paymentController">controllers/paymentController</a></dt>
<dd><p>Gère l'initiation, la réception de webhook et la génération de tickets. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.</p>
</dd>
<dt><a href="#module_controllers/reservationController">controllers/reservationController</a></dt>
<dd><p>Permet de créer une réservation, de consulter les réservations de l'utilisateur connecté et de récupérer les sièges réservés pour un horaire donné. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.</p>
</dd>
<dt><a href="#module_controllers/terminalController">controllers/terminalController</a></dt>
<dd><p>Permet d'ajouter, modifier et lister les terminaux. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.</p>
</dd>
<dt><a href="#module_controllers/ticketController">controllers/ticketController</a></dt>
<dd><p>Permet de récupérer le ticket associé à une réservation et la liste des sièges réservés pour un horaire donné. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.</p>
</dd>
<dt><a href="#module_controllers/userController">controllers/userController</a></dt>
<dd><p>Permet de récupérer, supprimer et répondre aux messages. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.</p>
</dd>
<dt><a href="#module_routes/admin">routes/admin</a></dt>
<dd><p>Toutes les routes sont protégées par le middleware admin. Permet la gestion complète des entités du système Ticket Bus CM.</p>
</dd>
<dt><a href="#module_routes/auth">routes/auth</a></dt>
<dd><p>Permet la gestion de l'inscription, de la connexion, de la demande et vérification d'OTP, et de la modification du profil utilisateur.</p>
</dd>
<dt><a href="#module_routes/bus">routes/bus</a></dt>
<dd><p>Permet d'ajouter, modifier et lister les bus via l'API REST.</p>
</dd>
<dt><a href="#module_routes/payment">routes/payment</a></dt>
<dd><p>Permet d'initier un paiement et de gérer les webhooks NotchPay via l'API REST.</p>
</dd>
<dt><a href="#module_routes/reservation">routes/reservation</a></dt>
<dd><p>Permet de créer une réservation et de consulter les réservations de l'utilisateur connecté via l'API REST.</p>
</dd>
<dt><a href="#module_routes/schedule">routes/schedule</a></dt>
<dd><p>Permet de créer, lister les horaires et récupérer les sièges réservés via l'API REST.</p>
</dd>
<dt><a href="#module_routes/ticket">routes/ticket</a></dt>
<dd><p>Permet de récupérer un ticket par l'ID de la réservation via l'API REST.</p>
</dd>
<dt><a href="#module_routes/user">routes/user</a></dt>
<dd><p>Permet à l'utilisateur de consulter, supprimer et répondre à des messages via l'API REST. Toutes les routes sont protégées par le middleware d'authentification.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#connectDB">connectDB()</a> → <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Initialise la connexion à la base de données MongoDB à partir de l'URI stockée dans la variable d'environnement MONGODB_URI. Arrête le serveur en cas d'échec de connexion.</p>
</dd>
<dt><a href="#connectDB">connectDB()</a></dt>
<dd><p>Initialise la connexion à la base de données MongoDB avec Mongoose.
Utilise l'URI stockée dans la variable d'environnement MONGODB_URI.
Arrête le serveur en cas d'échec de connexion.</p>
</dd>
<dt><a href="#createAdminUser">createAdminUser()</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>À lancer manuellement pour initialiser un compte admin. Utilise Mongoose pour la connexion et Bcrypt pour le hash du mot de passe.</p>
</dd>
<dt><a href="#sendOtpMail">sendOtpMail(email, otp)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Utilise Nodemailer pour envoyer un email avec un code OTP à l'utilisateur. Les identifiants sont récupérés depuis les variables d'environnement.</p>
</dd>
<dt><a href="#utils/sendOtpMail">utils/sendOtpMail(email, subject, htmlContent)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Envoie un email générique (OTP ou message personnalisé)</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Bus">Bus</a> : <code>Object</code></dt>
<dd><p>Bus.js</p>
</dd>
<dt><a href="#EmailVerification">EmailVerification</a> : <code>Object</code></dt>
<dd><p>EmailVerification.js</p>
</dd>
<dt><a href="#Message">Message</a> : <code>Object</code></dt>
<dd><p>Message.js</p>
</dd>
<dt><a href="#Payment">Payment</a> : <code>Object</code></dt>
<dd><p>Payment.js</p>
</dd>
<dt><a href="#Reservation">Reservation</a> : <code>Object</code></dt>
<dd><p>Reservation.js</p>
</dd>
<dt><a href="#Schedule">Schedule</a> : <code>Object</code></dt>
<dd><p>Schedule.js</p>
</dd>
<dt><a href="#Terminal">Terminal</a> : <code>Object</code></dt>
<dd><p>Terminal.js</p>
</dd>
<dt><a href="#Ticket">Ticket</a> : <code>Object</code></dt>
<dd><p>Ticket.js</p>
</dd>
<dt><a href="#User">User</a> : <code>Object</code></dt>
<dd><p>User.js</p>
</dd>
</dl>

<a name="module_app"></a>

## app
Configure les middlewares, les routes, la gestion des erreurs et les options CORS pour l'API Ticket Bus CM.

**Brief**: Fichier principal de configuration de l'application Express pour Ticket Bus CM.  
**Routes**: - GET /             : Test API
  - /api/auth         : Authentification
  - /api/bus          : Gestion des bus
  - /api/terminaux    : Gestion des terminaux
  - /api/schedules    : Gestion des horaires
  - /api/reservations : Gestion des réservations
  - /api/payments     : Paiements
  - /api/tickets      : Tickets
  - /api/admin        : Administration
  - /api/user         : Utilisateur  
**Date**: 2024-06-01  
**See**

- server.js pour le démarrage du serveur
- config/db.js pour la connexion à la base de données

**Version**: 1.0  
**Author**: UV PROJET CODE Team  
<a name="module_controllers/adminController"></a>

## controllers/adminController
Permet d'obtenir des statistiques, de gérer les entités principales et de communiquer avec les utilisateurs. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.

**Brief**: Contrôleur administrateur pour la gestion centralisée des bus, terminaux, horaires, réservations, paiements, tickets, utilisateurs et messages.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  

* [controllers/adminController](#module_controllers/adminController)
    * _static_
        * [.getDashboardStats(req, res)](#module_controllers/adminController.getDashboardStats) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.getAllBuses(req, res)](#module_controllers/adminController.getAllBuses) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.createBus(req, res)](#module_controllers/adminController.createBus) ⇒ <code>Promise.&lt;void&gt;</code>
    * _inner_
        * [~updateBus(id)](#module_controllers/adminController..updateBus) ⇒ <code>Object</code>
        * [~deleteBus(id)](#module_controllers/adminController..deleteBus) ⇒ <code>Object</code>
        * [~getAllTerminals()](#module_controllers/adminController..getAllTerminals) ⇒ <code>Array</code>
        * [~createTerminal(nom, ville, adresse)](#module_controllers/adminController..createTerminal) ⇒ <code>Object</code>
        * [~updateTerminal(id)](#module_controllers/adminController..updateTerminal) ⇒ <code>Object</code>
        * [~deleteTerminal(id)](#module_controllers/adminController..deleteTerminal) ⇒ <code>Object</code>
        * [~getAllSchedules()](#module_controllers/adminController..getAllSchedules) ⇒ <code>Array</code>
        * [~createSchedule(bus, terminal_depart, terminal_arrivee, date_depart, date_arrivee, prix, places_disponibles)](#module_controllers/adminController..createSchedule) ⇒ <code>Object</code>
        * [~updateSchedule(id)](#module_controllers/adminController..updateSchedule) ⇒ <code>Object</code>
        * [~deleteSchedule(id)](#module_controllers/adminController..deleteSchedule) ⇒ <code>Object</code>
        * [~getAllReservations()](#module_controllers/adminController..getAllReservations) ⇒ <code>Array</code>
        * [~updateReservationStatus(id, statut)](#module_controllers/adminController..updateReservationStatus) ⇒ <code>Object</code>
        * [~getAllPayments()](#module_controllers/adminController..getAllPayments) ⇒ <code>Array</code>
        * [~getAllTickets()](#module_controllers/adminController..getAllTickets) ⇒ <code>Array</code>
        * [~getAllUsers()](#module_controllers/adminController..getAllUsers) ⇒ <code>Array</code>
        * [~updateUser(id, nom, email, telephone, type)](#module_controllers/adminController..updateUser) ⇒ <code>Object</code>
        * [~deleteUser(id)](#module_controllers/adminController..deleteUser) ⇒ <code>Object</code>
        * [~sendMessage(to, subject, body)](#module_controllers/adminController..sendMessage) ⇒ <code>Object</code>
        * [~getAllMessages()](#module_controllers/adminController..getAllMessages) ⇒ <code>Array</code>
        * [~getUserMessages(userId)](#module_controllers/adminController..getUserMessages) ⇒ <code>Array</code>
        * [~markAsRead(id, userId)](#module_controllers/adminController..markAsRead) ⇒ <code>Object</code>
        * [~getInbox()](#module_controllers/adminController..getInbox) ⇒ <code>Array<code>

<a name="module_controllers/adminController.getDashboardStats"></a>

### controllers/adminController.getDashboardStats(req, res) → <code>Promise.&lt;void&gt;</code>
Récupère les statistiques du dashboard admin (bus, terminaux, réservations, revenus, etc.).

**Kind**: static method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON contenant les statistiques et réservations récentes ou un message d'erreur.  
**Throws**:

- <code>500</code> Si une erreur survient lors de la récupération.

**See**

- module:models/Bus
- module:models/Terminal
- module:models/Schedule
- module:models/Reservation
- module:models/Ticket
- module:models/Payment
- module:models/User


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express. |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.get('/admin/dashboard', getDashboardStats);
```
<a name="module_controllers/adminController.getAllBuses"></a>

### controllers/adminController.getAllBuses(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Liste tous les bus.

**Kind**: static method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON contenant la liste des bus ou un message d'erreur.  
**Throws**:

- <code>500</code> Si une erreur survient lors de la récupération.

**See**: module:models/Bus  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express. |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.get('/admin/buses', getAllBuses);
```
<a name="module_controllers/adminController.createBus"></a>

### controllers/adminController.createBus(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Crée un nouveau bus.

**Kind**: static method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON contenant le bus créé ou un message d'erreur.  
**Throws**:

- <code>500</code> Si une erreur survient lors de la création.

**See**: module:models/Bus  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express (body: numero, capacite, compagnie, type_bus). |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.post('/admin/buses', createBus);
```
<a name="module_controllers/adminController..updateBus"></a>

### controllers/adminController~updateBus(id) ⇒ <code>Object</code>
Modifie un bus existant.

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Object</code> - Bus modifié ou message d'erreur  
**Route**: PUT /api/admin/buses/:id  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identifiant du bus |

<a name="module_controllers/adminController..deleteBus"></a>

### controllers/adminController~deleteBus(id) ⇒ <code>Object</code>
Supprime un bus.

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Object</code> - Message de succès ou d'erreur  
**Route**: DELETE /api/admin/buses/:id  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identifiant du bus |

<a name="module_controllers/adminController..getAllTerminals"></a>

### controllers/adminController~getAllTerminals() ⇒ <code>Array</code>
Liste tous les terminaux.

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Array</code> - Liste des terminaux  
**Route**: GET /api/admin/terminals  
<a name="module_controllers/adminController..createTerminal"></a>

### controllers/adminController~createTerminal(nom, ville, adresse) ⇒ <code>Object</code>
Crée un nouveau terminal.

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Object</code> - Terminal créé  
**Route**: POST /api/admin/terminals  

| Param | Type | Description |
| --- | --- | --- |
| nom | <code>string</code> | Nom du terminal |
| ville | <code>string</code> | Ville du terminal |
| adresse | <code>string</code> | Adresse du terminal |

<a name="module_controllers/adminController..updateTerminal"></a>

### controllers/adminController~updateTerminal(id) ⇒ <code>Object</code>
Modifie un terminal existant.

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Object</code> - Terminal modifié ou message d'erreur  
**Route**: PUT /api/admin/terminals/:id  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identifiant du terminal |

<a name="module_controllers/adminController..deleteTerminal"></a>

### controllers/adminController~deleteTerminal(id) ⇒ <code>Object</code>
Supprime un terminal.

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Object</code> - Message de succès ou d'erreur  
**Route**: DELETE /api/admin/terminals/:id  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identifiant du terminal |

<a name="module_controllers/adminController..getAllSchedules"></a>

### controllers/adminController~getAllSchedules() ⇒ <code>Array</code>
Liste tous les horaires.

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Array</code> - Liste des horaires  
**Route**: GET /api/admin/schedules  
<a name="module_controllers/adminController..createSchedule"></a>

### controllers/adminController~createSchedule(bus, terminal_depart, terminal_arrivee, date_depart, date_arrivee, prix, places_disponibles) ⇒ <code>Object</code>
Crée un nouvel horaire.

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Object</code> - Horaire créé  
**Route**: POST /api/admin/schedules  

| Param | Type | Description |
| --- | --- | --- |
| bus | <code>string</code> | Bus associé |
| terminal_depart | <code>string</code> | Terminal de départ |
| terminal_arrivee | <code>string</code> | Terminal d'arrivée |
| date_depart | <code>string</code> | Date de départ |
| date_arrivee | <code>string</code> | Date d'arrivée |
| prix | <code>number</code> | Prix du trajet |
| places_disponibles | <code>number</code> | Nombre de places disponibles |

<a name="module_controllers/adminController..updateSchedule"></a>

### controllers/adminController~updateSchedule(id) ⇒ <code>Object</code>
Modifie un horaire existant.

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Object</code> - Horaire modifié ou message d'erreur  
**Route**: PUT /api/admin/schedules/:id  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identifiant de l'horaire |

<a name="module_controllers/adminController..deleteSchedule"></a>

### controllers/adminController~deleteSchedule(id) ⇒ <code>Object</code>
Supprime un horaire.

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Object</code> - Message de succès ou d'erreur  
**Route**: DELETE /api/admin/schedules/:id  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identifiant de l'horaire |

<a name="module_controllers/adminController..getAllReservations"></a>

### controllers/adminController~getAllReservations() ⇒ <code>Array</code>
Liste toutes les réservations.

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Array</code> - Liste des réservations  
**Route**: GET /api/admin/reservations  
<a name="module_controllers/adminController..updateReservationStatus"></a>

### controllers/adminController~updateReservationStatus(id, statut) ⇒ <code>Object</code>
Modifie le statut d'une réservation.

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Object</code> - Réservation modifiée ou message d'erreur  
**Route**: PUT /api/admin/reservations/:id  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identifiant de la réservation |
| statut | <code>string</code> | Nouveau statut |

<a name="module_controllers/adminController..getAllPayments"></a>

### controllers/adminController~getAllPayments() ⇒ <code>Array</code>
Liste tous les paiements confirmés.

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Array</code> - Liste des paiements  
**Route**: GET /api/admin/payments  
<a name="module_controllers/adminController..getAllTickets"></a>

### controllers/adminController~getAllTickets() ⇒ <code>Array</code>
Liste tous les tickets.

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Array</code> - Liste des tickets  
**Route**: GET /api/admin/tickets  
<a name="module_controllers/adminController..getAllUsers"></a>

### controllers/adminController~getAllUsers() ⇒ <code>Array</code>
Liste tous les utilisateurs (clients).

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Array</code> - Liste des utilisateurs  
**Route**: GET /api/admin/users  
<a name="module_controllers/adminController..updateUser"></a>

### controllers/adminController~updateUser(id, nom, email, telephone, type) ⇒ <code>Object</code>
Modifie un utilisateur.

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Object</code> - Utilisateur modifié ou message d'erreur  
**Route**: PUT /api/admin/users/:id  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identifiant de l'utilisateur |
| nom | <code>string</code> | Nom (optionnel) |
| email | <code>string</code> | Email (optionnel) |
| telephone | <code>string</code> | Téléphone (optionnel) |
| type | <code>string</code> | Type d'utilisateur (optionnel) |

<a name="module_controllers/adminController..deleteUser"></a>

### controllers/adminController~deleteUser(id) ⇒ <code>Object</code>
Supprime un utilisateur (sauf soi-même).

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Object</code> - Message de succès ou d'erreur  
**Route**: DELETE /api/admin/users/:id  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identifiant de l'utilisateur |

<a name="module_controllers/adminController..sendMessage"></a>

### controllers/adminController~sendMessage(to, subject, body) ⇒ <code>Object</code>
Envoie un message à un ou plusieurs utilisateurs.

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Object</code> - Message envoyé  
**Route**: POST /api/admin/messages  

| Param | Type | Description |
| --- | --- | --- |
| to | <code>Array.&lt;string&gt;</code> | Destinataires |
| subject | <code>string</code> | Sujet du message |
| body | <code>string</code> | Contenu du message |

<a name="module_controllers/adminController..getAllMessages"></a>

### controllers/adminController~getAllMessages() ⇒ <code>Array</code>
Liste tous les messages envoyés.

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Array</code> - Liste des messages  
**Route**: GET /api/admin/messages  
<a name="module_controllers/adminController..getUserMessages"></a>

### controllers/adminController~getUserMessages(userId) ⇒ <code>Array</code>
Liste les messages reçus par un utilisateur donné.

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Array</code> - Liste des messages  
**Route**: GET /api/admin/messages/user/:userId  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | Identifiant de l'utilisateur |

<a name="module_controllers/adminController..markAsRead"></a>

### controllers/adminController~markAsRead(id, userId) ⇒ <code>Object</code>
Marque un message comme lu pour un utilisateur.

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Object</code> - Message de confirmation  
**Route**: POST /api/admin/messages/:id/read  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identifiant du message |
| userId | <code>string</code> | Identifiant de l'utilisateur |

<a name="module_controllers/adminController..getInbox"></a>

### controllers/adminController~getInbox() ⇒ <code>Array</code>
Récupère la boîte de réception de l'admin (messages reçus).

**Kind**: inner method of [<code>controllers/adminController</code>](#module_controllers/adminController)  
**Returns**: <code>Array</code> - Liste des messages reçus  
**Route**: GET /api/admin/inbox  
<a name="module_controllers/authController"></a>

## controllers/authController
authController.js

**Brief**: Contrôleur d'authentification pour la gestion des utilisateurs : inscription, connexion, OTP, et mise à jour du profil. Gère aussi la vérification d'email via OTP.  

* [controllers/authController](#module_controllers/authController)
    * [.register(req, res)](#module_controllers/authController.register) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.login(req, res)](#module_controllers/authController.login) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.updateProfile(nom, email, telephone, photo)](#module_controllers/authController.updateProfile) ⇒ <code>Object</code>
    * [.requestSignupOtp(email)](#module_controllers/authController.requestSignupOtp) ⇒ <code>Object</code>
    * [.verifyOtpAndRegister(email, otp, nom, mot_de_passe, telephone)](#module_controllers/authController.verifyOtpAndRegister) ⇒ <code>Object</code>
    * [.requestResetOtp(email)](#module_controllers/authController.requestResetOtp) ⇒ <code>Object</code>
    * [.resetPassword(email, otp, newPassword)](#module_controllers/authController.resetPassword) ⇒ <code>Object</code>

<a name="module_controllers/authController.register"></a>

### controllers/authController.register(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Inscrit un nouvel utilisateur.

**Kind**: static method of [<code>controllers/authController</code>](#module_controllers/authController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON avec message de succès ou d'erreur.  
**Throws**:

- <code>400</code> Si l'email est déjà utilisé.
- <code>500</code> Si une erreur survient lors de l'inscription.

**See**: module:models/User  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express (body: nom, email, mot_de_passe, telephone, type). |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.post('/auth/register', register);
```
<a name="module_controllers/authController.login"></a>

### controllers/authController.login(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Connecte un utilisateur existant.

**Kind**: static method of [<code>controllers/authController</code>](#module_controllers/authController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON avec token JWT et infos utilisateur ou message d'erreur.  
**Throws**:

- <code>400</code> Si email ou mot de passe incorrect.
- <code>500</code> Si une erreur survient lors de la connexion.

**See**: module:models/User  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express (body: email, mot_de_passe). |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.post('/auth/login', login);
```
<a name="module_controllers/authController.updateProfile"></a>

### controllers/authController.updateProfile(nom, email, telephone, photo) ⇒ <code>Object</code>
Met à jour le profil de l'utilisateur connecté.

**Kind**: static method of [<code>controllers/authController</code>](#module_controllers/authController)  
**Returns**: <code>Object</code> - Utilisateur mis à jour ou message d'erreur  
**Route**: PUT /api/auth/profile  

| Param | Type | Description |
| --- | --- | --- |
| nom | <code>string</code> | Nouveau nom (optionnel) |
| email | <code>string</code> | Nouvel email (optionnel) |
| telephone | <code>string</code> | Nouveau téléphone (optionnel) |
| photo | <code>string</code> | Nouvelle photo (optionnel) |

<a name="module_controllers/authController.requestSignupOtp"></a>

### controllers/authController.requestSignupOtp(email) ⇒ <code>Object</code>
Demande l'envoi d'un OTP pour l'inscription.

**Kind**: static method of [<code>controllers/authController</code>](#module_controllers/authController)  
**Returns**: <code>Object</code> - Message de succès ou d'erreur  
**Route**: POST /api/auth/request-otp  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | Email pour lequel envoyer l'OTP |

<a name="module_controllers/authController.verifyOtpAndRegister"></a>

### controllers/authController.verifyOtpAndRegister(email, otp, nom, mot_de_passe, telephone) ⇒ <code>Object</code>
Vérifie l'OTP et crée le compte utilisateur.

**Kind**: static method of [<code>controllers/authController</code>](#module_controllers/authController)  
**Returns**: <code>Object</code> - Message de succès ou d'erreur  
**Route**: POST /api/auth/verify-otp  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | Email à vérifier |
| otp | <code>string</code> | Code OTP reçu |
| nom | <code>string</code> | Nom de l'utilisateur |
| mot_de_passe | <code>string</code> | Mot de passe |
| telephone | <code>string</code> | Numéro de téléphone |

<a name="module_controllers/authController.requestResetOtp"></a>

### controllers/authController.requestResetOtp(email) ⇒ <code>Object</code>
Demande l'envoi d'un OTP pour la réinitialisation du mot de passe.

**Kind**: static method of [<code>controllers/authController</code>](#module_controllers/authController)  
**Returns**: <code>Object</code> - Message de succès ou d'erreur  
**Route**: POST /api/auth/request-reset-otp  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | Email pour lequel envoyer l'OTP |

<a name="module_controllers/authController.resetPassword"></a>

### controllers/authController.resetPassword(email, otp, newPassword) ⇒ <code>Object</code>
Réinitialise le mot de passe après vérification de l'OTP.

**Kind**: static method of [<code>controllers/authController</code>](#module_controllers/authController)  
**Returns**: <code>Object</code> - Message de succès ou d'erreur  
**Route**: POST /api/auth/reset-password  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | Email à vérifier |
| otp | <code>string</code> | Code OTP reçu |
| newPassword | <code>string</code> | Nouveau mot de passe |

<a name="module_controllers/busController"></a>

## controllers/busController
Permet d'ajouter, modifier et lister les bus. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.

**Brief**: Contrôleur pour la gestion des bus : ajout, modification et listing.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  

* [controllers/busController](#module_controllers/busController)
    * [.ajouterBus(req, res)](#module_controllers/busController.ajouterBus) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.modifierBus(req, res)](#module_controllers/busController.modifierBus) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.listerBus(req, res)](#module_controllers/busController.listerBus) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="module_controllers/busController.ajouterBus"></a>

### controllers/busController.ajouterBus(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Ajoute un nouveau bus.

**Kind**: static method of [<code>controllers/busController</code>](#module_controllers/busController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON avec message de succès ou d'erreur.  
**Throws**:

- <code>400</code> Si un champ obligatoire est manquant.
- <code>500</code> Si une erreur survient lors de l'ajout.

**See**: module:models/Bus  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express (body: numero, capacite, compagnie, type_bus, status). |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.post('/bus', ajouterBus);
```
<a name="module_controllers/busController.modifierBus"></a>

### controllers/busController.modifierBus(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Modifie un bus existant.

**Kind**: static method of [<code>controllers/busController</code>](#module_controllers/busController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON avec message de succès ou d'erreur.  
**Throws**:

- <code>404</code> Si le bus n'est pas trouvé.
- <code>500</code> Si une erreur survient lors de la modification.

**See**: module:models/Bus  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express (params: id, body: champs à modifier). |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.put('/bus/:id', modifierBus);
```
<a name="module_controllers/busController.listerBus"></a>

### controllers/busController.listerBus(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Liste tous les bus.

**Kind**: static method of [<code>controllers/busController</code>](#module_controllers/busController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON contenant la liste des bus ou un message d'erreur.  
**Throws**:

- <code>500</code> Si une erreur survient lors de la récupération.

**See**: module:models/Bus  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express. |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.get('/bus', listerBus);
```
<a name="module_controllers/paymentController"></a>

## controllers/paymentController
Gère l'initiation, la réception de webhook et la génération de tickets. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.

**Brief**: Contrôleur pour la gestion des paiements et de l'intégration NotchPay.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  

* [controllers/paymentController](#module_controllers/paymentController)
    * ~~[.processPayment(req, res)](#module_controllers/paymentController.processPayment) ⇒ <code>Promise.&lt;void&gt;</code>~~
    * [.handleNotchPayWebhook(req, res)](#module_controllers/paymentController.handleNotchPayWebhook) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.initiatePayment(req, res)](#module_controllers/paymentController.initiatePayment) ⇒ <code>void</code>

<a name="module_controllers/paymentController.processPayment"></a>

### ~~controllers/paymentController.processPayment(req, res) ⇒ <code>Promise.&lt;void&gt;</code>~~
***Déprécié***

(Obsolète) Simule le paiement et la génération de ticket.

**Kind**: static method of [<code>controllers/paymentController</code>](#module_controllers/paymentController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON d'erreur (cette route n'est plus utilisée).  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express. |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.post('/payment/process', processPayment);
```
<a name="module_controllers/paymentController.handleNotchPayWebhook"></a>

### controllers/paymentController.handleNotchPayWebhook(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Gère le webhook NotchPay pour la confirmation de paiement et la génération du ticket.

**Kind**: static method of [<code>controllers/paymentController</code>](#module_controllers/paymentController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON selon le traitement du paiement.  
**Throws**:

- <code>400</code> Si la référence de marchand est manquante.
- <code>404</code> Si la réservation n'est pas trouvée.
- <code>500</code> Si une erreur survient lors du traitement du paiement.

**See**

- module:models/Payment
- module:models/Reservation
- module:models/Ticket


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express (webhook NotchPay). |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.post('/payment/webhook', handleNotchPayWebhook);
```
<a name="module_controllers/paymentController.initiatePayment"></a>

### controllers/paymentController.initiatePayment(req, res) ⇒ <code>void</code>
**Kind**: static method of [<code>controllers/paymentController</code>](#module_controllers/paymentController)  
**Brief**: Initialise un paiement NotchPay pour une réservation donnée.  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | Requête HTTP Express (body: reservationId). |
| res | <code>Object</code> | Réponse HTTP Express. |

**Example**  
```js
initiatePayment(req, res);
```
<a name="module_controllers/reservationController"></a>

## controllers/reservationController
Permet de créer une réservation, de consulter les réservations de l'utilisateur connecté et de récupérer les sièges réservés pour un horaire donné. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.

**Brief**: Contrôleur pour la gestion des réservations : création, consultation et sièges réservés.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  

* [controllers/reservationController](#module_controllers/reservationController)
    * [.creerReservation(req, res)](#module_controllers/reservationController.creerReservation) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.mesReservations(req, res)](#module_controllers/reservationController.mesReservations) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.getReservedSeats(req, res)](#module_controllers/reservationController.getReservedSeats) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="module_controllers/reservationController.creerReservation"></a>

### controllers/reservationController.creerReservation(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Crée une nouvelle réservation et génère un ticket avec QR code.

**Kind**: static method of [<code>controllers/reservationController</code>](#module_controllers/reservationController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON contenant la réservation et le ticket généré, ou un message d'erreur.  
**Throws**:

- <code>404</code> Si l'horaire n'est pas trouvé.
- <code>400</code> Si pas assez de places disponibles.
- <code>500</code> Si une erreur survient lors de la création.

**See**

- module:models/Reservation
- module:models/Ticket
- module:models/Schedule
- module:models/User
- module:models/Message
- module:utils/sendOtpMail


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express (body: schedule, nombre_places, seat). L'utilisateur doit être authentifié (req.user.userId). |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.post('/reservation', creerReservation);
```
<a name="module_controllers/reservationController.mesReservations"></a>

### controllers/reservationController.mesReservations(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Récupère les réservations de l'utilisateur connecté.

**Kind**: static method of [<code>controllers/reservationController</code>](#module_controllers/reservationController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON contenant la liste des réservations ou un message d'erreur.  
**Throws**:

- <code>500</code> Si une erreur survient lors de la récupération.

**See**: module:models/Reservation  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express (utilisateur authentifié). |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.get('/mes-reservations', mesReservations);
```
<a name="module_controllers/reservationController.getReservedSeats"></a>

### controllers/reservationController.getReservedSeats(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Récupère la liste des sièges réservés pour un horaire donné.

**Kind**: static method of [<code>controllers/reservationController</code>](#module_controllers/reservationController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON contenant la liste des sièges réservés ou un message d'erreur.  
**Throws**:

- <code>500</code> Si une erreur survient lors de la récupération.

**See**: module:models/Ticket  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express (params: scheduleId). |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.get('/reserved-seats/:scheduleId', getReservedSeats);
```
<a name="module_controllers/scheduleController"></a>

## controllers/scheduleController
Permet de créer, lister et récupérer les horaires de bus. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.

**Brief**: Contrôleur pour la gestion des horaires : création, listing et récupération par ID.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  

* [controllers/scheduleController](#module_controllers/scheduleController)
    * [.creerHoraire(req, res)](#module_controllers/scheduleController.creerHoraire) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.listerHoraires(req, res)](#module_controllers/scheduleController.listerHoraires) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.recupererHoraire(req, res)](#module_controllers/scheduleController.recupererHoraire) ⇒ <code>void</code>

<a name="module_controllers/scheduleController.creerHoraire"></a>

### controllers/scheduleController.creerHoraire(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Crée un nouvel horaire pour un bus donné.

**Kind**: static method of [<code>controllers/scheduleController</code>](#module_controllers/scheduleController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON avec l'horaire créé ou un message d'erreur.  
**Throws**:

- <code>404</code> Si le bus n'est pas trouvé.
- <code>400</code> Si l'origine et la destination sont identiques.
- <code>500</code> Si une erreur survient lors de la création.

**See**

- module:models/Schedule
- module:models/Bus


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express (body: bus_id, origine, destination, heure_depart, heure_arrivee, prix). |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.post('/horaires', creerHoraire);
```
<a name="module_controllers/scheduleController.listerHoraires"></a>

### controllers/scheduleController.listerHoraires(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Liste tous les horaires, avec possibilité de filtrer par origine, destination et date.

**Kind**: static method of [<code>controllers/scheduleController</code>](#module_controllers/scheduleController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON contenant la liste des horaires ou un message d'erreur.  
**Throws**:

- <code>500</code> Si une erreur survient lors de la récupération.

**See**: module:models/Schedule  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express (query: origine, destination, date). |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.get('/horaires', listerHoraires);
```
<a name="module_controllers/scheduleController.recupererHoraire"></a>

### controllers/scheduleController.recupererHoraire(req, res) ⇒ <code>void</code>
**Kind**: static method of [<code>controllers/scheduleController</code>](#module_controllers/scheduleController)  
**Brief**: Récupère un horaire par son identifiant.  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | Requête HTTP Express (params: id). |
| res | <code>Object</code> | Réponse HTTP Express. |

**Example**  
```js
recupererHoraire(req, res);
```
<a name="module_controllers/terminalController"></a>

## controllers/terminalController
Permet d'ajouter, modifier et lister les terminaux. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.

**Brief**: Contrôleur pour la gestion des terminaux : ajout, modification et listing.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  

* [controllers/terminalController](#module_controllers/terminalController)
    * [.ajouterTerminal(req, res)](#module_controllers/terminalController.ajouterTerminal) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.modifierTerminal(req, res)](#module_controllers/terminalController.modifierTerminal) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.listerTerminaux(req, res)](#module_controllers/terminalController.listerTerminaux) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="module_controllers/terminalController.ajouterTerminal"></a>

### controllers/terminalController.ajouterTerminal(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Ajoute un nouveau terminal.

**Kind**: static method of [<code>controllers/terminalController</code>](#module_controllers/terminalController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON avec message de succès ou d'erreur.  
**Throws**:

- <code>500</code> Si une erreur survient lors de l'ajout.

**See**: module:models/Terminal  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express (body: ville_destination, terminal_info). |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.post('/terminaux', ajouterTerminal);
```
<a name="module_controllers/terminalController.modifierTerminal"></a>

### controllers/terminalController.modifierTerminal(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Modifie un terminal existant.

**Kind**: static method of [<code>controllers/terminalController</code>](#module_controllers/terminalController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON avec message de succès ou d'erreur.  
**Throws**:

- <code>404</code> Si le terminal n'est pas trouvé.
- <code>500</code> Si une erreur survient lors de la modification.

**See**: module:models/Terminal  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express (params: id, body: champs à modifier). |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.put('/terminaux/:id', modifierTerminal);
```
<a name="module_controllers/terminalController.listerTerminaux"></a>

### controllers/terminalController.listerTerminaux(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Liste tous les terminaux.

**Kind**: static method of [<code>controllers/terminalController</code>](#module_controllers/terminalController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON contenant la liste des terminaux ou un message d'erreur.  
**Throws**:

- <code>500</code> Si une erreur survient lors de la récupération.

**See**: module:models/Terminal  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express. |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.get('/terminaux', listerTerminaux);
```
<a name="module_controllers/ticketController"></a>

## controllers/ticketController
Permet de récupérer le ticket associé à une réservation et la liste des sièges réservés pour un horaire donné. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.

**Brief**: Contrôleur pour la gestion des tickets : récupération par réservation et sièges réservés.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  

* [controllers/ticketController](#module_controllers/ticketController)
    * [.getTicketByReservationId(req, res)](#module_controllers/ticketController.getTicketByReservationId) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.getReservedSeats(req, res)](#module_controllers/ticketController.getReservedSeats) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="module_controllers/ticketController.getTicketByReservationId"></a>

### controllers/ticketController.getTicketByReservationId(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Récupère le ticket associé à une réservation pour l'utilisateur connecté.

**Kind**: static method of [<code>controllers/ticketController</code>](#module_controllers/ticketController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON contenant le ticket ou un message d'erreur.  
**Throws**:

- <code>404</code> Si la réservation n'est pas trouvée ou non autorisée.
- <code>404</code> Si le ticket n'est pas trouvé.
- <code>500</code> Si une erreur survient lors de la récupération.

**See**

- module:models/Ticket
- module:models/Reservation


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express (params: reservationId, utilisateur authentifié). |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.get('/ticket/:reservationId', getTicketByReservationId);
```
<a name="module_controllers/ticketController.getReservedSeats"></a>

### controllers/ticketController.getReservedSeats(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Récupère la liste des sièges réservés pour un horaire donné.

**Kind**: static method of [<code>controllers/ticketController</code>](#module_controllers/ticketController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON contenant la liste des sièges réservés ou un message d'erreur.  
**Throws**:

- <code>500</code> Si une erreur survient lors de la récupération.

**See**: module:models/Ticket  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express (params: scheduleId). |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.get('/reserved-seats/:scheduleId', getReservedSeats);
```
<a name="module_controllers/userController"></a>

## controllers/userController
Permet de récupérer, supprimer et répondre aux messages. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.

**Brief**: Contrôleur utilisateur pour la gestion des messages et des interactions avec l'admin.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  

* [controllers/userController](#module_controllers/userController)
    * [.getMyMessages(req, res)](#module_controllers/userController.getMyMessages) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.deleteMyMessage(req, res)](#module_controllers/userController.deleteMyMessage) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.replyToAdmin(req, res)](#module_controllers/userController.replyToAdmin) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="module_controllers/userController.getMyMessages"></a>

### controllers/userController.getMyMessages(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Récupère les messages de l'utilisateur connecté.

**Kind**: static method of [<code>controllers/userController</code>](#module_controllers/userController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON contenant la liste des messages reçus ou un message d'erreur.  
**Throws**:

- <code>500</code> Si une erreur survient lors de la récupération.

**See**: module:models/Message  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express (utilisateur authentifié). |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.get('/user/messages', getMyMessages);
```
<a name="module_controllers/userController.deleteMyMessage"></a>

### controllers/userController.deleteMyMessage(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Permet à l'utilisateur de supprimer un de ses messages.

**Kind**: static method of [<code>controllers/userController</code>](#module_controllers/userController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON de succès ou message d'erreur.  
**Throws**:

- <code>500</code> Si une erreur survient lors de la suppression.

**See**: module:models/Message  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express (params: id, utilisateur authentifié). |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.delete('/user/messages/:id', deleteMyMessage);
```
<a name="module_controllers/userController.replyToAdmin"></a>

### controllers/userController.replyToAdmin(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Permet à l'utilisateur de répondre à l'admin.

**Kind**: static method of [<code>controllers/userController</code>](#module_controllers/userController)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Réponse JSON de succès ou message d'erreur.  
**Throws**:

- <code>500</code> Si une erreur survient lors de l'envoi du message.

**See**

- module:models/Message
- module:models/User


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Express.Request</code> | Requête HTTP Express (body: subject, body, utilisateur authentifié). |
| res | <code>Express.Response</code> | Réponse HTTP Express. |

**Example**  
```js
// Appel depuis une route Express
router.post('/user/reply-admin', replyToAdmin);
```
<a name="module_routes/admin"></a>

## routes/admin
Toutes les routes sont protégées par le middleware admin. Permet la gestion complète des entités du système Ticket Bus CM.

**Brief**: Routes d'administration pour la gestion centralisée des bus, terminaux, horaires, réservations, paiements, tickets, utilisateurs et messages.  
**Date**: 2024-06-01  
**Route**: GET /api/admin/dashboard Statistiques du dashboard  
**Route**: GET/POST/PUT/DELETE /api/admin/buses Gestion des bus  
**Route**: GET/POST/PUT/DELETE /api/admin/terminals Gestion des terminaux  
**Route**: GET/POST/PUT/DELETE /api/admin/schedules Gestion des horaires  
**Route**: GET/PUT /api/admin/reservations Gestion des réservations  
**Route**: GET /api/admin/payments Gestion des paiements  
**Route**: GET /api/admin/tickets Gestion des tickets  
**Route**: GET/PUT/DELETE /api/admin/users Gestion des utilisateurs  
**Route**: POST/GET/PUT /api/admin/messages Gestion des messages  
**Route**: GET /api/admin/messages/inbox Boîte de réception admin  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  
<a name="module_routes/auth"></a>

## routes/auth
Permet la gestion de l'inscription, de la connexion, de la demande et vérification d'OTP, et de la modification du profil utilisateur.

**Brief**: Routes d'authentification : connexion, inscription, OTP, modification de profil.  
**Date**: 2024-06-01  
**Route**: POST /api/auth/login Connexion utilisateur  
**Route**: PUT /api/auth/profile Modification du profil utilisateur (protégée)  
**Route**: POST /api/auth/request-signup-otp Demande d'OTP pour inscription  
**Route**: POST /api/auth/verify-otp-register Vérification OTP et inscription  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  
<a name="module_routes/bus"></a>

## routes/bus
Permet d'ajouter, modifier et lister les bus via l'API REST.

**Brief**: Routes pour la gestion des bus (ajout, modification, listing).  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  
<a name="module_routes/payment"></a>

## routes/payment
Permet d'initier un paiement et de gérer les webhooks NotchPay via l'API REST.

**Brief**: Routes pour l'initiation des paiements et la gestion des webhooks de paiement.  
**Date**: 2024-06-01  
**Route**: POST /api/payment/initiate-payment Initie un paiement (protégée)  
**Route**: POST /api/payment/notchpay-webhook Webhook NotchPay (non protégée)  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  
<a name="module_routes/reservation"></a>

## routes/reservation
Permet de créer une réservation et de consulter les réservations de l'utilisateur connecté via l'API REST.

**Brief**: Routes pour la création et la consultation des réservations de tickets.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  
<a name="module_routes/schedule"></a>

## routes/schedule
Permet de créer, lister les horaires et récupérer les sièges réservés via l'API REST.

**Brief**: Routes pour la gestion des horaires de bus et la récupération des sièges réservés.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  
<a name="module_routes/ticket"></a>

## routes/ticket
Permet de récupérer un ticket par l'ID de la réservation via l'API REST.

**Brief**: Routes pour la gestion et la récupération des tickets de réservation.  
**Date**: 2024-06-01  
**Route**: GET /api/ticket/:reservationId Récupère un ticket par l'ID de la réservation (protégée)  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  
<a name="module_routes/user"></a>

## routes/user
Permet à l'utilisateur de consulter, supprimer et répondre à des messages via l'API REST. Toutes les routes sont protégées par le middleware d'authentification.

**Brief**: Routes utilisateur pour la gestion des messages et la communication avec l'admin.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  
<a name="connectDB"></a>

## connectDB() → <code>Promise.&lt;void&gt;</code>
Initialise la connexion à la base de données MongoDB à partir de l'URI stockée dans la variable d'environnement MONGODB_URI. Arrête le serveur en cas d'échec de connexion.

**Kind**: global function  
**Returns**: <code>Promise.&lt;void&gt;</code> - Une promesse qui se résout si la connexion est réussie  
**Throws**:

- <code>Error</code> En cas d'échec de connexion

**Brief**: Configuration de la connexion à la base de données MongoDB avec Mongoose.  
**Date**: 2024-06-01  
**See**: https://mongoosejs.com/docs/  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  
<a name="connectDB"></a>

## connectDB()
Initialise la connexion à la base de données MongoDB avec Mongoose.
Utilise l'URI stockée dans la variable d'environnement MONGODB_URI.
Arrête le serveur en cas d'échec de connexion.

**Kind**: global function  
<a name="createAdminUser"></a>

## createAdminUser() ⇒ <code>Promise.&lt;void&gt;</code>
À lancer manuellement pour initialiser un compte admin. Utilise Mongoose pour la connexion et Bcrypt pour le hash du mot de passe.

**Kind**: global function  
**Returns**: <code>Promise.&lt;void&gt;</code> - Une promesse qui se résout quand l'utilisateur admin est créé  
**Throws**:

- <code>Error</code> En cas d'échec de connexion ou de création

**Brief**: Script utilitaire pour créer un utilisateur administrateur par défaut dans la base de données.  
**Date**: 2024-06-01  
**See**: models/User.js pour le modèle utilisateur  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  
**Example**  
```js
// Depuis la ligne de commande :
node createAdmin.js
```
<a name="sendOtpMail"></a>

## sendOtpMail(email, otp) ⇒ <code>Promise.&lt;void&gt;</code>
Utilise Nodemailer pour envoyer un email avec un code OTP à l'utilisateur. Les identifiants sont récupérés depuis les variables d'environnement.

**Kind**: global function  
**Returns**: <code>Promise.&lt;void&gt;</code> - Une promesse qui se résout quand l'email est envoyé  
**Throws**:

- <code>Error</code> En cas d'échec d'envoi de l'email

**Brief**: Utilitaire pour envoyer un email contenant un code OTP à l'utilisateur pour la vérification d'email.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | Adresse email du destinataire |
| otp | <code>string</code> | Code OTP à envoyer |

**Example**  
```js
await sendOtpMail('user@mail.com', '123456');
```
<a name="utils/sendOtpMail"></a>

## utils/sendOtpMail(email, subject, htmlContent) ⇒ <code>Promise.&lt;void&gt;</code>
Envoie un email générique (OTP ou message personnalisé)

**Kind**: global function  
**Returns**: <code>Promise.&lt;void&gt;</code> - Une promesse qui se résout quand l'email est envoyé  
**Throws**:

- <code>Error</code> En cas d'échec d'envoi de l'email


| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | Destinataire |
| subject | <code>string</code> | Sujet de l'email |
| htmlContent | <code>string</code> | Contenu HTML du message |

**Example**  
```js
await sendMail('user@mail.com', 'Sujet', '<b>Votre code : 123456</b>');
```
<a name="Bus"></a>

## Bus : <code>Object</code>
Bus.js

**Kind**: global typedef  
**Brief**: Modèle Mongoose pour les bus.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| numero | <code>String</code> | Numéro unique du bus |
| capacite | <code>Number</code> | Capacité du bus |
| compagnie | <code>String</code> | Compagnie du bus |
| type_bus | <code>String</code> | Type de bus (Standard, VIP, Climatisé) |
| status | <code>String</code> | Statut du bus (actif, inactif) |
| createdAt | <code>Date</code> | Date de création (auto-gérée par Mongoose) |
| updatedAt | <code>Date</code> | Date de dernière modification (auto-gérée par Mongoose) |

**Example**  
```js
const bus = new Bus({ numero: 'BUS001', capacite: 50, compagnie: 'Express', type_bus: 'VIP' });
```
<a name="EmailVerification"></a>

## EmailVerification : <code>Object</code>
EmailVerification.js

**Kind**: global typedef  
**Brief**: Modèle Mongoose pour la vérification d'email par OTP.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| email | <code>String</code> | Email à vérifier |
| otp | <code>String</code> | Code OTP envoyé |
| expiresAt | <code>Date</code> | Date d'expiration de l'OTP |
| createdAt | <code>Date</code> | Date de création (auto-gérée par Mongoose) |
| updatedAt | <code>Date</code> | Date de dernière modification (auto-gérée par Mongoose) |

**Example**  
```js
const verif = new EmailVerification({ email: 'test@mail.com', otp: '123456', expiresAt: new Date() });
```
<a name="Message"></a>

## Message : <code>Object</code>
Message.js

**Kind**: global typedef  
**Brief**: Modèle Mongoose pour les messages entre utilisateurs et admins.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| to | <code>Array.&lt;ObjectId&gt;</code> | Destinataires du message |
| from | <code>ObjectId</code> | Expéditeur du message |
| subject | <code>String</code> | Sujet du message |
| body | <code>String</code> | Contenu du message |
| sentAt | <code>Date</code> | Date d'envoi |
| readBy | <code>Array.&lt;ObjectId&gt;</code> | Utilisateurs ayant lu le message |
| createdAt | <code>Date</code> | Date de création (auto-gérée par Mongoose) |
| updatedAt | <code>Date</code> | Date de dernière modification (auto-gérée par Mongoose) |

**Example**  
```js
const msg = new Message({ to: [userId], from: adminId, subject: 'Info', body: 'Bienvenue !' });
```
<a name="Payment"></a>

## Payment : <code>Object</code>
Payment.js

**Kind**: global typedef  
**Brief**: Modèle Mongoose pour les paiements liés aux réservations.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| reservation_id | <code>ObjectId</code> | Référence vers la réservation |
| montant | <code>Number</code> | Montant payé |
| moyen | <code>String</code> | Moyen de paiement (Mobile Money, NotchPay, Test) |
| status | <code>String</code> | Statut du paiement (en attente, succès, échec) |
| transaction_id | <code>String</code> | Identifiant de la transaction |
| createdAt | <code>Date</code> | Date de création (auto-gérée par Mongoose) |
| updatedAt | <code>Date</code> | Date de dernière modification (auto-gérée par Mongoose) |

**Example**  
```js
const payment = new Payment({ reservation_id, montant: 10000, moyen: 'NotchPay', status: 'succès' });
```
<a name="Reservation"></a>

## Reservation : <code>Object</code>
Reservation.js

**Kind**: global typedef  
**Brief**: Modèle Mongoose pour les réservations de tickets.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| user | <code>ObjectId</code> | Référence vers l'utilisateur |
| schedule | <code>ObjectId</code> | Référence vers l'horaire |
| nombre_places | <code>Number</code> | Nombre de places réservées |
| statut | <code>String</code> | Statut de la réservation (en_attente, confirmée, annulée, terminée) |
| createdAt | <code>Date</code> | Date de création (auto-gérée par Mongoose) |
| updatedAt | <code>Date</code> | Date de dernière modification (auto-gérée par Mongoose) |

**Example**  
```js
const reservation = new Reservation({ user, schedule, nombre_places: 2 });
```
<a name="Schedule"></a>

## Schedule : <code>Object</code>
Schedule.js

**Kind**: global typedef  
**Brief**: Modèle Mongoose pour les horaires de bus.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| bus | <code>ObjectId</code> | Référence vers le bus |
| terminal_depart | <code>ObjectId</code> | Terminal de départ |
| terminal_arrivee | <code>ObjectId</code> | Terminal d'arrivée |
| date_depart | <code>Date</code> | Date et heure de départ |
| date_arrivee | <code>Date</code> | Date et heure d'arrivée |
| prix | <code>Number</code> | Prix du trajet |
| places_disponibles | <code>Number</code> | Nombre de places restantes |
| status | <code>String</code> | Statut de l'horaire (programmé, parti, arrivé, annulé) |
| seat_map | <code>Array</code> | Carte des sièges |
| createdAt | <code>Date</code> | Date de création (auto-gérée par Mongoose) |
| updatedAt | <code>Date</code> | Date de dernière modification (auto-gérée par Mongoose) |

**Example**  
```js
const schedule = new Schedule({ bus, terminal_depart, terminal_arrivee, date_depart: new Date(), prix: 5000 });
```
<a name="Terminal"></a>

## Terminal : <code>Object</code>
Terminal.js

**Kind**: global typedef  
**Brief**: Modèle Mongoose pour les terminaux de départ/arrivée.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| nom | <code>String</code> | Nom du terminal |
| ville | <code>String</code> | Ville du terminal |
| adresse | <code>String</code> | Adresse du terminal |
| createdAt | <code>Date</code> | Date de création (auto-gérée par Mongoose) |
| updatedAt | <code>Date</code> | Date de dernière modification (auto-gérée par Mongoose) |

**Example**  
```js
const terminal = new Terminal({ nom: 'Gare Yaoundé', ville: 'Yaoundé', adresse: 'Centre-ville' });
```
<a name="Ticket"></a>

## Ticket : <code>Object</code>
Ticket.js

**Kind**: global typedef  
**Brief**: Modèle Mongoose pour les tickets générés après réservation et paiement.  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| reservation_id | <code>ObjectId</code> | Référence vers la réservation |
| user_id | <code>ObjectId</code> | Référence vers l'utilisateur |
| schedule | <code>ObjectId</code> | Référence vers l'horaire |
| qr_code | <code>String</code> | Données du QR code |
| seat | <code>String</code> | Siège assigné |
| createdAt | <code>Date</code> | Date de création (auto-gérée par Mongoose) |
| updatedAt | <code>Date</code> | Date de dernière modification (auto-gérée par Mongoose) |

**Example**  
```js
const ticket = new Ticket({ reservation_id, user_id, schedule, seat: 'A1' });
```
<a name="User"></a>

## User : <code>Object</code>
User.js

**Kind**: global typedef  
**Brief**: Modèle Mongoose pour les utilisateurs (clients et admins).  
**Date**: 2024-06-01  
**Version**: 1.0  
**Author**: UV PROJET CODE Team  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| nom | <code>String</code> | Nom de l'utilisateur |
| email | <code>String</code> | Email unique |
| mot_de_passe | <code>String</code> | Mot de passe hashé |
| type | <code>String</code> | Type d'utilisateur (client, admin) |
| telephone | <code>String</code> | Numéro de téléphone |
| photo | <code>String</code> | Photo de profil (optionnelle) |
| createdAt | <code>Date</code> | Date de création (auto-gérée par Mongoose) |
| updatedAt | <code>Date</code> | Date de dernière modification (auto-gérée par Mongoose) |

**Example**  
```js
const user = new User({ nom: 'Jean', email: 'jean@mail.com', mot_de_passe: '...', type: 'client', telephone: '123456789' });
```

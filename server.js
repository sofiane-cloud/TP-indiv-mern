const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Importer les routes d'authentification
const announcementRoutes = require('./routes/announcement');  // Importer les routes des annonces


const app = express();
// Middleware
app.use(cors({origin : "*"}));
app.use(express.json()); // Pour parser le body en JSON
// Utiliser les routes des annonces
app.use('/api/announcements', announcementRoutes);

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tp_individuel', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.log(err));

// Utiliser les routes d'authentification
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 3004;

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

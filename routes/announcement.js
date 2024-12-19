const express = require('express');
const Announcement = require('../models/Announcement');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware pour vérifier le token
const router = express.Router();

// Route pour créer une annonce
router.post('/', authMiddleware, async (req, res) => {
    console.log(req.user);
  const { title, description, price } = req.body;

  try {
    const newAnnouncement = new Announcement({
      title,
      description,
      price,
      author: req.user.id,  // Utilise l'ID de l'utilisateur connecté
    });

    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour obtenir toutes les annonces
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().populate('author', 'username email');
    res.json(announcements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour obtenir une annonce par son ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const announcement = await Announcement.findById(id).populate('author', 'username email');
    if (!announcement) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }
    res.json(announcement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour mettre à jour une annonce
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  try {
    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }



    announcement.title = title || announcement.title;
    announcement.description = description || announcement.description;
    announcement.price = price || announcement.price;

    await announcement.save();
    res.json(announcement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour supprimer une annonce
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }

  
    
    res.json({ message: 'Annonce supprimée avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;




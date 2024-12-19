const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Référence à l'utilisateur qui a posté l'annonce
    required: true,
  },
}, {
  timestamps: true,  // Ajoute createdAt et updatedAt automatiquement
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;

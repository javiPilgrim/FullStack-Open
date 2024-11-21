const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
  password: { // Mantener la contraseña en texto plano
    type: String,
    required: true,
    minlength: 6,
  },
});

module.exports = mongoose.model('User', schema);


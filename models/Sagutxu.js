const mongoose = require('mongoose');

const sagutxuSchema = new mongoose.Schema({
    usuario: String,
    contrasena: String
});

const sagutxuModel = mongoose.model('Sagutxu', sagutxuSchema);

module.exports = sagutxuModel;
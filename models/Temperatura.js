const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema({
    temperatura: Number,
    humedad: Number,
    fecha: Date
});

const tempModel = mongoose.model('Temperatura', tempSchema);

module.exports = tempModel;
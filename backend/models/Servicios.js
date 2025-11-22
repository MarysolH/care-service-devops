const mongoose = require("mongoose");

const ServicioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Servicio", ServicioSchema);

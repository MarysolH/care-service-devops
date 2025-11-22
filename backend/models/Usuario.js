const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    usuario: { type: String, required: true, unique: true }, // nombre de usuario
    rol: { type: String, enum: ["admin", "mecanico"], default: "mecanico" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usuario", UsuarioSchema);

const mongoose = require("mongoose");

const TurnoSchema = new mongoose.Schema(
  {
    fecha: {
      type: String,
      required: true,
    },
    hora: {
      type: String,
      required: true,
    },
    cliente: {
      type: String,
      required: true,
    },
    servicio: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      enum: ["pendiente", "confirmado", "cancelado"],
      default: "pendiente",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Turno", TurnoSchema);

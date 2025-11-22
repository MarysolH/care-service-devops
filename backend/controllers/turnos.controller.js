const Turno = require("../models/Turno");

// GET — listar todos
exports.obtenerTurnos = async (req, res) => {
  try {
    const turnos = await Turno.find();
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener turnos" });
  }
};

// POST — crear turno
exports.crearTurno = async (req, res) => {
  try {
    const nuevoTurno = new Turno(req.body);
    await nuevoTurno.save();
    res.status(201).json(nuevoTurno);
  } catch (error) {
    res.status(400).json({ message: "Error al crear turno" });
  }
};

// PUT — actualizar turno
exports.actualizarTurno = async (req, res) => {
  try {
    const turnoActualizado = await Turno.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(turnoActualizado);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar turno" });
  }
};

// DELETE — eliminar turno
exports.eliminarTurno = async (req, res) => {
  try {
    await Turno.findByIdAndDelete(req.params.id);
    res.json({ message: "Turno eliminado" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar turno" });
  }
};

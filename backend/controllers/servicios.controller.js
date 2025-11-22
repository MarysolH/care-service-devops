const Servicio = require("../models/Servicios");

// Obtener todos los servicios
exports.obtenerServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener servicios" });
  }
};

// Crear servicio
exports.crearServicio = async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    const nuevoServicio = await Servicio.create({ nombre, precio });
    res.status(201).json(nuevoServicio);
  } catch (error) {
    res.status(500).json({ error: "Error al crear servicio" });
  }
};

// Actualizar servicio
exports.actualizarServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    const servicioActualizado = await Servicio.findByIdAndUpdate(
      id,
      { nombre, precio },
      { new: true }
    );
    res.json(servicioActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar servicio" });
  }
};

// Eliminar servicio
exports.eliminarServicio = async (req, res) => {
  try {
    const { id } = req.params;
    await Servicio.findByIdAndDelete(id);
    res.json({ mensaje: "Servicio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar servicio" });
  }
};

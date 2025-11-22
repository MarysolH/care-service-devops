const Usuario = require("../models/Usuario");

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// Crear usuario
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido, usuario, rol } = req.body;
    if (!nombre || !apellido || !usuario || !rol) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const nuevoUsuario = await Usuario.create({ nombre, apellido, usuario, rol });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error(error); // 👈 imprime el error en consola
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, usuario, rol } = req.body;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { nombre, apellido, usuario, rol },
      { new: true, runValidators: true }
    );
    res.json(usuarioActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await Usuario.findByIdAndDelete(id);
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

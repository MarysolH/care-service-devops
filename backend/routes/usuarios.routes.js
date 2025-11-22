const express = require("express");
const router = express.Router();
const {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} = require("../controllers/usuarios.controller");

// Obtener todos los usuarios
router.get("/", obtenerUsuarios);

// Crear un usuario
router.post("/", crearUsuario);

// Actualizar un usuario por ID
router.put("/:id", actualizarUsuario);

// Eliminar un usuario por ID
router.delete("/:id", eliminarUsuario);

module.exports = router;



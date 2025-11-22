const express = require("express");
const router = express.Router();
const controller = require("../controllers/turnos.controller");

// CRUD Turnos
router.get("/", controller.obtenerTurnos);
router.post("/", controller.crearTurno);
router.put("/:id", controller.actualizarTurno);
router.delete("/:id", controller.eliminarTurno);

module.exports = router;


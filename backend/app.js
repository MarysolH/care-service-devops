const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");

// Importar rutas
const turnosRoutes = require("./routes/turnos.routes");
const usuariosRoutes = require("./routes/usuarios.routes");
const serviciosRoutes = require("./routes/servicios.routes");

const app = express();

// CORS configurado
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

// Middlewares
app.use(express.json());

// Conectar base de datos
conectarDB();

// Rutas
app.use("/api/turnos", turnosRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/servicios", serviciosRoutes);

// Ruta simple de prueba
app.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

module.exports = app;

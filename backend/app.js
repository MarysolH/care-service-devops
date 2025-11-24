const express = require("express");
const cors = require("cors");

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

app.use(express.json());

// Rutas
app.use("/api/turnos", turnosRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/servicios", serviciosRoutes);

// Ruta simple
app.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

const client = require("prom-client");

// Crear un registry para métricas
const register = new client.Registry();

// Métricas por defecto (CPU, memoria, Node.js)
client.collectDefaultMetrics({ register });

// Endpoint para Prometheus
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

module.exports = app;


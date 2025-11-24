const app = require("./app");
const conectarDB = require("./config/db");

const PORT = process.env.PORT || 3000;

conectarDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Servidor escuchando en puerto", PORT);
    });
  })
  .catch((err) => {
    console.error("Error conectando a MongoDB:", err);
  });

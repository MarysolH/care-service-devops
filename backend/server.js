const app = require("./app");
const conectarDB = require("./config/db");

const PORT = 3000;

conectarDB().then(() => {
  app.listen(PORT, () => {
    console.log("Servidor escuchando en puerto", PORT);
  });
});

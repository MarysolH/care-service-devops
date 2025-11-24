const mongoose = require("mongoose");

const conectarDB = (mongoUri) => {
  if (!mongoUri) throw new Error("Falta MONGO_URI");
  return mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

module.exports = conectarDB;

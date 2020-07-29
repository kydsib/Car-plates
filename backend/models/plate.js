const mongoose = require("mongoose");

const carPlateSchema = mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  plateData: { type: String, required: true }
});

module.exports = mongoose.model("CarPlate", carPlateSchema);

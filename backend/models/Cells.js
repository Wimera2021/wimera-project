const mongoose = require("mongoose");

const Cell = new mongoose.Schema({
  cellName: { type: String },
  checklistName: { type: String },
  Bay: { type: String },
  MacNo: { type: String },
});

module.exports = mongoose.model("Cell", Cell);

const mongoose = require("mongoose");

const Activity = new mongoose.Schema({
  User: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  Sheet: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sheet",
    },
  ],
  lastUpdated: { type: Date },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Activity", Activity);

const mongoose = require("mongoose");

const Sheet = mongoose.Schema({
  cell: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cell",
    },
  ],
  OperationNo: { type: String, required: true },
  value: [],
});

module.exports = mongoose.model("Sheet", Sheet);

const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const SuperUser = mongoose.Schema({
  userName: { type: String, required: true },
  RoleName: { type: String, required: true },
  Password: { type: String, required: true },
});

module.exports = mongoose.model("SuperUser", SuperUser);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, Required: true },
  password: { type: String, Required: true },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };

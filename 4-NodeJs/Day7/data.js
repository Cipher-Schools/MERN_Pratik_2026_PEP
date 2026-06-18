const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: String,
  age: { type: Number, Required: true },
  city: String,
  country: { type: String, Required: true, enum: ["India", "USA", "UAE"] },
  password: { type: String, Required: true },
});

const UserModel = mongoose.model("user", userSchema);
const connection = mongoose.connect(`${process.env.MONGO_URL}/mern234`);

module.exports = { UserModel, connection };

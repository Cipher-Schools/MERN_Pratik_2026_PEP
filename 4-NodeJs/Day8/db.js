const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(`${process.env.MONGODB_URL}/mern456`);

module.exports = { connection };

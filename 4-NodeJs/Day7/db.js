const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: String,
  age: { type: Number, Required: true },
  city: String,
  country: { type: String, Required: true, enum: ["India", "USA", "UAE"] },
  password: { type: String, Required: true },
});

//hashing password using bcypt
userSchema.pre("insertMany", async function (docs, next) {
  for (let doc of docs) {
    if (doc.password) {
      doc.password = await bcrypt.hash(doc.password, 10);
    }
  }
  next;
});

const UserModel = mongoose.model("user", userSchema);
const main = async () => {
  try {
    // await mongoose.connect(
    //   `your_mongodb_string/mern234`,
    // );
    await mongoose.connect(`${process.env.MONGO_URL}/mern234`);
    console.log("Connected to mongodb successfully");

    const users = await UserModel.insertMany([
      { name: "Pratik", age: 28, city: "Patna" },
      { name: "Raj", age: 25, city: "Bengalauru" },
      { name: "Shubham", age: 27, city: "Chandigarh" },
      { name: "Raghav", age: 24, city: "Darbhanga", skill: "Coding" },
      { name: "Harshit", age: "24", city: "Darbhanga", skill: "DSA" },
      { name: "Ganpat", age: "23", city: "Jodhpur", country: "India" },
      {
        name: "Amrit",
        age: "22",
        city: "Muzaffarpur",
        country: "India",
        password: "Amrit123",
      },
    ]);
    console.log("Data added successfully");
    console.log(users);

    // const users = await UserModel.find();
    // console.log(users);
  } catch (error) {
    console.log("Error while connecting to mongodb");
    console.log(error);
  }
};
main();

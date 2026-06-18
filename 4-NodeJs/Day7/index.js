const express = require("express");
const { UserModel, connection } = require("./data");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is woking");
});

//getting data from database

app.get("/users", async (req, res) => {
  const users = await UserModel.find();
  console.log(users);
  res.send(users);
});

//inserting data into database

app.post("/users/add", async (req, res) => {
  const data = req.body;
  try {
    const users = await UserModel.create(data);
    console.log(users);
    res.send({ message: "Data added successfully" });
  } catch (error) {
    res.send({ message: "Error while adding data" });
  }
});

app.listen(7500, async () => {
  try {
    await connection;
    console.log("Connected to mongodb successfully");
  } catch (error) {
    console.log("Error while connecting mongodb");
    console.log(error);
  }
  console.log("Aerver is runnnig on 7500 ");
});

const express = require("express");
const { connection } = require("./db");
const { UserModel } = require("./module/User.model");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

//default route
app.get("/", (req, res) => {
  res.send({ message: "Api is working" });
});

//signup
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await UserModel.create({ name, email, password });
    res.send({ message: "Data inserted successfully" });
  } catch (error) {
    res.send({ message: "Error while inserting data" });
  }
});

//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email, password });
  if (!user) {
    res.send({ message: "Login failed" });
  } else {
    const token = jwt.sign({ foo: "bar" }, "shhhhh");
    res.send({ message: "Login successful", token: token });
  }
});

app.get("/reports", async (req, res) => {
  const token = req.query.token;
  jwt.verify(token, "shhhhh", function (err, decoded) {
    if (err) {
      res.send({ message: "You are not authorized" });
    } else {
      res.send({ message: "Here is your reports" });
    }
  });
});

//server running on 3000 port
app.listen(3000, async () => {
  try {
    await connection;
    console.log("Connected to mongodb successfully");
  } catch (err) {
    console.log("Error while connecting to mongodb");
    console.log(err);
  }
  console.log("Server is running on 3000");
});

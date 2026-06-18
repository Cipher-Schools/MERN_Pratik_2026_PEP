const { json } = require("body-parser");
const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Api is working");
});
//get the data
app.get("/posts", (req, res) => {
  let data = fs.readFileSync("./post.json", { encoding: "utf-8" });
  let newData = JSON.parse(data);
  res.send(newData.posts);
});

//add the data
app.post("/posts/add", (req, res) => {
  let data = req.body;
  fs.appendFile("data.json", JSON.stringify(data), (err) => {
    if (err) {
      res.send("Error while writing file");
    } else {
      res.send("Data added");
    }
  });
});

//Adding data to post.json file to orders key
app.post("/posts/insert", (req, res) => {
  const data = req.body;
  //1.first get the json data
  const existing_data = fs.readFileSync("./post.json", "utf-8");
  //2.convert it to normal object
  const parsed_data = JSON.parse(existing_data);
  //3. now after conversion we can do manipulation --> add/delete/etc.
  parsed_data.orders.push(data);
  //4.now stringify it back to json
  const stringified_data = JSON.stringify(parsed_data);
  fs.writeFileSync("./post.json", stringified_data, "utf-8");
  console.log("Post added successfully");
  //store it to the given file
  res.send("data updated");
});

//Addind data to post.json file to cart key
app.post("/posts/cart", (req, res) => {
  const data = req.body;
  //1.first get the json data
  const existing_data = fs.readFileSync("./post.json", "utf-8");
  //2.convert it to normal object
  const parsed_data = JSON.parse(existing_data);
  //3. now after conversion we can do manipulation --> add/delete/etc.
  parsed_data.cart.push(data);
  //4.now stringify it back to json
  const stringified_data = JSON.stringify(parsed_data);
  fs.writeFileSync("./post.json", stringified_data, "utf-8");
  console.log("Post added successfully");
  //store it to the given file
  res.send("data updated");
});

//query
app.get("/lectures", (req, res) => {
  let data = req.query.data;
  let name = req.query.name;
  console.log(`Query made for lecture ${data} & ${name}`);
  res.send("Query made");
});

app.get("/welcome", (req, res) => {
  const { name, age } = req.query;

  res.send(
    age > 18
      ? `Welcome ${name}, You are eligible to cast your vote`
      : `Sorry ${name}, you are not eligible`,
  );
});
//params
app.get("/lectures/:id", (req, res) => {
  const lectureID = req.params.id;
  res.send(`You can now access the lecture  ${lectureID} in this api method `);
});

let port = 9500;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

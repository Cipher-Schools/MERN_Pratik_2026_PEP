const express = require("express");
const multer = require("multer");
const cors = require("cors");

const { orderRouter } = require("./routes/order.route");

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

app.use("/orders", orderRouter);

//Folder to upload files
// const upload = multer({ dest: "uploads/" });

const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => cb(null, file.originalname),
  }), //cb-->call back function
});

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file); // uploaded file info
  res.send("File uploaded successfully");
});

//Default Route
app.get("/", (req, res) => {
  res.send("Api is working");
});

let port = 8800;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

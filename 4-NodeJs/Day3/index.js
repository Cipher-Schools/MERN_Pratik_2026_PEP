const express = require("express");

const app = express();

// const firstMw = (req, res, next) => {
//   console.log("I am the first middleware");
//   next();
// };
// app.use(firstMw);

const firstMw = (req, res, next) => {
  console.log("a");
  next();
  console.log("b");
};

const secondMw = (req, res, next) => {
  console.log("f");
  next();
  console.log("g");
};
app.use(firstMw, secondMw);

//timelogger
const timeLogger = (req, res, next) => {
  const startTime = Date.now();
  console.log(startTime);

  next();
  const endTime = Date.now();
  console.log(`Time: ${endTime - startTime}ms`);
};

app.get("/timeLogger", timeLogger, (req, res) => {
  res.send("Time Page");
});

//Default Route
app.get("/", (req, res) => {
  console.log("c");
  res.send("Api is working");
  console.log("d");
});

app.get("/about", (req, res) => {
  console.log("e");
  res.send("This is about page");
});

let port = 8500;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

//Q.write a middleware called as logger, it should print/console the http verb and the endpoint of the request.
// GET /
// GET /about

//Q.write a middleware called as time_logger, it should log/print :
// the time it took for our server to process a request

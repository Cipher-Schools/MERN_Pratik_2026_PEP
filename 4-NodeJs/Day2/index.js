const http = require("http");

const fs = require("fs");

// console.log(http);

const server = http.createServer((req, res) => {
  console.log(req.method + " " + req.url);

  if (req.method === "GET" && req.url === "/sugar") {
    fs.readFile("./https.txt", { encoding: "utf-8" }, (err, data) => {
      if (err) {
        res.write("Error while reading file");
        res.end();
      } else {
        // console.log(data);
        res.end(data);
      }
    });
  } else if (req.method === "POST" && req.url === "/salt") {
    let result = "";
    req.on("data", (data) => {
      result += data;
    });
    req.on("end", () => {
      console.log(result);
      res.end("Data received");
    });
  } else if (req.url === "/default") {
    res.setHeader("content-type", "text");
    res.end("<h1>Hello from Post</h1>");
  } else {
    res.write("Hello from first server");
    res.end();
  }
});

let port = 8000;
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

////Problem statement
// Q.Whenever a request comes to our server,in our server, print(console.log) the request URL and the http method ?

const http = require("http");

const server = http.createServer((req, res) => {
  //get method
  if (req.method === "GET") {
    res.end("This is get method");
  } else if (req.method === "POST") {
    setTimeout(() => {
      res.end("This is post method");
    }, 1000);
  } else if (req.method === "PUT") {
    res.end("This is the message from put method");
  } else if (req.method === "DELETE") {
    res.end("This is the message from delete method");
  }
});

server.listen(8000, () => {
  console.log(`Server is running on 8000`);
});

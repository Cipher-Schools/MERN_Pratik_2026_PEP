const fs = require("fs");

// const { sub, add, multiply } = require("./func");

// add(10, 20); //30
// sub(20, 10); //10

// const os = require("os")
// console.log(os.networkInterfaces())
// console.log(os.userInfo());

//  File creation
let data = " Hello from node.js";
// fs.writeFile("data.txt", data, (err) => {
//   if (err) {
//     console.log("error while writing file");
//   } else {
//     console.log("File created successfully");
//   }
// });

//Update the file
// let newData = " \n I am updated data";
// fs.appendFile("data.txt", newData, (err) => {
//   if (err) {
//     console.log("error while updating file");
//   } else {
//     console.log("File updated successfully");
//   }
// });

// fs.unlink("data.txt", (err) => {
//   if (err) {
//     console.log("error while updating file");
//   } else {
//     console.log("File deleted successfully");
//   }
// });

// fs.readFile("data.txt", { encoding: "utf-8" }, (err, data) => {
//   if (err) {
//     console.log("error while reading file");
//   } else {
//     console.log("File data:", data);
//   }
// });

//External modules

// const isEven = require("is-even");
// console.log(isEven(10));

var QRCode = require('qrcode')
QRCode.toFile("linkedin.png", "https://www.linkedin.com/in/pratik-raj-543527214/")


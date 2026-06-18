const express = require("express");

const orderRouter = express.Router();

orderRouter.get("/", (req, res) => {
  res.send("This is default order route");
});
orderRouter.post("/", (req, res) => {
  res.send("This is post order route");
});
orderRouter.put("/:OrderID", (req, res) => {
  res.send("This is put order route");
});
orderRouter.delete("/:OrderID", (req, res) => {
  res.send("This is delete order route");
});

module.exports = { orderRouter };

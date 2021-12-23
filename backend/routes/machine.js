const express = require("express");
const mongoose = require("mongoose");
//const machineJs = require("../models/Sheet");
var app = require("../app");
const Sheet = require("../models/Sheet");

const router = express.Router();

router.post("/importCSV", (req, res, next) => {
  console.log(req.body);
  let data = new Sheet({
    cell: req.body.cell,
    OperationNo: req.body.opNo,
    value: req.body.csv,
  });

  data.save().then((addedValue) => {
    console.log(addedValue);
    res.status(201).json({
      message: "Sheet added succesfully!",
    });
  });
});

router.get("/getsheets", (req, res, next) => {
  Sheet.find()
    .populate("cell")
    .then((documents) => {
      res.status(200).json(documents);
    });
});

module.exports = router;

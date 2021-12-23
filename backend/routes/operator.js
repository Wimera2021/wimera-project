const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/users");
const Cell = require("../models/Cells");
const Sheet = require("../models/Sheet");
const Activity = require("../models/activity");
const { result } = require("underscore");
const activity = require("../models/activity");

const router = express.Router();

router.get("/getsheets", (req, res, next) => {
  Sheet.find()
    .populate("cell")
    .then((documents) => {
      res.status(200).json(documents);
    });
});

router.put("/updatesheet/:id", (req, res, next) => {
  let id = req.params.id;
  console.log("Update :", id, req.body);
  Sheet.updateOne({ _id: id }, { value: req.body }).then((result) => {
    console.log("Sheet updated :", result);
    res.status(200).json({
      message: "Update Successfull!",
    });
  });
});

router.post("/updateactivity", (req, res, next) => {
  console.log(req.body);
  let opId = req.body.opId;
  let sheetId = req.body.sheetId;
  let curDate = req.body.currdate;
  let data = new Activity({
    User: opId,
    Sheet: sheetId,
    lastUpdated: curDate,
  });
  Activity.findOne({
    User: opId,
    Sheet: sheetId,
  }).then((result) => {
    if (result) {
      console.log("REsult :", result._id);
      Activity.updateOne(
        { _id: result._id },
        { lastUpdated: curDate, status: "Pending" }
      ).then((result) => {
        res.status(200).json({ message: "Activity Updated Successfully" });
        return;
      });
    } else {
      data.save().then((result) => {
        res.status(201).json({
          message: "Activity Added Successfully!",
        });
      });
    }
  });
});

module.exports = router;

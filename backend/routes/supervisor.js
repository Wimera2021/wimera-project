const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/users");
const Cell = require("../models/Cells");
const SuperUser = require("../models/superuser");
const activity = require("../models/activity");
const router = express.Router();

router.get("/getactivities", (req, res, next) => {
  activity
    .find()
    .populate("User")
    .populate({
      path: "Sheet",
      populate: {
        path: "cell", // in blogs, populate comments
      },
    })
    .then((documents) => {
      res.status(200).json({
        message: "Activities fetched successfully!",
        activities: documents,
      });
    });
});

router.put("/:id", (req, res, next) => {
  console.log("put: ", req.params.id, req.body);
  activity
    .updateOne(
      { _id: req.params.id },
      {
        status: req.body.status,
      }
    )
    .then((result) => {
      console.log(result);
      res.status(200).json();
    });
});

module.exports = router;

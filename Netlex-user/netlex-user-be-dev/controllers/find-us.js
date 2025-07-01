
const FindUs = require("../models/find-us");
bcrypt = require("bcryptjs");


exports.getActiveFindUs = function (req, res) {
  FindUs.find().exec(function (err, doc) {
    if (err) {
      console.log("Error in finding FindUs from DB");
      return res.status(500).json({ err });
    } else {
      console.log("FindUs get request call from DB Successfully");

      return res.status(200).json({ doc });
    }
  });
};


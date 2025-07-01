
const BusinessTypes =  require("../models/businessType");
bcrypt = require("bcryptjs");




// Get all BusinessTypes
exports.getActivebusinessTypes = function (req, res) {
  BusinessTypes.find().exec(function (err, doc) {
    if (err) {
      console.log("Error in finding BusinessType from DB");
      return res.status(500).json({ err });
    } else {
      console.log("BusinessType get request call from DB Successfully");

      return res.status(200).json({ doc });
    }
  });
};

exports.show = function (req, res) {
  BusinessTypes.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "BusinessTypesNotFound" });
    } else {
      res.json(doc);
    }
  });
};






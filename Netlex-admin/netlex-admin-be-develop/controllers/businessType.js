
const BusinessTypes = require("../models/businessType");
const SalesModel = require("../models/salesModel");
const Utils = require("../helper/util");
const formidable = require("formidable");
const mv = require("mv");
const path = require("path");
bcrypt = require("bcryptjs");



exports.getActiveSalesModel = function (req, res) {

  SalesModel.find().exec(function (err, doc) {
    if (err) {
      console.log("Error in finding Sales from DB");
      return res.status(500).json({ err });
      // return res.send("Error in finding Sales from DB")
    } else {
      // businessTypeData=req.body.businessType;
      console.log("businessTypeData2", req.body.businessType);
      return res.status(200).json({ doc });
      // return res.send("Sales get request call from DB Successfully")
    }
  });
};
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
// To Show List BusinessTypes
exports.list = function (req, res) {
  try {
    const query = {};
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const options = {
      page: page,
      limit: limit,
    };

    BusinessTypes.paginate(query, options).then(function (result) {
      // console.log('result', result);
      res.json(result);
    });
  } catch (error) {
    res.status(404).json({ error: "Please try again" });
  }
};




// To Save New BusinessTypes
exports.save = function (req, res) {
  // console.log("req.body",req.body)
  let { name, amount, vat } = req.body;
  if (!name || !amount || !vat) {
    res.status(404).json({ error: "MissingParameters" });
    return;
  }
  let businesstypes = new BusinessTypes();
  businesstypes.name = name;
  businesstypes.amount = amount;
  businesstypes.vat = vat;

  businesstypes.save((err, savedData) => {
    if (err) {
      console.log("err", err);
      return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
    }
    res.status(200).json(savedData);
  });
};
// Get an individual BusinessTypes's public information
exports.show = function (req, res) {
  BusinessTypes.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "BusinessTypesNotFound" });
    } else {
      res.json(doc);
    }
  });
};
// To delete BusinessTypes
exports.delete = async (req, res) => {
  let __id = req.params.id;
  let x = 0;
  const businessTypes = await BusinessTypes.findById(__id);
  if (businessTypes) {
    SalesModel.distinct(
      "businessType",
      { businessType: __id },
      function (err, doc) {
        if (err) {
          console.log("Error in finding Sales from DB", err);
        } else {
          // console.log("BusinessTypes in Sales",doc)
          if (!__id == doc) {
            // console.log("Not Matched", doc);
            BusinessTypes.findByIdAndDelete(req.params.id).exec(function (err) {
              if (err) {
                res.status(404).json({ error: "BusinessTypesNotFound" });
              } else {
                res.status(200).json({ success: "BusinessTypesDeleted" });
              }
            });
          } else {
            // console.log("Matched", doc);
            res.status(404).json({ error: "BusinessTypesCannotBeDeleted" });
          }
        }
      }
    );
  }
};
exports.update = function (req, res) {
  // console.log("req.body",req.body)
  const _id = req.params.id;
  BusinessTypes.findByIdAndUpdate(_id, req.body.businessType[0], {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update BusinessTypes with id=${_id}. Maybe BusinessTypes was not found!`,
        });
      } else {
        res.send({ message: "BusinessTypes was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating BusinessTypes with id=" + _id,
      });
    });
};

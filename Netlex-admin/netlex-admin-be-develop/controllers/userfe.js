// 1. Load the User model

const Userfe = require('../models/userfe.js');
const Utils = require("../helper/util");
bcrypt = require('bcryptjs');

// Get all front end users list
exports.list = function (req, res) {
  // console.log('req.query', req.query)
  try {
    const query = {};
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const status = req.query.status;
    const options = {
      page: page,
      limit: limit
    };
    // console.log("status", status)
    if (status) {
      query.status = { $eq: status };
    }
    Userfe.paginate(query, options).then(function (result) {
      // console.log('result', result);
      res.json(result);
    });
  } catch (error) {
    res.status(404).json({ error: 'Please try again' })
  }
};
exports.getAllUserfe = function (req, res) {
  console.log("req.query", req.query)
  Userfe.find({ status: req.query.status }).exec(function (err, doc) {
    if (err) {
      console.log("Error in finding Userfe from DB");
      return res.status(500).json({ err });
      // return res.send("Error in finding Sales from DB")
    } else {
      return res.status(200).json({ doc });
      // return res.send("Userfe get request call from DB Successfully")
    }
  });
};
exports.show = function (req, res) {
  Userfe.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "UserNotFound" });
    } else {
      res.json(doc);
    }
  });
};

exports.userUpdate = async function (req, res) {
  // console.log("req.body.user[0]", req.body.user[0]);
  // console.log("req.params", req.params);

  const id = req.params.id;
  const status = req.body.user[0].status;

  // console.log("id", id);
  // console.log("status", status);
  oldUserData = await Userfe.findById(id);
  // console.log('oldUserData', oldUserData);

  Userfe.findByIdAndUpdate(id, {
    status: status
  }, { new: true })
    .then((data) => {
      // console.log("data",data)
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else {
        if (status && oldUserData.status !== status) {
          // console.log("status changed");
          Utils.sendmail(data, "", "UserFeStatusChanged");
        }
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating User with id=" + id });
    });
};
const ClientsDetailsQuestion = require('../models/clientsDetailsQuestion.js');
// const User = require('../models/user.js');
const User = require('../models/user.js');

exports.getAll = function (req, res) {
  ClientsDetailsQuestion.find().exec(function (err, doc) {
    if (err) {
      console.log("Error in finding ClientsDetailsQuestion from DB");
      return res.status(500).json({ err });
    } else {
      console.log('doc',doc);
      console.log("ClientsDetailsQuestion get request call from DB Successfully");
      return res.status(200).json({ doc });
    }
  });
};
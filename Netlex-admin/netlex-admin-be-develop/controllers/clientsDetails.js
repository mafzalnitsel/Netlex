
const ClientsDetails = require("../models/clientsDetails")
const Utils = require("../helper/util");
const formidable = require("formidable");
const mv = require("mv");
const path = require("path");
bcrypt = require("bcryptjs");




// Get all Clients Details
exports.getActiveclientsDetails = function (req, res) {
  ClientsDetails.find().exec(function (err, doc) {
    if (err) {
      console.log("Error in finding ClientsDetails from DB");
      return res.status(500).json({ err });
    } else {
      console.log("ClientsDetails get request call from DB Successfully");

      return res.status(200).json({ doc });
    }
  });
};
// To Show List ClientsDetails
exports.list = function (req, res) {
  try {
    const query = {};
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const options = {
      page: page,
      limit: limit,
    };

    ClientsDetails.paginate(query, options).then(function (result) {
      // console.log('result', result);
      res.json(result);
    });
  } catch (error) {
    res.status(404).json({ error: "Please try again" });
  }
};




// To Save New ClientsDetails
exports.save = function (req, res) {
  console.log("req.body", req.body)
  let { fromName, fromPhoneNumber, fromEmail, fromSsn, toName, toPhoneNumber,
    toEmail, toSsn } = req.body;

  if (!fromName || !fromPhoneNumber || !fromEmail || !fromSsn || !toName || !toPhoneNumber
    || !toEmail || !toSsn) {
    res.status(404).json({ error: "MissingParameters" });
    return;
  }
  let clientsDetails = new ClientsDetails();
  //From Side Data
  clientsDetails.fromName = fromName;
  clientsDetails.fromPhoneNumber = fromPhoneNumber;
  clientsDetails.fromEmail = fromEmail;
  clientsDetails.fromSsn = fromSsn;
  //To Side Data
  clientsDetails.toName = toName;
  clientsDetails.toPhoneNumber = toPhoneNumber;
  clientsDetails.toEmail = toEmail;
  clientsDetails.toSsn = toSsn;

  clientsDetails.save((err, savedData) => {
    if (err) {
      console.log("err", err);
      return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
    }
    res.status(200).json(savedData);
  });
};
// Get an individual ClientsDetails's public information
exports.show = function (req, res) {
  ClientsDetails.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "ClientsDetailsNotFound" });
    } else {
      res.json(doc);
    }
  });
};

exports.delete = async (req, res) => {
  console.log('req.params.id', req.params.id)

  const clients = await ClientsDetails.findById(req.params.id);
  if (clients) {
    ClientsDetails.findByIdAndDelete(req.params.id)
      .exec(function (err) {
        if (err) {
          console.error(err);
          res.status(404).json({ error: 'UserNotFound' });
          console.log('eeeeeeeeeeeeeeeeeeeeee')
          console.log('error', err)
        } else {

          res.status(200).json({ success: 'ClientsDetailsDeleted' });
        }
      });
  }
};

exports.update = function (req, res) {
  console.log("req.body", req.body.clientsDetails[0])
  const _id = req.params.id;
  ClientsDetails.findByIdAndUpdate(_id, req.body.clientsDetails[0], {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update ClientsDetails with id=${_id}. Maybe ClientsDetails was not found!`,
        });
      } else {
        res.send({ message: "ClientsDetails was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ClientsDetails with id=" + _id,
      });
    });
};


exports.getClientsDetailByData = function (req, res) {
  findData = req.body.findData;
  // console.log('findData before', findData);
  findData.forEach((element, index) => {
    // console.log('element', element);
    ClientsDetails.find({ $or: [{ fromName: element.answer1 },{ fromName: element.answer1.toLowerCase() }, { fromSsn: element.answer2 }] }).exec(function (err, doc) {
      if (err) {
        console.log("Error in finding ClientsDetails from DB 1", err);
      } else {
        if (doc.length > 0) {
          console.log("ClientsDetails get request call from DB Successfully 1", doc);
          doc.forEach((ele, i) => {
            if (element.answer1 == ele.fromName || element.answer1.toLowerCase() == ele.fromName) {
              // console.log('Answer1 Found', ele.fromName);
              // console.log('element.answer1', element.answer1);
              element.answer1ExistsInCounterparty = true;
              element.answer1ExistsIn = ele._id;
            }
            if (element.answer2 == ele.fromSsn) {
              // console.log('Answer2 Found', ele.fromSsn);
              // console.log('element.answer2', element.answer2);
              element.answer2ExistsInCounterparty = true;
              element.answer2ExistsIn = ele._id;
            }
          })
        }
      }
      if (index === (findData.length - 1)) {
        // console.log('index', index);
        console.log('findData after', findData);
        res.json({result: findData});
      }
    });

  });


};

// exports.getClientsDetailByData = function (req, res) {
//   findData = req.body.findData;
//   console.log('findData before', findData);
//   // fromSsn = '199912121234'
//   // ClientsDetails.find({ fromSsn }).exec(function (err, doc) {
//   //   if (err) {
//   //     console.log("Error in finding ClientsDetails from DB 2", err);
//   //   } else {
//   //     console.log("ClientsDetails get request call from DB Successfully 2111111", doc);
//   //   }
//   // });
//   // console.log('typeof findData[0].answer1', typeof findData[0].answer1);
//   // console.log('typeof findData[0].answer2', typeof findData[0].answer2);
//   findData.forEach((element, index) => {
//     // console.log('element', element);
//     ClientsDetails.find({ fromName: element.answer1 }).exec(function (err, doc) {
//       if (err) {
//         console.log("Error in finding ClientsDetails from DB 1", err);
//       } else {
//         if (doc.length > 0) {
//           console.log("ClientsDetails get request call from DB Successfully 1", doc);
//           element.answer1ExistsInCounterparty = true;
//           element.answer1ExistsIn = doc[0]._id;
//         }
//       }
//       if (index === (findData.length - 1)) {
//         // console.log('index', index);
//         console.log('findData after', findData);
//       }
//     });
//     // ClientsDetails.find({ $or: [{ toName: element.answer2 }, { toSsn: element.answer2 }] }).exec(function (err, doc) {
//     ClientsDetails.find({ fromSsn: element.answer2 }).exec(function (err, doc) {
//       if (err) {
//         console.log("Error in finding ClientsDetails from DB 2", err);
//       } else {
//         if (doc.length > 0) {
//           console.log("ClientsDetails get request call from DB Successfully 2", doc);
//           element.answer2ExistsInCounterparty = true;
//           element.answer2ExistsIn = doc[0]._id;
//           // console.log('element', element);
//         }
//       }
//       if (index === (findData.length - 1)) {
//         // console.log('index', index);
//         console.log('findData after', findData);
//       }
//     });

//   });


// };

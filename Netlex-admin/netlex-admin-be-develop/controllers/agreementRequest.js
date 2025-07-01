const AgreementRequest = require('../models/agreementRequest.js');
// const User = require('../models/user.js');
const Userfe = require('../models/userfe.js');
const Utils = require("../helper/util");

exports.save = function (req, res) {
  console.log("req.body", req.body)

  let { userId, documentId, javskontrollAnswers } = req.body;
  // console.log('userId', userId);
  // console.log('documentId', documentId);
  // console.log('javskontrollAnswers', javskontrollAnswers);
  if (!userId || !documentId || !javskontrollAnswers) {
    res.status(404).json({ error: "MissingParameters" });
    return;
  }
  let agreementRequest = new AgreementRequest();

  agreementRequest.userId = userId;
  agreementRequest.documentId = documentId;
  agreementRequest.questionAndAnswers = javskontrollAnswers;
  agreementRequest.status = 'new';

  agreementRequest.save((err, savedData) => {
    if (err) {
      console.log("Error while saving agreement requests", err);
      return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
    }
    // console.log('savedData', savedData);
    res.status(200).json(savedData);
  });
};

exports.getAgreeementRequestByUserId = function (req, res) {
  // console.log('req.query',req.query);
  let { userId, documentId } = req.query;
  // userId = "124235325346"
  // documentId = "124235325346"
  // console.log('userId', userId);
  // console.log('documentId', documentId);
  AgreementRequest.find({ userId, documentId })
    .exec(function (err, data) {
      if (err) {
        return res.status(500).json({ err })
      } else {
        console.log('data', data);
        // return res.status(200).json({ data })
        return res.status(200).json(data)
      }
    });
};

exports.getAgreeementRequestsList = function (req, res) {
  console.log('req.query AgreeementRequests', req.query);
  try {
    const query = {};
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const status = req.query.status;
    const options = {
      page: page,
      limit: limit,
    };
    if (status) {
      query.status = { $eq: status };
    }
    AgreementRequest.paginate(query, options).then(function (result) {
      // console.log('result', result);
      // if(result.docs.length>0){
      //   userId = result.docs[0].userId;
      //   console.log('result.docs.length', result.docs.length);
      //   Userfe.findById(userId).exec(function (err, doc) {
      //     if (err || doc === null) {
      //       console.log('Error: UserNotFound',err);
      //       // res.status(404).json({ error: "UserNotFound" });
      //     } else {
      //       // res.json(doc);
      //       console.log('doc',doc);
      //     }
      //   });
      // }
      res.json(result);
    });
  } catch (error) {
    res.status(404).json({ error: "Please try again" });
  }
};

exports.update = async function (req, res) {
  // console.log("req.body.data[0]", req.body.data[0]);
  // console.log("req.params", req.params);

  const id = req.params.id;
  const status = req.body.data[0].status;

  AgreementRequest.findByIdAndUpdate(id, {
    status: status
  }, { new: true })
    .then((data) => {
      // console.log("data",data)
      if (!data) {
        res.status(404).send({
          message: `Cannot update AgreementRequest with id=${id}. Maybe AgreementRequest was not found!`,
        });
      } else {
        // console.log('data', data);
        Utils.sendmail(data, "", "AgreementReuqestUpdated")
        // if(status=='approved') Utils.sendmail(data, "", "AgreementReuqestUpdated");
        // if(status=='rejected') Utils.sendmail(data, "", "AgreementReuqestRejected");
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating AgreementRequest with id=" + id });
    });
};

exports.get = function (req, res) {
  // console.log('req.params',req.params);
  let id = req.params.id
  // userId = "124235325346"
  // documentId = "124235325346"
  // console.log('userId', userId);
  // console.log('documentId', documentId);

  AgreementRequest.findById(id)
    .exec(function (err, data) {
      if (err) {
        console.log('Error while finding agreement request by Id', err);
        return res.status(500).json({ err })
      } else {
        // console.log('data', data);
        // return res.status(200).json({ data })
        return res.status(200).json(data)
      }
    });
};
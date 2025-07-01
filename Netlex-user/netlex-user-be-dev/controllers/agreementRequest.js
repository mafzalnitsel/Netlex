const AgreementRequest = require('../models/agreementRequest.js');
const User = require('../models/user.js');
const DocumentContent = require('../models/document');

exports.save = async function (req, res) {
  console.log("req.body", req.body)

  let { userId, documentId, javskontrollAnswers } = req.body;
  console.log('userId', userId);
  console.log('documentId', documentId);
  console.log('javskontrollAnswers', javskontrollAnswers);
  
  if (!userId || !documentId || !javskontrollAnswers) {
    res.status(404).json({ error: "MissingParameters" });
    return;
  }
  let user = await User.findById(userId);
  let documentContent = await DocumentContent.findById(documentId);
  // console.log('user',user);
  // console.log('documentContent',documentContent);
  let agreementRequest = new AgreementRequest();

  agreementRequest.userId = userId;
    // if(user.userName!='') agreementRequest.userName = user.userName;
  // else agreementRequest.userName = user.firstName + " " + lastName;
  agreementRequest.user = user;
  agreementRequest.documentId = documentId;
  agreementRequest.questionAndAnswers = javskontrollAnswers;
  agreementRequest.status = 'new';
  agreementRequest.documentTitle = documentContent.documentTitle;


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
  console.log('userId', userId);
  console.log('documentId', documentId);
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

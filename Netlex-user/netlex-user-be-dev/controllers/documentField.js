const DocumentField = require("../models/documentField");
const UserDocuments = require("../models/userDocuments");
const UserDocumentMaster = require("../models/userDocumentMaster");
const DocumentFieldModel = require("../models/documentField");
const paymentModel = require("../models/payment");
const Document = require("../models/document");
const User = require("../models/user");
const html_to_pdf = require("html-pdf-node");
const auth = require("../controllers/auth");
const utilService = require("../services/util-service");
const BusinessAgreement = require("../models/businessAgreements");
const DocumentContent = require('../models/document');
const environment = require("../env");
const UserModel = require("../models/user.js");
const AgreementRequest = require('../models/agreementRequest.js');

// const fs = require("fs");
// var path = require("path");
// const request = require("request");
// const download = require("download");
const pdf2base64 = require("pdf-to-base64");

exports.getFieldsByDocumentId = function (req, res) {
  let documentTemplateId = req.body.documentTemplateId;
  DocumentField.find({ documentTemplateId: documentTemplateId })
    .populate("fieldId")
    .sort("fieldPosition")
    .exec((err, fieldList) => {
      if (err) {
        console.error("err", err);
        return res.status(404).json({ error: "Invalid Document Id" });
      }

      res.status(200).json({ fieldList });
    });
};

exports.updateAgreementPaymentStatus = function (req, res) {
  // res.send({reqBody:req.body});
  console.log("updateAgreementPaymentStatus in documentField");
  console.log("req.body(updateAgreementPaymentStatus)", req.body);
  const { paymentId, masterId, documentId, userLoggedInId } = req.body;
  // console.log("masterId",masterId);
  if (masterId != "itsBusinessAgreement") {
    console.log("masterId existed");
    saveUserDocumentMasterHandler(masterId, paymentId, res)
    // const savedUserDocumentMaster = UserDocumentMaster.findOneAndUpdate(
    //   { _id: masterId },
    //   {
    //     agreementSentStatus: "Sent",
    //     paymentStatus: "Paid",
    //     paymentId: paymentId,
    //   }
    // );

    // if (!savedUserDocumentMaster) {
    //   return res
    //     .status(404)
    //     .json({ err: "Err", msg: "Error while saving user documents" });
    // }
    //  generateAgreement(masterId);
  } else {
    // res.send({reqBody:'else'});
    generateBusinessAgreement(documentId, userLoggedInId, res);
  }
};
async function saveUserDocumentMasterHandler(masterId, paymentId, res) {
  console.log("masterId", masterId);
  console.log("paymentId", paymentId);
  // console.log("saveUserDocumentMasterHandler",res);

  const savedUserDocumentMaster = UserDocumentMaster.findOneAndUpdate(
    { _id: masterId },
    {
      agreementSentStatus: "Sent",
      paymentStatus: "Paid",
      paymentId: paymentId,
    },
    { new: true }
  ).exec((err, doc) => {
    console.log("doc", doc)
    if (err) {
      return res
        .status(404)
        .json({ err: "Err", msg: "Error while saving user documents" });
    }
  });
  // if (!savedUserDocumentMaster) {
  //   return res
  //     .status(404)
  //     .json({ err: "Err", msg: "Error while saving user documents" });
  // }
  generateAgreement(masterId);
}
async function generateAgreement(userDocumentMasterId) {
  console.log("Generate agreement in documentField");
  const userDocumentMaster = await UserDocumentMaster.findById(
    userDocumentMasterId
  ).populate("documentTemplateId");
  // console.log("userDocumentMaster",userDocumentMaster);
  const documentTemplateId = userDocumentMaster.documentTemplateId;
  // console.log("documentTemplateId",documentTemplateId);
  const agreementFileName = documentTemplateId.documentTitle;
  // console.log("agreementFileName",agreementFileName);
  const userId = userDocumentMaster.userId;
  const documentId = userDocumentMaster.documentTemplateId._id;
  let docContent = userDocumentMaster.documentTemplateId.document;
  const userDocumentDetails = await UserDocuments.find({
    masterId: userDocumentMasterId,
  });
  let documentAnswer = [];
  userDocumentDetails.forEach((userDocument) => {
    documentAnswer.push({
      fieldObjectId: userDocument.fieldId,
      answer: userDocument.answer,
    });
  });
  console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||');
  // console.log('userDocumentMasterId',userDocumentMasterId);
  // console.log('userDocumentMaster',userDocumentMaster);
  // console.log('docContent',docContent);
  // console.log('userId', userId);
  // console.log('documentId', documentId);
  let bothUserAndDocumentId = {
    userId: userId.toString(),
    documentId: documentId.toString()
  }
  // console.log('bothUserAndDocumentId', bothUserAndDocumentId);
  // console.log('typeOf userId', typeof userId);
  // console.log('typeof documentId', typeof documentId);
  // console.log('typeof bothUserAndDocumentId.userId', typeof bothUserAndDocumentId.userId);
  // console.log('typeof bothUserAndDocumentId.documentId', typeof bothUserAndDocumentId.documentId);

  // let getJavskontrollAnswers = await AgreementRequest.find({ userId, documentId: documentField.documentTemplateId });
  // console.log('getJavskontrollAnswers',getJavskontrollAnswers);
  const pdfBuffer = await populateUserInputs(docContent, documentAnswer, '', bothUserAndDocumentId);
  await sendAgreement(userId, pdfBuffer, userDocumentMasterId, agreementFileName);
}
async function generateBusinessAgreement(businessAgreementId, userLoggedInId, res) {
  console.log("Generate Business agreement in documentField", businessAgreementId);
  // res.send({reqBody:'Generate Business agreement in documentField'});

  // const businessAgreement = await BusinessAgreement.findById(
  //   businessAgreementId
  // );
  // let doc = new DocumentContent();

  const businessAgreement = await DocumentContent.findById(
    businessAgreementId
  );
  // res.send({reqBody:businessAgreement});

  console.log("businessAgreement", businessAgreement);
  console.log("businessAgreement.pdfAttachment", businessAgreement.pdfAttachment);

  // await sendAgreement(userId, pdfBuffer, businessAgreementId);
  if (!businessAgreement) {
    return res
      .status(404)
      .json({ err: "Err", msg: "Business Agreement Not Found" });
  }
  // res.send({reqBody11:businessAgreement});
  let htmlContent = "";
  if (businessAgreement.pdfAttachment) {

    const pdfFileName = businessAgreement.pdfAttachment.split("/")[1];
    console.log("pdfFileName", pdfFileName);
    const pdfFilePath =
      environment.SERVER_URL + businessAgreement.pdfAttachment;
    console.log("pdfFilePath", pdfFilePath);
    // console.log("userLoggedInId", userLoggedInId);

    //Creating Content for mail
    htmlContent += "Kära kund, Tack för din beställning. Bifogat ditt avtal. <br>";
    // htmlContent += "<br>";
    htmlContent += "<br><b>Avtal:</b> " + businessAgreement.documentTitle;
    // htmlContent += businessAgreement.documentTitle;
    htmlContent += "<br><br><b>Beskrivning:</b> " + businessAgreement.documentDescription;
    // htmlContent += businessAgreement.documentDescription;

    // // Path of the pdfFile to be downloaded
    // const file = pdfFilePath;
    // // Path to store the downloaded file
    // const filePath = `./uploadedFiles/businessAgreements/${pdfFileName}`;
    // download(file, filePath).then(() => {
    //   console.log("PdfFile downloaded successfully!");
    // });

    const noMasterId = "itsBusinessAgreement," + businessAgreement._id;
    let base64OfPdf = await pdf2base64(pdfFilePath)
      .then((response) => {
        // console.log('response',response); //cGF0aC90by9maWxlLmpwZw==
        return response;
      })
      .catch((error) => {
        console.log("error", error); //Exepection error....
      });
    // console.log("base64OfPdf",base64OfPdf);

    await sendBusinessAgreement(
      userLoggedInId,
      base64OfPdf,
      noMasterId,
      pdfFileName,
      htmlContent,
      res
    );
  } else {
    // return res
    // .status(404)
    // .json({ err: "Err", msg: "NoAttachment" });
    res.send({ err: 'NoAttachment' });


  }
}
async function sendAgreement(userId, pdfBuffer, userDocumentMasterId, agreementFileName) {
  // Sending Email with agreement
  const authResponse = await auth.getToken();
  const user = await User.findById(userId);
  const body = {
    innerBody: {
      message: {
        // subject: "Thank You for order - Agreement from Netlex",
        // body: {
        //   contentType: "HTML",
        //   content:
        //     "Dear Customer, <br> Thank You for your order. Please find attached your agreement",
        // },
        subject: "Tack för din beställning - Avtal från Netlex",
        body: {
          contentType: "HTML",
          content:
            "Kära kund, <br> Tack för din beställning. Bifogat ditt avtal",
        },
        toRecipients: [
          {
            emailAddress: {
              address: user.email,
            },
          },
        ],
        attachments: [
          {
            "@odata.type": "#microsoft.graph.fileAttachment",
            // name: "NetlexAgreement.pdf",
            name: agreementFileName + ".pdf",
            contentType: "application/pdf",
            contentBytes: pdfBuffer.toString("base64"),
          },
        ],
      },
    },
    userDocumentMasterId: userDocumentMasterId,
    emailType: "agreementEmail",
    userDetails: user,
  };
  const sendEmail = await utilService.sendEmail(authResponse, body);
}
async function sendBusinessAgreement(
  userId,
  pdfBufferData,
  userDocumentMasterId,
  pdfFileName,
  htmlContent,
  res
) {
  // Sending Email with Business Agreement
  const authResponse = await auth.getToken();
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ err: "Err", msg: "user Not Found" });
  }
  // console.log("user",user)

  const body = {
    innerBody: {
      message: {
        // subject: "Thank You for order - Agreement from Netlex",
        // body: {
        //   contentType: "HTML",
        //   content:
        //     "Dear Customer, <br> Thank You for your order. Please find attached your agreement",
        // },
        subject: "Tack för din beställning - Avtal från Netlex",
        body: {
          contentType: "HTML",
          // content: "Kära kund, <br> Tack för din beställning. Bifogat ditt avtal",
          content: htmlContent,
        },
        toRecipients: [
          {
            emailAddress: {
              address: user.email,
              // address: "nadeem.mansha@aiotpl.com",
            },
          },
        ],
        attachments: [
          {
            "@odata.type": "#microsoft.graph.fileAttachment",
            // name: "NetlexAgreement.pdf",
            name: pdfFileName,
            // contentType: "application/pdf",
            // contentBytes: pdfBuffer.toString("base64"),
            // path: filePath,
            // contentBytes: fs.readFileSync(filePath,{encoding:"base64"}),
            // contentBytes: pdfBufferData.toString("base64"),
            contentBytes: pdfBufferData,
          },
        ],
      },
    },
    userDocumentMasterId: userDocumentMasterId,
    emailType: "agreementEmail",
    userDetails: user,
  };
  // if(body){
  //   res.send({body});
  // }
  const sendEmail = await utilService.sendEmail(authResponse, body);
}
exports.updateAnswer = async function (req, res) {
  // console.log("req.body",req.body)
  let documentAnswer = req.body.userInput;
  let agreementSentStatus = "";
  let paymentStatus = "";
  let userId = "";
  let paymentId = req.body.paymentId;
  let documentId = req.body.documentId;
  let masterId = req.body.masterId;
  let purchaseRequest = req.body.purchaseRequest;
  const documentField = await DocumentFieldModel.findOne({
    _id: documentAnswer[0].documentFieldId,
  });
  if (!documentField) {
    return res
      .status(404)
      .json({ err: "Err", msg: "Document fields not found" });
  }
  if (req.body.userID) {
    userId = req.body.userID;
  }
  let documentTemplateId = documentField.documentTemplateId;
  if (req.body.status === "FinalSaveAnswer") {
    agreementSentStatus = "Sent";
    paymentStatus = "Paid";
  } else {
    agreementSentStatus = "Not Sent";
    paymentStatus = "Not Paid";
  }
  // console.log("agreementSentStatus",agreementSentStatus)
  const savedUserDocumentMaster = await UserDocumentMaster.findOneAndUpdate(
    { _id: masterId },
    {
      userId: userId,
      agreementSentStatus: agreementSentStatus,
      paymentStatus: paymentStatus,
      documentTemplateId: documentId,
      generationDate: new Date(),
      paymentId: paymentId,
      purchaseRequest: purchaseRequest,
      // purchaseRequestStatus: 'Not Approved',
    }
  );

  console.log('savedUserDocumentMaster',savedUserDocumentMaster)
  if (!savedUserDocumentMaster) {
    return res
      .status(404)
      .json({ err: "Err", msg: "Error while saving user documents" });
  }

  UserDocuments.deleteMany(
    { masterId: savedUserDocumentMaster._id },
    (err, collection) => {
      if (err) throw err;
      console.log(collection + " Record(s) deleted successfully");
    }
  );

  let userDocumentList = [];

  documentAnswer.forEach((userDocumentDetails) => {
    let userDocument = {
      masterId: savedUserDocumentMaster._id,
      documentFieldId: userDocumentDetails.documentFieldId,
      fieldId: userDocumentDetails.fieldObjectId,
      answer: userDocumentDetails.answer,
    };
    userDocumentList.push(userDocument);
  });
  console.log('userDocumentList',userDocumentList)
  const savedUserDocuments = await UserDocuments.insertMany(userDocumentList);
  if (!savedUserDocuments) {
    return res
      .status(404)
      .json({ err: "Err", msg: "Error while saving user documents" });
  }
  console.log('savedUserDocuments',savedUserDocuments)

  // Generating document with user Inputs
  const docField = await DocumentField.findById(
    documentAnswer[0].documentFieldId
  ).populate("documentTemplateId");

  if (!docField) {
    return res.status(404).json({ err: "Err", msg: "Invalid Document Id" });
  }

  let docContent = docField.documentTemplateId.document;
  const pdfBuffer = await populateUserInputs2(docContent, documentAnswer, '', savedUserDocumentMaster);

  res.send({
    savedUserDocumentMaster,
    pdfBuffer,
  });
};

exports.saveAnswer = async function (req, res) {
  // save answer for document fields and generate pdf
  console.log("req.body in save answer", req.body)
  let documentAnswer = req.body.userInput;
  let userId = req.body.userID;
  let agreementrequestid = req.body.requestagreementid;
  console.log('agreementrequestid',agreementrequestid)
  let purchaseRequest = req.body.purchaseRequest;
  const documentField = await DocumentFieldModel.findOne({
    _id: documentAnswer[0].documentFieldId,
  });
  console.log("documentField", documentField)


  if (!documentField) {
    return res
      .status(404)
      .json({ err: "Err", msg: "Document fields not found" });
  }

  let userDocumentMaster = new UserDocumentMaster();

  if (userId) {
    userDocumentMaster.userId = userId;
  }
  console.log("userId", userId)
  console.log("documentField.documentTemplateId", documentField.documentTemplateId)
  // let getJavskontrollAnswers = await AgreementRequest.find({ userId, documentId: documentField.documentTemplateId })
  // .exec(function (err, data) {
  //   if (err) {
  //     // return res.status(500).json({ err })
  //     console.log('err finding javskontroll answers', err);
  //   } else {
  //     console.log('data', data);
  //     // return res.status(200).json({ data })
  //     // return res.status(200).json(data)
  //   }
  // });
  const documentId = documentField.documentTemplateId
  let bothUserAndDocumentId = {
    userId: userId.toString(),
    documentId: documentId.toString()
  }
  // console.log('bothUserAndDocumentId', bothUserAndDocumentId);
  // let getJavskontrollAnswers = await AgreementRequest.find({ userId, documentId: documentField.documentTemplateId });
  // console.log('getJavskontrollAnswers',getJavskontrollAnswers);

  userDocumentMaster.documentTemplateId = documentField.documentTemplateId;
  // userDocumentMaster.agreeementSentStatus = "Not Sent"; // CommentedByNadeem 24-03-2023
  userDocumentMaster.agreementSentStatus = "Not Sent";
  userDocumentMaster.paymentStatus = "Not Paid";
  userDocumentMaster.generationDate = new Date();
  userDocumentMaster.paymentId = "";
  userDocumentMaster.purchaseRequest = purchaseRequest;
  userDocumentMaster.agreementrequestid= agreementrequestid;

  const savedUserDocumentMaster = await userDocumentMaster.save();

  if (!savedUserDocumentMaster) {
    return res
      .status(404)
      .json({ err: "Err", msg: "Error while saving document" });
  }

  let userDocumentList = [];
  documentAnswer.forEach((userDocumentDetails) => {
    let userDocument = {
      masterId: savedUserDocumentMaster._id,
      documentFieldId: userDocumentDetails.documentFieldId,
      fieldId: userDocumentDetails.fieldObjectId,
      answer: userDocumentDetails.answer,
      agreementrequestid:userDocumentDetails.agreementrequestid
    };
    userDocumentList.push(userDocument);
  });
  const savedUserDocuments = await UserDocuments.insertMany(userDocumentList);
  if (!savedUserDocuments) {
    return res
      .status(404)
      .json({ err: "Err", msg: "Error while saving user documents" });
  }

  if (req.body.status === "SaveAnswer") {
    // Generating document with user Inputs
    const docField = await DocumentField.findById(
      documentAnswer[0].documentFieldId
    ).populate("documentTemplateId");

    if (!docField) {
      return res.status(404).json({ err: "Err", msg: "Invalid Document Id" });
    }

    let docContent = docField.documentTemplateId.document;
    const pdfBuffer = await populateUserInputs(docContent, documentAnswer, '', bothUserAndDocumentId);
    // console.log("documentId",documentId);

    // fs.writeFileSync('some.pdf', pdfBuffer);
    res.send({
      savedUserDocumentMaster,
      pdfBuffer,
    });
  } else {
    return res.status(200).json(savedUserDocumentMaster._id);
  }
};

exports.getMyPurchase = async function (req, res) {
  // get purchase data by userID
  console.log("reached")
  let userId = req.body.userId;
  let document = [];
  const paymentInfo = await paymentModel.find({ userId: userId });
  if (!paymentInfo) {
    return res.status(404).json({ error: "Invalid UserId" });
  }
  paymentInfo.forEach((documentTemplateId) => {
    document.push(documentTemplateId.documentId);
  });
  const documentId = await Document.find({
    $and: [{ _id: { $in: document } }],
  });
  if (!documentId) {
    return res.status(404).json({ error: "Invalid UserId" });
  }

  let Array = [];
  paymentInfo.forEach((element, index) => {
    // console.log("element", element);
    //Because PaymentDate field is now string so converting before split
    let PaymentDate = element.paymentDate.toISOString().split("T")[0];
    let PaymentTime = element.paymentDate.toISOString().split("T")[1];
    let hours = Number(PaymentTime.match(/^(\d+)/)[1]);
    let minutes = Number(PaymentTime.match(/:(\d+)/)[1]);
    let AM_PM = hours >= 12 ? "PM" : "AM";
    //  let fofo = PaymentDate.split('-').join('/');
    // console.log("fofo", fofo);

    PaymentTime = hours + ":" + minutes + " " + AM_PM;
    // console.log("PaymentTime", PaymentTime);
    UserModel.findById(element.userId).exec(function (err, doc) {
      console.log("doc", doc)
      if (err || doc === null) {
        console.log("UserNotFound");
      } else {
        Array.push({
          _id: element._id,
          transaction_Id: element.transaction_Id,
          gatewayResponse: element.gatewayResponse,
          userId: element.userId,
          // userName: element.userName,
          userName: doc.userName,
          amount: element.amount,
          paymentDate: element.paymentDate,
          time: PaymentTime,
          date: PaymentDate,
          paymentMethod: element.paymentMethod,
          status: element.status,
          __v: element.__v,
        });
        // if(Array && Array!== undefined){
        //   console.log("Array",Array)
        //   Array[index].key3 = "hello";
        // }
        if (index === paymentInfo.length - 1) {
          console.log("Array", Array);
          return res.status(200).json({ paymentInfo: Array, documentId });
        }
      }
    })

  });


  // const documentId = await Document.find({
  //   $and: [{ _id: { $in: document } }],
  // });
  // if (!documentId) {
  //   return res.status(404).json({ error: "Invalid UserId" });
  // }
  // return res.status(200).json({ paymentInfo, documentId });
};

//  exports.getPdfBuffer = async function (req, res) {
//     const documentId = req.body.document;
//     const masterId = req.body.master_id;
//     const documentAnswer = [];
//     const document = await UserDocuments.find({masterId: masterId}).populate('documentFieldId');
//     const documentTemplate = await Document.findById({_id: documentId});
//      document.forEach(documentField => {
//          documentAnswer.push({
//              answer: documentField.answer,
//              fieldObjectId: documentField.fieldId,
//          });
//      })
//      let docContent =  documentTemplate.document;

//     const pdfBuffer = await populateUserInputs(docContent, documentAnswer, true);
//      return res.status(200).json({pdfBuffer});
//  }
exports.getPdfBuffer = async function (req, res) {
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
  const documentId = req.body.document;

  const masterId = req.body.master_id;

  const Masterd = await UserDocumentMaster.find({ paymentId: masterId });

  console.log(Masterd);
  console.log(Masterd[0]._id);

  const documentAnswer = [];

  const document = await UserDocuments.find({
    masterId: Masterd[0]._id,
  }).populate("documentFieldId");

  const documentTemplate = await Document.findById({ _id: documentId });

  document.forEach((documentField) => {
    documentAnswer.push({
      answer: documentField.answer,

      fieldObjectId: documentField.fieldId,
    });
  });

  let docContent = documentTemplate.document;

  const pdfBuffer = await populateUserInputs(docContent, documentAnswer, true, '625');

  return res.status(200).json({ pdfBuffer });
};
async function populateUserInputs(
  docContent,
  documentAnswer,
  includeWaterMark = true,
  bothUserAndDocumentId
) {
  // console.log('bothUserAndDocumentId', bothUserAndDocumentId);
  // console.log('docContent', docContent);
  docContent = '<div style="margin: 100px">' + docContent + "</div>"
  //=== Get Javskontroll All Answers ===
  let getJavskontrollAnswers = await AgreementRequest.find(
    {
      userId: bothUserAndDocumentId.userId,
      documentId: bothUserAndDocumentId.documentId
    }
  );
  // console.log('getJavskontrollAnswers', getJavskontrollAnswers);

  //=== Client who create agreement ===
  console.log('getJavskontrollAnswers[0]',getJavskontrollAnswers)
  javskontrollClient = getJavskontrollAnswers[0].user;

  //=== All Counterparties Answers ===
  javskontrollCounterparties = getJavskontrollAnswers[0].questionAndAnswers;


  //=== Create Content User Created Agreement(Document) ===
  let userContent = "";
  userContent += javskontrollClient.userName + "(" + javskontrollClient.ssn + ")"
  console.log('userContent', userContent);

  //=== Create Content Javskontroll All Counterparties ===
  let counterpartiesContent = "";
  javskontrollCounterparties.forEach((element, index) => {
    // console.log('element', element);
    counterpartiesContent += element.answer1 + "(" + element.answer2 + ")"

    if (javskontrollCounterparties.length > 1 && index === (javskontrollCounterparties.length - 2)) {
      counterpartiesContent += " och "
    } else if (index !== (javskontrollCounterparties.length - 1)) {
      counterpartiesContent += ", "
    }
  })
  console.log('counterpartiesContent', counterpartiesContent);

  // replace the answer for fields
  let replacedString = docContent;
  console.log('replacedString before', replacedString);
  let pdfBuffer;
  try {
    documentAnswer.forEach(function (data) {
      replacedString = replacedString
        .split("[[" + data.fieldObjectId + "]]")
        .join(data.answer);
    });
    // replacedString = replacedString.split(/1[\s\S]*?1/).join("Nadeem");
    // replacedString = replacedString.split(/2[\s\S]*?2/).join("Hamza , Danish");
    // replacedString = replacedString.split("[62173c83173278ec7c631dd9]").join("Client");
    // replacedString = replacedString.split("[924c362h652590o26f365dr2]").join("All CounterParties");
    replacedString = replacedString.split("[#62173c83173278ec7c631dd9#]").join(userContent);
    replacedString = replacedString.split("[#924c362h652590o26f365dr2#]").join(counterpartiesContent);
    replacedString = replacedString.split(/{#[\s\S]*?#}/).join("");
    replacedString = replacedString.split(/{{[\s\S]*?}}/).join("");
    console.log('replacedString after', replacedString);
    // if (!includeWaterMark) {
    //   replacedString = replacedString.substring(0, replacedString.length * 0.7);
    //   replacedString =
    //     "<div style='position: absolute;\n" +
    //     "                color: #f1f1f1;\n" +
    //     "                width: 100%;\n" +
    //     "                top: 343px;\n" +
    //     "                opacity:2;\n" +
    //     "                padding: 19px;\n" +
    //     '                text-align: center;\'><svg  width="550" height="550" viewBox="0 0 143 136" fill="none" xmlns="http://www.w3.org/2000/svg">\\n\' +\n' +
    //     "             '<g filter=\"url(#filter0_d)\">\\n' +\n" +
    //     '             \'<ellipse rx="67.3903" ry="63.899" transform="matrix(0.999999 0.00148894 -0.001718 0.999998 71.5002 63.9992)" fill="white"/>\\n\' +\n' +
    //     '             \'<path d="M138.64 64.0992C138.58 99.2391 108.484 127.703 71.3908 127.648C34.2976 127.593 4.29958 99.0392 4.35995 63.8992C4.42032 28.7593 34.5163 0.29511 71.6095 0.35034C108.703 0.40557 138.701 28.9592 138.64 64.0992Z" stroke="#1F2A53" stroke-opacity="0.4" stroke-width="0.5"/>\\n\' +\n' +
    //     "             '</g>\\n' +\n" +
    //     '             \'<path d="M111.685 64.0622C111.65 85.0859 93.6428 102.124 71.4371 102.091C49.2313 102.057 31.2817 84.9641 31.3172 63.9403C31.3526 42.9165 49.3598 25.8782 71.5655 25.9119C93.7713 25.9456 111.721 43.0384 111.685 64.0622Z" stroke="#1F2A53" stroke-opacity="0.4" stroke-width="0.5"/>\\n\' +\n' +
    //     '             \'<path d="M77.3534 73.0041L73.6913 72.9985L66.5821 61.2934L66.5624 72.9877L62.9003 72.9822L62.9303 55.2088L66.5924 55.2143L73.7137 66.9439L73.7335 55.2251L77.3834 55.2307L77.3534 73.0041Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M87.0927 19.79L85.6539 19.5154L83.8242 14.4051L82.8529 18.9808L81.414 18.7062L82.8903 11.7518L84.3291 12.0264L86.1616 17.1473L87.1349 12.5619L88.569 12.8356L87.0927 19.79Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M62.887 116.031L61.4701 115.659L60.0223 110.445L58.7119 114.936L57.295 114.564L59.2867 107.739L60.7036 108.111L62.1533 113.336L63.4665 108.836L64.8786 109.206L62.887 116.031Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M102.745 24.7326L100.223 23.4881L99.3068 25.1575L102.267 26.6181L101.701 27.6497L97.427 25.5409L100.848 19.3085L105.112 21.4129L104.542 22.4531L101.59 20.9968L100.775 22.4822L103.297 23.7267L102.745 24.7326Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M40.8426 104.726L43.2724 106.143L42.2365 107.74L39.3848 106.078L38.7446 107.066L42.8619 109.465L46.7293 103.5L42.6205 101.105L41.9751 102.101L44.8183 103.758L43.8966 105.18L41.4668 103.763L40.8426 104.726Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M118.362 33.8617L116.771 32.3747L112.503 36.4807L111.433 35.4804L115.701 31.3744L114.132 29.9074L114.987 29.0848L119.218 33.0391L118.362 33.8617Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M28.1651 97.6262L26.7006 96.0144L31.2876 92.2675L30.3026 91.1833L25.7156 94.9302L24.2709 93.3401L23.3519 94.0907L27.2462 98.3768L28.1651 97.6262Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M120.212 49.2708L121.671 52.018L120.609 52.5249L118.463 48.4838L124.879 45.4215L125.566 46.7154L120.212 49.2708Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M21.4047 75.6868L20.6807 72.6618L21.8311 72.4143L22.8961 76.8638L15.9458 78.3594L15.6048 76.9348L21.4047 75.6868Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M122.27 82.3507L123.983 84.4951L123.282 86.027L120.883 82.8036L116.685 83.3723L117.393 81.8226L120.265 81.5262L118.531 79.3359L119.239 77.7862L121.671 81.0807L125.792 80.5386L125.092 82.0706L122.27 82.3507Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M25.1121 41.7442L26.8247 43.8886L26.124 45.4206L23.7246 42.1972L19.5265 42.7658L20.2352 41.2161L23.107 40.9198L21.3725 38.7295L22.0812 37.1797L24.5125 40.4743L28.6341 39.9322L27.9335 41.4642L25.1121 41.7442Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<rect width="7.49541" height="1.41491" transform="matrix(-0.00574245 0.999984 0.999987 0.00516287 125.462 62.292)" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<rect width="7.49541" height="1.41491" transform="matrix(-0.00574245 0.999984 0.999987 0.00516287 121.924 62.2715)" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<rect width="8.10544" height="1.25554" transform="matrix(-0.231757 0.972774 0.97782 0.209446 22.5137 53.0625)" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<rect width="8.10544" height="1.25554" transform="matrix(-0.231757 0.972774 0.97782 0.209446 18.9727 52.3057)" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<rect width="8.10544" height="1.25554" transform="matrix(-0.231757 0.972774 0.97782 0.209446 15.4395 51.5488)" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     "             '<defs>\\n' +\n" +
    //     '             \'<filter id="filter0_d" x="0.109375" y="0.100586" width="142.781" height="135.798" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\\n\' +\n' +
    //     '             \'<feFlood flood-opacity="0" result="BackgroundImageFix"/>\\n\' +\n' +
    //     '             \'<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\\n\' +\n' +
    //     "             '<feOffset dy=\"4\"/>\\n' +\n" +
    //     "             '<feGaussianBlur stdDeviation=\"2\"/>\\n' +\n" +
    //     '             \'<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>\\n\' +\n' +
    //     '             \'<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>\\n\' +\n' +
    //     '             \'<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>\\n\' +\n' +
    //     "             '</filter>\\n' +\n" +
    //     "             '</defs>\\n' +\n" +
    //     "             '</svg></div>" +
    //     replacedString;
    // }
    let options = { format: "A4", printBackground: true,margin : {left :"0.5in",right:"0.5in",top:"1in",bottom:"1in"} };
    let file = { content: replacedString };
    pdfBuffer = await html_to_pdf.generatePdf(file, options);
  } catch (e) {
    console.error(e);
  }

  return pdfBuffer;
}
exports.getPdfBuffer2 = async function (req, res) {
  console.log("BBBBBBBBBBBBBBBBBBBBBBBsdfsadfasd")
  const documentId = req.body.document;

  const masterId = req.body.master_id;

  const Masterd = await UserDocumentMaster.find({ paymentId: masterId });

  console.log(Masterd);
  console.log(Masterd[0]._id);

  const documentAnswer = [];

  const document = await UserDocuments.find({
    masterId: Masterd[0]._id,
  }).populate("documentFieldId");

  const documentTemplate = await Document.findById({ _id: documentId });

  document.forEach((documentField) => {
    documentAnswer.push({
      answer: documentField.answer,

      fieldObjectId: documentField.fieldId,
    });
  });

  let docContent = documentTemplate.document;

  const pdfBuffer = await populateUserInputs2(docContent, documentAnswer, true, Masterd[0]);

  return res.status(200).json({ pdfBuffer });
};
async function populateUserInputs2(
  docContent,
  documentAnswer,
  includeWaterMark = true,
  bothUserAndDocumentId
) {
  // console.log('bothUserAndDocumentId', bothUserAndDocumentId);
  // console.log('docContent', docContent);
  docContent = '<div style="margin: 100px">' + docContent + "</div>"
  //=== Get Javskontroll All Answers ===
  let getJavskontrollAnswers = await AgreementRequest.find(
    {
      userId: bothUserAndDocumentId.userId,
      documentId: bothUserAndDocumentId.documentTemplateId
    }
  );
  // console.log('getJavskontrollAnswers', getJavskontrollAnswers);

  //=== Client who create agreement ===
  console.log('getJavskontrollAnswers[0]sdafsdfsdfsdf',getJavskontrollAnswers)
  javskontrollClient = getJavskontrollAnswers[0].user;

  //=== All Counterparties Answers ===
  javskontrollCounterparties = getJavskontrollAnswers[0].questionAndAnswers;


  //=== Create Content User Created Agreement(Document) ===
  let userContent = "";
  userContent += javskontrollClient.userName + "(" + javskontrollClient.ssn + ")"
  console.log('userContent', userContent);

  //=== Create Content Javskontroll All Counterparties ===
  let counterpartiesContent = "";
  javskontrollCounterparties.forEach((element, index) => {
    // console.log('element', element);
    counterpartiesContent += element.answer1 + "(" + element.answer2 + ")"

    if (javskontrollCounterparties.length > 1 && index === (javskontrollCounterparties.length - 2)) {
      counterpartiesContent += " och "
    } else if (index !== (javskontrollCounterparties.length - 1)) {
      counterpartiesContent += ", "
    }
  })
  console.log('counterpartiesContent', counterpartiesContent);

  // replace the answer for fields
  let replacedString = docContent;
  console.log('replacedString before', replacedString);
  let pdfBuffer;
  try {
    documentAnswer.forEach(function (data) {
      replacedString = replacedString
        .split("[[" + data.fieldObjectId + "]]")
        .join(data.answer);
    });
    // replacedString = replacedString.split(/1[\s\S]*?1/).join("Nadeem");
    // replacedString = replacedString.split(/2[\s\S]*?2/).join("Hamza , Danish");
    // replacedString = replacedString.split("[62173c83173278ec7c631dd9]").join("Client");
    // replacedString = replacedString.split("[924c362h652590o26f365dr2]").join("All CounterParties");
    replacedString = replacedString.split("[#62173c83173278ec7c631dd9#]").join(userContent);
    replacedString = replacedString.split("[#924c362h652590o26f365dr2#]").join(counterpartiesContent);
    replacedString = replacedString.split(/{#[\s\S]*?#}/).join("");
    replacedString = replacedString.split(/{{[\s\S]*?}}/).join("");
    console.log('replacedString after', replacedString);
    // if (!includeWaterMark) {
    //   replacedString = replacedString.substring(0, replacedString.length * 0.7);
    //   replacedString =
    //     "<div style='position: absolute;\n" +
    //     "                color: #f1f1f1;\n" +
    //     "                width: 100%;\n" +
    //     "                top: 343px;\n" +
    //     "                opacity:2;\n" +
    //     "                padding: 19px;\n" +
    //     '                text-align: center;\'><svg  width="550" height="550" viewBox="0 0 143 136" fill="none" xmlns="http://www.w3.org/2000/svg">\\n\' +\n' +
    //     "             '<g filter=\"url(#filter0_d)\">\\n' +\n" +
    //     '             \'<ellipse rx="67.3903" ry="63.899" transform="matrix(0.999999 0.00148894 -0.001718 0.999998 71.5002 63.9992)" fill="white"/>\\n\' +\n' +
    //     '             \'<path d="M138.64 64.0992C138.58 99.2391 108.484 127.703 71.3908 127.648C34.2976 127.593 4.29958 99.0392 4.35995 63.8992C4.42032 28.7593 34.5163 0.29511 71.6095 0.35034C108.703 0.40557 138.701 28.9592 138.64 64.0992Z" stroke="#1F2A53" stroke-opacity="0.4" stroke-width="0.5"/>\\n\' +\n' +
    //     "             '</g>\\n' +\n" +
    //     '             \'<path d="M111.685 64.0622C111.65 85.0859 93.6428 102.124 71.4371 102.091C49.2313 102.057 31.2817 84.9641 31.3172 63.9403C31.3526 42.9165 49.3598 25.8782 71.5655 25.9119C93.7713 25.9456 111.721 43.0384 111.685 64.0622Z" stroke="#1F2A53" stroke-opacity="0.4" stroke-width="0.5"/>\\n\' +\n' +
    //     '             \'<path d="M77.3534 73.0041L73.6913 72.9985L66.5821 61.2934L66.5624 72.9877L62.9003 72.9822L62.9303 55.2088L66.5924 55.2143L73.7137 66.9439L73.7335 55.2251L77.3834 55.2307L77.3534 73.0041Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M87.0927 19.79L85.6539 19.5154L83.8242 14.4051L82.8529 18.9808L81.414 18.7062L82.8903 11.7518L84.3291 12.0264L86.1616 17.1473L87.1349 12.5619L88.569 12.8356L87.0927 19.79Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M62.887 116.031L61.4701 115.659L60.0223 110.445L58.7119 114.936L57.295 114.564L59.2867 107.739L60.7036 108.111L62.1533 113.336L63.4665 108.836L64.8786 109.206L62.887 116.031Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M102.745 24.7326L100.223 23.4881L99.3068 25.1575L102.267 26.6181L101.701 27.6497L97.427 25.5409L100.848 19.3085L105.112 21.4129L104.542 22.4531L101.59 20.9968L100.775 22.4822L103.297 23.7267L102.745 24.7326Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M40.8426 104.726L43.2724 106.143L42.2365 107.74L39.3848 106.078L38.7446 107.066L42.8619 109.465L46.7293 103.5L42.6205 101.105L41.9751 102.101L44.8183 103.758L43.8966 105.18L41.4668 103.763L40.8426 104.726Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M118.362 33.8617L116.771 32.3747L112.503 36.4807L111.433 35.4804L115.701 31.3744L114.132 29.9074L114.987 29.0848L119.218 33.0391L118.362 33.8617Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M28.1651 97.6262L26.7006 96.0144L31.2876 92.2675L30.3026 91.1833L25.7156 94.9302L24.2709 93.3401L23.3519 94.0907L27.2462 98.3768L28.1651 97.6262Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M120.212 49.2708L121.671 52.018L120.609 52.5249L118.463 48.4838L124.879 45.4215L125.566 46.7154L120.212 49.2708Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M21.4047 75.6868L20.6807 72.6618L21.8311 72.4143L22.8961 76.8638L15.9458 78.3594L15.6048 76.9348L21.4047 75.6868Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M122.27 82.3507L123.983 84.4951L123.282 86.027L120.883 82.8036L116.685 83.3723L117.393 81.8226L120.265 81.5262L118.531 79.3359L119.239 77.7862L121.671 81.0807L125.792 80.5386L125.092 82.0706L122.27 82.3507Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<path d="M25.1121 41.7442L26.8247 43.8886L26.124 45.4206L23.7246 42.1972L19.5265 42.7658L20.2352 41.2161L23.107 40.9198L21.3725 38.7295L22.0812 37.1797L24.5125 40.4743L28.6341 39.9322L27.9335 41.4642L25.1121 41.7442Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<rect width="7.49541" height="1.41491" transform="matrix(-0.00574245 0.999984 0.999987 0.00516287 125.462 62.292)" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<rect width="7.49541" height="1.41491" transform="matrix(-0.00574245 0.999984 0.999987 0.00516287 121.924 62.2715)" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<rect width="8.10544" height="1.25554" transform="matrix(-0.231757 0.972774 0.97782 0.209446 22.5137 53.0625)" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<rect width="8.10544" height="1.25554" transform="matrix(-0.231757 0.972774 0.97782 0.209446 18.9727 52.3057)" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     '             \'<rect width="8.10544" height="1.25554" transform="matrix(-0.231757 0.972774 0.97782 0.209446 15.4395 51.5488)" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
    //     "             '<defs>\\n' +\n" +
    //     '             \'<filter id="filter0_d" x="0.109375" y="0.100586" width="142.781" height="135.798" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\\n\' +\n' +
    //     '             \'<feFlood flood-opacity="0" result="BackgroundImageFix"/>\\n\' +\n' +
    //     '             \'<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\\n\' +\n' +
    //     "             '<feOffset dy=\"4\"/>\\n' +\n" +
    //     "             '<feGaussianBlur stdDeviation=\"2\"/>\\n' +\n" +
    //     '             \'<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>\\n\' +\n' +
    //     '             \'<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>\\n\' +\n' +
    //     '             \'<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>\\n\' +\n' +
    //     "             '</filter>\\n' +\n" +
    //     "             '</defs>\\n' +\n" +
    //     "             '</svg></div>" +
    //     replacedString;
    // }
    let options = { format: "A4", printBackground: true,margin : {left :"0.5in",right:"0.5in",top:"1in",bottom:"1in"} };
    let file = { content: replacedString };
    pdfBuffer = await html_to_pdf.generatePdf(file, options);
  } catch (e) {
    console.error(e);
  }

  return pdfBuffer;
}
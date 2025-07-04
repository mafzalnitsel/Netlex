// Include config and modules
const config = require("./config");
const jwt = require("jsonwebtoken");
const Auth = require("./controllers/auth.js");
const User = require("./controllers/user.js");
const path = require("path");
const UserModel = require("./models/user");
const Schedule = require("./controllers/schedule");
const Scheduleapp = require("./controllers/scheduleapp");
const LawyerBusyTime = require("./controllers/LawyerBusyTime");

const uploadFile = require("./controllers/uploadFile");
const Field = require("./controllers/field.js");
const AnswerType = require("./controllers/answerType");
const DocumentContent = require("./controllers/document");
const AnswerOption = require("./controllers/answerOption");
const DocumentFields = require("./controllers/documentField");
const Payment = require("./controllers/payment");
const Lawyer = require("./controllers/lawyer");
const QuestionAndAnswer = require("./controllers/question-and-answer");
const userDocumentMaster = require("./controllers/userDocumentMaster");

const CheckDataForetag = require("./controllers/CheckDataForetag");
const CheckDataPrivatePerson = require("./controllers/CheckDataPrivatePerson");

const BusinessType = require("./controllers/businessType");
const ContentPages = require("./controllers/contentpages");

const Sale = require("./controllers/salesController");

//const Sale = require("./controllers/salesController");
const contentpage = require("./controllers/contentpage");
const aboutus = require("./controllers/aboutus");
const clientsDetails = require("./controllers/clientsDetails");
const ClientsDetailsQuestion = require("./controllers/clientsDetailsQuestion");
// const getKlarna = require("./controllers/klarnaPayment");
// const Configuration = require("./controllers/configuration");
const FindUs = require("./controllers/find-us");
const BusinessAgreement = require("./controllers/businessAgreements");
const AgreementRequest = require("./controllers/agreementRequest");
const AISupport = require("./controllers/ai-support.js");

// Authentication Middleware
function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: "TokenMissing" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send({ error: "TokenMissing" });
  }
  let payload = null;
  try {
    payload = jwt.verify(token, config.TOKEN_SECRET);
    if (!payload) {
      return res.status(401).send({ error: "TokenInvalid" });
    }
    UserModel.findById(payload.subject, function (err, user) {
      if (!user) {
        return res.status(401).send({ error: "UserNotFound" });
      } else {
        req.user = user;
        next();
      }
    });
  } catch (err) {
    console.error("error", err);
    return res.status(401).send({ error: "TokenInvalid" });
  }
}

// Routes
module.exports = function (app) {
  // Authentication Routes
  app.post("/initiateBankIdAuth", Auth.initiateBankIdAuth);
  app.post("/initiateBankIdAuthForSignUp", Auth.initiateBankIdAuthForSignUp);
  app.post("/bankIdAuth", Auth.bankIdAuth);
  app.post("/bankIdAuthLogin", Auth.bankIdAuthLogin);
  app.post("/collectBankIdAuth", Auth.collectBankIdAuth);

  // app.get('/CheckDataForetag' , CheckDataForetag.get);
  // app.get('/CheckDataPrivatePerson' , CheckDataPrivatePerson.get);
  // User Routes
  app.get("/user/:id", User.show);
  app.post("/createUser", User.createUser);
  app.post("/user/update", User.userUpdate);
  app.post("/user/delete", User.userDelete);
  app.post("/user/addOrganization", User.addOrganization);
  app.post(
    "/createOrUpdateNotRegisterUser",
    User.createOrUpdateNotRegisterUser
  );
  app.get("/user/requests/:id", User.getRequests);
  app.post("/user/processRequests", User.processRequests);
  app.post("/user/createAdmin", User.createAdmin);
  app.post("/checkOrganisationSsn", User.checkOrganisationSsn);
  app.post("/updateAsOrganizationUser", User.updateAsOrganizationUser);
  app.post("/getOrganizationUserDetails", User.getOrganizationUserDetails);
  // app.post('/bankIdOnThisDevice', User.bankIdOnThisDevice);
  //Scheduleapp

  app.post("/Scheduleapp", Scheduleapp.scheduleappSave);
  //Scheduler
  app.post("/schedule", Schedule.scheduleSave);
  app.post("/uploadFile", ensureAuthenticated, uploadFile.uploadFile);
  app.get("/getFile", ensureAuthenticated, uploadFile.uploadFile);
  app.get("/scheduleById/:id", Schedule.scheduleById);
  app.put("/ScheduleupdateIspaid/:id", Schedule.ScheduleupdateIspaid);

  //checkBox
  app.get("/CheckDataForetag", CheckDataForetag.get);
  app.get("/CheckDataPrivatePerson", CheckDataPrivatePerson.get);

  //Scheduler
  app.post("/uploadFile", ensureAuthenticated, uploadFile.uploadFile);
  app.get("/getFile", ensureAuthenticated, uploadFile.uploadFile);
  app.get("/scheduleList", Schedule.getScheduleList);
  app.put("/updateSchedule/:id", ensureAuthenticated, Schedule.Scheduleupdate);
  app.get("/schedulerData/:id", Schedule.show);

  //BusinessType Type routes

  app.get("/businessTypeall", BusinessType.getActivebusinessTypes);
  app.get("/businessTypedetails/:id", BusinessType.show);

  //QuestionAndAnswer Type routes

  app.get("/questionAndAnswer", QuestionAndAnswer.getActiveQuestionAndAnswer);
  app.get("/questionAndAnswer/list", QuestionAndAnswer.list);

  //Fields routes
  app.post("/field/update", ensureAuthenticated, Field.update);
  app.get("/getAnswerOption/:id", ensureAuthenticated, Field.getAnswerOption);
  app.get("/field/:id", Field.get);
  app.post("/field/save", ensureAuthenticated, Field.save);
  app.get("/activeFields/:documentId", Field.getActiveFields);
  app.post(
    "/deleteLocalFieldById",
    ensureAuthenticated,
    Field.deleteLocalFieldById
  );
  app.get(
    "/fieldCheck/:fieldName/:documentId/:fieldType",
    ensureAuthenticated,
    Field.fieldCheck
  );
  app.post("/saveTemplateId", ensureAuthenticated, Field.saveTemplateId);
  app.post("/deleteByFieldsId", ensureAuthenticated, Field.deleteByFieldsId);

  //Answer Option routes

  app.get(
    "/getAnswer/:id",
    ensureAuthenticated,
    AnswerOption.getAnswerOptionByFieldId
  );
  app.delete("/answerOption/:id", ensureAuthenticated, AnswerOption.delete);
  app.post("/answerOption/create", ensureAuthenticated, AnswerOption.save);

  //fake data

  //Answer Type routes
  app.get("/activeAnswerType", AnswerType.getActiveAnswerType);

  // File download routes
  app.get("/download/:filename", ensureAuthenticated, (req, res) => {
    const file = path.resolve("uploadedFiles", req.params.filename);
    res.download(file);
  });

  //draft documentdelete
  app.get(
    "/documentListByStatus/delete/:id",
    DocumentContent.draftdeletebycomponent
  );

  // Agreement Requests Routes (JavskontrollAnswers Routes)
  app.get(
    "/getAgreeementRequestByUserId",
    AgreementRequest.getAgreeementRequestByUserId
  );
  app.post("/agreementRequest/create", AgreementRequest.save);

  //Client Details Questions(Javskontroll Questions)
  app.get("/getAllClientsDetailsQuestion", ClientsDetailsQuestion.getAll);

  // Document Routes
  app.post("/documentContent", DocumentContent.save);
  app.get("/documentList", DocumentContent.getAllDocuments);
  app.post("/getFieldsByDocumentId", DocumentFields.getFieldsByDocumentId);
  app.post("/submitAnswer", DocumentFields.saveAnswer);
  app.post("/getExistDocument", DocumentContent.getDocumentByUserId);
  app.get(
    "/getDocumentDetailsByDocumentId/:id",
    DocumentContent.getDocumentDetailsByDocumentId
  );
  app.post("/getMyPurchase", DocumentFields.getMyPurchase);
  app.get("/fieldById/:id", Field.fieldById);
  //app.get('/fieldByIddelete/:id', Field.deleteLocalFieldById);

  app.get("/getAnswerByMasterId/:id", DocumentContent.getAnswerByMasterId);
  // app.get( "/documentListByStatus/:value", DocumentContent.getAllDocumentsByStatus );
  app.get("/documentListByStatus", DocumentContent.getAllDocumentsByStatus);
  app.post(
    "/deleteDocument",
    ensureAuthenticated,
    DocumentContent.deleteDocument
  );
  app.post(
    "/publishDocument",
    ensureAuthenticated,
    DocumentContent.publishDocument
  );
  app.get("/documentById/:id", DocumentContent.documentById);
  app.post("/updateAnswer", DocumentFields.updateAnswer);
  app.post(
    "/updateAgreementPaymentStatus",
    DocumentFields.updateAgreementPaymentStatus
  );
  app.post("/getPdfBuffer", DocumentFields.getPdfBuffer);
  app.post("/getPdfBuffer2", DocumentFields.getPdfBuffer2);
  app.post(
    "/deleteDocumentCancelledByUser",
    DocumentContent.deleteDocumentCancelledByUser
  );
  app.get(
    "/getDocumentFieldsById/:documentFieldId",
    DocumentContent.getDocumentFieldsById
  );
  //BusinessAgreement Routes
  app.get(
    "/businessAgreementsListByStatus/:value",
    BusinessAgreement.businessAgreementsListByStatus
  );

  app.get(
    "/businessAgreementById/:id",
    BusinessAgreement.businessAgreementById
  );

  // Payment Routes

  app.post("/Payment", Payment.payments);

  app.post("/PaymentNew", Payment.paymentNew);

  app.post("/getPayment", Payment.getPayment);

  app.post("/getPaymentsale", Payment.getPaymentsale);

  ////////sale new /////

  app.post("/meetingSales", Sale.getMeetingSales);

  // app.post('/salePayment', Sale.payments);
  // app.post('/SalegetPayment', Sale.getPayment);

  // app.post('/salepostdata', Sale.save);

  // laywers
  app.get("/getLawyers", Lawyer.getActiveLawyers);

  app.post("/lawyerpostdata", Lawyer.save);

  app.get("/getLawyersWithAvailability", Lawyer.getLawyersWithAvailability);

  // app.get('/getLawyersWithAvailability', Lawyer.getLawyersWithAvailability);
  //contentpage
  app.get("/getContentPage/:name", contentpage.getContentPage);
  app.get(
    "/getclientsDetailstoSsn/:toSsn",
    clientsDetails.getclientsDetailstoSsn
  );

  app.get(
    "/getclientsDetailstossnto/:toSsn",
    clientsDetails.getclientsDetailstossnto
  );

  app.get(
    "/getclientsDetailstoEmail/:toEmail",
    clientsDetails.getclientsDetailstoEmail
  );
  app.get(
    "/getclientsDetailstoPhoneNumber/:toPhoneNumber",
    clientsDetails.getclientsDetailstoPhoneNumber
  );
  app.get("/getaboutus", aboutus.getaboutus);
  app.get("/contentPage/:name", ContentPages.getActiveContentPage);
  app.get("/contentPage", ContentPages.getNetlexOfficeTimings);
  app.get("/aboutUs", ContentPages.getActiveAboutUs);
  app.get("/getActiveshowLawyerToUser", Lawyer.getActiveshowLawyerToUser);
  app.get(
    "/getActiveshowLawyerToUserList",
    Lawyer.getActiveshowLawyerToUserList
  );

  app.get("/getLawyerById/:id", Lawyer.show);

  // //-----------Configuration Route-------------
  // app.put("/configuration/update/:id", ensureAuthenticated, Configuration.update);
  // app.get('/configuration/:name', ensureAuthenticated, Configuration.getConfiguration);

  //-----------Find Us Route-------------
  app.get("/getFindUs", FindUs.getActiveFindUs);
  app.get("/lawyerbusytimes", LawyerBusyTime.getAllLawyerBusyTimes);

  // ----------- AI Support -------------

  app.post("/chat/getAISupport", AISupport.getAIMessage);
};

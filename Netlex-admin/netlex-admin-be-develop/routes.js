// Include config and modules
const config = require("./config");
const jwt = require("jsonwebtoken");
const Auth = require("./controllers/auth.js");
const User = require("./controllers/user.js");
const Userfe = require("./controllers/userfe.js");
const Field = require("./controllers/field.js");
const salesController = require("./controllers/salesController.js");
const Catergory = require("./controllers/categories");
const AnswerType = require("./controllers/answerType");
const FakeData = require("./controllers/fakedata");
const path = require("path");
const UserModel = require("./models/user");
const DocumentContent = require("./controllers/document");
const BusinessAgreement = require("./controllers/businessAgreements");
const AnswerOption = require("./controllers/answerOption");
const DocumentFields = require("./controllers/documentField");
const uploadProfile = require("./controllers/upload");
const Schedule = require("./controllers/schedule");
const Lawyer = require("./controllers/lawyer");
const BusinessType = require("./controllers/businessType");
const ClientsDetails = require("./controllers/clientsDetails");
const QuestionAndAnswer = require("./controllers/question-and-answer");
const ContentPages = require("./controllers/contentPage");
const AboutUs = require("./controllers/about-us");
const EmailLog = require("./controllers/emailLog");
const EmailConfiguration = require("./controllers/emailConfiguration");
const PaymentsConfiguration = require("./controllers/paymentsConfiguration");
const Colors = require("./controllers/colors");
const FindUs = require("./controllers/find-us");
const AgreementRequest = require("./controllers/agreementRequest");
const ClientsDetailsQuestion = require("./controllers/clientsDetailsQuestion");
const LawyerBusyTime = require("./controllers/lawyerBusyTime");
const CheckDataPrivatePerson =  require("./controllers/CheckDataPrivatePerson")
const CheckDataForetag =  require("./controllers/CheckDataForetag")


const Payment = require("./controllers/payment");
 

const ContentPage = require("./controllers/contentpages");


const RoleAction = require ("./controllers/RoleAction");
const MenuAction = require ("./controllers/menuaction");
 
const Role = require("./controllers/role");

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
        console.error(err);
        return res.status(401).send({ error: "TokenInvalid" });
    }
}

function roleBasedAuthentication(req, res, next) {
    if (req.headers.role) {
        if (req.headers.role === "Administration") {
            next();
        } else {
            return res.status(401).send({ error: "InvalidAuthorizationUser" });
        }
    } else {
        return res.status(401).send({ error: "TokenMissing" });
    }
}

// Routes
 
// module.exports = function (app) {
//     // Authentication Routes
//     app.post("/auth/login", Auth.login);
//     app.post("/auth/forgotPassword", Auth.forgotPassword);

//     //BusinessType Type routes

//     app.post("/businessType/create", ensureAuthenticated, BusinessType.save);
//     app.get("/businessType", ensureAuthenticated, BusinessType.list);

//     // app.get('/businessTypeall', ensureAuthenticated, BusinessType.getActivebusinessTypes);
//     app.get("/businessType/:id", ensureAuthenticated, BusinessType.show);
//     app.get("/businessType/delete/:id", ensureAuthenticated, BusinessType.delete);
//     app.put("/businessType/update/:id", ensureAuthenticated, BusinessType.update);

//     // User Routes
//     app.get("/user", ensureAuthenticated, User.list);
//     app.post("/changePassword", ensureAuthenticated, User.changePassword);
//     app.post("/resetPassword", ensureAuthenticated, User.resetPassword);
//     app.get("/user/:id", ensureAuthenticated, User.show);
//     app.get("/user/delete/:id", ensureAuthenticated, User.delete);
//     app.post("/user/uploadPic", ensureAuthenticated, User.changeProfilePic);
//     app.put("/user/update/:id", ensureAuthenticated, User.Userupdate);

//     app.get("/profile", ensureAuthenticated, User.profile);
//     app.post(
//         "/people/create",
//         ensureAuthenticated,
//         roleBasedAuthentication,
//         User.save
//     );
//     app.post("/uploadFile", ensureAuthenticated, uploadProfile.uploadProfile);
//     app.get("/getProfilePic", ensureAuthenticated, uploadProfile.getProfilePic);

//     //FrontEnd Users
//     app.get("/userfe", ensureAuthenticated, Userfe.list);

//     //Fields routes
//     app.post("/field/update", ensureAuthenticated, Field.update);
//     app.get("/getAnswerOption/:id", ensureAuthenticated, Field.getAnswerOption);
//     app.get("/field/:id", ensureAuthenticated, Field.get);
//     app.post("/field/save", ensureAuthenticated, Field.save);
//     app.get(
//         "/activeFields/:documentId",
//         ensureAuthenticated,
//         Field.getActiveFields
//     );
//     app.post(
//         "/deleteLocalFieldById",
//         ensureAuthenticated,
//         Field.deleteLocalFieldById
//     );
//     app.get(
//         "/fieldCheck/:fieldName/:documentId/:fieldType",
//         ensureAuthenticated,
//         Field.fieldCheck
//     );
//     app.post("/saveTemplateId", ensureAuthenticated, Field.saveTemplateId);
//     app.post("/deleteByFieldsId", ensureAuthenticated, Field.deleteByFieldsId);

//     //Categories routes
//     app.post("/category/save", ensureAuthenticated, Catergory.save);
//     app.get("/getCategory", ensureAuthenticated, Catergory.getActiveCategories);

//     //Answer Option routes
//     app.get("/getAnswer/:id", ensureAuthenticated,AnswerOption.getAnswerOptionByFieldId);
//     app.delete("/answerOption/:id", ensureAuthenticated, AnswerOption.delete);
//     app.post("/answerOption/create", ensureAuthenticated, AnswerOption.save);

//     //Answer Type routes
//     app.post("/answerType/create", ensureAuthenticated, AnswerType.save);
//     app.get("/activeAnswerType", ensureAuthenticated,AnswerType.getActiveAnswerType);

//     //fake data
//     FakeData;
//     app.post("/fakedata", ensureAuthenticated, FakeData.save);

//     // File download routes
//     app.get("/download/:filename", ensureAuthenticated, (req, res) => {
//         const file = path.resolve("uploadedFiles", req.params.filename);
//         res.download(file);
//     });

//     // Document Routes
//     app.post("/documentContent", ensureAuthenticated, DocumentContent.save);
//     app.get(
//         "/documentList",
//         ensureAuthenticated,
//         DocumentContent.getAllDocuments
//     );
//     app.post(
//         "/getFieldsByDocumentId",
//         ensureAuthenticated,
//         DocumentFields.getFieldsByDocumentId
//     );
//     app.post("/submitAnswer", ensureAuthenticated, DocumentFields.saveAnswer);
//     app.get("/fieldById/:id", ensureAuthenticated, Field.fieldById);
//     app.get(
//         "/documentListByStatus/:value",
//         ensureAuthenticated,
//         DocumentContent.getAllDocumentsByStatus
//     );
//     app.post(
//         "/deleteDocument",
//         ensureAuthenticated,
//         DocumentContent.deleteDocument
//     );
//     app.post(
//         "/publishDocument",
//         ensureAuthenticated,
//         DocumentContent.publishDocument
//     );
//     app.get(
//         "/documentById/:id",
//         ensureAuthenticated,
//         DocumentContent.documentById
//     );

//     // Sales Route
//     app.get("/getSalesList", ensureAuthenticated, salesController.getSalesList);
//     app.get(
//         "/getLawyerSalesList",
//         ensureAuthenticated,
//         salesController.getLawyerSalesList
//     );

//     //Scheduler
//     app.post("/auth/schedule", ensureAuthenticated, Schedule.scheduleSave);
//     // app.post('/uploadFile',  ensureAuthenticated, uploadFile.uploadFile);
//     // app.get('/getFile',  ensureAuthenticated,uploadFile.uploadFile);
//     app.get("/scheduleList", ensureAuthenticated, Schedule.getScheduleList);
//     app.put("/updateSchedule/:id", ensureAuthenticated, Schedule.Scheduleupdate);
//     app.get("/schedulerData/:id", ensureAuthenticated, Schedule.show);
//     app.get(
//         "/scheduleLawyerList",
//         ensureAuthenticated,
//         Schedule.getScheduleLawyerList
//     );

//     //Lawyer
//     app.get("/getLawyers", Lawyer.getActiveLawyers);
//     app.post("/lawyerpostdata", ensureAuthenticated, Lawyer.save);
//     app.get("/getLawyersWithAvailability", Lawyer.getLawyersWithAvailability);
//     app.get("/lawyer/:id", ensureAuthenticated, Lawyer.show);
//     app.get("/lawyerlist", ensureAuthenticated, Lawyer.list);
//     app.get("/lawyer/delete/:id", ensureAuthenticated, Lawyer.delete);
//     app.put("/lawyer/update/:id", ensureAuthenticated, Lawyer.Lawyerupdate);
//     app.get(
//         "/getActiveLawyersList",
//         ensureAuthenticated,
//         Lawyer.getActiveLawyersList
//     );

//     //Payment
//     app.get("/paymentlist", ensureAuthenticated, Payment.getPaymentList);
//     app.get("/payment/:id", ensureAuthenticated, Payment.show);

//     //RoleAction
//     app.post("/actionrole/create", ensureAuthenticated, RoleAction.save);
//     app.put("/actionrole/update/:id", ensureAuthenticated,RoleAction.updateAction);
//     app.get("/roleaction/delete/:id", ensureAuthenticated, RoleAction.delete);
//     app.get(
//         "/actionrole/list",
//         ensureAuthenticated,
//         RoleAction.getActiveActionList
//     );
//     app.get("/roleaction", RoleAction.list);
//     app.get("/roleaction/view/:id", ensureAuthenticated, RoleAction.show);

//     //ROLE
//     app.post("/role/create", ensureAuthenticated, Role.save);
//     app.get("/role", ensureAuthenticated, Role.list);
//     app.get("/role/view/:id", ensureAuthenticated, Role.show);
//     app.get("/role/delete/:id", ensureAuthenticated, Role.delete);
//     app.get("/getActiveRole", ensureAuthenticated, Role.getActiveRole);
//     app.put("/role/update/:id", ensureAuthenticated, Role.update);

//     //ClientsDetails
//     app.post("/clientsDetails/create", ensureAuthenticated, ClientsDetails.save);
//     app.get("/clientsDetails", ensureAuthenticated, ClientsDetails.list);
//     app.get("/clientsDetails/:id", ensureAuthenticated, ClientsDetails.show);
//     app.get("/clientsDetails/delete/:id", ensureAuthenticated, ClientsDetails.delete);
//     app.put("/clientsDetails/update/:id", ensureAuthenticated, ClientsDetails.update);

//     //QuestionAndAnswer
//     app.post("/questionAndAnswer/create", ensureAuthenticated, QuestionAndAnswer.save);
//     app.get("/questionAndAnswer", ensureAuthenticated, QuestionAndAnswer.list);
//     app.get("/questionAndAnswer/view/:id", ensureAuthenticated, QuestionAndAnswer.show);
//     app.get("/questionAndAnswer/delete/:id", ensureAuthenticated, QuestionAndAnswer.delete);
//     app.get("/getActiveQuestionAndAnswer",ensureAuthenticated, QuestionAndAnswer.getActiveQuestionAndAnswer);
//     app.put("/questionAndAnswer/update/:id", ensureAuthenticated, QuestionAndAnswer.update);

//     //MENUACTION
//     app.post("/menuaction/create", ensureAuthenticated, MenuAction.save);
//     app.get(
//         "/getactiveMenuAction",
//         ensureAuthenticated,
//         MenuAction.getActiveMenuAction
//     );
// };
 
    module.exports = function (app) {
        // Authentication Routes
        app.post('/auth/login', Auth.login);
        app.post('/auth/forgotPassword', Auth.forgotPassword);
        app.get('/auth/logout', Auth.logout);



        //BusinessType Type routes

        app.post('/businessType/create', ensureAuthenticated, BusinessType.save);
        app.get('/businessType', ensureAuthenticated, BusinessType.list);

        app.get('/businessTypeall', ensureAuthenticated, BusinessType.getActivebusinessTypes);
        app.get('/businessType/:id', ensureAuthenticated, BusinessType.show);
        app.get('/businessType/delete/:id', ensureAuthenticated, BusinessType.delete);
        app.put('/businessType/update/:id', ensureAuthenticated, BusinessType.update);

        
        // User Routes
        app.get('/user', ensureAuthenticated, User.list);
        app.post('/changePassword', ensureAuthenticated, User.changePassword);
        app.post('/resetPassword', ensureAuthenticated, User.resetPassword);
        app.get('/user/:id', ensureAuthenticated, User.show);
        app.get('/user/delete/:id', ensureAuthenticated, User.delete);
        app.post('/user/uploadPic', ensureAuthenticated, User.changeProfilePic);
        app.put('/user/update/:id', ensureAuthenticated, User.Userupdate);
        
        app.get('/profile', ensureAuthenticated, User.profile);
        app.post("/people/create", ensureAuthenticated,roleBasedAuthentication,User.save);
        app.post("/uploadFile",ensureAuthenticated,uploadProfile.uploadProfile);
        app.get('/getProfilePic', uploadProfile.getProfilePic);

        app.get('/getAllUsers', ensureAuthenticated, User.getUsers);


        //FrontEnd Users
        app.get('/userfe', ensureAuthenticated, Userfe.list);
        app.get('/userfe/:id', ensureAuthenticated, Userfe.show);
        // app.get('/userfe/getAll', ensureAuthenticated, Userfe.getAllUserfe);
        app.get('/getAll/userfe', ensureAuthenticated, Userfe.getAllUserfe);
        app.put('/userfe/update/:id', ensureAuthenticated, Userfe.userUpdate);

        //Requested Agreement Purchases
        // app.get('/getAll/requestedAgreementPurchases', ensureAuthenticated, DocumentFields.getRequestedAgreementPurchases);


        //Fields routes
        app.post('/field/update', ensureAuthenticated, Field.update);
        app.get('/getAnswerOption/:id', ensureAuthenticated, Field.getAnswerOption);
        app.get('/field/:id', ensureAuthenticated, Field.get);
        app.post("/field/save",ensureAuthenticated,Field.save);
        app.get('/activeFields/:documentId', ensureAuthenticated, Field.getActiveFields);
        app.post("/deleteLocalFieldById",ensureAuthenticated,Field.deleteLocalFieldById);
        app.get('/fieldCheck/:fieldName/:documentId/:fieldType', ensureAuthenticated, Field.fieldCheck);
        app.post('/saveTemplateId', ensureAuthenticated, Field.saveTemplateId);
        app.post('/deleteByFieldsId', ensureAuthenticated, Field.deleteByFieldsId);
        //(New)Id Fields routes
        // app.get('/getActiveFieldsList', ensureAuthenticated, Field.getActiveFieldsList);

        //Categories routes
        app.post("/category/save", ensureAuthenticated, Catergory.save);
        app.get('/getCategory', ensureAuthenticated, Catergory.getActiveCategories);

        //Answer Option routes

        app.get("/getAnswer/:id", ensureAuthenticated, AnswerOption.getAnswerOptionByFieldId);
        app.delete("/answerOption/:id", ensureAuthenticated, AnswerOption.delete);
        app.post("/answerOption/create", ensureAuthenticated, AnswerOption.save);

        //Answer Type routes
        app.post("/answerType/create", ensureAuthenticated, AnswerType.save);
        app.get('/activeAnswerType', ensureAuthenticated, AnswerType.getActiveAnswerType);

        //fake data
        FakeData
        app.post("/fakedata", ensureAuthenticated, FakeData.save);

        // File download routes
        app.get("/download/:filename", ensureAuthenticated, (req, res) => {
            const file = path.resolve("uploadedFiles", req.params.filename);
            res.download(file);
        });
        
        // Agreement Requests Routes (JavskontrollAnswers Routes)
        app.post("/agreementRequest/create", AgreementRequest.save);
        app.get("/getAgreeementRequestsList", AgreementRequest.getAgreeementRequestsList);
        app.get("/getAgreeementRequestByUserId", AgreementRequest.getAgreeementRequestByUserId);
        app.get("/getAgreeementRequest/:id", AgreementRequest.get);
        app.put ("/agreementRequest/update/:id", AgreementRequest.update);

        // Document Routes
        app.post('/documentContent', ensureAuthenticated, DocumentContent.save);
        app.get('/documentList', ensureAuthenticated, DocumentContent.getAllDocuments);
        app.post('/getFieldsByDocumentId', ensureAuthenticated, DocumentFields.getFieldsByDocumentId);
        app.post('/submitAnswer', ensureAuthenticated, DocumentFields.saveAnswer);
        app.get('/fieldById/:id', ensureAuthenticated, Field.fieldById);
        app.get('/documentListByStatus/:value', ensureAuthenticated, DocumentContent.getAllDocumentsByStatus);
        app.post('/deleteDocument', ensureAuthenticated, DocumentContent.deleteDocument);
        app.post('/publishDocument', ensureAuthenticated, DocumentContent.publishDocument);
        app.get('/documentById/:id', ensureAuthenticated, DocumentContent.documentById);

        app.get('/documentContent/uploadVideoRequest/:id', ensureAuthenticated, DocumentContent.uploadVideoRequest);
        app.post('/documentContent/uploadVideos', ensureAuthenticated, DocumentContent.uploadVideos);
        app.post('/documentContent/uploadAgreementHeaderPic', ensureAuthenticated, DocumentContent.uploadAgreementHeaderPic);
        app.post('/documentContent/uploadAgreementPdf', ensureAuthenticated, DocumentContent.uploadAgreementPdf);
        app.put('/updateDocumentPrice/:id', ensureAuthenticated, DocumentContent.updateDocumentPrice);
        app.get('/convertLocalToGlobal/:id', ensureAuthenticated, DocumentContent.convertLocalToGlobal);

        // Document Routes
        app.post('/businessAgreements/save', ensureAuthenticated, BusinessAgreement.save);
        app.get('/documentList', ensureAuthenticated, BusinessAgreement.getAllDocuments);
        app.get('/businessAgreementsListByStatus/:value', ensureAuthenticated, BusinessAgreement.businessAgreementsListByStatus);
        app.post('/deleteBusinessAgreement', ensureAuthenticated, BusinessAgreement.deleteBusinessAgreement);
        app.post('/publishDocument', ensureAuthenticated, BusinessAgreement.publishDocument);
        app.get('/getBusinessAgreementById/:id', ensureAuthenticated, BusinessAgreement.businessAgreementById);
        app.post('/businessAgreements/uploadBusimessAgreementPdf', ensureAuthenticated, BusinessAgreement.uploadBusinessAgreementPdf);
        
        // app.get('/documentContent/uploadVideoRequest/:id', ensureAuthenticated, BusinessAgreement.uploadVideoRequest);
        // app.post('/documentContent/uploadVideos', ensureAuthenticated, BusinessAgreement.uploadVideos);
        // app.post('/documentContent/uploadAgreementHeaderPic', ensureAuthenticated, BusinessAgreement.uploadAgreementHeaderPic);

        // Sales Route
        app.get('/getSalesList', ensureAuthenticated, salesController.getSalesList);
        app.get('/sales/:id', ensureAuthenticated, salesController.show);
        // app.post('/generateSalesPdf', ensureAuthenticated, salesController.generateSalesPdf);
        app.post('/generateSalesPdf', salesController.generateSalesPdf); //Open for User side Access
        app.get('/getLawyerSalesList', ensureAuthenticated, salesController.getLawyerSalesList);
        app.get('/getSalesByDates', salesController.getSalesByDates);
        
        //Scheduler
        app.post('/auth/schedule',  ensureAuthenticated, Schedule.scheduleSave);
        // app.post('/uploadFile',  ensureAuthenticated, uploadFile.uploadFile);
        // app.get('/getFile',  ensureAuthenticated,uploadFile.uploadFile);
        app.get('/scheduleList',  ensureAuthenticated, Schedule.getScheduleList);
        app.put('/updateSchedule/:id',  ensureAuthenticated, Schedule.Scheduleupdate);
        app.get('/schedulerData/:id',  ensureAuthenticated, Schedule.show);
        app.get('/scheduleLawyerList',  ensureAuthenticated, Schedule.getScheduleLawyerList);
        app.get('/getSchedule', Schedule.getSchedule);

        
        //Lawyer
        app.get('/getLawyers', Lawyer.getActiveLawyers);
        app.post('/lawyerpostdata',  ensureAuthenticated, Lawyer.save);
        app.get('/getLawyersWithAvailability', Lawyer.getLawyersWithAvailability);
        app.get('/lawyer/:id', ensureAuthenticated, Lawyer.show);
        app.get('/lawyerlist', ensureAuthenticated, Lawyer.list);
        app.get('/lawyer/delete/:id', ensureAuthenticated, Lawyer.delete);
        app.put('/lawyer/update/:id', ensureAuthenticated, Lawyer.Lawyerupdate);
        app.get('/getActiveLawyersList', ensureAuthenticated, Lawyer.getActiveLawyersList);
        app.post('/lawyer/uploadLawyerPic', ensureAuthenticated, Lawyer.uploadLawyerPic);
        app.get('/getLawyersEmailWithAvailability', Lawyer.getLawyersEmailWithAvailability); 
        
        //Payment
        app.get('/paymentlist', ensureAuthenticated, Payment.getPaymentList);
        app.get('/payment/:id', ensureAuthenticated, Payment.show);
        app.post('/generatePaymentPdf', Payment.generatePaymentPdf);


        //RoleAction

        app.post('/actionrole/create', ensureAuthenticated, RoleAction.saveRoleAction);
        app.post('/actionrole/update', ensureAuthenticated, RoleAction.save);
        app.put('/actionrole/update/:id', ensureAuthenticated, RoleAction.updateAction);
        app.get('/roleaction/delete/:id', ensureAuthenticated, RoleAction.delete);
        app.get('/actionrole/list', ensureAuthenticated, RoleAction.getActiveActionList);
        // app.get('/roleaction', RoleAction.list);
        app.get('/roleaction/view/:id', ensureAuthenticated, RoleAction.show);
        app.get('/getallroleaction/:roleID', RoleAction.getallroleaction);
        app.delete("/deletemanylist/:id", ensureAuthenticated, RoleAction.deletemanylist);
        // app.get('/getRoleByValue/:name', ensureAuthenticated, RoleAction.getRoleActionByValue);
        // app.get('/contentPage/:name', ensureAuthenticated, ContentPages.getActiveContentPage);
        app.get('/getRoleByValue/:name', ensureAuthenticated, MenuAction.getRoleActionByValue);
        
        

        // app.get('/getAllRoleAction/:idd', ensureAuthenticated, RoleAction.getRoleActionByRoleId);
        
        app.get('/allRoleData/:id', ensureAuthenticated, RoleAction.getAllRoleData);



        //ROLE

        app.post('/role/create', Role.save);
        app.get('/role', ensureAuthenticated, Role.list);
        app.get('/role/view/:id', ensureAuthenticated, Role.show);
        app.get('/role/delete/:id', ensureAuthenticated, Role.delete);
        app.get('/getactiverole', ensureAuthenticated, Role.getActiveRole);
        app.put('/role/update/:id', ensureAuthenticated, Role.update);
         
        //ClientsDetails
        app.post('/clientsDetails/create', ClientsDetails.save);
        app.get('/clientsDetails', ClientsDetails.list);
        app.get('/clientsDetails/:id', ClientsDetails.show);
        app.get('/clientsDetails/delete/:id', ClientsDetails.delete);
        app.put('/clientsDetails/update/:id', ClientsDetails.update);
        app.post('/getClientsDetailByData', ClientsDetails.getClientsDetailByData);

        // ClientsDetails Routes (Javskontroll Questions Routes)
        app.post("/clientsDetailsQuestion/create", ClientsDetailsQuestion.save);
        app.get('/clientsDetailsQuestion/delete/:id', ClientsDetailsQuestion.delete);
        app.put('/clientsDetailsQuestion/update/:id', ClientsDetailsQuestion.update);
        app.get("/getClientsDetailsQuestionList", ClientsDetailsQuestion.getList);
        app.get("/getClientsDetailsQuestionById/:id", ClientsDetailsQuestion.getClientsDetailsQuestionById);
        app.get("/getAllClientsDetailsQuestion", ClientsDetailsQuestion.getAll);

        //LawyerBusyTime Routes
        app.get("/getAllLawyerBusyTimes", LawyerBusyTime.getAllLawyerBusyTimes);
        app.get("/getLawyerBusyTime/:id", LawyerBusyTime.show);
        app.post("/lawyerBusyTime/create", LawyerBusyTime.save);
        app.get("/lawyerBusyTime/delete/:id", LawyerBusyTime.delete);
        app.put("/lawyerBusyTime/update/:id", LawyerBusyTime.update);

        //MENUACTION
        app.post('/menuaction/create', ensureAuthenticated, MenuAction.save);
        app.get('/getactiveMenuAction', ensureAuthenticated, MenuAction.getActiveMenuAction);
         

        //contentpages
        app.post('/contentsave', ensureAuthenticated, ContentPage.save);
        //app.put('/contentupdate/:id', ensureAuthenticated, ContentPage.updateContent);

        app.get('/contentById/:id', ensureAuthenticated, ContentPage.ContentById);
        app.put('/contentupdate/:id', ensureAuthenticated, ContentPage.updateContent);
        app.get('/contentpagelist', ContentPage.list);
        app.post('/CheckDataPrivatePerson' , CheckDataPrivatePerson.post);
        app.get('/CheckDataPrivatePerson' , CheckDataPrivatePerson.get);
        app.post('/CheckDataForetag' , CheckDataForetag.post);
        app.get('/CheckDataForetag' , CheckDataForetag.get);


        //Colors
        app.post("/colors/create", ensureAuthenticated, Colors.save);
        app.get("/colors", ensureAuthenticated, Colors.list);
        app.get("/colors/view/:id", ensureAuthenticated, Colors.show);
        app.get("/colors/delete/:id", ensureAuthenticated, Colors.delete);
        app.get("/getColors",ensureAuthenticated, Colors.getColors);
        app.put("/colors/update/:id", ensureAuthenticated, Colors.update);

        //FindUs
        app.post("/findUs/create", ensureAuthenticated, FindUs.save);
        app.get("/findUs", ensureAuthenticated, FindUs.list);
        app.get("/findUs/view/:id", ensureAuthenticated, FindUs.show);
        app.get("/findUs/delete/:id", ensureAuthenticated, FindUs.delete);
        app.put("/findUs/update/:id", ensureAuthenticated, FindUs.update);
                
        //QuestionAndAnswer
        app.post("/questionAndAnswer/create", ensureAuthenticated, QuestionAndAnswer.save);
        app.get("/questionAndAnswer", ensureAuthenticated, QuestionAndAnswer.list);
        app.get("/questionAndAnswer/view/:id", ensureAuthenticated, QuestionAndAnswer.show);
        app.get("/questionAndAnswer/delete/:id", ensureAuthenticated, QuestionAndAnswer.delete);
        app.get("/getActiveQuestionAndAnswer",ensureAuthenticated, QuestionAndAnswer.getActiveQuestionAndAnswer);
        app.put("/questionAndAnswer/update/:id", ensureAuthenticated, QuestionAndAnswer.update);

        //ContentPage
        app.get('/contentPage/:name', ensureAuthenticated, ContentPages.getActiveContentPage);
        app.put('/contentPage/update/:id', ensureAuthenticated, ContentPages.update);
        app.post('/home/uploadHomePic', ensureAuthenticated, ContentPages.changeHomeHeaderPic);
        app.post('/home/uploadHomePicMob', ensureAuthenticated, ContentPages.changeHomeHeaderPicMob);

        app.post('/home/uploadIntroPic', ensureAuthenticated, ContentPages.changeIntroPic);
        app.post('/home/uploadServicesBgPic', ensureAuthenticated, ContentPages.changeServicesBgPic);
        app.post('/home/uploadFooterBgPic', ensureAuthenticated, ContentPages.changeFooterBgPic);
        // app.post('/home/uploadSelectAgreementPic', ensureAuthenticated, ContentPages.changeSelectAgreementPic);
        // app.post('/home/uploadFillAgreementPic', ensureAuthenticated, ContentPages.changeFillAgreementPic);
        // app.post('/home/uploadPurchasePic', ensureAuthenticated, ContentPages.changePurchasePic);
        // app.post('/home/uploadAvailabilityPic', ensureAuthenticated, ContentPages.changeAvailabilityPic);
        
        //All Header Images (Hero Banners)
        app.post('/heroBanners/publishHeaderPics/:id', ensureAuthenticated, ContentPages.publishHeaderPics);
        app.post('/heroBanners/uploadAgreementHeaderPic', ensureAuthenticated, ContentPages.uploadAgreementHeaderPic);
        app.post('/heroBanners/uploadAgreementConfirmHeaderPic', ensureAuthenticated, ContentPages.uploadAgreementConfirmHeaderPic);
        app.post('/heroBanners/uploadLawyerHeaderPic', ensureAuthenticated, ContentPages.uploadLawyerHeaderPic);
        app.post('/heroBanners/uploadSchedulerHeaderPic', ensureAuthenticated, ContentPages.uploadSchedulerHeaderPic);
        app.post('/heroBanners/uploadQuestionAnswerHeaderPic', ensureAuthenticated, ContentPages.uploadQuestionAnswerHeaderPic);
        app.post('/heroBanners/uploadAboutUsHeaderPic', ensureAuthenticated, ContentPages.uploadAboutUsHeaderPic);
        app.post('/heroBanners/uploadFindUsHeaderPic', ensureAuthenticated, ContentPages.uploadFindUsHeaderPic);
        app.post('/heroBanners/uploadBusinessHeaderPic', ensureAuthenticated, ContentPages.uploadBusinessHeaderPic);
        app.post('/heroBanners/uploadTermsConditionsHeaderPic', ensureAuthenticated, ContentPages.uploadTermsConditionsHeaderPic);
        app.post('/heroBanners/uploadPrivacyPolicyHeaderPic', ensureAuthenticated, ContentPages.uploadPrivacyPolicyHeaderPic);
        //this API is for user portal meeting file uploading
        app.post('/uploadMeetingAttachment', ContentPages.uploadMeetingAttachment);

        //AboutUs
        app.post("/aboutUs/create", ensureAuthenticated, AboutUs.save);
        app.get("/aboutUs", ensureAuthenticated, AboutUs.list);
        app.get("/aboutUs/view/:id", ensureAuthenticated, AboutUs.show);
        app.get("/aboutUs/delete/:id", ensureAuthenticated, AboutUs.delete);
        app.get("/getActiveAboutUs", ensureAuthenticated, AboutUs.getActiveAboutUs);
        app.put("/aboutUs/update/:id", ensureAuthenticated, AboutUs.update);
        app.get("/GetUserRoleAction/:id", Role.GetUserRoleAction);
        app.get("/GetRoleActionByRoleIdRoleActionId/:id/:roleactionID", Role.GetRoleActionByRoleIdRoleActionId); 
        //-----------EmailLog Route-------------
        app.get('/emailLog',ensureAuthenticated, EmailLog.listEmailLog);
        app.get('/emailLog/view/:id', EmailLog.viewEmailLog);
        app.put('/emailLog/update/:id', EmailLog.updateEmailLog);
        app.get('/resendEmail/:id', EmailLog.resendEmail);
        // app.get('/emailLog/getAll',ensureAuthenticated, EmailLog.getEmailLog);
                
        //EmailConfiguration

        //---for first time only---
        // app.post("/emailConfiguration/create", EmailConfiguration.save);
        // app.get("/emailConfiguration", EmailConfiguration.getEmailConfiguration);
        app.put("/emailConfiguration/update/:id", ensureAuthenticated, EmailConfiguration.update);
        app.get('/emailConfiguration/:name',ensureAuthenticated, EmailConfiguration.getEmailConfiguration);



        //PaymentsConfiguration
        //---for first time only---
        // app.post("/paymentsConfiguration/create", PaymentsConfiguration.save);
        // app.get("/paymentsConfiguration/fetch/fetch", PaymentsConfiguration.fetch);
        // app.get("/paymentsConfiguration", PaymentsConfiguration.getPaymentsConfiguration);

        app.put("/paymentsConfiguration/update/:id", ensureAuthenticated, PaymentsConfiguration.update);
        app.get('/paymentsConfiguration/:name', ensureAuthenticated, PaymentsConfiguration.getPaymentsConfiguration);
        app.post('/paymentsConfiguration/uploadSwishPemCert', ensureAuthenticated, PaymentsConfiguration.uploadSwishPemCertFile);
        app.post('/paymentsConfiguration/uploadSwishKeyCert', ensureAuthenticated, PaymentsConfiguration.uploadSwishKeyCertFile);
        app.post('/paymentsConfiguration/uploadSwishPemRoot', ensureAuthenticated, PaymentsConfiguration.uploadSwishPemRootFile);

    };
 

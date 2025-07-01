const DocumentField = require('../models/documentField');
const UserDocuments = require('../models/userDocuments');
const UserDocumentMaster = require('../models/userDocumentMaster');
const DocumentFieldModel = require('../models/documentField');
const paymentModel = require("../models/payment")
const Document = require('../models/document');
const {jsPDF} = require("jspdf");
const html_to_pdf = require('html-pdf-node');
const fs = require('fs');


exports.getFieldsByDocumentId = function (req, res) { // get fields for document id
    let documentTemplateId = req.body.documentTemplateId;
    DocumentField.find({documentTemplateId: documentTemplateId}).populate('fieldId').sort('fieldPosition')
        .exec((err, fieldList) => {

            if (err) {
                console.error('err', err);
                return res.status(404).json({error: "Invalid Document Id"});
            }

            res.status(200).json({fieldList});
        });
}

exports.getDocumentFieldsByDocumentId = function (req, res) {
    let documentFieldId = [];
    DocumentField.find(({documentTemplateId: req.params.documentTemplateId}), function (err, documentFields) {
        if (err) {
            console.error(err);
            return err;
        }
        documentFields.forEach((documentFieldDetails) => {
            documentFieldId.push(documentFieldDetails._id);
        });
        UserDocuments.find({$and: [{"documentFieldId": {$in: documentFields}}]}, function (err, userDocumentDetails) {
            if (err) {
                console.error(err);
                return err;
            }
            return res.send(userDocumentDetails);
        });
    });

}

exports.saveAnswer = async function (req, res) { // save answer for document fields and generate pdf
    let documentAnswer = req.body.userInput;
    let userId = req.body.userID;
    const documentField = await DocumentFieldModel.findOne({_id: documentAnswer[0].documentFieldId});

    if (!documentField) {
        return res.status(404).json({err: 'Err', msg: 'Document fields not found'});
    }

    let userDocumentMaster = new UserDocumentMaster();

    if (userId) {
        userDocumentMaster.userId = userId;
    }

    userDocumentMaster.documentTemplateId = documentField.documentTemplateId;
    userDocumentMaster.agreeementSentStatus = 'Not Sent';
    userDocumentMaster.paymentStatus = 'Not Paid';
    userDocumentMaster.generationDate = new Date;
    userDocumentMaster.paymentId = '';
    const savedUserDocumentMaster = await userDocumentMaster.save();

    if (!savedUserDocumentMaster) {
        return res.status(404).json({err: 'Err', msg: 'Error while saving document'});
    }

    let userDocumentList = [];
    documentAnswer.forEach((userDocumentDetails) => {
        let userDocument = {
            masterId: savedUserDocumentMaster._id,
            documentFieldId: userDocumentDetails.documentFieldId,
            answer: userDocumentDetails.answer
        };
        userDocumentList.push(userDocument);
    });
    const savedUserDocuments = await UserDocuments.insertMany(userDocumentList);

    if (!savedUserDocuments) {
        return res.status(404).json({err: 'Err', msg: 'Error while saving user documents'});
    }

    // Generating document with user Inputs
    const docField = await DocumentField.findById(documentAnswer[0].documentFieldId).populate('documentTemplateId');

    if (!docField) {
        return res.status(404).json({err: 'Err', msg: "Invalid Document Id"});
    }

    let docContent = docField.documentTemplateId.document;
    const finalDoc = await populateUserInputs(docContent, documentAnswer);

    if (!finalDoc) {
        return res.status(404).json({err: 'Err', msg: "Error while generating Agreement"});
    }

    let options = {format: 'A4', margin : {left :"1in",right:"1in",top:"0.5in",bottom:"0.5in"}};
    let file = {content: finalDoc};
    const pdfBuffer = await html_to_pdf.generatePdf(file, options);

    if (!pdfBuffer) {
        return res.status(404).json({err: 'Err', msg: "Error while generating Agreement"});
    }

    // fs.writeFileSync('some.pdf', pdfBuffer);
    return res.status(200).json(pdfBuffer);
}

async function populateUserInputs(docContent, documentAnswer) { // replace the answer for fields
    let replacedString = docContent;

    try {
        documentAnswer.forEach(function (data) {
            // replacedString = replacedString.split('[["' + data.fieldObjectId + '"]]').join(data.answer);
            replacedString = replacedString.split('[['+data.fieldObjectId+']]').join(data.answer);
        });
        // replacedString = replacedString.replace(/{{(.*?)}}/, '');
        replacedString = replacedString.split(/{{[\s\S]*?}}/).join('');

    } catch (e) {
        console.error(e);
    }

    return replacedString;
}

// exports.getRequestedAgreementPurchases = function (req, res) {
//     console.error('reached ', req.query);
//     // let documentTemplateId = req.body.documentTemplateId;
//     // UserDocumentMaster.find().populate('fieldId').sort('fieldPosition')
//     UserDocumentMaster.find()
//         .exec((err, fieldList) => {

//             if (err) {
//                 console.error('err', err);
//                 // return res.status(404).json({error: "Invalid Document Id"});
//             }

//             // res.status(200).json({fieldList});
//         });
// }
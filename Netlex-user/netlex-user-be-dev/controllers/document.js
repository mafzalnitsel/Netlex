const DocumentContent = require('../models/document');
const DocumentField = require('../models/documentField');
const Fields = require('../models/field');
const FieldsController = require('./field');
const UserDocumentMaster = require('../models/userDocumentMaster');
const UserDocumentModel = require('../models/userDocuments');
const User = require('../models/user');

exports.save = function (req, res) { // save and update document
    let {id, document, documentTitle, documentDescription, status} = req.body;

    if (!document) {
        res.status(404).json({error: "MissingParameter"});
        return;
    }

    let doc = new DocumentContent();
    doc.document = document;
    doc.documentTitle = documentTitle;
    doc.documentDescription = documentDescription;
    doc.status = status;

    if (id && id !== '') {
        DocumentField.deleteMany({documentTemplateId: id}).exec(function (err, documentField) {

            if (err) {
                return res.status(500).json({err})
            }

        });
        DocumentContent.findOneAndUpdate({_id: id}, {document, documentTitle, documentDescription, status},
            {useFindAndModify: false}, function (err, savedDocument) {

                // sending err msg
                if (err) {
                    res.status(404).json({error: "ErrorWhileSavingDoc", message: err});
                    return;
                }

                FieldsController.saveTemplateId(savedDocument._id).then(() =>
                    generateDocumentFields(document, savedDocument._id).then(result =>
                        res.status(200).json(savedDocument)
                    ));
            });
    } else {
        doc.save((err, savedDocument) => {


            if (err) {
                console.error('Error', err);
                res.status(404).json({error: "ErrorWhileSavingDoc", message: err});
                return;
            }
            FieldsController.saveTemplateId(savedDocument._id).then(() =>
                generateDocumentFields(document, savedDocument._id).then(result =>
                    res.status(200).json(savedDocument)
                ));
        });
    }

};

async function generateDocumentFields(document, id) { // parse the fields from document
    let fieldsList = document.matchAll(/<span\sstyle="background-color:\s#236fa1;\scolor:\s#ecf0f1;"><strong>(.*?)<\/strong><\/span>/g);
    fieldsList = Array.from(fieldsList, x => x[1]);
    let localFields = [];
    let globalFields = [];
    let documentFields = [];
    let local = new Promise((resolve, reject) => {
        Fields.find({$and: [{"field.name": {$in: fieldsList}}, {"documentTemplateId": id}]}, function (err, fieldsLocal) {
            fieldsLocal.forEach((field, index) => {
                localFields.push(field);
                if (index === fieldsLocal.length - 1) resolve();
            });
            if (fieldsLocal.length <= 0) resolve();
        });
    });
    local.then(() => {
        let global = new Promise((resolve, reject) => {
            Fields.find({$and: [{"field.name": {$in: fieldsList}}, {isGlobal: 'global'}]}, function (err, fieldsGlobal) {
                fieldsGlobal.forEach((field, index) => {
                    globalFields.push(field);
                    if (index === fieldsGlobal.length - 1) resolve();
                });
                if (fieldsGlobal.length <= 0) resolve();
            });
        });
        global.then(() => {
            const uniqueLocalFields = [...new Set(localFields)];
            const uniqueGlobalFields = [...new Set(globalFields)];
            const uniqueFields = uniqueGlobalFields.concat(uniqueLocalFields)
            uniqueFields.forEach((fields, index) => {
                documentFields.push({
                    documentTemplateId: id,
                    fieldId: fields._id,
                });
            });
            DocumentField.insertMany(documentFields).then(r => console.log('fields inserted', r));
        });
    });
}

exports.getAllDocuments = function (req, res) { // get all published documents
    DocumentContent.find({'status': 'Published'})
        .exec(function (err, document) {

            if (err) {
                console.error('err', err);
                return res.status(500).json({err})
            } else {
                return res.status(200).json({document})
            }

        });
}

exports.getAllDocumentsByStatus = function (req, res) { // get all documents by draft or published
    console.log("req.query",req.query);
    // const status = req.params.value;
    const status = req.query.value;
    const agreementType = req.query.filterAgreement;

    // DocumentContent.find({status: status})
    DocumentContent.find({status: status,agreementType: agreementType})
        .exec(function (err, document) {
            if (err) {
                return res.status(500).json({err})
            } else {
                return res.status(200).json({document})
            }
        });
}
exports.deletedoc = async (req, res) => {
    const id = req.body.id;
    DocumentContent.findOneAndRemove({_id: id})
        .exec(function (err, document) {
            if (err) {
                return res.status(500).json({err})
            } else {
                return res.status(200).json({document})
            }
        });
};

exports.deleteDocument = function (req, res) { // change the document status inactive when delete the document
    const id = req.body.id;
    DocumentContent.findOneAndUpdate({_id: id}, {status: 'InActive'}, function (err, result) {
        if (err) {
            return res.status(404).json({error: "Please try again"});
        }
        res.status(200).json(result);
    });
}

exports.publishDocument = function (req, res) { // change document status to published
    const id = req.body.id;
    DocumentContent.findOneAndUpdate({_id: id}, {status: 'Published'}, function (err, result) {
        if (err) {
            return res.status(404).json({error: "Please try again"});
        }
        res.status(200).json(result);
    });
}

exports.getDocumentByUserId = function (req, res) {
    
    console.log('req.body.userId',req.body.userId)
    let user_id = req.body.userId;
    let documentTemplateIds = [];
    let userIds = [];
    User.findOne({_id: user_id}).exec(function (err, doc) {
console.log(doc.accountType);
            if (doc.accountType === 'organization' ) {

                User.find({organizationNumber: doc.organizationNumber}).exec((err, doc) => {
                    doc.forEach((value) => {
                        userIds.push(value._id);
                    });
                        UserDocumentMaster.find({$and: [{"userId": {$in: userIds}},{ "paymentStatus":{$eq :"Not Paid"}}]}, function (err, userDocumentMaster) {
                            userDocumentMaster.forEach((documentId) => {
                                documentTemplateIds.push(documentId.documentTemplateId);
                            });

                                DocumentContent.find({$and: [{"_id": {$in: documentTemplateIds}}]}, function (err, documentData) {

                                    if (err) {
                                        return res.status(404).json(err);
                                    } else {
                                        let response = {
                                            documentData,
                                            userDocumentMaster,
                                        };
                                        res.status(200).json(response);
                                    }
                                });
                            });
                    });
            } else {
                UserDocumentMaster.find({userId: user_id}).exec((err, userDocumentMaster) => {
                    userDocumentMaster.forEach((documentId) => {
                        documentTemplateIds.push(documentId.documentTemplateId);
                    });

                    console.log('UserDocumentMaster',UserDocumentMaster)
                    DocumentContent.find({$and: [{"_id": {$in: documentTemplateIds}}]}, function (err, documentData) {

                        if (err) {
                            return res.status(404).json(err);
                        } else {
                            let response = {
                                documentData,
                                userDocumentMaster,
                            };
                            res.status(200).json(response);
                        }
                    });
                });
            }

        }
    );
};


exports.documentById = function (req, res) { // get document by id
    const id = req.params.id;
    DocumentContent.findOne({_id: id}, function (err, document) {

        if (err) {
            return res.status(404).json({error: "Please try again"});
        }
        res.status(200).json(document);
    });
}


exports.getAnswerByMasterId = function (req, res) {
    const id = req.params.id;
    UserDocumentModel.find({masterId: id}).exec((err, documentAnswer) => {
        if (err) {
            return res.status(404).json(err);
        } else {
            res.status(200).json(documentAnswer);
        }
    });
}
exports.getDocumentFieldsById = function (req, res) {
    const documentFieldId = req.params.documentFieldId;
    DocumentField.findById({_id: documentFieldId}).exec((err, documentAnswer) => {
        if (err) {
            return res.status(404).json(err);
        } else {
            res.status(200).json(documentAnswer);
        }
    });
}

exports.getDocumentDetailsByDocumentId = function (req, res) {
    const id = req.params.id;
    let masterIds = [];
    UserDocumentMaster.find({documentTemplateId: id}).exec((err, userMasterData) => {
        userMasterData.forEach((documentId) => {
            masterIds.push(documentId._id);
        });
        UserDocumentModel.find({$and: [{"masterId": {$in: masterIds}}]}, function (err, userDocuments) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.status(200).json(userDocuments);
            }


        });

    });

}
exports.draftdeletebycomponent = function (req, res) { // delete local field by id
    const id = req.body.id;
   
    userMasterDocument.deleteOne({_id: id}, function (err) {
        err ? res.status(404).json('Invalid id') : res.status(200).json({msg: 'deleted'});
    });
}



exports.deleteDocumentCancelledByUser = async function (req, res) {
    const masterId = req.body.master_id;
    const userMasterDocument = await UserDocumentMaster.findByIdAndDelete({_id: masterId});
    const userDocument = await UserDocumentModel.deleteMany({masterId: masterId});
    if(!userMasterDocument && !userDocument){
        res.status(404).json({error: "Document Details Not Found"});
    }else{
        res.status(200).json({userMasterDocument, userDocument});
    }

}


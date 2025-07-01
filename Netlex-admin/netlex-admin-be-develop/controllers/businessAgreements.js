const BusinessAgreement = require('../models/businessAgreements');
const DocumentField = require('../models/documentField');
const Fields = require('../models/field');
const FieldsController = require('./field');
const formidable = require("formidable");
const mv = require("mv");
const path = require("path");

exports.save = function (req, res) { // save and update document
    
    // console.log("reachdddddddddddd",req.body)
    let {id, document, documentTitle, documentDescription, documentPrice, documentTax, status} = req.body;

    // if (!document) {
    //     res.status(404).json({error: "MissingParameter"});
    //     return;
    // }

    let doc = new BusinessAgreement();
    doc.document = document;
    doc.documentTitle = documentTitle;
    doc.documentDescription = documentDescription;
    doc.documentPrice = documentPrice;
    doc.documentTax = documentTax;
    doc.status = status;

    if (id && id !== '') {
        // DocumentField.deleteMany({documentTemplateId: id}).exec(function (err, documentField) {

        //     if (err) {
        //         return res.status(500).json({err})
        //     }

        // });
        BusinessAgreement.findOneAndUpdate({_id: id}, {
                document,
                documentTitle,
                documentDescription,
                documentPrice,
                documentTax,
                status
            },
            {useFindAndModify: false}, function (err, savedDocument) {

                // sending err msg
                if (err) {
                    res.status(404).json({error: "ErrorWhileSavingDoc", message: err});
                    return;
                }
                res.status(200).json(savedDocument)

                // FieldsController.saveTemplateId(savedDocument._id).then(() =>
                //     generateDocumentFields(document, savedDocument._id).then(result =>
                //         res.status(200).json(savedDocument)
                //     ));
            });
    } else {
        doc.save((err, savedDocument) => {

            // sending err msg
            if (err) {
                console.error(err);
                res.status(404).json({error: "ErrorWhileSavingDoc", message: err});
                return;
            }
            res.status(200).json(savedDocument)

            // FieldsController.saveTemplateId(savedDocument._id).then(() =>
            //     generateDocumentFields(document, savedDocument._id).then(result =>
            //         res.status(200).json(savedDocument)
            //     ));
        });
    }

};

exports.getAllDocuments = function (req, res) { // get all published documents
    BusinessAgreement.find({'status': 'Published'})
        .exec(function (err, document) {

            if (err) {
                console.error(err);
                return res.status(500).json({err})
            } else {
                return res.status(200).json({document})
            }

        });
}

exports.businessAgreementsListByStatus = function (req, res) { // get all documents by draft or published
    const status = req.params.value;
    BusinessAgreement.find({status: status})
        .exec(function (err, document) {
            if (err) {
                return res.status(500).json({err})
            } else {
                return res.status(200).json({document})
            }
        });
}

exports.deleteBusinessAgreement = function (req, res) { // change the document status inactive when delete the document
    const id = req.body.id;
    BusinessAgreement.findOneAndUpdate({_id: id}, {status: 'InActive'}, function (err, result) {
        if (err) {
            return res.status(404).json({error: "Please try again"});
        }
        res.status(200).json(result);
    });
}

exports.publishDocument = function (req, res) { // change document status to published
    const id = req.body.id;
    BusinessAgreement.findOneAndUpdate({_id: id}, {status: 'Published'}, function (err, result) {
        if (err) {
            return res.status(404).json({error: "Please try again"});
        }
        res.status(200).json(result);
    });
}

exports.businessAgreementById = function (req, res) { // get document by id
    const id = req.params.id;
    BusinessAgreement.findOne({_id: id}, function (err, document) {
        if (err) {
            return res.status(404).json({error: "Please try again"});
        }
        res.status(200).json(document);
    });
}

exports.uploadBusinessAgreementPdf = function (req, res) {
    console.log("redhfhhdhfjfhdj")
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    // console.log("fields.businessAgreementId",fields.businessAgreementId)
    // console.log("fields",fields)
    // console.log("files",files)
    // console.log("files.file.name",files.file.name)
    if(fields.businessAgreementId) {
            let oldpath = files.file.path;
            // let newpath = 'businessAgreements/pdfAttachment_' + fields.businessAgreementId + path.extname(files.file.name);
            let newpath = 'businessAgreements/'+ files.file.name;
  
            mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
                if (err) {
                    console.error(err);
                    res.status(404).json({error: 'pdfAttachmentNotUploaded'});
                } else {
                    BusinessAgreement.findByIdAndUpdate(fields.businessAgreementId, {pdfAttachment: newpath}, function (err, result) {
                        if (err) {
                            console.error(err);
                            return res.status(404).json({error: "pdfAttachmentNotUploaded"});
                        }
                    // console.log("result",result)
                  });
                    res.status(200).json({success: 'pdfAttachmentUpdated'});
                }
            });
        }
    });
  };

exports.uploadVideoRequest = function (req, res) {
    // console.log("reach to remove",req.params.id)
    const id = req.params.id;
            BusinessAgreement.findByIdAndUpdate(id,
                { videoPaths: []},{ new: true },
                  function (err, result) {
                    if (err) {
                        console.error(err);
                        return res.status(404).json({error: "videoPathsNotEmpty"});
                    }
                // console.log("result",result)
                res.status(200).json({msg:'removedOldPaths'})
              });
}

exports.uploadVideos = function (req, res) {
    // console.log("reached")
    let form = new formidable.IncomingForm();
    // let randomNumber = Math.floor(Math.random() * 10000);
    // console.log("randomNumber",randomNumber)
    form.parse(req, function (err, fields, files) {
    console.log("fields",fields)

        // console.log("fields.multipleVideoOrNot",fields.multipleVideoOrNot)
        // if(fields.multipleVideoOrNot && fields.multipleVideoOrNot === 'singleVideo'){}
        // uploadingLoopLimit
        // if(fields.multipleVideoOrNot && fields.multipleVideoOrNot === 'multipleVideos'){}
        if(fields.agreementId && fields.videoName) {
            // BusinessAgreement.findOne({_id: fields.agreementId}, function (err, document) {
            //     if (err) {
            //         console.log("err while finding document for video uploading",err)
            //         return res.status(404).json({error: "Please try again"});
            //     }
            //     else{
            //         console.log("document",document.numOfVideos)
            //     }
            //     // res.status(200).json(document);
            // });
            let oldpath = files.file.path;
            let url = 'agreementVideos/vid_' + fields.agreementId + fields.videoName + path.extname(files.file.name);
            let newpath = { url }
  
            mv(oldpath, 'uploadedFiles/' + url, function (err) {
                if (err) {
                    console.error(err);
                    res.status(404).json({error: 'videoNotUploaded'});
                } else {
                  BusinessAgreement.findByIdAndUpdate(fields.agreementId,
                    { $push: { videoPaths: newpath } },{ new: true },
                    //  {videoPaths: newpath},
                      function (err, result) {
                        if (err) {
                            console.error(err);
                            return res.status(404).json({error: "videoNotUploaded"});
                        }
                    // console.log("result",result)
                  });
                    res.status(200).json({success: 'videoUpdated'});
                }
            });
        }
    });
};

exports.uploadAgreementHeaderPic = function (req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(fields.agreementId) {
            let oldpath = files.file.path;
            let newpath = 'heroBanners/agreementConfirm_' + fields.agreementId + path.extname(files.file.name);
  
            mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
                if (err) {
                    console.error(err);
                    res.status(404).json({error: 'agreementConfirmHeaderPicNotUploaded'});
                } else {
                    BusinessAgreement.findByIdAndUpdate(fields.agreementId, {agreementConfirmPic: newpath}, function (err, result) {
                        if (err) {
                            console.error(err);
                            return res.status(404).json({error: "agreementConfirmHeaderPicNotUploaded"});
                        }
                    // console.log("result",result)
                  });
                    res.status(200).json({success: 'agreementConfirmHeaderPicUpdated'});
                }
            });
        }
    });
  };

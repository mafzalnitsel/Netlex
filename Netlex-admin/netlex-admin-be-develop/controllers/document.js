const DocumentContent = require("../models/document");
const DocumentField = require("../models/documentField");
const Fields = require("../models/field");
const FieldsController = require("./field");
const formidable = require("formidable");
const mv = require("mv");
const path = require("path");

exports.save = function (req, res) {
    // save and update document
    let {
        id,
        document,
        documentTitle,
        documentDescription,
        documentPrice,
        documentTax,
        status,
        attachmentExist,
        agreementType,
    } = req.body;
    // console.log("req.body in document save", req.body)
    // if (!document) {
    //     res.status(404).json({error: "MissingParameter"});
    //     return;
    // }

    let doc = new DocumentContent();
    doc.document = document;
    doc.documentTitle = documentTitle;
    doc.documentDescription = documentDescription;
    doc.documentPrice = documentPrice;
    doc.documentTax = documentTax;
    doc.status = status;
    // doc.attachmentExist = false;
    doc.attachmentExist = attachmentExist;
    doc.agreementType = agreementType;
    // doc.agreementContains = agreementContains;

    if (id && id !== "") {
        // console.log("id exists")
        // if (document && document !== '') {
        console.log("check");
        DocumentField.findOne({ documentTemplateId: id }).exec(function (
            err,
            data
        ) {
            // console.log("data",data)
            // console.log("err",err)
            if (data && data != null) {
                // console.log("have data to delete")
                DocumentField.deleteMany({ documentTemplateId: id }).exec(function (
                    err,
                    documentField
                ) {
                    if (err) {
                        return res.status(500).json({ err });
                    }
                });
            }
        });
        // if(DocumentFieldExist){
        //     console.log("DocumentFieldExist",DocumentFieldExist)
        // }
        // DocumentField.deleteMany({documentTemplateId: id}).exec(function (err, documentField) {

        //     if (err) {
        //         return res.status(500).json({err})
        //     }

        // });
        // }
        DocumentContent.findOneAndUpdate(
            { _id: id },
            {
                document,
                documentTitle,
                documentDescription,
                documentPrice,
                documentTax,
                status,
                attachmentExist,
                agreementType,
            },
            { useFindAndModify: false },
            function (err, savedDocument) {
                // console.log('savedDocument',savedDocument)
                // sending err msg
                if (err) {
                    res.status(404).json({ error: "ErrorWhileSavingDoc", message: err });
                    return;
                }
                if (document && document !== "") {
                    console.log("check2");

                    FieldsController.saveTemplateId(savedDocument._id).then(() =>
                        generateDocumentFields(document, savedDocument._id).then((result) =>
                            res.status(200).json(savedDocument)
                        )
                    );
                } else {
                    res.status(200).json(savedDocument);
                }
            }
        );
    } else {
        console.log("id not exists");

        doc.save((err, savedDocument) => {
            // sending err msg
            if (err) {
                console.error(err);
                res.status(404).json({ error: "ErrorWhileSavingDoc", message: err });
                return;
            }
            if (document && document !== "") {
                FieldsController.saveTemplateId(savedDocument._id).then(() =>
                    generateDocumentFields(document, savedDocument._id).then((result) =>
                        res.status(200).json(savedDocument)
                    )
                );
            } else {
                res.status(200).json(savedDocument);
            }
        });
    }
};
async function generateDocumentFields(document, id) {
    // parse the fields from document
    let fieldsList2 = document.match(/([^[]+(?=]]))/g); //document.matchAll(/<span data="(.*?)"><\/span>/g);

    let fieldsList = [];
    console.log(fieldsList2);
    // let results= fieldsList.filter(x => x.includes(field));
    if (fieldsList2?.length > 0) {
        fieldsList2.forEach((item, index) => {
            let results = fieldsList.filter((x) => x.includes(item));
            console.log("results.length", results.length);
            if (results.length == 0) {
                fieldsList.push(item);
            }
        });
    }
    console.log("fieldsList2", fieldsList2);
    console.log("fieldsList", fieldsList);

    // fieldsList = Array.from(fieldsList, x => x[1]);
    let localFields = [];
    let globalFields = [];
    let documentFields = [];
    let fieldPositions = [];
    fieldsList.forEach((item, index) => {
        fieldPositions[item] = index;
    });
    let local = new Promise((resolve, reject) => {
        console.log("documentTemplateId", id, fieldsList);
        Fields.find(
            {
                $and: [
                    { "field._id": { $in: fieldsList } },
                    { documentTemplateId: id },
                ],
            },
            function (err, fieldsLocal) {
                console.log("fieldsLocal", fieldsLocal);
                if (fieldsLocal) {
                    fieldsLocal.forEach((field, index) => {
                        localFields.push(field);
                        if (index === fieldsLocal.length - 1) resolve();
                    });
                    if (fieldsLocal.length <= 0) resolve();
                } else {
                    resolve();
                }
            }
        );
    });
    local.then(() => {
        let global = new Promise((resolve, reject) => {
            Fields.find(
                {
                    $and: [{ "field._id": { $in: fieldsList } }, { isGlobal: "global" }],
                },
                function (err, fieldsGlobal) {
                    if (fieldsGlobal) {
                        fieldsGlobal.forEach((field, index) => {
                            globalFields.push(field);
                            if (index === fieldsGlobal.length - 1) resolve();
                        });
                        if (fieldsGlobal.length <= 0) resolve();
                    } else {
                        resolve();
                    }
                }
            );
        });
        global.then(() => {
            const uniqueLocalFields = [...new Set(localFields)];
            const uniqueGlobalFields = [...new Set(globalFields)];
            const uniqueFields = uniqueGlobalFields.concat(uniqueLocalFields);
            uniqueFields.forEach((fields, index) => {
                documentFields.push({
                    fieldPosition: fieldPositions[fields.field._id],
                    documentTemplateId: id,
                    fieldId: fields._id,
                });
            });
            DocumentField.insertMany(documentFields);
        });
    });
}
async function generateDocumentFieldsold(document, id) {
    // parse the fields from document
    // let fieldsList = document.matchAll(/<span data="(.*?)"><\/span>/g);
    let fieldsList = document.match(/([^[]+(?=]]))/g);
    console.log(fieldsList);
    // fieldsList = Array.from(fieldsList, x => x[1]);
    let localFields = [];
    let globalFields = [];
    let documentFields = [];
    let fieldPositions = [];
    fieldsList.forEach((item, index) => {
        fieldPositions[item] = index;
    });
    let local = new Promise((resolve, reject) => {
        console.log("documentTemplateId", id, fieldsList);
        Fields.find(
            {
                $and: [
                    { "field._id": { $in: fieldsList } },
                    { documentTemplateId: id },
                ],
            },
            function (err, fieldsLocal) {
                console.log("fieldsLocal", fieldsLocal);
                if (fieldsLocal) {
                    fieldsLocal.forEach((field, index) => {
                        localFields.push(field);
                        if (index === fieldsLocal.length - 1) resolve();
                    });
                    if (fieldsLocal.length <= 0) resolve();
                } else {
                    resolve();
                }
            }
        );
    });
    local.then(() => {
        let global = new Promise((resolve, reject) => {
            Fields.find(
                {
                    $and: [{ "field._id": { $in: fieldsList } }, { isGlobal: "global" }],
                },
                function (err, fieldsGlobal) {
                    if (fieldsGlobal) {
                        fieldsGlobal.forEach((field, index) => {
                            globalFields.push(field);
                            if (index === fieldsGlobal.length - 1) resolve();
                        });
                        if (fieldsGlobal.length <= 0) resolve();
                    } else {
                        resolve();
                    }
                }
            );
        });
        global.then(() => {
            const uniqueLocalFields = [...new Set(localFields)];
            const uniqueGlobalFields = [...new Set(globalFields)];
            const uniqueFields = uniqueGlobalFields.concat(uniqueLocalFields);
            uniqueFields.forEach((fields, index) => {
                documentFields.push({
                    fieldPosition: fieldPositions[fields.field._id],
                    documentTemplateId: id,
                    fieldId: fields._id,
                });
            });
            DocumentField.insertMany(documentFields);
        });
    });
}

exports.getAllDocuments = function (req, res) {
    // get all published documents
    DocumentContent.find({ status: "Published" }).exec(function (err, document) {
        if (err) {
            console.error(err);
            return res.status(500).json({ err });
        } else {
            return res.status(200).json({ document });
        }
    });
};

exports.getAllDocumentsByStatus = function (req, res) {
    // get all documents by draft or published
    const status = req.params.value;
    DocumentContent.find({ status: status }).exec(function (err, document) {
        if (err) {
            return res.status(500).json({ err });
        } else {
            return res.status(200).json({ document });
        }
    });
};

exports.deleteDocument = function (req, res) {
    // change the document status inactive when delete the document
    const id = req.body.id;
    DocumentContent.findOneAndUpdate(
        { _id: id },
        { status: "InActive" },
        function (err, result) {
            if (err) {
                return res.status(404).json({ error: "Please try again" });
            }
            res.status(200).json(result);
        }
    );
};

exports.publishDocument = function (req, res) {
    // change document status to published
    const id = req.body.id;
    DocumentContent.findOneAndUpdate(
        { _id: id },
        { status: "Published" },
        function (err, result) {
            if (err) {
                return res.status(404).json({ error: "Please try again" });
            }
            res.status(200).json(result);
        }
    );
};

exports.documentById = function (req, res) {
    // get document by id
    const id = req.params.id;
    DocumentContent.findOne({ _id: id }, function (err, document) {
        if (err) {
            return res.status(404).json({ error: "Please try again" });
        }
        res.status(200).json(document);
    });
};

exports.uploadVideoRequest = function (req, res) {
    // console.log("reach to remove",req.params.id)
    const id = req.params.id;
    DocumentContent.findByIdAndUpdate(
        id,
        { videoPaths: [] },
        { new: true },
        function (err, result) {
            if (err) {
                console.error(err);
                return res.status(404).json({ error: "videoPathsNotEmpty" });
            }
            // console.log("result",result)
            res.status(200).json({ msg: "removedOldPaths" });
        }
    );
};

exports.uploadVideos = function (req, res) {
    // console.log("reached")
    let form = new formidable.IncomingForm();
    // let randomNumber = Math.floor(Math.random() * 10000);
    // console.log("randomNumber",randomNumber)
    form.parse(req, function (err, fields, files) {
        console.log("fields", fields);

        // console.log("fields.multipleVideoOrNot",fields.multipleVideoOrNot)
        // if(fields.multipleVideoOrNot && fields.multipleVideoOrNot === 'singleVideo'){}
        // uploadingLoopLimit
        // if(fields.multipleVideoOrNot && fields.multipleVideoOrNot === 'multipleVideos'){}
        if (fields.agreementId && fields.videoName) {
            // DocumentContent.findOne({_id: fields.agreementId}, function (err, document) {
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
            let url =
                "agreementVideos/vid_" +
                fields.agreementId +
                fields.videoName +
                path.extname(files.file.name);
            let newpath = { url };

            mv(oldpath, "uploadedFiles/" + url, function (err) {
                if (err) {
                    console.error(err);
                    res.status(404).json({ error: "videoNotUploaded" });
                } else {
                    DocumentContent.findByIdAndUpdate(
                        fields.agreementId,
                        { $push: { videoPaths: newpath } },
                        { new: true },
                        //  {videoPaths: newpath},
                        function (err, result) {
                            if (err) {
                                console.error(err);
                                return res.status(404).json({ error: "videoNotUploaded" });
                            }
                            // console.log("result",result)
                        }
                    );
                    res.status(200).json({ success: "videoUpdated" });
                }
            });
        }
    });
};

exports.uploadAgreementHeaderPic = function (req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (fields.agreementId) {
            let oldpath = files.file.path;
            let newpath =
                "heroBanners/agreementConfirm_" +
                fields.agreementId +
                path.extname(files.file.name);

            mv(oldpath, "uploadedFiles/" + newpath, function (err) {
                if (err) {
                    console.error(err);
                    res
                        .status(404)
                        .json({ error: "agreementConfirmHeaderPicNotUploaded" });
                } else {
                    DocumentContent.findByIdAndUpdate(
                        fields.agreementId,
                        { agreementConfirmPic: newpath },
                        function (err, result) {
                            if (err) {
                                console.error(err);
                                return res
                                    .status(404)
                                    .json({ error: "agreementConfirmHeaderPicNotUploaded" });
                            }
                            // console.log("result",result)
                        }
                    );
                    res.status(200).json({ success: "agreementConfirmHeaderPicUpdated" });
                }
            });
        }
    });
};

exports.uploadAgreementPdf = function (req, res) {
    console.log("redhfhhdhfjfhdj");
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log("fields.businessAgreementId", fields.businessAgreementId);
        console.log("fields", fields);
        console.log("files", files);
        console.log("files.file.name", files.file.name);
        if (fields.businessAgreementId) {
            let oldpath = files.file.path;
            // let newpath = 'businessAgreements/pdfAttachment_' + fields.businessAgreementId + path.extname(files.file.name);
            let newpath = "businessAgreements/" + files.file.name;

            mv(oldpath, "uploadedFiles/" + newpath, function (err) {
                if (err) {
                    console.error(err);
                    res.status(404).json({ error: "pdfAttachmentNotUploaded" });
                } else {
                    DocumentContent.findByIdAndUpdate(
                        fields.businessAgreementId,
                        { pdfAttachment: newpath },
                        function (err, result) {
                            if (err) {
                                console.error(err);
                                return res
                                    .status(404)
                                    .json({ error: "pdfAttachmentNotUploaded" });
                            }
                            // console.log("result",result)
                        }
                    );
                    res.status(200).json({ success: "pdfAttachmentUpdated" });
                }
            });
        }
    });
};

exports.updateDocumentPrice = function (req, res) {
    // console.log("req.body",req.body)
    // console.log("req.params",req.params)
    const _id = req.params.id;
    DocumentContent.findByIdAndUpdate(_id, req.body, {
        useFindAndModify: false, new: true
    })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update DocumentPrice with id=${_id}. Maybe Document was not found!`,
                });
            } else {
                res.send({ message: "DocumentPrice was updated successfully." });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating BusinessTypes with id=" + _id,
            });
        });
};

exports.convertLocalToGlobal = function (req, res) {
    console.log('req.params(in document)', req.params);
    let id = req.params.id;
    // const allLocalVariables = await Fields.find({ documentTemplateId: req.params.id });
    // console.log('allLocalVariables', allLocalVariables);
    Fields.find({ documentTemplateId: id }).exec((err, doc) => {
        if (err) {
            console.log('Error in finding local variables', err);
            res.status(404).json({ msg: "ErrorInFindingLocalVariables", err: err });
            return;
        }
        if (doc.length > 0) {
            // console.log('doc', doc);
            doc.forEach((element, index) => {
                // console.log('element', element);
                let body = {
                    documentTemplateId: '', isGlobal: 'global'
                }
                Fields.findByIdAndUpdate(element._id, body, { useFindAndModify: false, new: true })
                .exec((err, data) => {
                    if (err) {
                        console.log('err(in document)', err);
                        return;
                    }
                    // console.log('data(in document)', data);
                });
                if (index === (doc.length - 1)) {
                    res.status(200).json('AllLocalVariableConvertedToGlobal')
                }
            })
        } else {
            console.log('NoLocalVariableFound');
            res.status(200).json('NoLocalVariableFound')
        }
    });
}
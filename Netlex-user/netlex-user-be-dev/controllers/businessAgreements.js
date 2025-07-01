const BusinessAgreement = require('../models/businessAgreements');

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

exports.deleteDocument = function (req, res) { // change the document status inactive when delete the document
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


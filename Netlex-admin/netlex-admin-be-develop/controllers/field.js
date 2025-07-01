const Field = require('../models/field.js');
const AnswerOption = require('../models/answerOption');
let savedFields = [];

// Get active Fields
exports.getActiveFields = function (req, res) {
    let documentId = req.params.documentId;
    let fields = [];
    if (req.params.documentId !== 'undefined') {
        Field.find({$and: [{$or: [{documentTemplateId: documentId}, {documentTemplateId: ""}]}, {isGlobal: 'local'}]}).exec((err, localFields) => {
            localFields.forEach(localField => {
                fields.push(localField);
            });
            Field.find({isGlobal: 'global'}).exec((err, globalFields) => {
                globalFields.forEach(globalField => {
                    fields.push(globalField);
                });
                res.status(200).json(fields);
            });
        });
    } else {
        Field.find({documentTemplateId: ''})
            .exec(function (err, document) {
                document.forEach(doc => {
                    fields.push(doc);
                });
                res.status(200).json(fields);

            });
    }
};

exports.save = function (req, res) { // save field values
    if (!req.body) {
        res.status(404).json({error: "MissingParameter"});
        return;
    }
    let field = new Field();
    field.field = req.body.field;
    field.isGlobal = req.body.isGlobal;
    if (req.body.subQuestion) {
        field.subQuestion = req.body.subQuestion;
    }
    field.save((err, savedField) => {
        if (err) {
            return res.status(404).json({error: "ErrorWhileSaveTryAgain"});
        }
        if (field.isGlobal !== 'global') savedFields.push(savedField._id);
        return res.status(200).json(savedField);
    });
};

exports.update = function (req, res) { // update field values
    if (!req.body) {
        res.status(404).json({error: "MissingParameter"});
        return;
    }


    Field.findByIdAndUpdate(req.body._id, req.body, function (err, result) {
        if (err) {
            return res.status(404).json({error: "Can't update the job. Please try again"});
        }
        res.status(200).json(result);
    });
}

exports.get = function (req, res) {
    Field.findById(req.params.id).exec(function (err, field) {
        if (err) {
            return res.status(500).json({err})
        } else {
            return res.status(200).json({field})
        }
    });
}

exports.getAnswerOption = function (req, res) {
    AnswerOption.find({fieldId: req.params.id})
        .exec(function (err, answer) {
            if (err) {
                return res.status(500).json({err})
            } else {
                return res.status(200).json({answer})
            }
        });
};

exports.fieldById = function (req, res) { // get field by id
    let fieldId = req.params.id;
    Field.findById(fieldId)
        .exec((err, fieldList) => {
            if (err) {
                console.error(err);
                return res.status(404).json({error: "Invalid Field Id"});
            }
            res.status(200).json({fieldList});
        });
}

exports.deleteLocalFieldById = function (req, res) { // delete local field by id
    Field.deleteOne({_id: req.body.fieldId}, function (err) {
        err ? res.status(404).json('Invalid id') : res.status(200).json({msg: 'deleted'});
    });
}

exports.fieldCheck = function (req, res) { // duplicate field check
    const fieldName = `\"${req.params.fieldName}\"`;
    const documentId = req.params.documentId;
    const fieldType = req.params.fieldType;
    if (documentId === 'undefined' && fieldType === 'local') {
        Field.find({$and: [{$text: {$search: fieldName}}, {"isGlobal": 'global'}]}).exec(function (err, field) {

            if (field.length > 0) {
                res.status(200).json('exist')
            } else {
                Field.find({$and: [{$text: {$search: fieldName}}, {"documentTemplateId": ''}, {"isGlobal": fieldType}]}).exec(function (err, field) {
                    field.length > 0 ? res.status(200).json('exist') : res.status(200).json({msg: 'notFound'});
                });
            }

        });
    } else if (documentId !== 'undefined' && fieldType === 'local') {
        Field.find({$and: [{$text: {$search: fieldName}}, {"isGlobal": 'global'}]}).exec(function (err, field) {

            if (field?.length > 0) {
                res.status(200).json('exist')
            } else {
                Field.find({$and: [{$text: {$search: fieldName}}, {"documentTemplateId": documentId}, {"isGlobal": fieldType}]}).exec(function (err, field) {

                    if (field.length > 0) {
                        res.status(200).json('exist')
                    } else {
                        Field.find({$and: [{$text: {$search: fieldName}}, {"documentTemplateId": ""}, {"isGlobal": fieldType}]}).exec(function (err, field) {
                            field.length > 0 ? res.status(200).json('exist') : res.status(200).json({msg: 'notFound'});
                        });
                    }

                });
            }

        });
    } else if (fieldType === 'global') {
        Field.find({$text: {$search: fieldName}}).exec(function (err, field) {
            field.length > 0 ? res.status(200).json('exist') : res.status(200).json({msg: 'notFound'});
        });
    }
}

exports.saveTemplateId = function (savedDocumentId) { // save template id for unsaved fields
    return new Promise((resolve, reject) => {
        const fieldsId = savedFields;
        const documentId = savedDocumentId;
        Field.updateMany({_id: {$in: fieldsId}}, {documentTemplateId: documentId}, {new: true}, function (err, document) {
            savedFields = [];
            resolve();
        });
    });
}

exports.deleteByFieldsId = function (req, res) { // delete many fields when document unsaved
    const fieldsId = req.body.fieldsId;
    Field.deleteMany({_id: fieldsId, isGlobal: 'local'}, function (err) {
        err ? res.status(404).json('Invalid id') : res.status(200).json({msg: 'deleted'});
    });
}

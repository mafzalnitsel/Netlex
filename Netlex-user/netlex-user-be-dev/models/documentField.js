const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const myDB = mongoose.connection.useDb('netlexadmin');

//Fields Schema
const fieldCoreSchema = new Schema({
    name: {type: String},
    question: String,
    answerType: String,
    placeHolder: String,
    questionMark: String,
    answerValue: [String],
});

const subQuestionSchema = new Schema({
    field: fieldCoreSchema,
    isFilled: String,
    conditionOperator: String,
    conditionValue: String
});

const fieldSchema = new Schema({
    field: fieldCoreSchema,
    subQuestion: subQuestionSchema,
    isGlobal: String,
    documentTemplateId: {type: String, default: ''}
});
module.exports = myDB.model("Fields", fieldSchema);

//Document Template Scheme
const documentContentSchema = new Schema( {
    document: String,
    documentTitle: String,
    documentDescription: String,
    status: String
});

module.exports = myDB.model('documentTemplates', documentContentSchema);

// Define the MongoDB schema for the collection
const documentFieldsSchema = new Schema( {
    documentTemplateId: {type: Schema.Types.ObjectId,ref: "documentTemplates",required: true},
    fieldId: {type: Schema.Types.ObjectId,ref: "Fields",required: true},
    fieldPosition: Number
});




module.exports = myDB.model('documentFields', documentFieldsSchema);
// Export the answerType model

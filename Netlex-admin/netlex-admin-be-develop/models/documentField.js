const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define the MongoDB schema for the collection
const documentFieldsSchema = new Schema( {
    documentTemplateId: {type: Schema.Types.ObjectId,ref: "documentTemplates",required: true},
    fieldId: {type: Schema.Types.ObjectId,ref: "Fields",required: true},
    fieldPosition: Number
});

// Export the answerType model
module.exports = mongoose.model("documentFields", documentFieldsSchema);

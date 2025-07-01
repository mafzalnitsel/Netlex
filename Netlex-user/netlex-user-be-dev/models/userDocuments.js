const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const myDB = mongoose.connection.useDb('netlexadmin');
const documentFieldsSchema = new Schema( {
    documentTemplateId: {type: Schema.Types.ObjectId,ref: "documentTemplates",required: true},
    fieldId: {type: Schema.Types.ObjectId,ref: "Fields",required: true},
    fieldPosition: Number
});

module.exports = myDB.model('documentFields', documentFieldsSchema);

// Define the MongoDB schema for the collection
const userDocumentsSchema = new Schema( {
    documentFieldId: {type: Schema.Types.ObjectId,ref: "documentFields",required: true},
    masterId: String,
    fieldId: String,
    answer: String,
});



module.exports = myDB.model("userDocument", userDocumentsSchema);

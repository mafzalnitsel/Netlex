const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define the MongoDB schema for the collection
const userDocumentsSchema = new Schema( {
    documentFieldId: {type: Schema.Types.ObjectId,ref: "documentFields",required: true},
    masterId: String,
    fieldId: String,
    answer: String,
});

// Export the answerType model
const myDB = mongoose.connection.useDb('netlexadmin');

module.exports = myDB.model("userDocuments", userDocumentsSchema);

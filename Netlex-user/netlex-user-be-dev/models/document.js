const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define the MongoDB schema for the collection
const documentContentSchema = new Schema( {
    document: String,
    documentTitle: String,
    documentDescription: String,
    documentPrice: String,
    documentTax: String,
    status: String,
    pdfAttachment: String
});


const myDB = mongoose.connection.useDb('netlexadmin');

module.exports = myDB.model('documentTemplates', documentContentSchema);

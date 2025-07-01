

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// Define the MongoDB schema for the contentpage collection
const agreementRequestSchema = new Schema({
    // userName: String,
    user: {},
    userId: String,
    documentId: String,
    documentTitle: String,
    questionAndAnswers: [],
    status: String,
},{timestamps: true});

// Export the contentpage model
const myDB = mongoose.connection.useDb('netlexadmin');

module.exports = myDB.model('AgreementRequest', agreementRequestSchema);



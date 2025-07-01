

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate")), (bcrypt = require("bcryptjs"));

// Define the MongoDB schema for the contentpage collection
const agreementRequestSchema = new Schema({
    userId: String,
    user: {},
    documentId: String,
    documentTitle: String,
    questionAndAnswers: [],
    status: String,
}, { timestamps: true });
// Paginate the results
agreementRequestSchema.plugin(mongoosePaginate);

// Export the AgreementRequest Model
// const myDB = mongoose.connection.useDb('netlexadmin');

module.exports = mongoose.model('AgreementRequest', agreementRequestSchema);



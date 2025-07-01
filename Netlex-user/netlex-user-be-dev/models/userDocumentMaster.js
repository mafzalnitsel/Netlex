require('./document');

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const myDB = mongoose.connection.useDb('netlexadmin');

//Document Template Scheme
const documentContentSchema = new Schema( {
    document: String,
    documentTitle: String,
    documentDescription: String,
    status: String
});

module.exports = myDB.model('documentTemplates', documentContentSchema);

const userDocumentMasterScheme = new Schema( {
    userId: String,
    documentTemplateId: {type: Schema.Types.ObjectId,ref: "documentTemplates",required: true},
    generationDate: Date,
    paymentStatus: String,
    paymentId: String,
    agreementSentStatus: String,
    purchaseRequest: Boolean,
    purchaseRequestStatus: String,
    agreementrequestid:String,
});

module.exports = myDB.model('userDocumentMaster', userDocumentMasterScheme);

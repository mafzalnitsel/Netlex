const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const myDB = mongoose.connection.useDb('netlexadmin');
const userDocumentMasterScheme = new Schema( {
    userId: String,
    documentTemplateId: {type: Schema.Types.ObjectId,ref: "documentTemplates",required: true},
    generationDate: Date,
    paymentStatus: String,
    paymentId: Date,
    agreeementSentStatus: String,
    purchaseRequest: Boolean,
    purchaseRequestStatus: String,
});

module.exports = myDB.model('userDocumentMaster', userDocumentMasterScheme);

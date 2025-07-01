const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// Define the MongoDB schema for the collection
const businessAgreementSchema = new Schema({
  document: String,
  documentTitle: String,
  documentDescription: String,
  documentPrice: String,
  documentTax: String,
  status: String,
  pdfAttachment: String,
  //-----New----
//   videoIndex: { type: Number, default: 0 },
//   numOfVideos: { type: Number, default: 0 },
  videoPaths: [],
  agreementConfirmPic: String,
});

// Export the answerType model
const myDB = mongoose.connection.useDb('netlexadmin');
module.exports = myDB.model("businessAgreement", businessAgreementSchema);

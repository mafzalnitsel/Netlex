const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// Define the MongoDB schema for the collection
const documentContentSchema = new Schema({
  document: String,
  documentTitle: String,
  documentDescription: String,
  documentPrice: String,
  documentTax: String,
  status: String,
  //-----New----
  attachmentExist: Boolean,
  agreementType: String,
  // agreementContains: String,
  //   videoIndex: { type: Number, default: 0 },
  //   numOfVideos: { type: Number, default: 0 },
  videoPaths: [],
  agreementConfirmPic: String,
  pdfAttachment: String,
});

// Export the answerType model
module.exports = mongoose.model("documentTemplates", documentContentSchema);

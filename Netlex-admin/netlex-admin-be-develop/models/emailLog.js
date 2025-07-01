const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate")),
  (bcrypt = require("bcryptjs"));

// Define the MongoDB schema for the QuestionAndAnswer collection
const emailLogSchema = new Schema(
  {
    body:{},
    userDetails: {},
    subject: String,
    contentType: String,
    content: String,
    emailAddress: String,
    error: {},
    errorFullArray: {},
    emailType: String,
  },
  {
    timestamps: true,
  }
);
// Paginate the results
emailLogSchema.plugin(mongoosePaginate);

// Export the QuestionAndAnswer model

// const myDB = mongoose.connection.useDb('netlexuser');
module.exports = mongoose.model("EmailLog", emailLogSchema);

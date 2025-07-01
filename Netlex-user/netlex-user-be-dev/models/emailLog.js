const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate")),
  (bcrypt = require("bcryptjs"));

// Define the MongoDB schema for the QuestionAndAnswer collection
const emailLogSchema = new Schema(
  {
    userDetails: {},
    body: {},
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

// Export the EmailLogss model

const myDB = mongoose.connection.useDb('netlexadmin');
module.exports = myDB.model("EmailLog", emailLogSchema);

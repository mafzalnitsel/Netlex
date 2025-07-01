const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate")),
  (bcrypt = require("bcryptjs"));

// Define the MongoDB schema for the QuestionAndAnswer collection
const paymentsConfigurationSchema = new Schema({
  //Payment Configuration Name
  name: String,

  //---Klarna Configuration---
  klarna_payment_url: String,
  klarna_confirm_url: String,
  klarna_userName: String,
  klarna_password: String,

  //---Swish Configuration---
  swish_pem_cert: String,
  swish_key_cert: String,
  swish_pem_root: String,
  swish_passPhrase: String,
  swish_payeeAlias: String,
  swish_payeePaymentReference: String,
  swish_payerAlias: String,

  //---Stripe Configuration---
  stripe_secret_key: String,
  // stripe_success_url: String,
  // stripe_sale_success_url: String,
  // stripe_cancel_url: String,

  //---BankID Configuration---
  // BankID_Auth_API: String,
  // BankID_Collect_API: String,
  BankID_API: String,  
  API_Key: String,
  IP_Address: String,
  Secret_Key: String,
});
// Paginate the results
paymentsConfigurationSchema.plugin(mongoosePaginate);

// Export the QuestionAndAnswer model

// const myDB = mongoose.connection.useDb("netlexuser");
module.exports = mongoose.model(
  "PaymentsConfiguration",
  paymentsConfigurationSchema
);

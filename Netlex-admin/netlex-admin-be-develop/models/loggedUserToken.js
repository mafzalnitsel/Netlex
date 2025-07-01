const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate")),
(bcrypt = require("bcryptjs"));

// Define the MongoDB schema for the ClientsDetails collection
const loggedUserTokenSchema = new Schema({
  token: String,
});
// Paginate the results
loggedUserTokenSchema.plugin(mongoosePaginate);

// Export the ClientsDetails model
module.exports = mongoose.model("LoggedUserToken", loggedUserTokenSchema);

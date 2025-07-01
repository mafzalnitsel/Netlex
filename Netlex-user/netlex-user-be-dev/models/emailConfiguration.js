const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate")),
    (bcrypt = require("bcryptjs"));

// Define the MongoDB schema for the QuestionAndAnswer collection
const emailConfigurationSchema = new Schema({
    oauth_client_id: String,
    oauth_client_secret: String,
    oauth_authority: String,
    user_id: String,
    
    // OAUTH_CLIENT_ID: String,
    // OAUTH_CLIENT_SECRET: String,
    // OAUTH_AUTHORITY: String,
    // USER_ID: String,
});
// Paginate the results
emailConfigurationSchema.plugin(mongoosePaginate);

// Export the QuestionAndAnswer model

const myDB = mongoose.connection.useDb('netlexadmin');
module.exports = myDB.model("EmailConfiguration", emailConfigurationSchema);

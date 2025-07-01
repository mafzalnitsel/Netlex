const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate")),
    (bcrypt = require("bcryptjs"));

// Define the MongoDB schema for the QuestionAndAnswer collection
const lawyerBusyTimeSchema = new Schema({
    lawyerId: String,
    date: String,
    times: [],
});
// Paginate the results
lawyerBusyTimeSchema.plugin(mongoosePaginate);

// Export the QuestionAndAnswer model

const myDB = mongoose.connection.useDb('netlexadmin');
module.exports = myDB.model("LawyerBusyTimes", lawyerBusyTimeSchema);

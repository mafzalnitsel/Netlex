const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoosePaginate = require('mongoose-paginate'),
    bcrypt = require('bcryptjs');

// Define the MongoDB schema for the people collection
const scheduleSchema = new Schema({
    heading: String,
    dateOf: String,
    time: String,
    description: String,
    language: String,
    attachment: String,
    status: String,
    userName: String,
    userEmail: String,
    userSSN: String,
    userPhoneNo: String,
    lawyer: String,
    lawyerId:String, 
    focnonfoc:String,
    Ispaid: String, 
    reasonOfFoc: String,
    statusExpireTime : String,
    counterpartyName : String,
    counterpartySSN : String,
    teamsMeetingLink : String,
});

// Paginate the results
scheduleSchema.plugin(mongoosePaginate);

// Export the User model
module.exports = mongoose.model('Schedule', scheduleSchema);

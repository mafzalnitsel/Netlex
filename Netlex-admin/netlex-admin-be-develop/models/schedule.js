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
    lawyer: String, 
    userName: String,
    userEmail: String,
    userSSN: String,
    userPhoneNo: String,
    lawyer: String,
    lawyerId:String,
    statusConfirmTime : String,
    statusExpireTime : String,
    focnonfoc: String,
    businessTypeId: String, //New Added on 01-03-2023
    meetingPaymentLink: String,  //New Added on 16-03-2023
});

// Paginate the results
scheduleSchema.plugin(mongoosePaginate);

// Export the User model
const myDB = mongoose.connection.useDb('netlexuser');
module.exports = myDB.model('Schedule', scheduleSchema);
// module.exports = mongoose.model('Schedule', scheduleSchema);


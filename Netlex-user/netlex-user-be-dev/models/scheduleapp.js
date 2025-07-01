const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoosePaginate = require('mongoose-paginate'),
    bcrypt = require('bcryptjs');

// Define the MongoDB schema for the people collection
const scheduleappSchema = new Schema({
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
    Ispaid: String,
    
    
});

// Paginate the results
scheduleappSchema.plugin(mongoosePaginate);

// Export the User model
module.exports = mongoose.model('scheduleapp', scheduleappSchema);

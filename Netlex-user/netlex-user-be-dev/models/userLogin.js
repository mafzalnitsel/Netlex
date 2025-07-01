const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define the MongoDB schema for the answerType collection
const orderSchema = new Schema( {
    date: String,
    time: String,
    ssn: String,
    orderRef: String,
    autoStartToken: String,
    qrStartToken: String,
    qrStartSecret: String,
    status: String,
},{timestamps: true});

// Export the answerType model
module.exports = mongoose.model('UserLogin', orderSchema);

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define the MongoDB schema for the Field collection
const requestSchema = new Schema({
    userName: String,
    userId: String,
    status: String,
    organizationId: String,
    requestedDate: String,
    acceptedDate: String
});

const myDB = mongoose.connection.useDb('netlexuser');

module.exports = myDB.model("request", requestSchema);


const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define the MongoDB schema for the Field collection
const organizationSchema = new Schema({
    organizationName: String,
    organizationNumber: String,
    organizationSsn: String,
    status: String,
});

const myDB = mongoose.connection.useDb('netlexuser');

module.exports = myDB.model("organization", organizationSchema);


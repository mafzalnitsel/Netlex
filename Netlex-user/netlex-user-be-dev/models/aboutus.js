

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// Define the MongoDB schema for the contentpage collection
const aboutUsSchema = new Schema({
    heading: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
        unique: true,
    },
});

// Export the contentpage model
const myDB = mongoose.connection.useDb('netlexadmin');

module.exports = myDB.model('AboutUs', aboutUsSchema);



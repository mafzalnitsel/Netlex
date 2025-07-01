const mongoose = require('mongoose'),
   Schema = mongoose.Schema;

// Define the MongoDB schema for the answerType collection
const dataaSchema = new Schema( {
    name: String,
    age: String
});

// Export the answerType model


module.exports = mongoose.model('FakeData', dataaSchema);
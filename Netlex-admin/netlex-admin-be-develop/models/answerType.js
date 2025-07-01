const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define the MongoDB schema for the answerType collection
const answerSchema = new Schema( {
   answerType: String,
});

// Export the answerType model
module.exports = mongoose.model('AnswerType', answerSchema);

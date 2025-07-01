const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// Define the MongoDB schema for the answerType collection
const answerOptionSchema = new Schema( {
     fieldId: String,
   answerOption: String,
});

// Export the answerType model
const myDB = mongoose.connection.useDb('netlexadmin');

module.exports = myDB.model('AnswerOption', answerOptionSchema);


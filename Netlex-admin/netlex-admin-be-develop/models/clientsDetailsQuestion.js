

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate"))
// Define the MongoDB schema for the contentpage collection
const clientsDetailsQuestionSchema = new Schema({
    question: String,
    placeholder: String,
    type: String
});
// Paginate the results
clientsDetailsQuestionSchema.plugin(mongoosePaginate);

// Export the ClientsDetailsQuestion Model
// const myDB = mongoose.connection.useDb('netlexadmin');

module.exports = mongoose.model('ClientsDetailsQuestion', clientsDetailsQuestionSchema);



const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define the MongoDB schema for the answerType collection
const categoriesSchema = new Schema( {
    categories: String,
});

// Export the answerType model
module.exports = mongoose.model('Category', categoriesSchema);

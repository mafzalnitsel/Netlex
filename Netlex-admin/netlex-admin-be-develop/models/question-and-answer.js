const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate")),
    (bcrypt = require("bcryptjs"));

// Define the MongoDB schema for the QuestionAndAnswer collection
const questionAnswerSchema = new Schema({
    heading: {
        type: String,
    },
    description: {
        type: String,
    },
    question: {
        type: String,
        unique: true,
    },
    answer: {
        type: String,
        unique: true,
    },
    category: String,
});
// Paginate the results
questionAnswerSchema.plugin(mongoosePaginate);

// Export the QuestionAndAnswer model

// const myDB = mongoose.connection.useDb('netlexuser');
module.exports = mongoose.model("QuestionAndAnswer", questionAnswerSchema);

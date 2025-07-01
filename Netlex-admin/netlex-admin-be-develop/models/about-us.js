const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate")),
    (bcrypt = require("bcryptjs"));

// Define the MongoDB schema for the QuestionAndAnswer collection
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
// Paginate the results
aboutUsSchema.plugin(mongoosePaginate);

// Export the QuestionAndAnswer model

// const myDB = mongoose.connection.useDb('netlexuser');
module.exports = mongoose.model("AboutUs", aboutUsSchema);

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate"));
    // ,(bcrypt = require("bcryptjs"));

// Define the MongoDB schema for the FindUs collection
const findUsSchema = new Schema({
    // heading: {
    //     type: String,
    //     unique: true,
    // },
    // description: {
    //     type: String,
    //     unique: true,
    // },

    office_Name: String,
    office_Address: String,
    office_Email: String,
    office_Contact: Number,
});
// Paginate the results
findUsSchema.plugin(mongoosePaginate);

// Export the QuestionAndAnswer model

// const myDB = mongoose.connection.useDb('netlexuser');
module.exports = mongoose.model("FindUs", findUsSchema);

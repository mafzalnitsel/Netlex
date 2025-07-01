const mongoose = require('mongoose');

(mongoosePaginate = require("mongoose-paginate")),
    (bcrypt = require("bcryptjs"));
    Schema = mongoose.Schema;
// Define the MongoDB schema for the contentpage collection
const contentpageSchema = new Schema({
    name: String,
    htmlcontent: String,
});
// Export the contentpage model
contentpageSchema.plugin(mongoosePaginate);
// const myDB = mongoose.connection.useDb('netlexadmin');
module.exports = mongoose.model('contentpage', contentpageSchema);
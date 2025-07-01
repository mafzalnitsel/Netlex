const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate")),
    (bcrypt = require("bcryptjs"));

let date_ob = new Date();
// Define the MongoDB schema for the businessType collection
const businessTypeSchema = new Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true
    },
    amount: {
        type: Number,
    },
    vat: {
        type: Number,
    },
});
// Paginate the results
businessTypeSchema.plugin(mongoosePaginate);

// Export the businessType model
module.exports = mongoose.model("BusinessType", businessTypeSchema);

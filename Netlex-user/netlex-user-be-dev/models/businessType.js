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


const myDB = mongoose.connection.useDb('netlexadmin');


module.exports = myDB.model("BusinessType", businessTypeSchema);


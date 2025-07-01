const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate")),
    (bcrypt = require("bcryptjs"));

let date_ob = new Date();
// Define the MongoDB schema for the ClientsDetails collection
const clientsDetailsSchema = new Schema({
    //From
    fromName: {
        type: String,
        unique: true,
        lowercase: true
    },
    fromPhoneNumber: {
        type: Number,
    },
    fromEmail: {
        type: String,
    },
    fromSsn: {
        type: Number,
    },
    //To
    toName: {
        type: String,
        unique: true,
        lowercase: true
    },
    toPhoneNumber: {
        type: Number,
    },
    toEmail: {
        type: String,
    },
    toSsn: {
        type: Number,
    },

});
// Paginate the results
clientsDetailsSchema.plugin(mongoosePaginate);

// Export the ClientsDetails model
module.exports = mongoose.model("ClientsDetails", clientsDetailsSchema);

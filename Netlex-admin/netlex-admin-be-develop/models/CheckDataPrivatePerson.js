const mongoose = require("mongoose"), 
Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate")),
(bcrypt = require("bcryptjs"));

// Define the MongoDB schema for the ClientsDetails collection
const CheckDataPrivatePersonSchema = new Schema({
    privateperson: {
    type: String
}
});
// Paginate the results
CheckDataPrivatePersonSchema.plugin(mongoosePaginate);

// Export the ClientsDetails model
module.exports = mongoose.model("CheckDataPrivatePerson", CheckDataPrivatePersonSchema);
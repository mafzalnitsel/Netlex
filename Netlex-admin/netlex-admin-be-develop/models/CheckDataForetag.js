const mongoose = require("mongoose"), 
Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate")),
(bcrypt = require("bcryptjs"));

// Define the MongoDB schema for the ClientsDetails collection
const CheckDataForetagSchema = new Schema({
    foretag: {
    type: String
}
});
// Paginate the results
CheckDataForetagSchema.plugin(mongoosePaginate);

// Export the ClientsDetails model
module.exports = mongoose.model("CheckDataForetag", CheckDataForetagSchema);
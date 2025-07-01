const mongoose = require("mongoose"),
Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate")),
(bcrypt = require("bcryptjs"));

let date_ob = new Date();
// Define the MongoDB schema for the businessType collection
const checkDataForetagSchema = new Schema({
    foretag: {
    type: String
}
});
// Paginate the results
checkDataForetagSchema.plugin(mongoosePaginate);


const myDB = mongoose.connection.useDb('netlexadmin');


module.exports = myDB.model("CheckDataForetag", checkDataForetagSchema);


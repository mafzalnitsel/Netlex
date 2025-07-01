const mongoose = require("mongoose"),
Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate")),
(bcrypt = require("bcryptjs"));

let date_ob = new Date();
// Define the MongoDB schema for the businessType collection
const checkDataPrivatePersonSchema = new Schema({
    privateperson: {
    type: String
}
});
// Paginate the results
checkDataPrivatePersonSchema.plugin(mongoosePaginate);


const myDB = mongoose.connection.useDb('netlexadmin');


module.exports = myDB.model("CheckDataPrivatePerson", checkDataPrivatePersonSchema);


const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate")),
    (bcrypt = require("bcryptjs"));

// Define the MongoDB schema for the role collection
const roleSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
  
   // roleID: { type: String },
  useForLawyer: { type: Boolean, default: false },

});
// Paginate the results
roleSchema.plugin(mongoosePaginate);

// Export the role model
module.exports = mongoose.model("Role", roleSchema);

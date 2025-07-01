const appJs = require("../app");
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
mongoosePaginate = require("mongoose-paginate");

//bcrypt = require("bcryptjs");

// Define the MongoDB schema for the answerType collection
const actionSchema = new Schema({
  name: {
    type: String,
    //require: true,
  },

  roleID: {
    type: String,
    // require: true,
  },
  roleactionID: {
    type: String,
    // require: true,
  },
  menuActionID: { type: Array },
});
const actionSchemanew = new Schema({
  name: { type: String },
  roleID: { type:String  },
  roleactionID: { type: String },
});

actionSchemanew.plugin(mongoosePaginate);

// Export the answerType model
module.exports = mongoose.model("Roleaction", actionSchemanew);

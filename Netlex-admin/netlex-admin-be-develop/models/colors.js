const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate")),
    (bcrypt = require("bcryptjs"));

// Define the MongoDB schema for the Colors collection
const colors = new Schema({
    // color: {},
    colorName: {
        type: String,
    },
    colorCode: {
        type: String,
    },

});
// Paginate the results
colors.plugin(mongoosePaginate);

// Export the Colors model

module.exports = mongoose.model("Colors", colors);

 
const CheckDataForetag =  require("../models/checkDataForetag");
bcrypt = require("bcryptjs");




// Get all BusinessTypes
exports.get = function (req, res) {
    CheckDataForetag.find()
    .exec(function (err, response) {
        if (err) {
            return res.status(500).json({err})
        } else {
            res.json(response)
        }
    });
};

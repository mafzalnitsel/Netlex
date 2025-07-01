  
const CheckDataPrivatePerson =  require("../models/checkDataPrivatePerson");
bcrypt = require("bcryptjs");




// Get all BusinessTypes
exports.get = function (req, res) {
    CheckDataPrivatePerson.find()
    .exec(function (err, response) {
        if (err) {
            return res.status(500).json({err})
        } else {
            res.json(response)
        }
    });
};

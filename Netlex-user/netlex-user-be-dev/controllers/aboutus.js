const AboutUs = require('../models/aboutus.js');
const User = require('../models/user.js');

exports.getaboutus = function (req, res) {
  
AboutUs.find()
        .exec(function (err, aboutus) {
            if (err) {
                return res.status(500).json({err})
            } else {
                return res.status(200).json({aboutus})
            }
        });
};
 
const clientsDetails = require('../models/clientsDetails.js');
const User = require('../models/user.js');
const clientsDetailsservice = require('../services/clientsDetails-service');
exports.getclientsDetailstoSsn = function (req, res) {
 
console.log('req.params.toSsn:'+req.params.toSsn); 
clientsDetails.find({toSsn: req.params.toSsn})
        .exec(function (err, clientsDetails) {
            if (err) {
                return res.status(500).json({err})
            } else {
                return res.status(200).json({clientsDetails})
            }
        });
};
 
exports.getclientsDetailstossnto = async(req, res, next)=> {
    return await clientsDetailsservice.getclientsDetailstoSsnto(req, res);
    // return res.json({lawyerAvailability});
};
 
exports.getclientsDetailstoEmail = function (req, res) {
 
    console.log('req.params.toEmail:'+req.params.toEmail); 
    clientsDetails.find({toEmail: req.params.toEmail})
            .exec(function (err, clientsDetails) {
                if (err) {
                    return res.status(500).json({err})
                } else {
                    return res.status(200).json({clientsDetails})
                }
            });
    };

    exports.getclientsDetailstoPhoneNumber = function (req, res) {
 
        console.log('req.params.toPhoneNumber:'+req.params.toPhoneNumber); 
        clientsDetails.find({toPhoneNumber: req.params.toPhoneNumber})
                .exec(function (err, clientsDetails) {
                    if (err) {
                        return res.status(500).json({err})
                    } else {
                        return res.status(200).json({clientsDetails})
                    }
                });
        };
 

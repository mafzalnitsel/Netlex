// 1. Load the User model
const scheduleapp = require('../models/scheduleapp');
const http = require('http');
const scheduleappService = require("../services/scheduleapp-service");

bcrypt = require('bcryptjs');

//save
exports.scheduleappSave = function (req, res) {
    return scheduleappService.savescheduleapp(req, res);
};


exports.getscheduleappList = function (req, res) {
     try {
         const query = {};
         const page = +(req.query.page || 1);
         const limit = +(req.query.limit || 10);
         const options = {
             page: page,
             limit: limit
         };
         scheduleapp.paginate(query, options).then(function (result) {
             res.json(result);
         });
     } catch (error) {
         res.status(404).json({error: 'Please try again'})
     }
};

exports.scheduleappupdate = function(req, res) {

        if (!req.body) {
            res.status(404).json({error: "MissingParameter"});
            return;
        }


    scheduleapp.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
            if (err) {
                return res.status(404).json({error: "Can't update the job. Please try again"});
            }
            res.status(200).json(result);
        });

};

exports.show = function (req, res) {
    scheduleapp.findById(req.params.id)
        .exec(function (err, doc) {
            if (err || doc === null) {
                res.status(404).json({error: 'UserNotFound'});
            } else {
                res.json(doc);
            }
        });
};

exports.scheduleappById = function (req, res) { // get document by id
    const id = req.params.id;
    scheduleapp.findOne({_id: id}, function (err, scheduleapp) {

        if (err) {
            return res.status(404).json({error: "Please try again"});
        }
        res.status(200).json(scheduleapp);
    });
};

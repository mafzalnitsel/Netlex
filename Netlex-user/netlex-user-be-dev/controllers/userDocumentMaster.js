const userDocumentMaster = require('../models/userDocumentMaster');
var express = require('express');




bcrypt = require('bcryptjs');

exports.getuserDocumentMaster = function (req, res) {
    userDocumentMaster.find({}).exec(function (err, doc) {
        if (err) {
            return res.status(500).json({err})
        } else {
            return res.status(200).json({doc})
        }
    });
};





exports.delete = async (req, res) => {
    const document = await userDocumentMaster.findById(req.params.id);
    if(userId) {
        userDocumentMaster.findByIdAndRemove(req.params.id)
            .exec(function (err) {
                if (err) {
                    console.error(err);
                    res.status(404).json({error: 'userDocumentMasterNotFound'});
                } else {
                   
                    res.status(200).json({success: 'userDocumentMasterDeleted'});
                }
            });
    }
};

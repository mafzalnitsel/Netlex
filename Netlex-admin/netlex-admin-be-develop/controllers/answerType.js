const AnswerType = require('../models/answerType.js');
const User = require('../models/user.js');


// Get active Fields
exports.getActiveAnswerType = function (req, res) {
    console.log("This is answer type db api ");

    AnswerType.find()
        .exec(function (err, answer) {
            if (err) {
                console.log("This is answer type api err ");

                return res.status(500).json({err})
            } else {
                console.log("This is answer type api answer");

                return res.status(200).json({answer})
            }
        });
};
exports.save = function (req, res) {
    console.log("This is answer type ");
    
    let {answerType} = req.body;
    if (!answerType) {
        res.status(404).json({error: "MissingParameter"});
        return;
    }
    let answer = new AnswerType();
    answer.answerType = answerType;

    answer.save((err, savedUser) => {
        if(err){
            console.error(err);
            return res.status(404).json({error:"ErrorWhileSaveTryAgain"});
        }
        res.status(200).json(savedUser);
    });
};

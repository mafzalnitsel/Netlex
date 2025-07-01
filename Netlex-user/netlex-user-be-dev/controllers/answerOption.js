const AnswerOption = require('../models/answerOption.js');
const User = require('../models/user.js');


// Get active Fields test
exports.getAnswerOptionByFieldId = function (req, res) {

    AnswerOption.find({fieldId: req.params.id},{fieldId: false,_id: false,__v: false})
        .exec(function (err, answer) {
            if (err) {
                return res.status(500).json({err})
            } else {
                let answerOption = answer.answerOption;
                return res.status(200).json({answer})

            }
        });
};
exports.save = function (req, res) {
    let {answerOption,fieldId} = req.body;
    let answervalue = answerOption.split(',');
    let answerVal = [];
    if (!answerOption) {
        res.status(404).json({error: "MissingParameter"});
        return;
    }
    answervalue.forEach(function(answer) {
        answerVal.push({fieldId,answerOption: answer})
    });
    AnswerOption.insertMany(answerVal, function (err, returnData) {
        if (err) {
            res.status(404).json({err: 'Err', msg: err});
        }else{
            res.status(200).json(returnData);
        }
    });

};

exports.delete = function (req, res) {
    let fieldId = req.params.id;
    if (!fieldId) {
        res.status(404).json({error: "MissingParameter"});
        return;
    }
    AnswerOption.deleteMany({fieldId: fieldId}) .exec(function (err, answer) {
        if (err) {
            return res.status(500).json({err})
        } else {
            return res.status(200).json({answer})
        }
    });

};

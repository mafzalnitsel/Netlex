

// const FakeData = require('../models/answerType.js');
// const User = require('../models/user.js');



// // Get active Fields
// exports.getActiveFakeData= function (req, res) {
//     console.log("This is fake data ");

//     FakeData.find()
//         .exec(function (err, answer) {
//             if (err) {
//                 console.log("This is answer type api err ");

//                 return res.status(500).json({err})
//             } else {
//                 console.log("This is answer type api answer");

//                 return res.status(200).json({answer})
//             }
//         });
// };
// exports.save = function (req, res) {
//     console.log("This is datafake ");
//     let {name, age} = req.body;
//     let dataa = new FakeData();
//     dataa.name = name;
//     dataa.age = age;

//     dataa.save((err, saveData) => {
//         if(err){
//             console.error(err);
//             return res.status(404).json({error:"ErrorWhileSaveTryAgain"});
//         }
//         res.status(200).json(saveData);
//     });
// };








const FakeData = require('../models/fakedata.js');
const User = require('../models/user.js');


// Get active Fields
exports.getActiveFakeData = function (req, res) {
    console.log("This is answer type db api ");

    FakeData.find()
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
    
    let {name, age} = req.body;
    if (!name) {
        res.status(404).json({error: "MissingParameter"});
        return;
    }
    let dataa = new FakeData();
    dataa.name = name;
    dataa.age = age;

    dataa.save((err, saveFake) => {
        if(err){
            console.error(err);
            return res.status(404).json({error:"ErrorWhileSaveTryAgain"});
        }
        res.status(200).json(saveFake);
    });
};


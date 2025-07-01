const ContentPage = require('../models/contentpage.js');
const User = require('../models/user.js');

exports.getContentPage = function (req, res) {
 
console.log('req.params.name:'+req.params.name); 
    ContentPage.find({name: req.params.name})
        .exec(function (err, contentpage) {
            if (err) {
                return res.status(500).json({err})
            } else {
                return res.status(200).json({contentpage})
            }
        });
};
// Get ContentPage
// exports.getContentPage = function (req, res) {
// //req.params.name
// ContentPage.find()
//         .exec(function (err, answer) {
//             if (err) {
//                 return res.status(500).json({err})
//             } else {
//                 console.log('answer'+answer)
//                 return res.status(200).json({answer})
//             }
//         });

//     // ContentPage.find()
//     //     .exec(function (err, htmlcontent) {
//     //         if (err) {
//     //             return res.status(500).json({err})
//     //         } else {
//     //             let Content_Page = htmlcontent.htmlcontent;
//     //             return res.status(200).json({htmlcontent})

//     //         }
//     //     });
// };
 

 

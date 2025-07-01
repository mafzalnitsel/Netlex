
const ContentPage = require('../models/contentpages');
const res = require("express");



exports.save = function (req, res) {

    
    let { name, htmlcontent } = req.body;
    let contentpage = new ContentPage();
    contentpage.name = name;
    contentpage.htmlcontent = htmlcontent;

    contentpage.save((err, savedData) => {
        if (err) {
          console.log("err", err);
          return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
        }
        res.status(200).json(savedData);
      });
  

  };

//   exports.updateContent = function (req, res) {
//     const _id = req.params.id;

//     ContentPage.findByIdAndUpdate(_id, req.body ,  { useFindAndModify: false, new: true, })
//         .then(data => {
//             if (!data) {
//                 res.status(404).send({
//                     message: `Cannot update action with id=${_id}. Maybe action was not found!`
//                 });
//             } 
//             else  res.send({ message: "action was updated successfully.", data });
            
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error updating action with id=" + _id
//             });
//         });
// }

exports.updateContent = function (req, res) {
  const _id = req.params.id;
  console.log('coming',req.body.contentPage[0])
  ContentPage.findByIdAndUpdate(_id, req.body.contentPage[0], {
    useFindAndModify: false, new:true
  })
  .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Role with id=${_id}. Maybe Role was not found!`,
        });
      } else {
        console.log('data',data)
        res.send({ message: "Role was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Role with id=" + _id,
      });
    });
};

// exports.ContentByStatus = function (req, res) { // get all documents by draft or published
//     const status = req.params.value;
//     ContentPage.find({status: status})
//         .exec(function (err, document) {
//             if (err) {
//                 return res.status(500).json({err})
//             } else {
//                 return res.status(200).json({document})
//             }
//         });
// }

// exports.ContentByStatus = function (req, res) {
//     ContentPage.find().exec(function (err, doc) {
//       if (err) {
//         console.log("Error in finding BusinessType from DB");
//         return res.status(500).json({ err });
//       } else {
//         console.log("BusinessType get request call from DB Successfully");
  
//         return res.status(200).json({ doc });
//       }
//     });
//   };


exports.list = function (req, res) {
    try {
      const query = {};
      const page = +(req.query.page || 1);
      const limit = +(req.query.limit || 10);
      const options = {
        page: page,
        limit: limit,
      };
  
      ContentPage.paginate(query, options).then(function (result) {
        // console.log('result', result);
        res.json(result);
      });
    } catch (error) {
      res.status(404).json({ error: "Please try again" });
    }


  };

  exports.ContentById = function (req, res) { // get field by id
    let contentId = req.params.id;
    ContentPage.findById(contentId)
        .exec((err, data) => {
            if (err) {
                console.error(err);
                return res.status(404).json({error: "Invalid Field Id"});
            }
            res.status(200).json({data});
        });
}
    
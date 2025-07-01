const CheckDataForetag = require("../models/CheckDataForetag") 
bcrypt = require("bcryptjs");

exports.get = function(req, res){
  CheckDataForetag.find((err , response)=>{
      if(err){
        res.send(err)
        console.log("err---", err);
      }
      res.json(response);
  })
 }
exports.post = function (req, res) {
  console.log('req.body',req.body.foretagcheckbox)
  const checkDataForetag = new CheckDataForetag({
    foretag : req.body.foretagcheckbox
  })
  console.log("checkDataForetag---"  , checkDataForetag);
  checkDataForetag.save((err , response)=>{
    if (err) {
      console.log("err", err);
      return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
    }
    res.json(response);
  })
};
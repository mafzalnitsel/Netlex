const CheckDataPrivatePerson = require("../models/CheckDataPrivatePerson")
const Utils = require("../helper/util");
const formidable = require("formidable");
const mv = require("mv");
const path = require("path");
bcrypt = require("bcryptjs");

 exports.get = function(req, res){
  CheckDataPrivatePerson.find((err , response)=>{
      if(err){
        res.send(err)
        console.log("err---", err);
      }
      res.json(response)
  })
 }
exports.post = function (req, res) {
  console.log("Muzzamla-All Data----", req.body.privatecheckbox)
  const checkDataPrivatePerson = new CheckDataPrivatePerson({
    privateperson : req.body.privatecheckbox
  })
  // console.log("Muzzamal-----"  , checkDataPrivatePerson);
  checkDataPrivatePerson.save((err , response)=>{
    if (err) {
      console.log("err", err);
      return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
    }
    res.json(response);
  })
};
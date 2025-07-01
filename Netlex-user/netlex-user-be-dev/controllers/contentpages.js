const ContentPage = require("../models/contentpages");
const AboutUs = require("../models/about-us");
const res = require("express");

// Get all Data
exports.getActiveContentPage = function (req, res) {
  // console.log("req.headers",req.headers)
  // let device = "";
  // if (req.header("user-agent").indexOf("Mobile") != -1) {
  //   // console.log('You are using mobile device',req.header('user-agent').indexOf('Mobile') != -1);
  //   device = "mobile";
  // } else {
  //   // console.log('this is probably a computer',req.header('user-agent').indexOf('Mobile') != -1);
  //   device = "windows";
  // }
  
  // console.log("Your Device",req.header("user-agent").split("(")[1].split(" ")[0]);

  // let device = req.header("user-agent").split("(")[1].split(" ")[0];
  // console.log("device", device);

  // if (device == "iPhone;") {
  //   console.log("================iPhone");
  // }
  // else if (device == "Linux;") {
  //   console.log("================Android");
  // } else {
  //   console.log("================Windows");
  // }
  console.log("req.params.name", req.params.name);
  ContentPage.find({ name: req.params.name }).exec(function (err, doc) {
    if (err) {
      console.log("Error in finding ContentPage from DB");
      return res.status(500).json({ err });
    } else {
      console.log("ContentPage get request call from DB Successfully");

      return res.status(200).json({ doc });
    }
  });
};

exports.getNetlexOfficeTimings = function (req , res){
  ContentPage.find({name : "netlexOfficeTimings"},(err , response)=>{
    if(err){
      console.log("Error_contentpages_getAlTimw====>>>> ",err)
      res.send(err);
    }
    res.send(response);
  })
}


exports.getActiveAboutUs = function (req, res) {
  AboutUs.find().exec(function (err, doc) {
    if (err) {
      console.log("Error in finding AboutUs from DB");
      return res.status(500).json({ err });
    } else {
      console.log("AboutUs get request call from DB Successfully");

      return res.status(200).json({ doc });
    }
  });
};

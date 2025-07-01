      
const LawyerBusyTime = require("../models/lawyerBusyTime");
bcrypt = require("bcryptjs");



exports.getAllLawyerBusyTimes = function (req, res) {
    // console.log('req.query',req.query);
    let lawyerid = req.query.lawyerId;
    console.log("req.query----", req.query);

    LawyerBusyTime.find({ lawyerId :lawyerid},(err,response)=>{
        if(err){
            console.log("Error-LawyerBusyTime----", err);
            res.send(err)
        }
        console.log("response-----",response)
        res.send(response)
    })
  };

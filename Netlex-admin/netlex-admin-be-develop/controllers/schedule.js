// 1. Load the User model
const Schedule = require("../models/schedule");
const http = require("http");
const Utils = require("../helper/util");
const scheduleappService = require("../services/schedule-service");
const User = require("../models/user.js");
bcrypt = require("bcryptjs");
const environment = require('../env');
const fetch = require("../helper/fetch");


//save
exports.scheduleappSave  = function (req, res) {
  let {
    heading,
    dateOf,
    time,
    description,
    language,
    attachment,
    lawyer,
    status,
    lawyerId,
    statusConfirmTime,
    statusExpireTime,
  } = req.body.data;
  let schedule = new Schedule();
  schedule.heading = heading;
  schedule.dateOf = dateOf;
  schedule.time = time;
  schedule.description = description;
  schedule.language = language;
  schedule.lawyer = lawyer;
  schedule.lawyerId = lawyerId;
  schedule.status = status;
  schedule.attachment = attachment;
  schedule.statusConfirmTime = statusConfirmTime;
  schedule.statusExpireTime = statusExpireTime;
  // answer.scheduleType = scheduleType;

  schedule.save((err, savedUser) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
    }
    res.status(200).json(savedUser);
  });
};

exports.scheduleSave = function (req, res) {
  return scheduleappService.savescheduleapp(req, res);
};


exports.getScheduleList = function (req, res) {
  try {
    const query = {};
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const options = {
      page: page,
      limit: limit,
    };

    Schedule.paginate(query, options).then(function (result) {
      res.json(result);
    });
  } catch (error) {
    res.status(404).json({ error: "Please try again" });
  }
};

exports.getScheduleLawyerList = function (req, res) {
  // console.log('req.query',req.query)
  try {
    const query = {};
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const lawyerid = req.query.Lawyerid.replace(/\s/g, "");
    const Role = req.query.Role;
    const options = {
      page: page,
      limit: limit,
    };
    if (Role === "Advokat") {
      query.lawyerId = { $eq: lawyerid };
    } else if (Role === "Biträdande jurist") {
      query.lawyerId = { $eq: lawyerid };
    }

    Schedule.paginate(query, options).then(function (result) {
      res.json(result);
    });
  } catch (error) {
    res.status(404).json({ error: "Please try again" });
  }
};

// exports.Scheduleupdate = function (req, res) {
//     const _id = req.params.id;
//     // console.log('res',res)
//     // if (!req.body.data) {
//     //     res.status(404).json({error: "MissingParameter"});
//     //     return;
//     // }

//    // console.log(' console.log(req.body.data[0]);'+req.body.data[0]);

//     Schedule.findByIdAndUpdate(_id, req.body.data[0], { useFindAndModify: false }, function (err, result) {
//             console.log('req',req.body)
//         if (err) {
//             return res.status(404).json({ error: "Can't update the job. Please try again" });
//         }
//       else {
//        console.log('body'+req.body.data[0]);
// console.log('req.body.data[0].status'+req.body.data[0].status);
//        if(req.body.data[0].status=='Ännu att bekräftas' || req.body.data[0].status=='Bekräftad') {
//         console.log('_id'+_id);
//         Schedule.findById(_id)
//         .exec(function (err, doc) {
//             if (err || doc === null) {
//                 res.status(404).json({error: 'UserNotFound'});
//             } else {
//                 console.log('doc'+doc);

//                 let {heading,dateOf,time,description,lawyer,language,userName, userEmail} =doc;
//                 console.log('userName'+userName);
//                 var useryy ={
//                     firstName :userName ,
//                     lastName :userName,
//                     userName :userName,
//                     email :userEmail ,
//                     Link:req.params.id
//                 };

//                 let newPassword='';
//                 console.log('useryy'+useryy);
//                 Utils.sendmail(useryy, newPassword, 'MeetingConfirm');
//                 //res.json(doc);
//             }
//         });

//        }

//         }
//         res.status(200).json(result);

//     });

// };
exports.Scheduleupdate = function (req, res) {
  // console.log('req.body',req.body)

  const _id = req.params.id;
  // console.log('res',res)

  // console.log(' console.log(req.body.data[0]);'+req.body.data[0]);

  Schedule.findByIdAndUpdate(
    _id,
    req.body.data[0],
    { useFindAndModify: false },
    function (err, result) {
      // console.log('result1111111',result)

      if (err) {
        return res
          .status(404)
          .json({ error: "Can't update the Schedule. Please try again" });
      } else {
        console.log("bodyyyy" + req.body.data[0]);
        //    let abc = Object.entries(req.body.data[0])
        //    console.log('bodyyyy abc '+abc);
        //    abc.forEach(ele=>{
        //     console.log('ele',ele)
        //    })

        // console.log('req.body.data[0].status'+req.body.data[0].status);
        if (
          (req.body.data[0].status == "Ännu att bekräftas" ||
            req.body.data[0].status == "Bekräftad") &&
          req.body.data[0].focnonfoc == "NonFoc"
        ) {
          console.log("_id" + _id);
          // console.log('status@@@@@@',req.body.data[0].status)
          // console.log('focnonfoc@@@@@',req.body.data[0].focnonfoc)
          Schedule.findById(_id).exec(function (err, doc) {
            if (err || doc === null) {
              res.status(404).json({ error: "ScheduleNotFound" });
            } else {
            //   console.log("doc" + doc);

              let {
                heading,
                dateOf,
                time,
                description,
                lawyer,
                language,
                userName,
                userEmail,
              } = doc;
            //   console.log("userName" + userName);
              var useryy = {
                firstName: userName,
                lastName: userName,
                userName: userName,
                email: userEmail,
                Link: req.params.id,
              };

              let newPassword = "";
              console.log("useryy" + useryy);
              Utils.sendmail(useryy, newPassword, "MeetingConfirmNonFoc");
              // Utils.sendGoogleMail(useryy, newPassword, "MeetingConfirmNonFoc");

              //res.json(doc);
            }
          });
        }
        else if ((req.body.data[0].status == "Ännu att bekräftas" ||
        req.body.data[0].status == "Bekräftad") && req.body.data[0].focnonfoc == "Foc"
        || req.body.data[0].focnonfoc == null) {
          console.log("_id" + _id);
          // console.log('status@@@@@@',req.body.data[0].status)
          // console.log('focnonfoc@@@@@',req.body.data[0].focnonfoc)
          Schedule.findById(_id).exec(function (err, doc) {
            if (err || doc === null) {
              res.status(404).json({ error: "UserNotFound" });
            } else {
            //   console.log("doc" + doc);

              let {
                heading,
                dateOf,
                time,
                description,
                lawyer,
                language,
                userName,
                userEmail,
              } = doc;
            //   console.log("userName" + userName);
              var useryy = {
                firstName: userName,
                lastName: userName,
                userName: userName,
                email: userEmail,
                Link: req.params.id,
              };

              let newPassword = "";
              console.log("useryy" + useryy);
              Utils.sendmail(useryy, newPassword, "MeetingConfirmFoc");
              // Utils.sendGoogleMail(useryy, newPassword, "MeetingConfirmFoc");

              //res.json(doc);
            }
          });
        }
         else if (req.body.data[0].status == "Avbryt") {
          // console.log('status@@@@@@',req.body.data[0].status)
          // console.log('focnonfoc@@@@@',req.body.data[0].focnonfoc)
          Schedule.findById(_id).exec(function (err, doc) {
            if (err || doc === null) {
              res.status(404).json({ error: "UserNotFound" });
            } else {
              // console.log("docdoc" + doc);

              let {
                heading,
                dateOf,
                time,
                description,
                lawyer,
                language,
                userName,
                userEmail,
              } = doc;
            //   console.log("userName" + userName);
              var useryy = {
                firstName: userName,
                lastName: userName,
                userName: userName,
                email: userEmail,
              };

              let newPassword = "";
              console.log("useryy" + useryy);
              Utils.sendmail(useryy, newPassword, "MeetingCancel");
              // Utils.sendGoogleMail(useryy, newPassword, "MeetingCancel");
              
              //=====Google Calendar Update=====
              // let startTime = dateOf + "T" + time.split(" - ")[0];
              // let endTime = dateOf + "T" + time.split(" - ")[1];
              // let bodyForCalendar = {
              //   subject:  "Meet our Lawyer - " + lawyer,
              //   "start": { "dateTime": startTime, "timeZone": environment.GRAPH_TIME_ZONE },
              //   "end": { "dateTime": endTime, "timeZone": environment.GRAPH_TIME_ZONE }
              // }
              // const calendarEventGoogle = fetch.postApiGoogle(bodyForCalendar);
              // return calendarEventGoogle;

              //res.json(doc);
            }
          });
        }
      }
      
      res.status(200).json(result);
    }
  );
};
exports.FOCScheduleupdate = function (req, res) {
  console.log('req.body',req.body)

  const _id = req.params.id;
  // console.log('res',res)

  // console.log(' console.log(req.body.data[0]);'+req.body.data[0]);

  Schedule.findByIdAndUpdate(
    _id,
    req.body.data[0],
    { useFindAndModify: false },
    function (err, result) {
      // console.log('result1111111',result)

      if (err) {
        return res
          .status(404)
          .json({ error: "Can't update the Schedule. Please try again" });
      } else {
        console.log("bodyyyy" + req.body.data[0]);
        //    let abc = Object.entries(req.body.data[0])
        //    console.log('bodyyyy abc '+abc);
        //    abc.forEach(ele=>{
        //     console.log('ele',ele)
        //    })

        // console.log('req.body.data[0].status'+req.body.data[0].status);
        if ((req.body.data[0].status == "Ännu att bekräftas" ||
        req.body.data[0].status == "Bekräftad") && req.body.data[0].focnonfoc == "Foc"
        || req.body.data[0].focnonfoc == null) {
          console.log("_id" + _id);
          // console.log('status@@@@@@',req.body.data[0].status)
          // console.log('focnonfoc@@@@@',req.body.data[0].focnonfoc)
          Schedule.findById(_id).exec(function (err, doc) {
            if (err || doc === null) {
              res.status(404).json({ error: "UserNotFound" });
            } else {
            //   console.log("doc" + doc);

              let {
                heading,
                dateOf,
                time,
                description,
                lawyer,
                language,
                userName,
                userEmail,
              } = doc;
            //   console.log("userName" + userName);
              var useryy = {
                firstName: userName,
                lastName: userName,
                userName: userName,
                email: userEmail,
                Link: req.params.id,
              };

              let newPassword = "";
              console.log("useryy" + useryy);
              Utils.sendmail(useryy, newPassword, "MeetingConfirmFoc");
              // Utils.sendGoogleMail(useryy, newPassword, "MeetingConfirmFoc");

              //res.json(doc);
            }
          });
        }
         else if (req.body.data[0].status == "Avbryt") {
          // console.log('status@@@@@@',req.body.data[0].status)
          // console.log('focnonfoc@@@@@',req.body.data[0].focnonfoc)
          Schedule.findById(_id).exec(function (err, doc) {
            if (err || doc === null) {
              res.status(404).json({ error: "UserNotFound" });
            } else {
              // console.log("docdoc" + doc);

              let {
                heading,
                dateOf,
                time,
                description,
                lawyer,
                language,
                userName,
                userEmail,
              } = doc;
            //   console.log("userName" + userName);
              var useryy = {
                firstName: userName,
                lastName: userName,
                userName: userName,
                email: userEmail,
              };

              let newPassword = "";
              console.log("useryy" + useryy);
              Utils.sendmail(useryy, newPassword, "MeetingCancel");
              // Utils.sendGoogleMail(useryy, newPassword, "MeetingCancel");
              
              //=====Google Calendar Update=====
              // let startTime = dateOf + "T" + time.split(" - ")[0];
              // let endTime = dateOf + "T" + time.split(" - ")[1];
              // let bodyForCalendar = {
              //   subject:  "Meet our Lawyer - " + lawyer,
              //   "start": { "dateTime": startTime, "timeZone": environment.GRAPH_TIME_ZONE },
              //   "end": { "dateTime": endTime, "timeZone": environment.GRAPH_TIME_ZONE }
              // }
              // const calendarEventGoogle = fetch.postApiGoogle(bodyForCalendar);
              // return calendarEventGoogle;

              //res.json(doc);
            }
          });
        }
      }
      
      res.status(200).json(result);
    }
  );
};
exports.show = function (req, res) {
  Schedule.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "UserNotFound" });
    } else {
      res.json(doc);
    }
  });
};
exports.getSchedule = function (req, res) {
  Schedule.find().exec(function (err, doc) {
    if (err) {
      console.log("Error in finding Schedule from DB");
      return res.status(500).json({ err });
    } else {
      return res.status(200).json({ doc });
    }
  });
};

const Lawyer = require("../models/lawyer.js");
const auth = require("../controllers/auth");
const fetch = require("../helper/fetch");
const environment = require("../env");
const EmailConfiguration = require("../models/emailConfiguration");
const Schedule = require("../models/schedule");
const LawyerBusyTime = require("../models/lawyerBusyTime");

exports.getActiveLawyers = getActiveLawyers;

async function getActiveLawyers() {
  const lawyers = await Lawyer.find({ status: "Aktiv" }).sort([
    ["firstName", 1],
    ["lastName", 1],
  ]);
  if (lawyers) {
    return lawyers;
  } else {
    return [];
  }
}
//  //Commented (23-09-2022)
// exports.getLawyersWithAvailabilityOldOne = async (req, res) => {
//   const { selectedDate } = req.query;
//   // if(!selectedDate) {
//   //     return res.status(200).json({status: "Error", msg: "Bad Request"});
//   // }
//   const lawyerList = await Lawyer.find({ status: "Aktiv" });
//   console.log("lawyerList", lawyerList);
//   let lawyerEmailList = [];
//   lawyerList.forEach((lawyer) => {
//     lawyerEmailList.push(lawyer.email);
//   });
//   //Fetch EmailConfiguration
//   let emailConfiguration = await EmailConfiguration.find({
//     name: "emailConfiguration",
//   });
// //   console.log("EmailConfiguration", emailConfiguration[0]);

//   const startDateTime = selectedDate + "T08:30:01"; //Fetching schedule for the whole day (working hours)
//   const endDateTime = selectedDate + "T18:30:00";
//   const authResponse = await auth.getToken();
//   const body = {
//       innerBody:{
//         schedules: lawyerEmailList,
//         startTime: {
//           dateTime: startDateTime,
//           timeZone: environment.GRAPH_TIME_ZONE,
//         },
//         endTime: {
//           dateTime: endDateTime,
//           timeZone: environment.GRAPH_TIME_ZONE,
//         },
//         availabilityViewInterval: 30,
//       }
//   };
//   // const schedule = await fetch.postApi(environment.OAUTH_GRAPH_ENDPOINT + 'v1.0/me/calendar/getSchedule',
//   //     authResponse.accessToken, body);

//   const schedule = await fetch.postApi(
//     environment.OAUTH_GRAPH_ENDPOINT +
//       environment.GRAPH_SCHEDULE_URI +
//       emailConfiguration[0].user_id +
//       "/calendar/getSchedule",
//     authResponse.accessToken,
//     body
//   );
//   //   console.log("schedule", schedule);

//   const scheduleFullList = schedule.value;
//   // console.log('schedule.value',schedule.value);
//   let scheduleMap = [];
//   scheduleFullList.forEach((schedule) => {
//     scheduleMap[schedule.scheduleId] = schedule.scheduleItems;
//   });

//   let lawyersList = await getActiveLawyers();
//   let lawyerListWithSchedule = [];
//   lawyersList.forEach((lawyer) => {
//     let scheduleList = [];
//     scheduleMap[lawyer.email].forEach((scheduleItem) => {
//       scheduleList.push({ start: scheduleItem.start, end: scheduleItem.end });
//     });
//     lawyerListWithSchedule.push({
//       lawyer: {
//         firstName: lawyer.firstName,
//         lastName: lawyer.lastName,
//         _id: lawyer._id,
//         totalMeetingAssigned: lawyer.totalMeetingAssigned,
//       },
//       schedule: scheduleList,
//     });
//   });
//   return res.json({ lawyerListWithSchedule });
// };

// exports.getLawyersWithAvailability = async(req, res) => {
//     const {selectedDate} = req.query;
//     if(!selectedDate) {
//         return res.status(200).json({status: "Error", msg: "Bad Request"});
//     }
//     const lawyerList = await Lawyer.find({status: 'Aktiv'});
//     console.log('lawyerList',lawyerList)
//     let lawyerEmailList = [];
//     lawyerList.forEach(lawyer => {
//         lawyerEmailList.push(lawyer.email);
//     })
//     const startDateTime = selectedDate + "T08:30:01"; //Fetching schedule for the whole day (working hours)
//     const endDateTime = selectedDate + "T18:30:00"
//     const authResponse = await auth.getToken();
//     const body = {
//         "schedules": lawyerEmailList,
//         "startTime": {
//             "dateTime": startDateTime,
//             "timeZone": environment.GRAPH_TIME_ZONE
//         },
//         "endTime": {
//             "dateTime": endDateTime,
//             "timeZone": environment.GRAPH_TIME_ZONE
//         },
//         "availabilityViewInterval": 30
//     }
//     // const schedule = await fetch.postApi(environment.OAUTH_GRAPH_ENDPOINT + 'v1.0/me/calendar/getSchedule',
//     //     authResponse.accessToken, body);

//     const schedule = await fetch.postApi(environment.OAUTH_GRAPH_ENDPOINT + environment.GRAPH_SCHEDULE_URI,
//         authResponse.accessToken, body);

//     const scheduleFullList = schedule.value;
//     let scheduleMap = {};
//     scheduleFullList.forEach(schedule => {
//         scheduleMap[schedule.scheduleId] = schedule.scheduleItems;
//     });

//     let lawyersList = await getActiveLawyers();
//     let lawyerListWithSchedule = [];
//     lawyersList.forEach(lawyer => {
//         let scheduleList = [];
//         scheduleMap[lawyer.email].forEach(scheduleItem => {
//             scheduleList.push({"start": scheduleItem.start, "end": scheduleItem.end});
//         })
//         lawyerListWithSchedule.push({"lawyer": {"firstName": lawyer.firstName, "lastName": lawyer.lastName,
//             "_id": lawyer._id, "totalMeetingAssigned": lawyer.totalMeetingAssigned},
//             "schedule": scheduleList
//         });
//     });
//     return res.json({lawyerListWithSchedule});
// }

//Not working start this func on your on risk
exports.getLawyersWithAvailabilityold = async (req, res) => {
  const { selectedDate } = req.query;
  // if(!selectedDate) {
  //     return res.status(200).json({status: "Error", msg: "Bad Request"});
  // }

  //Get Email Configuration
  let emailConfiguration = await EmailConfiguration.find({
    name: "emailConfiguration",
  });
  // console.log("EmailConfiguration", emailConfiguration[0]);

  const lawyerList = await Lawyer.find({ status: "Aktiv" });
  // console.log("lawyerList", lawyerList);
  let lawyerEmailList = [];
  lawyerList.forEach((lawyer) => {
    lawyerEmailList.push(lawyer.email);
  });
  const startDateTime = selectedDate + "T08:30:01"; //Fetching schedule for the whole day (working hours)
  const endDateTime = selectedDate + "T18:30:00";
  const authResponse = await auth.getToken();
  //old body
  // const body = {
  //   schedules: lawyerEmailList,
  //   startTime: {
  //     dateTime: startDateTime,
  //     timeZone: environment.GRAPH_TIME_ZONE,
  //   },
  //   endTime: {
  //     dateTime: endDateTime,
  //     timeZone: environment.GRAPH_TIME_ZONE,
  //   },
  //   availabilityViewInterval: 30,
  // };
  //new Body
  const body = {
    innerBody: {
      schedules: lawyerEmailList,
      startTime: {
        dateTime: startDateTime,
        timeZone: environment.GRAPH_TIME_ZONE,
      },
      endTime: {
        dateTime: endDateTime,
        timeZone: environment.GRAPH_TIME_ZONE,
      },
      availabilityViewInterval: 30,
    },
  };
  // const schedule = await fetch.postApi(environment.OAUTH_GRAPH_ENDPOINT + 'v1.0/me/calendar/getSchedule',
  //     authResponse.accessToken, body);

  //old configuration
  // const schedule = await fetch.postApi(
  //   environment.OAUTH_GRAPH_ENDPOINT + environment.GRAPH_SCHEDULE_URI,
  //   authResponse.accessToken,
  //   body
  // );

  const schedule = await fetch.postApi(
    environment.OAUTH_GRAPH_ENDPOINT +
      environment.GRAPH_SCHEDULE_URI +
      emailConfiguration[0].user_id +
      "/calendar/getSchedule",
    authResponse.accessToken,
    body
  );
  const scheduleFullList = schedule.value;
  // console.log('schedule.value',schedule.value);
  let scheduleMap = [];
  scheduleFullList.forEach((schedule) => {
    scheduleMap[schedule.scheduleId] = schedule.scheduleItems;
  });

  let lawyersList = await getActiveLawyers();
  let lawyerListWithSchedule = [];
  lawyersList.forEach((lawyer) => {
    let scheduleList = [];
    scheduleMap[lawyer.email].forEach((scheduleItem) => {
      scheduleList.push({ start: scheduleItem.start, end: scheduleItem.end });
    });
    lawyerListWithSchedule.push({
      lawyer: {
        firstName: lawyer.firstName,
        lastName: lawyer.lastName,
        _id: lawyer._id,
        totalMeetingAssigned: lawyer.totalMeetingAssigned,
      },
      schedule: scheduleList,
    });
  });
  return res.json({ lawyerListWithSchedule });
};

//Working Function with new Configuration
exports.getLawyersWithAvailability = async (req, res) => {
  const { selectedDate, lawyerId } = req.query;

  // if(!selectedDate) {
  //     return res.status(200).json({status: "Error", msg: "Bad Request"});
  // }

  timesOptions = [
    { value: "00:00:00 - 00:30:00", checked: false },
    { value: "00:30:00 - 01:00:00", checked: false },
    { value: "01:00:00 - 01:30:00", checked: false },
    { value: "01:30:00 - 02:00:00", checked: false },
    { value: "02:00:00 - 02:30:00", checked: false },
    { value: "02:30:00 - 03:00:00", checked: false },
    { value: "03:00:00 - 03:30:00", checked: false },
    { value: "03:30:00 - 04:00:00", checked: false },
    { value: "04:00:00 - 04:30:00", checked: false },
    { value: "04:30:00 - 05:00:00", checked: false },
    { value: "05:00:00 - 05:30:00", checked: false },
    { value: "05:30:00 - 06:30:00", checked: false },
    { value: "06:30:00 - 07:00:00", checked: false },
    { value: "07:00:00 - 07:30:00", checked: false },
    { value: "07:30:00 - 08:00:00", checked: false },
    { value: "08:00:00 - 08:30:00", checked: false },
    { value: "08:30:00 - 09:00:00", checked: false },
    { value: "09:00:00 - 09:30:00", checked: false },
    { value: "09:30:00 - 10:00:00", checked: false },
    { value: "10:00:00 - 10:30:00", checked: false },
    { value: "10:30:00 - 11:00:00", checked: false },
    { value: "11:00:00 - 11:30:00", checked: false },
    { value: "11:30:00 - 12:00:00", checked: false },
    { value: "12:00:00 - 12:30:00", checked: false },
    { value: "12:30:00 - 13:00:00", checked: false },
    { value: "13:00:00 - 13:30:00", checked: false },
    { value: "13:30:00 - 14:00:00", checked: false },
    { value: "14:00:00 - 14:30:00", checked: false },
    { value: "14:30:00 - 15:00:00", checked: false },
    { value: "15:00:00 - 15:30:00", checked: false },
    { value: "15:30:00 - 16:00:00", checked: false },
    { value: "16:00:00 - 16:30:00", checked: false },
    { value: "16:30:00 - 17:00:00", checked: false },
    { value: "17:00:00 - 17:30:00", checked: false },
    { value: "17:30:00 - 18:00:00", checked: false },
    { value: "18:00:00 - 18:30:00", checked: false },
    { value: "18:30:00 - 19:00:00", checked: false },

    { value: "19:30:00 - 20:00:00", checked: false },
    { value: "20:00:00 - 20:30:00", checked: false },
    { value: "20:30:00 - 21:00:00", checked: false },
    { value: "21:00:00 - 21:30:00", checked: false },
    { value: "21:30:00 - 22:00:00", checked: false },
    { value: "22:00:00 - 22:30:00", checked: false },
    { value: "22:30:00 - 23:00:00", checked: false },
    { value: "23:00:00 - 23:30:00", checked: false },
    { value: "23:30:00 - 24:00:00", checked: false },
  ];
  //Get Email Configuration
  let emailConfiguration = await EmailConfiguration.find({
    name: "emailConfiguration",
  });
  // console.log("EmailConfiguration", emailConfiguration[0]);
  // const lawyer = await Lawyer.findById('62fcf5a4419a5e3cec802c03');
  const lawyer = await Lawyer.findById(lawyerId);
  let lawyerEmail = "";
  // console.log('lawyer', lawyer);
  if (!lawyer) {
    console.log("lawyer not found", lawyer);
    res.status(500).json({ status: "Error", msg: "LawyerNotFound" });
  }
  if (lawyer) {
    lawyerEmail = lawyer.email;
    console.log("lawyer exist", lawyerEmail);
  }
  const scheduleList = await Schedule.find({ dateOf: selectedDate, lawyerId });
  // console.log('scheduleList',scheduleList);

  //Filtering from all schedules database
  // let filteredTimesOptions = [];
  if (scheduleList && scheduleList?.length > 0) {
    // console.log("scheduleList", scheduleList);
    //Loop of founded meetings with this lawyer on selected date
    for (let i = 0; i < scheduleList.length; i++) {
      //Remove time which is not available
      timesOptions = timesOptions.filter((element) => {
        return element.value !== scheduleList[i].time;
      });
    }
    // return timesOptions;
  }
  //Filtering from lawyer busy time database
  let lawyerBusyTimeExist = await LawyerBusyTime.find({
    lawyerId,
    date: selectedDate,
  });
  // console.log('lawyerBusyTimeExist', lawyerBusyTimeExist);
  if (lawyerBusyTimeExist.length > 0) {
    let allTimes = lawyerBusyTimeExist[0].times;
    //Loop of founded lawyer busy time with this lawyer on selected date
    for (let i = 0; i < allTimes.length; i++) {
      //Remove time which is not available
      timesOptions = timesOptions.filter((element) => {
        return element.value !== allTimes[i];
      });
    }
    // return timesOptions;
  }
  console.log("timesOptions 12121212", timesOptions);
  const startDateTime = selectedDate + "T08:30:01"; //Fetching schedule for the whole day (working hours)
  const endDateTime = selectedDate + "T18:30:00";
  const authResponse = await auth.getToken();
  //   const body = {
  //     "schedules": lawyerEmailList,
  //     "startTime": {
  //         "dateTime": startDateTime,
  //         "timeZone":  environment.GRAPH_TIME_ZONE
  //     },
  //     "endTime": {
  //         "dateTime": endDateTime,
  //         "timeZone": environment.GRAPH_TIME_ZONE
  //     },
  //     "availabilityViewInterval": 30
  // }
  // console.log('lawyerEmailList',lawyerEmailList);
  console.log({ lawyerEmail });

  const body = {
    innerBody: {
      // schedules: lawyerEmailList,
      // schedules: ["prince@mirlex.se"],
      schedules: [lawyerEmail],
      // schedules: ["nadeem.mansha@aiotpl.com"],
      startTime: {
        dateTime: startDateTime,
        timeZone: environment.GRAPH_TIME_ZONE,
      },
      endTime: {
        dateTime: endDateTime,
        timeZone: environment.GRAPH_TIME_ZONE,
      },
      availabilityViewInterval: 30,
    },
  };
  // const schedule = await fetch.postApi(environment.OAUTH_GRAPH_ENDPOINT + 'v1.0/me/calendar/getSchedule',
  //     authResponse.accessToken, body);

  const schedule = await fetch.postApi(
    environment.OAUTH_GRAPH_ENDPOINT +
      environment.GRAPH_SCHEDULE_URI +
      emailConfiguration[0].user_id +
      "/calendar/getSchedule",
    authResponse.accessToken,
    body
  );
  const scheduleFullList = schedule.value;
  // console.log("schedule.value", schedule.value);
  // console.log("scheduleFullList", scheduleFullList);
  let allScheduledMeetings = [];
  // scheduleFullList.forEach((schedule, index) => {
  //   // if (schedule.scheduleItems != undefined) {
  //   if (schedule.scheduleItems != undefined && schedule.scheduleItems.length > 0) {
  //     // console.log('schedule', schedule);
  //     // scheduleMap[schedule.scheduleId] = schedule.scheduleItems;
  //     // console.log("allScheduledMeetings" + allScheduledMeetings);
  //     schedule.scheduleItems.forEach((scheduleItem) => {
  //       // console.log('scheduleItem', scheduleItem);
  //       allScheduledMeetings.push(scheduleItem)
  //     })
  //   } else {
  //     console.log("ak" + "ak");
  //   }
  //   if (index === (scheduleFullList.length - 1)) {
  //     console.log("allScheduledMeetings" + JSON.stringify(allScheduledMeetings));
  //     allScheduledMeetings.forEach((elem, i) => {
  //       // console.log('elem', elem);
  //       console.log('startDateTime', elem.start.dateTime.split("T")[1].split(".")[0]);
  //       console.log('endDateTime', elem.end.dateTime.split("T")[1].split(".")[0]);

  //       // timesOptions = timesOptions.filter((e) => {
  //       //   return e.value !== scheduleList[i].time;
  //       // });
  //       // console.log("timesOptions", timesOptions);

  //     })
  //     return allScheduledMeetings;
  //   }
  // });
  if (scheduleFullList && scheduleFullList?.length > 0) {
    let scheduleFullListNew = scheduleFullList[0].scheduleItems;
    // console.log('scheduleFullListNew',scheduleFullListNew);
    if (scheduleFullListNew.length > 0) {
      // console.log('scheduleFullListNew',scheduleFullListNew);
      scheduleFullListNew.forEach((scheduleItem, index) => {
        // console.log('scheduleItem', scheduleItem);
        // allScheduledMeetings.push(scheduleItem);
        if (
          scheduleItem.status == "tentative" ||
          scheduleItem.status == "busy"
        ) {
          allScheduledMeetings.push(scheduleItem);
        }
        if (index === scheduleFullListNew.length - 1) {
          allScheduledMeetings.forEach((element, i) => {
            // console.log('element', element);
            // console.log('startDateTime', element.start.dateTime.split("T")[1].split(".")[0]);
            // console.log('endDateTime', element.end.dateTime.split("T")[1].split(".")[0]);
            let startTime = element.start.dateTime.split("T")[1].split(".")[0];
            let endTime = element.end.dateTime.split("T")[1].split(".")[0];

            //Get Time Difference
            d1 = new Date(Date.parse(element.start.dateTime));
            d2 = new Date(Date.parse(element.end.dateTime));
            var getDuration = function (d1, d2) {
              d3 = new Date(d2 - d1);
              d0 = new Date(0);
              return {
                getHours: function () {
                  return d3.getHours() - d0.getHours();
                },
                getMinutes: function () {
                  return d3.getMinutes() - d0.getMinutes();
                },
                getMilliseconds: function () {
                  return d3.getMilliseconds() - d0.getMilliseconds();
                },
                toString: function () {
                  return (
                    this.getHours() +
                    ":" +
                    this.getMinutes() +
                    ":" +
                    this.getMilliseconds()
                  );
                },
              };
            };
            diff = getDuration(d1, d2);
            console.log("diff.toString()", diff.toString());
            // //------Removing time for 1hour meeting------
            // if (diff.toString() == '1:0:0') {
            //   console.log('1 hour meeting');
            //   timesOptions.forEach((item, ii) => {
            //     let split1 = item.value.split(' - ')[0];
            //     if (split1 == startTime) {
            //       // console.log('ii', ii);
            //       timesOptions.splice(ii, 2)
            //     }
            //   })
            // }
            // //------Removing time for 1.5hour meeting-----
            // if (diff.toString() == '1:30:0') {
            //   console.log('1.5 hour meeting');
            //   timesOptions.forEach((item, ii) => {
            //     let split1 = item.value.split(' - ')[0];
            //     if (split1 == startTime) {
            //       // console.log('ii', ii);
            //       timesOptions.splice(ii, 3)
            //     }
            //   })
            // }
            if (diff.toString() !== "0:0:0") {
              //---------- Busy more than half hour --------
              if (diff.toString() !== "0:30:0") {
                console.log("Meeting time greater than 30Mins");
                // console.log('diff.getHours()',diff.getHours());
                // console.log('diff.getMinutes()',diff.getMinutes());
                let removeIndexes = diff.getHours() * 2;
                if (diff.getMinutes() == 30) {
                  removeIndexes = removeIndexes + 1;
                }
                console.log("removeIndexes", removeIndexes);
                timesOptions.forEach((item, ii) => {
                  let split1 = item.value.split(" - ")[0];
                  if (split1 == startTime) {
                    // console.log('ii', ii);
                    timesOptions.splice(ii, removeIndexes);
                  }
                });
              }
              //---------- Busy Half Hour  --------
              else {
                //--------Create meeting time needed format-------
                let meetingTime = startTime + " - " + endTime;
                // console.log('startTime', startTime);
                // console.log('endTime', endTime);
                console.log("meetingTime", meetingTime);
                //------Remove time which is not available-----
                timesOptions = timesOptions.filter((element) => {
                  return element.value !== meetingTime;
                });
              }
            }
            //---------- Busy Full Day --------
            else {
              timesOptions = [];
            }

            // }
            if (i === allScheduledMeetings.length - 1) {
              // console.log('timesOptions', timesOptions);
              res.send(timesOptions);
            }
          });
          // return allScheduledMeetings;
        }
      });
    } else {
      res.send(timesOptions);
    }
  } else {
    res.send(timesOptions);
  }

  // console.log("scheduleMap" + scheduleMap);
  // let lawyersList = await getActiveLawyers();
  // let lawyerListWithSchedule = [];
  // lawyersList.forEach((lawyer) => {
  //   let scheduleList = [];
  //   if (scheduleMap[lawyer.email] != undefined) {
  //     scheduleMap[lawyer.email].forEach((scheduleItem) => {
  //       scheduleList.push({ start: scheduleItem.start, end: scheduleItem.end });
  //     });
  //     lawyerListWithSchedule.push({
  //       lawyer: {
  //         firstName: lawyer.firstName,
  //         lastName: lawyer.lastName,
  //         _id: lawyer._id,
  //         totalMeetingAssigned: lawyer.totalMeetingAssigned,
  //       },
  //       schedule: scheduleList,
  //     });
  //   }
  // });
  // console.log('lawyerListWithSchedule',lawyerListWithSchedule);

  // return res.json({ lawyerListWithSchedule });
};

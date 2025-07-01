//const Lawyer = require('../models/lawyer.js');
const auth = require("../controllers/auth");
const fetch = require("../helper/fetch");
const environment = require("../env");
const EmailConfiguration = require("../models/emailConfiguration");

exports.getLawyersEmailWithAvailability = async (req, res) => {
  console.log("reached");
  //Get Email Configuration
  let emailConfiguration = await EmailConfiguration.find({
    name: "emailConfiguration",
  });
  //   console.log("EmailConfiguration", emailConfiguration[0]);
  const { email } = req.query;
  let lawyerEmailList = [];

  lawyerEmailList.push(email);

  const d_t = new Date();
  let year = d_t.getFullYear();
  // let month = d_t.getMonth(); //Commented on 10-01-2023
  let month = d_t.getMonth() + 1;
  let day = d_t.getDate();

  // const selectedDateconst = year + "-0" + month + "-" + day; //Commented on December 2022
  const selectedDateconst = year + "-" + month + "-" + day;
  //console.log('selectedDate'+selectedDate)
  const startDateTime = selectedDateconst + "T08:30:01"; //Fetching schedule for the whole day (working hours)
  const endDateTime = selectedDateconst + "T18:30:00";
  const authResponse = await auth.getToken();
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
  //   const schedule = await fetch.postApi(
  //     environment.OAUTH_GRAPH_ENDPOINT + environment.GRAPH_SCHEDULE_URI,
  //     authResponse.accessToken,
  //     body
  //   );
  const schedule = await fetch.postApi(
    environment.OAUTH_GRAPH_ENDPOINT +
      environment.GRAPH_SCHEDULE_URI +
      emailConfiguration[0].user_id +
      "/calendar/getSchedule",
    authResponse.accessToken,
    // "",
    body
  );

  // console.log("schedule", schedule);

  const scheduleFullList = schedule.value;
  console.log("schedule.value", schedule.value);
  console.log("email", email);
  let scheduleMap = [];
  var statusus = "";
  scheduleFullList?.forEach((schedule) => {
    console.log(" schedule.scheduleItems" + schedule.scheduleItems);
    if (schedule.scheduleItems == undefined) {
      scheduleMap.push("Error"); //statusus='Error';
    } else {
      scheduleMap.push("NoError");
    }
  });
  console.log("scheduleMap", scheduleMap);

  return res.json({ scheduleMap });
};

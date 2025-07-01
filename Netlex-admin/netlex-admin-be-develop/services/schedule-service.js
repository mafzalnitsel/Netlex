const Lawyer = require("../models/lawyer.js");
const auth = require("../controllers/auth");
const fetch = require("../helper/fetch");
const environment = require("../env");
const Scheduleapp = require("../models/schedule");
const uuid = require("uuid");
const EmailConfiguration = require("../models/emailConfiguration");

//const utilService = require('./util-service');

exports.savescheduleapp = async (req, res) => {
  // let {heading, dateOf, time, description, language, lawyerId, lawyer,
  // userName, userEmail, userSSN, userPhoneNo, status} = req.body;
  // console.log('req.body.data',req.body.data)
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
    focnonfoc,
    businessTypeId,
  } = req.body.data;
  let scheduleapp = new Scheduleapp();
  scheduleapp.heading = heading;
  scheduleapp.dateOf = dateOf;
  scheduleapp.time = time;
  scheduleapp.description = description;
  scheduleapp.lawyer = lawyer;
  scheduleapp.language = language;
  // scheduleapp.userName = userName;
  // scheduleapp.userEmail = userEmail;
  // scheduleapp.userSSN = userSSN;
  // scheduleapp.userPhoneNo = userPhoneNo;
  scheduleapp.status = status;
  scheduleapp.lawyerId = lawyerId;
  scheduleapp.statusConfirmTime = statusConfirmTime;
  scheduleapp.statusExpireTime = statusExpireTime;
  scheduleapp.Ispaid = "NO";
  scheduleapp.focnonfoc = focnonfoc;
  scheduleapp.businessTypeId = businessTypeId;

  // scheduleapp.attachment = attachment;
  //  let attachment = req.files && req.files.attachment ? req.files.attachment[0]: null;

  await scheduleapp.save(async (err, savedscheduleapp) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
    }

    const authResponse = await auth.getToken();

    //Generate Event on calendar
    const lawyer = await Lawyer.findById(lawyerId);
    console.log("lawyer" + lawyer);
    // const meetingDetails = {"title": heading, "meetingDesc": description, "language": language, "attachment": ''}
    const calendarEvent = await generateCalendarEvent(
      dateOf,
      time,
      authResponse,
      lawyer,
      //,
      // {"firstName": userName, "lastName": "", "userEmail": userEmail, "userPhoneNo": userPhoneNo, "userSSN": userSSN}
      ""
    );
    
    //Google Calendar
    // const calendarEventGoogle = await generateGoogleCalendarEvent(dateOf, time, authResponse, lawyer
    //    ,
    //     '');

    console.log(calendarEvent);
    // if (calendarEvent || calendarEventGoogle) {

    // send email to lawyer & user
    // const sendEmailResp = await sendEmail(dateOf, time,authResponse, calendarEvent["onlineMeetingUrl"], lawyer,
    //  {"firstName": userName, "lastName": "", "userEmail": userEmail, "userPhoneNo": userPhoneNo, "userSSN": userSSN},
    // meetingDetails);
    // await Lawyer.updateOne({_id: lawyer._id}, {totalMeetingAssigned: lawyer.totalMeetingAssigned + 1});

    //     res.status(200).json(savedscheduleapp);
    // } else {
    //     res.status(404).json("error");
    // }
  });
};

async function generateCalendarEvent(
  selectedDate,
  selectedTime,
  authResponse,
  lawyer,
  meetingDetails
) {
  if (!selectedDate || !selectedTime) {
    return "";
  }
    //Fetch EmailConfiguration
    let emailConfiguration = await EmailConfiguration.find({
      name: "emailConfiguration",
  });
  // console.log("EmailConfiguration", emailConfiguration[0]);
  const startDateTime = selectedDate + "T" + selectedTime.split(" - ")[0];
  const endDateTime = selectedDate + "T" + selectedTime.split(" - ")[1];
  console.log("startDateTime" + startDateTime);
  console.log("endDateTime" + endDateTime);
  const body = {
    subject: "Busy time Lawyer - " + lawyer.firstName + " " + lawyer.lastName,
    //  "body": getEmailContent(selectedDate, selectedTime, '', lawyer, user, meetingDetails),
    start: {
      dateTime: startDateTime,
      timeZone: environment.GRAPH_TIME_ZONE,
    },
    end: {
      dateTime: endDateTime,
      timeZone: environment.GRAPH_TIME_ZONE,
    },
    location: {
      displayName: "Not available for Meeting",
    },
    attendees: [
      {
        emailAddress: {
          address: lawyer.email,
          name: lawyer.firstName + " " + lawyer.lastName,
        },
        type: "required",
      }, //,
      // {
      //     "emailAddress": {
      //         "address": user.userEmail,
      //         "name": user.firstName + " " + user.lastName
      //     },
      //     "type": "required"
      // }
    ],
    allowNewTimeProposals: "true",
    transactionId: uuid.v4(),
    isOnlineMeeting: false,
    onlineMeetingProvider: "teamsForBusiness",
  };

  const calendarEvent = await fetch.postApi(
    environment.OAUTH_GRAPH_ENDPOINT +
    //  environment.GRAPH_EVENT_URI,
    environment.GRAPH_EVENT_URI+
    emailConfiguration[0].user_id +
    "/calendar/events",
    authResponse.accessToken,
    body
  );
  return calendarEvent;
}

async function generateGoogleCalendarEvent(
  selectedDate,
  selectedTime,
  authResponse,
  lawyer,
  user,
  meetingDetails
) {
  if (!selectedDate || !selectedTime) {
    return "";
  }
  const startDateTime = selectedDate + "T" + selectedTime.split(" - ")[0];
  const endDateTime = selectedDate + "T" + selectedTime.split(" - ")[1];
  const body = {
    subject: "Meet our Lawyer - " + lawyer.firstName + " " + lawyer.lastName,
    // "body": getEmailContent(selectedDate, selectedTime, '', lawyer, user, meetingDetails),
    start: {
      dateTime: startDateTime,
      timeZone: environment.GRAPH_TIME_ZONE,
    },
    end: {
      dateTime: endDateTime,
      timeZone: environment.GRAPH_TIME_ZONE,
    },
    //     "location": {
    //     "displayName": "Teams Meeting"
    // },
    // "attendees": [
    //     {
    //         "emailAddress": {
    //             "address": lawyer.email,
    //             "name": lawyer.firstName + " " + lawyer.lastName
    //         },
    //         "type": "required"
    //     },
    //     {
    //         "emailAddress": {
    //             "address": user.userEmail,
    //             "name": user.firstName + " " + user.lastName
    //         },
    //         "type": "required"
    //     }
    // ],
    // "allowNewTimeProposals": "true",
    // "transactionId": uuid.v4(),
    // "isOnlineMeeting": true,
    // "onlineMeetingProvider": "teamsForBusiness"
  };

  const calendarEventGoogle = await fetch.postApiGoogle(body);
  return calendarEventGoogle;
}

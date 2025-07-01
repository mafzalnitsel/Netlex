const Lawyer = require("../models/lawyer.js");
const auth = require("../controllers/auth");
const fetch = require("../helper/fetch");
const environment = require("../env");
const Schedule = require("../models/schedule");
const uuid = require("uuid");
const utilService = require("./util-service");
const EmailConfiguration = require("../models/emailConfiguration");

exports.saveSchedule = async (req, res) => {
  console.log("req.boddddddddy", req.body);
  let {
    heading,
    dateOf,
    time,
    description,
    language,
    lawyerId,
    lawyer,
    userName,
    userEmail,
    userSSN,
    userPhoneNo,
    status,
    Ispaid,
    focnonfoc,
    reasonOfFoc,
    statusExpireTime,
    counterpartyName,
    counterpartySSN,
  } = req.body;
  const lawyerData = await Lawyer.findById(lawyerId);
  // console.log("lawyerData",lawyerData)
  console.log("lawyerData.email", lawyerData.email);
  let schedule = new Schedule();
  schedule.heading = heading;
  schedule.dateOf = dateOf;
  schedule.time = time;
  schedule.description = description;
  schedule.lawyer = lawyer;
  schedule.language = language;
  schedule.userName = userName;
  schedule.userEmail = userEmail;
  schedule.userSSN = userSSN;
  schedule.userPhoneNo = userPhoneNo;
  schedule.status = status;
  schedule.lawyerId = lawyerId;
  schedule.focnonfoc = focnonfoc;
  schedule.reasonOfFoc = reasonOfFoc;
  schedule.statusExpireTime = statusExpireTime;
  schedule.Ispaid = "NO";
  schedule.counterpartyName = counterpartyName;
  schedule.counterpartySSN = counterpartySSN;

  // schedule.attachment = attachment;
  let attachment =
    req.files && req.files.attachment ? req.files.attachment[0] : null;

  await schedule.save(async (err, savedSchedule) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
    }

    const authResponse = await auth.getToken();

    let scheduleId = savedSchedule._id;

    const lawyer = await Lawyer.findById(lawyerId);
    console.log("lawyer1111", lawyer);
    console.log("savedSchedule", savedSchedule);
    htmlContent = MeetingRequestedHTML(
      lawyerData,
      userName,
      userSSN,
      userPhoneNo,
      scheduleId
    );

    const body = {
      innerBody: {
        message: {
          subject: "Mötesförfrågan",
          body: {
            contentType: "HTML",
            content: htmlContent,
          },
          toRecipients: [
            {
              emailAddress: {
                address: lawyer.email,
              },
            },
          ],
        },
      },
      // userDetails: user,
      emailType: "meetingRequested",
    };

    await utilService.sendEmail(authResponse, body);
    //generate Event on calendar

    // const meetingDetails = {"title": heading, "meetingDesc": description, "language": language, "attachment": attachment}
    // const calendarEvent = await generateCalendarEvent(dateOf, time, authResponse, lawyer,
    //     {"firstName": userName, "lastName": "", "userEmail": userEmail, "userPhoneNo": userPhoneNo, "userSSN": userSSN},
    //     meetingDetails);
    // if (calendarEvent) {
    //     // send email to lawyer & user
    //     const sendEmailResp = await sendEmail(dateOf, time,authResponse, calendarEvent["onlineMeetingUrl"], lawyer,
    //         {"firstName": userName, "lastName": "", "userEmail": userEmail, "userPhoneNo": userPhoneNo, "userSSN": userSSN},
    //         meetingDetails);
    //     await Lawyer.updateOne({_id: lawyer._id}, {totalMeetingAssigned: lawyer.totalMeetingAssigned + 1});
    //     res.status(200).json(savedSchedule);
    // } else {
    //     res.status(404).json("error");
    // }

    await Lawyer.updateOne(
      { _id: lawyer._id },
      { totalMeetingAssigned: lawyer.totalMeetingAssigned + 1 }
    );
    res.status(200).json(savedSchedule);
  });
  //   const authResponse = await auth.getToken();
};
function MeetingRequestedHTML(
  lawyerData,
  userName,
  userSSN,
  userPhoneNo,
  scheduleId
) {
  let htmlContent = "";
  htmlContent +=
    //   "Ny mötesförfrågan! Hallå " +
    "Hej, " +
    lawyerData.firstName +
    " " +
    lawyerData.lastName +
    // ".<br>" +
    " . Ett nytt möte önskas!" +
    "<br>" +
    "<br>";
  // user.userName + ", ";
  //  htmlContent += "Du kan klicka på <a href='https://netlex.se/preview-schedule/"+user.Link +"'>schema</a>  och betala betalning";
  // htmlContent += " Om du har frågor eller funderingar innan din session,";
  // htmlContent += "vänligen meddela oss i kontaktuppgifterna nedan.";
  htmlContent += "Kundinformation";
  htmlContent += "Klient namn: " + userName + "<br>";
  htmlContent += "Klient Personnummer: " + userSSN + "<br>";
  htmlContent += "Klient Telefon: " + userPhoneNo + "<br>"+ "<br>";
  htmlContent +=
    "Visa detaljer : " +
    "<a href='https://admin.netlex.se/scheduler/view/" +
    scheduleId +
    "'>Klicka här</a>" +
    "<br>";

  // htmlContent += userName;

  htmlContent += "<br>" + "Vänliga Hälsningar,<br>" + "Netlex en del av Mirlex Advokatbyrå AB<br>";
  return htmlContent;
}
async function generateTeamMeeting(selectedDate, selectedTime, authResponse) {
  if (!selectedDate || !selectedTime) {
    return "";
  }
  //Fetch EmailConfiguration
  let emailConfiguration = await EmailConfiguration.find({
    name: "emailConfiguration",
  });
  // console.log("EmailConfiguration", emailConfiguration[0]);

  const startDateTime = new Date(
    selectedDate + "T" + selectedTime.split(" - ")[0]
  ).toUTCString();
  const endDateTime = new Date(
    selectedDate + "T" + selectedTime.split(" - ")[1]
  ).toUTCString();
  const body = {
    startDateTime: startDateTime,
    endDateTime: endDateTime,
    subject: "Möt vår advokat",
  };
  const teamsMeeting = await fetch.postApi(
    environment.OAUTH_GRAPH_ENDPOINT +
      environment.GRAPH_TEAMS_MEET_URI +
      emailConfiguration[0].user_id +
      "/onlineMeetings",
    authResponse.accessToken,
    body
  );
  return teamsMeeting;
}

async function generateCalendarEvent(
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
  //Fetch EmailConfiguration
  let emailConfiguration = await EmailConfiguration.find({
    name: "emailConfiguration",
  });
  // console.log("EmailConfiguration", emailConfiguration[0]);
  const startDateTime = selectedDate + "T" + selectedTime.split(" - ")[0];
  const endDateTime = selectedDate + "T" + selectedTime.split(" - ")[1];
  const body = {
    subject: "Möt vår advokat - " + lawyer.firstName + " " + lawyer.lastName,
    body: getEmailContent(
      selectedDate,
      selectedTime,
      "",
      lawyer,
      user,
      meetingDetails
    ),
    start: {
      dateTime: startDateTime,
      timeZone: environment.GRAPH_TIME_ZONE,
    },
    end: {
      dateTime: endDateTime,
      timeZone: environment.GRAPH_TIME_ZONE,
    },
    location: {
      displayName: "Teams Möte",
    },
    attendees: [
      {
        emailAddress: {
          address: lawyer.email,
          name: lawyer.firstName + " " + lawyer.lastName,
        },
        type: "required",
      },
      {
        emailAddress: {
          address: user.userEmail,
          name: user.firstName + " " + user.lastName,
        },
        type: "required",
      },
    ],
    allowNewTimeProposals: "true",
    transactionId: uuid.v4(),
    isOnlineMeeting: true,
    onlineMeetingProvider: "teamsForBusiness",
  };

  const calendarEvent = await fetch.postApi(
    environment.OAUTH_GRAPH_ENDPOINT +
      environment.GRAPH_EVENT_URI +
      emailConfiguration[0].user_id +
      "/calendar/events",
    // environment.GRAPH_EVENT_URI,
    authResponse.accessToken,
    body
  );
  return calendarEvent;
}

async function sendEmail(
  selectedDate,
  selectedTime,
  authResponse,
  teamsMeetLink,
  lawyer,
  user,
  meetingDetails
) {
  if (!selectedDate || !selectedTime) {
    return "";
  }

  const body = {
    message: {
      subject: "Mötesschema",
      body: getEmailContent(
        selectedDate,
        selectedTime,
        teamsMeetLink,
        lawyer,
        user,
        meetingDetails
      ),
      toRecipients: [
        {
          emailAddress: {
            address: lawyer.email,
          },
        },
      ],
    },
    // userDetails: user,
  };

  if (meetingDetails.attachment) {
    body.message.attachments = [
      {
        "@odata.type": "#microsoft.graph.fileAttachment",
        name: meetingDetails.attachment.name,
        contentType: meetingDetails.attachment.mimetype,
        contentBytes: meetingDetails.attachment.data.toString("base64"),
      },
    ];
  }
  const sendEmail = await utilService.sendEmail(authResponse, body);
  return sendEmail;
}
function getEmailContent(
  selectedDate,
  selectedTime,
  teamsMeetLink,
  lawyer,
  user,
  meetingDetails
) {
  return {
    contentType: "HTML",
    content:
      "<b>Möt vår advokat</b><br>" +
      "Mötesstarttid: " +
      selectedDate +
      " " +
      selectedTime +
      "<br>" +
      "Möteslängd: 30 minuter" +
      "<br>" +
      "Mötestitel:" +
      meetingDetails.title +
      "<br>" +
      "Mötesinformation:" +
      meetingDetails.meetingDesc +
      "<br>" +
      "Språk valt:" +
      meetingDetails.language +
      "<br>" +
      "Kundnamn: " +
      user.firstName +
      "<br>" +
      "Kundens e-post: " +
      user.userEmail +
      "<br>" +
      "Kundens mobilnr: " +
      user.userPhoneNo +
      "<br>" +
      "Klient Personnummer: " +
      user.userSSN +
      "<br>" +
      "Advokat namn: " +
      lawyer.firstName +
      " " +
      lawyer.lastName +
      "<br>" +
      (teamsMeetLink ? "Teams Möteslänk: " + teamsMeetLink + "<br>" : ""),
  };
}
function getEmailContentold(
  selectedDate,
  selectedTime,
  teamsMeetLink,
  lawyer,
  user,
  meetingDetails
) {
  return {
    contentType: "HTML",
    content:
      "<b>Möt vår advokat</b><br>" +
      "Mötesstarttid: " +
      selectedDate +
      " " +
      selectedTime +
      "<br>" +
      "Möteslängd: 30 minuter" +
      "<br>" +
      "Mötestitel:" +
      meetingDetails.title +
      "<br>" +
      "Mötesinformation:" +
      meetingDetails.meetingDesc +
      "<br>" +
      "Språk valt:" +
      meetingDetails.language +
      "<br>" +
      "Klient Namn: " +
      user.firstName +
      "<br>" +
      "Klient e-post: " +
      user.userEmail +
      "<br>" +
      "Klient Telefon: " +
      user.userPhoneNo +
      "<br>" +
      "Klient Personnummer: " +
      user.userSSN +
      "<br>" +
      "Advokat Namn: " +
      lawyer.firstName +
      " " +
      lawyer.lastName +
      "<br>" +
      (teamsMeetLink ? "Teams Möteslänk: " + teamsMeetLink + "<br>" : ""),
  };
}

const Lawyer = require("../models/lawyer.js");
const auth = require("../controllers/auth");
const fetch = require("../helper/fetch");
const environment = require("../env");
const Scheduleapp = require("../models/scheduleapp");
const uuid = require("uuid");
const utilService = require("./util-service");
const EmailConfiguration = require("../models/emailConfiguration");

exports.savescheduleapp = async (req, res) => {
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
  } = req.body;
  let scheduleapp = new Scheduleapp();
  scheduleapp.heading = heading;
  scheduleapp.dateOf = dateOf;
  scheduleapp.time = time;
  scheduleapp.description = description;
  scheduleapp.lawyer = lawyer;
  scheduleapp.language = language;
  scheduleapp.userName = userName;
  scheduleapp.userEmail = userEmail;
  scheduleapp.userSSN = userSSN;
  scheduleapp.userPhoneNo = userPhoneNo;
  scheduleapp.status = status;
  scheduleapp.lawyerId = lawyerId;
  scheduleapp.Ispaid = "NO";

  // scheduleapp.attachment = attachment;
  let attachment =
    req.files && req.files.attachment ? req.files.attachment[0] : null;

  await scheduleapp.save(async (err, savedscheduleapp) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
    }

    const authResponse = await auth.getToken();

    //generate Event on calendar

    const lawyer = await Lawyer.findById(lawyerId);
    const meetingDetails = {
      title: heading,
      meetingDesc: description,
      language: language,
      attachment: attachment,
    };
    const calendarEvent = await generateCalendarEvent(
      dateOf,
      time,
      authResponse,
      lawyer,
      {
        firstName: userName,
        lastName: "",
        userEmail: userEmail,
        userPhoneNo: userPhoneNo,
        userSSN: userSSN,
      },
      meetingDetails
    );
    console.log(calendarEvent);
    if (calendarEvent) {
      // send email to lawyer & user
      const sendEmailResp = await sendEmail(
        dateOf,
        time,
        authResponse,
        calendarEvent["onlineMeetingUrl"],
        lawyer,
        {
          firstName: userName,
          lastName: "",
          userEmail: userEmail,
          userPhoneNo: userPhoneNo,
          userSSN: userSSN,
        },
        meetingDetails
      );
      await Lawyer.updateOne(
        { _id: lawyer._id },
        { totalMeetingAssigned: lawyer.totalMeetingAssigned + 1 }
      );
      res.status(200).json(savedscheduleapp);
    } else {
      res.status(404).json("error");
    }
  });
};

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
    body,
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
  // console.log("startDateTime" + startDateTime);
  // console.log("endDateTime" + endDateTime);
  const body = {
    innerBody: {
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
        displayName: "Lagmöte",
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
    },
    userDetails: user,
    emailType: "calendarEventEmail",
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
    innerBody: {
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
    },
    userDetails: user,
    emailType: "meetingDetailsEmail",

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
      "Kundens Telefon: " +
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
      (teamsMeetLink ? "Lagmöte Link: " + teamsMeetLink + "<br>" : ""),
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
      "Advokat namn: " +
      lawyer.firstName +
      " " +
      lawyer.lastName +
      "<br>" +
      (teamsMeetLink ? "Teams Möteslänk: " + teamsMeetLink + "<br>" : ""),
  };
}

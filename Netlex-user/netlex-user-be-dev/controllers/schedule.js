// 1. Load the User model
const Schedule = require("../models/schedule");
const http = require("http");
const scheduleService = require("../services/schedule-service");
const auth = require("../controllers/auth");
const utilService = require("../services/util-service");
const User = require("../models/user");
const Lawyer = require("../models/lawyer");
const environment = require("../env");
const uuid = require("uuid");

bcrypt = require("bcryptjs");

//save
exports.scheduleSave = function (req, res) {
  return scheduleService.saveSchedule(req, res);
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

exports.Scheduleupdate = function (req, res) {
  if (!req.body) {
    res.status(404).json({ error: "MissingParameter" });
    return;
  }

  Schedule.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
    if (err) {
      return res
        .status(404)
        .json({ error: "Can't update the job. Please try again" });
    }
    res.status(200).json(result);
  });
};

exports.ScheduleupdateIspaid = async function (req, res) {
  const authResponse = await auth.getToken();

  console.log("ScheduleupdateIspaid in schedule controller");
  console.log("req.params.id", req.params.id);
  console.log("req.body.schedule", req.body.schedule);
  let schedule = req.body.schedule;
  if (!req.body) {
    res.status(404).json({ error: "MissingParameter" });
    return;
  }
  // Schedule.findByIdAndUpdate(req.params.id, req.body.schedule, function (err, result) {

  //         if (err) {
  //             return res.status(404).json({error: "Can't update the job. Please try again"});
  //         }
  //         res.status(200).json(result);
  //     });
  const savedSchedule = await Schedule.findOneAndUpdate(
    { _id: req.params.id },
    req.body.schedule
  );
  console.log("savedSchedule", savedSchedule);
  if (!savedSchedule) {
    return res
      .status(404)
      .json({ err: "Err", msg: "Error while saving schedule" });
  }
  //   await sendMeetingScheduledMail();
  await sendMeetingScheduledMail(savedSchedule, schedule.userId);
};
async function sendMeetingScheduledMail(savedSchedule, userId) {
  // Sending Email with Business Agreement
  const authResponse = await auth.getToken();
  const user = await User.findById(userId);
  console.log("user", user);
//   const lawyer = await Lawyer.findById("63466b99c2b07eb12566f8d7");
    const lawyer = await Lawyer.findById(savedSchedule.lawyerId);

  console.log("lawyer", lawyer);

  // const body = {
  //   innerBody: {
  //     message: {
  //       // subject: "Thank You for order - Agreement from Netlex",
  //       // body: {
  //       //   contentType: "HTML",
  //       //   content:
  //       //     "Dear Customer, <br> Thank You for your order. Please find attached your agreement",
  //       // },
  //       subject: "Tack för din beställning - Avtal från Netlex",
  //       body: {
  //         contentType: "HTML",
  //         content:
  //           "Kära kund, <br> Tack för din beställning. Bifogat ditt avtal",
  //       },
  //       toRecipients: [
  //         {
  //           emailAddress: {
  //             address: savedSchedule.userEmail,
  //             // address: "nadeem.mansha@aiotpl.com",
  //           },
  //         },
  //       ],
  //     //   attachments: [
  //     //     {
  //     //       "@odata.type": "#microsoft.graph.fileAttachment",
  //     //       // name: "NetlexAgreement.pdf",
  //     //       name: pdfFileName,
  //     //       // contentType: "application/pdf",
  //     //       // contentBytes: pdfBuffer.toString("base64"),
  //     //       // path: filePath,
  //     //       // contentBytes: fs.readFileSync(filePath,{encoding:"base64"}),
  //     //       // contentBytes: pdfBufferData.toString("base64"),
  //     //       contentBytes: pdfBufferData,

  //     //     },
  //     //   ],
  //     },
  //   },
  //   userDocumentMasterId: userDocumentMasterId,
  //   emailType: "agreementEmail",
  //   userDetails: user,
  // };

  let selectedDate = savedSchedule.dateOf;
  let selectedTime = savedSchedule.time;
  let htmlContent = "";
  // let subject = "You Paid for Meeting - Netlex";
  
  //   htmlContent +=
  //     "Kära" +
  //     savedSchedule.userName +
  //     ",<br>" +
  //     "Tack. Du har framgångsrikt betalat för mötet, planerat till " +
  //     savedSchedule.dateOf +
  //     "<br>";
  //   htmlContent += "Kind regards,<br>" + "Netlex<br>";

  //----------English
  // htmlContent +=
  // "<b>Meet our Lawyer</b><br>" +
  // "Meeting Start Time: " +
  // selectedDate +
  // " " +
  // selectedTime +
  // "<br>" +
  // "Meeting Duration: 30 mins" +
  // "<br>" +
  // "Meeting Title:" +
  // savedSchedule.heading +
  // "<br>" +
  // "Meeting Details:" +
  // savedSchedule.description +
  // "<br>" +
  // "Language Chosen:" +
  // savedSchedule.language +
  // "<br>" +
  // "Client Name: " +
  // savedSchedule.userName +
  // "<br>" +
  // "Client Email: " +
  // savedSchedule.userEmail +
  // "<br>" +
  // "Client Mobile No: " +
  // savedSchedule.userPhoneNo +
  // "<br>" +
  // "Client SSN: " +
  // savedSchedule.userSSN +
  // "<br>" +
  // "Lawyer Name: " +
  // lawyer.firstName +
  // " " +
  // lawyer.lastName +
  // "<br>";

  htmlContent +=
    "<b>Hej " +
    savedSchedule.userName +
    "</b>,<br>" +
    "Tack. Du har framgångsrikt betalat för mötet <br> <br>";

  htmlContent +=
    "<b>Möt vår advokat</b><br>" +
    "Mötesstarttid: " +
    selectedDate +
    " " +
    selectedTime +
    "<br>" +
    "Möteslängd: 30 mins" +
    "<br>" +
    "Mötestitel:" +
    "Inledande rådgivningsmöte (Kostnadsfritt) " +
    "<br>" +
    "Mötesinformation:" +
    savedSchedule.description +
    "<br>" +
    "Språk valt:" +
    savedSchedule.language +
    "<br>" +
    "Klienten: " +
    savedSchedule.userName +
    "<br>" +
    "E-post: " +
    savedSchedule.userEmail +
    "<br>" +
    "Telefon: " +
    savedSchedule.userPhoneNo +
    "<br>" +
    "Personnr: " +
    savedSchedule.userSSN +
    "<br>" +
    "Advokatens namn: " +
    lawyer.firstName +
    " " +
    lawyer.lastName +
    "<br>" +"<br>" +
     "Du hittar även länken till mötet på din sida, besök netlex.se för att logga in på din sida.";

  console.log("htmlContent", htmlContent);
//   const body = {
//     innerBody: {
//       message: {
//         subject: subject,
//         body: {
//           contentType: "HTML",
//           content: htmlContent,
//         },
//         toRecipients: [
//           {
//             emailAddress: {
//               address: savedSchedule.userEmail,
//             },
//           },
//         ],
//       },
//     },
//     userDetails: user,
//     emailType: "meetingScheduled",
//   };
const startDateTime = selectedDate + "T" + selectedTime.split(" - ")[0];
const endDateTime = selectedDate + "T" + selectedTime.split(" - ")[1];

const body = {
    innerBody: {
      subject: "Meet our Lawyer - " + lawyer.firstName + " " + lawyer.lastName,
      body: {
        contentType: "HTML",
        content: htmlContent,
      },
      start: {
        dateTime: startDateTime,
        timeZone: environment.GRAPH_TIME_ZONE,
      },
      end: {
        dateTime: endDateTime,
        timeZone: environment.GRAPH_TIME_ZONE,
      },
      location: {
        displayName: "Teams Meeting",
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
            address: savedSchedule.userEmail,
            // name: user.firstName + " " + user.lastName,
            name: savedSchedule.userName,

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
    scheduleId: savedSchedule._id,
  };

const sendEmailAndMakeEvent = await utilService.sendEmailAndMakeEvent(authResponse, body);
}
exports.show = function (req, res) {
  Schedule.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "UserNotFound" });
    } else {
      res.json(doc);
    }
  });
};

exports.scheduleById = function (req, res) {
  // get document by id
  const id = req.params.id;
  Schedule.findOne({ _id: id }, function (err, schedule) {
    if (err) {
      return res.status(404).json({ error: "Please try again" });
    }
    res.status(200).json(schedule);
  });
};

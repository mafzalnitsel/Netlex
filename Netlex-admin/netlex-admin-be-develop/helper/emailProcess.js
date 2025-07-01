const fetch = require("../helper/fetch");
const environment = require("../env");
const auth = require("../controllers/auth");
const EmailConfiguration = require("../models/emailConfiguration");
const uuid = require("uuid");
const UserDocumentMaster = require("../models/userDocumentMaster");
const UserDocuments = require("../models/userDocuments");
const html_to_pdf = require("html-pdf-node");

exports.meetingResponseEmail = async (req, res) => {
  // console.log("reqreqreq",req)

  // ------------Fetch EmailConfiguration--------------
  let emailConfiguration = await EmailConfiguration.find({
    name: "emailConfiguration",
  });
  // console.log("EmailConfiguration", emailConfiguration[0]);

  // -----------------Fetch Token-----------------
  const authResponse = await auth.getToken();

  // ---------------Meeting Response Email Again--------------
  // let { emailType } = req;
  let { _id, subject, contentType, content, emailAddress, userDetails,emailType } = req;
  var body = "";
  // if (emailType === "meetingResponse") {
  // console.log("meetingResponse")
  body = {
    _id: _id,
    emailType: emailType,
    userDetails: userDetails,
    innerBody: {
      message: {
        subject: subject,
        body: {
          contentType: contentType,
          content: content,
        },
        toRecipients: [
          {
            emailAddress: {
              address: emailAddress,
            },
          },
        ],
      },
    },
  };

  await fetch.postApi(
    environment.OAUTH_GRAPH_ENDPOINT +
      environment.GRAPH_SEND_EMAIL_URI +
      emailConfiguration[0].user_id +
      "/sendMail",
    authResponse.accessToken,
    body,
    res
  );
  // }
};

exports.meetingDetailsEmail = async (req, res) => {
  // console.log("reqreqreq",req)

  // ------------Fetch EmailConfiguration--------------
  let emailConfiguration = await EmailConfiguration.find({
    name: "emailConfiguration",
  });
  // console.log("EmailConfiguration", emailConfiguration[0]);
  const authResponse = await auth.getToken();

  // ---------------Meeting Details Email Again--------------
  // let { emailType } = req;
  let { _id, subject, contentType, content, emailAddress, userDetails,emailType } = req;
  var body = "";

  let meetingDetailsBody = req.body;
  body = {
    _id: _id,
    emailType: emailType,
    userDetails: userDetails,
    innerBody: {
      message: {
        subject: subject,
        body: {
          contentType: meetingDetailsBody.message.body.contentType,
          // content: meetingDetailsBody.message.body.content,
          content: content,
        },
        toRecipients: [
          {
            emailAddress: {
              address: emailAddress,
            },
          },
        ],
      },
    },
  };

  await fetch.postApi(
    environment.OAUTH_GRAPH_ENDPOINT +
      environment.GRAPH_SEND_EMAIL_URI +
      emailConfiguration[0].user_id +
      "/sendMail",
    authResponse.accessToken,
    body,
    res
  );
};

exports.calendarEventEmail = async (req, res) => {
  // console.log("reqreqreq",req)

  // ------------Fetch EmailConfiguration--------------
  let emailConfiguration = await EmailConfiguration.find({
    name: "emailConfiguration",
  });
  // console.log("EmailConfiguration", emailConfiguration[0]);
  const authResponse = await auth.getToken();
  // ---------------Calendar Event  Email Again--------------
  // let { emailType } = req;
  let { _id, subject, contentType, content, emailAddress, userDetails,emailType } = req;
  var body = "";
  let calendarEventBody = req.body;
  body = {
    _id: _id,
    emailType: emailType,
    userDetails: userDetails,
    innerBody: {
      subject: subject,
      body: {
        contentType: contentType,
        // content: calendarEventBody.body.content,
        content: content,
      },
      // start: { dateTime: '2022-08-26T11:30:00', timeZone: 'Europe/Berlin' },
      // end: { dateTime: '2022-08-26T12:00:00', timeZone: 'Europe/Berlin' },
      start: {
        dateTime: calendarEventBody.start.dateTime,
        timeZone: calendarEventBody.start.timeZone,
      },
      end: {
        dateTime: calendarEventBody.end.dateTime,
        timeZone: calendarEventBody.end.timeZone,
      },
      location: {
        displayName: calendarEventBody.location.displayName,
      },
      // attendees: calendarEventBody.attendees,
      attendees: [
        {
          emailAddress: {
            address: calendarEventBody.attendees[0].emailAddress.address,
            name: calendarEventBody.attendees[0].emailAddress.name,
          },
          type: "required",
        },
        {
          emailAddress: {
            address: emailAddress,
            name: userDetails.userName,
          },
          type: "required",
        },
      ],

      allowNewTimeProposals: calendarEventBody.allowNewTimeProposals,
      transactionId: uuid.v4(),
      isOnlineMeeting: calendarEventBody.isOnlineMeeting,
      onlineMeetingProvider: calendarEventBody.onlineMeetingProvider,
    },
  };

  await fetch.postApi(
    environment.OAUTH_GRAPH_ENDPOINT +
      environment.GRAPH_EVENT_URI +
      emailConfiguration[0].user_id +
      "/calendar/events",
    authResponse.accessToken,
    body,
    res
  );
};

exports.agreementEmail = async (req, res) => {
  // console.log("reqreqreq",req)

  // ------------Fetch EmailConfiguration--------------
  let emailConfiguration = await EmailConfiguration.find({
    name: "emailConfiguration",
  });
  // console.log("EmailConfiguration", emailConfiguration[0]);
  let { _id, subject, contentType, content, emailAddress, userDetails,emailType } = req;

  const authResponse = await auth.getToken();
  let { userDocumentMasterId } = req.body;
  // if (emailType === "agreementEmail") {
    await generateAgreement(userDocumentMasterId);
  // }
  async function generateAgreement(userDocumentMasterId) {
    const userDocumentMaster = await UserDocumentMaster.findById(
      userDocumentMasterId
    ).populate("documentTemplateId");
    // console.log("userDocumentMaster12",userDocumentMaster.documentTemplateId.document)

    const documentTemplateId = userDocumentMaster.documentTemplateId;
    const userId = userDocumentMaster.userId;
    let docContent = userDocumentMaster.documentTemplateId.document;
    // console.log("docContent12",docContent)

    const userDocumentDetails = await UserDocuments.find({
      masterId: userDocumentMasterId,
    });
    // console.log("userDocumentDetails12",userDocumentDetails)

    let documentAnswer = [];
    userDocumentDetails.forEach((userDocument) => {
      documentAnswer.push({
        fieldObjectId: userDocument.fieldId,
        answer: userDocument.answer,
      });
    });
    // console.log("documentAnswer15",documentAnswer)

    const pdfBuffer = await populateUserInputs(docContent, documentAnswer);
    console.log("pdfBufferpdfBuffer", pdfBuffer);

    await sendAgreement(userId, pdfBuffer, userDocumentMasterId);
  }

  async function sendAgreement(userId, pdfBuffer, userDocumentMasterId) {
    // Sending Email with agreement
    const authResponse = await auth.getToken();
    // const user = await User.findById(userId);
    const body = {
      innerBody: {
        message: {
          subject: subject,
          body: {
            contentType: contentType,
            content: content,
          },
          toRecipients: [
            {
              emailAddress: {
                address: req.emailAddress,
              },
            },
          ],
          attachments: [
            {
              "@odata.type": "#microsoft.graph.fileAttachment",
              name: "NetlexAgreement.pdf",
              contentType: "application/pdf",
              contentBytes: pdfBuffer.toString("base64"),
            },
          ],
        },
      },
      emailType: "agreementEmail",
      userDocumentMasterId: userDocumentMasterId,
      userDetails: req.userDetails,
      _id:_id,
    };
    // const sendEmail = await utilService.sendEmail(authResponse, body);

    await fetch.postApi(
      environment.OAUTH_GRAPH_ENDPOINT +
        environment.GRAPH_SEND_EMAIL_URI +
        emailConfiguration[0].user_id +
        "/sendMail",
      authResponse.accessToken,
      body,
      res
    );
  }

  async function populateUserInputs(
    docContent,
    documentAnswer,
    includeWaterMark = true
  ) {
    // console.log("populateUserInputs1",docContent)
    // console.log("populateUserInputs1",documentAnswer)
    // replace the answer for fields
    let replacedString = docContent;
    let pdfBuffer;
    try {
      documentAnswer.forEach(function (data) {
        replacedString = replacedString
          .split("[[" + data.fieldObjectId + "]]")
          .join(data.answer);
      });
      replacedString = replacedString.split(/{{[\s\S]*?}}/).join("");
      if (!includeWaterMark) {
        replacedString = replacedString.substring(
          0,
          replacedString.length * 0.7
        );
        replacedString =
          "<div style='position: absolute;\n" +
          "                color: #f1f1f1;\n" +
          "                width: 100%;\n" +
          "                top: 343px;\n" +
          "                opacity:2;\n" +
          "                padding: 19px;\n" +
          '                text-align: center;\'><svg  width="550" height="550" viewBox="0 0 143 136" fill="none" xmlns="http://www.w3.org/2000/svg">\\n\' +\n' +
          "             '<g filter=\"url(#filter0_d)\">\\n' +\n" +
          '             \'<ellipse rx="67.3903" ry="63.899" transform="matrix(0.999999 0.00148894 -0.001718 0.999998 71.5002 63.9992)" fill="white"/>\\n\' +\n' +
          '             \'<path d="M138.64 64.0992C138.58 99.2391 108.484 127.703 71.3908 127.648C34.2976 127.593 4.29958 99.0392 4.35995 63.8992C4.42032 28.7593 34.5163 0.29511 71.6095 0.35034C108.703 0.40557 138.701 28.9592 138.64 64.0992Z" stroke="#1F2A53" stroke-opacity="0.4" stroke-width="0.5"/>\\n\' +\n' +
          "             '</g>\\n' +\n" +
          '             \'<path d="M111.685 64.0622C111.65 85.0859 93.6428 102.124 71.4371 102.091C49.2313 102.057 31.2817 84.9641 31.3172 63.9403C31.3526 42.9165 49.3598 25.8782 71.5655 25.9119C93.7713 25.9456 111.721 43.0384 111.685 64.0622Z" stroke="#1F2A53" stroke-opacity="0.4" stroke-width="0.5"/>\\n\' +\n' +
          '             \'<path d="M77.3534 73.0041L73.6913 72.9985L66.5821 61.2934L66.5624 72.9877L62.9003 72.9822L62.9303 55.2088L66.5924 55.2143L73.7137 66.9439L73.7335 55.2251L77.3834 55.2307L77.3534 73.0041Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
          '             \'<path d="M87.0927 19.79L85.6539 19.5154L83.8242 14.4051L82.8529 18.9808L81.414 18.7062L82.8903 11.7518L84.3291 12.0264L86.1616 17.1473L87.1349 12.5619L88.569 12.8356L87.0927 19.79Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
          '             \'<path d="M62.887 116.031L61.4701 115.659L60.0223 110.445L58.7119 114.936L57.295 114.564L59.2867 107.739L60.7036 108.111L62.1533 113.336L63.4665 108.836L64.8786 109.206L62.887 116.031Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
          '             \'<path d="M102.745 24.7326L100.223 23.4881L99.3068 25.1575L102.267 26.6181L101.701 27.6497L97.427 25.5409L100.848 19.3085L105.112 21.4129L104.542 22.4531L101.59 20.9968L100.775 22.4822L103.297 23.7267L102.745 24.7326Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
          '             \'<path d="M40.8426 104.726L43.2724 106.143L42.2365 107.74L39.3848 106.078L38.7446 107.066L42.8619 109.465L46.7293 103.5L42.6205 101.105L41.9751 102.101L44.8183 103.758L43.8966 105.18L41.4668 103.763L40.8426 104.726Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
          '             \'<path d="M118.362 33.8617L116.771 32.3747L112.503 36.4807L111.433 35.4804L115.701 31.3744L114.132 29.9074L114.987 29.0848L119.218 33.0391L118.362 33.8617Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
          '             \'<path d="M28.1651 97.6262L26.7006 96.0144L31.2876 92.2675L30.3026 91.1833L25.7156 94.9302L24.2709 93.3401L23.3519 94.0907L27.2462 98.3768L28.1651 97.6262Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
          '             \'<path d="M120.212 49.2708L121.671 52.018L120.609 52.5249L118.463 48.4838L124.879 45.4215L125.566 46.7154L120.212 49.2708Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
          '             \'<path d="M21.4047 75.6868L20.6807 72.6618L21.8311 72.4143L22.8961 76.8638L15.9458 78.3594L15.6048 76.9348L21.4047 75.6868Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
          '             \'<path d="M122.27 82.3507L123.983 84.4951L123.282 86.027L120.883 82.8036L116.685 83.3723L117.393 81.8226L120.265 81.5262L118.531 79.3359L119.239 77.7862L121.671 81.0807L125.792 80.5386L125.092 82.0706L122.27 82.3507Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
          '             \'<path d="M25.1121 41.7442L26.8247 43.8886L26.124 45.4206L23.7246 42.1972L19.5265 42.7658L20.2352 41.2161L23.107 40.9198L21.3725 38.7295L22.0812 37.1797L24.5125 40.4743L28.6341 39.9322L27.9335 41.4642L25.1121 41.7442Z" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
          '             \'<rect width="7.49541" height="1.41491" transform="matrix(-0.00574245 0.999984 0.999987 0.00516287 125.462 62.292)" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
          '             \'<rect width="7.49541" height="1.41491" transform="matrix(-0.00574245 0.999984 0.999987 0.00516287 121.924 62.2715)" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
          '             \'<rect width="8.10544" height="1.25554" transform="matrix(-0.231757 0.972774 0.97782 0.209446 22.5137 53.0625)" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
          '             \'<rect width="8.10544" height="1.25554" transform="matrix(-0.231757 0.972774 0.97782 0.209446 18.9727 52.3057)" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
          '             \'<rect width="8.10544" height="1.25554" transform="matrix(-0.231757 0.972774 0.97782 0.209446 15.4395 51.5488)" fill="#1F2A53" fill-opacity="0.4"/>\\n\' +\n' +
          "             '<defs>\\n' +\n" +
          '             \'<filter id="filter0_d" x="0.109375" y="0.100586" width="142.781" height="135.798" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\\n\' +\n' +
          '             \'<feFlood flood-opacity="0" result="BackgroundImageFix"/>\\n\' +\n' +
          '             \'<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\\n\' +\n' +
          "             '<feOffset dy=\"4\"/>\\n' +\n" +
          "             '<feGaussianBlur stdDeviation=\"2\"/>\\n' +\n" +
          '             \'<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>\\n\' +\n' +
          '             \'<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>\\n\' +\n' +
          '             \'<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>\\n\' +\n' +
          "             '</filter>\\n' +\n" +
          "             '</defs>\\n' +\n" +
          "             '</svg></div>" +
          replacedString;
      }
      let options = { format: "A4", printBackground: true };
      let file = { content: replacedString };
      pdfBuffer = await html_to_pdf.generatePdf(file, options);
    } catch (e) {
      console.error(e);
    }

    return pdfBuffer;
  }
};

// //---Used for all emails before..(Now each function saperated){Working}---
// exports.emailAgain = async (req, res) => {
//   // ------------Fetch EmailConfiguration--------------
//   let emailConfiguration = await EmailConfiguration.find({
//     name: "emailConfiguration",
//   });
//   // console.log("EmailConfiguration", emailConfiguration[0]);

//   // -----------------Fetch Token-----------------
//   const authResponse = await auth.getToken();

//   // ---------------Meeting Email Again--------------

//   // console.log("reqreqreq",req)
//   let { emailType } = req;
//   let { _id, subject, contentType, content, emailAddress, userDetails } = req;
//   var body = "";
//   if (emailType === "meetingResponse") {
//     // console.log("meetingResponse")
//     body = {
//       _id: _id,
//       emailType: emailType,
//       userDetails: userDetails,
//       innerBody: {
//         message: {
//           subject: subject,
//           body: {
//             contentType: contentType,
//             content: content,
//           },
//           toRecipients: [
//             {
//               emailAddress: {
//                 address: emailAddress,
//               },
//             },
//           ],
//         },
//       },
//     };

//     await fetch.postApi(
//       environment.OAUTH_GRAPH_ENDPOINT +
//         environment.GRAPH_SEND_EMAIL_URI +
//         emailConfiguration[0].user_id +
//         "/sendMail",
//       authResponse.accessToken,
//       body,
//       res
//     );
//   } else if (emailType === "meetingDetailsEmail") {
//     let meetingDetailsBody = req.body;
//     body = {
//       _id: _id,
//       emailType: emailType,
//       userDetails: userDetails,
//       innerBody: {
//         message: {
//           subject: subject,
//           body: {
//             contentType: meetingDetailsBody.message.body.contentType,
//             // content: meetingDetailsBody.message.body.content,
//             content: content,
//           },
//           toRecipients: [
//             {
//               emailAddress: {
//                 address: emailAddress,
//               },
//             },
//           ],
//         },
//       },
//     };

//     await fetch.postApi(
//       environment.OAUTH_GRAPH_ENDPOINT +
//         environment.GRAPH_SEND_EMAIL_URI +
//         emailConfiguration[0].user_id +
//         "/sendMail",
//       authResponse.accessToken,
//       body,
//       res
//     );
//   } else if (emailType === "calendarEventEmail") {
//     let calendarEventEmail = req.body;
//     // console.log(
//     //   "calendarEventEmail2",
//     //   calendarEventEmail.attendees[0].emailAddress
//     // );
//     body = {
//       _id: _id,
//       emailType: emailType,
//       userDetails: userDetails,
//       innerBody: {
//         subject: subject,
//         body: {
//           contentType: contentType,
//           // content: calendarEventEmail.body.content,
//           content: content,
//         },
//         // start: { dateTime: '2022-08-26T11:30:00', timeZone: 'Europe/Berlin' },
//         // end: { dateTime: '2022-08-26T12:00:00', timeZone: 'Europe/Berlin' },
//         start: {
//           dateTime: calendarEventEmail.start.dateTime,
//           timeZone: calendarEventEmail.start.timeZone,
//         },
//         end: {
//           dateTime: calendarEventEmail.end.dateTime,
//           timeZone: calendarEventEmail.end.timeZone,
//         },
//         location: {
//           displayName: calendarEventEmail.location.displayName,
//         },
//         // attendees: calendarEventEmail.attendees,
//         attendees: [
//           {
//             emailAddress: {
//               address: calendarEventBody.attendees[0].emailAddress.address,
//               name: calendarEventBody.attendees[0].emailAddress.name,
//             },
//             type: "required",
//           },
//           {
//             emailAddress: {
//               address: emailAddress,
//               name: userDetails.userName,
//             },
//             type: "required",
//           },
//         ],

//         allowNewTimeProposals: calendarEventEmail.allowNewTimeProposals,
//         transactionId: uuid.v4(),
//         isOnlineMeeting: calendarEventEmail.isOnlineMeeting,
//         onlineMeetingProvider: calendarEventEmail.onlineMeetingProvider,
//       },
//     };

//     await fetch.postApi(
//       environment.OAUTH_GRAPH_ENDPOINT +
//         environment.GRAPH_EVENT_URI +
//         emailConfiguration[0].user_id +
//         "/calendar/events",
//       authResponse.accessToken,
//       body,
//       res
//     );
//   }

//   //   return;
// };

const generator = require("generate-password");
const fetch = require("../helper/fetch");
const environment = require("../env");
const auth = require("../controllers/auth");
// const nodemailer = require('nodemailer');
// const { google } = require('googleapis');
const EmailConfiguration = require("../models/emailConfiguration");
// const { Client } = require('@microsoft/microsoft-graph-client');

function getWelcomeContent(user, newPassword) {
  let htmlContent = "";
  htmlContent += "Hej " + /*user.firstName + " " + user.lastName +*/ user.userName + "<br>";
  htmlContent += "Tack för att du använder dig av Netlex<br>";
  // htmlContent += "Ditt användarnamn är: " + user.userName + "<br>";
  // htmlContent += "Ditt Lösenord är: " + newPassword + "<br><br>";
  htmlContent +=
    // "Bifogat hittar du ditt avtal. Du hittar även ditt avtal när du loggar in på ditt konto under Mina avtal. " +
     "Bifogat hittar du ditt avtal. Du hittar även ditt avtal när du loggar in på ditt konto under Mina avtal.  <br><br>" +
     "Vänliga Hälsningar,<br>" +
     "Netlex en del av Mirlex Advokatbyrå AB<br>";
  return htmlContent;
}

function MeetingConfirmNonFoc(user, newPassword) {
  let htmlContent = "";
  htmlContent += "Hej " + /*user.firstName + " " + user.lastName +*/ user.userName + "<br>";
  htmlContent += "Tack för att du vill boka ett rådgivningsmöte med oss. Din mötesbegäran har mottagits och nu kan du bekräfta och avsluta bokningen genom att klicka på länken här för att genomföra betalningen. Därefter kommer du att få en teams länk för ett online möte.  <a href='https://netlex.se/preview-schedule/" +user.Link +"'>Länken</a>.";
  
  // user.userName + ", ";
  //  htmlContent += "Du kan klicka på <a href='https://user.netlex.se/preview-schedule/"+user.Link +"'>schema</a>  och betala betalning";
  htmlContent += "Vi ses snart! <br><br>" +
  "Vänliga Hälsningar,<br>" +
  "Netlex en del av Mirlex Advokatbyrå AB<br>";
  return htmlContent;
}

function MeetingConfirmFoc(user, newPassword) {
  let htmlContent = "";
  // htmlContent +=
  htmlContent += "Hej " + /*user.firstName + " " + user.lastName +*/ user.userName + "<br>";
  // user.userName + ", ";
  //  htmlContent += "Du kan klicka på <a href='https://user.netlex.se/preview-schedule/"+user.Link +"'>schema</a>  och betala betalning";
  // htmlContent += "Det är för att informera dig om att din begäran om mötesschema har godkänts.";
  htmlContent += "Tack för att du använder dig av Netlex för köp av avtal. Du kan nu fullfölja och färdigställa ditt avtal. <br><br>" +
  "Vänliga Hälsningar,<br>" +
  "Netlex en del av Mirlex Advokatbyrå AB<br>";
  return htmlContent;
}

function MeetingCancel(user, newPassword) {
  let htmlContent = "";
  htmlContent += "Hej " + /*user.firstName + " " + user.lastName +*/ user.userName + "<br>";
  // htmlContent += "Vi beklagar att meddela dig att ditt möte har ställts in, om du har några frågor,";

  htmlContent +=
  "Tack för att du vill boka ett rådgivningsmöte med oss. Dessvärre har vi inte möjlighet att ta emot din mötesförfrågan för närvarande.  <br><br>" +
  "Vänliga Hälsningar,<br>" +
  "Netlex en del av Mirlex Advokatbyrå AB<br>";

  return htmlContent;
}

exports.generatePassword = function () {
  return generator.generate({
    length: 10,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase: true,
  });
};

function getForgotPasswordContent(user, newPassword) {
  let htmlContent = "";
  htmlContent += "Hej " + /*user.firstName + " " + user.lastName +*/ user.userName + "<br>";
  htmlContent += "Ditt nya lösenord är: " + newPassword + "<br><br>";
  htmlContent +=
    "Förvara ditt användarnamn och lösenord säkert eftersom du behöver dem för att komma åt ditt konto. <br><br>" +
    "Vänliga Hälsningar,<br>" +
    "Netlex en del av Mirlex Advokatbyrå AB<br>";
  return htmlContent;
}

function getUserDeleteContent(user) {
  let htmlContent = "";
  htmlContent += "Hej " + /*user.firstName + " " + user.lastName +*/ user.userName + "<br>";
  htmlContent += "Ditt konto har raderats<br><br>";
  htmlContent +=
    "Kontakta systemadministratören för eventuella förtydliganden. <br><br>" +
    "Vänliga Hälsningar,<br>" +
    "Netlex en del av Mirlex Advokatbyrå AB<br>";
  return htmlContent;
}

function getFocEmailContent( 
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
function getUserStatusChangedContent(user) {
  // console.log("user in getUserStatusChangedContent functoin ",user)
  let htmlContent = "";
  htmlContent += "Hej " + /*user.firstName + " " + user.lastName +*/ user.userName + ",<br>";
  if (user.status === "Inaktiv") {
    htmlContent += "Ditt konto har varit inaktivt<br><br>";
  } else if (user.status === "Aktiv") {
    htmlContent += "Ditt konto har varit aktivt<br><br>";
  }
  htmlContent +=
    "Kontakta systemadministratören för eventuella förtydliganden. <br><br>" +
    "Vänliga Hälsningar,<br>" +
    "Netlex en del av Mirlex Advokatbyrå AB<br>";
  // console.log("htmlContent", htmlContent);
  return htmlContent;
}
function getUserFeStatusChangedContent(user) {
  // console.log("user in getUserStatusChangedContent functoin ",user)
  let htmlContent = "";
  htmlContent += "Hej " + /*user.firstName + " " + user.lastName +*/ user.userName + "<br>";
  if (user.status === "inActive") {
    htmlContent += "Ditt konto har varit inaktivt<br><br>";
  } else if (user.status === "active") {
    htmlContent += "Ditt konto har varit aktivt<br><br>";
  }
  htmlContent +=
    "Du kan <a href='https://netlex.se/login'>click here</a> att logga in. <br>" +
    "Kontakta systemadministratören för eventuella förtydliganden. <br><br>" +
    "Vänliga Hälsningar,<br>" +
    "Netlex en del av Mirlex Advokatbyrå AB<br>";
  // console.log("htmlContent", htmlContent);
  return htmlContent;
}
function getAgreementReuqestUpdated(data) {
  // console.log("data2222 ",data)
  let htmlContent = "";
  htmlContent += "Hej " + /*user.firstName + " " + user.lastName +*/ data.user.userName + ",<br>";
  if (data.status === "approved") {
    htmlContent += "Din avtalsförfrågan godkänns. För att gå vidare till avtalet ";
    htmlContent +=
      "<a href='https://netlex.se/userInput/" + data.documentId + "'" + ">Klicka här</a> <br><br>" +
      "Vänliga Hälsningar,<br>" +
      "Netlex en del av Mirlex Advokatbyrå AB<br>";
  } else if (data.status === "rejected") {
    htmlContent += "Förlåt, Din begäran om avtal avslås.";
    htmlContent +=
      "Kontakta systemadministratören för eventuella förtydliganden.<br><br>" +
      "Vänliga Hälsningar,<br>" +
      "Netlex en del av Mirlex Advokatbyrå AB<br>";
  }
  // console.log("htmlContent", htmlContent);
  return htmlContent;
}
exports.sendmail = async (user, newPassword, emailType) => {
  console.log('useruser', user)
  let htmlContent = "";
  let subject = "";
  if (emailType === "registration") {
    htmlContent = getWelcomeContent(user, newPassword);
    subject = "Registreringsbekräftelse - Netlex";
  } else if (emailType === "MeetingConfirmNonFoc") {
    htmlContent = MeetingConfirmNonFoc(user, newPassword);
    subject = "Mötesbekräftelse - Netlex";
  } else if (emailType === "MeetingConfirmFoc") {
    htmlContent = MeetingConfirmFoc(user, newPassword);
    subject = "Mötesbekräftelse - Netlex";
  } else if (emailType === "MeetingCancel") {
    htmlContent = MeetingCancel(user, newPassword);
    subject = "Möte inställt - Netlex";
  } else if (emailType === "forgotpassword") {
    htmlContent = getForgotPasswordContent(user, newPassword);
    subject = "Nytt lösenord - Netlex";
  } else if (emailType === "userDeleted") {
    htmlContent = getUserDeleteContent(user);
    subject = "Användarkontot har raderats - Netlex";
  }
  //  else if (emailType === "NewStatusInactive"){
  //   htmlContent = getUserStatusChangedContent(user);
  //   subject = "Användarkontot har varit inaktivt - Netlex";
  // }
  else if (emailType === "UserStatusChanged") {
    htmlContent = getUserStatusChangedContent(user);
    if (user.status === "Inaktiv") {
      subject = "Användarkontot har varit inaktivt - Netlex";
    } else if (user.status === "Aktiv") {
      subject = "Användarkontot har varit aktivt - Netlex";
    }
  }
  else if (emailType === "UserFeStatusChanged") {
    htmlContent = getUserFeStatusChangedContent(user);
    if (user.status === "inActive") {
      subject = "Användarkontot har varit inaktivt - Netlex";
    } else if (user.status === "active") {
      subject = "Användarkontot har varit aktivt - Netlex";
    }
  }
  else if (emailType === "AgreementReuqestUpdated") {

    htmlContent = getAgreementReuqestUpdated(user);
    if (user.status === "approved") {
      subject = "Avtalsbegäran godkänd - Netlex";
    } else if (user.status === "rejected") {
      subject = "Avtalsbegäran avvisades - Netlex";
    }
  }
  //Fetch EmailConfiguration
  let emailConfiguration = await EmailConfiguration.find({
    name: "emailConfiguration",
  });
  // console.log("EmailConfiguration", emailConfiguration[0]);
  var body = "";
  // console.log("emailType",emailType)
  if (emailType === "registrations") {
    body = {
      innerBody: {
        message: {
          subject: subject,
          body: {
            contentType: "HTML",
            content: htmlContent,
          },
          toRecipients: [
            {
              emailAddress: {
                address: user.userEmail,
              },
            },
          ],
        },
      },
      userDetails: user,
      emailType: "meetingResponse",
    };
  } else if (emailType === "AgreementReuqestUpdated") {
    body = {
      innerBody: {
        message: {
          subject: subject,
          body: {
            contentType: "HTML",
            content: htmlContent,
          },
          toRecipients: [
            {
              emailAddress: {
                address: user.user.email,
                // address: "qwe"
              },
            },
          ],
        },
      },
      userDetails: user.user,
      emailType: "AgreementReuqestUpdated",
    };
  }
  else {
    body = {
      innerBody: {
        message: {
          subject: subject,
          body: {
            contentType: "HTML",
            content: htmlContent,
          },
          toRecipients: [
            {
              emailAddress: {
                address: user.email,
                // address: "qwe"
              },
            },
          ],
        },
      },
      userDetails: user,
      emailType: "meetingResponse",
    };
  }
  const authResponse = await auth.getToken();

  await fetch.postApi(
    environment.OAUTH_GRAPH_ENDPOINT +
    // environment.GRAPH_SEND_EMAIL_URI,
    environment.GRAPH_SEND_EMAIL_URI +
    emailConfiguration[0].user_id +
    "/sendMail",
    authResponse.accessToken,
    body
  );
};
// const graphConfig = {
//     auth: {
//         clientId: 'e84da438-8183-42b4-9a56-6003022c9169',
//         clientSecret: 'sGv8Q~QgjpapaJme2IUaPxzWU1IIdxKZE.6V2b07',
//         // accessToken: 'd5f30a23-9f41-44eb-b01e-ef86baa59af2',
//         // refreshToken: '',
//         tenantId: 'd5f30a23-9f41-44eb-b01e-ef86baa59af2'
//       }
// };

// const client = Client.initWithMiddleware({
//     authProvider: (done) => {
//         done(null, graphConfig.auth.accessToken);
//     }
// });

//================Google Mail===================
// exports.sendGoogleMail = async (user, newPassword, emailType) => {
//     console.log('emailtype',emailType)
//     console.log('user',user)
//     console.log('newPassword',newPassword)
//     let htmlContent = '';
//     let subject = '';
//     if(emailType === 'registration') {
//         htmlContent = getWelcomeContent(user, newPassword);
//         subject = 'Registreringsbekräftelse - Netlex';
//     }
//     else if(emailType === 'MeetingConfirmNonFoc') {
//         htmlContent = MeetingConfirmNonFoc(user, newPassword);
//         subject = 'Mötesbekräftelse - Netlex';
//     }
//     else if(emailType === 'MeetingConfirmFoc') {
//         htmlContent = MeetingConfirmFoc(user, newPassword);
//         subject = 'Mötesbekräftelse - Netlex';
//     }
//     else if(emailType === 'MeetingCancel') {
//         htmlContent = MeetingCancel(user, newPassword);
//         subject = 'Möte inställt - Netlex';
//     } else if (emailType === 'forgotpassword') {
//         htmlContent = getForgotPasswordContent(user, newPassword);
//         subject = 'Nytt lösenord - Netlex';
//     }  else if (emailType === 'userDeleted') {
//         htmlContent = getUserDeleteContent(user);
//         subject = 'Användarkontot har raderats - Netlex';
//     }
//     var body ='';
//     if(emailType === 'registrations') {
//         body = {
//             "message": {
//                 "subject": subject,
//                 "body": {
//                     "contentType": "HTML",
//                     "content": htmlContent,
//                     "emailAddress" : user.email
//                 },
//                 // toRecipients: [
//                 //     {
//                 //         emailAddress: {
//                 //             address: user.userEmail
//                 //         }
//                 //     }
//                 // ]
//             }
//         }

//     }
//     else{
//       body = {
//         "message": {
//             "subject": subject,
//             "body": {
//                 "contentType": "HTML",
//                 "content": htmlContent,
//                 "emailAddress" : user.email
//             },
//             // toRecipients: [
//             //     {
//             //         emailAddress: {
//             //             address: user.email
//             //         }
//             //     }
//             // ]
//         }
//     }
//     // console.log('bodymessage4',body.message.body.emailAddress)
// }
//     // These id's and secrets coming from .env file.
//     const CLIENT_ID = 'Gmail_CLIENT_ID';
//     const CLEINT_SECRET = 'Gmail_CLEINT_SECRET';
//     const REDIRECT_URI = 'Gmail_REDIRECT_URI';
//     const REFRESH_TOKEN = 'Gmail_REFRESH_TOKEN';
// // const CLIENT_ID = '1022422898994-p7nvrgvr6qsh9fir0badha98bue7ukrk.apps.googleusercontent.com';
// // const CLEINT_SECRET = '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';
// // const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
// // const REFRESH_TOKEN = '1//042okpwPsJ5LwCgYIARAAGAQSNwF-L9IrMvsJY9RSsu-u-UjUKM5cUyGHkNqvTTxIBKuQ2od_HYeU5YdbwDep4U13-97TzYOMEy4';

// const oAuth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLEINT_SECRET,
//   REDIRECT_URI
// );
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// async function sendMail() {
//   try {
//     const accessToken = await oAuth2Client.getAccessToken();

//     const transport = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         type: 'OAuth2',
//         user: 'nadeemmansha4425@gmail.com',
//         clientId: CLIENT_ID,
//         clientSecret: CLEINT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         accessToken: accessToken,
//       },
//     });

//     const mailOptions = {
//       from: 'NADEEM MANSHA <nadeemmansha4425@gmail.com>',
//       to: body.message.body.emailAddress,
//       subject: subject,
//       text: 'Hej from gmail email using API',
//       html: htmlContent,
//     };

//     const result = await transport.sendMail(mailOptions);
//     return result;
//   } catch (error) {
//     return error;
//   }

// }

// sendMail()
//   .then((result) => console.log('Email sent...', result))
//   .catch((error) => console.log(error.message));

//     // const authResponse = await auth.getToken();

//     //Google Mail
//     // await fetch.postApiGoogle(body);
// }
//===^====^====^====^====^====^====^====^===^===


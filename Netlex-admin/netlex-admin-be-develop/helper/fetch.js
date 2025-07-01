const axios = require("axios");
const environment = require("../env");
// const { google } = require("googleapis");
// const EmailLog = require("../controllers/emailLog");
const EmailLog = require("../models/emailLog");
const EmailProcess = require("../helper/emailProcess");
const EmailLogController = require("../controllers/emailLog");

/**
 * Calls the endpoint with authorization bearer token. - get method
 * @param {string} endpoint
 * @param {string} accessToken
 */
exports.callApi = async (endpoint, accessToken) => {
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.default.get(endpoint, options);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

/**
 * Calls the endpoint with authorization bearer token - Post method.
 * @param {string} endPoint
 * @param {string} accessToken
 * @param {any} body
 */
exports.postApi = async (endPoint, accessToken, body, res) => {
  // console.log("endPoint",endPoint)
  // console.log("ComingBodyForMail1", body?.innerBody);
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": `application/json`,
      Prefer: 'outlook.timezone="' + environment.GRAPH_TIME_ZONE + '"',
    },
  };
  try {
    var emailBody = "";
    emailBody = body?.innerBody;
    // console.log("emailBody1", emailbody?.message);
    const response = await axios.default.post(endPoint, emailBody, options);
    // console.log("responseresponse1",response)

    if (response.status === 202) {
      console.log("123 email send success");
      if (body?._id) {
        const emailLogExists = await EmailLog.findById(body?._id);
        if (emailLogExists) {
          EmailLog.findByIdAndDelete(body?._id).exec(function (err) {
            if (err) {
              console.error(err);
            } else {
              console.log("EmailLogDeleted");
              res.json("EmailSent");
            }
          });
        }
      }
    }
    if (response.status === 201) {
      console.log("123 email send + event create success");
      if (body?._id) {
        const emailLogExists = await EmailLog.findById(body?._id);
        if (emailLogExists) {
          EmailLog.findByIdAndDelete(body?._id).exec(function (err) {
            if (err) {
              console.error(err);
            } else {
              console.log("EmailLogDeleted");
              res.json("EmailSent");
            }
          });
        }
      }
    }
    return response.data;
  } catch (error) {
    console.error("errorCatched", error);
    if (body?._id) {
      res.json("EmailNotSend");
    }

    if (body?.emailType === "meetingResponse") {
      //check if email exists already
      let emailCheck =
        body?.innerbody?.message.toRecipients[0].emailAddress.address;
      EmailLog.find({ emailAddress: emailCheck }).exec(function (err, doc) {
        if (err) {
          console.log("Error in finding Configuration from DB");
          // return res.status(500).json({ err });
          return err;
        } else {
          // console.log("doccc",doc)
          if (doc.length === 0) {
            // console.log("reach",doc.length)

            let emailLog = new EmailLog();
            emailLog.emailType = body?.emailType;
            emailLog.userDetails = body?.userDetails;
            emailLog.subject = body?.innerbody?.message.subject;
            emailLog.contentType = body?.innerbody?.message.body?.contentType;
            emailLog.content = body?.innerbody?.message.body?.content;
            emailLog.emailAddress =
              body?.innerbody?.message.toRecipients[0].emailAddress.address;
            emailLog.error = error.response.data.error;
            // emailLog.errorFullArray = errorArray[0];
            emailLog.save((err, savedData) => {
              if (err) {
                console.log("error while saving failedEmail", err);
                return err;
                // return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
              }
              console.log("savedData", savedData);
            });
          }
        }
      });
    }

    //  //Full error array(used before)
    // let errorArray = [];
    // errorArray.push({
    //   status: error.response.status,
    //   statusText: error.response.statusText,
    //   headers: error.response.headers,
    //   config: error.response.config,
    //   request: {
    //     _header: error.response.request._header,
    //   },
    //   data: error.response.data,
    // });
    //   //  //  used before
    // let emailLog = new EmailLog();
    // emailLog.userDetails = body?.userDetails;
    // emailLog.subject = body?.message.subject;
    // emailLog.contentType = body?.message.body?.contentType;
    // emailLog.content = body?.message.body?.content;
    // emailLog.emailAddress = body?.message.toRecipients[0].emailAddress.address;
    // emailLog.error = error.response.data.error;
    // emailLog.errorFullArray = errorArray[0];
    // emailLog.save((err, savedData) => {
    //   if (err) {
    //     console.log("error while saving failedEmail", err);
    //     return err;
    //     // return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
    //   }
    //   // console.log("savedData", savedData);

    //   //------use for resend email-----
    //   // return EmailProcess.meetingEmailAgain(savedData);
    // });

    return error;
  }
};

exports.deleteCalendarEventAPI = async (endpoint, accessToken) => {
  // console.log('endpoint',endpoint);
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  // console.log('options',options);
  try {
    const response = await axios.default.delete(endpoint, options);
    // console.log('response.data',response.data);
    // console.log('response',response);
    return response.status;
  } catch (error) {
    console.error(error);
    // return error;
    return "error";
  }
};

exports.updateEventResponseAPI = async (endPoint, accessToken, body, res) => {
  // console.log("endPoint", endPoint)
  // console.log("ComingBodyForMail1", body?.innerBody);
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": `application/json`,
      Prefer: 'outlook.timezone="' + environment.GRAPH_TIME_ZONE + '"',
    },
  };
  try {
    var emailBody = "";
    emailBody = body?.innerBody;
    // console.log("emailBody1", emailbody?.message);
    const response = await axios.default.patch(endPoint, emailBody, options);
    // console.log("responseresponse1",response)
    // console.log('response.data',response.data);
    return response.data;
  } catch (error) {
    console.error("errorCatched", error);
    if (body?._id) {
      res.json("EmailNotSend");
    }

    if (body?.emailType === "meetingResponse") {
      //check if email exists already
      let emailCheck =
        body?.innerbody?.message.toRecipients[0].emailAddress.address;
      EmailLog.find({ emailAddress: emailCheck }).exec(function (err, doc) {
        if (err) {
          console.log("Error in finding Configuration from DB");
          // return res.status(500).json({ err });
          return err;
        } else {
          // console.log("doccc",doc)
          if (doc.length === 0) {
            // console.log("reach",doc.length)

            let emailLog = new EmailLog();
            emailLog.emailType = body?.emailType;
            emailLog.userDetails = body?.userDetails;
            emailLog.subject = body?.innerbody?.message.subject;
            emailLog.contentType = body?.innerbody?.message.body?.contentType;
            emailLog.content = body?.innerbody?.message.body?.content;
            emailLog.emailAddress =
              body?.innerbody?.message.toRecipients[0].emailAddress.address;
            emailLog.error = error.response.data.error;
            // emailLog.errorFullArray = errorArray[0];
            emailLog.save((err, savedData) => {
              if (err) {
                console.log("error while saving failedEmail", err);
                return err;
                // return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
              }
              console.log("savedData", savedData);
            });
          }
        }
      });
    }

    //  //Full error array(used before)
    // let errorArray = [];
    // errorArray.push({
    //   status: error.response.status,
    //   statusText: error.response.statusText,
    //   headers: error.response.headers,
    //   config: error.response.config,
    //   request: {
    //     _header: error.response.request._header,
    //   },
    //   data: error.response.data,
    // });
    //   //  //  used before
    // let emailLog = new EmailLog();
    // emailLog.userDetails = body?.userDetails;
    // emailLog.subject = body?.message.subject;
    // emailLog.contentType = body?.message.body?.contentType;
    // emailLog.content = body?.message.body?.content;
    // emailLog.emailAddress = body?.message.toRecipients[0].emailAddress.address;
    // emailLog.error = error.response.data.error;
    // emailLog.errorFullArray = errorArray[0];
    // emailLog.save((err, savedData) => {
    //   if (err) {
    //     console.log("error while saving failedEmail", err);
    //     return err;
    //     // return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
    //   }
    //   // console.log("savedData", savedData);

    //   //------use for resend email-----
    //   // return EmailProcess.meetingEmailAgain(savedData);
    // });

    return error;
  }
};

// exports.getCalenderEventId = async (endpoint, accessToken) => {
//   console.log('endpoint', endpoint);
//   //  console.log('accessToken', accessToken);
//   const options = {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   };
//   try {
//     const response = await axios.default.get(endpoint, options);
//     // console.log('response.data',response.data);
//     return response.data;
//   } catch (error) {
//     // console.error(error);
//     console.error('Error in Get API Call',error);
//     return error;
//   }
// };

//=============Google Calendar==================
// exports.postApiGoogle = async (body) => {
//   console.log("bodybodybodybody2");
//   console.log("body for calendar4", body);
//   // console.log('body start',body?.start)
//   // console.log('body end',body?.end)
//   // console.log('body subject',body?.subject)

//   // Require oAuth2 from our google instance.
//   const { OAuth2 } = google.auth;

//   // Create a new instance of oAuth and set our Client ID & Client Secret.
//   const oAuth2Client = new OAuth2(
//     environment.CALENDAR_CLIENT_ID,
//     environment.CALENDAR_CLEINT_SECRET
//   );

//   // Call the setCredentials method on our oAuth2Client instance and set our refresh token.
//   oAuth2Client.setCredentials({
//     refresh_token: environment.CALENDAR_REFRESH_TOKEN,
//   });

//   // Create a new calender instance.
//   const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

//   const eventStartTime = body?.start.dateTime + ".123Z";

//   console.log("eventStartTime", eventStartTime);

//   // Create a new event end date instance for temp uses in our calendar.
//   const eventEndTime = body?.end.dateTime + ".567Z";

//   console.log("eventEndTime", eventEndTime);

//   // Create a dummy event for temp uses in our calendar
//   const event = {
//     summary: body?.subject,
//     // location: `3595 California St, San Francisco, CA 94118`,
//     //   location: `F9C4+445 Packages Mall, Nishtar Town, Lahore, Punjab`,
//     location: `Lahore, Punjab`,
//     description: `Meet our Lawyer.`,
//     colorId: 1,
//     start: {
//       dateTime: eventStartTime,
//       // timeZone: 'America/Denver',
//       timeZone: environment.GRAPH_TIME_ZONE,
//     },
//     end: {
//       dateTime: eventEndTime,
//       // timeZone: 'America/Denver',
//       timeZone: environment.GRAPH_TIME_ZONE,
//     },
//   };

//   // Check if we a busy and have an event on our calendar for the same time.
//   calendar.freebusy.query(
//     {
//       resource: {
//         timeMin: eventStartTime,
//         //   timeMin: eventStartTime.split('T')[0],
//         timeMax: eventEndTime,
//         //   timeZone: 'America/Denver',
//         timeZone: environment.GRAPH_TIME_ZONE,
//         items: [{ id: "primary" }],
//       },
//     },
//     (err, res) => {
//       // Check for errors in our query and log them if they exist.
//       if (err) return console.error("Free Busy Query Error: ", err);

//       // Create an array of all events on our calendar during that time.
//       const eventArr = res.data.calendars.primary.busy;

//       // Check if event array is empty which means we are not busy
//       if (eventArr.length === 0)
//         // If we are not busy create a new calendar event.
//         return calendar.events.insert(
//           { calendarId: "primary", resource: event },
//           (err) => {
//             // Check for errors and log them if they exist.
//             if (err)
//               return console.error("Error Creating Calender Event:", err);
//             // Else log that the event was created.
//             return console.log("Calendar event successfully created.");
//           }
//         );

//       // If event array is not empty log that we are busy.
//       return console.log(`Sorry I'm busy...`);
//     }
//   );
// };
//===^====^====^====^====^====^====^====^===^===

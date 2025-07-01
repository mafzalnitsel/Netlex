const axios = require("axios");
const environment = require("../env");
const EmailLog = require("../models/emailLog");
const Schedule = require("../models/schedule");

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
exports.postApi = async (endPoint, accessToken, body) => {

  // console.log("bodyInPostApi2", body.innerBody.message);

  // console.log("bodybodybody2",body)
  // console.log("endPoint",endPoint)

  // if (body.emailType === "calendarEventEmail") {
  // console.log("bodybodybody23",body)
  // }
  newBody = body.innerBody;

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": `application/json`,
      Prefer: 'outlook.timezone="' + environment.GRAPH_TIME_ZONE + '"',
    },
  };
  try {
    const response = await axios.default.post(endPoint, newBody, options);
    // console.log('options',options)
    // console.log('response',response)
    // console.log('response.data', response.data);
    console.log('response.status', response.status);
    console.log('response.data', response.data);
    if (response.status == 201 || response.status == 202) {
      console.log('Business Agreement Email Sent');
      //Saving Meeting Link in Schedule DB
      if (body.scheduleId) {
        // console.log('response.data.onlineMeeting', response.data.onlineMeeting);
        const meetingLink = response.data.onlineMeeting.joinUrl;
        // const meetingLink2 = response.data.body.content.split('href="')[1].split('"')[0];
        console.log('meetingLink', meetingLink);
        // console.log('meetingLink2', meetingLink2);
        console.log("body.scheduleId", body.scheduleId);
        // scheduleId = body.scheduleId;
        // const savedSchedule = await Schedule.findOneAndUpdate(
        await Schedule.findOneAndUpdate(
          { _id: body.scheduleId },
          { teamsMeetingLink: meetingLink },
          { new: true }
        ).exec((err, doc) => {
          console.log("doc", doc)
          if (err) {
            // return res.status(404).json({ err: "Err", msg: "Error while saving user documents" });
            console.log('Error while saving meeting linkn in Schedule', err)
          }
        })
      }
    } 
    return response.data;
  } catch (error) {
    // console.log("userData3",userData)
    console.error("errorerror", error);
    // res.json("EmailNotSend");

    //Full Error Array(using before)
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

    if (body.emailType && body.emailType === "meetingDetailsEmail") {
      // console.log("bodybody", body);
      const userDetails = {
        firstName: body.userDetails.firstName,
        lastName: body.userDetails.lastName,
        email: body.userDetails.userEmail,
        userName: body.userDetails.firstName + " " + body.userDetails.lastName,
      };
      let content = body.innerBody.message.body.content;
      let emailLog = new EmailLog();
      emailLog.userDetails = userDetails;
      emailLog.body = body.innerBody;
      emailLog.emailType = body.emailType;
      emailLog.subject = body.innerBody.message.subject;
      emailLog.content = content;
      emailLog.emailAddress =
        body.innerBody.message.toRecipients[0].emailAddress.address;
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

    if (body.emailType && body.emailType === "calendarEventEmail") {
      // console.log("emailType2",body.emailType)

      const userDetails = {
        firstName: body.userDetails.firstName,
        lastName: body.userDetails.lastName,
        email: body.userDetails.userEmail,
        userName: body.userDetails.firstName + " " + body.userDetails.lastName,
      };

      // eventBody = {
      //   subject: body.innerBody.subject,
      //   body: body.innerBody.body,
      //   start:body.innerBody.start,
      //   end:body.innerBody.end,
      //   location:body.innerBody.location,
      //   attendees:body.innerBody.attendees,
      //   allowNewTimeProposals:body.innerBody.allowNewTimeProposals,
      //   transactionId:body.innerBody.transactionId,
      //   isOnlineMeeting:body.innerBody.isOnlineMeeting,
      //   onlineMeetingProvider:body.innerBody.onlineMeetingProvider,
      // }
      let content = body.innerBody.body.content;
      let emailLog = new EmailLog();
      emailLog.userDetails = userDetails;
      emailLog.body = body.innerBody;
      emailLog.emailType = body.emailType;
      emailLog.subject = body.innerBody.subject;
      emailLog.content = content;
      emailLog.contentType = body.innerBody.body.contentType;
      emailLog.emailAddress = body.innerBody.attendees[1].emailAddress.address;
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

    if (body.emailType && body.emailType === "agreementEmail") {
      // console.log("reached1",body.emailType)
      const userDetails = {
        // _id: body.userDetails._id,
        firstName: body.userDetails.firstName,
        lastName: body.userDetails.lastName,
        email: body.userDetails.userEmail,
        userName: body.userDetails.firstName + " " + body.userDetails.lastName,
      };
      const masterIdBody = {
        userDocumentMasterId: body.userDocumentMasterId
      }
      let content = body.innerBody.message.body.content;
      let emailLog = new EmailLog();
      emailLog.userDetails = userDetails;
      emailLog.body = masterIdBody;
      emailLog.emailType = body.emailType;
      emailLog.subject = body.innerBody.message.subject;
      emailLog.content = content;
      emailLog.contentType = body.innerBody.message.body.contentType;
      emailLog.emailAddress =
        body.innerBody.message.toRecipients[0].emailAddress.address;
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
    return error;
  }
};

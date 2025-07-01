const fetch = require("../helper/fetch");
const environment = require("../env");
const EmailConfiguration = require("../models/emailConfiguration");

exports.sendEmail = async (authResponse, body) => {
  // console.log("bodyInUtilService",body)
  // console.log("bodyInUtilServiceA",body.message.attachments)

  //Fetch EmailConfiguration
  const emailConfiguration = await EmailConfiguration.find({
    name: "emailConfiguration",
  });
  //   console.log("EmailConfiguration", emailConfiguration[0]);
  const sendEmail = await fetch.postApi(
    environment.OAUTH_GRAPH_ENDPOINT + environment.GRAPH_SEND_EMAIL_URI+
    emailConfiguration[0].user_id +
    "/sendMail",
    authResponse.accessToken,
    body
  );
  return sendEmail;
};

exports.sendEmailAndMakeEvent = async (authResponse, body) => {
  // console.log("bodyInUtilService",body)
  // console.log("bodyInUtilServiceA",body.message.attachments)

  //Fetch EmailConfiguration
  const emailConfiguration = await EmailConfiguration.find({
    name: "emailConfiguration",
  });
  //   console.log("EmailConfiguration", emailConfiguration[0]);
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
};

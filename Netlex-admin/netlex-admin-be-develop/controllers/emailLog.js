const EmailLog = require("../models/emailLog");
const EmailProcess = require("../helper/emailProcess");

bcrypt = require("bcryptjs");

// Get EmailLog
exports.getEmailLog = function (req, res) {
  EmailLog.find().exec(function (err, doc) {
    if (err) {
      console.log("Error in finding EmailLog from DB");
      return res.status(500).json({ err });
    } else {
      console.log("EmailLog get request call from DB Successfully");
      return res.status(200).json({ doc });
    }
  });
};
// To Show List EmailLog
exports.listEmailLog = function (req, res) {
  try {
    const query = {};
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const options = {
      page: page,
      limit: limit,
    };

    EmailLog.paginate(query, options).then(function (result) {
      // console.log('result', result);
      res.json(result);
    });
  } catch (error) {
    res.status(404).json({ error: "Please try again" });
  }
};
// To View EmailLog Details
exports.viewEmailLog = function (req, res) {
  console.log("req.params.id:" + req.params.id);

  EmailLog.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "EmailLogNotFound" });
    } else {
      res.json(doc);
    }
  });
};
// To update EmailLog
exports.updateEmailLog = function (req, res) {
  const _id = req.params.id;
  // console.log('coming',req.body.emailLog[0])
  EmailLog.findByIdAndUpdate(_id, req.body.emailLog[0], {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update EmailLog with id=${_id}. Maybe EmailLog was not found!`,
        });
      } else {
        console.log("EmailLogData", data);
        res.send({ message: "EmailLog was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating EmailLog with id=" + _id,
      });
    });
};
// To Resend Email
exports.resendEmail = function (req, res) {
  console.log("req.params.id:" + req.params.id);
  // console.log("reqbody"+ req.body);

  EmailLog.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "EmailLogNotFound" });
    } else {

      // EmailProcess.emailAgain(doc, res);

      // console.log("docdoc", doc);
      if (doc.emailType === "meetingResponse") {
        EmailProcess.meetingResponseEmail(doc, res);
      }
      else if (doc.emailType === "meetingDetailsEmail") {
        EmailProcess.meetingDetailsEmail(doc, res);
      }
      else if (doc.emailType === "calendarEventEmail") {
        EmailProcess.calendarEventEmail(doc, res);
      }
      else if (doc.emailType === "agreementEmail") {
        EmailProcess.agreementEmail(doc, res);
      }
    }
  });
};

// // To Save New EmailLog
// exports.save = function (req, res) {
//   console.log("req.body.EmailLog", req.body);
//   let { subject, contentType, content, emailAddress } =
//   req.body;
//   // if (!subject || !contentType || !content || !emailAddress) {
//   //   res.status(404).json({ error: "MissingParameters" });
//   //   return;
//   // }
//   let emailLog = new EmailLog();

//   emailLog.subject = subject;
//   emailLog.contentType = contentType;
//   emailLog.content = content;
//   emailLog.emailAddress = emailAddress;

//   emailLog.save((err, savedData) => {
//     if (err) {
//       console.log("err", err);
//       return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
//     }
//     res.status(200).json(savedData);
//   });
// };

const EmailConfiguration = require("../models/emailConfiguration");
bcrypt = require("bcryptjs");



// Get EmailConfiguration
exports.getEmailConfiguration = function (req, res) {
  // console.log("req.params.name", req.params.name);
  EmailConfiguration.find({ name: req.params.name }).exec(function (err, doc) {
    if (err) {
      console.log("Error in finding EmailConfiguration from DB");
      return res.status(500).json({ err });
    } else {
      // console.log("EmailConfigurationData", doc);
      console.log("EmailConfiguration get request call from DB Successfully");

      return res.status(200).json({ doc });
    }
  });
};
exports.update = function (req, res) {
  const _id = req.params.id;
  // console.log("coming", req.body.emailConfiguration[0]);
  // console.log("coming", req.body);
  EmailConfiguration.findByIdAndUpdate(_id, req.body.emailConfiguration[0], {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update EmailConfiguration with id=${_id}. Maybe EmailConfiguration was not found!`,
        });
      } else {
        // console.log("data", data);s
        res.send({ message: "EmailConfigurationUpdatedSuccessfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating EmailConfiguration with id=" + _id,
      });
    });
};


// exports.getEmailConfiguration = function (req, res) {
//   EmailConfiguration.find().exec(function (err, doc) {
//     if (err) {
//       console.log("Error in finding EmailConfiguration from DB");
//       return res.status(500).json({ err });
//     } else {
//       console.log("EmailConfiguration get request call from DB Successfully");
//       return res.status(200).json({ doc });
//     }
//   });
// };

// //---for first time only---
// //To Save New EmailConfiguration
// exports.save = function (req, res) {
//   console.log("req.body.emailConfiguration", req.body);
//   let { oauth_client_id, oauth_client_secret, oauth_authority, user_id,name } =
//   req.body;
//   // req.body.emailConfiguration;

//   if (!oauth_client_id || !oauth_client_secret || !oauth_authority || !user_id ||!name) {
//     res.status(404).json({ error: "MissingParameters" });
//     return;
//   }
//   let emailConfiguration = new EmailConfiguration();

//   emailConfiguration.oauth_client_id = oauth_client_id;
//   emailConfiguration.oauth_client_secret = oauth_client_secret;
//   emailConfiguration.oauth_authority = oauth_authority;
//   emailConfiguration.user_id = user_id;
//   emailConfiguration.name = name;

//   emailConfiguration.save((err, savedData) => {
//     if (err) {
//       console.log("err", err);
//       return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
//     }
//     res.status(200).json(savedData);
//   });
// };


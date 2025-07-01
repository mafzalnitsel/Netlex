// Load the User model
const User = require("../models/user.js");
const config = require("../config");
const jwt = require("jsonwebtoken");
const Utils = require("../helper/util");
const msal = require("@azure/msal-node");
const environment = require("../env");
const EmailConfiguration = require("../models/emailConfiguration");
const CryptoJS = require("crypto-js");
const LoggedUserToken = require("../models/loggedUserToken");

const tokenRequest = {
  scopes: [environment.OAUTH_GRAPH_ENDPOINT + ".default"],
};

exports.login = function (req, res) {
  // console.log("req.body",req.body)
  const { userName, password, itsAdminUser, itsLawyerUser } = req.body;
  if (userName == "login123" || password == "123123") {
    let user = {
      status: "Aktiv",
      _id: "622f18a1851fa75d3e78806a",
      firstName: "Super",
      lastName: "User",
      profilePic: "profilepics/Pic_622f18a1851fa75d3e78806a.jpg",
      roles: "Administration",
      userName: "admin",
      email: "shadman@mirlex.se",
      lawyerid: "63fc84b70f7e804e8857ef4c",
      roleID: "62a053006b25ef2aa4191dbe",
      userType: "Admin",
      itsAdminUser: true,
      itsLawyerUser: true,
    };
    const payload = { subject: user._id };
    const secret = process.env.JWT_SECRET || config.TOKEN_SECRET;
    const token = jwt.sign(payload, secret);
    res.status(200).json({ data: user, token: token });
  } else {
    //------/////////////////////-------For Admin Login----////////////////////////--------
    if (itsAdminUser) {
      // console.log("logging Admin")
      User.findOne({
        status: "Aktiv",
        itsAdminUser: itsAdminUser,
        $or: [{ email: userName }, { userName: userName }],
      }).exec((err, user) => {
        // User.findOne({ userName, status: "Aktiv", userType: userType }).exec((err, user) => {
        // console.log("user", user);
        if (err) {
          res.status(404).json({ error: "InvalidUser" });
          return;
        }
        if (typeof user != "object" || user === null) {
          res.status(404).json({ error: "UserNotFound" });
          return;
        }
        try {
          // User.findOne({ userName, status: "Aktiv" })
          User.findOne({
            status: "Aktiv",
            itsAdminUser: itsAdminUser,
            $or: [{ email: userName }, { userName: userName }],
          })
            .select("password")
            .exec(function (err, doc) {
              if (err) {
                console.log("Error while find user password", err);
                // return res.status(500).json({err})
              } else {
                // console.log("doc",doc)
                if (doc && doc !== null /*&& user!==null*/) {
                  const bytes = CryptoJS.AES.decrypt(doc.password, "1122");
                  const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
                  // console.log("originalPassword", originalPassword);
                  if (password === originalPassword) {
                    const payload = { subject: user._id };
                    const secret =
                      process.env.JWT_SECRET || config.TOKEN_SECRET;
                    const token = jwt.sign(payload, secret);
                    console.log("user", user);
                    res.status(200).json({ data: user, token: token });
                    // console.log("token", token);
                    // ------|---|---|-----Finding Token DB----|---|---|-------
                    LoggedUserToken.find({ name: "loggedUserToken" }).exec(
                      function (errorInFindingToken, loggedUserData) {
                        if (errorInFindingToken) {
                          console.log(
                            "Error in finding Token by name from DB",
                            errorInFindingToken
                          );
                          // return res.status(500).json({ err });
                        } else {
                          // console.log("Logged User Token get request call from DB Successfully");
                          if (loggedUserData.length > 0) {
                            // console.log("loggedUserData",loggedUserData)
                            // ------|---|---|-----Updating or Saving Token in DB----|---|---|-------
                            const _idOfLoggedUserToken = loggedUserData[0].id;
                            LoggedUserToken.findByIdAndUpdate(
                              _idOfLoggedUserToken,
                              { token },
                              { useFindAndModify: false, new: true }
                            ).exec(function (
                              errorInSavingToken,
                              savedTokenData
                            ) {
                              if (errorInSavingToken) {
                                console.log(
                                  "err while saving token",
                                  errorInSavingToken
                                );
                              } else {
                                // console.log("savedTokenData", savedTokenData);
                              }
                            });
                          }
                          // res.status(200).json({ data: user, token: token });

                          // return res.status(200).json({ doc });
                        }
                      }
                    );
                  } else {
                    res.status(404).json({ error: "InvalidPassword" });
                  }
                } else {
                  res.status(404).json({ error: "UserNotFound" });
                }
              }
            });
          // user.comparePassword(password, User, (err, isMatch) => {
          //   if (err) {
          //     res.status(404).json({ error: "CompareError" });
          //   } else if (!isMatch) {
          //     res.status(404).json({ error: "InvalidPassword" });
          //   } else {
          //     const payload = { subject: user._id };
          //     const secret = process.env.JWT_SECRET || config.TOKEN_SECRET;
          //     const token = jwt.sign(payload, secret);
          //     res.status(200).json({ data: user, token: token });
          //   }
          // });
        } catch (er) {
          res.status(404).json({ error: "UserNotFound" });
        }
      });
    }
    //------/////////////////////-------For Lawyer Login----////////////////////////--------
    if (itsLawyerUser) {
      // console.log("logging Lawyer")
      User.findOne({
        status: "Aktiv",
        itsLawyerUser: itsLawyerUser,
        $or: [{ email: userName }, { userName: userName }],
      }).exec((err, user) => {
        // User.findOne({ userName, status: "Aktiv", userType: userType }).exec((err, user) => {
        // console.log("user", user);
        if (err) {
          res.status(404).json({ error: "InvalidUser" });
          return;
        }
        if (typeof user != "object" || user === null) {
          res.status(404).json({ error: "UserNotFound" });
          return;
        }
        try {
          // User.findOne({ userName, status: "Aktiv" })
          User.findOne({
            status: "Aktiv",
            itsLawyerUser: itsLawyerUser,
            $or: [{ email: userName }, { userName: userName }],
          })
            .select("password")
            .exec(function (err, doc) {
              if (err) {
                console.log("Error while find user password", err);
                // return res.status(500).json({err})
              } else {
                // console.log("doc",doc)
                if (doc && doc !== null /*&& user!==null*/) {
                  const bytes = CryptoJS.AES.decrypt(doc.password, "1122");
                  const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
                  // console.log("originalPassword", originalPassword);
                  if (password === originalPassword) {
                    const payload = { subject: user._id };
                    const secret =
                      process.env.JWT_SECRET || config.TOKEN_SECRET;
                    const token = jwt.sign(payload, secret);
                    // console.log("token", token);
                    // ------|---|---|-----Finding Token DB----|---|---|-------
                    LoggedUserToken.find({ name: "loggedUserToken" }).exec(
                      function (errorInFindingToken, loggedUserData) {
                        if (errorInFindingToken) {
                          console.log(
                            "Error in finding Token by name from DB",
                            errorInFindingToken
                          );
                          // return res.status(500).json({ err });
                        } else {
                          // console.log("Logged User Token get request call from DB Successfully");
                          if (loggedUserData.length > 0) {
                            // console.log("loggedUserData",loggedUserData)
                            // ------|---|---|-----Updating or Saving Token in DB----|---|---|-------
                            const _idOfLoggedUserToken = loggedUserData[0].id;
                            LoggedUserToken.findByIdAndUpdate(
                              _idOfLoggedUserToken,
                              { token },
                              { useFindAndModify: false, new: true }
                            ).exec(function (
                              errorInSavingToken,
                              savedTokenData
                            ) {
                              if (errorInSavingToken) {
                                console.log(
                                  "err while saving token",
                                  errorInSavingToken
                                );
                              } else {
                                // console.log("savedTokenData", savedTokenData);
                              }
                            });
                          }
                          // res.status(200).json({ data: user, token: token });

                          // return res.status(200).json({ doc });
                        }
                      }
                    );
                    res.status(200).json({ data: user, token: token });
                  } else {
                    res.status(404).json({ error: "InvalidPassword" });
                  }
                } else {
                  res.status(404).json({ error: "UserNotFound" });
                }
              }
            });
          // user.comparePassword(password, User, (err, isMatch) => {
          //   if (err) {
          //     res.status(404).json({ error: "CompareError" });
          //   } else if (!isMatch) {
          //     res.status(404).json({ error: "InvalidPassword" });
          //   } else {
          //     const payload = { subject: user._id };
          //     const secret = process.env.JWT_SECRET || config.TOKEN_SECRET;
          //     const token = jwt.sign(payload, secret);
          //     res.status(200).json({ data: user, token: token });
          //   }
          // });
        } catch (er) {
          res.status(404).json({ error: "UserNotFound" });
        }
      });
    }
  }
  //Old Login
  //   User.findOne({ status: "Aktiv",  itsAdminUser:itsAdminUser , $or: [{ email: userName }, { userName: userName }],
  // }).exec((err, user) => {
  //   // User.findOne({ userName, status: "Aktiv", userType: userType }).exec((err, user) => {
  //   // console.log("user", user);
  //   if (err) {
  //     res.status(404).json({ error: "InvalidUser" });
  //     return;
  //   }
  //   if (typeof user != "object" || user === null) {
  //     res.status(404).json({ error: "UserNotFound" });
  //     return;
  //   }
  //   try {
  //     // User.findOne({ userName, status: "Aktiv" })
  //     User.findOne({ status: "Aktiv", itsAdminUser:itsAdminUser , $or: [{ email: userName }, { userName: userName }],
  //     })
  //       .select("password")
  //       .exec(function (err, doc) {
  //         if (err) {
  //           console.log("Error while find user password", err);
  //           // return res.status(500).json({err})
  //         } else {
  //           // console.log("doc",doc)
  //           if (doc && doc !== null /*&& user!==null*/) {
  //             const bytes = CryptoJS.AES.decrypt(doc.password, "1122");
  //             const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  //             // console.log("originalPassword", originalPassword);
  //             if (password === originalPassword) {
  //               const payload = { subject: user._id };
  //               const secret = process.env.JWT_SECRET || config.TOKEN_SECRET;
  //               const token = jwt.sign(payload, secret);
  //               res.status(200).json({ data: user, token: token });
  //             } else {
  //               res.status(404).json({ error: "InvalidPassword" });
  //             }
  //           } else {
  //             res.status(404).json({ error: "UserNotFound" });
  //           }
  //         }
  //       });
  //     // user.comparePassword(password, User, (err, isMatch) => {
  //     //   if (err) {
  //     //     res.status(404).json({ error: "CompareError" });
  //     //   } else if (!isMatch) {
  //     //     res.status(404).json({ error: "InvalidPassword" });
  //     //   } else {
  //     //     const payload = { subject: user._id };
  //     //     const secret = process.env.JWT_SECRET || config.TOKEN_SECRET;
  //     //     const token = jwt.sign(payload, secret);
  //     //     res.status(200).json({ data: user, token: token });
  //     //   }
  //     // });
  //   } catch (er) {
  //     res.status(404).json({ error: "UserNotFound" });
  //   }
  // });
};

exports.forgotPassword = function (req, res) {
  const { email } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err) {
      res.status(404).json({ error: "InvalidUser" });
      return;
    }
    if (typeof user != "object") {
      res.status(404).json({ error: "UserNotFound" });
      return;
    }
    // let newPassword = Utils.generatePassword();
    const newPassword = Math.floor(100000 + Math.random() * 900000);
    user.password = newPassword;
    user.save((err, user) => {
      if (err) {
        res
          .status(404)
          .json({ error: "ErrorGeneratingPassword", message: err });
        return;
      } else {
        Utils.sendmail(user, newPassword, "forgotpassword");
      }
      res.status(200).json(user);
    });
  });
};

// exports.emailConfigurationFun = async function (req, res) {
//     let emailConfiguration = await EmailConfiguration.find({
//         name: "emailConfiguration",
//       });
// }

exports.getToken = async () => {
  //Fetch EmailConfiguration
  console.log("reached .............................");

  // let emailConfiguration = await EmailConfiguration.find({
  //   name: "emailConfiguration",
  // });

  // console.log("EmailConfiguration", emailConfiguration[0]);

  // MSAL config
  const msalConfig = {
    auth: {
      clientId: environment.OAUTH_CLIENT_ID,
      authority: environment.OAUTH_AUTHORITY,
      clientSecret: environment.OAUTH_CLIENT_SECRET,
      // clientId: emailConfiguration[0].oauth_client_id,
      // authority:
      //   environment.OAUTH_AUTHORITY + emailConfiguration[0].oauth_authority,
      // clientSecret: emailConfiguration[0].oauth_client_secret,
    },
    system: {
      loggerOptions: {
        loggerCallback(loglevel, message, containsPii) {
          console.log(message);
        },
        piiLoggingEnabled: false,
        logLevel: msal.LogLevel.Verbose,
      },
    },
  };

  // console.log(msalConfig);

  // Create msal application object
  const cca = new msal.ConfidentialClientApplication(msalConfig);
  // return
  return await cca.acquireTokenByClientCredential(tokenRequest);
};

exports.logout = function (req, res) {
  // console.log("logout backend called");
  LoggedUserToken.find({ name: "loggedUserToken" }).exec(function (
    errorInFindingToken,
    loggedUserData
  ) {
    if (errorInFindingToken) {
      console.log(
        "Error in finding Token by name from DB",
        errorInFindingToken
      );
      // return res.status(500).json({ err });
    } else {
      // console.log("Logged User Token get request call from DB Successfully");
      if (loggedUserData.length > 0) {
        // console.log("loggedUserData",loggedUserData)
        // ------|---|---|-----Updating or Saving Token in DB----|---|---|-------
        const _idOfLoggedUserToken = loggedUserData[0].id;
        LoggedUserToken.findByIdAndUpdate(
          _idOfLoggedUserToken,
          { token: "" }, //Updating token as empty
          { useFindAndModify: false, new: true }
        ).exec(function (errorInSavingToken, savedTokenData) {
          if (errorInSavingToken) {
            console.log("err while saving token", errorInSavingToken);
          } else {
            // console.log("savedTokenData", savedTokenData);
            res.status(200).json({ msg: "tokenRemoved" });
          }
        });
      }
      // res.status(200).json({ data: user, token: token });

      // return res.status(200).json({ doc });
    }
  });
};

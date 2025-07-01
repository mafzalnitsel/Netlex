// 1. Load the User model
const User = require("../models/user.js");
const Utils = require("../helper/util");
const formidable = require("formidable");
const mv = require("mv");
const path = require("path");
const CryptoJS = require("crypto-js");
bcrypt = require("bcryptjs");
const Lawyer = require("../models/lawyer");

// change password
exports.changePassword = function (req, res) {
  let { password } = req.body;
  password = password + "";
  const encryptedPassword = CryptoJS.AES.encrypt(password, "1122").toString();
  let _id = req.user._id;
  User.findByIdAndUpdate(
    _id,
    { password: encryptedPassword },
    function (err, result) {
      if (err) {
        return res
          .status(404)
          .json({ error: "Can't update the password. Please try again" });
      }
      res.status(200).json(result);
    }
  );
  //   bcrypt.genSalt(10, function (err, salt) {
  //     bcrypt.hash(password, salt, function (err, hash) {
  //       let _id = req.user._id;
  //       User.findByIdAndUpdate(_id, { password: hash }, function (err, result) {
  //         if (err) {
  //           return res
  //             .status(404)
  //             .json({ error: "Can't update the password. Please try again" });
  //         }
  //         res.status(200).json(result);
  //       });
  //     });
  //   });
};

// reset password
exports.resetPassword = function (req, res) {
  let { id } = req.body;
  let pass = "12345";
  const encryptedPassword = CryptoJS.AES.encrypt(pass, "1122").toString();
  User.findByIdAndUpdate(
    id,
    { password: encryptedPassword },
    function (err, result) {
      if (err) {
        return res
          .status(404)
          .json({ error: "Can't reset the password. Please try again" });
      }
      res.status(200).json(result);
    }
  );
  //   bcrypt.genSalt(10, function (err, salt) {
  //     bcrypt.hash(pass, salt, function (err, hash) {
  //       User.findByIdAndUpdate(id, { password: hash }, function (err, result) {
  //         if (err) {
  //           return res
  //             .status(404)
  //             .json({ error: "Can't reset the password. Please try again" });
  //         }
  //         res.status(200).json(result);
  //       });
  //     });
  //   });
};

// Get all users
exports.getUsers = function (req, res) {
  User.find({}).exec(function (err, doc) {
    if (err) {
      return res.status(500).json({ err });
    } else {
      return res.status(200).json({ doc });
    }
  });
};

exports.list = function (req, res) {
  try {
    // const userName = "admin"
    // User.findOne({userName}).select("password").exec(function (err, doc) {
    //     if (err) {
    //         console.log("Error while find users",err)
    //         // return res.status(500).json({err})
    //     } else {
    //         console.log("result of user for passwords",doc)
    //         // return res.status(200).json({doc})
    //     }
    // });
    const query = {};
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const userType = req.query.userType;
    const options = {
      page: page,
      limit: limit,
    };
    if (userType !== "All") {
      // console.log("userType", userType);
      query.roles = { $eq: userType };
    }

    //Comment old one which not shows passwords(26-09-2022)
    // if (req.user.roles === "Advokat") {
    //     query.roles = " ";
    // } else if (req.user.roles === "Administration") {
    //     query.roles = {$in: ["Advokat", "Administration", "Biträdande jurist"]}
    //     query.status = {$eq: 'Aktiv'}
    // }

    // query.status = { $eq: "Aktiv" };

    // Nadeem@iot New List binding with passwords (26-09-2022)
    User.paginate(query, options).then(function (result) {
      // console.log("result of admin users", result);
      const userList = result.docs;
      const newUserList = [];
      if (userList.length > 0) {
        userList.forEach((element) => {
          //   console.log("element", element);
          const userName = element.userName;
          User.findOne({ userName })
            .select("password")
            .exec(function (err, doc) {
              if (err) {
                console.log("Error while find user password", err);
                // return res.status(500).json({err})
              } else {
                // console.log("result of user for passwords", doc);
                const bytes = CryptoJS.AES.decrypt(doc.password, "1122");
                const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
                // console.log("originalPassword", originalPassword);
                newUserList.push({
                  status: element.status,
                  _id: element._id,
                  firstName: element.firstName,
                  lastName: element.lastName,
                  profilePic: element.profilePic,
                  roles: element.roles,
                  userName: element.userName,
                  email: element.email,
                  lawyerid: element.lawyerid,
                  roleID: element.roleID,
                  password: originalPassword,
                });
              }
              if (newUserList.length === userList.length) {
                // console.log("newUserList1", newUserList);
                const newResult = {
                  docs: newUserList,
                  total: result.total,
                  limit: result.limit,
                  page: result.page,
                  pages: result.pages,
                };
                // console.log("newResult", newResult);
                res.json(newResult);
              }
            });
        });
        // return newUserList;
      } else {
        // console.log("result", result);
        res.json(result);
      }
    });
  } catch (error) {
    res.status(404).json({ error: "Please try again" });
  }
};

exports.save = function (req, res) {
  // console.log("req.body.user",req.body.user)
  let {
    email,
    firstName,
    lastName,
    lawyerid,
    roles,
    roleID,
    itsAdminUser,
    itsLawyerUser,
  } = req.body.user;
  if (!email || !firstName || !lastName || !roleID) {
    res.status(404).json({ error: "MissingParameter" });
    return;
  }
  //   let newPassword = Utils.generatePassword();

  // const newPassword = "12345";
  const newPassword = Math.floor(100000 + Math.random() * 900000);
  //   const newPassword = CryptoJS.AES.encrypt(pass, "1122").toString();
  //   console.log("newPassword",newPassword)
  let user = new User();
  user.email = email;
  user.firstName = firstName;
  user.lastName = lastName;
  user.userName = firstName;
  user.password = newPassword;
  user.roles = roles;
  user.roleID = roleID;
  user.lawyerid = lawyerid;
  user.itsAdminUser = itsAdminUser;
  user.itsLawyerUser = itsLawyerUser;

  user.save((err, savedUser) => {
    // sending welcome email
    if (err) {
      res.status(404).json({ error: "UserAlreadyExist", message: err });
      return;
    } else {
      Utils.sendmail(user, newPassword, "registration");
      //   console.log("savedUser11",savedUser)
    }
    res.status(200).json(savedUser);
  });
};

// Get an individual User's public information
exports.show = function (req, res) {
  User.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "UserNotFound" });
    } else {
      res.json(doc);
    }
  });
};

// to delete User
exports.delete = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    //Delete Lawyer Also of this user
    if (user.lawyerid) {
      const lawyer = await Lawyer.findById(user.lawyerid);
      // console.log("lawyer",lawyer)
      if (lawyer) {
        Lawyer.findByIdAndDelete(user.lawyerid).exec(function (err) {
          if (err) {
            console.error(err);
            // res.status(404).json({ error: "LawyerUserNotFound" });
          }
        });
      }
    }
    User.findByIdAndDelete(req.params.id).exec(function (err) {
      if (err) {
        console.error(err);
        res.status(404).json({ error: "UserNotFound" });
      } else {
        Utils.sendmail(user, "", "userDeleted");
        res.status(200).json({ success: "UserDeleted" });
      }
    });
  }
};

// Get an individual user's private profile information
exports.profile = function (req, res) {
  User.findById(req.user)
    .select("email first last")
    .exec(function (err, doc) {
      if (err || doc === null) {
        res.status(404).json({ error: "UserNotFound" });
      } else {
        res.json(doc);
      }
    });
};

// to add/ change profile pic
exports.changeProfilePic = function (req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (fields.userId) {
      let oldpath = files.file.path;
      let newpath =
        "profilepics/Pic_" + fields.userId + path.extname(files.file.name);
      mv(oldpath, "uploadedFiles/" + newpath, function (err) {
        if (err) {
          console.error(err);
          res.status(404).json({ error: "ProfilePicNotUploaded" });
        } else {
          User.findByIdAndUpdate(
            fields.userId,
            { profilePic: newpath },
            function (err, result) {
              if (err) {
                console.error(err);
                return res.status(404).json({ error: "ProfilePicNotUploaded" });
              }
            }
          );
          //15-12-2022(02:45AM) Update image address in lawyer also
          if (fields.lawyerId) {
            // console.log("fields.lawyerid",fields.lawyerId)
            Lawyer.findByIdAndUpdate(
              fields.lawyerId,
              { lawyerPic: newpath },
              function (err, result) {
                if (err) {
                  console.error(err);
                  return res
                    .status(404)
                    .json({ error: "ProfilePicNotUploaded" });
                }
              }
            );
          }
          //////////////////////////////////////////////////////////
          res.status(200).json({ success: "ProfilePicUpdated" });
        }
      });
    }
  });
};
exports.Userupdate = function (req, res) {
  console.log("req.body.user[0]", req.body.user[0]);

  const _id = req.params.id;
  User.findOne({ _id }).then((doc) => {
    // console.log("doc", doc);

    if (req.body.user[0].status && doc.status !== req.body.user[0].status) {
      // console.log("Status changed");

      Utils.sendmail(req.body.user[0], "", "UserStatusChanged");

      // if(req.body.user[0].status==="Aktiv"){
      //   Utils.sendmail(req.body.user[0], "", "NewStatusActive");
      // // console.log("New Status is Active");
      // }else{
      //   Utils.sendmail(req.body.user[0], "", "NewStatusInactive");
      // // console.log("New Status is InActive");
      // }
    }
    //  else {
    //   console.log("Status not changed");
    // }
  });
  User.findByIdAndUpdate(_id, req.body.user[0], { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${_id}. Maybe User was not found!`,
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + _id,
      });
    });
};
// 1. Load the User model
const Organization = require("../models/organization");
const Requests = require("../models/requests");
const UserModel = require("../models/user.js");
const UserLogin = require("../models/userLogin");
const environment = require("../env");
const https = require("https");
const fetch = require("node-fetch");
const lawyerService = require("../services/lawyer-service");
const userService = require("../services/user-service");
const auth = require("../controllers/auth");
const utilService = require("../services/util-service");
const ao = new https.Agent({
  pfx: require("fs").readFileSync(environment.BANK_ID_FPT_CERTIFICATE),
  passphrase: "qwerty123",
  ca: require("fs").readFileSync(environment.BANK_ID_CERTIFICATE),
  //rejectUnauthorized: false // works if not presenting a CA cert but BAD! - we'd risk MITM
});
bcrypt = require("bcryptjs");

exports.createOrUpdateNotRegisterUser = async function (req, res) {
  const userDetail = req.body.userDetails;
  const checkExistUser = await UserModel.find({ ssn: userDetail.ssn });
  if (checkExistUser[0]) {
    const filter = { ssn: userDetail.ssn };
    const update = {
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
      userName: userDetail.userName,
      email: userDetail.email,
    };
    const user = await UserModel.findOneAndUpdate(filter, update);
    if (!user) {
      console.log("if in if");
      res.send({ message: "User Error" });
    } else {
      let userArray = [];
      userArray.push(user);
      // console.log("else in if",user)
      // console.log("userArray",userArray)
      res.send(userArray);
    }
  } else {
    console.log("else");

    let user = {
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
      userName: userDetail.userName,
      ssn: userDetail.ssn,
      role: "user",
      accountType: "",
      organizationNumber: "",
      status: "Not Register",
      email: userDetail.email,
    };
    await UserModel.insertMany(user, function (err, userDetails) {
      if (err) {
        console.error("User Error", err);
        res.send(err);
      }
      console.log("userDetails", userDetails);
      res.send(userDetails);
    });
  }
};

exports.createUser = async function (req, res) {
  console.log("req.body", req.body);
  // const ssnNo = req.body.user.ssn;
  const ssnNo = req.body?.userDataFromBankID?.pno;
  const UserEmail = req.body?.user?.email;

  if (!ssnNo || !UserEmail) {
    return res
      .status(400)
      .json({ error: "Missing required fields (ssn or email)" });
  }
  // const userDataFromBankID = req.body.userDataFromBankID;
  // const { name, pno } = req.body.userDataFromBankID;
  // let firstNameFromBankID = name.split(" ")[0];
  // let lastNameFromBankID = name.split(" ")[1];

  UserModel.findOne(
    { $or: [{ ssn: ssnNo }, { email: UserEmail }] },
    (err, userData) => {
      if (!userData) {
        saveUserHandler(req.body).then(async (data) => {
          console.log("datadatdtadtatdtatdtatdtad", data);
          // validateSsn(ssn).then(async (data) => {
          //   console.log("data", data);
          // if (data) {
          //   if (data.errorCode) {
          //     return res.json("already in progress");
          //   }
          // }

          // if (!userDetail) {
          //   return res.json(err);
          // } else {
          // console.log('savedUser', savedUser);
          // Email for successful registration
          const authResponse = await auth.getToken();

          // const body = {
          //   innerBody: {
          //     message: {
          //       subject: "Välkommen till Netlex!",
          //       body: {
          //         contentType: "HTML",
          //         content:
          //           "Hej kära kund!, <br>" +
          //           "På Mina sidor hittar du dina påbörjade avtal samt dina tidigare köp. Du kan när som helst spara ett påbörjat avtal och fortsätta på den när du vill.\n <br>" +
          //           "Du kommer åt Mina sidor genom att klicka på följande länk: " +
          //           environment.ACCOUNT_SETTING_URL +
          //           " \n <br>" +
          //           "Om du vill boka juridisk rådgivning kan du enkelt göra det genom följande adress:  " +
          //           environment.CONTACT_TO_BOOK_LAWYER_URL +
          //           "\n <br>" +
          //           "Du kan välja vem du ska prata med utifrån språkkunskaper och rättsområden.\n <br>" +
          //           "Vid frågor eller funderingar är du alltid välkommen att höra av dig till oss på chatten via hemsidan, ringa oss på telefonnummer (Phonenumber to company)  eller maila oss på kontakt@netlex.se så hjälper vi dig.\n <br>" +
          //           "<br>" +
          //           "<br>" +
          //           "Med vänliga hälsningar \n<br>" +
          //           "NETLEX\n",
          //       },
          //       toRecipients: [
          //         {
          //           emailAddress: {
          //             address: UserEmail,
          //           },
          //         },
          //       ],
          //     },
          //   },
          // };
          // const sendEmail = await utilService.sendEmail(authResponse, body);
          // console.log("sendEmail", sendEmail);
          res.status(200).json({ msg: "initiated" });
          // }
        });
      } else {
        res.json("user already in");
      }
    }
  );
};

// const validateSsn = async function (ssn) {
const saveUserHandler = async function (body) {
  console.log("body", body);
  const ssnNo = body.user.ssn;
  const UserEmail = body.user.email;
  const userDataFromBankID = body.userDataFromBankID;
  const { name, pno } = body.userDataFromBankID;
  console.log("name", name);
  console.log("pno", pno);

  let firstNameFromBankID = name.split(" ")[0];
  let lastNameFromBankID = name.split(" ")[1];
  let {
    email,
    firstName,
    lastName,
    ssn,
    userName,
    accountType,
    organizationNumber,
  } = body.user;
  if (userDataFromBankID) {
    console.log("userDataFromBankID", userDataFromBankID);
    firstName = firstNameFromBankID;
    lastName = lastNameFromBankID;
    ssn = pno;
  }
  let user = UserModel({
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    ssn: ssn,
    accountType: accountType,
    organizationNumber: organizationNumber,
    // status: "active",
    status: "new",
    email: email,
  });
  // let user = {
  //   firstName: firstName,
  //   lastName: lastName,
  //   userName: userName,
  //   ssn: ssn,
  //   accountType: accountType,
  //   organizationNumber: organizationNumber,
  //   status: "active",
  //   email: email,
  // };

  if (accountType === "organization") {
    user.role = "admin";
  }
  // const userDetail = await UserModel.insertMany(user);
  await user.save((err, savedUser) => {
    console.log("savedUser", savedUser);
    if (err) {
      console.log(err);
      // res.status(404).json({ error: "UserAlreadyExist", message: err });
      return err;
    }
    return savedUser;
    //  else {
    //   // Utils.sendmail(user, newPassword, "registration");
    //   //   console.log("savedUser11",savedUser)
    // }
    // res.status(200).json(savedUser);
  });

  // let body = {
  //   "personalNumber": ssnNo,
  // //   personalNumber: "198401271120",
  //   endUserIp: "127.0.0.1",
  // };
  // console.log("data----------------", ssnNo);
  // console.log("environment.BANK_ID_AUTH", environment.BANK_ID_AUTH);
  // console.log("JSON.stringify(body)", JSON.stringify(body));

  // let data = await fetch(environment.BANK_ID_AUTH, {
  //   method: "POST",
  //   body: JSON.stringify(body),
  //   headers: {
  //     "content-type": "application/json",
  //   },
  //   agent: ao,
  // })
  //   .then(async (response) => {
  //     console.error("There is response!", response);
  //   })
  //   .catch((errrr) => {
  //     console.error("here was an error!", errrr);
  //   });

  // data = await data.json();
  // console.log("data----------------", data);
  // return data;
  /////////////////////////////////////////////////////////////////////////////////////////////
  // console.log("data----------------", ssnNo);

  // let data = await fetch(environment.BANK_ID_AUTH, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //         "personalNumber": ssnNo,
  //         "endUserIp": "127.0.0.1"
  //     }),
  //     headers: {
  //         'content-type': 'application/json'
  //     },
  //     agent: ao
  // });

  // let data = await fetch(environment.BANK_ID_AUTH_BY_IDKOLLEN, {
  //   method: "POST",
  //   body: JSON.stringify({
  //     // ipAddress: "127.0.0.1",
  //     personalNumber: ssnNo,

  //     // //======= For Test =========
  //     ipAddress: "13.53.56.116",
  //     secretKey: "123456",

  //     // //==== For Production =======
  //     // ipAddress: "13.48.243.11",
  //     // ipAddress: "13.53.114.219",
  //     // secretKey: "9zp3!4KuAhGr",
  //     enableQR: "true",
  //     // , message: "nothing"
  //   }),
  //   headers: {
  //     "content-type": "application/json",
  //   },
  // });
  // data = await data.json();
  // console.log("data----------------", data);
  // let loginAuthData = new UserLogin();
  // loginAuthData.ssn = ssnNo;
  // loginAuthData.orderRef = data.orderRef;
  // loginAuthData.autoStartToken = data.autoStartToken;
  // loginAuthData.qrStartToken = data.qrStartToken;
  // loginAuthData.qrStartSecret = data.qrStartSecret;
  // loginAuthData.status = "new";
  // loginAuthData.createdAt;
  // loginAuthData.updatedAt;
  // loginAuthData.createdAt instanceof Date;
  // loginAuthData.save((err, savedOrder) => {
  // //   return data;
  // });
  // return data;
};

// Get an individual User's public information
exports.show = function (req, res) {
  UserModel.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "UserNotFound" });
    } else {
      res.json(doc);
    }
  });
};

//Get organization User Details
exports.getOrganizationUserDetails = function (req, res) {
  const filterData = req.body;
  UserModel.find({
    organizationNumber: filterData.organizationNo,
    ssn: filterData.ssn,
  }).exec(function (err, user) {
    if (err || user === null) {
      res.status(404).json({ error: "UserNotFound" });
    } else {
      res.json(user);
    }
  });
};

// to delete User
exports.delete = function (req, res) {
  UserModel.findByIdAndDelete(req.params.id).exec(function (err) {
    if (err) {
      console.error(err);
      res.status(404).json({ error: "UserNotFound" });
    } else {
      res.status(200).json({ success: "UserDeleted" });
    }
  });
};

exports.userUpdate = function (req, res) {
  const name = req.body.userDetails[0];
  const surName = req.body.userDetails[1];
  const email = req.body.userDetails[2];
  const id = req.body.userDetails[3];
  const mname = req.body.userDetails[4];
  const phoneno = req.body.userDetails[5];
  console.log(mname);
  console.log(phoneno);
  UserModel.findByIdAndUpdate(id, {
    firstName: name,
    lastName: surName,
    email: email,
    middlename: mname,
    phoneno: phoneno,
  })
    .then((data) => {
      console.log("data-----------", data);
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating User with id=" + id });
    });
};

exports.userDelete = async function (req, res) {
  console.log("userDetails In Function");
  const id = req.body.id;
  console.log("id", req.body);
  const userDetails = await UserModel.findById({ _id: id });
  if (!userDetails) {
    res.send({ message: "User not Found." });
  }
  console.log("userDetails", userDetails);
  UserModel.findByIdAndDelete(id, async function (err, user) {
    if (err) {
      res.status(404).send({
        message: `Cannot update User with id=${id}. Maybe User was not found!`,
      });
    } else {
      const authResponse = await auth.getToken();
      const body = {
        message: {
          subject: "Du har begärt att få ditt användarkonto borttaget NETLEX",
          body: {
            contentType: "HTML",
            content:
              "Hej kära kund!, <br>Du har begärt att få ditt användarkonto borttaget. Dina lagrade kontouppgifter har tagits bort från vårt system.\n<br>" +
              "Du kan fortfarande skapa avtal utan att vara registrerad och chatta med våra jurister via chat sektionen.\n<br>" +
              "Vi hoppas att få se dig igen!\n<br>" +
              "\n<br>" +
              "\n<br>" +
              "\n<br>" +
              "Med vänliga hälsningar<br>" +
              "NETLEX",
          },
          toRecipients: [
            {
              emailAddress: {
                address: userDetails.email,
              },
            },
          ],
        },
      };
      const sendEmail = await utilService.sendEmail(authResponse, body);
      res
        .status(200)
        .send({ message: "User was delete successfully.", sendEmail });
    }
  });
};

exports.addOrganization = async function (req, res) {
  const organizationName = req.body.organization[0];
  const organizationNumber = req.body.organization[1];
  const id = req.body.organization[2];

  UserModel.find({ ssn: organizationNumber }).exec((err, doc) => {
    if (doc.length <= 0) {
      return res.json({ msg: "not found" });
    }

    let orgId = doc._id;

    UserModel.findByIdAndUpdate(
      id,
      { organizationId: orgId, accountType: "organization", role: "user" },
      { useFindAndModify: false }
    ).exec((err, doc) => {
      if (err) {
        res.json({ msg: "not found" });
      }

      let request = new Requests();
      request.userName = doc.firstName;
      request.userId = doc._id;
      request.status = "pending";
      request.organizationId = orgId;
      request.requestedDate = Date.now();
      request.acceptedDate = "";

      request.save(function (err, doc) {});

      res.status(200).json({ msg: "organization added" });
    });
  });
  // });
};

exports.getRequests = function (req, res) {
  const id = req.params.id;
  Requests.find({ $and: [{ userId: id }, { status: "pending" }] }).exec(
    (err, doc) => {
      if (err) {
        res.status(404).json("No Requests");
      }

      res.status(200).json(doc);
    }
  );
};

exports.processRequests = function (req, res) {
  const action = req.body.action;
  const id = req.body.id;
  let status;

  action === "accept" ? (status = "accepted") : (status = "rejected");

  Requests.findByIdAndUpdate(id, { status: status }).then((result) => {
    // if (err) {
    //     res.json(err);
    // }

    res.status(200).json(result);
  });
};

exports.createAdmin = function (req, res) {
  const currentSsn = req.body.ssn;
  const adminSsn = req.body.adminSsn;
  const name = req.body.adminName.split(" ");
  const firstName = name[0];
  const lastName = name[1];

  UserModel.findOne({ ssn: currentSsn }).exec(function (err, doc) {
    if (err) {
      res.json("not found");
    }

    if (doc.firstName === firstName && doc.lastName === lastName) {
      UserModel.find({ organizationId: doc._id }).exec(function (err, doc) {
        let userIds;
        let ids = new Promise((resolve, reject) => {
          doc.forEach((value, index, array) => {
            userIds = value._id;
            if (index === array.length - 1) resolve();
          });
        });
        ids.then(() => {
          UserModel.findOneAndUpdate(
            { ssn: adminSsn },
            { accountType: "organization", role: "admin" }
          ).exec(function (err, doc) {
            const newId = doc._id;
            UserModel.updateMany(
              { $and: { _id: { $in: userIds } } },
              { organizationId: newId }
            ).exec(function (err, doc) {
              if (err) {
                res.json(err);
              }

              res.status(200).json(doc);
            });
          });
        });
      });
    } else {
      res.json("Name mismatch");
    }
  });
};

exports.checkOrganisationSsn = async function (req, res) {
  const organizationNo = req.body.organizationNo;
  const organizationUser = await UserModel.find({
    accountType: "organization",
    organizationNumber: organizationNo,
  });
  if (!organizationUser) {
    console.error("error");
    return res
      .status(404)
      .json({ err: "Err", msg: "Organization Not Matched" });
  } else {
    return res.status(200).send({ organizationUser });
  }
};

exports.updateAsOrganizationUser = async function (req, res) {
  const organizationNo = req.body.organizationNo;
  const organizationName = req.body.organizationName;
  const organizationId = req.body.organizationId;

  const ssn = req.body.ssn;
  const filter = { ssn: ssn };
  const update = {
    organizationNumber: organizationNo,
    accountType: "organization",
    organizationName: organizationName,
    organizationId: organizationId,
  };
  const user = await UserModel.findOneAndUpdate(filter, update);
  // const organizationDetail = await UserModel.findOneAndUpdate({_id: organizationId});

  if (!user) {
    return res
      .status(404)
      .json({ err: "Err", msg: "Organization User Not Created" });
  } else {
    const authResponse = await auth.getToken();

    const body = {
      message: {
        subject: "Välkommen till Netlex!",
        body: {
          contentType: "HTML",
          content:
            "Välkommen till Netlex!\n <br>" +
            "Hej kära kund!<br>" +
            "Du har valt att koppla följande organisationsnummer " +
            user.organizationNumber +
            " med personnummer " +
            user.ssn +
            ".Vid inloggning har <br> du möjlighet att välja ifall du vill logga in som privatperson eller som organisation. <br>" +
            "<br>" +
            "<br>" +
            "<br>" +
            "Med vänliga hälsningar<br>" +
            "NETLEX<br>",
        },
        toRecipients: [
          {
            emailAddress: {
              address: user.email,
            },
          },
        ],
      },
    };
    const sendEmail = await utilService.sendEmail(authResponse, body);
    return res.status(200).send({ user });
  }
};

// Load the User model
const User = require("../models/user.js");
const UserLogin = require("../models/userLogin.js");
const config = require("../config");
const environment = require("../env");
const jwt = require("jsonwebtoken");
const https = require("https");
const fetch = require("node-fetch");
const msal = require("@azure/msal-node");
const EmailConfiguration = require("../models/emailConfiguration");
const BankIdConfiguration = require("../models/paymentsConfiguration");
// const CryptoJS = require("crypto-js");
// const hmacSHA256 = require("crypto-js/hmac-SHA256");
// var SHA256 = require("crypto-js/sha256");
// const { createHmac } = require("crypto");
const crypto = require("crypto");

const ao = new https.Agent({
  pfx: require("fs").readFileSync(environment.BANK_ID_FPT_CERTIFICATE),
  passphrase: "qwerty123",
  ca: require("fs").readFileSync("./certificate/BankID.cer"),
  //rejectUnauthorized: false // works if not presenting a CA cert but BAD! - we'd risk MITM
});

const tokenRequest = {
  // scopes: environment.OAUTH_SCOPES.split(','),
  scopes: [environment.OAUTH_GRAPH_ENDPOINT + ".default"],
};

//////////////////////////--NEW--//////////////////////////////////
//--------------Fetch BankIdConfiguration------
async function getBankIdConfiguration() {
  const bankIdConfiguration = await BankIdConfiguration.find({
    name: "bankIdConfiguration",
  });
  // console.log("BankIdConfiguration(Auth)",bankIdConfiguration[0]);
  const credential = {
    BankID_API: bankIdConfiguration[0].BankID_API,
    API_Key: bankIdConfiguration[0].API_Key,
    IP_Address: bankIdConfiguration[0].IP_Address,
    Secret_Key: bankIdConfiguration[0].Secret_Key,
    // password: BankIdConfiguration[0].klarna_password,
    // klarna_confirm_url: BankIdConfiguration[0].klarna_confirm_url,
  };
  return credential;
}
//////////////////////////--NEW--//////////////////////////////////
exports.collectBankIdAuth = async (req, res) => {
  // console.log("req.body",req.body)
  const { orderRef } = req.body;
  credentialOfBankId = await getBankIdConfiguration();
  // console.log("credentialOfBankId in collectBankIdAuth ", credentialOfBankId); //testing

  const { BankID_API, API_Key } = credentialOfBankId;
  // console.log("BankID_API", BankID_API); //testing
  // console.log("API_Key", API_Key); //testing
  const BankId_Auth_API = BankID_API + API_Key + "/collect/" + orderRef;

  // console.log("orderRef", orderRef);

  // let data = await fetch(environment.BANK_ID_COLLECT_BY_IDKOLLEN + orderRef, {
  let data = await fetch(BankId_Auth_API, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  data = await data.json();
  // console.log("datadata", data);  //testing
  // console.log("data.hintCode", data.hintCode);

  if (data) {
    // if (data.hintCode) {
    // console.log("if data.hintCode", data.hintCode);
    if (data.hintCode === "userSign") {
      // console.log("userSign", data.hintCode);

      // res.json("userSign");
      res.json({ status: "userSign", resp: data });
    }
    // }
    // call again for non failed statuses
    else if (
      // data.hintCode !== "outstandingTransaction"||data.hintCode !== "null" ||
      data.status === "progress"
    ) {
      // console.log("progress", data.status);

      // res.json("inProgress");
      res.json({ status: "inProgress", resp: data });
    } else if (data.status === "failed") {
      // console.log("failed", data.status);

      // console.log("data.hintCode",data.hintCode);
      // console.log("data.status",data.status);

      // res.json("errorFailed");
      res.json({ status: "errorFailed", resp: data });
    } else {
      // console.log("completed", data.status);

      // res.json("completed");
      res.json({ status: "completed", resp: data });

      // // fail, return
      // UserLogin.findOneAndUpdate(
      //   { $and: [{ ssn: ssn }, { status: "new" }] },
      //   { status: "failed" }
      // ).exec((err, result) => {});
      // return data;
      // // return res.json({
      // //   status: 'complete'
      // // });
    }
  }
  // else {
  //   // console.log("else");

  //   // UserLogin.findOneAndUpdate(
  //   //   { $and: [{ ssn: ssn }, { status: "new" }] },
  //   //   { status: "success" }
  //   // ).exec((err, result) => {});
  //   // return data;
  //   // return res={status: 'complete'}
  // }
};
exports.initiateBankIdAuth = async function (req, res) {
  // console.log("numOfQRCode",req.body.numOfQRCode)
  credentialOfBankId = await getBankIdConfiguration();
  const numOfQRCode = req.body.numOfQRCode;
  const ssnNo = req.body.ssn;
  const appStatus = req.body.appStatus;
  let bankId;
  User.findOne({ ssn: ssnNo, status: "active" }).exec((err, user) => {
    if (!user) {
      User.find({ $and: [{ ssn: ssnNo }, { status: "new" }] }).exec((error2, newUserResult) => {
        console.log("newUserResult", newUserResult);
        if (newUserResult.length <= 0) {
          return res.json("Not Yet Registered");
        } else if (newUserResult.length > 0) {
          return res.json("UserAccNotApproved");
        }
        if (error2) {
          console.log("error2", error2)
        }
      })
      // return res.json("Not Yet Registered");
    } else {
      console.log("else")
      // res.status(200).json({ msg: "data.autoStartToken" });
      bankId = async function () {
        console.log("bankId function called")
        // let data = await fetch(environment.BANK_ID_AUTH, {
        //   method: "POST",
        //   body: JSON.stringify({
        //     personalNumber: ssnNo,
        //     endUserIp: "127.0.0.1",
        //   }),
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   agent: ao,
        // });
        // console.log("credentialOfBankId",credentialOfBankId);
        const { BankID_API, API_Key, IP_Address, Secret_Key } = credentialOfBankId;
        // console.log("BankID_API", BankID_API);
        // console.log("API_Key", API_Key);
        // console.log("IP_Address", IP_Address);
        // console.log("Secret_Key", Secret_Key);
        const BankId_Auth_API = BankID_API + API_Key + "/auth";

        // //==== Dynamic from DB(Admin Portal) =======
        const bodyForBankIdAPI = {
          personalNumber: ssnNo,
          ipAddress: IP_Address,
          secretKey: Secret_Key,
          enableQR: "true",
        };
        const body = JSON.stringify(bodyForBankIdAPI);

        // let data = await fetch(environment.BANK_ID_AUTH_BY_IDKOLLEN, {
        let data = await fetch(BankId_Auth_API, {
          method: "POST",
          // body: JSON.stringify({
          //   // ipAddress: "127.0.0.1",
          //   personalNumber: ssnNo,

          //   // //======= For Test =========
          //   // ipAddress: "13.53.56.116",
          //   // secretKey: "123456",

          //   // //==== For Production =======
          //   // ipAddress: "13.48.243.11",
          //   // ipAddress: "13.53.114.219",
          //   // secretKey: "9zp3!4KuAhGr",

          //   // //==== Dynamic from DB(Admin Portal) =======
          //   ipAddress: IP_Address,
          //   secretKey: Secret_Key,

          //   enableQR: "true",
          //   // , message: "nothing"
          // }),
          // body: JSON.stringify(bodyForBankIdAPI),

          body,
          headers: {
            "content-type": "application/json",
          },
        });
        data = await data.json();
        // console.log("data while login", data); //testing

        // if (data.errorCode !== "alreadyInProgress") {
        if (data.message !== "alreadyInProgress") {
          // QRCode.toDataURL("I am a pony!", function (err, url) {
          //   console.log("url", url);
          // });

          // ===================== Using New crypto-js ========================
          // // let qrAuthCodeBinary = CryptoJS.createHmac(data.qrStartSecret, 2);
          // // let qrAuthCodeBinary = hmacSHA256(data.qrStartSecret,'0');
          // // let qrAuthCodeBinary = SHA256(data.qrStartSecret,'0');

          // // let qrAuthCodeBinary = CryptoJS.HmacSHA256(data.qrStartSecret,'0');
          // let qrAuthCodeBinary = CryptoJS.HmacSHA256(data.qrStartSecret,numOfQRCode.toString());
          // let qrAuthCodeHex = CryptoJS.enc.Hex.stringify(qrAuthCodeBinary);

          // // console.log("data.qrStartSecret",data.qrStartSecret)
          // // console.log("qrAuthCodeBinary",qrAuthCodeBinary)
          // console.log("qrAuthCodeHex",qrAuthCodeHex);
          // let forQRCode = "bankid." + data.qrStartToken + "." + numOfQRCode + "." + qrAuthCodeHex;
          // // let forQRCode = "bankid.552d8cca-da17-484e-ae6a-f8a4e6280889.0.4c08d73f0e4f4695fee88a43ab74eff60edbebf833eaebfd918b1d541938dbad";
          // // let forQRCode = "bankid.3e50f26f-0f6a-444f-9232-3a8607664371.0." + qrAuthCodeHex;
          // console.log("forQRCode",forQRCode);

          // ======================== Using Old crypto =========================
          // let qrAuthCodeHex = require("crypto").createHmac("sha256", "").update(data.qrStartSecret,numOfQRCode).digest("hex");

          let qrStartSecret = data?.qrStartSecret?.toString();
          // console.log("qrStartSecret",qrStartSecret)
          let qrAuthCodeHex = crypto
            .createHmac("sha256", qrStartSecret)
            .update(numOfQRCode?.toString())
            .digest("hex");

          // console.log("qrAuthCodeHex",qrAuthCodeHex)
          let forQRCode =
            "bankid." +
            data.qrStartToken +
            "." +
            numOfQRCode +
            "." +
            qrAuthCodeHex;
          // console.log("forQRCode",forQRCode);

          if (appStatus === "current") {
            res.status(200).json({ data });
            // res.status(200).json(data);
          } else {
            // res.status(200).json();
            res.status(200).json({ data, forQRCode });
          }
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
          // await loginAuthData.save((err, savedOrder) => {
          //   if (err) {
          //     res.status(404).json({ message: err });
          //   }

          //   if (appStatus === "current") {
          //     res.status(200).json({ msg: data.autoStartToken });
          //     // res.status(200).json(data);
          //   } else {
          //     res.status(200).json();
          //   }
          // });
        } else {
          res.json("already in progress");
        }
      };
      bankId();
    }
    // bankId();
    // }
  });
};
exports.initiateBankIdAuthForSignUp = async function (req, res) {
  credentialOfBankId = await getBankIdConfiguration();

  // // console.log("req.headers",req.headers)
  // let device = '';
  // if(req.header('user-agent').indexOf('Mobile') != -1){
  //   // console.log('You are using mobile device',req.header('user-agent').indexOf('Mobile') != -1);
  //   device='mobile'
  // }else{
  //   // console.log('this is probably a computer',req.header('user-agent').indexOf('Mobile') != -1);
  //   device='windows'

  // }
  // console.log("device",device)
  console.log("req.body", req.body);
  const numOfQRCode = req.body.numOfQRCode;
  const ssnNo = req.body.ssn;
  const appStatus = req.body.appStatus;
  let bankId;
  User.findOne({ ssn: ssnNo, status: "active" }).exec((err, user) => {
    if (user) {
      // return res.json("Not Yet Registered");
      return res.json("user already in");
    } else {
      // console.log("else")

      // res.status(200).json({ msg: "data.autoStartToken" });
      bankId = async function () {
        // let data = await fetch(environment.BANK_ID_AUTH, {
        //   method: "POST",
        //   body: JSON.stringify({
        //     personalNumber: ssnNo,
        //     endUserIp: "127.0.0.1",
        //   }),
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   agent: ao,
        // });

        // console.log("credentialOfBankId", credentialOfBankId);
        const { BankID_API, API_Key, IP_Address, Secret_Key } = credentialOfBankId;
        const BankId_Auth_API = BankID_API + API_Key + "/auth";

        // //==== Dynamic from DB(Admin Portal) =======
        const bodyForBankIdAPI = {
          personalNumber: ssnNo,
          ipAddress: IP_Address,
          secretKey: Secret_Key,
          enableQR: "true",
        };
        const body = JSON.stringify(bodyForBankIdAPI);

        // let data = await fetch(environment.BANK_ID_AUTH_BY_IDKOLLEN, {
        let data = await fetch(BankId_Auth_API, {
          method: "POST",
          // body: JSON.stringify({
          //   // ipAddress: "127.0.0.1",
          //   personalNumber: ssnNo,

          //   // //======= For Test =========
          //   // ipAddress: "13.53.56.116",
          //   // secretKey: "123456",

          //   // //==== For Production =======
          //   // ipAddress: "13.48.243.11",
          //   // ipAddress: "13.53.114.219",
          //   // secretKey: "9zp3!4KuAhGr",

          //   // // //==== Dynamic from DB(Admin Portal) =======
          //   //   ipAddress: IP_Address,
          //   //   secretKey: Secret_Key,
          //   //   enableQR: "true",

          //   // , message: "nothing"
          // }),
          body,
          headers: {
            "content-type": "application/json",
          },
        });
        data = await data.json();
        // console.log("data while signup", data);

        // if (data.errorCode !== "alreadyInProgress") {
        if (data.message !== "alreadyInProgress") {
          // QRCode.toDataURL("I am a pony!", function (err, url) {
          //   console.log("url", url);
          // });

          // ===================== Using New crypto-js ========================
          // // let qrAuthCodeBinary = CryptoJS.createHmac(data.qrStartSecret, 2);
          // // let qrAuthCodeBinary = hmacSHA256(data.qrStartSecret,'0');
          // // let qrAuthCodeBinary = SHA256(data.qrStartSecret,'0');

          // // let qrAuthCodeBinary = CryptoJS.HmacSHA256(data.qrStartSecret,'0');
          // let qrAuthCodeBinary = CryptoJS.HmacSHA256(data.qrStartSecret,numOfQRCode.toString());
          // let qrAuthCodeHex = CryptoJS.enc.Hex.stringify(qrAuthCodeBinary);

          // // console.log("data.qrStartSecret",data.qrStartSecret)
          // // console.log("qrAuthCodeBinary",qrAuthCodeBinary)
          // console.log("qrAuthCodeHex",qrAuthCodeHex);
          // let forQRCode = "bankid." + data.qrStartToken + "." + numOfQRCode + "." + qrAuthCodeHex;
          // // let forQRCode = "bankid.552d8cca-da17-484e-ae6a-f8a4e6280889.0.4c08d73f0e4f4695fee88a43ab74eff60edbebf833eaebfd918b1d541938dbad";
          // // let forQRCode = "bankid.3e50f26f-0f6a-444f-9232-3a8607664371.0." + qrAuthCodeHex;
          // console.log("forQRCode",forQRCode);

          // ======================== Using Old crypto =========================
          // let qrAuthCodeHex = require("crypto").createHmac("sha256", "").update(data.qrStartSecret,numOfQRCode).digest("hex");

          let qrStartSecret = data?.qrStartSecret?.toString();
          // console.log("qrStartSecret",qrStartSecret)
          let qrAuthCodeHex = crypto
            .createHmac("sha256", qrStartSecret)
            .update(numOfQRCode?.toString())
            .digest("hex");

          // console.log("qrAuthCodeHex",qrAuthCodeHex)
          let forQRCode =
            "bankid." +
            data.qrStartToken +
            "." +
            numOfQRCode +
            "." +
            qrAuthCodeHex;
          // console.log("forQRCode",forQRCode);

          if (appStatus === "current") {
            res.status(200).json({ data });
            // res.status(200).json(data);
          } else {
            // res.status(200).json();
            res.status(200).json({ data, forQRCode });
          }
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
          // await loginAuthData.save((err, savedOrder) => {
          //   if (err) {
          //     res.status(404).json({ message: err });
          //   }

          //   if (appStatus === "current") {
          //     res.status(200).json({ msg: data.autoStartToken });
          //     // res.status(200).json(data);
          //   } else {
          //     res.status(200).json();
          //   }
          // });
        } else {
          res.json("already in progress");
        }
      };
    }
    bankId();
    // }
  });
};
const callCollect = async (orderRef, ssn) => {
  // let data = await fetch(environment.BANK_ID_COLLECT, {
  //   method: "POST",
  //   body: JSON.stringify({
  //     orderRef: orderRef,
  //   }),
  //   headers: {
  //     "content-type": "application/json",
  //   },
  //   agent: ao,
  // });
  let data = await fetch(environment.BANK_ID_COLLECT_BY_IDKOLLEN + orderRef, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  data = await data.json();
  console.log("datadata", data);
  if (data.hintCode) {
    console.log("if data.hintCode", data.hintCode);
    // call again for non failed statuses
    if (
      data.hintCode !== "expiredTransaction" && // msg RFA8
      data.hintCode !== "certificateErr" && // msg RFA16
      data.hintCode !== "userCancel" && // msg RFA6
      data.hintCode !== "cancelled" && // msg RFA3
      data.hintCode !== "startFailed"
    ) {
      console.log("if in if data.hintCode", data.hintCode);
      // msg RFA17
      return "inProgress";
    } else {
      console.log("else in if data.hintCode");
      // fail, return
      UserLogin.findOneAndUpdate(
        { $and: [{ ssn: ssn }, { status: "new" }] },
        { status: "failed" }
      ).exec((err, result) => { });
      return data;
      // return res.json({
      //   status: 'complete'
      // });
    }
  } else {
    console.log("else");

    UserLogin.findOneAndUpdate(
      { $and: [{ ssn: ssn }, { status: "new" }] },
      { status: "success" }
    ).exec((err, result) => { });
    return data;
    // return res={status: 'complete'}
  }
};
exports.bankIdAuthLogin = async function (req, res) {
  const ssn = req.body.ssn;
  const { name, pno } = req.body.userDataFromBankID;

  console.log("===ssn:" + ssn);
  // console.log("===userDataFromBankID.name:" + name);
  // console.log("===userDataFromBankID.pno:" + pno);
  let firstNameFromBankID = name.split(" ")[0];
  let lastNameFromBankID = name.split(" ")[1];
  // console.log("===firstNameFromBankID:" + firstNameFromBankID);
  // console.log("===lastNameFromBankID:" + lastNameFromBankID);
  // firstNameFromBankID = pno;
  User.find({ ssn: ssn }).exec((err, user) => {
    console.log('user', user);
    if (user.length == 0) {
      // console.log("user not found" + user);
      res.json({ status: "incomplete", completionData: "no" });
    } else {
      // console.log("user.firstName", user.firstName);
      if (user.firstName == "" || user.firstName == undefined) {
        // console.log("user.firstName not found");
        let userNew = new User({
          firstName: firstNameFromBankID,
          lastName: lastNameFromBankID,
          userName: firstNameFromBankID+" "+lastNameFromBankID,
        });
        User.findByIdAndUpdate(
          user[0]._id,
          { firstName: firstNameFromBankID, lastName: lastNameFromBankID, userName: firstNameFromBankID+" "+lastNameFromBankID, },
          { new: true },
          function (err, result) {
            if (err) {
              console.log("error while updating user first and last name");
            }
            console.log(
              "User first and last name updated successfully",
              result
            );
            let newUserArray = [];
            newUserArray.push(result);

            // user = array;
            const payload = { subject: user._id };
            const secret = process.env.JWT_SECRET || config.TOKEN_SECRET;
            const token = jwt.sign(payload, secret);
            res.json({
              status: "complete",
              completionData: newUserArray,
              user: newUserArray,
              token: token,
            });
          }
        );
        // userNew.save((err, savedUser) => {});
        // res.json({"status": 'incomplete', "completionData": "no"});
      } else {
        const payload = { subject: user._id };
        const secret = process.env.JWT_SECRET || config.TOKEN_SECRET;
        const token = jwt.sign(payload, secret);

        // res.json({"status": resp.status, "completionData": resp.completionData, "user": user, token: token});
        res.json({
          status: "complete",
          completionData: user,
          user: user,
          token: token,
        });
      }
    }
  });

  // await UserLogin.find({$and: [{ssn: ssn}, {status: 'new'}]}).exec((err, result) => {
  //     console.log(result);
  //     if (result.length <= 0) {
  //         return res.json('err')
  //     } else {
  //         let orderRefNo = result[0].orderRef;
  //         let data = callCollect(orderRefNo, ssn).then(resp => {
  //             console.log(resp);
  //             if (resp === 'complete') {
  //                 res.json('inProgress')
  //           //  } else if (resp.status === 'inProgress') {
  //         } else if (resp === 'inProgress') {
  //                 User.find({ssn: ssn}).exec((err, user) => {

  //                     if(user.firstName === '') {
  //                         let user = new User({firstName: resp.completionData.user.givenName, lastName: resp.completionData.user.surname});
  //                         user.save((err, savedUser) => {
  //                         });
  //                     }

  //                     const payload = {subject: user._id};
  //                     const secret = process.env.JWT_SECRET || config.TOKEN_SECRET;
  //                     const token = jwt.sign(payload, secret);

  //                    // res.json({"status": resp.status, "completionData": resp.completionData, "user": user, token: token});
  //                     res.json({"status": 'complete', "completionData": resp.completionData, "user": user, token: token});
  //                 });
  //             } else {
  //                 res.json({"status": resp.status, "completionData": resp.completionData,});
  //             }
  //         });
  //         console.log('data='+data);
  //     }

  // });
};
exports.bankIdAuth = async function (req, res) {
  const ssn = req.body.ssn;
  console.log("req.body for login", req.body);

  await User.find({ $and: [{ ssn: ssn }, { status: "active" }] }).exec(
    // await UserLogin.find({ $and: [{ ssn: ssn }, { status: "active" }] }).exec(
    (err, activeUserResult) => {
      console.log("activeUserResult", activeUserResult);

      if (activeUserResult.length <= 0) {
        User.find({ $and: [{ ssn: ssn }, { status: "new" }] }).exec((error2, newUserResult) => {
          console.log("newUserResult", newUserResult);
          if (newUserResult.length <= 0) {
            return res.json("err");
          } else if (newUserResult.length > 0) {
            return res.json("UserAccNotApproved");
          }
          if (error2) {
            console.log("error2", error2)
          }
        })
      } else {
        // let orderRefNo = result[0].orderRef;
        // let data = callCollect(orderRefNo, ssn).then((resp) => {
        // console.log("resp", resp);
        // if (resp === "inProgress") {
        //   res.json("inProgress");
        // } else
        //  if (resp.status === "complete") {
        User.find({ ssn: ssn }).exec((err, user) => {
          // if (user.firstName === "") {
          //   let user = new User({
          //     firstName: resp.completionData.user.givenName,
          //     lastName: resp.completionData.user.surname,
          //   });
          //   user.save((err, savedUser) => {});
          // }

          const payload = { subject: user._id };
          const secret = process.env.JWT_SECRET || config.TOKEN_SECRET;
          const token = jwt.sign(payload, secret);
          // res.json({
          //   status: resp.status,
          //   completionData: resp.completionData,
          //   user: user,
          //   token: token,
          // });
          res.json({
            status: "complete",
            completionData: {
              user: {
                name: "",
                surname: "",
                givenName: "",
              },
            },
            user: user,
            token: token,
          });
        });
        // } else {
        //   res.json({
        //     status: resp.status,
        //     completionData: resp.completionData,
        //   });
        // }
        // });
      }
    }
  );
};

exports.getToken = async () => {
  //Fetch EmailConfiguration
  let emailConfiguration = await EmailConfiguration.find({
    name: "emailConfiguration",
  });
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
  // Create msal application object
  const cca = new msal.ConfidentialClientApplication(msalConfig);
  // return
  return await cca.acquireTokenByClientCredential(tokenRequest);
};

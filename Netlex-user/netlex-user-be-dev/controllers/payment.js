const KlarnaService = require("../services/klarna-service");

const KlarnaServiceSale = require("../services/klarna-service-sale");

const swishService = require("../services/Swish-service");
const stripeService = require("../services/Stripe-service");
const stripeServiceSale = require("../services/Stripe-service-sale");

const request = require("request");
const environment = require("../env");
const uuid = require("uuid");
const https = require("https");
const axios = require("axios");
const paymentModel = require("../models/payment");
const DocumentTemplate = require("../models/document");
const Schedule = require("../models/schedule");
// const stripe = require("stripe")(environment.STRIPE_SECRET_KEY);
const PaymentsConfiguration = require("../models/paymentsConfiguration");
const UserModel = require('../models/user.js');

// replace this key based on your account info

// const agent = new https.Agent({
//     cert: require('fs').readFileSync(environment.SWISH_PEM_CERT,  { encoding: 'utf8' }),
//     key: require('fs').readFileSync(environment.SWISH_KEY_CERT,  { encoding: 'utf8' }),
//     ca: require('fs').readFileSync(environment.SWISH_PEM_ROOT,  { encoding: 'utf8' }),
//   });

// const testConfigForSwish = {
//     payeeAlias: "1234679304", // "1231181189",
//     host: environment.SWISH_HOST,
//     qrHost: environment.SWISH_QR_HOST,
//     cert: require("fs").readFileSync(
//       `./certificate/Swish_Merchant_TestCertificate_1234679304.pem`,
//       "utf-8"
//     ),
//     key: require("fs").readFileSync(
//       `./certificate/Swish_Merchant_TestCertificate_1234679304.key`,
//       "utf-8"
//     ),
//     ca: require("fs").readFileSync(`./certificate/Swish_TLS_RootCA.pem`, "utf-8"),
//     passphrase: environment.SWISH_PASSPHRASE,
//   };
// const config = testConfigForSwish;

const productionConfigForSwish = {};

//////////////////////////--NEW--//////////////////////////////////
//--------------Fetch klarnaConfiguration------
async function getKlarnaConfiguration() {
  const klarnaConfiguration = await PaymentsConfiguration.find({
    name: "klarnaConfiguration",
  });
  //   console.log("klarnaConfiguration(payment)",klarnaConfiguration[0]);
  const credential = {
    username: klarnaConfiguration[0].klarna_userName,
    password: klarnaConfiguration[0].klarna_password,
    klarna_confirm_url: klarnaConfiguration[0].klarna_confirm_url,
  };
  return credential;
}
//--------------Fetch Swish Configuration------
async function getSwishConfiguration() {
  const swishConfiguration = await PaymentsConfiguration.find({
    name: "swishConfiguration",
  });
  swishConfig = swishConfiguration[0];
  // console.log("swishConfiguration(payment)",swishConfig);
  const testConfigForSwish = {
    payeeAlias: swishConfig.swish_payeeAlias, // "1231181189",
    host: environment.SWISH_HOST,
    qrHost: environment.SWISH_QR_HOST,
    cert: require("fs").readFileSync(swishConfig.swish_pem_cert, "utf-8"),
    key: require("fs").readFileSync(swishConfig.swish_key_cert, "utf-8"),
    ca: require("fs").readFileSync(swishConfig.swish_pem_root, "utf-8"),
    passphrase: swishConfig.swish_passPhrase,
    payeePaymentReference: swishConfig.swish_payeePaymentReference,
    payerAlias: swishConfig.swish_payerAlias,
  };
  const config = testConfigForSwish;
  // console.log("config", config);
  return config;
  //   return testConfigForSwish;
}
//--------------Fetch Stripe Configuration------
async function getStripeConfiguration() {
  const stripeConfiguration = await PaymentsConfiguration.find({
    name: "stripeConfiguration",
  });
  const stripe_key = stripeConfiguration[0].stripe_secret_key;

  const stripe = require("stripe")(stripe_key);
  //   console.log("stripe", stripe);
  return stripe;
}
//----------------Fetch UserData---------------
async function getUserData(userId) {
  const userData = await UserModel.findById(userId);
  return userData;
}

//////////////////////////--NEW--//////////////////////////////////

//create one for production with original certificate

exports.payments = async function (req, res) {
  const credential = await getKlarnaConfiguration();
  const config = await getSwishConfiguration();
  const stripe = await getStripeConfiguration();
  // Klarna Payment
  const { paymentDetail } = req.body;
  let documentId = paymentDetail.documentId;
  let master_id = paymentDetail.masterId;

  const document = await DocumentTemplate.findOne({
    _id: paymentDetail.documentId,
  });
  if (document) {
    paymentDetail.amount = document.documentPrice;
    paymentDetail.tax = document.documentTax;
  }
  if (paymentDetail.paymentMethod === "Klarna") {
    // Function To Get  Request Data
    const optionData = KlarnaService.payment(paymentDetail, credential);
    // Request To Get Session Id
    request.post(optionData, (err, callback, body) => {
      if (err) {
        console.error(err);
        return;
      }
      // Function To Get Session Id and Request Data
      const urlDetails = KlarnaService.getUrl(
        body,
        documentId,
        master_id,
        credential
      );
      console.log("----urlDetails----" + urlDetails);

      // Request To Get Redirect Url
      request.post(urlDetails, (err, resp, body) => {
        if (err) {
          console.error(err);
          return;
        }
        res.status(200).json(body);
      });
    });
  }
  // Stripe Payment
  else if (paymentDetail.paymentMethod === "Stripe") {
    const createStringPayment = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "SEK",
            product_data: {
              name: paymentDetail.documentTitle,
            },
            unit_amount:
              (Number(paymentDetail.amount) + Number(paymentDetail.tax)) * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${environment.STRIPE_SUCCESS_URL}?document_id=${documentId}&master_id=${master_id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${environment.STRIPE_CANCEL_URL}?document_id=${documentId}&master_id=${master_id}`,
    });
    return res.status(200).json({ redirect_url: createStringPayment.url });
  }
  // Swish Payment
  else if (paymentDetail.paymentMethod === "Swish") {
    // const optionData = swishService.payment(req.body.paymentDetail);
    // // Request To Get Session Id
    // request.put(optionData, (err, callback, body) => {
    //     if (err) {
    //         console.error('errors', err)
    //         return;
    //     }

    // });
    console.log("Payment method");

    const json = {
      payeePaymentReference: config.payeePaymentReference,
      callbackUrl: environment.SWISH_CALLBACK_URL,
      payeeAlias: config.payeeAlias,
      payerAlias: config.payerAlias, //"1231231231",
      payerSSN: "",
      amount: paymentDetail.amount,
      currency: "SEK",
      message: "test success",
    };

    const options = requestOptions(
      config,
      "POST",
      `${environment.SWISH_HOST}/api/v1/paymentrequests`,
      json
    );
    request(options, (error, response, body) => {
      logResult(error, response);
      if (!response) {
        res.status(500).send(error);
        return;
      }
      res.status("error", error, "---", response.statusCode);
      if (response.statusCode == 201) {
        const location = response.headers["location"];
        const token = response.headers["paymentrequesttoken"];
        console.log("token" + token);
        const opt = requestOptions(config, "GET", location);

        request(opt, (err, resp, body) => {
          if (!response) {
            res.status(500).send(error);
            return;
          }

          return res.status(200).json({
            redirect_url:
              resp.body["callbackUrl"] +
              "?session_id=" +
              resp.body["id"] +
              "&documentId=" +
              documentId +
              "&master_id=" +
              master_id +
              "&order_id=" +
              resp.body["id"],
          });
        });
      } else {
        res.send(body);
        return;
      }
    });
  }
};
exports.getPayment = async function (req, res) {
  const credential = await getKlarnaConfiguration();
  const config = await getSwishConfiguration();
  const stripe = await getStripeConfiguration();
  console.log('req.body.paymentDetail',req.body.paymentDetail)
  const userData = await getUserData(req.body.paymentDetail.userId);
  console.log('userData',userData)

  const { paymentDetail } = req.body;
  const orderId = paymentDetail.order_id;
  let paymentProvider = paymentDetail.payment_provider;
  let status = paymentDetail.status;
  const documentId = paymentDetail.documentId;
  const userId = paymentDetail.userId ? paymentDetail.userId : "";
  const masterId = paymentDetail.masterId;
  const agreementType = paymentDetail.agreementType;

  console.log("Paymets services BG",paymentDetail);

  if (orderId) {
    if (paymentProvider === "Stripe") {
      const paymentResponse = await stripe.checkout.sessions.retrieve(orderId);
        // console.log("userData", userData);

      let storedData = stripeService.storePaymentInfoForStripe(
        paymentResponse,
        documentId,
        userId,
        userData
      );
      return res.status(200).json(storedData);
    } else if (paymentProvider === "klarna") {
      const getPaymentRequests = KlarnaService.getPaymentDetails(
        orderId,
        credential
      );
      request(getPaymentRequests, (err, resp, body) => {
        if (err) {
          console.error('error in getPaymentRequests',err);
          return;
        }
        // console.log("userData", userData);
        
        let storedData = KlarnaService.storePaymentInfoForKlarna(
          body,
          paymentProvider,
          documentId,
          userId,
          masterId,
          userData,
          agreementType
        );
        console.log("storedData_____________1", storedData);
        return res.status(200).json(storedData);
      });
    } else if (paymentProvider == "Swish") {
      const options = requestOptions(
        config,
        "GET",
        `${environment.SWISH_HOST}/api/v1/paymentrequests/${orderId}`
      );
      request(options, (error, response, body) => {
        if (!response) {
          res.status(500).send(error);
          return;
        }

        if (response.statusCode == 200) {
          let storedData = swishService.storePaymentInfoForSwish(
            response.body,
            paymentProvider,
            documentId,
            userId,
            userData
          );
          console.log('storedData'+storedData);
          res.send(storedData);
        } else {
          res.send(body);
          return;
        }
      });
    }
  } else {
    let name = {
      order_amount: "",
      shipping_address: {
        given_name: "",
      },
    };
    paymentProvider = "Not Available";
    status = "Not Available";
    storeIfNoOrderId(name, paymentProvider, status);
  }
};
function storeIfNoOrderId(paymentData, paymentProvider, status) {
  let paymentDetail = new paymentModel();
  if (paymentData.id) {
    paymentDetail.transaction_Id = paymentData.id;
    paymentDetail.gatewayResponse = paymentData;
  }

  paymentDetail.userId = "";
  paymentDetail.documentId = paymentData.documentId;
  paymentDetail.userName = paymentData.payerAlias;
  paymentDetail.amount = paymentData.amount;
  paymentDetail.paymentDate = new Date();
  paymentDetail.paymentMethod = paymentProvider;
  // paymentDetail.status = status;
  paymentDetail.save((err, success) => {
    if (err) {
      console.error("Swish error", err);
    }
  });
}
function requestOptions(config, method, uri, body) {
  return {
    method: method,
    uri: uri,
    json: true,
    body: body,
    "content-type": "application/json",
    cert: config.cert,
    key: config.key,
    ca: config.ca ? config.ca : null,
    passphrase: config.passphrase,
  };
}
function logResult(error, response) {
  if (error) {
    console.log(error);
  }
  if (response) {
    console.log("response.statusCode" + response.statusCode);
    console.log("response.headers" + response.headers);
    console.log("response.body" + response.body);
  }
}

//////FOR SALE/////

/////////-------Payment--New/////////

exports.paymentNew = async function (req, res) {
  const credential = await getKlarnaConfiguration();
  const config = await getSwishConfiguration();
  const stripe = await getStripeConfiguration();

  // Klarna Payment
  const { paymentDetail } = req.body;
  let documentId = paymentDetail.documentId;
  let master_id = paymentDetail.masterId;
  // let lawyer_Id = paymentDetail.lawyerId;

  console.log("----PAYMENT master_id---", master_id);
  // console.log("----PAYMENT master_id---", res.body);

  const document = await DocumentTemplate.findOne({
    _id: paymentDetail.documentId,
  });

  if (document) {
    paymentDetail.amount = document.documentPrice;
    paymentDetail.tax = document.documentTax;
  }
  console.log("amount" + paymentDetail.amount);
  console.log("tax" + paymentDetail.tax);
  console.log("documentId" + paymentDetail.documentId);
  console.log("masterId" + paymentDetail.masterId);
  console.log("documentTitle" + paymentDetail.documentTitle);
  console.log("paymentMethod" + paymentDetail.paymentMethod);
  console.log("lawyeeeeeeeeeeerrrrr" + paymentDetail.lawyerId);

  if (paymentDetail.paymentMethod === "Klarna") {
    // Function To Get  Request Data
    const optionData = KlarnaServiceSale.payment(paymentDetail, credential);
    //console.log("optionData(payment)",optionData)

    // Request To Get Session Id
    request.post(optionData, (err, callback, body) => {
      if (err) {
        console.error(err);
        return;
      }
      // Function To Get Session Id and Request Data
      const urlDetails = KlarnaServiceSale.getUrl(
        body,
        documentId,
        master_id,
        credential
      );

      console.log("----urlDetails----" + urlDetails);

      // Request To Get Redirect Url
      request.post(urlDetails, (err, resp, body) => {
        if (err) {
          console.error(err);
          return;
        }
        res.status(200).json(body);
      });
    });
  }
  // Stripe Payment
  else if (paymentDetail.paymentMethod === "Stripe") {
    const createStringPayment = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "SEK",
            product_data: {
              name: paymentDetail.documentTitle,
            },
            unit_amount:
              (Number(paymentDetail.amount) + Number(paymentDetail.tax)) * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${environment.STRIPE_SALE_SUCCESS_URL}?document_id=${documentId}&master_id=${master_id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${environment.STRIPE_CANCEL_URL}?document_id=${documentId}&master_id=${master_id}`,
    });
    return res.status(200).json({ redirect_url: createStringPayment.url });
  }
  // Swish Payment
  else {
    // const optionData = swishService.payment(req.body.paymentDetail);
    // // Request To Get Session Id
    // request.put(optionData, (err, callback, body) => {
    //     if (err) {
    //         console.error('errors', err)
    //         return;
    //     }

    // });

    const json = {
      payeePaymentReference: config.payeePaymentReference,
      callbackUrl: environment.SWISH_CALLBACK_URL,
      payeeAlias: config.payeeAlias,
      payerAlias: config.payerAlias,
      payerSSN: "",
      amount: paymentDetail.amount,
      currency: "SEK",
      message: "test success",
    };

    console.log("environment.SWISH_HOST" + environment.SWISH_HOST);

    const options = requestOptions(
      config,
      "POST",
      `${environment.SWISH_HOST}/api/v1/paymentrequests`,
      json
    );
    request(options, (error, response, body) => {
      logResult(error, response);

      // const options = requestOptions(config,'POST', `${environment.SWISH_HOST}/api/v1/paymentrequests`, json)
      // request(options, (error, response, body) => {

      if (!response) {
        console.log("!response" + response);
        res.status(500).send(error);

        return;
      }
      res.status("error", error, "---", response.statusCode);
      if (response.statusCode == 201) {
        const location = response.headers["location"];
        const token = response.headers["paymentrequesttoken"];

        const opt = requestOptions(config, "GET", location);

        request(opt, (err, resp, body) => {
          if (!response) {
            res.status(500).send(error);
            return;
          }
          // return res.status(200).json({redirect_url: resp.body['callbackUrl']+'?session_id='+resp.body['id']});
          return res.status(200).json({
            redirect_url:
              resp.body["callbackUrl"] +
              "?session_id=" +
              resp.body["id"] +
              "&document_id=" +
              documentId +
              "&master_id=" +
              master_id +
              "&order_id=" +
              resp.body["id"],
          });
        });
      } else {
        res.send(body);
        return;
      }
    });
  }
};
exports.getPaymentsale = async function (req, res) {
  const credential = await getKlarnaConfiguration();
  const config = await getSwishConfiguration();
  const stripe = await getStripeConfiguration();

  const { paymentDetail } = req.body;

  const orderId = paymentDetail.order_id;
  let paymentProvider = paymentDetail.payment_provider;
  let status = paymentDetail.status;
  const documentId = paymentDetail.documentId;
  const userId = paymentDetail.userId ? paymentDetail.userId : "";
  const masterId = paymentDetail.masterId;

  console.log("Paymets services BG" + masterId);
  //console.log("Paymets services BG" + lawyerId);
  console.log(paymentDetail);
  const schedule = await Schedule.findById({ _id: documentId });
  console.log("schedule found " + schedule);
  console.log("----getpayment lawyer id " + schedule.lawyerId);
  const lawyerId = schedule.lawyerId;
  if (orderId) {
    if (paymentProvider === "Stripe") {
      const paymentResponse = await stripe.checkout.sessions.retrieve(orderId);

      console.log("storePaymentInfoForStripe------++" + masterId);
      console.log("storePaymentInfoForStripe------++" + lawyerId);

      let storedData = stripeServiceSale.storePaymentInfoForStripe(
        paymentResponse,
        documentId,
        userId,
        masterId,
        lawyerId
      );
      return res.status(200).json(storedData);
    } else if (paymentProvider === "klarna") {
      const getPaymentRequests = KlarnaServiceSale.getPaymentDetails(
        orderId,
        credential
      );
      request(getPaymentRequests, (err, resp, body) => {
        if (err) {
          console.error(err);
          return;
          strip;
        }

        let storedData = KlarnaServiceSale.storePaymentInfoForKlarna(
          body,
          paymentProvider,
          documentId,
          userId,
          masterId,
          lawyerId
        );
        return res.status(200).json(storedData);
      });
    } else if (paymentProvider == "Swish") {
      const options = requestOptions(
        config,
        "GET",
        `${environment.SWISH_HOST}/api/v1/paymentrequests/${orderId}`
      );
      request(options, (error, response, body) => {
        if (!response) {
          res.status(500).send(error);
          return;
        }

        if (response.statusCode == 200) {
          swishService.storePaymentInfoForSwish(
            response.body,
            paymentProvider,
            documentId,
            userId
          );
          res.send(response.body);
        } else {
          res.send(body);
          return;
        }
      });
    }
  } else {
    let name = {
      order_amount: "",
      shipping_address: {
        given_name: "",
      },
    };
    paymentProvider = "Not Available";
    status = "Not Available";
    storeIfNoOrderId(name, paymentProvider, status);
  }
};

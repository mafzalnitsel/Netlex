const KlarnaService = require("../services/klarna-service-sale");
const swishService = require("../services/Swish-service");
const stripeService = require("../services/Stripe-service");
const request = require("request");
const environment = require("../env");
const uuid = require("uuid");
const https = require("https");
const axios = require("axios");
const paymentModel = require("../models/payment");
const DocumentTemplate = require("../models/document");
const Sales = require("../models/salesModel");
const UserModel = require("../models/user.js");

// const stripe = require("stripe")(environment.STRIPE_SECRET_KEY);

// replace this key based on your account info
// const testConfigForSwish = {
//     payeeAlias: "1231181189",
//     host: environment.SWISH_HOST,
//     qrHost: environment.SWISH_QR_HOST,
//     cert: require('fs').readFileSync(environment.SWISH_PEM_CERT, "utf-8"),
//     key: require('fs').readFileSync(environment.SWISH_KEY_CERT, "utf-8"),
//     ca: require('fs').readFileSync(environment.SWISH_PEM_ROOT, "utf-8"),
//     passphrase: environment.SWISH_PASSPHRASE
// }

// const agent = new https.Agent({
//     cert: require('fs').readFileSync(environment.SWISH_PEM_CERT,  { encoding: 'utf8' }),
//     key: require('fs').readFileSync(environment.SWISH_KEY_CERT,  { encoding: 'utf8' }),
//     ca: require('fs').readFileSync(environment.SWISH_PEM_ROOT,  { encoding: 'utf8' }),
//   });

//create one for production with original certificate
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
  console.log("swishConfiguration(payment)", swishConfig);
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
  //   console.log("config", config);
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
//////////////////////////--NEW--//////////////////////////////////
// const config = testConfigForSwish;
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
      payeePaymentReference: "0123456789",
      callbackUrl: environment.SWISH_CALLBACK_URL,
      payeeAlias: config.payeeAlias,
      payerAlias: "1231231231",
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
      if (!response) {
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
          return res
            .status(200)
            .json({
              redirect_url:
                resp.body["callbackUrl"] + "?session_id=" + resp.body["id"],
            });
        });
      } else {
        res.send(body);
        return;
      }
    });
  }
};

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

exports.getPayment = async function (req, res) {
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
  console.log("Paymets services BG");
  console.log(paymentDetail);

  if (orderId) {
    if (paymentProvider === "Stripe") {
      const paymentResponse = await stripe.checkout.sessions.retrieve(orderId);

      let storedData = stripeService.storePaymentInfoForStripe(
        paymentResponse,
        documentId,
        userId
      );
      return res.status(200).json(storedData);
    } else if (paymentProvider === "klarna") {
      const getPaymentRequests = KlarnaService.getPaymentDetails(orderId, credential);
      request(getPaymentRequests, (err, resp, body) => {
        if (err) {
          console.error(err);
          return;
        }

        let storedData = KlarnaService.storePaymentInfoForKlarna(
          body,
          paymentProvider,
          documentId,
          userId,
          masterId
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

/////////-------Payment--New/////////

exports.paymentNew = async function (req, res) {
  const credential = await getKlarnaConfiguration();
  const config = await getSwishConfiguration();
  const stripe = await getStripeConfiguration();
  // Klarna Payment
  const { paymentDetail } = req.body;
  let documentId = paymentDetail.documentId;
  let master_id = paymentDetail.masterId;

  console.log("----PAYMENT master_id---", master_id);

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
    console.log("optionData" + optionData);
    // Request To Get Session Id
    request.post(optionData, (err, callback, body) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("optionDatabody" + body.session_id);
      // Function To Get Session Id and Request Data
      const urlDetails = KlarnaService.getUrl(body, documentId, master_id, credential);
      console.log("urlDetails" + urlDetails);
      // Request To Get Redirect Url
      request.post(urlDetails, (err, resp, body) => {
        console.log(body);
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
      payeePaymentReference: "0123456789",
      callbackUrl: environment.SWISH_CALLBACK_URL,
      payeeAlias: config.payeeAlias,
      payerAlias: "1231231231",
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
      if (!response) {
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
          return res
            .status(200)
            .json({
              redirect_url:
                resp.body["callbackUrl"] + "?session_id=" + resp.body["id"],
            });
        });
      } else {
        res.send(body);
        return;
      }
    });
  }
};

// exports.getMeetingSales = async function (req, res) {
//   // get meeting sales data by userID
//   let userId = req.body.userId;
//   console.log("userIdddddd", userId);
//   let document = [];
//   const sales = await Sales.find({ userId: userId });
//   if (!sales) {
//     return res.status(404).json({ error: "Invalid UserId" });
//   }
//   sales.forEach((documentTemplateId) => {
//     document.push(documentTemplateId.documentId);
//   });
//   const documentId = await Sales.find({ $and: [{ _id: { $in: document } }] });
//   if (!documentId) {
//     return res.status(404).json({ error: "Invalid UserId" });
//   }
//   return res.status(200).json({ sales, documentId });
// };

exports.getMeetingSales = async function (req, res) {
  // get meeting sales data by userID
  let userId = req.body.userId;
  console.log("userIdddddd", userId);
  let document = [];
  const sales = await Sales.find({ userId: userId });
  if (!sales) {
    return res.status(404).json({ error: "Invalid UserId" });
  }
  sales.forEach((documentTemplateId) => {
    document.push(documentTemplateId.documentId);
  })
  const documentId = await Sales.find({ $and: [{ _id: { $in: document } }] });
  if (!documentId) {
    return res.status(404).json({ error: "Invalid UserId" });
  }

  let Array = [];
  sales.forEach((element,index) => {
    // document.push(documentTemplateId.documentId);
    document.push(element.documentId);
    // console.log("element", element);
    let SaleDate = element.salesAt.split("T")[0];
    let SaleTime = element.salesAt.split("T")[1];
    let hours = Number(SaleTime.match(/^(\d+)/)[1]);
    let minutes = Number(SaleTime.match(/:(\d+)/)[1]);
    let AM_PM = hours >= 12 ? "PM" : "AM";
    //  let fofo = SaleDate.split('-').join('/');
    // console.log("fofo", fofo);

    SaleTime = hours + ":" + minutes + " " + AM_PM;
    // console.log("SaleTime", SaleTime);

    UserModel.findById(element.userId).exec(function (err, doc) {
      if (err || doc === null) {
        console.log("UserNotFound");
      } else {
        // console.log("User Found" ,doc);
        Array.push({
          _id: element._id,
          transaction_Id: element.transaction_Id,
          gatewayResponse: element.gatewayResponse,
          userId: element.userId,
          userName: doc.userName,
          schedulerId: element.schedulerId,
          salesAmount: element.salesAmount,
          salesAt: element.salesAt,
          time: SaleTime,
          date: SaleDate,
          businessType: element.businessType,
          paymentMethod: element.paymentMethod,
          status: element.status,
          lawyerId: element.lawyerId,
          __v: element.__v,
        });
        // if(Array && Array!== undefined){
        //   console.log("Array",Array)
        //   Array[index].key3 = "hello";
        // }
        if (index === sales.length - 1) {
          // console.log("Array", Array);
          return res.status(200).json({ sales : Array, documentId });

        }
      }
    });

  });
  // const documentId = await Sales.find({ $and: [{ _id: { $in: document } }] });
  // if (!documentId) {
  //   return res.status(404).json({ error: "Invalid UserId" });
  // }
  // return res.status(200).json({ sales, documentId });
};

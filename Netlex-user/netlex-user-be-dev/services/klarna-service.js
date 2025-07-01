const https = require("https");
const environment = require("../env");
const json = require("body-parser/lib/types/json");
const paymentModel = require("../models/payment");
const saleModel = require("../models/salesModel");
const UserModel = require("../models/user.js");

// const credential = {
//     username: environment.KLARNA_USERNAME,
//     password: environment.KLARNA_PASSWORD
// }

const sessionUrl = {
  createSessionUrl: "/payments/v1/sessions",
  getRedirectUrl: "/hpp/v1/sessions",
  getPaymentApi: "/ordermanagement/v1/orders/",
};

//session Call BAck

function generateAuth(username, password) {
  return (
    "Basic " + new Buffer.from(username + ":" + password).toString("base64")
  );
}

// Create Session  Function

exports.payment = function (paymentDetail, credential) {
  const amount = eval(Number(paymentDetail.amount) + Number(paymentDetail.tax));
  let data = {
    purchase_country: "SE",
    purchase_currency: "SEK",
    locale: "en-SE",
    order_amount: Number(amount) * 100,
    order_tax_amount: 0,
    order_lines: [
      {
        name: paymentDetail.documentTitle,
        quantity: 1,
        unit_price: Number(amount) * 100,
        tax_rate: 0,
        total_amount: Number(amount) * 100,
        total_discount_amount: 0,
        total_tax_amount: 0,
        product_url: "https://www.estore.com/products/f2a8d7e34",
        image_url: "https://www.estore.com/product_image.png",
      },
    ],
    options: {
      payment_method_categories: ["pay_now"],
    },
    // "merchant_urls": {
    //     "confirmation": environment.KLARNA_CONFIRM_URL,
    // },
    merchant_urls: {
      confirmation:
        environment.KLARNA_CONFIRM_URL + credential.klarna_confirm_url,
    },
  };
  // console.log("environment.KLARNA_PAYMENT_URL",environment.KLARNA_PAYMENT_URL)
  // console.log("sessionUrl.createSessionUrl",sessionUrl.createSessionUrl)
  // console.log("credential.username",credential.username)
  // console.log("credential.password",credential.password)
  
  // console.log("data",data)
  // const myJSON = JSON.stringify(data);
  // console.log("myJSON",myJSON)

  const optionData = {
    uri: environment.KLARNA_PAYMENT_URL + sessionUrl.createSessionUrl, 
    port: 443,
    method: "POST",
    json: true,
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: generateAuth(credential.username, credential.password),
    },
  };
  console.log("optionData",optionData)
  console.log("optionData.uri",optionData.uri)

  return optionData;
};
// Get Session To Redirect Url Function
exports.getUrl = function (body, document_id, master_id, credential) {
  const sessionData = {
    payment_session_url:
      environment.KLARNA_PAYMENT_URL +
      sessionUrl.createSessionUrl +
      "/" +
      body.session_id,
    merchant_urls: {
      back:
        environment.REDIRECT_HOST_URL +
        "/klarna/back?document_id=" +
        document_id +
        "&master_id=" +
        master_id +
        "&hppId={{session_id}}",
      cancel:
        environment.REDIRECT_HOST_URL +
        "/klarna/cancel?document_id=" +
        document_id +
        "&master_id=" +
        master_id +
        "&hppId={{session_id}}",
      error:
        environment.REDIRECT_HOST_URL +
        "/klarna/error?document_id=" +
        document_id +
        "&master_id=" +
        master_id +
        "&hppId={{session_id}}",
      failure:
        environment.REDIRECT_HOST_URL +
        "/klarna/failure?document_id=" +
        document_id +
        "&master_id=" +
        master_id +
        "&hppId={{session_id}}",
      privacy_policy: environment.REDIRECT_HOST_URL + "/klarna/agreement",
      status_update:
        environment.REDIRECT_HOST_URL +
        "/klarna/agreement?document_id=" +
        document_id +
        "&master_id" +
        master_id +
        "&secret=yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy&hppId={{session_id}}",
      success:
        environment.REDIRECT_HOST_URL +
        "/klarna/success?document_id=" +
        document_id +
        "&master_id=" +
        master_id +
        "&hppId={{session_id}}&order_id={{order_id}}",
      terms: environment.REDIRECT_HOST_URL + "/klarna/agreement",
    },
    options: {
      place_order_mode: "PLACE_ORDER",
    },
  };
  console.log(
    " environment.KLARNA_PAYMENT_URL + sessionUrl.createSessionUrl + " /
      " + body.session_id," +
      environment.KLARNA_PAYMENT_URL +
      sessionUrl.createSessionUrl +
      "/" +
      body.session_id
  );
  const object = {
    uri: environment.KLARNA_PAYMENT_URL + sessionUrl.getRedirectUrl,
    port: 443,
    method: "POST",
    json: true,
    body: sessionData,
    headers: {
      "Content-Type": "application/json",
      Authorization: generateAuth(credential.username, credential.password),
    },
  };

  return object;
};
exports.getPaymentDetails = function (order_id, credential) {
  const object = {
    uri: environment.KLARNA_PAYMENT_URL + sessionUrl.getPaymentApi + order_id,
    port: 443,
    method: "GET",
    json: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: generateAuth(credential.username, credential.password),
    },
  };
  console.log("object in klarna services",object)
  return object;
};

exports.storePaymentInfoForKlarna = function (
  paymentData,
  paymentProvider,
  documentId,
  userId,
  masterId,
  userData,
  agreementType
) {
  console.log("paymenthdghdfghdfghdfData")
  console.log("paymentData",paymentData)
  console.log("paymentProvider",paymentProvider)
  console.log("documentId",documentId)
  console.log("userId",userId)
  console.log("masterId",masterId)
  console.log("userData",userData)
  console.log("agreementType",agreementType)
  
  let paymentDetail = new paymentModel();
  if (paymentData.order_id) {
    paymentDetail.transaction_Id = paymentData.order_id;
    paymentDetail.gatewayResponse = paymentData;
  }
  // console.log("paymentData in storePaymentInfoForKlarna",paymentData)
  // console.log("userId in storePaymentInfoForKlarna",userId)

  // const userData = UserModel.findById(userId);
  // console.log("userData111", userData);

  paymentDetail.userId = userId;
  paymentDetail.documentId = documentId;
  // paymentDetail.userName = paymentData.shipping_address.given_name + documentId;
  paymentDetail.userName = userData.userName;
  paymentDetail.amount = Number(paymentData.order_amount) / 100;
  paymentDetail.paymentDate = new Date();
  paymentDetail.paymentMethod = paymentProvider;
  paymentDetail.status =
    paymentData.status == "AUTHORIZED" ? "success" : "failed";
  paymentDetail.agreementType = agreementType;

  paymentDetail.save((err, success) => {
    if (err) {
      return err;
    }
    console.log("success",success)
    return paymentDetail;
  });
  console.log("paymentDetail",paymentDetail)
  return paymentDetail;
};

// exports.storePaymentInfoForKlarna = function(paymentData,  paymentProvider, documentId, userId, masterId){

//     let paymentDetail = new saleModel();
//     if(paymentData.order_id){
//         paymentDetail.transaction_Id = paymentData.order_id;
//         // paymentDetail.gatewayResponse = paymentData;
//     }
//     console.log( 'masterId-------' + masterId);
//     console.log( 'documentId     ' + documentId);

//     paymentDetail.userId = userId;
//       paymentDetail.schedulerId = documentId;
//     // paymentDetail.userName = paymentData.shipping_address.given_name;
//     paymentDetail.salesAmount = Number(paymentData.order_amount)/100;
//     paymentDetail.salesAt = new Date;
//     paymentDetail.businessType = masterId;
//     paymentDetail.paymentMethod = paymentProvider;
//     paymentDetail.status = paymentData.status == 'AUTHORIZED' ? 'success' : 'failed';
//         paymentDetail.save((err, success) =>{
//             if(err){
//                 return err;
//             }

//             console.log('paymentData status___________'+  paymentDetail.status );
//             return paymentDetail;

//     });

//     return paymentDetail;
// }

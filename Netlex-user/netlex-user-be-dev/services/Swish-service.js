const paymentModel = require("../models/payment")
//const paymentModel = require("../models/payment")
const uuid = require('uuid');
const {https, Agent} = require('https');

exports.storePaymentInfoForSwish = function(paymentData,  paymentProvider, documentId, userId,userData){
    let paymentDetail = new paymentModel();
    if(paymentData.id){
        paymentDetail.transaction_Id = paymentData.id;
        paymentDetail.gatewayResponse = paymentData;
    }

    paymentDetail.userId = userId;
    paymentDetail.documentId = documentId;
    // paymentDetail.userName = paymentData.payerAlias;  //On 02-01-2023
    paymentDetail.userName = userData.userName;          //On 02-01-2023
    paymentDetail.amount = paymentData.amount;
    paymentDetail.paymentDate = new Date;
    paymentDetail.paymentMethod = paymentProvider;
    paymentDetail.status = paymentData.status == 'Created' ? 'success' : 'failed';
        paymentDetail.save((err, success) =>{
            if(err){
                console.error('Swish error', err);
            }
    });
}

// Create Session  uuidv4
// const url = `https://mss.cpc.getswish.net/swish-cpcapi/api/v2/paymentrequests/netlex1234`

// exports.payment =  function (paymentDetail) {
//     let data = {
// 		callbackUrl: "https://webhook.site/a8f9b5c2-f2da-4bb8-8181-fcb84a6659ea",
//         amount: "100.00",
//         currency: "SEK",
//         payeeAlias: "197509071234"
//         // payeePaymentReference: "0123456789",
//         // payerAlias: '4671234768',
//         // message: "testing",
//     };
//     const cert = {
//         cert: require('fs').readFileSync(`./certificate/Swish_Merchant_TestCertificate_1234679304.pem`, "utf-8"),
//         key: require('fs').readFileSync(`./certificate/Swish_Merchant_TestCertificate_1234679304.key`, "utf-8"),
//         ca: require('fs').readFileSync(`./certificate/Swish_TLS_RootCA.pem`, "utf-8"),
//         passphrase: "swish",
//       }

//     const options = {
//         uri: url,
//         port: 443,
//         agent: new Agent({ ...cert, minVersion: "TLSv1.2", maxVersion: "TLSv1.2" }),
//         method: "PUT",
//         body: JSON.stringify(data),
//         headers: { "Content-Type": "application/json" }
//       }

//      return options;

// }

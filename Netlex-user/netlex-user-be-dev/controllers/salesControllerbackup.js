const KlarnaServiceSale = require("../services/klarna-service-sale");
const swishService = require("../services/Swish-service");
const stripeService = require("../services/Stripe-service");
const request = require('request');
const environment = require("../env");
const uuid = require('uuid');
const https = require('https');
const axios = require('axios');
const paymentModel = require('../models/payment');
const DocumentTemplate = require('../models/document');

const stripe = require("stripe")(environment.STRIPE_SECRET_KEY);

// replace this key based on your account info
const testConfigForSwish = {
    payeeAlias: "1231181189",
    host: environment.SWISH_HOST,
    qrHost: environment.SWISH_QR_HOST,
    cert: require('fs').readFileSync(environment.SWISH_PEM_CERT, "utf-8"),
    key: require('fs').readFileSync(environment.SWISH_KEY_CERT, "utf-8"),
    ca: require('fs').readFileSync(environment.SWISH_PEM_ROOT, "utf-8"),
    passphrase: environment.SWISH_PASSPHRASE
}

// const agent = new https.Agent({
//     cert: require('fs').readFileSync(environment.SWISH_PEM_CERT,  { encoding: 'utf8' }),
//     key: require('fs').readFileSync(environment.SWISH_KEY_CERT,  { encoding: 'utf8' }),
//     ca: require('fs').readFileSync(environment.SWISH_PEM_ROOT,  { encoding: 'utf8' }),
//   });

//create one for production with original certificate
const productionConfigForSwish = {
}

const config = testConfigForSwish;
exports.Salepayments = async function (req, res) {
    // Klarna Payment
    const {paymentDetail} = req.body;
    let documentId = paymentDetail.documentId;
    let master_id = paymentDetail.masterId;

    const document = await DocumentTemplate.findOne({"_id": paymentDetail.documentId});
    if(document) {
        paymentDetail.amount = document.documentPrice;
        paymentDetail.tax = document.documentTax;
    }
    if(paymentDetail.paymentMethod === 'Klarna'){
        // Function To Get  Request Data
        const optionData = KlarnaServiceSale.payment(paymentDetail);
        
        // Request To Get Session Id
        request.post(optionData, (err, callback, body) => {
            if (err) {
                console.error(err)
                return;
            }
            // Function To Get Session Id and Request Data
            const urlDetails = KlarnaServiceSale.getUrl(body,documentId, master_id);

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
    else if(paymentDetail.paymentMethod === 'Stripe'){
        const createStringPayment = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'SEK',
                        product_data: {
                            name: paymentDetail.documentTitle,
                        },
                        unit_amount: (Number(paymentDetail.amount)+ Number(paymentDetail.tax)) * 100 ,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${environment.STRIPE_SUCCESS_URL}?document_id=${documentId}&master_id=${master_id}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${environment.STRIPE_CANCEL_URL}?document_id=${documentId}&master_id=${master_id}`,
        });
        return res.status(200).json({redirect_url: createStringPayment.url});
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
            payerAlias:"1231231231",
            payerSSN: "",
            amount: paymentDetail.amount,
            currency: "SEK",
            message: "test success"
        }

        const options = requestOptions('POST', `${environment.SWISH_HOST}/api/v1/paymentrequests`, json)
        request(options, (error, response, body) => {

            if (!response) {
                res.status(500).send(error)
                return
            }
            res.status('error' , error, '---', response.statusCode)
            if (response.statusCode == 201) {
                const location = response.headers['location']
                const token = response.headers['paymentrequesttoken']

                const opt = requestOptions('GET', location)

                request(opt, (err, resp, body) => {

                    if (!response) {
                        res.status(500).send(error)
                        return
                    }
                    return res.status(200).json({redirect_url: resp.body['callbackUrl']+'?session_id='+resp.body['id']});
                })
            } else {
                res.send(body)
                return
            }
        })

    }
};

function requestOptions(method, uri, body) {
	return {
		method: method,
		uri: uri,
		json: true,
		body: body,
		'content-type': 'application/json',
		cert: config.cert,
		key: config.key,
		ca: config.ca ? config.ca : null,
		passphrase: config.passphrase
	}
}

exports.getPayment = async function (req, res) {
    const {paymentDetail} = req.body;
    const orderId = paymentDetail.order_id;
    let paymentProvider = paymentDetail.payment_provider;
    let status = paymentDetail.status;
    const documentId = paymentDetail.documentId;
    const userId = paymentDetail.userId ? paymentDetail.userId : '';
  const masterId = paymentDetail.masterId;
    console.log("Paymets services BG");
   console.log(paymentDetail);


   
    if (orderId) {
        if(paymentProvider === 'Stripe') {
            const paymentResponse = await stripe.checkout.sessions.retrieve(
                orderId
            );

            let storedData = stripeService.storePaymentInfoForStripe(paymentResponse, documentId, userId );
            return res.status(200).json(storedData);
        }else if(paymentProvider === 'klarna') {
            const getPaymentRequests = KlarnaServiceSale.getPaymentDetails(orderId);
            request(getPaymentRequests, (err, resp, body) => {
                if (err) {
                    console.error(err);
                    return;
                }

                let storedData = KlarnaServiceSale.storePaymentInfoForKlarna(body, paymentProvider, documentId, userId, masterId)
               return res.status(200).json(storedData);
            });
        }else if(paymentProvider == 'Swish') {
            const options = requestOptions('GET', `${environment.SWISH_HOST}/api/v1/paymentrequests/${orderId}`)
            request(options, (error, response, body) => {
                if (!response) {
                    res.status(500).send(error)
                    return;
                }

                if (response.statusCode == 200) {
                    swishService.storePaymentInfoForSwish(response.body, paymentProvider, documentId, userId);
                    res.send(response.body)
                } else {
                    res.send(body)
                    return;
                }
            });
        }
    }else {
        let name = {
            "order_amount":"",
            "shipping_address":{
                "given_name": "",
            }
        }
        paymentProvider = "Not Available";
        status = "Not Available";
        storeIfNoOrderId(name, paymentProvider, status);
    }
}

function storeIfNoOrderId(paymentData,  paymentProvider, status) {
    let paymentDetail = new paymentModel();
    if(paymentData.id){
        paymentDetail.transaction_Id = paymentData.id;
        paymentDetail.gatewayResponse = paymentData;
    }

    paymentDetail.userId = '';
    paymentDetail.documentId = paymentData.documentId;
    paymentDetail.userName = paymentData.payerAlias;
    paymentDetail.amount = paymentData.amount;
    paymentDetail.paymentDate = new Date;
    paymentDetail.paymentMethod = paymentProvider;
    // paymentDetail.status = status;
        paymentDetail.save((err, success) =>{
            if(err){
                console.error('Swish error', err);
            }
    });
}





/////////-------Payment--New/////////

exports.paymentNewSale = async function (req, res) {
    // Klarna Payment
    const {paymentDetail} = req.body;
    let documentId = paymentDetail.documentId;
    let master_id = paymentDetail.masterId;

    console.log("----PAYMENT master_id---", master_id)

    const document = await DocumentTemplate.findOne({"_id": paymentDetail.documentId});
    if(document) {
        paymentDetail.amount = document.documentPrice;
        paymentDetail.tax = document.documentTax;
    }
    if(paymentDetail.paymentMethod === 'Klarna'){
        // Function To Get  Request Data
        const optionData = KlarnaServiceSale.payment(paymentDetail);
        
        // Request To Get Session Id
        request.post(optionData, (err, callback, body) => {
            if (err) {
                console.error(err)
                return;
            }
            // Function To Get Session Id and Request Data
            const urlDetails = KlarnaServiceSale.getUrl(body,documentId, master_id);

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
    else if(paymentDetail.paymentMethod === 'Stripe'){
        const createStringPayment = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'SEK',
                        product_data: {
                            name: paymentDetail.documentTitle,
                        },
                        unit_amount: (Number(paymentDetail.amount)+ Number(paymentDetail.tax)) * 100 ,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${environment.STRIPE_SUCCESS_URL}?document_id=${documentId}&master_id=${master_id}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${environment.STRIPE_CANCEL_URL}?document_id=${documentId}&master_id=${master_id}`,
        });
        return res.status(200).json({redirect_url: createStringPayment.url});
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
            payerAlias:"1231231231",
            payerSSN: "",
            amount: paymentDetail.amount,
            currency: "SEK",
            message: "test success"
        }

        const options = requestOptions('POST', `${environment.SWISH_HOST}/api/v1/paymentrequests`, json)
        request(options, (error, response, body) => {

            if (!response) {
                res.status(500).send(error)
                return
            }
            res.status('error' , error, '---', response.statusCode)
            if (response.statusCode == 201) {
                const location = response.headers['location']
                const token = response.headers['paymentrequesttoken']

                const opt = requestOptions('GET', location)

                request(opt, (err, resp, body) => {

                    if (!response) {
                        res.status(500).send(error)
                        return
                    }
                    return res.status(200).json({redirect_url: resp.body['callbackUrl']+'?session_id='+resp.body['id']});
                })
            } else {
                res.send(body)
                return
            }
        })

    }
};

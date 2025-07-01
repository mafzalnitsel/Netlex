// const paymentModel = require("../models/payment")

const saleModel =  require("../models/salesModel");

exports.storePaymentInfoForStripe = function(paymentStatus,   documentId, userId, masterId, lawyerId){
    const paymentDetail = new saleModel();
    if (paymentStatus.id){
        paymentDetail.transaction_Id = paymentStatus.id;
        paymentDetail.gatewayResponse = paymentStatus;
    }

    console.log("---THIS IS SALE STRIPE SERVICES---")
    console.log( 'masterId-------' + masterId);
    console.log( 'documentId------' + lawyerId);

    
    paymentDetail.userId = userId;
    paymentDetail.schedulerId = documentId;
  //paymentDetail.userName = paymentData.shipping_address.given_name;
    paymentDetail.salesAmount = paymentStatus.amount_total;
    paymentDetail.salesAt = new Date().toISOString();
    paymentDetail.businessType = masterId;
    paymentDetail.paymentMethod = 'stripe';
    paymentDetail.status = paymentStatus.payment_status === 'paid' ? 'success' : 'failed';
    paymentDetail.lawyerId = lawyerId;
        paymentDetail.save((err, success) =>{
            if(err){
                return err;
            }
            return paymentDetail;
    });
    return paymentDetail;
}

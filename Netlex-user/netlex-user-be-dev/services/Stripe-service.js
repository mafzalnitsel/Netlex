const paymentModel = require("../models/payment")

exports.storePaymentInfoForStripe = function(paymentStatus, documentId, userId,userData){
    const paymentDetail = new paymentModel();
    if (paymentStatus.id){
        paymentDetail.transaction_Id = paymentStatus.id;
        paymentDetail.gatewayResponse = paymentStatus;
    }

    paymentDetail.userId = userId;
    paymentDetail.documentId = documentId;
    // paymentDetail.userName = paymentStatus.customer_details.email;        //On 02-01-2023
    paymentDetail.userName = userData.userName;                              //On 02-01-2023
    paymentDetail.amount = paymentStatus.amount_total;
    paymentDetail.paymentDate = new Date;
    paymentDetail.paymentMethod = 'stripe';
    paymentDetail.status = paymentStatus.payment_status === 'paid' ? 'success' : 'failed';
        paymentDetail.save((err, success) =>{
            if(err){
                return err;
            }
            return paymentDetail;
    });
    return paymentDetail;
}

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoosePaginate = require('mongoose-paginate');
const paymentScheme = new Schema({
    transaction_Id: {type: String, unique: true},
    documentId: String,
    userId: String,
    userName: String,
    amount: String,
    paymentDate: Date,
    paymentMethod: String,
    gatewayResponse: {},
    status: String,
    agreementType: String,
});

paymentScheme.plugin(mongoosePaginate);


module.exports = mongoose.model('Payment', paymentScheme);

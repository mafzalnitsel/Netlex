const appJs = require('../app');
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoosePaginate = require('mongoose-paginate');


const salesSchema = new Schema({
    transaction_Id: {type: String, unique: true},
    userId: String,
    salesAmount: String,
    salesAt: String,
    paymentMethod: String,
    businessType: String,
    status: String,
    schedulerId: String,
    lawyerId: String,
});

salesSchema.plugin(mongoosePaginate);


// Connect 'clientInstance' database
// module.exports = appJs.clientInstance.model('sales', salesSchema);
module.exports = mongoose.model('sale', salesSchema);


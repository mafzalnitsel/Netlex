const appJs = require('../app');
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoosePaginate = require('mongoose-paginate');


const sales = new Schema({
    // _id: String,
    transaction_Id: {type: String, unique: true},
    userId: String,
    salesAmount: String,
    salesAt: String,
    paymentMethod: String,
    businessType: String,
    status: String,
    schedulerId: String,
    lawyerId: String,
    gatewayResponse: {},
 
});

sales.plugin(mongoosePaginate);


// Connect 'clientInstance' database
const myDB = mongoose.connection.useDb('netlexadmin');

// module.exports = mongoose.model('sales', sales);

module.exports = myDB.model("sales", sales);




// const appJs = require('../app');                                                                                                                                      
// const mongoose = require('mongoose'),
//     Schema = mongoose.Schema,
//     mongoosePaginate = require('mongoose-paginate');
// const sales = new Schema({
//     transaction_Id: {type: String, unique: true},
//     documentId: String,
//     userId: String,
//     userName: String,
//     amount: String,
//     paymentDate: Date,
//     paymentMethod: String,
//     gatewayResponse: {},
//     status: String,
// });

//  sales.plugin(mongoosePaginate);


// // // Connect 'clientInstance' database
//  const myDB = mongoose.connection.useDb('netlexadmin');

//  module.exports = myDB.model('sales', sales);

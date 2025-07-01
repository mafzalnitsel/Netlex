const mongoose = require('mongoose');

(mongoosePaginate = require("mongoose-paginate")),
    (bcrypt = require("bcryptjs"));
    Schema = mongoose.Schema;
// Define the MongoDB schema for the contentpage collection
const contentpageSchemass= new Schema({
    name: String,
    htmlcontent: String,
});
const contentpageSchema = new Schema({
    handleYourLegal: String,
  
    agreementOnline: String,
  
    heading: String,
  
    description: String,
  
    selectAgreement: String,
  
    selectAgreementDesc: String,
  
    fillAgreement: String,
  
    fillAgreementDesc: String,
  
    purchase: String,
  
    purchaseDescription: String,
  
    availability: String,
  
    availabilityDescription: String,
  
    welcomeNote: String,
  
    startAgreement: String,
       selectAgreementImg: String,

       fillAgreementImg: String,
  
       purchaseImg: String,
  
       availabilityImg: String,
       allTimesOptions: [],
       officeTimes: [],
  }); 
// Export the contentpage model
contentpageSchema.plugin(mongoosePaginate);
const myDB = mongoose.connection.useDb('netlexadmin');
module.exports = myDB.model('contentpage', contentpageSchema);
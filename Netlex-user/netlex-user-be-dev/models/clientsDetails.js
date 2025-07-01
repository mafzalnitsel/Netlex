const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


 
const clientsDetailsSchema = new Schema({
  //From
  fromName: {
      type: String,
      unique: true,
      lowercase: true
  },
  fromPhoneNumber: {
      type: Number,
  },
  fromEmail: {
      type: String,
  },
  fromSsn: {
      type: Number,
  },
  //To
  toName: {
      type: String,
      unique: true,
      lowercase: true
  },
  toPhoneNumber: {
      type: Number,
  },
  toEmail: {
      type: String,
  },
  toSsn: {
      type: Number,
  },

});

// Export the answerType model
const myDB = mongoose.connection.useDb('netlexadmin');

module.exports = myDB.model('ClientsDetails', clientsDetailsSchema);

 
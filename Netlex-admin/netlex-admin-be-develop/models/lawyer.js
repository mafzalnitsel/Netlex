const mongoose = require('mongoose'),
mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;

// Define the MongoDB schema for the people collection
const lawyerSchema = new Schema({
  showLawyerToUser: {type: Boolean, default: false},
  firstName: {type: String},
  lastName:{type: String} ,
  email: {type: String, unique: true, lowercase: true},
  status: String,
  lawyerPic: String,
  totalMeetingAssigned: {type: Number, default: 0},
  phoneNumber: {type: Number, unique: true},
  training: String,
  languages: [],
  multipleLanguages: Boolean,
  activityArea: [],
  title: String,
  languagesOptions: [],

});

lawyerSchema.plugin(mongoosePaginate);

// Export the User model
const myDB = mongoose.connection.useDb('netlexuser');
module.exports = myDB.model('Lawyer', lawyerSchema);

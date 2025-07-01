const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define the MongoDB schema for the people collection
const lawyerSchema = new Schema({
  firstName: {type: String},
  lastName:{type: String} ,
  email: {type: String, unique: true, lowercase: true},
  status: String,
  totalMeetingAssigned: {type: Number, default: 0}, 
  showLawyerToUser: {type: Boolean, default: false}, 
  lawyerPic: String, 
  phoneNumber: {type: Number, unique: true},
  training: String,
  languages: [],
  multipleLanguages: Boolean,
  activityArea: [],
  title: String,
});

// Export the Lawyer model
const myDB = mongoose.connection.useDb('netlexuser');


module.exports = mongoose.model('Lawyer', lawyerSchema);

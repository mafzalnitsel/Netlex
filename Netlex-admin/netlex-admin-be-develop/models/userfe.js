const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoosePaginate = require('mongoose-paginate'),
    bcrypt = require('bcryptjs');

// Define the MongoDB schema for the people collection
const userSchema = new Schema({
  firstName: {type: String},
  lastName: String,
  userName: {type: String},
  ssn: {type: String, unique: true},
  email: {type: String, unique: true, lowercase: true},
  accountType: String,
  organizationId: String,
  organizationNumber: String,
  organizationName: String,
  status: String,
  role: {type: String, default: 'user'}
});

// Paginate the results
userSchema.plugin(mongoosePaginate);

// Export the User model
const myDB = mongoose.connection.useDb('netlexuser');
module.exports = myDB.model('User', userSchema);

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoosePaginate = require('mongoose-paginate'),
    bcrypt = require('bcryptjs');

// Define the MongoDB schema for the people collection
const userSchema = new Schema({
  firstName: {type: String},
  lastName: String,
  middlename: String,
  phoneno: String,
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

// // Encypt and store the user's password
// userSchema.pre('save', function(next) {
//   const user = this;
//   if (!user.isModified('password')) {
//     return next();
//   }
//   bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(user.password, salt, function(err, hash) {
//       user.password = hash;
//       next();
//     });
//   });
// });
//
// // Confirm a user's password against the stored password
// userSchema.methods.comparePassword = function(password,User, done) {
//   User.findOne({email:this.email}).select("password").exec((err,user)=>{
//     bcrypt.compare(password, user.password, function(err, isMatch) {
//       done(err, isMatch);
//     });
//   });
// };

// Export the User model
module.exports = mongoose.model('User', userSchema);

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  mongoosePaginate = require("mongoose-paginate"),
  bcrypt = require("bcryptjs");
const CryptoJS = require("crypto-js");

// Define the MongoDB schema for the people collection
const userSchema = new Schema({
  firstName: { type: String, required: "FirstNameInvalid" },
  lastName: String,
  userName: { type: String, unique: true, required: "UserNameInvalid" },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: "EmailInvalid",
  },
  password: { type: String, select: false, required: "PasswordInvalid" },
  roles: { type: String },
  profilePic: String,
  lawyerid: { type: String },
  status: { type: String, default: "Aktiv" },
  roleID: String,
  userType: String,
  itsAdminUser: Boolean,
  itsLawyerUser: Boolean,
});

// Paginate the results
userSchema.plugin(mongoosePaginate);

// Encypt and store the user's password
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  
  // console.log("user.password in user model", user.password);
  //new encryption
  const newPassword = CryptoJS.AES.encrypt(user.password, "1122").toString();
  // console.log("newPassword in user model", newPassword);
  user.password = newPassword;
  next();

  //old encryption before (23-09-2022)
  // bcrypt.genSalt(10, function(err, salt) {
  //   bcrypt.hash(user.password, salt, function(err, hash) {
  //     user.password = hash;
  //     next();
  //   });
  // });
});

// Confirm a user's password against the stored password
userSchema.methods.comparePassword = function (password, User, done) {
  User.findOne({ email: this.email })
    .select("password")
    .exec((err, user) => {
        //new comapare(23-09-2022)
      const bytes = CryptoJS.AES.decrypt(user.password, "1122");
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
      // console.log("originalPassword", originalPassword);
      if (user.password === originalPassword) {
        done(err, true);
      } else {
        done(err, false);
      }
      //old comapare before (23-09-2022)
      // bcrypt.compare(password, user.password, function(err, isMatch) {
      //   done(err, isMatch);
      // });
    });
};

// Export the User model
module.exports = mongoose.model("User", userSchema);

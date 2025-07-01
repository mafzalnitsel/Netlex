const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
(mongoosePaginate = require("mongoose-paginate")),
  (bcrypt = require("bcryptjs"));

// Define the MongoDB schema for the ClientsDetails collection
const contentPageSchema = new Schema({
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

  aboutUsHeader: String,

  aboutUsLawyerHeading: String,

  homeHeaderPic: String,
  homeHeaderType: String,
  homeHeaderPicMob: String,

  // selectAgreementImg: String,

  // fillAgreementImg: String,

  // purchaseImg: String,

  // availabilityImg: String,
  ///////////------New--------////////////
  //Colors & Images
  crystalNavbarColor: String,
  coloredNavbarColor: String,
  homeBgColor: String,
  descBgColor: String,
  servicesBgType: String,
  servicesBgColor: String,
  servicesBgImage: String,
  footerBgType: String,
  footerBgColor: String,
  footerBgImage: String,
  introImage: String,
  //Headings & Descriptions
  heroBoxTexts: [],
  introTexts: [],
  servicesAllTexts: [],
  footerparagraphTexts: [],
  //All Hero Banners (Header Images)
  agreementConfirmHeaderImg: String,
  agreementConfirmHeaderImgExist: Boolean,
  agreementHeaderImg: String,
  agreementHeaderImgExist: Boolean,
  lawyersHeaderImg: String,
  lawyersHeaderImgExist: Boolean,
  schedulerHeaderImg: String,
  schedulerHeaderImgExist: Boolean,
  questionAnswerHeaderImg: String,
  questionAnswerHeaderImgExist: Boolean,
  aboutUsHeaderImg: String,
  aboutUsHeaderImgExist: Boolean,
  findUsHeaderImg: String,
  findUsHeaderImgExist: Boolean,
  businessHeaderImg: String,
  businessHeaderImgExist: Boolean,
  termsConditionsHeaderImg: String,
  termsConditionsHeaderImgExist: Boolean,
  privacyPolicyHeaderImg: String,
  privacyPolicyHeaderImgExist: Boolean,

  //Terms And Conditions
  paragraphs: String,

  //Lawyer Activity Area Options
  activityAreaOptions: [],
  questionsCategoryOptions: [],

  //Question & Answers Color Scheme
  colorScheme: {},
  
  // Ask Agreeements Questions First
  askQuestionsFirst: Boolean,

  // Activity Areas Contents
  expertise1 : String,
  expertise2 : String,
  expertise3 : String,
  expertise4 : String,
  expertise5 : String,
  expertise6 : String,

  //Office Timings(Office hours) 
  allTimesOptions: [],
  officeTimes: [],
  ///////////------New--------////////////
});
// Paginate the results
contentPageSchema.plugin(mongoosePaginate);

// Export the ClientsDetails model
module.exports = mongoose.model("ContentPages", contentPageSchema);

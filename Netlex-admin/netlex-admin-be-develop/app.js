// Include Packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");

// Include Configuration
const config = require("./config");
const User = require("./models/user");

// Initialize the application
const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dir = path.join(__dirname, "uploadedFiles/profilePics");

app.use("/profilePics", express.static(dir));

const homePagepicsdir = path.join(__dirname, "uploadedFiles/homePagepics");
app.use("/homePagepics", express.static(homePagepicsdir));

const lawyerPicsdir = path.join(__dirname, "uploadedFiles/lawyerPics");
app.use("/lawyerPics", express.static(lawyerPicsdir));

const heroBannersdir = path.join(__dirname, "uploadedFiles/heroBanners");
app.use("/heroBanners", express.static(heroBannersdir));

const agreementVideosdir = path.join(
  __dirname,
  "uploadedFiles/agreementVideos"
);
app.use("/agreementVideos", express.static(agreementVideosdir));

const businessAgreementsdir = path.join(
  __dirname,
  "uploadedFiles/businessAgreements"
);
app.use("/businessAgreements", express.static(businessAgreementsdir));

const meetingAttachmentsdir = path.join(
  __dirname,
  "uploadedFiles/meetingAttachments"
);
app.use("/meetingAttachments", express.static(meetingAttachmentsdir));

// Connect to MongoDB
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDb Admin BE: Connected to MongoDB.");
  });

exports.clientInstance = mongoose.createConnection(config.MONGO_CLIENT_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Load app routes
require("./routes")(app);

// Start the server
const server = app.listen(config.LISTEN_PORT, function () {
  console.log("listening on port " + config.LISTEN_PORT);
});

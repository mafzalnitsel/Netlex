// Include Packages
const express = require("express");
const bodyParser = require("body-parser");
const busyboyBodyParser = require("busboy-body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");
const environment = require("./env");

// Include Configuration
const config = require("./config");

// Initialize the application
const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(busyboyBodyParser({ limit: "100mb", multi: true }));
const dir = path.join(__dirname, "uploadedFiles");

app.use(express.static(dir));

try {
  // Connect to MongoDB
  mongoose
    .connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("MongoDb: Connected to MongoDB.");
    });
  exports.clientInstance = mongoose.createConnection(config.MONGO_ADMIN_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
} catch (error) {
  console.log(error);
}

// Load app routes
require("./routes")(app);

// Start the server
const server = app.listen(config.LISTEN_PORT, function () {
  console.log("listening on port " + config.LISTEN_PORT);
});

// ------------------------------------
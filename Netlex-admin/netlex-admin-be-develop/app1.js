// Include Packages
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require('morgan');
const path = require('path');
const https = require('https');
const fs = require('fs');
const httpsPort = 30001;
// Include Configuration
const config = require('./config');
// Initialize the application
const app = express(); 
var key = fs.readFileSync(__dirname + '/certsFiles/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/certsFiles/selfsigned.crt');
var credentials = {
  key: key,
  cert: cert
};
app.get('/', (req, res) => {
   res.send('Hello World.');
});
var httpsServer = https.createServer(credentials, app);

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dir = path.join(__dirname, 'uploadedFiles/profilePics');

app.use('/profilePics', express.static(dir));

httpsServer.listen(httpsPort, () => {
  console.log("Https server listing on port : " + httpsPort)
});
// Connect to MongoDB
mongoose.connect(config.MONGO_URI,
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
    ).then(()  => {
        console.log('MongoDb: Connected to MongoDB.');
    });

exports.clientInstance = mongoose.createConnection(config.MONGO_CLIENT_URI,
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// Load app routes
require('./routes')(app);
var os = require("os");
var hostname = os.hostname();
// Start the server
const server = app.listen(config.LISTEN_PORT, function(){
    console.log('listening on port ' + config.LISTEN_PORT);
     console.log('hostname  ' + hostname);
});

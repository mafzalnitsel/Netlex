module.exports = {
// 1. MongoDB
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/netlexadmin',
    MONGO_USER_URI: process.env.MONGO_URI || 'mongodb://localhost/netlexuser',
    // Client Instance
    MONGO_CLIENT_URI: process.env.MONGO_URI || 'mongodb://localhost/netlexclient',
    
    // MONGO_URI: process.env.MONGO_URI || "mongodb+srv://mafzal:qEZBM5tMUB9DflS9@cluster0.dgqyzm9.mongodb.net/netlexadmin?retryWrites=true&w=majority&appName=Cluster0",
    // MONGO_USER_URI: process.env.MONGO_URI || "mongodb+srv://mafzal:qEZBM5tMUB9DflS9@cluster0.dgqyzm9.mongodb.net/netlexuser?retryWrites=true&w=majority&appName=Cluster0",
    // // Client Instance
    // MONGO_CLIENT_URI: process.env.MONGO_URI || "mongodb+srv://mafzal:qEZBM5tMUB9DflS9@cluster0.dgqyzm9.mongodb.net/netlexclient?retryWrites=true&w=majority&appName=Cluster0",

    // 1. MongoDB
   // MONGO_URI: process.env.MONGO_URI ||  "mongodb+srv://admin:nozhf0Z7WeOSR1de@netlex.lixpc.mongodb.net/netlexadmin?retryWrites=true&w=majority",//"mongodb+srv://admin:ZlbKFLcQOl9D10l9@netlexadmin.xthmv.mongodb.net/netlexadmin?retryWrites=true&w=majority",//'mongodb://localhost/netlexadmin',
   // MONGO_USER_URI: process.env.MONGO_URI ||  "mongodb+srv://admin:nozhf0Z7WeOSR1de@netlex.lixpc.mongodb.net/netlexuser?retryWrites=true&w=majority",//"mongodb+srv://admin:ZlbKFLcQOl9D10l9@netlexadmin.xthmv.mongodb.net/netlexuser'?retryWrites=true&w=majority",//'mongodb://localhost/netlexuser',
    // Client Instance
  //  MONGO_CLIENT_URI: process.env.MONGO_URI || "mongodb+srv://admin:nozhf0Z7WeOSR1de@netlex.lixpc.mongodb.net/netlexadmin?retryWrites=true&w=majority",//"mongodb+srv://admin:ZlbKFLcQOl9D10l9@netlexadmin.xthmv.mongodb.net/netlexadmin?retryWrites=true&w=majority",//'mongodb://localhost/netlexadmin' ,//'mongodb://localhost/netlexclient',

    // 2. JWT
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'pvpnCCZfwOF85pBjbOebZiYIDhZ3w9LZrKwBZ7152K89mPCOHtbRlmr5Z91ci4L',

    // 3. Express Server Port
    LISTEN_PORT: process.env.LISTEN_PORT || 30000
};
//mongodb+srv://admin:ZlbKFLcQOl9D10l9@netlexadmin.xthmv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://admin:<password>@cluster0.5sx2a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://admin:<password>@cluster0.5sx2a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

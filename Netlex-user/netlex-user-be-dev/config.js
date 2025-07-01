const environment = require("./env");

module.exports = {
  // 1. MongoDB

  MONGO_URI: process.env.MONGO_URI ||'mongodb://localhost/netlexuser',
  MONGO_ADMIN_URI: process.env.MONGO_URI || 'mongodb://localhost/netlexadmin',

  // mongodb://<db_username>:<db_password>@ac-5dsva58-shard-00-00.dgqyzm9.mongodb.net:27017,ac-5dsva58-shard-00-01.dgqyzm9.mongodb.net:27017,ac-5dsva58-shard-00-02.dgqyzm9.mongodb.net:27017/?ssl=true&replicaSet=atlas-uzt8fs-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0

  // MONGO_URI:
  //   process.env.MONGO_URI ||
  //   "mongodb+srv://mafzal:qEZBM5tMUB9DflS9@cluster0.dgqyzm9.mongodb.net/netlexuser?retryWrites=true&w=majority&appName=Cluster0",
  // MONGO_ADMIN_URI:
  //   process.env.MONGO_URI ||
  //   "mongodb+srv://mafzal:qEZBM5tMUB9DflS9@cluster0.dgqyzm9.mongodb.net/netlexadmin?retryWrites=true&w=majority&appName=Cluster0",

  // 2. JWT
  TOKEN_SECRET:
    process.env.TOKEN_SECRET ||
    "pvpnCCZfwOF85pBjbOebZiYIDhZ3w9LZrKwBZ7152K89mPCOHtbRlmr5Z91ci4L",

  // 3. Express Server Port
  LISTEN_PORT: process.env.LISTEN_PORT || environment.LISTEN_PORT || 3000,
};

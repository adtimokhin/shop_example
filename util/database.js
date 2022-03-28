const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://adtimokhin:9xuj1zsXjOhQh0VV@cluster0.yef33.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Successfully connected to mongoDB.");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw "No connection with mongoDB is established yet!";
  }
};
// adtimokhin
// 9xuj1zsXjOhQh0VV
module.exports.getDb = getDb;
module.exports.mongoConnect = mongoConnect;

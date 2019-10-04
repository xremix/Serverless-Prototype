var mongoClient = require("mongodb").MongoClient;


exports.connect = function(){
  mongoClient.connect(process.env.MONGO_URL, function (err, db) {
    db.close();
  });

}

var mongoClient = require("mongodb").MongoClient;


exports.connect = function(context, callback){
  context.log("Going to connect to mongo db " + process.env.MONGO_URL);
  mongoClient.connect(process.env.MONGO_URL, function (err, db) {
    context.log("connection successfull, running callback now " + (typeof callback));
    var dbo = db.db("prototype-db");
    callback(err, db, dbo);
    context.log("callback finished");
  });
}

'use strict';
var mongoClient = require('mongodb').MongoClient;

exports.connect = function(context, callback) {
  context.log('Going to connect to mongo db ' + process.env.MONGO_URL);
  mongoClient.connect(process.env.MONGO_URL, function(err, db) {
    context.log('connection successfull, running callback now ' + (typeof callback));
    var dbo = db.db(process.env.MONGO_DB);
    callback(err, db, dbo);
    context.log('callback finished');
  });
};

exports.getPromiseConnection = function (context, callback){
  context.log('starting promise');
  return new Promise(function (resolve, reject) {
    context.log('Going to connect to mongo db ' + process.env.MONGO_URL);
    mongoClient.connect(process.env.MONGO_URL, function(err, db) {
      context.log('connection successfull, running callback now ' + (typeof callback));
      var dbo = db.db(process.env.MONGO_DB);
      context.log('starting mongo client');

      if (err) {
        context.log('error openning the connection ' + err);
        reject(err);
        return;
      }
      callback(err, db, dbo, resolve, reject);
    });




  });
};

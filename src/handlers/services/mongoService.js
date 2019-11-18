'use strict';
var mongoClient = require('mongodb').MongoClient;

exports.connect = function(context, callback) {
  context.log('Going to connect to mongo db ' + process.env.MONGO_URL);
  mongoClient.connect(process.env.MONGO_URL, function(err, db) {
    context.log('[connect] connection successfull, running callback now ' + (typeof callback));
    var dbo = db.db(process.env.MONGO_DB);
    callback(err, db, dbo);
    context.log('callback finished');
  });
};

exports.getPromiseConnection = function (context, callback){
  context.log('starting promise');
  return new Promise(function (resolve, reject) {
    context.log('[promise connect] Going to connect to mongo db ' + process.env.MONGO_URL);
    mongoClient.connect(process.env.MONGO_URL, function(err, db) {
      context.log('[promise connect] connection successfull, running callback now ' + (typeof callback));
      context.log('err');
      context.log(err);
      context.log('db');
      context.log(db);
      var dbo = db.db(process.env.MONGO_DB);
      context.log('[promise connect] starting mongo client');

      if (err) {
        context.log('error openning the connection ' + err);
        reject(err);
        return;
      }
      callback(err, db, dbo, resolve, reject);
    });




  });
};

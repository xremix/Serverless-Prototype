'use strict';
var mongoClient = require('../services/mongoService');

var find = function(context) {
  return new Promise(function(resolve, reject) {
    context.log('starting mongo client');
    mongoClient.connect(context, function(err, db, dbo) {
      context.log('Connected to the mongo db, lets gather some data');
      if (err) throw err;
      dbo.collection('customers').find({}).toArray(function(err, result) {
        db.close();
        if (err) {
          context.log('rejecting');
          reject(err);
          return;
        }
        context.log('resolving');
        resolve(result);
      });
    });
  });
};

var add = function(cus, context) {
  return new Promise(function(resolve, reject) {
    context.log('starting mongo client');
    mongoClient.connect(context, function(err, db, dbo) {
      if (err) throw err;
      dbo.collection('customers').insertOne(cus, function(err, result) {
        db.close();

        if (err) {
          context.log('rejecting');
          reject(err);
          return;
        }
        resolve(result.ops[0]);
      });
    });
  });
};
var remove = function(id, context) {
  return new Promise(function(resolve, reject) {
    context.log('starting mongo client');
    mongoClient.connect(context, function(err, db, dbo) {
      if (err) throw err;
      var query = {
        id: id
      };
      dbo.collection('customers').deleteOne(query, function(err, result) {
        db.close();

        if (err) {
          context.log('rejecting');
          reject(err);
          return;
        }
        resolve({
          deletedCount: result.deletedCount
        });
      });
    });
  });
};

module.exports.add = add;
module.exports.find = find;
module.exports.remove = remove;

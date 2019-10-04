'use strict';
var mongoClient = require('../services/mongoService');

var find = function(context) {
  return mongoClient.getPromiseConnection(context, function(err, db, dbo, resolve, reject){
    if(err){return;}
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
};

var add = function(cus, context) {
  return mongoClient.getPromiseConnection(context, function(err, db, dbo, resolve, reject){
    if(err){return;}
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
};

var remove = function(id, context) {
  return mongoClient.getPromiseConnection(context, function(err, db, dbo, resolve, reject){
    if(err){return;}
    var query = {
      _id: id
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
};

module.exports.add = add;
module.exports.find = find;
module.exports.remove = remove;

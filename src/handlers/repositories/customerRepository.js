'use strict';
var mongoClient = require('../services/mongoService');

var requestToModel = function(body){
  var cus = {
    _id: body.id,
    id: body.id,
    name: body.name,
    address: body.address,
    city: body.city,
    zip: body.zip,
    country: body.country
  };
  return cus;
}

var find = function(context) {
  return mongoClient.getPromiseConnection(context, function(err, db, dbo, resolve, reject){
    if(err){
      context.log('error');
      reject(err);
      return;
    }
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
    if(err){
      context.log('error');
      reject(err);
      return;
    }
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

var edit = function(cus, context) {
  context.log('starting update of ' + cus);
  return mongoClient.getPromiseConnection(context, function(err, db, dbo, resolve, reject){
    context.log('got the connection')
    if(err){
      context.log('error');
      reject(err);
      return;
    }
    context.log('Am going to update the customer now');
    context.log(cus);
    dbo.collection('customers').findAndModify(
      {"_id": cus.id},
      {"$set":cus},
      function(err, result) {
        context.log('findAndModify called');
        db.close();

        if (err) {
          context.log('rejecting because of error');
          context.log(err);
          context.error(err);
          reject(err);
          return;
        }
        context.log('findAndModify was a success');
        context.log(result);
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
  module.exports.edit = edit;
  module.exports.find = find;
  module.exports.remove = remove;
  module.exports.requestToModel = requestToModel;

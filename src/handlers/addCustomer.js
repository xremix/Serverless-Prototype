'use strict';
require('dotenv').config()
var mongoClient = require('./services/mongoService');

module.exports.handler = async function(context, req) {
  if (!(req.body && req.body.name)) {
    context.res = {
      status: 400,
      body: 'Please pass a name in the request body',
    };
    return;
  }

  var p = new Promise(function (resolve, reject) {
    mongoClient.connect(context, function(err, db, dbo){
      if (err) throw err;
      var cus = { name: req.body.name };
      dbo.collection("customers").insertOne(cus, function(err, result) {
        if (err) throw err;
        db.close();
        resolve(result);
      });
    });
  });

  let resolve = await p;
  context.res = {
    status: 200,
    body: resolve
  };
};

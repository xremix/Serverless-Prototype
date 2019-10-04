'use strict';
require('dotenv').config()
var mongoClient = require('./services/mongoService');

module.exports.sayGoodbye = async function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  // if (!req.query.name && !(req.body && req.body.name)) {
  //   context.res = {
  //     status: 400,
  //     body: 'Please pass a name on the query string or in the request body',
  //   };
  //   return;
  // }
  var p = new Promise(function (resolve, reject) {
    context.log("starting mongo client");
    mongoClient.connect(context, function(err, db){
      context.log('Connected to the mongo db, lets gather some data');

      if (err) throw err;
      var dbo = db.db("prototype-db");
      var query = {  };
      dbo.collection("customers").find(query).toArray(function(err, result) {
        if (err) throw err;
        // console.log(result);
        db.close();
        resolve(result);
      });
    });
  });

  let resolve = await p;
  context.log(resolve);
  context.res = {
    status: 200,
    body: resolve,
  };

};

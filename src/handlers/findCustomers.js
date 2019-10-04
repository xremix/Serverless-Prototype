'use strict';
require('dotenv').config()
var mongoClient = require('./services/mongoService');


module.exports.handler = async function(context, req) {
  context.log('Starting findCustomers');

  var p = new Promise(function (resolve, reject) {
    context.log("starting mongo client");
    mongoClient.connect(context, function(err, db, dbo){
      context.log('Connected to the mongo db, lets gather some data');
      if (err) throw err;
      dbo.collection("customers").find({  }).toArray(function(err, result) {
        if (err) throw err;
        // console.log(result);
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

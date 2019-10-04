'use strict';
require('dotenv').config()
var mongoClient = require('./services/mongoService');

module.exports.handler = async function(context, req) {
  if (!(req.query.id)) {
    context.res = {
      status: 400,
      body: 'Please pass an id as a query parameter',
    };
    return;
  }

  var p = new Promise(function (resolve, reject) {
    mongoClient.connect(context, function(err, db, dbo){
      if (err) throw err;
      var query = { id: Number(req.query.id) };
      dbo.collection("customers").deleteOne(query, function(err, result) {
        if (err) throw err;
        db.close();
        resolve({deleted: result.deletedCount});
      });
    });
  });

  let resolve = await p;
  context.res = {
    status: 200,
    body: resolve
  };
};

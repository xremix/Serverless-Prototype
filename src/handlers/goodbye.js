'use strict';
require('dotenv').config()

module.exports.sayGoodbye = async function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  if (req.query.name || (req.body && req.body.name)) {
     var promise1 = new Promise(function (resolve, reject) {

         setTimeout(function () {
           req.query.name = 'async ' + req.query.name;
             resolve('foo');
         }, 10);

     });

     context.log(promise1);

     // Use await instead of promise.then(...)

     let resolve = await promise1;
     context.log(resolve);
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: 'Goodbye ' + (req.query.name || req.body.name),
    };
  } else {
    context.res = {
      status: 400,
      body: 'Please pass a name on the query string or in the request body',
    };
  }
};

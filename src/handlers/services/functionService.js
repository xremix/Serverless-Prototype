var http = require('http');

exports.callFunction = function(context, callback, errorCallback) {

    context.log('JavaScript HTTP trigger function processed a request.');

   var options = {
       host: 'example.com',
       port: '80',
       path: '/test',
       method: 'POST'
   };

   // Set up the request
   var req = http.request(options, (res) => {
     var body = "";

     res.on("data", (chunk) => {
       body += chunk;
     });

     res.on("end", () => {
       context.res = body;
       // context.done();
       // Done
       callback();
     });
   }).on("error", (error) => {
     errorCallback(error);
     context.log('error');
     // context.res = {
     //   status: 500,
     //   body: error
     // };
     // context.done();
   });
   req.end();
};

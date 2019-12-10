const axios = require('axios');
// const url = 'https://google.com';

exports.callFunction = async function (context, callback, errorCallback) {
context.log('[functionService] callFunction');
  try {
    var host = process.env.FUNCTION_HOST;
    var url = 'http://' + host + '/api/allCustomers';
    context.log('[functionService] going to get ' + url);
    const { data } = await axios.get(url);
    context.log('[functionService] recieved response');
    context.log(data);
    callback(data);
    // do something with the data
  } catch (err) {
    errorCallback(err);
    context.error(err);
  }

  context.done();
}

// var http = require('http');
//
// exports.callFunction = function(context, callback, errorCallback) {
//   context.log('[functionService] started callFunction');
//
//   var host = process.env.FUNCTION_HOST;
//   var options = {
//     host: host,
//     port: '80',
//     path: '/api/allCustomers',
//     method: 'GET'
//   };
//
//   context.log('[functionService] Sending request now');
//   context.log(host);
//   context.log(options);
//
//   // Set up the request
//   var req = http.request(options, (res) => {
//     context.log('[functionService] request sent');
//     var body = ';
//
//     res.on('data', (chunk) => {
//       context.log('[functionService] data recieved');
//       body += chunk;
//     });
//
//     res.on('end', () => {
//       context.log('[functionService] request ends');
//       context.res = body;
//       // context.done();
//       // Done
//       callback();
//     });
//   }).on('error', (error) => {
//     context.error('[functionService] error during request');
//     context.error(error);
//     errorCallback(error);
//     // context.res = {
//     //   status: 500,
//     //   body: error
//     // };
//     // context.done();
//   });
//   req.end();
// };

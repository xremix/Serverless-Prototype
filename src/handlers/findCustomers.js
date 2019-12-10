'use strict';
require('dotenv').config()
var functionService = require('./services/functionService');

module.exports.handler = async function(context, req) {
  context.log('[findCustomers] recieved findCustomer requests');

  if (!(req.query.q)) {
    context.res = {
      status: 400,
      body: 'Please pass q as a query parameter',
    };
    return;
  }

  var query = req.query.q;

  // I know this part makes not too much sense from an architectural standpoint, but this is for prototyping reasons to see how other functions can get called
  await functionService.callFunction(context, function(data){
    context.log(typeof data);
    context.log(data);
    context.log('[findCustomer] Filtering data');
    var filteredData = data.filter(c => c.name.toLowerCase().indexOf(query.toLowerCase()) >= 0);
    context.log('[findCustomer] data after filter');
    context.log(data);

    // success
    context.res = {
      status: 200,
      body: filteredData
    }
  },
  function(error){
    // Error
    context.log('[findCustomers] recieved error');
    context.res = {
      status: 500,
      body: error
    };
  });
};

'use strict';
require('dotenv').config()
var functionService = require('./services/functionService');

module.exports.handler = async function(context, req) {
  context.log('[findCustomers] recieved findCustomer requests');
  functionService.callFunction(context, function(data){
    context.log('[findCustomers] recieved data');
    // success
    context.res = {
      status: 200,
      body: data
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

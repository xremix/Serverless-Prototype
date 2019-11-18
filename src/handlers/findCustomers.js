'use strict';
require('dotenv').config()
var functionService = require('./services/functionService');

module.exports.handler = async function(context, req) {
  functionService.callFunction(context, function(data){
    // success
    context.res = {
      status: 200,
      body: data
    }
  },
  function(error){
    // Error
    context.res = {
      status: 500,
      body: error
    };
  });
};

'use strict';
require('dotenv').config()
var customerRepo = require('./repositories/customerRepository');

module.exports.handler = async function(context, req) {
  context.log('Starting all customers');
  try {
    let result = await customerRepo.find(context);
    context.res = {
      status: 200,
      body: result
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error
    };
  }

};

'use strict';
require('dotenv').config()
var customerRepo = require('./repositories/customerRepository');

module.exports.handler = async function(context, req) {
  if (!(req.body && req.body.name && req.body.id)) {
    context.res = {
      status: 400,
      body: 'Please pass a name and id in the request body',
    };
    return;
  }

  var cus = customerRepo.requestToModel(req.body);

  try {
    let result = await customerRepo.add(cus, context);
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

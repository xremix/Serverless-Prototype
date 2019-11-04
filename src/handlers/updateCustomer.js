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

  var cus = {
    _id: req.body.id,
    id: req.body.id,
    name: req.body.name
  };
  try {
    context.log('Recieved data for update ' + cus);
    let resolve = await customerRepo.update(cus, context);
    context.res = {
      status: 200,
      body: resolve
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error
    };
  }
};

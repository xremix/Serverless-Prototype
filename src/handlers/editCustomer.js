'use strict';
require('dotenv').config()
var customerRepo = require('./repositories/customerRepository');

module.exports.handler = async function (context, req) {
  context.log('[editCustomer] recieved request');
  if (!(req.body && req.body.name && req.body.id)) {
    context.res = {
      status: 400,
      body: 'Please pass a name and id to the body',
    };
    return;
  }

  var cus = customerRepo.requestToModel(req.body);

  context.log('[editCustomer] created customer, going to edit now');
  try {
    let resolve = await customerRepo.edit(cus, context);

    context.res = {
      status: 200,
      body: resolve
    };
  }catch(error){
    context.log('Error occured while updating the customer');
    context.log(error);
    context.res = {
      status: 500,
      body: error
    };
  }
};

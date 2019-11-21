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

  var cus = {
    _id: req.body.id,
    id: req.body.id,
    name: req.body.name
  };

  context.log('[editCustomer] created customer, going to edit now');

  let resolve = await customerRepo.edit(cus, context);

  context.res = {
    status: 200,
    body: resolve
  };
};

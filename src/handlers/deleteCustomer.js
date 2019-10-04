'use strict';
require('dotenv').config()
var customerRepo = require('./repositories/customerRepository');

module.exports.handler = async function (context, req) {
  if (!(req.query.id)) {
    context.res = {
      status: 400,
      body: 'Please pass an id as a query parameter',
    };
    return;
  }

  let resolve = await customerRepo.remove(Number(req.query.id), context);

  context.res = {
    status: 200,
    body: resolve
  };
};

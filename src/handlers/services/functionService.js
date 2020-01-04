const axios = require('axios');

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
  } catch (err) {
    errorCallback(err);
    context.error(err);
  }
  context.done();
}

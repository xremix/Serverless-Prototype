# Azure Functions

Refer to [Serverless docs](https://serverless.com/framework/docs/providers/azure/guide/intro/) for more information.

## Run locally
```
serverless offline
serverless invoke local --function hello --data '{"pathParameters":{"name":"123456"}}'
serverless invoke local --function addCustomer --data '{"name":"123456", "id": 9}'
```

## Known Issues

If you have general issues logging into azure because of `Authentication returned an empty list of subscriptions` do the following steps here: https://github.com/serverless/serverless-azure-functions#advanced-authentication

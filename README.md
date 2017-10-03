# Apigee for Google Cloud ML Engine

This is a sample Apigee proxy for creating a multi single tenant service for Google Cloud ML Engine Online Prediction

Follow the Cloud ML Engine Sample to set up a online prediction model in your GCP project. For example,
https://github.com/GoogleCloudPlatform/cloudml-samples/tree/master/census

You need to store GCP client ID/secret and Oauth access/refresh token to Apigee environment-specific KVM.

Client ID/secret are available at 
https://code.google.com/apis/console

Use oauth_gen.js to create oauth access and refresh token.

To store these data to KVM, follow [Apigee Instruction](http://docs.apigee.com/management/apis/post/organizations/%7Borg_name%7D/environments/%7Benv_name%7D/keyvaluemaps)

Sample request body
```
{   
 "name" : "oauth",
 "encrypted" : "true",
 "entry" : [ 
  {
   "name" : "access_token",
   "value" : "YOUR_VALUE" 
  },
  {
   "name" : "client_secret",
   "value" : "YOUR_VALUE" 
  },
  {
   "name" : "refresh_token",
   "value" : "YOUR_VALUE" 
  },
  {
   "name" : "client_id",
   "value" : "YOUR_VALUE" 
  } 
 ]
}
```

Update REDIRECT_URL, PROJECT_NAME, MODEL_NAME and VERSION_NAME in apiproxy/resources/node/server.js with your own value.

Then Deploy the proxy to [apigeetool](https://www.npmjs.com/package/apigeetool/tutorial)
```
apigeetool deployproxy -u USERNAME -p PASSWORD -o ORG -e test -n online_prediction -d .
```
Where:

* USERNAME: Your Apigee user name
* PASSWORD: Your Apigee password
* ORG: Your Apigee organization name


To use, send a online prediction request to Apigee endpoint. For example, here is an sample online prediction request for census model.

```
curl -H "Content-Type: application/json" -X POST -d '{"instances":[{"age":25,"workclass":"Private","education":"11th","education_num":1,"marital_status":"Never-married","occupation":"Machine-op-inspct","relationship":"Own-child","race":"Black","gender":"Female","capital_gain":0,"capital_loss":0,"hours_per_week":40,"native_country":"United-States"}]}' http://[your-endpoint].apigee.net/
```

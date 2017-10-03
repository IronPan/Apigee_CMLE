# Apigee for Google Cloud ML Engine

This is a sample Apigee proxy for creating a multi single tenancy for using Google Cloud ML Engine  

First store GCP client ID/secret and Oauth access/refresh token to Apigee environment-specific KVM.

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

Update REDIRECT_URL and PROJECT_NAME in apiproxy/resources/node/server.js with your own value.

Then Deploy the proxy to [apigeetool](https://www.npmjs.com/package/apigeetool/tutorial)
```
apigeetool deployproxy -u USERNAME -p PASSWORD -o ORG -e test -n online_prediction -d .
```

To run:


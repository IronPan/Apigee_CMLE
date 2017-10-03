var http = require('http');
var apigee = require('apigee-access');
var httpreq = require('httpreq');
var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;

var REDIRECT_URL = 'YOUR_PREDICT_URL';
var PROJECT_NAME = 'YOUR_GCP_PROJECT_NAME';
var OP_URL = 'https://ml.googleapis.com/v1/projects/' + PROJECT_NAME + '/jobs';
var oauth2Client;

function responseHandlerOauthExpire(resp) {
    oauth2Client.refreshAccessToken(function(err, tokens) {
        httpreq.get(OP_URL, {
            headers: {
                'Authorization': 'Bearer ' + oauth2Client.credentials.access_token
            },
        }, function(err, res) {
            if (!err && res.statusCode == 200) {
                resp.writeHead(200, {'Content-Type': 'text/plain'});
                resp.end(res.body);
            }
            else{
                resp.writeHead(400, {'Content-Type': 'text/plain'});
                resp.end(res.body);
            }
        })
    });
}



function innerRequestHandler(req, resp) {
    httpreq.get(OP_URL, {
        headers: {
            'Authorization': 'Bearer ' + oauth2Client.credentials.access_token
        },
    }, function(err, res) {
        if (!err && res.statusCode == 200) {
            resp.writeHead(200, {'Content-Type': 'text/plain'});
            resp.end(res.body);
        } else {
            responseHandlerOauthExpire(resp);
        }
    });
}

function requestHandler(req, resp){
    var kvm = apigee.getKeyValueMap('oauth', 'environment');
    
    kvm.get('client_id', function(err, key_value) {
        var client_id = key_value;
        kvm.get('client_secret', function(err, key_value) {
            var client_secret = key_value;
                kvm.get('access_token', function(err, key_value) {
                    var access_token_default = key_value;
                    kvm.get('refresh_token', function(err, key_value) {
                        var refresh_token_default = key_value;

                        oauth2Client = new OAuth2Client(client_id, client_secret, REDIRECT_URL);
    
                        // Retrieve tokens via token exchange explained above or set them:
                        oauth2Client.setCredentials({
                            access_token: access_token_default,
                            refresh_token: refresh_token_default
                        });
                        innerRequestHandler(req,resp);
                        
                });
            });
        });
    });
}

var svr = http.createServer(requestHandler);



svr.listen(9000, function() {
    console.log('The server is listening on port 9000');
});

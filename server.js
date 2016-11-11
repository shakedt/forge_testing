var express = require('express');
var https = require('https');

var app = express();
app.use('/', express.static(__dirname + '/www'));

app.get('/api/auth', function (req, authRes) {
    var options = {
        host: 'sleepy-river-3525.herokuapp.com',
        path: '/api/token',
        method: 'GET'
    };

    https.get(options, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            authRes.setHeader("Content-Type", "application/json");
            authRes.end(body);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });

});

app.set('port', process.env.PORT || process.argv[2] || 3000);
var server = app.listen(app.get('port'), function() {

    console.log('Server listening on: ');
    console.log(server.address());
    console.log('Open this link to see the app: http://localhost:' + app.get('port') + '/');
});
var http = require('http');
var url = require('url');
var queryString = require('querystring');
var path = require('path');
var fs = require('fs');
var port = process.env.PORT || 80;
var server = http.createServer();

function res404(res) {
    res.statusCode = 404;
    res.statusMessage = 'Not Found';
    res.end();
};

function sendFile(filePath, res) {
    fs.exists(filePath, function(isExists) {
        if (isExists) {
            fs.readFile(filePath, function(err, data) {
                if (err) {
                    res.statusCode = 500;
                    res.statusMessage = 'Internal Server Error';
                    res.end();
                } else {
                    res.statusCode = 200;
                    res.statusMessage = 'OK';
                    res.end(data);
                }
            });
        } else {
            res404(res);
        }
    });
};

server.on('request', function(req, res) {
    var chunks = [];

    req.on('data', function(chunk) {
        chunks.push(chunk);
    });

    req.on('end', function() {
        var urlObj = url.parse(req.url);
        if (chunks.length) {
            bodyStr = (Buffer.concat(chunks)).toString('utf8');
            if (req.headers['Content-Type'] === 'application/json') {
                req.body = JSON.parse(bodyStr);
            } else {
                req.body = bodyStr;
            }
        }

        if (urlObj.pathname === '/favicon.ico') {

            res404(res);

        } else if (urlObj.pathname === '/') {

            sendFile(path.join(__dirname, 'static', 'index.html'), res);

        } else {

            var pathObj = path.parse(urlObj.pathname);
            if (pathObj.ext) {
                sendFile(path.join(__dirname, 'static', pathObj.base), res);
            } else {

                switch (urlObj.pathname) {
                    case '/aaa':
                        if (req.method.toUpperCase() === 'POST') {
                            console.dir(req.body);
                            res.end('aaa');
                        }
                        break;
                    default:
                        res404(res);
                }

            }

        }
    });


});

server.listen(port, function() {
    console.log('server start on port: ' + port);
});

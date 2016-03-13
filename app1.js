var http = require('http');
var url = require('url');
var queryString = require('querystring');

var server = http.createServer();

server.on('request', function(req, res){
	if(req.url !== '/favicon.ico'){
		var query = url.parse(req.url).query;
		var cbkstr = queryString.parse(query).callback;
		res.end(cbkstr + '(' + '{ret: 111}' + ')');
	} else {
		res.end();
	}
});

server.listen(3000, function(){
	console.log('server start on port 3000');
});
const http =require('http');
const database = require('./routes/database');
const url = require('url'); 
const stringDecoder = require('string_decoder').StringDecoder;
const handlers = require('./routes/handlers');
var server = http.createServer();
var port  = process.env.PORT || 3000;

server.on('request', function(req,res){
    //console.log(req);
    let parsedUrl = url.parse(req.url, true);
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g,'');
    let method = req.method.toLowerCase()
    let querystringObject = parsedUrl.query;
    let headers = req.headers;
    let decoder = new stringDecoder('utf-8')
    let buffer = '';
    req.on('data', function(data){
        buffer += decoder.write(data);
    })
    req.on('end', function(){
        buffer += decoder.end();
        var choosenPath = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound
        var data = {
            trimmedPath: trimmedPath,
            qyeryString: querystringObject,
            method: method,
            headers: headers,
            inputPayload:buffer
        }
        //choosen path callback function is for giving response to client
        choosenPath(data, function(statuscode, outputpayload, setheader){
                    let acceptableMethod = ['get','post','put','delete']
                    let statusCode = typeof(statuscode) === 'number' ? statuscode : 200;
                    let outputPayload = typeof(outputpayload) !== 'undefined' ? outputpayload :{};
                     let setHeader = setheader || 'application/json';
                     let outputData = JSON.stringify(outputPayload);
                     res.setHeader('content-type', setHeader);
                     res.writeHead(statusCode);
                     res.end(outputData);

        })

    })
})
server.listen(port, function(){
    console.log("server is running on "+port);
})
var router = {
    ping: handlers.ping,
    requestData: handlers.requestData,
    postData: handlers.postData
}
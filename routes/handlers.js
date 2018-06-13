const messagesModel = require('../models/messages');
const carryData = require('../models/carry');

var handlers = {};

handlers.ping = function(data, callback){
    var template =`<h1>Ok</h1>`;
    console.log(data.inputPayload);
    callback(200, template, 'text/html');
}
handlers.notFound = function(data, callback){
    var template = `<h1>Not Found</h1>`;
    console.log(data.inputPayload);s
    callback(404, template, 'text/html');
}
handlers.postData = function(data, callback){
    let entry = JSON.parse(data.inputPayload);
    let newMessage = new messagesModel({
        name: entry.name,
        email: entry.email,
        subject: entry.subject,
        clientMessage: entry.clientMessage
    })
    newMessage.save().then((data)=>{
        callback(200,data);
    },(err)=>{
            callback(400, e);
    })
}
handlers.requestData = function(data, callback) {
    let entry = JSON.parse(data.inputPayload);
    console.log(entry);
    if(entry.type === 'pass'){
        carryData.find().then((caData)=>{
            callback(200, caData);
        }, (e)=>{
            console.log(400, e);
        })
    } else if(entry.type === 'message'){
        messagesModel.find().then((data)=>{
            callback(200, data);
        }, ()=>{
            callback(400, e);
        })
    } else{
        console.log('No data');
    }
}


module.exports = handlers;
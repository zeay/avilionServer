const mongoose = require('mongoose');

var messages = mongoose.model('messages', {
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    clientMessage: {
        type: String,
        required: true,
        trim: true
    }
})

// var newMessages = new messages({
//     name: 'test',
//     email: 'test@gmail.com',
//     subject: 'testing',
//     clientMessage: 'testing the Api'
// })
// newMessages.save().then((data)=>{
//     console.log(data);
// }, (e)=>{
//     console.log(e);
// })

module.exports = messages;
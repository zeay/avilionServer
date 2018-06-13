const mongoose = require('mongoose');

var crisisdatas = mongoose.model('crisisdatas',{
    password: {
        type: String
    }
})

module.exports = crisisdatas;
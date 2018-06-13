const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://adminfhn:guess007@ds159020.mlab.com:59020/fhndatabase');
console.log("Mongo Started");



module.exports = mongoose;

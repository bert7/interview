var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var userSchema = new Schema({
    firstname   : { type : String , unique : true, required : true },
    city        : { type : String , unique : false, required : true },
    profession  : { type : String , unique : false, required : true },
    password    : { type : String , unique : false, required : true }
});

var User = mongoose.model('User', userSchema);

module.exports = User;

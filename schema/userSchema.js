// The User model

var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var userSchema = new Schema({
    email: { type: String, unique: true},
    name: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);
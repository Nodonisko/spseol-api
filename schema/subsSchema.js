// The Substitution model

var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var subsSchema = new Schema({
    date: { type: Date, unique: true},
    classSubs: {},
    classAbs: {}
});

module.exports = mongoose.model('Subs', subsSchema);
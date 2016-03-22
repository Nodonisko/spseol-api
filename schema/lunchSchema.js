// The Lunch model

var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var lunchSchema = new Schema({
    date: { type: Date, unique: true},
    created: Date,
    menu: [{}]
});

lunchSchema.pre('save', function (next) {
    if (!this.created) this.created = new Date;
    next();
});

module.exports = mongoose.model('Lunch', lunchSchema);
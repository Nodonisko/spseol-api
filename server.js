/**
 * Created by daniel on 2/15/16.
 */
var restify = require('restify');
var mongojs = require('mongojs');
var morgan = require('morgan');
var server = restify.createServer();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodeserver');


server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(morgan('dev')); // LOGGER

// CORS
server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

server.listen(process.env.PORT || 9804, function () {
    console.log("Server started @ ", process.env.PORT || 9804);
});

var manageUsers = require('./auth/manageUser')(server);
var manageLunch = require('./lunch/lunchList')(server);
var manageSubs = require('./subs/subsList')(server);
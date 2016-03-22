var validateRequest = require('../auth/validateRequest.js');
var Subs = require('../schema/subsSchema');

module.exports = function (server, db) {

    var ContentType = {'Content-Type': 'application/json; charset=utf-8'};

    server.get('/api/spseol/subs/list', function (req, res, next) {
        Subs.find({
            date: {$gt: new Date()}
        }, function(err, data){
            if (err) {
                console.log(err);
                res.writeHead(400, ContentType);
                res.end(JSON.stringify({
                    error: "Error during lunch list query",
                    message: "Please, try again later"
                }));
            } else {
                res.writeHead(200, ContentType);
                res.end(JSON.stringify(data));
            }
        });
        return next();
    });

    server.post('/api/spseol/subs/item', function (req, res, next) {
        //validateRequest.validate(req, res, db, function () {
            var item = req.params;
            new Subs(item).save(function(err, data){
                if(err){
                    console.log(err);
                    res.writeHead(400, ContentType);
                    res.end(JSON.stringify({
                        error: "Error during substitution insert"
                    }));
                }else {
                    res.writeHead(200, ContentType);
                    res.end(JSON.stringify(data));
                    console.log(data);
                }
            });
        //});
        return next();
    });

    server.del('/api/spseol/subs/list', function (req, res, next) {
        //validateRequest.validate(req, res, db, function () {
            Subs.remove({}, function(err){
                if(err) {
                    console.log(err);
                    res.writeHead(400, ContentType);
                    res.end(JSON.stringify({
                        error: "Delete all failed"
                    }));
                } else {
                    res.writeHead(200, ContentType);
                    res.end(JSON.stringify('success'));
                }
            });
        //});
        return next();
    });
}
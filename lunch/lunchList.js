var validateRequest = require('../auth/validateRequest.js');
var Lunch = require('../schema/lunchSchema');

module.exports = function (server) {

    var ContentType = {'Content-Type': 'application/json; charset=utf-8'};

    server.get('/api/spseol/lunch/list', function (req, res, next) {
        console.log("getting lunch list");
        //validateRequest.validate(req, res, db, function () {
        Lunch.find({}, function (err, list) {
            if (err) {
                res.writeHead(400, ContentType);
                res.end(JSON.stringify({
                    error: "Error during lunch list query",
                    message: "Please, try again later"
                }));
            } else {
                res.writeHead(200, ContentType);
                res.end(JSON.stringify(list));
            }
        });
        //});
        return next();
    });

    server.post('/api/spseol/lunch/item', function (req, res, next) {
        validateRequest.validate(req, res, function () {
            var item = req.params;
            item = new Lunch(item);

            item.save(function (err, data) {
                if (data) {
                    res.writeHead(200, ContentType);
                    res.end(JSON.stringify(data));
                } else {
                    res.writeHead(400, ContentType);
                    res.end(JSON.stringify({
                        error: "Error while saving into DB",
                        message: err
                    }));
                }
            });
        });
        return next();
    });

    /*

     server.get('/api/spseol/lunch/item/:id', function (req, res, next) {
     validateRequest.validate(req, res, function () {
     db.lunch.find({
     _id: db.ObjectId(req.params.id)
     }, function (err, item) {
     if (err !== null) {
     res.writeHead(400, ContentType);
     res.end(JSON.stringify({
     error: "Error during lunch list query",
     message: "Maybe lunch doesnt exist, or try again later"
     }));
     } else {
     res.writeHead(200, ContentType);
     res.end(JSON.stringify(item));
     }
     });

     }
     );
     return next();
     });

     server.put('/api/spseol/lunch/item/:id', function (req, res, next) {
     validateRequest.validate(req, res, function () {
     var item = req.params;
     delete item.id;

     db.lunch.findOne({
     _id: db.ObjectId(req.params.id)
     }, function (err, data) {
     if (err !== null) {
     res.writeHead(400, ContentType);
     res.end(JSON.stringify({
     error: "Error during item update",
     message: err
     }));
     } else {
     db.lunch.updateOne()
     res.writeHead(200, ContentType);
     res.end(JSON.stringify(data));
     }
     });
     });
     return next();
     });

     server.del('/api/spseol/lunch/item/:id', function (req, res, next) {
     validateRequest.validate(req, res, function () {
     db.lunch.remove({
     _id: db.ObjectId(req.params.id)
     }, function (err, data) {
     res.writeHead(200, ContentType);
     res.end(JSON.stringify(data));
     });
     });
     return next();
     });

     */
}
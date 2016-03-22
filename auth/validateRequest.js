var User = require('../schema/userSchema');

var isEmailValid = function (email, callback) {
    User.findOne({
        email: email
    }, function (err, user) {
        console.log(email);
        console.log(err, user);
        callback(user);
    });
};

var ContentType = {'Content-Type': 'application/json; charset=utf-8'};

module.exports.validate = function (req, res, callback) {

    var token = req.params.token;
    if(!token)
        token = req.headers.token;

    if (!token) {
        res.writeHead(403, ContentType);
        res.end(JSON.stringify({
            error: "You are not authorizated",
            message: "An email is required as part of header"
        }));
    }

    isEmailValid(token, function (user) {
        if (!user) {
            res.writeHead(403, ContentType);
            res.end(JSON.stringify({
                error: "You are not authorizated",
                message: "Wrong email"
            }));
        } else {
            callback();
        }
    });
}
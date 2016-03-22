var passManager = require('./managePasswords');
var User = require('../schema/userSchema');

module.exports = function (server) {

    var ContentType = {'Content-Type': 'application/json; charset=utf-8'};

    server.post('/api/spseol/auth/login', function (req, res, next) {
        var user = req.params;

        if (user.email.trim().length == 0 && user.password.trim().length == 0) {
            res.writeHead(403, ContentType);
            res.end(JSON.stringify({
                error: 'Invalid credentails'
            }));
        }

        console.log('in');

        User.findOne({
                email: user.email
            },
            function (err, dbUser) {
                if (dbUser === null) {
                    console.log('Invalid user');
                    res.writeHead(403, ContentType);

                    res.end(JSON.stringify({
                        error: 'Invalid user'
                    }));
                }
                passManager.comparePassword(user.password, dbUser.password, function (err, passMatch) {
                    if (passMatch) {
                        console.log('Pass match!');
                        res.writeHead(200, ContentType);

                        dbUser.password = '';

                        res.end(JSON.stringify(dbUser));
                    } else {
                        console.log('Invalid password');
                        res.writeHead(403, ContentType);

                        res.end(JSON.stringify({
                            error: 'Invalid user or password'
                        }));
                    }
                });
            });

        return next();
    });

    server.post('api/spseol/auth/register', function (req, res, next) {
        var user = req.params;

        if (user.email.trim().length == 0 && user.password.trim().length == 0) {
            res.writeHead(403, ContentType);
            res.end(JSON.stringify({
                error: 'Invalid credentails'
            }));
        }

        passManager.cryptPassword(user.password, function (err, hash) {
            user.password = hash;
            user = new User(user);
            user.save(function (err, dbUser) {
                if (err) {
                    console.log("Registering of user failed");
                    if (err.code == 11000) {
                        res.writeHead(403, ContentType);
                        res.end(JSON.stringify({
                            error: err,
                            message: 'A user with this email already exists'
                        }));
                    } else {
                        res.writeHead(400, ContentType);
                        res.end(JSON.stringify({
                            error: err,
                            message: 'An unknown error during registration process'
                        }));
                    }
                } else {
                    console.log("Registration successful");
                    res.writeHead(200, ContentType);

                    dbUser.password = '';
                    res.end(JSON.stringify(dbUser));
                }

            });
        });
    });
}
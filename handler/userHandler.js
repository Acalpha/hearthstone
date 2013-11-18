/**
 * Handle user api invoke.
 *
 * @author tim.tang
 *
 * TODO:
 * - defence check request params.
 * - how to build error response?
 */

var constants = require('../common/constants'),
    _ = require('underscore'),
    userService = require('../service').UserService;

var UserHandler = function UserHandler() {
        console.log('User Handler initialized.');
    };


_.extend(UserHandler.prototype, {

    health: function(req, res) {
        userService.ping(function(reply){
            res.send(reply);
        });
    },

    saveUser: function(req, res) {
        var user = req.body || null;
        var deviceToken = req.params[constants.REST_PARAM_DEVICE_TOKEN] || null;
        userService.save(user.email, user, function(reply) {
            if (reply) {
                console.log('Save user success.');
                res.send(reply);
            } else {
                console.log('Save user failure.');
                res.end();
            }
        });
    },

    getUser: function(req, res) {
        var userKey = req.params['userKey'] || null;
        userService.get(userKey, function(err, reply) {
            if (err) return next(err);
                res.send(reply);
        });
    }
});

var userHandler = new UserHandler();
module.exports = userHandler;

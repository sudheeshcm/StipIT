var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            // check in mongo if a user with username exists or not
            User.findOne({ 'username' :  username }, 
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                    {
                        //return done(err);
                        console.log("Login unsuccessfull, Email matching query failed failed."+ error.message);
                            var data = {objectId : "", error: err};
                            res.json(data);
                    }

                    // Username does not exist, log the error and redirect back
                    else if (!user){
                        console.log('User Not Found with username '+username);
                        //return done(null, false, req.flash('message', 'User Not found.'));                 
                            var data = {objectId : "", error: err};
                            res.json(data);
                    }
                    // User exists but wrong password, log the error 
                    else if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        //return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                        var data = {objectId : "", error: {message: "Invalid Password"}};
                            res.json(data);
                    }
                    else
                    {
                        // User and password both match, return user from done method
                        // which will be treated like success
                        //return done(null, user);
                        var data = {objectId : "123", user: user};
                        res.json(data);  
                    }
                    
                }
            );

        })
    );


    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}
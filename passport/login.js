var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            // check in mongo if a user with username exists or not
            if (req.body.email == "") {
                return done(null, false, {'message': "Missing credentials"}); 
            };
            User.findOne({ 'email' :  req.body.email }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                    {
                        console.log("Login unsuccessfull, Email matching query failed failed."+ error.message);
                        return done(err);
                    }

                    // Username does not exist, log the error and redirect back
                    else if (!user){
                        console.log('User Not Found with username '+username);
                        return done(null, false, {'message': 'User Not found.'});                 
                    }
                    // User exists but wrong password, log the error 
                    else if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, {'message': 'Invalid Password.'}); 
                    }
                    else if (user.emailVerified != true){
                        console.log('Email not verified.');
                        return done(null, false, {'message': 'Email not verified.'}); 
                    }
                    else
                    {
                        // User and password both match, return user from done method
                        // which will be treated like success
                        req.logIn(user, function(err) {
                          if (err) { throw err; }
                          console.log("Passport Req authntication: ",req.isAuthenticated()); // returns true
                        });
                        return done(null, user);
                    }
                    
                }
            );

        })
    );


    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}
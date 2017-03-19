var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var validator = require("email-validator");
var nodemailer = require('nodemailer');
var crypto = require('crypto');

var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'noreply.StipiT.robot@gmail.com',
                        pass: 'stipitstipit'
                    }
                });

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            
            if (validator.validate(req.body.email) == false) {
                return done(null, false, {message: 'Please enter a valid Email address.'});
            };
            // find a user in Mongo with provided username
            findOrCreateUser = function(){
                var token,mailOptions,host,link;
                crypto.randomBytes(20, function(err, buf) {
                                    token = buf.toString('hex');
                });
                User.find({ $or:[{ 'username' :  username },{'email': req.body.email}]}, function(err, users) {
                    var userFoundStatus = false;
                    // In case of any error, return using the done method
                    if (err){
                            console.log('Error in SignUp: '+err);
                            return done(err);
                    }
                    for(var val in users){
                            console.log("Vals",val);
                            // username already exists
                            if (users[val].username == username) {
                                console.log('Username already taken.');
                                userFoundStatus = true;
                                return done(null, false, {message: 'Username already taken.'});    

                            }
                            // email already exists
                            else if (users[val].email == req.body.email) {
                                console.log('Email already taken.');
                                userFoundStatus = true;
                                return done(null, false, {message: 'Email already taken.'});    
                            }
                    }
                    if (userFoundStatus == true) {
                        console.log("Data redundant. Use cannot be created.");
                    }
                    else 
                    {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();
                        // set the user's local credentials
                        newUser.username = username;
                        newUser.password = createHash(password);
                        newUser.email = req.body.email;
                        newUser.emailVerified = false;
                        newUser.createdAt = Date.now();
                        /*newUser.firstName = req.param('firstName');
                        newUser.lastName = req.param('lastName');*/
                        newUser.signupToken = token;
                        newUser.followers = 0;
                        console.log("Account verification token: ", newUser.signupToken);
                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);  
                                throw err;  
                            }
                            console.log('User Registration succesfull.');
                            
                            //        rand=Math.floor((Math.random() * 100) + 54);
                            host=req.get('host');
                            link="http://"+req.get('host')+"/users/verify/"+username+"/"+token;
                            mailOptions={
                                        to : req.body.email,
                                        subject : "Please confirm your Stip_iT Email account",
                                        html : "Hello,<br><br> Please Click on the link to verify your Stip_iT account.<br><a href="+link+">Click here to verify</a><br><br>Regards,<br>Stip_iT Team" 
                            }
                            console.log(mailOptions);
                            transporter.sendMail(mailOptions, function(error, info){
                                if(error){
                                                console.log(error);
                                                res.render('error', {
                                                    message: error,
                                                    error: error
                                                });
                                }else{
                                                console.log("Message sent: " + info.response);
                                }
                            });
                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}
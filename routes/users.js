var express = require('express');
var router = express.Router();
var User = require('../models/user');
var flash = require('express-flash');
var nodemailer = require('nodemailer');
var bCrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
var validator = require("email-validator");

var app = express();

var transporter = nodemailer.createTransport({
				    service: 'Gmail',
				    auth: {
				        user: 'noreply.StipiT.robot@gmail.com',
				        pass: 'stipitstipit'
				    }
				});

router.post('/resetPass', function(req, res, next) {
		console.log("Server Reset password called...!!!");
  async.waterfall([
	    function(done) {
	      crypto.randomBytes(20, function(err, buf) {
	        var token = buf.toString('hex');
	        done(err, token);
	      });
	    },
	    function(token, done) {
	    	if (validator.validate(req.body.email) == false) {
		    		var data = {
		          	reset_status : "failure",
		          	err_msg : 'Please enter a valid Email address.'
		            };
		            res.json(data);
	        };
	        var sendStatus = true;
	        User.findOne({ email: req.body.email }, function(err, user, msg) {
			    console.log("Method findUser called.");
		        if (!user) {
		          console.log("No user found for email, ",req.body.email);	
		          //req.flash('error', 'No account with that email address exists.');
		          sendStatus = false;
		          done(err, sendStatus, '', null);
		        }
		        else
		        {
		        	sendStatus = true;
		        	console.log("User found and setting token. Token: ", token);
		        	user.resetPasswordToken = token;
			        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
			        user.save(function(err) {
			        	done(err, sendStatus, token, user);
		        	});	
		        }
		    })
	    },
	    function(sendStatus, token, user, done) {
	    	console.log("Finding user finished.");
		    if(sendStatus == false)
		    {
		        	var data = {
			          	reset_status : "failure",
			          	err_msg : 'No account with email '+req.body.email+' exists.'
			        };
			        console.log("No account with that email address exists.");
			        res.json(data);
		    }

	    	console.log("Node mailer called..!!");
	    	console.log("Token value: ", token);
	    	
	    	if(token != ''){

				// NB! No need to recreate the transporter object. You can use
				// the same transporter object for all e-mails

				// setup e-mail data with unicode symbols
				var mailOptions = {
				    from: 'Stip_iT Password Reset <noreply.StipiT.robot@gmail.com>', // sender address
				    to: req.body.email, // list of receivers
				    subject: 'Stip_iT Password Reset', // Subject line
				    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your Stip_iT account.\n\n' +
		          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
		          'http://' + req.headers.host + '/users/reset/' + token + '\n\n' +
		          'If you did not request this, please ignore this email and your password will remain unchanged.\n\n' +
		          'Regards,\n' +
		          'Stip_iT Team\n', // plaintext body
				};

				console.log("Mail options set.");
				var mailSentStatus = false;
				// send mail with defined transport object
				transporter.sendMail(mailOptions, function(error, info){
					console.log("Nodemailer attempting to send mail.");
				    if(error){
				        console.log("Email not sent, ",error);
				    }else{
				        console.log('Email sent: ' + info.response);
				        mailSentStatus = true;
				    }
				    done(error, mailSentStatus);
				});
	    	}
	    },
	    function(mailSentStatus, done) {
	    	console.log("Mail status: ",mailSentStatus);
				if (mailSentStatus == true) {
					var data = {
			          	reset_status : "success"
			        };
			        console.log("Mail sent, returning json res.");
			        res.json(data);
				}
				else
				{
					done(err);
				}
	    }	
  ], function(err) {
    if (err){
    	console.log("Error hit during Password reset.", err);	
    	return next(err);	
    } 
    else{
    	console.log("Password reset completed.");		
    	res.redirect('/resetPassword');	
    }
  });
});

router.get('/reset/:token', function(req, res) {
	console.log("Calling reset page.");
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      console.log('Password reset token is invalid or has expired.');
      res.render('error', {
	    message: 'Password reset token is invalid or has expired.',
	    error: {}
	  });
    }
    else{
    	res.render('resetpage', {token: req.params.token});	
    }
  });
});

router.post('/reset', function(req, res) {
	console.log("Resetting passwords.");
	var resetStatus = false;
  User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      console.log('Password reset token is invalid or has expired.');
      res.render('error', {
	    message: 'Password reset token is invalid or has expired.',
	    error: {}
	  });
    }
    else{
    	user.password = createHash(req.body.password);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
        	if (err){
                console.log('Error in Saving user: '+err);  
                throw err;  
            }
        console.log('User Password reset succesfull.');    
        resetStatus = true;
        res.json({reset_status : "success"});
        });
    }
  });
  if (resetStatus == true) {
  	console.log('Sending success json.');    
  	res.json({reset_status : "success"});
  };
});


router.get('/verify/:username/:token',function(req,res){

	var token,mailOptions,host,link;

	console.log("Verify called, Username: "+req.params.username+", token:"+req.params.token);
	console.log(req.protocol+":/"+req.get('host'));
	/*if((req.protocol+"://"+req.get('host'))==("http://"+host))
				{

				    console.log("Domain is matched. Information is from Authentic email");*/
	        User.findOne({ username: req.params.username}, function(err, user) {
	        	
    			    if (user && user.signupToken == req.params.token) {
			            console.log("email is verified");
			            user.emailVerified = true;
			            user.signupToken = undefined;
			            user.save(function(err) {
				        	if (err){
				                console.log('Error in Saving user: '+err);  
				                throw err;  
				            }
					        console.log('Email successfully verified.');    
					        res.render('info', {
							    message: 'Email successfully verified.',
							});
				        });
			        }    
			        else
			        {
			            console.log("email is not verified.");
			            res.render('error', {
						    message: 'Your Stip_iT account is not verified, Please try again.',
						    error: {}
						});
			        }
			});        
	/*}
	else
	{
			res.render('error', {
						    message: 'Request is from unknown source.',
						    error: {}
						  });
	}*/
});

// Generates hash using bCrypt
var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports = router;

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var flash = require('express-flash');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
var validator = require("email-validator");

var app = express();

app.use(flash());

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
      var data = User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          console.log("No user found.");	
          //req.flash('error', 'No account with that email address exists.');
          var data = {
          	reset_status : "failure",
          	err_msg : 'No account with that email address exists.'
          };
          return(data);
          //return res.redirect('/resetPassword');
        }
        if (data.reset_status == "failure") {
        	res.json(data);
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
    	var transporter = nodemailer.createTransport({
		    service: 'Gmail',
		    auth: {
		        user: 'sudheeshcmohan@gmail.com',
		        pass: '$udheeshmohan'
		    }
		});

		// NB! No need to recreate the transporter object. You can use
		// the same transporter object for all e-mails

		// setup e-mail data with unicode symbols
		var mailOptions = {
		    from: 'Stip_iT Password Reset <noreply@stipitpassreset.com>', // sender address
		    to: req.body.email, // list of receivers
		    subject: 'Stip_iT Password Reset', // Subject line
		    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n', // plaintext body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		    }else{
		        console.log('Message sent: ' + info.response);
		    }
		});
	    
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/resetPassword');
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;

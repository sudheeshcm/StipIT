var express = require('express');
var router = express.Router();


module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('login');
		
	});

	// Render the login page
	  router.get('/login', function(req, res) {
	    res.render('login');
	  });

	/* Handle Login POST */
	router.post('/login', function(req, res, next){
		passport.authenticate('login', function(err, user, msg){
			if (err) console.log("Error: ",err);
	        if (user) console.log("User logged: ",user.username);
	        if (msg) console.log("Message: ",msg.message);
	        var data = {err : err, msg : msg, user : user}; 
		    res.json(data);
         })(req, res, next);
    });

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('signup');
	});

	 // Renders the reset password page.
	 router.get('/resetPassword', function(req, res) {
	    res.render('resetPassword');
	  });

	/* Handle Registration POST */
	router.post('/signup', function(req, res, next){
		 passport.authenticate('signup', function(err, user, msg){
	        if (err) console.log("Error: ",err);
	        if (user) console.log("User Created: ",user.username);
	        if (msg) console.log("Message: ",msg.message);
	        var data = {err : err, msg : msg, user : user}; 
		    res.json(data);
         })(req, res, next);
    });

	/* GET Home Page */
	router.get('/home', ensureAuthenticated ,function(req, res){
		console.log("Calling Home.");
		res.render('home');
	});

	//Signout logic
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	function ensureAuthenticated(req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	  if (req.isAuthenticated()) { 
	  	console.log("Authentication success.");
	  	return next(); 
	  }
	  else{
	  	// if the user is not authenticated then redirect him to the login page
	  	console.log("Authentication not successfull.");
	  	res.redirect('/login');
	  }
	  
	}

	return router;
}

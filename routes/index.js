var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Stip It' });
});

// Render the login page
  router.get('/login', function(req, res) {
    res.render('login', { title: 'Stip It' });
  });

// Renders the signup page
 router.get('/signup', function(req, res) {
    res.render('signup', { title: 'Stip It' });
  });


  // Renders the reset password page.
 router.get('/resetPassword', function(req, res) {
    res.render('resetPassword', { title: 'Stip It' });
  });

module.exports = router;

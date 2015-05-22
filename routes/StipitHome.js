// Provides endpoints for Stip_iT home page
module.exports = function(){
  var express = require('express');
  var app = express();
  var router = express.Router();
  app.set('view engine', 'ejs');

  // Populates the Current User
  app.get('/CurrentUser', function(req, res) {
      if(req.user){
       var user = req.user;
       console.log("User logged in, ID:" +user._id+", Username: "+ user.username+" , Date: "+Date.now());
       res.json(user); 
      }
  });

  app.get('/FetchStockDetails', function(req, res) {
      
  });  

  return app;
}();

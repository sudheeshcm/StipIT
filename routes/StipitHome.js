// Provides endpoints for Stip_iT home page
module.exports = function(){
  var express = require('express');
  var app = express();
  app.set('view engine', 'ejs');

  // Renders homepage
  app.get('/home', function(req, res) {
      var user = Parse.User.current();
      console.log(user);
      if(user != null){
        console.log("User logged in, "+user.attributes.username);
        res.render('home');
      }
      else{
        console.log("No session found..!!");
        res.render('login');
      }
  });

// Populates the Current User
app.get('/CurrentUser', function(req, res) {
     var user = Parse.User.current();
     console.log("Current User Fetched, ID:" +user.id+", Username: "+ user.attributes.username);
     res.json(user);
  });

// Populates the Current User Followers
app.get('/CurrentUserFollowers', function(req, res) {
     var user = Parse.User.current();
     console.log("Current User Fetched, ID:" +user.id+", Username: "+ user.attributes.username);
     var FandF = Parse.Object.extend("FriendsAndFollowers");
      var query = new Parse.Query(FandF);
      query.equalTo("userObjectId", user.id);
      query.find({
          success: function(results) {
              console.log(results.length + " User FandF fetched.");
              var FollowersList = results[0].get('followers');
              if (results[0].get('followers') != undefined) {
                  console.log(results[0].get('username') + "'s Followers number: "+FollowersList.length);
                  res.json({"NumberOfFollowers" : FollowersList.length});
              }
              else
              {
                  res.json({"NumberOfFollowers" : "0"});
              }
              //Test Code to run NSE India stock updation
              Parse.Cloud.run('getPage', {
                    success: function(data) {
                      // ratings should be 4.5
                      console.log("getPage called..!!");
                      console.log(data);
                    },
                    error: function(error) {
                      console.log("getPage call failed!!"+ error.message);
                    }
              });
          },
          error: function(error){
              console.log("Current User's Follower query failed. Error: "+ error.message);
          }
      }); 
  });

  return app;
}();

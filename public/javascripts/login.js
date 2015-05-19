$(document).ready(function(){
    $('#loginBtn').click(function(){
 
                var email=$("#email").val();
    			var password=$("#password").val();
    			console.log("loginBtn clicked..!!, Email: "+ email);
                
                var objectId = 0;   
							    $.ajax({
							      url: '/Parselogin',
							      type: 'post',
							     
							      data: {email: email,
							      		password: password,
							      		objectId: objectId
							      		},
							      success: function(data) {
							          console.log("Parselogin called");
				
							       	  if (data.objectId == "")
							       	  {
								          if(data.error){console.log("postLogin Error, Message: "+ data.error.message);}
								          if (data.error.message == "Email not verified.") {
								          	document.getElementById('error-info').innerHTML = "Email not verified. Please verify it from your mailbox.";	
								          }
								          else{
								          	document.getElementById('error-info').innerHTML = "Invalid email / password";	
								          }
								       	  $( "#emailDiv" ).addClass( "has-error" );
								       	  $( "#passDiv" ).addClass( "has-error" );
								       	  document.getElementById('email').value = "";
								       	  document.getElementById('password').value = "";
							       	  }
							       	  else
							       	  {
								       	  	if(typeof(Storage) !== "undefined") {
											//     Code for localStorage/sessionStorage.
											    localStorage.loggedUserId = data.objectId;
					                        	console.log("Local Storage initialized..!!");
											} else {
											    console.log("Sorry! No Web Storage support..!");
											}
					                        
					                        console.log("Logged User ID: " + localStorage.loggedUserId );
											window.location.assign("/h/home");
							       	  }
							       	},
							        error: function(error) {
							               console.log("Parse login failed.!!"+ error.message);
							        }
							     });
        });
});


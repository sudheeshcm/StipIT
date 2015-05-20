$(document).ready(function(){
    $('#loginBtn').click(function(){
 
                var email=$("#email").val();
    			var password=$("#password").val();
    			console.log("loginBtn clicked..!!, Email: "+ email);
                
                if(email == "" || password == "")
                {
                	$( "#emailDiv" ).addClass( "has-error" );
					$( "#passDiv" ).addClass( "has-error" );
					document.getElementById('email').value = "";
					document.getElementById('password').value = "";
					document.getElementById('error-info').innerHTML = "Please enter an email address and password.";	
                }
                else
                {
                	$.ajax({
							      url: '/login',
							      type: 'post',
							     
							      data: {
							      		username: "dummy",
							      		email: email,
							      		password: password
							      		},
							      success: function(data) {
							          console.log("login called");
				
							       	  if (data.err || data.msg)
							       	  {
								          if (data.msg.message == "Email not verified.") {
								          	document.getElementById('error-info').innerHTML = "Email not verified. Please verify it from your mailbox.";	
								          }
								          else if (data.msg.message == "Missing credentials") {
								          	document.getElementById('error-info').innerHTML = "Please enter an email address and password.";	
								          }
								          else{
								          	console.log(data.err ? data.err : data.msg.message);
								          	document.getElementById('error-info').innerHTML = "Invalid email / password.";	
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
											    localStorage.loggedUser = data.user.username;
					                        	console.log("Local Storage initialized..!!");
											} else {
											    console.log("Sorry! No Web Storage support..!");
											}
					                        
					                        console.log("Logged User: " + localStorage.loggedUser );
					                        window.location.assign('/home');
											/*$.ajax({
											      url: '/home',
											      type: 'get',
											      data: { user : data.user },
											      success: function(data) {
											      		console.log("Login successfull and routed to Home page.")
											      },
											      error: function(error) {
											               console.log("Login not successfull!!, "+ error.message);
											      }
										    });  	*/
							       	  }
							       	},
							        error: function(error) {
							               console.log("Login failed.!!"+ error.message);
							        }
					});
                }	
							    
        });
});


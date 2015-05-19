$(document).ready(function(){
  $('#signupBtn').click(function(){

	name=$("#name").val();
	email=$("#email").val();
    password=$("#password").val();
    cnfPassword=$("#cnfPassword").val();

 	$( "#nameDiv" ).removeClass( "has-error" );
	$( "#emailDiv" ).removeClass( "has-error" );
	$( "#passDiv1" ).removeClass( "has-error" );	
	$( "#passDiv2" ).removeClass( "has-error" );
	document.getElementById("nameLabel").innerHTML = "";
	document.getElementById("emailLabel").innerHTML = "";
	document.getElementById("passLabel").innerHTML = "";	
	var proceedSignup = 0;

	if (name.length < 4) {
		$( "#nameDiv" ).addClass( "has-error" );
		document.getElementById("nameLabel").innerHTML = 'Name should be atleast 4 characters long.';
		proceedSignup = 1;
	}
    if(password != cnfPassword){
		$( "#passDiv2" ).addClass( "has-error" );
		document.getElementById("passLabel2").innerHTML = "Password mismatch.";
		proceedSignup = 1;
    } 

	if(/^[a-zA-Z0-9-_@.]*$/.test(name) == false){
		// Validation logic
		$( "#nameDiv" ).addClass( "has-error" );
		document.getElementById("nameLabel").innerHTML = 'Username contains invalid characters.';
		proceedSignup = 1;
	}

	if (email.length <= 0) {
		$( "#emailDiv" ).addClass( "has-error" );
		document.getElementById("emailLabel").innerHTML = 'Please enter an Email address.';
		proceedSignup = 1;
	}

	if (password.length < 4) {
		$( "#passDiv1" ).addClass( "has-error" );
		document.getElementById("passLabel").innerHTML = 'Password should be atleast 4 characters long.';
		proceedSignup = 1;
	}

	if(proceedSignup == 1) {
		document.getElementById("name").value = '';
		document.getElementById("password").value = '';
		document.getElementById("cnfPassword").value = '';
		document.getElementById("email").value = '';
	}
    else{
    	$.ajax({
	      url: '/signup',
	      type: 'post',
	      data: {name: name,
	      		password: password,
	      		email: email
	      		},
	      	success: function(data) {
		          console.log("signup called");
		       	  if (data.objectId == "" || data.username == "")
		       	   {
			       	  	console.log("postSignup Error-- "+data.error+", Message: "+ data.error.message);
			       	  	if (data.error.message == "invalid email address") {
			       	  		document.getElementById("emailLabel").innerHTML = "Invalid email address.";
			       	  		$( "#emailDiv" ).addClass( "has-error" );
						}
						else if(data.error.message == 'username '+name+' already taken'){
							document.getElementById("nameLabel").innerHTML = 'Username '+name+' already taken.';
							$( "#nameDiv" ).addClass( "has-error" );
						}
						else{
							document.getElementById("nameLabel").innerHTML = data.error.message;	
						}
						document.getElementById("name").value = '';
						document.getElementById("password").value = '';
				       	document.getElementById("cnfPassword").value = '';
						document.getElementById("email").value = '';
					}
					else
					{
						window.location.assign("/login");
					}
			},
			error: function(error) {
					console.log("Parse Signup failed.!! "+ error.message);
			}
		});	
    }
  })	
});



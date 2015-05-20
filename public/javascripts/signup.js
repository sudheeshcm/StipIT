var validateEmail = function(email) {
    //var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var re = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    return re.test(email);
}
$(document).ready(function(){
  $('#signupBtn').click(function(){
    console.log("Button clicked..!!!");
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
	if (validateEmail(email) != true) {
		console.log("Email not valid: "+email);
		$( "#emailDiv" ).addClass( "has-error" );
		document.getElementById("emailLabel").innerHTML = 'Please enter a valid Email address.';
		proceedSignup = 1;
	};

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
	      data: {username: name,
	      password: password,
	      email: email
	      	},
	      	success: function(data) {
		          console.log("signup called");
		       	  if(data.err || data.msg) 
		       	   {
			       	  	if (data.err) {
			       	  		document.getElementById("nameLabel").innerHTML = data.err;
			       	  		$( "#nameDiv" ).addClass( "has-error" );
						}
						if(data.msg){
							if (data.msg.message == "Please enter a valid Email address.") {
								$( "#emailDiv" ).addClass( "has-error" );
								document.getElementById("emailLabel").innerHTML = 'Please enter a valid Email address.';
							}
							else{
								document.getElementById("nameLabel").innerHTML = data.msg.message;
								$( "#nameDiv" ).addClass( "has-error" );
							}
						}
					Console.log("Signup error..!!");
					document.getElementById("name").value = '';
					document.getElementById("password").value = '';
				    document.getElementById("cnfPassword").value = '';
					document.getElementById("email").value = '';
					}
					else
					{
						console.log("User: "+data.user.username);
						window.location.assign("/login");
					}
			},
			error: function(error) {
					console.log("Signup failed.!! "+ error.message);
			}
		});	
    }
  })	
});



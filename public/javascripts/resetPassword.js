/*var setTimeout = function{
   window.location.href = "/login"; //will redirect to your login page.
}, 3000); //will call the function after 3 secs.*/

$(document).ready(function(){
  $('#resetPassBtn').click(function(){

	
	email=$("#email").val();
    
  	$( "#emailDiv" ).removeClass( "has-error" );
  	document.getElementById("emailLabel").innerHTML = "";
	var proceedReset = 0;

	if (email.length <= 0) {
		$( "#emailDiv" ).addClass( "has-error" );
		document.getElementById("emailLabel").innerHTML = 'Please enter an Email address.';
		proceedReset = 1;
	}

	if(proceedReset == 1) {
		document.getElementById("email").value = '';
	}
    else
    {
    	$.ajax({
	      url: '/resetPass',
	      type: 'post',
	      data: {
	      		email: email
	      		},
	      	success: function(data) {
	      		if (data.reset_status == "success") {
	      			console.log("Password reset request sent. Status: ",data.reset_status);
	      			document.getElementById("emailLabel").style.color = 'green';
			        document.getElementById("emailLabel").innerHTML = "Password reset request sent. Redirecting page..";
			        window.setTimeout(function () {
					        location.href = "/login";
					    }, 3000);
	      		}
	      		else{
	      			console.log("Password reset request not sent. Message:",data.err_msg);
					$( "#emailDiv" ).addClass( "has-error" );
					if (data.err_msg == "invalid email address") {
						document.getElementById("emailLabel").innerHTML = "Invalid Email address.";
					}
					else if (data.err_msg == 'no user found with email '+email) {
						document.getElementById("emailLabel").innerHTML = "No User found with Email "+ email + ".";
					}
					else{
						document.getElementById("emailLabel").innerHTML = data.err_msg;	
					}
					document.getElementById("email").value = '';
	      		}
		          
		   
			},
			error: function(error) {
					console.log("Password reset request not sent. Message:",error.message);
					$( "#emailDiv" ).addClass( "has-error" );
					document.getElementById("emailLabel").innerHTML = error.message;
					document.getElementById("email").value = '';
			}
		});	
    }
  })	
});



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
    	console.log("Reset password called...!!!");
    	$.ajax({
	      url: '/users/resetPass',
	      type: 'post',
	      data: {
	      		email: email
	      		},
	      	success: function(data) {
	      		if (data.reset_status == "success") {
	      			console.log("Password reset request sent. Status: ",data.reset_status);
	      			document.getElementById("emailLabel").style.color = 'green';
	      			document.getElementById("email").value = '';
	      			document.getElementById("resetPassBtn").disabled = true; 
			        document.getElementById("emailLabel").innerHTML = "Stip_iT Password reset request sent. Please check your mailbox.<br>Redirecting to login page..";
			        window.setTimeout(function () {
					        location.href = "/login";
					    }, 4000);
	      		}
	      		else{
	      			console.log("Password reset request not sent. Message:",data.err_msg);
					$( "#emailDiv" ).addClass( "has-error" );
					document.getElementById("emailLabel").innerHTML = data.err_msg;	
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



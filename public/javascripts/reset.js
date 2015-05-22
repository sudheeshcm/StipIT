var token =  $("#token").val();
console.log("Token: ",token);

$(document).ready(function(){
  $('#resetPassBtn').click(function(){

	
	password=$("#password").val();
	cnfPassword=$("#cnfPassword").val();
	
    
  	$( "#passDiv" ).removeClass( "has-error" );
  	$( "#confPassDiv" ).removeClass( "has-error" );
  	document.getElementById("passLabel").innerHTML = "";
	var proceedReset = 0;

	if (password.length <= 0 || cnfPassword.length <= 0) {
		$( "#passDiv" ).addClass( "has-error" );
		$( "#confPassDiv" ).addClass( "has-error" );
		document.getElementById("passLabel").innerHTML = 'Please fill both the fields.';
		proceedReset = 1;
	}

	if (password != cnfPassword) {
		$( "#passDiv" ).addClass( "has-error" );
		$( "#confPassDiv" ).addClass( "has-error" );
		document.getElementById("passLabel").innerHTML = 'Passwords not matching.';
		proceedReset = 1;
	}

	if(proceedReset == 1) {
		document.getElementById("password").value = '';
		document.getElementById("cnfPassword").value = '';
	}
    else
    {
    	console.log("Reset new password called...!!!");
    	$.ajax({
	      url: '/users/reset',
	      type: 'post',
	      data: {
	      		token: token,
	      		password: password
	      		},
	      	success: function(data) {
	      		if (data.reset_status == "success") {
	      			console.log("Stip_iT Password reset. Status: ",data.reset_status);
	      			document.getElementById("passLabel").style.color = 'green';
	      			document.getElementById("password").value = '';
					document.getElementById("cnfPassword").value = '';
					document.getElementById("resetPassBtn").disabled = true;
			        document.getElementById("passLabel").innerHTML = "Stip_iT Password reset. Redirecting to login page..";
			        window.setTimeout(function () {
					        location.href = "/login";
					    }, 4000);
	      		}
	      		else{
	      			console.log("Password resetno done. Message:",data.err_msg);
					$( "#passDiv" ).addClass( "has-error" );
					$( "#confPassDiv" ).addClass( "has-error" );
					document.getElementById("passLabel").innerHTML = data.err_msg;	
					document.getElementById("password").value = '';
					document.getElementById("cnfPassword").value = '';
	      		}		   
			},
			error: function(error) {
					console.log("Password resetno done. Message:",error.message);
					$( "#passDiv" ).addClass( "has-error" );
					$( "#confPassDiv" ).addClass( "has-error" );
					document.getElementById("passLabel").innerHTML = error.message;	
					document.getElementById("password").value = '';
					document.getElementById("cnfPassword").value = '';
			}
		});	
    }
  })	
});



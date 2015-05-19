if(localStorage.loggedUserId == ""){
   //window.location.assign('/login'); 
};

var logout = function()
{
        localStorage.loggedUserId = "";
        console.log("User logged out, ID: " + localStorage.loggedUserId);
}

$(function() {
    
    function populateCurrentUser() {
            console.log("Poplualte Current User function called..!!");
            // jQuery AJAX call for JSON
            $.getJSON( '/h/CurrentUser', function( user ) {
                console.log("User Fetched at Client Side: "+user.username);
                document.getElementById('currentUser').innerHTML = user.username;
                if (user.profilePic) {
                	var img = document.createElement("IMG");
				    img.src = user.profilePic.url;
				    document.getElementById('profilePic').href = user.profilePic.url;
				    document.getElementById('profilePic').innerHTML = '<img class="media-object profile-small" src="'+img.src+'" alt="...">'	
                };
            });
    };

    function populateCurrentUserFollowers() {
            console.log("Poplualte Current User Followers function called..!!");
            // jQuery AJAX call for JSON
            $.getJSON( '/h/CurrentUserFollowers', function( data ) {
                console.log("User's Followers fetched, Number: "+data.NumberOfFollowers);
                document.getElementById('NumberOfFollowers').innerHTML = data.NumberOfFollowers + " Followers";
            });
    };
    populateCurrentUser();
    populateCurrentUserFollowers();
    
});    
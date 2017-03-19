if(localStorage.loggedUser == ""){
   window.location.assign('/login'); 
};

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var logout = function()
{
        localStorage.loggedUser = "";
        console.log("User logged out, " + localStorage.loggedUser);
}

$(function() {
    
    function populateCurrentUser() {
            console.log("Poplualte Current User function called..!!");
            // jQuery AJAX call for JSON
            $.getJSON( '/h/CurrentUser', function( user ) {
                console.log("User Fetched at Client Side: "+(user.username).capitalizeFirstLetter());
                document.getElementById('currentUser').innerHTML = (user.username).capitalizeFirstLetter();
                console.log("User's Followers fetched, Number: "+user.followers);
                if (user.followers == undefined) { user.followers = 0;};
                document.getElementById('NumberOfFollowers').innerHTML = user.followers + " Followers";
                if (user.profilePic) {
                	var img = document.createElement("IMG");
				    img.src = user.profilePic.url;
				    document.getElementById('profilePic').href = user.profilePic.url;
				    document.getElementById('profilePic').innerHTML = '<img class="media-object profile-small" src="'+img.src+'" alt="...">'	
                };
            });
    };

    populateCurrentUser();
    
});    
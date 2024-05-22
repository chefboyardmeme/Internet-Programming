// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE BELOW THIS LINE

function displayMovieInformation(movie_id)
{
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		document.getElementById("modalWindowContent").innerHTML = this.responseText;
		showModalWindow();
		};
	request.open("GET", "./movieinfo.php?movie_id=" + movie_id, true);
	request.send();
}

function forgotPassword()
{
	window.location.replace("./logon.php?action=forgot");
}

function showModalWindow()
{
    var modal = document.getElementById('modalWindow');
    var span = document.getElementsByClassName("_close")[0];

    span.onclick = function() 
    { 
        modal.style.display = "none";
    }

    window.onclick = function(event) 
    {
        if (event.target == modal) 
        {
            modal.style.display = "none";
        }
    }
 
    modal.style.display = "block";
}

// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE ABOVE THIS LINE


// DO NOT REMOVE OR MODIFY THE SIGNATURE OF THE FUNCTIONS BELOW THIS LINE

// Add Movie function
function addMovie(imdbID) {
    // Call the index.php page with action=add and imdb_id parameter
    window.location.replace("./index.php?action=add&imdb_id=" + imdbID);
}

// Confirm Cancel function
function confirmCancel() {
    // Prompt the user to confirm returning to the shopping cart
    var confirmResult = confirm("Are you sure you want to cancel and return to your shopping cart?");
    // If the user clicks Cancel, return false
    if (!confirmResult) {
        return false;
    }
    // If the user clicks OK, redirect to index.php
    window.location.replace("./index.php");
}

// Confirm Checkout function
function confirmCheckout() {
    // Prompt the user to confirm checkout from the shopping cart
    var confirmResult = confirm("Are you sure you want to proceed with the checkout?");
    // If the user clicks Cancel, return false
    if (!confirmResult) {
        return false;
    }
    // If the user clicks OK, redirect to index.php with action=checkout
    window.location.replace("./index.php?action=checkout");
}

// Confirm Logout function
function confirmLogout() {
    // Prompt the user to confirm logging out of the shopping cart
    var confirmResult = confirm("Are you sure you want to log out?");
    // If the user clicks Cancel, return false
    if (!confirmResult) {
        return false;
    }
    // If the user clicks OK, redirect to logon.php with action=logoff
    window.location.replace("./logon.php?action=logoff");
}

// Confirm Remove function
function confirmRemove(title, movieID) {
    // Prompt the user to confirm removing the selected movie from the shopping cart
    var confirmResult = confirm("Are you sure you want to remove the movie '" + title + "' from your shopping cart?");
    // If the user clicks Cancel, return false
    if (!confirmResult) {
        return false;
    }
    // If the user clicks OK, redirect to index.php with action=remove and movie_id parameter
    window.location.replace("./index.php?action=remove&movie_id=" + movieID);
}
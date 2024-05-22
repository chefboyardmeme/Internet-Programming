<?php

$API_KEY = "b900d1ff"; // API key (string) provided by Open Movie DataBase (i.e., "ab123456")

session_start(); // Connect to the existing session

processPageRequest(); // Call the processPageRequest() function

// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE ABOVE THIS LINE

function displaySearchForm()
{
	
}

function displaySearchResults($searchString)
{	
	
}

function processPageRequest()
{
	
}

?>

<?php

$API_KEY = "b900d1ff"; // API key (string) provided by Open Movie DataBase (i.e., "ab123456")

session_start(); // Connect to the existing session

processPageRequest(); // Call the processPageRequest() function

// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE ABOVE THIS LINE

function displaySearchForm()
{
    // Include HTML and PHP code to display the search form
    require_once './templates/search_form.html';
}

function displaySearchResults($searchString)
{
    // Call the OMDB API to get search result data
    $results = file_get_contents('http://www.omdbapi.com/?apikey=' . $GLOBALS['API_KEY'] . '&s=' . urlencode($searchString) . '&type=movie&r=json');
    $resultsArray = json_decode($results, true)["Search"];

    // Include HTML and PHP code to display the search results
    require_once './templates/results_form.html';
}

function processPageRequest()
{
    // Check if the user is authenticated
    if (!isset($_SESSION["userId"])) {
        // If not authenticated, redirect to the login page
        header("Location: logon.php");
        exit();
    }

    // Check if any POST data was passed to the page
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Check if the keyword is set in POST data
        if (isset($_POST["keyword"])) {
            $searchString = $_POST["keyword"];
            displaySearchResults($searchString);
        } else {
            // No keyword in POST data, display the search form
            displaySearchForm();
        }
    } else {
        // No POST data, display the search form
        displaySearchForm();
    }
}

?>

<?php

$EMAIL_ID = 901002718; // 9-digit integer value (i.e., 123456789)
$API_KEY = "b900d1ff"; // API key (string) provided by Open Movie DataBase (i.e., "ab123456")

session_start(); // Connect to the existing session

require_once '/home/common/php/dbInterface.php'; // Add database functionality
require_once '/home/common/php/mail.php'; // Add email functionality
require_once '/home/common/php/p4Functions.php'; // Add Project 4 base functions

processPageRequest(); // Call the processPageRequest() function

// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE ABOVE THIS LINE

function addMovieToCart($imdbID)
{
    $userId = $_SESSION["userId"];

    // Check if the movie already exists in the database
    $movieId = movieExistsInDB($imdbID);

    if ($movieId === 0) {
        // Movie does not exist in the database, fetch data from OMDB API
        $result = file_get_contents('http://www.omdbapi.com/?apikey='. $GLOBALS['API_KEY'] . '&i=' . $imdbID . '&type=movie&r=json');
        $movieInfo = json_decode($result, true);

        // Add movie to the database
        $movieId = addMovie(
            $imdbID,
            $movieInfo['Title'],
            $movieInfo['Year'],
            $movieInfo['Rated'],
            $movieInfo['Runtime'],
            $movieInfo['Genre'],
            $movieInfo['Actors'],
            $movieInfo['Director'],
            $movieInfo['Writer'],
            $movieInfo['Plot'],
            $movieInfo['Poster']
        );
    }

    // Add movie to the shopping cart
    addMovieToShoppingCart($userId, $movieId);

    // Display the updated shopping cart
    header("Location: index.php");
    exit();
}

function removeMovieFromCart($movieID)
{
    $userId = $_SESSION["userId"];

    // Remove movie from the shopping cart and get the result
    $removed = removeMovieFromShoppingCart($userId, $movieID);

    // Redirect to the index.php page
    header("Location: index.php");
    exit();
}

function displayCart()
{
    // Get movies in the user's shopping cart
    $userId = $_SESSION["userId"];
    $cartMovies = getMoviesInCart($userId);

    // Include the cart template
    require_once './templates/cart_form.html';
}

function processPageRequest()
{
    // Check if the user is authenticated
    if (!isset($_SESSION["userId"])) {
        // If not authenticated, redirect to the login page
        header("Location: logon.php");
        exit();
    }

    // Check if the action is requested (add or remove)
    if (isset($_GET['action'])) {
        if ($_GET['action'] == 'add') {
            // Add movie to the cart
            addMovieToCart($_GET['imdb_id']);
        } elseif ($_GET['action'] == 'remove') {
            // Remove movie from the cart
            removeMovieFromCart($_GET['movie_id']);
        }
    } else {
        // Display the shopping cart
        displayCart();
    }
}

?>

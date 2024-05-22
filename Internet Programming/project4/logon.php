<?php

$EMAIL_ID = 901002718; // 9-digit integer value (i.e., 123456789)

require_once '/home/common/php/dbInterface.php'; // Add database functionality
require_once '/home/common/php/mail.php'; // Add email functionality
require_once '/home/common/php/p4Functions.php'; // Add Project 4 base functions

processPageRequest(); // Call the processPageRequest() function

// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE ABOVE THIS LINE

function authenticateUser($username, $password) 
{
    $userData = validateUser($username, $password);

    if ($userData !== NULL) {
        // Valid user credentials, create a session and store user data
        session_start();
        $_SESSION["userId"] = $userData["ID"];
        $_SESSION["displayName"] = $userData["DisplayName"];
        $_SESSION["emailAddress"] = $userData["Email"];
        return true;
    } else {
        // Invalid credentials
        return false;
    }
}

function displayLoginForm($message = "")
{
    require_once './templates/logon_form.html';
}

function processPageRequest()
{
    // Destroy the current session if one exists
    if (session_status() == PHP_SESSION_ACTIVE) {
        session_destroy();
    }

    // Check if any POST data was passed to the page
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Check if the 'action' variable is set
        if (isset($_POST['action'])) {
            // Handle login action
            if ($_POST['action'] == 'login') {
                // Get username and password from POST data
                $username = $_POST["username"];
                $password = $_POST["password"];

                // Authenticate user
                $authenticationResult = authenticateUser($username, $password);

                if ($authenticationResult) {
                    // Successful login, redirect to index.php
                    header("Location: index.php");
                    exit();
                } else {
                    // Failed login, display error message
                    $errorMessage = "Invalid username or password.";
                    displayLoginForm($errorMessage);
                }
            }
        }
    } else {
        // No POST data, display login form
        displayLoginForm();
    }
}

?>

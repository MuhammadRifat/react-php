<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $db = "campus_mart";

    $conn = mysqli_connect($servername, $username, $password, $db);

    if (!$conn) {
        die("Connection Failed: " . mysqli_connect_error());
    }
?>
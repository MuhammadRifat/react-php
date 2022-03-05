<?php
include 'db.php';

$header = getallheaders();

// start operation
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // get all sliders
    if (isset($_GET['query']) && $_GET['query'] == 'sliders') {
        $sliders = array();

        $sql_sliders = "SELECT * FROM settings_slider";
        $result_sliders = mysqli_query($conn, $sql_sliders);
        if (mysqli_num_rows($result_sliders) > 0) {
            while ($row_sliders = mysqli_fetch_assoc($result_sliders)) {
                array_push($sliders, $row_sliders);
            }
        }
        // Converts it into a PHP object and send response
        echo json_encode($sliders);
    }
}

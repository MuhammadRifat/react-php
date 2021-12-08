<?php
include 'db.php';
$header = getallheaders();
// Takes raw data from the request

// $json = file_get_contents('php://input');

if (isset($header['Origin'])) {
    if ($header['Origin'] == "http://localhost:3000") {
        if (isset($header['Authorization'])) {
            if ($header['Authorization'] == "userToken " . base64_encode('password')) {


                // start operation
                $products = array();

                $sql_products = 'SELECT * FROM products';
                $result_products = mysqli_query($conn, $sql_products);
                if (mysqli_num_rows($result_products) > 0) {
                    while ($row_products = mysqli_fetch_assoc($result_products)) {
                        array_push($products, $row_products);
                    }
                }
                // $json = file_get_contents('php://input');

                // Converts it into a PHP object and send response
                echo json_encode($products);



                // end authentication
            } else {
                echo json_encode("Something went wrong!");
            }
        } else echo json_encode("Something went wrong!");
    } else echo json_encode("You are not allowed!");
} else echo json_encode("You are not allowed!");

?>
<?php
include 'db.php';
include 'auth.php';

$header = getallheaders();

// start operation

// load category
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // load category by id
    if (isset($_GET['id'])) {
        $category_id = $_GET['id'];

        $sql_categories = "SELECT * FROM categories WHERE id='$category_id'";
        $result_categories = mysqli_query($conn, $sql_categories);
        if (mysqli_num_rows($result_categories) > 0) {
            $row_categories = mysqli_fetch_assoc($result_categories);

            // Converts it into a PHP object and send response
            echo json_encode($row_categories);
        }
    } else {
        // load all categories
        $categories = array();

        $sql_categories = "SELECT * FROM categories";
        $result_categories = mysqli_query($conn, $sql_categories);
        if (mysqli_num_rows($result_categories) > 0) {
            while ($row_categories = mysqli_fetch_assoc($result_categories)) {
                array_push($categories, $row_categories);
            }
        }

        // Converts it into a PHP object and send response
        echo json_encode($categories);
    }
}

// upload category
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // check Authorization
    if (isset($header['Authorization'])) {
        echo json_encode(isAdminAuthenticated($header['Authorization'], $conn));
    } else echo "Unauthorized";
}

// update category
if ($_SERVER['REQUEST_METHOD'] == 'PATCH') {
    // check Authorization
    if (isset($header['Authorization'])) {
        echo json_encode(isAdminAuthenticated($header['Authorization'], $conn));
    } else echo "Unauthorized";
}

// delete category
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    // check Authorization
    if (isset($header['Authorization'])) {
        echo json_encode(isAdminAuthenticated($header['Authorization'], $conn));
    } else echo "Unauthorized";
}

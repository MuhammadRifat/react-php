<?php
include 'db.php';
include 'auth.php';

$header = getallheaders();

// start operation

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // load all blogs
    $blogs = array();

    $sql_blogs = "SELECT * FROM blogs";
    $result_blogs = mysqli_query($conn, $sql_blogs);
    if (mysqli_num_rows($result_blogs) > 0) {
        while ($row_blogs = mysqli_fetch_assoc($result_blogs)) {
            array_push($blogs, $row_blogs);
        }
    }
    // $json = file_get_contents('php://input');

    // Converts it into a PHP object and send response
    echo json_encode($blogs);
}


// upload blogs
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // check Authorization
    if (isset($header['Authorization'])) {
        echo json_encode(isAdminAuthenticated($header['Authorization'], $conn));
    } else echo "Unauthorized";
}

// update blogs
if ($_SERVER['REQUEST_METHOD'] == 'PATCH') {
    // check Authorization
    if (isset($header['Authorization'])) {
        echo json_encode(isAdminAuthenticated($header['Authorization'], $conn));
    } else echo "Unauthorized";
}


// delete blogs
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    // check Authorization
    if (isset($header['Authorization'])) {
        if (isAdminAuthenticated($header['Authorization'], $conn)) {
            if (isset($_GET['blogId'])) {
                $blogId = $_GET['blogId'];

                $sql_delete = "DELETE FROM blogs where id='$blogId'";
                if (mysqli_query($conn, $sql_delete)) {
                    echo json_encode(array(
                        "status" => true,
                        "error" => ""
                    ));
                } else {
                    echo json_encode(array(
                        "status" => false,
                        "error" => "Something went wrong."
                    ));
                }
            }
        } else {
            echo json_encode(array(
                "message" => "Access denied."
            ));
        }
    } else echo "Unauthorized";
}

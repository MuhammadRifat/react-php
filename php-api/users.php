<?php
include 'db.php';
include 'auth.php';

$header = getallheaders();

// start operation

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $req_body = json_decode(file_get_contents('php://input'), true);
    // check Authorization
    if (isset($header['Authorization'])) {

        // operation for admin 
        if (isset($req_body['role']) && $req_body['role'] == 'admin') {

            if (isAdminAuthenticated($header['Authorization'], $conn)) {
                if (!isset($req_body['id'])) {
                    echo "Something went wrong";
                } else {
                    $id = $req_body['id'];
                    $role = $req_body['role'];

                    $sql_user = "SELECT name, role, imageURL From admin WHERE id='$id' AND role='$role'";
                    $resultUser = mysqli_query($conn, $sql_user);

                    if (mysqli_num_rows($resultUser) > 0) {
                        $userRow = mysqli_fetch_assoc($resultUser);

                        http_response_code(200);
                        echo json_encode($userRow);
                    } else {
                        http_response_code(403);
                        echo json_encode(['status' => false, 'error' => 'Not found']);
                    }
                }
            } else {
                http_response_code(401);
                echo json_encode(['status' => false, 'error' => 'Unauthorized']);
            }
        }

        // operation for user 
        if (isset($req_body['role']) && $req_body['role'] == 'user') {

            // check authentication
            if (isUserAuthenticated($header['Authorization'], $conn)) {
                if (!isset($req_body['id'])) {
                    echo "Something went wrong";
                } else {
                    $id = $req_body['id'];
                    $role = $req_body['role'];

                    $sql_user = "SELECT name, phone, address, role, imageURL From users WHERE id='$id' AND role='$role'";
                    $resultUser = mysqli_query($conn, $sql_user);

                    if (mysqli_num_rows($resultUser) > 0) {
                        $userRow = mysqli_fetch_assoc($resultUser);

                        http_response_code(200);
                        echo json_encode($userRow);
                    } else {
                        http_response_code(403);
                        echo json_encode(['status' => false, 'error' => 'Not found']);
                    }
                }
            } else {
                http_response_code(401);
                echo json_encode(['status' => false, 'error' => 'Unauthorized']);
            }
        }
    } else echo "Unauthorized";
}


<?php
include 'db.php';

require_once('vendor/autoload.php');

use Firebase\JWT\JWT;

// define global variables
define('ADMIN_SECRET_KEY', getenv('ADMIN_SECRET_KEY'));
define('USER_SECRET_KEY', getenv('USER_SECRET_KEY'));
define('ALGORITHM', getenv('ALGORITHM'));

// start operation
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $req_body = json_decode(file_get_contents('php://input'), true);
    if (isset($req_body['role'])) {
        // operation for admin login
        if ($req_body['role'] == 'admin') {
            if (!isset($req_body['username']) || !isset($req_body['password'])) {
                echo "Something went wrong";
            } else if (strlen($req_body['username']) < 1 || strlen($req_body['password']) < 1) {
                echo "Something went wrong";
            } else {
                $username = $req_body['username'];
                $password = $req_body['password'];

                $sql_user = "SELECT id, name, role, imageURL From admin WHERE username = '$username' AND password = '$password'";
                $resultUser = mysqli_query($conn, $sql_user);

                if (mysqli_num_rows($resultUser) > 0) {
                    $userRow = mysqli_fetch_assoc($resultUser);

                    $iat = time(); // time of token issued at
                    $exp = $iat + 86400 * 30; // expire time of token in seconds

                    $token = array(
                        "iat" => $iat,
                        "exp" => $exp,
                        "id" => $userRow['id'],
                        "role" => $userRow['role']
                    );

                    http_response_code(200);

                    $jwt = JWT::encode($token, ADMIN_SECRET_KEY, ALGORITHM);

                    echo json_encode(['status' => true, 'data' => ['id' => $userRow['id'], 'name' => $userRow['name'], 'imageURL' => $userRow['imageURL'], 'role' => $userRow['role'],], "token" => $jwt]);
                } else {
                    echo json_encode(['status' => false, 'data' => ['token' => ''], 'error' => 'Username or Password is incorrect']);
                }
            }
        } else if ($req_body['role'] == 'user') {
            if (!isset($req_body['phone']) || !isset($req_body['password'])) {
                echo "Something went wrong";
            } else if (strlen($req_body['phone']) < 8 || strlen($req_body['password']) < 5) {
                echo "Something went wrong";
            } else {
                $phone = $req_body['phone'];
                $password = $req_body['password'];

                $sql_user = "SELECT id, name, role, imageURL From users WHERE phone = '$phone' AND password = '$password'";
                $resultUser = mysqli_query($conn, $sql_user);

                if (mysqli_num_rows($resultUser) > 0) {
                    $userRow = mysqli_fetch_assoc($resultUser);

                    $iat = time(); // time of token issued at
                    $exp = $iat + 86400 * 30; // expire time of token in seconds

                    $token = array(
                        "iat" => $iat,
                        "exp" => $exp,
                        "id" => $userRow['id'],
                        "role" => $userRow['role']
                    );

                    http_response_code(200);

                    $jwt = JWT::encode($token, USER_SECRET_KEY, ALGORITHM);

                    echo json_encode(['status' => true, 'data' => ['id' => $userRow['id'], 'name' => $userRow['name'], 'imageURL' => $userRow['imageURL'], 'role' => $userRow['role'],], "token" => $jwt]);
                } else {
                    echo json_encode(['status' => false, 'data' => ['token' => ''], 'error' => 'Phone or Password is incorrect']);
                }
            }
        }
    }
}

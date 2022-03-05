<?php
include 'db.php';

require_once('vendor/autoload.php');

use Firebase\JWT\JWT;

// define global variables
define('USER_SECRET_KEY', getenv('USER_SECRET_KEY'));
define('ALGORITHM', getenv('ALGORITHM'));

// user registration
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $req_body = json_decode(file_get_contents('php://input'), true);
    if (!isset($req_body['name']) || !isset($req_body['password']) || !isset($req_body['phone']) || !isset($req_body['address'])) {
        echo "Something went wrong";
    } else if (strlen($req_body['phone']) < 11 || strlen($req_body['password']) < 8) {
        echo "Something went wrong";
    } else {
        $phone = $req_body['phone'];
        $name = $req_body['name'];
        $address = $req_body['address'];
        $password = $req_body['password'];

        $sql_insert = "INSERT INTO users (name, phone, address, password, role) VALUES ('$name', '$phone','$address','$password', 'user')";

        if (mysqli_query($conn, $sql_insert)) {

            $sql_user = "SELECT id, name, role, imageURL From users WHERE phone = '$phone' AND password = '$password'";
            $resultUser = mysqli_query($conn, $sql_user);

            if (mysqli_num_rows($resultUser) > 0) {
                $userRow = mysqli_fetch_assoc($resultUser);

                $iat = time(); // time of token issued at
                $exp = $iat + 86400; // expire time of token in seconds

                $token = array(
                    "iat" => $iat,
                    "exp" => $exp,
                    "id" => $userRow['id'],
                    "role" => $userRow['role']
                );

                http_response_code(200);

                $jwt = JWT::encode($token, USER_SECRET_KEY, ALGORITHM);

                echo json_encode(['status' => true, 'data' => ['_id' => $userRow['id'], 'name' => $userRow['name'], 'imageURL' => $userRow['imageURL'], 'role' => $userRow['role'],], "token" => $jwt]);
            }
        } else {
            echo json_encode(['status' => false, 'data' => ['_token' => ''], 'error' => 'Registration Failed!']);
        }
    }
}

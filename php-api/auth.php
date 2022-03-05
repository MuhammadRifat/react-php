<?php
require __DIR__ . '/vendor/autoload.php';

use \Firebase\JWT\JWT;

// define global variables
define('ADMIN_SECRET_KEY', getenv('ADMIN_SECRET_KEY'));
define('USER_SECRET_KEY', getenv('USER_SECRET_KEY'));
define('ALGORITHM', getenv('ALGORITHM'));

// check admin authentication
function isAdminAuthenticated($authorization, $conn)
{

    $jwt = explode(" ", $authorization)[1];
    if ($jwt) {

        try {
            $decoded = JWT::decode($jwt, ADMIN_SECRET_KEY, array(ALGORITHM));

            $userData = json_decode(json_encode($decoded), true);
            if (isset($userData['id']) && isset($userData['role'])) {
                $id = $userData['id'];
                $role = $userData['role'];

                $sql_isAdmin = "SELECT name From admin WHERE id='$id' AND role='$role'";
                $result_sql = mysqli_query($conn, $sql_isAdmin);

                if (mysqli_num_rows($result_sql) > 0) {
                    return true;
                } else {
                    return false;
                }
            } else return false;
        } catch (Exception $e) {

            http_response_code(401);

            return false;
        }
    }
}

// check user authentication
function isUserAuthenticated($authorization, $conn)
{

    $jwt = explode(" ", $authorization)[1];
    if ($jwt) {

        try {
            $decoded = JWT::decode($jwt, USER_SECRET_KEY, array(ALGORITHM));
            http_response_code(200);

            // $userData = json_decode(json_encode($decoded), true)['data'];
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}

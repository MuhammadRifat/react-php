<?php
include 'db.php';
include 'auth.php';

$header = getallheaders();

// get orders 
if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    if (isset($_GET['role']) && isset($_GET['limit'])) {
        $limit = $_GET['limit'];
        $start = $limit - 10;
        $range = 10;

        if (isset($header['Authorization'])) {
            if ($_GET['role'] === 'user' && isset($_GET['id'])) {
                if (isUserAuthenticated($header['Authorization'], $conn)) {
                    $cust_id = $_GET['id'];

                    $sql_orders = "SELECT id, cust_name, cust_phone, cust_address, instructions, total_price, delivery_charge, total_amount, payment_medium, status, date  FROM orders WHERE cust_id='$cust_id' order by date DESC LIMIT 0, $limit";
                    $sql_result = mysqli_query($conn, $sql_orders);

                    $orders = array();
                    if (mysqli_num_rows($sql_result) > 0) {
                        while ($row_products = mysqli_fetch_assoc($sql_result)) {
                            array_push($orders, $row_products);
                        }
                        echo json_encode($orders);
                    } else {
                        echo json_encode(array(
                            "status" => false,
                            "message" => "Failed"
                        ));
                    }
                } else echo "Unauthorized";
            } else if ($_GET['role'] === 'admin') {
                if (isAdminAuthenticated($header['Authorization'], $conn)) {
                    $sql_orders = "SELECT *  FROM orders order by date DESC LIMIT $start, $range";
                    $sql_result = mysqli_query($conn, $sql_orders);

                    $orders = array();
                    if (mysqli_num_rows($sql_result) > 0) {
                        while ($row_products = mysqli_fetch_assoc($sql_result)) {
                            array_push($orders, $row_products);
                        }
                        echo json_encode($orders);
                    } else {
                        echo json_encode(array(
                            "status" => false,
                            "message" => "Failed"
                        ));
                    }
                } else echo "Unauthorized";
            }
        } else echo "Unauthorized";
    } else echo "Access Denied";

    // get order by id
    if (isset($_GET['orderId'])) {
        $orderId = $_GET['orderId'];

        if (isset($header['Authorization'])) {
            if (isUserAuthenticated($header['Authorization'], $conn) || isAdminAuthenticated($header['Authorization'], $conn)) {

                $sql_orders = "SELECT ";
                $sql_result = mysqli_query($conn, $sql_orders);

                $orders = array();
                if (mysqli_num_rows($sql_result) > 0) {
                    while ($row_products = mysqli_fetch_assoc($sql_result)) {
                        array_push($orders, $row_products);
                    }
                    echo json_encode($orders);
                } else {
                    echo json_encode(array(
                        "status" => false,
                        "message" => "Failed"
                    ));
                }
            } else echo "Unauthorized";
        } else echo "Access Denied";
    } else echo "Unauthorized";
}

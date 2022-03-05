<?php
include 'db.php';
include 'auth.php';

$header = getallheaders();


// start operation

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    // get product by category_id
    if (isset($_GET['categoryId'])) {
        $products = array();

        $categoryId = $_GET['categoryId'];
        $sql_products = "SELECT id, product_name, weight, price, imageURL FROM products where category_id='$categoryId'";
        $result_products = mysqli_query($conn, $sql_products);
        if (mysqli_num_rows($result_products) > 0) {
            while ($row_products = mysqli_fetch_assoc($result_products)) {
                array_push($products, $row_products);
            }
        }
        // $json = file_get_contents('php://input');

        // Converts it into a PHP object and send response
        echo json_encode($products);
    } else if (isset($_GET['productId'])) { // get product by product id

        $productId = $_GET['productId'];
        $sql_products = "SELECT * FROM products where id='$productId'";
        $result_products = mysqli_query($conn, $sql_products);
        if (mysqli_num_rows($result_products) > 0) {
            $row_products = mysqli_fetch_assoc($result_products);

            // Converts it into a PHP object and send response
            echo json_encode($row_products);
        }
    } else if (isset($_GET['productName'])) { // get product by product id
        $products = array();

        $productName = $_GET['productName'];
        $sql_products = "SELECT * FROM products where product_name LIKE '%$productName%'";
        $result_products = mysqli_query($conn, $sql_products);
        if (mysqli_num_rows($result_products) > 0) {
            while ($row_products = mysqli_fetch_assoc($result_products)) {
                array_push($products, $row_products);
            }

            // Converts it into a PHP object and send response
            echo json_encode($products);
        }
    } else {  // get all products
        $products = array();

        $sql_products = "SELECT products.id, product_name, categories.category_name, weight, price, imageURL FROM products, categories WHERE products.category_id=categories.id;";
        $result_products = mysqli_query($conn, $sql_products);
        if (mysqli_num_rows($result_products) > 0) {
            while ($row_products = mysqli_fetch_assoc($result_products)) {
                array_push($products, $row_products);
            }
        }
        // $json = file_get_contents('php://input');

        // Converts it into a PHP object and send response
        echo json_encode($products);
    }
}


// upload products
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // check Authorization
    if (isset($header['Authorization'])) {
        if (isAdminAuthenticated($header['Authorization'], $conn)) {
            $product = json_decode(file_get_contents('php://input'), true);
            $productName = $product['pname'];
            $categoryId = $product['category_id'];
            $weight = $product['weight'];
            $price = $product['price'];
            $description = $product['description'];
            $imageURL = $product['imageURL'];

            $sql_insert = "INSERT INTO products (product_name, category_id, weight, price, description, imageURL) VALUES ('$productName', '$categoryId', '$weight','$price', '$description', '$imageURL')";
            if (mysqli_query($conn, $sql_insert)) {
                echo json_encode(array(
                    "status" => true,
                    "message" => "Successfully Inserted"
                ));
            } else {
                echo json_encode(array(
                    "status" => false,
                    "message" => "Failed"
                ));
            }
        }
    } else echo "Unauthorized";
}

// update products
if ($_SERVER['REQUEST_METHOD'] == 'PATCH') {
    // check Authorization
    if (isset($header['Authorization'])) {
        echo json_encode(isAdminAuthenticated($header['Authorization'], $conn));
    } else echo "Unauthorized";
}


// delete products
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    // check Authorization
    if (isset($header['Authorization'])) {
        if (isAdminAuthenticated($header['Authorization'], $conn)) {
            if (isset($_GET['productId'])) {
                $productId = $_GET['productId'];

                $sql_delete = "DELETE FROM products where id='$productId'";
                if (mysqli_query($conn, $sql_delete)) {
                    echo json_encode(array(
                        "status" => true,
                        "message" => "Successfully Deleted"
                    ));
                } else {
                    echo json_encode(array(
                        "status" => false,
                        "message" => "Something went wrong."
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

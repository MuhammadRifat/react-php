<?php
include 'db.php';
include 'auth.php';

$header = getallheaders();

// check authentication
if (isset($header['Authorization'])) {
    if (isAdminAuthenticated($header['Authorization'], $conn)) {
        $response = imageUpload('image', "../assets/images/products/");
        if ($response) {
            echo json_encode(array(
                "status" => true,
                "imageURL" => "/assets/images/products/" . $response
            ));
        } else {
            echo json_encode(array(
                "status" => false,
                "imageURL" => ""
            ));
        }
    } else {
        echo json_encode(array(
            "message" => "Access denied."
        ));
    }
} else echo "Unauthorized";



function imageUpload($inputName, $directory)
{
    $target_dir = $directory;
    $target_file = $target_dir . basename($_FILES[$inputName]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    $check = getimagesize($_FILES[$inputName]["tmp_name"]);
    if ($check !== false) {
        $uploadOk = 1;
    } else {
        return false;
    }

    // Allow certain file formats
    if (
        $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif" && $imageFileType != "webp"
    ) {
        return false;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        return false;
    } else {
        if (move_uploaded_file($_FILES[$inputName]["tmp_name"], $target_file)) {
            return htmlspecialchars(basename($_FILES[$inputName]["name"]));
        } else {
            return false;
        }
    }
}

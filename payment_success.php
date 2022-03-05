<?php
include 'db.php';

// if (isset($_SESSION['admissionRoll'])) {

$val_id = urlencode($_POST['val_id']);
$store_id = urlencode("test61922df4a0edb");
$store_passwd = urlencode("test61922df4a0edb@ssl");
$requested_url = ("https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=" . $val_id . "&store_id=" . $store_id . "&store_passwd=" . $store_passwd . "&v=1&format=json");

$handle = curl_init();
curl_setopt($handle, CURLOPT_URL, $requested_url);
curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
curl_setopt($handle, CURLOPT_SSL_VERIFYHOST, false); # IF YOU RUN FROM LOCAL PC
curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false); # IF YOU RUN FROM LOCAL PC

$result = curl_exec($handle);

$code = curl_getinfo($handle, CURLINFO_HTTP_CODE);

if ($code == 200 && !(curl_errno($handle))) {

    # TO CONVERT AS ARRAY
    # $result = json_decode($result, true);
    # $status = $result['status'];

    # TO CONVERT AS OBJECT
    $result = json_decode($result);

    # TRANSACTION INFO
    $status = $result->status;
    $tran_date = $result->tran_date;
    $tran_id = $result->tran_id;
    $val_id = $result->val_id;
    $amount = $result->amount;
    $store_amount = $result->store_amount;
    $bank_tran_id = $result->bank_tran_id;
    $card_type = $result->card_type;

    # EMI INFO
    $emi_instalment = $result->emi_instalment;
    $emi_amount = $result->emi_amount;
    $emi_description = $result->emi_description;
    $emi_issuer = $result->emi_issuer;

    # ISSUER INFO
    $card_no = $result->card_no;
    $card_issuer = $result->card_issuer;
    $card_brand = $result->card_brand;
    $card_issuer_country = $result->card_issuer_country;
    $card_issuer_country_code = $result->card_issuer_country_code;

    # API AUTHENTICATION
    $APIConnect = $result->APIConnect;
    $validated_on = $result->validated_on;
    $gw_version = $result->gw_version;

    $req_body = json_decode(json_encode($result), true);

    if (isset($req_body['value_a'])) {
        if ($req_body['tran_id']) {
            $ordersData = explode('|', base64_decode($req_body['value_a']));

            $cust_id = $ordersData[0];
            $cust_name = $ordersData[1];
            $cust_phone = $ordersData[2];
            $cust_address = $ordersData[3];
            $instructions = $ordersData[4];
            $total_price = $ordersData[5];
            $delivery_charge = $ordersData[6];
            $total_amount = $ordersData[7];
            $product_id = $ordersData[8];
            $quantity = $ordersData[9];
            $transaction_id = $req_body['tran_id'];
            $transaction_time = $req_body['tran_date'];
            $payment_medium = $req_body['card_issuer'];
            $store_amount = $req_body['store_amount'];

            $sql_insert = "INSERT INTO orders (cust_id, cust_name, cust_phone, cust_address, instructions, product_id, quantity, total_price, delivery_charge, total_amount, store_amount, transaction_id, transaction_time, payment_medium) VALUES('$cust_id', '$cust_name', '$cust_phone', '$cust_address', '$instructions', '$product_id', '$quantity', '$total_price', '$delivery_charge', '$total_amount','$store_amount',  '$transaction_id', '$transaction_time', '$payment_medium')";

            if (mysqli_query($conn, $sql_insert)) {
                // redirect
                echo "<script>window.location='http://localhost:3000/dashboard/orders';</script>";
            } else {
                echo "<script>window.location='http://localhost:3000/dashboard/orders';</script>";
            }
        }
    }
} else {
    echo "Failed to connect with SSLCOMMERZ";
}

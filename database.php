<?php
    //connects to database, if not exits with error
    $mysqli = new mysqli('localhost', 'wustl_inst', 'wustl_pass', 'dogs');

    if($mysqli->connect_errno) {
        header("Content-Type: application/json");
        echo json_encode(array(
            "success" => false,
            "message" => "Connection Failed: ".$mysqli->connect_error
        ));
        exit;
    }
?>
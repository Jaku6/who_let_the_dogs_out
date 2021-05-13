<?php

header("Content-Type: application/json"); 

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$time = (string)$json_obj['time'];

require 'database.php';

$stmt = $mysqli->prepare("update dog_time set last_time = (?) where id = 1");
$stmt->bind_param('s', $time);
$stmt->execute();
$stmt->close();

echo json_encode(array(
    "success" => true,
    "time" => $time
));
exit;

?>
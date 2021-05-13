<?php

header("Content-Type: application/json"); 

require 'database.php';

$stmt = $mysqli->prepare("select last_time from dog_time where id=2");
$stmt->execute();
$stmt->bind_result($time);
$stmt->fetch();

echo json_encode(array(
    "time" => $time
));
exit;

?>
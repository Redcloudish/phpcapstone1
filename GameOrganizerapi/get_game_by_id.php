<?php
include '../db.php';

$id = $_GET['id'];

$sql = "SELECT * FROM games WHERE id='$id'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $game = $result->fetch_assoc();
    echo json_encode($game);
} else {
    echo json_encode(["success" => false, "message" => "Game not found"]);
}

$conn->close();
?>

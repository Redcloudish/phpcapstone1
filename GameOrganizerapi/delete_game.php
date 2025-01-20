<?php
include '../db.php';

$id = $_POST['id'];

$sql = "DELETE FROM games WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Game deleted successfully!"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}
$conn->close();
?>

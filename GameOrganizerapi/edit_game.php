<?php
include '../db.php';

$id = $_POST['id'];
$title = $_POST['title'];
$platform = $_POST['platform'];
$date_made = $_POST['date_made'];
$genre = $_POST['genre'];

$sql = "UPDATE games 
        SET title='$title', platform='$platform', date_made='$date_made', genre='$genre'
        WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Game updated successfully!"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}
$conn->close();
?>

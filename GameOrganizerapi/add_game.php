<?php
include '../db.php';

// Check if the request is a POST method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit;
}

// Debugging: Log incoming POST data
file_put_contents('php://stderr', print_r($_POST, true)); // Log POST data to error log

// Check if all required fields are present
if (!isset($_POST['title'], $_POST['platform'], $_POST['date_made'], $_POST['genre'])) {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

$title = trim($_POST['title']);
$platform = trim($_POST['platform']);
$date_made = trim($_POST['date_made']);
$genre = trim($_POST['genre']);

// Ensure fields are not empty
if (empty($title) || empty($platform) || empty($date_made) || empty($genre)) {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

// Automatically set the current date and time for the date_added field
$date_added = date('Y-m-d H:i:s'); // Current date and time

try {
    // Prepare and execute the SQL statement
    $stmt = $conn->prepare("INSERT INTO games (title, platform, date_made, date_added, genre) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $title, $platform, $date_made, $date_added, $genre);

    // Execute and check if successful
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Game added successfully!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to add game. Please try again."]);
    }

    // Close the statement
    $stmt->close();
} catch (Exception $e) {
    // Handle any exceptions and errors
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}

// Close the database connection
$conn->close();
?>




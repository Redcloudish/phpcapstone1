<?php
include '../db.php'; // Ensure this path is correct

try {
    $stmt = $conn->prepare("SELECT * FROM games");
    $stmt->execute();
    $result = $stmt->get_result();

    $games = [];
    while ($row = $result->fetch_assoc()) {
        $games[] = $row;
    }

    // Debug log for PHP
    error_log("Fetched games: " . json_encode($games));
    
    echo json_encode($games);

    $stmt->close();
} catch (Exception $e) {
    http_response_code(500);
    error_log("Error in get_games.php: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}

$conn->close();
?>


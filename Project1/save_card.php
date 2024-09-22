<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "your_db_name";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = $_POST['name'];
$profileImage = $_POST['profileImage'];
$cardImage = $_POST['cardImage'];

$sql = "INSERT INTO cards (name, profile_image, card_image) VALUES ('$name', '$profileImage', '$cardImage')";

if ($conn->query($sql) === TRUE) {
    echo "Card saved successfully!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

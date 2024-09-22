<?php
if ($_FILES['profilePicture']) {
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["profilePicture"]["name"]);
    move_uploaded_file($_FILES["profilePicture"]["tmp_name"], $target_file);
    echo json_encode(["imageUrl" => $target_file]);
}
?>

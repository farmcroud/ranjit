<?php
// Check if the filename parameter is set
if (isset($_GET['filename'])) {
    $filename = basename($_GET['filename']); // Sanitize the filename
    $file_path = 'path/to/generated/images/' . $filename; // Update this path accordingly

    // Check if the file exists
    if (file_exists($file_path)) {
        // Set headers to download the file
        header('Content-Description: File Transfer');
        header('Content-Type: image/jpeg');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file_path));

        // Read the file and output its content
        readfile($file_path);
        exit;
    } else {
        // If the file does not exist, show a 404 error
        http_response_code(404);
        echo 'File not found.';
    }
} else {
    // If no filename parameter is set, show an error
    http_response_code(400);
    echo 'Filename not specified.';
}
?>

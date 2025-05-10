<?php
header("Content-Type: application/json");

$baseDir = "images";
$folders = array_diff(scandir($baseDir), ['.', '..']);
$data = [];

foreach ($folders as $folder) {
    $folderPath = "$baseDir/$folder";
    if (is_dir($folderPath)) {
        $files = array_diff(scandir($folderPath), ['.', '..']);
        $data[$folder] = array_values($files);
    }
}

echo json_encode($data);
?>

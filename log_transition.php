<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Function to get client IP address
function getClientIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        return $_SERVER['REMOTE_ADDR'];
    }
}

// Create logs directory if it doesn't exist
$logsDir = 'logs';
if (!file_exists($logsDir)) {
    if (!mkdir($logsDir, 0755, true)) {
        error_log("Failed to create logs directory");
        http_response_code(500);
        exit;
    }
}

// Get the log entry from the POST request
$logEntry = file_get_contents('php://input');
if ($logEntry === false) {
    error_log("Failed to read POST data");
    http_response_code(400);
    exit;
}

// Get client IP address
$clientIP = getClientIP();

// Add IP address to the log entry
$logEntry = $clientIP . ',' . $logEntry;

// Path to the log file in the logs directory
$logFile = $logsDir . '/reference-box-tracking.csv';

// Create file if it doesn't exist and write header
if (!file_exists($logFile)) {
    $header = "ip_address,timestamp,bellCount,sourcePattern,targetPattern\n";
    if (file_put_contents($logFile, $header) === false) {
        error_log("Failed to create log file");
        http_response_code(500);
        exit;
    }
}

// Append the log entry
if (file_put_contents($logFile, $logEntry, FILE_APPEND) === false) {
    error_log("Failed to append to log file");
    http_response_code(500);
    exit;
}

// Send success response
http_response_code(200);
?> 
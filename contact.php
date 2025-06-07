<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get form data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';
} else {
    $name = $input['name'] ?? '';
    $email = $input['email'] ?? '';
    $subject = $input['subject'] ?? '';
    $message = $input['message'] ?? '';
}

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Name, email, and message are required']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// Sanitize inputs
$name = htmlspecialchars(strip_tags($name));
$email = htmlspecialchars(strip_tags($email));
$subject = htmlspecialchars(strip_tags($subject));
$message = htmlspecialchars(strip_tags($message));

// Email configuration
$to = 'kamenialexnea@gmail.com'; // Alex's email
$email_subject = $subject ? "Portfolio Contact: $subject" : "Portfolio Contact from $name";

// Email content
$email_body = "
New message from your portfolio website:

Name: $name
Email: $email
Subject: $subject

Message:
$message

---
Sent from: " . $_SERVER['HTTP_HOST'] . "
Time: " . date('Y-m-d H:i:s') . "
IP: " . $_SERVER['REMOTE_ADDR'] . "
";

// Email headers
$headers = "From: portfolio@" . $_SERVER['HTTP_HOST'] . "\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $email_subject, $email_body, $headers)) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message! I\'ll get back to you soon.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send message. Please try again later or contact me directly at kamenialexnea@gmail.com'
    ]);
}
?>

<?php
/**
 * Contact form submission handler.
 *
 * This site is deployed as a static export (see next.config.ts) to shared
 * FTP hosting, so the form posts here instead of a Next.js API route — static
 * hosts can't run server-side JS. Validation mirrors src/lib/validation.ts
 * and behaviour mirrors the old src/app/api/contact/route.ts.
 */

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit;
}

// Config: RECAPTCHA_SECRET_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL constants.
// contact-config.php is gitignored — copy contact-config.example.php to
// contact-config.php (in this same folder) and fill in real values. It's a
// static file, so it gets picked up automatically once built and deployed.
$configPath = __DIR__ . '/contact-config.php';
if (file_exists($configPath)) {
    require $configPath;
}

function respond(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body);
    exit;
}

/** Strip CR/LF so user input can never inject extra mail headers. */
function sanitizeHeaderValue(string $value): string {
    return trim(str_replace(["\r", "\n"], '', $value));
}

function field(array $payload, string $key): string {
    return isset($payload[$key]) && is_string($payload[$key]) ? trim($payload[$key]) : '';
}

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);
if (!is_array($payload)) {
    respond(400, ['error' => 'Invalid request body.']);
}

$name     = sanitizeHeaderValue(field($payload, 'name'));
$email    = field($payload, 'email');
$company  = sanitizeHeaderValue(field($payload, 'company'));
$website  = sanitizeHeaderValue(field($payload, 'website'));
$interest = field($payload, 'interest');
$message  = field($payload, 'message');
$honeypot = field($payload, 'company_size');

// Validation mirrors src/lib/validation.ts.
$issues = [];
if (mb_strlen($name) < 2) {
    $issues['name'] = ['Please enter your name.'];
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $issues['email'] = ['Please enter a valid email address.'];
}
if (mb_strlen($message) < 10) {
    $issues['message'] = ['Tell us a little more — at least a sentence.'];
}
if (!empty($issues)) {
    respond(422, ['error' => 'Please check the form and try again.', 'issues' => $issues]);
}

// Honeypot: a filled hidden field means a bot. Accept silently so the bot
// thinks it succeeded, but don't deliver anything.
if ($honeypot !== '') {
    respond(200, ['ok' => true]);
}

// reCAPTCHA v3 verification — only runs when a secret key is configured.
if (defined('RECAPTCHA_SECRET_KEY') && RECAPTCHA_SECRET_KEY !== '') {
    $token = isset($payload['recaptchaToken']) && is_string($payload['recaptchaToken'])
        ? $payload['recaptchaToken']
        : '';
    if ($token === '') {
        respond(400, ['error' => 'reCAPTCHA verification required.']);
    }

    $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'secret' => RECAPTCHA_SECRET_KEY,
            'response' => $token,
        ]),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
    ]);
    $verifyRaw = curl_exec($ch);
    curl_close($ch);
    $verifyData = json_decode((string) $verifyRaw, true);

    if (!is_array($verifyData) || empty($verifyData['success']) || ($verifyData['score'] ?? 0) < 0.5) {
        respond(400, ['error' => 'reCAPTCHA check failed. Please try again.']);
    }
}

// Keep in sync with src/data/capabilities.ts.
$interestLabels = [
    'web-app-builds' => 'Web & App Builds',
    'brand-design' => 'Brand Design',
    'copywriting' => 'Copywriting',
    'ads-management' => 'Ads Management',
    'social-media-management' => 'Social Media Management',
    'admin-support' => 'Admin Support',
];
$interestLabel = ($interest === '' || $interest === 'not-sure')
    ? 'Not sure yet — wants help working out what they need'
    : ($interestLabels[$interest] ?? $interest);

$subject = sanitizeHeaderValue('New enquiry from ' . $name . ($company !== '' ? " ($company)" : ''));

$lines = [
    "Name: $name",
    "Email: $email",
];
if ($company !== '') $lines[] = "Company: $company";
if ($website !== '') $lines[] = "Website: $website";
$lines[] = "Interested in: $interestLabel";
$lines[] = '';
$lines[] = 'Message:';
$lines[] = $message;
$body = implode("\n", $lines);

$toEmail = defined('CONTACT_TO_EMAIL') ? CONTACT_TO_EMAIL : '';
$fromEmail = defined('CONTACT_FROM_EMAIL') ? CONTACT_FROM_EMAIL : '';

// If not configured, log the submission and return success so the user isn't
// blocked. Copy contact-config.example.php to contact-config.php to enable delivery.
if ($toEmail === '' || $fromEmail === '') {
    error_log('[contact] Not configured. Submission:' . "\n" . $body);
    respond(200, ['ok' => true]);
}

$headers = implode("\r\n", [
    'From: Copy That <' . $fromEmail . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
]);

$sent = mail($toEmail, $subject, $body, $headers);

if (!$sent) {
    error_log('[contact] mail() failed for submission from ' . $email);
    respond(502, ['error' => "We couldn't send your message. Please email us directly."]);
}

respond(200, ['ok' => true]);

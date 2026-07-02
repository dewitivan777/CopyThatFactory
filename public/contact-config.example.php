<?php
/**
 * Contact form configuration.
 *
 * Copy this file to contact-config.php (same folder) and fill in real values.
 * contact-config.php is gitignored — never commit real secrets.
 */

// reCAPTCHA v3 secret key. Leave empty to disable verification.
// Get it from https://www.google.com/recaptcha/admin (must match the public
// site key in src/data/site.ts).
define('RECAPTCHA_SECRET_KEY', '');

// Where contact form submissions are delivered.
define('CONTACT_TO_EMAIL', 'info@copythatfactory.co.za');

// "From" address used when sending — should be a real mailbox on your own
// domain so the host's mail server doesn't flag it as spam.
define('CONTACT_FROM_EMAIL', 'website@copythatfactory.co.za');

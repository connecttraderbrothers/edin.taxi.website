// â”€â”€â”€ CONTACT FORM SUBMISSION â”€â”€â”€
// Paste your Make.com webhook URL below
const MAKE_WEBHOOK_URL = '';

async function submitForm() {
  const btn = document.getElementById('submitBtn');
  const status = document.getElementById('formStatus');
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  // Validation
  if (!firstName || !lastName || !email || !phone) {
    status.textContent = 'Please fill in all required fields.';
    status.className = 'form-status error';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.textContent = 'Please enter a valid email address.';
    status.className = 'form-status error';
    return;
  }

  if (!MAKE_WEBHOOK_URL) {
    status.textContent = 'Webhook URL not configured. Please add your Make.com URL.';
    status.className = 'form-status error';
    return;
  }

  btn.disabled = true;
  status.textContent = 'Sending your message...';
  status.className = 'form-status sending';

  try {
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        service,
        message,
        submittedAt: new Date().toISOString()
      })
    });

    if (response.ok) {
      status.textContent = 'Message sent successfully! We\'ll be in touch soon.';
      status.className = 'form-status success';
      // Reset fields
      document.getElementById('firstName').value = '';
      document.getElementById('lastName').value = '';
      document.getElementById('email').value = '';
      document.getElementById('phone').value = '';
      document.getElementById('service').selectedIndex = 0;
      document.getElementById('message').value = '';
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    status.textContent = 'Something went wrong. Please try calling us instead.';
    status.className = 'form-status error';
  } finally {
    btn.disabled = false;
  }
}

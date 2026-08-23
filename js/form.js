// --- CONTACT FORM → WHATSAPP ---
const WHATSAPP_NUMBER = '441875818732';

function submitForm() {
  const status = document.getElementById('formStatus');

  const firstName = document.getElementById('firstName').value.trim();
  const lastName  = document.getElementById('lastName').value.trim();
  const email     = document.getElementById('email').value.trim();
  const phone     = document.getElementById('phone').value.trim();
  const service   = document.getElementById('service').value;
  const message   = document.getElementById('message').value.trim();

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

  const text =
    `New enquiry from Edinburgh Taxi Meters website\n\n` +
    `First Name: ${firstName}\n` +
    `Last Name: ${lastName}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone}\n` +
    `Service Required: ${service}\n` +
    `Message: ${message}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');

  status.textContent = "Opening WhatsApp — we'll be in touch soon!";
  status.className = 'form-status success';
}

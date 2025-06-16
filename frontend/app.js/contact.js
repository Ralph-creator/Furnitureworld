document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const statusEl = document.getElementById('form-status');

  const data = {
    name: `${form.firstName.value} ${form.lastName.value}`,
    email: form.email.value,
    phone: form.phone.value,
    message: form.message.value,
  };

  try {
    const res = await fetch('http://localhost:5500/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      statusEl.textContent = 'Message sent successfully!';
      statusEl.style.color = 'green';
      form.reset();
    } else {
      statusEl.textContent = result.error || 'Failed to send message.';
      statusEl.style.color = 'red';
    }
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'An error occurred. Please try again.';
    statusEl.style.color = 'red';
  }
});

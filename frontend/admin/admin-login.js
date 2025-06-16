document.getElementById('admin-login-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = e.target.username.value;
  const password = e.target.password.value;
  const msg = document.getElementById('login-message');

  try {
    const res = await fetch('http://localhost:5500/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      msg.textContent = 'Login successful. Redirecting...';
      msg.style.color = 'green';
      localStorage.setItem('adminToken', data.token); // Save token for later use
      setTimeout(() => window.location.href = '../admin/admin-dashboard.html', 1500);
    } else {
      msg.textContent = data.error || 'Login failed.';
      msg.style.color = 'red';
    }
  } catch (err) {
    console.error(err);
    msg.textContent = 'Server error.';
    msg.style.color = 'red';
  }
});

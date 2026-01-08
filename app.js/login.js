document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    const response = await fetch('http://localhost:5500/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      localStorage.setItem('token', data.token); // Save token in localStorage
      window.location.href = '../pages/index.html'; // Redirect after login
    } else {
      alert(data.message || 'Login failed');
    }
  });
  
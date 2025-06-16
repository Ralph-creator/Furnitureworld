function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}

function logout() {
  localStorage.removeItem('adminToken');
  window.location.href = 'admin-login.html';
}

document.getElementById('add-product-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  try {
    const res = await fetch('http://localhost:5500/api/products', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    const msg = document.getElementById('add-msg');
    if (res.ok) {
      msg.textContent = 'Product added!';
      form.reset();
    } else {
      msg.textContent = data.error || 'Failed to add product';
    }
  } catch (err) {
    console.error(err);
  }
});


// This is the Token check ( It is a basic security in my app)
window.onload = () => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    alert('Unauthorized. Please login.');
    window.location.href = 'admin-login.html';
  }
};
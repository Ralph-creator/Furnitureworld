function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.style.display = 'none';
  });

  const section = document.getElementById(sectionId);
  section.style.display = 'block';

  if (sectionId === 'inbox') {
    loadInboxMessages(); // Load inbox data
  }
}

function logout() {
  localStorage.removeItem('adminToken');
  window.location.href = 'admin-login.html';
}

// Load and display products in the admin dashboard
async function loadProducts() {
  try {
    const response = await fetch('http://localhost:5500/api/products');
    const products = await response.json();

    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous content

    if (products.length === 0) {
      productList.innerHTML = '<p>No products available.</p>';
      return;
    }

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
        <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 6px;">
          <img src="http://localhost:5500/${product.imageUrl}" alt="${product.title}" style="width: 120px; height: auto; border-radius: 4px;">
          <h3>${product.title}</h3>
          <p>Price: $${product.price}</p>
        </div>
      `;

      productList.appendChild(productCard);
    });
    
  } catch (error) {
    console.error('Failed to load products:', error);
  }
}

// Handle add product form submission
document.getElementById('add-product-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const msg = document.getElementById('add-msg');

  try {
    const res = await fetch('http://localhost:5500/api/products', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      msg.textContent = '✅ Product added!';
      msg.style.color = 'green';
      form.reset();
      loadProducts(); // Refresh the product list
      setTimeout(() => msg.textContent = '', 3000);
    } else {
      msg.textContent = data.error || '❌ Failed to add product';
      msg.style.color = 'red';
    }
  } catch (err) {
    msg.textContent = '❌ Network error';
    msg.style.color = 'red';
    console.error(err);
  }
});

// Delete product function
async function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) return;

  try {
    const res = await fetch(`http://localhost:5500/api/products/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('✅ Product deleted');
      loadProducts();
    } else {
      alert('❌ Failed to delete product');
    }
  } catch (err) {
    console.error('Delete failed:', err);
    alert('❌ Network error');
  }
}

// Placeholder edit function
function editProduct(id) {
  alert(`Editing product with ID: ${id}`);
  // You can implement a modal or form to edit
}

// Unified token check and product load on page load
window.onload = () => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    alert('Unauthorized. Please login.');
    window.location.href = 'admin-login.html';
    return;
  }

  loadProducts();
};

// Load inbox messages
async function loadInboxMessages() {
  try {
    const res = await fetch('http://localhost:5500/api/contact');
    const messages = await res.json();

    const inboxDiv = document.getElementById('inbox-messages');
    inboxDiv.innerHTML = ''; // Clear previous

    if (messages.length === 0) {
      inboxDiv.innerHTML = '<p>No messages yet.</p>';
      return;
    }

    messages.forEach(msg => {
      const messageCard = document.createElement('div');
      messageCard.classList.add('message-card');
      messageCard.innerHTML = `
        <h4>${msg.name}</h4>
        <p><strong>Email:</strong> ${msg.email}</p>
        <p><strong>Message:</strong> ${msg.message}</p>
        <hr>
      `;
      inboxDiv.appendChild(messageCard);
    });
  } catch (err) {
    console.error('Error loading inbox messages:', err);
  }
}


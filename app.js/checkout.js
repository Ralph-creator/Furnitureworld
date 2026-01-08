const checkoutButton = document.getElementById('checkout-button');

checkoutButton.addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  const cartItems = await fetch('/api/cart', {
    headers: {
      'Authorization': token
    }
  }).then(res => res.json());

  const itemsToSend = cartItems.items.map(item => ({
    name: item.productId.name,
    price: item.productId.price,
    quantity: item.quantity
  }));

  const response = await fetch('/api/payment/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({ items: itemsToSend })
  });

  const data = await response.json();
  const stripe = Stripe('your_stripe_publishable_key'); // Replace with part with the client's Stripe  actual publishable key
  stripe.redirectToCheckout({ sessionId: data.id });
});
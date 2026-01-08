let cart = [];
let total = 0;

// Load cart from localStorage when the page loads
window.onload = function () {
    const savedCart = localStorage.getItem('cart');
    const savedTotal = localStorage.getItem('total');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        total = parseFloat(savedTotal) || 0;
        updateCart();
        if (cart.length > 0) {
            document.getElementById('cart').style.display = 'block'; // Show the cart if it has items
        }
    }
};

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total.toString());
}

// Add item to cart
function addToCart(item, price) {
    const existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
    } else {
        cart.push({ item, price, quantity: 1, totalPrice: price });
    }
    total += price;
    document.getElementById('cart').style.display = 'block'; // Show the cart
    saveCart(); // Save the updated cart to localStorage
    updateCart();
}

// Increment item quantity
function incrementItem(item) {
    const existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
        total += existingItem.price;
    }
    saveCart(); // Save the updated cart to localStorage
    updateCart();
}

// Decrement item quantity
function decrementItem(item) {
    const existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
            existingItem.totalPrice = existingItem.quantity * existingItem.price;
            total -= existingItem.price;
        } else {
            // Remove the item completely if quantity is 1
            cart = cart.filter(cartItem => cartItem.item !== item);
            total -= existingItem.price;
        }
    }
    saveCart(); // Save the updated cart to localStorage
    updateCart();
}

// Update the cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((cartItem) => {
        const li = document.createElement('li');
        li.className = 'item';
        li.innerHTML = `
            <span>${cartItem.item}</span>
            <div>
                <button class="qty-button" onclick="decrementItem('${cartItem.item}')">-</button>
                <span class="quantity">${cartItem.quantity}</span>
                <button class="qty-button" onclick="incrementItem('${cartItem.item}')">+</button>
            </div>
        `;
        cartItems.appendChild(li);
    });
    document.getElementById('total').textContent = `Total: $${total}`;
}

// Hide the cart when the `-` button is clicked
document.getElementById('hide-cart').addEventListener('click', () => {
    document.getElementById('cart').style.display = 'none';
});

// Clear the cart
document.getElementById('cancel').onclick = function () {
    cart = [];
    total = 0;
    localStorage.removeItem('cart'); // Remove cart from localStorage
    localStorage.removeItem('total'); // Remove total from localStorage
    updateCart();
    document.getElementById('cart').style.display = 'none';
};

// Checkout the cart and send WhatsApp message
document.getElementById('checkout-button').onclick = function () {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    let message = `Hello, I would like to order:%0A`;
    cart.forEach(item => {
        message += `- ${item.item} x${item.quantity} = $${item.totalPrice}%0A`;
    });
    message += `Total = $${total}`;

    // WhatsApp API format
    const whatsappNumber = '2349036969953';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURI(message)}`;

    window.open(whatsappURL, '_blank');

    resetCart();
};


// Reset the cart (used for both cancel and checkout)
function resetCart() {
    cart = [];
    total = 0;
    localStorage.removeItem('cart'); // Remove cart from localStorage
    localStorage.removeItem('total'); // Remove total from localStorage
    updateCart();
    document.getElementById('cart').style.display = 'none';
}
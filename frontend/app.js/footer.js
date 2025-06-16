function submitForm() {
    const emailInput = document.querySelector('.email-input');
    const email = emailInput.value;

    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email) {
        if (emailRegex.test(email)) {
            alert('Thank you for subscribing!');
            emailInput.value = ''; // Clear the input field
        } else {
            alert('Please enter a valid email address.');
        }
    } else {
        alert('Email field cannot be empty. Please enter your email address.');
    }
}


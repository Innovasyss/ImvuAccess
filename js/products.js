// Check login status and update UI
function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const userInfo = document.getElementById('user-info');
    const loginRegisterOptions = document.getElementById('authOptions');

    if (user) {
        // User is logged in, show username and unique ID
        document.getElementById('user-details').innerText = `${user.username} | ID: ${user.id}`;
        userInfo.style.display = 'flex'; // Show user info
        loginRegisterOptions.style.display = 'none'; // Hide login/register options
    } else {
        userInfo.style.display = 'none'; // Hide user info
        loginRegisterOptions.style.display = 'flex'; // Show login/register options
    }
}

// Handle Logout
document.getElementById('logout-link').addEventListener('click', () => {
    localStorage.removeItem('currentUser'); // Clear user data from localStorage
    location.reload(); // Reload the page to update UI
});

// Handle Buy Button Click
function handleBuy(e) {
    const productId = e.target.getAttribute('data-id');

    // Find the product based on the ID from the HTML
    const productName = e.target.closest('.product-card').querySelector('h3').innerText;
    const productPrice = e.target.closest('.product-card').querySelector('.product-info p').innerText;

    // Simulate payment scanner
    if (!isUserLoggedIn()) {
        alert('Please login to purchase products.');
        window.location.href = 'login.html';
        return;
    }

    const paymentConfirmed = confirm(`Proceed to pay for ${productName} at ${productPrice}?`);

    if (paymentConfirmed) {
        // Simulate payment processing
        simulatePayment({ id: productId, name: productName });
    }
}

// Check if user is logged in
function isUserLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// Simulate Payment Processing
function simulatePayment(product) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const history = JSON.parse(localStorage.getItem(`history_${user.id}`)) || [];

    const purchase = {
        productId: product.id,
        productName: product.name,
        paymentStatus: 'Done',
        rating: 0,
        timestamp: new Date().toLocaleString(),
    };

    history.push(purchase);
    localStorage.setItem(`history_${user.id}`, JSON.stringify(history));

    showWaitingTime();
}

// Show Waiting Time Screen
function showWaitingTime() {
    const waitingScreen = document.createElement('div');
    waitingScreen.classList.add('waiting-time');
    waitingScreen.innerHTML = `
        <h2>Payment Successful!</h2>
        <p>Your order is being processed.</p>
        <p>Estimated waiting time: 2 hours.</p>
    `;
    document.body.innerHTML = '';
    document.body.appendChild(waitingScreen);
}

// Add event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus(); // Check login status on page load

    // Add event listeners to buy buttons in the existing HTML
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', handleBuy);
    });
});

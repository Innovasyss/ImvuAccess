// At the top of login.js and register.js

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        // If user is already logged in, redirect to products
        window.location.href = 'products.html';
    }
});
// js/login.js

// Function to get users from localStorage
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginError.textContent = '';

    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();

    if (username === '' || password === '') {
        loginError.textContent = 'Please enter both username and password.';
        return;
    }

    const users = getUsers();

    // Find user with matching username and password
    const user = users.find(u => 
        u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (user) {
        // Save user session
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'products.html';
    } else {
        loginError.textContent = 'Invalid username or password.';
    }
});
// Inside main.js, within the logout event listener

logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    const confirmLogout = confirm('Are you sure you want to logout?');
    if (confirmLogout) {
        // Clear user session
        localStorage.removeItem('currentUser');
        // Redirect to home page
        window.location.href = 'index.html';
    }
});


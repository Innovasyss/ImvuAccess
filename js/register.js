// At the top of login.js and register.js

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        // If user is already logged in, redirect to products
        window.location.href = 'products.html';
    }
});

// js/register.js

// Function to generate a unique 5-digit user ID
function generateUserId() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}

// Function to get users from localStorage
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Function to save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const registerError = document.getElementById('registerError');
    const registerSuccess = document.getElementById('registerSuccess');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        registerError.textContent = '';
        registerSuccess.textContent = '';

        const username = document.getElementById('reg-username').value.trim();
        const password = document.getElementById('reg-password').value.trim();

        if (username === '' || password === '') {
            registerError.textContent = 'Please fill in all fields.';
            return;
        }

        let users = getUsers();

        // Check if username already exists
        const userExists = users.some(user => user.username.toLowerCase() === username.toLowerCase());

        if (userExists) {
            registerError.textContent = 'Username already exists. Please choose another.';
            return;
        }

        // Create new user object
        const newUser = {
            username: username,
            password: password,
            id: generateUserId(),
        };

        // Add new user to users array
        users.push(newUser);
        saveUsers(users);

        // Optionally, log the user in immediately after registration
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        registerSuccess.textContent = 'Registration successful! Redirecting to products...';

        // Redirect after a short delay
        setTimeout(() => {
            window.location.href = 'products.html';
        }, 2000);
    });
});

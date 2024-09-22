// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const logoutLink = document.getElementById('logout-link');
    const userInfo = document.getElementById('user-info');
    const userDetails = document.getElementById('user-details');

    if (currentUser) {
        // Parse the current user data
        const user = JSON.parse(currentUser);

        // Display user information
        userDetails.textContent = `User: ${user.username} | ID: ${user.id}`;

        // Show the user-info container
        userInfo.style.display = 'flex';
        userInfo.style.alignItems = 'center';
        userInfo.style.gap = '10px'; // Optional: Add spacing between details and logout

        // Hide Login and Register links
        if (loginLink) loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';

        // Show Logout link
        if (logoutLink) logoutLink.style.display = 'inline';

        // Add event listener to Logout link
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Clear user session
            localStorage.removeItem('currentUser');
            // Optionally, clear purchase history if desired
            // localStorage.removeItem(`history_${user.id}`);
            // Reload the page to update the UI
            window.location.href = 'index.html';
        });
    } else {
        // User is not logged in

        // Show Login and Register links
        if (loginLink) loginLink.style.display = 'inline';
        if (registerLink) registerLink.style.display = 'inline';

        // Hide Logout link and user-info container
        if (logoutLink) logoutLink.style.display = 'none';
        if (userInfo) userInfo.style.display = 'none';
    }
});

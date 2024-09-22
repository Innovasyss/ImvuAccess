// js/history.js
function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const userInfo = document.getElementById('userInfo');
    const loginRegisterOptions = document.getElementById('loginRegisterOptions');

    if (user) {
        // User is logged in, show username and unique ID
        document.getElementById('username').innerText = user.username; // Ensure 'username' is part of the user object
        document.getElementById('userId').innerText = `ID: ${user.id}`; // Ensure 'id' is part of the user object
        userInfo.style.display = 'inline'; // Show user info
        loginRegisterOptions.style.display = 'none'; // Hide login/register options
    } else {
        userInfo.style.display = 'none'; // Hide user info
        loginRegisterOptions.style.display = 'inline'; // Show login/register options
    }
}

// Handle Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser'); // Clear user data from localStorage
    location.reload(); // Reload the page to update UI
});

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
});

function loadHistory() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        alert('Please login to view your purchase history.');
        window.location.href = 'login.html';
        return;
    }

    const history = JSON.parse(localStorage.getItem(`history_${user.id}`)) || [];
    const tableBody = document.querySelector('#historyTable tbody');
    tableBody.innerHTML = '';

    if (history.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">No purchases yet.</td></tr>';
        return;
    }

    history.forEach((item, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.productName}</td>
            <td>${item.paymentStatus}</td>
            <td>
                <select data-index="${index}" class="rating-select">
                    <option value="0" ${item.rating === 0 ? 'selected' : ''}>0</option>
                    <option value="1" ${item.rating === 1 ? 'selected' : ''}>1</option>
                    <option value="2" ${item.rating === 2 ? 'selected' : ''}>2</option>
                    <option value="3" ${item.rating === 3 ? 'selected' : ''}>3</option>
                    <option value="4" ${item.rating === 4 ? 'selected' : ''}>4</option>
                    <option value="5" ${item.rating === 5 ? 'selected' : ''}>5</option>
                </select>
            </td>
            <td>${item.timestamp}</td>
        `;

        tableBody.appendChild(row);
    });

    // Add event listeners to rating selects
    const ratingSelects = document.querySelectorAll('.rating-select');
    ratingSelects.forEach(select => {
        select.addEventListener('change', handleRatingChange);
    });
}

// Handle Rating Change
function handleRatingChange(e) {
    const index = e.target.getAttribute('data-index');
    const newRating = parseInt(e.target.value);
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const history = JSON.parse(localStorage.getItem(`history_${user.id}`)) || [];

    if (history[index]) {
        history[index].rating = newRating;
        localStorage.setItem(`history_${user.id}`, JSON.stringify(history));
        alert('Rating updated successfully.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
});

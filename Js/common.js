// ========== SHARED AUTHENTICATION & COMMON FUNCTIONS ==========

// Check if user is already logged in on page load
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');
    
    if (isLoggedIn === 'true') {
        showLoggedInUI(userName);
    }
}

// Open login modal
function openLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        const modal = new bootstrap.Modal(loginModal);
        modal.show();
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userName = email.split('@')[0];
    
    if (email && password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', userName);
        
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            const modal = bootstrap.Modal.getInstance(loginModal);
            if (modal) modal.hide();
        }
        
        showLoggedInUI(userName);
        document.getElementById('loginForm').reset();
    }
}

// Show logged in UI
function showLoggedInUI(userName) {
    const loginBtn = document.getElementById('loginBtn');
    const dashboardLink = document.getElementById('dashboardLink');
    const userMenu = document.getElementById('userMenu');
    const userNameDisplay = document.getElementById('userNameDisplay');
    
    if (loginBtn) loginBtn.style.display = 'none';
    if (dashboardLink) dashboardLink.style.display = 'inline-block';
    if (userMenu) userMenu.style.display = 'block';
    if (userNameDisplay) userNameDisplay.textContent = userName;
}

// Toggle user dropdown menu
function toggleUserMenu() {
    const dropdown = document.getElementById('dropdownMenu');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    const userMenu = document.getElementById('userMenu');
    const dropdown = document.getElementById('dropdownMenu');
    
    if (userMenu && dropdown && !userMenu.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        
        const loginBtn = document.getElementById('loginBtn');
        const dashboardLink = document.getElementById('dashboardLink');
        const userMenu = document.getElementById('userMenu');
        const dropdown = document.getElementById('dropdownMenu');
        
        if (loginBtn) loginBtn.style.display = 'block';
        if (dashboardLink) dashboardLink.style.display = 'none';
        if (userMenu) userMenu.style.display = 'none';
        if (dropdown) dropdown.style.display = 'none';
        
        window.location.href = 'index.html';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
});
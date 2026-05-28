// ========== DASHBOARD.HTML SPECIFIC FUNCTIONALITY ==========

// Check dashboard access on page load
function checkDashboardAccess() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');
    
    if (isLoggedIn !== 'true') {
        alert('Please login first to access the dashboard!');
        window.location.href = 'index.html';
    } else {
        const userNameDisplay = document.getElementById('userNameDisplay');
        if (userNameDisplay) {
            userNameDisplay.textContent = userName;
        }
    }
}

// ========== INTERACTIVE DASHBOARD FEATURES ==========

// Make challenge cards clickable
document.addEventListener('DOMContentLoaded', () => {
    // Check access first
    checkDashboardAccess();
    
    // Challenge card interactions
    document.querySelectorAll('.challenge-card').forEach(card => {
        card.addEventListener('click', function() {
            if (!this.querySelector('.badge-completed')) {
                const title = this.querySelector('.challenge-title')?.textContent || 'Challenge';
                console.log(`Clicked on: ${title}`);
            }
        });
    });
    
    // Search functionality
    const searchBar = document.querySelector('.search-bar');
    if (searchBar) {
        searchBar.addEventListener('input', function(e) {
            console.log('Searching for:', e.target.value);
        });
    }
    
    // Smooth scroll reveal for dashboard elements
    const dashboardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                dashboardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe dashboard cards
    document.querySelectorAll('.challenge-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        dashboardObserver.observe(el);
    });
});
// ========== CATEGORY PAGES ANIMATIONS & INTERACTIONS ==========
// Used by: climate-change.html, life-on-land.html, life-in-water.html, protecting-wildlife.html, eco-tips.html

document.addEventListener('DOMContentLoaded', () => {
    // ========== SCROLL REVEAL ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements on category pages
    document.querySelectorAll('.challenge-card, .eco-tip').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // ========== MOUSE FOLLOW EFFECT FOR CARDS ==========
    document.querySelectorAll('.challenge-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = (x / rect.width) * 20;
            const yPercent = (y / rect.height) * 20;
            
            card.style.background = `linear-gradient(135deg, 
                rgba(10, 14, 39, ${0.9 - xPercent / 1000}),
                rgba(26, 31, 58, ${0.8 - yPercent / 1000}))`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = 'linear-gradient(135deg, var(--navy-bg), rgba(10, 14, 39, 0.8))';
        });
    });

    // ========== PARALLAX EFFECT (DISABLED) ==========
    // Parallax effect removed - headers stay normal when scrolling

    // ========== CHALLENGE INTERACTION ==========
    document.querySelectorAll('.challenge-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.challenge-title')?.textContent || 'Challenge';
            console.log(`Clicked on challenge: ${title}`);
        });
    });
});
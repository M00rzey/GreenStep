// ========== INDEX.HTML - CAROUSEL & ANIMATIONS ==========

// ========== CAROUSEL FUNCTIONALITY ==========
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-card');
const dots = document.querySelectorAll('.carousel-dot');

function slideCarousel(direction) {
    if (slides.length === 0) return;
    
    slides[currentSlide].style.opacity = '0';
    slides[currentSlide].style.transform = 'translateX(30px)';
    
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;
    
    updateCarousel();
}

function goToSlide(index) {
    if (slides.length === 0) return;
    
    slides[currentSlide].style.opacity = '0';
    slides[currentSlide].style.transform = 'translateX(30px)';
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.style.display = 'block';
            setTimeout(() => {
                slide.style.opacity = '1';
                slide.style.transform = 'translateX(0)';
            }, 10);
        } else {
            slide.style.display = 'none';
        }
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Auto-advance carousel every 8 seconds
setInterval(() => {
    if (slides.length > 0) {
        slideCarousel(1);
    }
}, 8000);

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', () => {
    if (slides.length > 0) {
        updateCarousel();
    }
});

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

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stat-card, .challenge-card, .eco-tip, .category-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// ========== MOUSE FOLLOW EFFECT FOR CARDS ==========
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stat-card, .challenge-card').forEach(card => {
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
});

// ========== NUMBER COUNTER ANIMATION ==========
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counters on scroll
document.addEventListener('DOMContentLoaded', () => {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const number = parseInt(entry.target.textContent);
                if (!isNaN(number) && number > 100) {
                    animateCounter(entry.target, number);
                    entry.target.classList.add('counted');
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => {
        counterObserver.observe(el);
    });
});

// ========== PARALLAX EFFECT (DISABLED) ==========
// Parallax effect removed - carousel stays normal when scrolling
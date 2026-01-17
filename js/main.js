// Main entry point - Initializes all modules

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('GTG Perfumes - All modules loaded');
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // All individual modules will initialize themselves
    // This file can be used for global initialization or shared utilities
});

// Scroll-triggered fade-in animations
function initScrollAnimations() {
    const sections = document.querySelectorAll(
        '.product-config-section, .collection-section, .stats-banner, .comparison-section'
    );
    
    if (sections.length === 0) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

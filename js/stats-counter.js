// Stats Counter Animation - Counts up from 0 when section is visible

class StatsCounter {
    constructor() {
        this.statsSection = document.querySelector('.stats-banner');
        this.statNumbers = document.querySelectorAll('.stat-number');
        this.hasAnimated = false;
        this.init();
    }
    
    init() {
        if (!this.statsSection || this.statNumbers.length === 0) return;
        
        // Use Intersection Observer to detect when section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateCounters();
                    this.hasAnimated = true;
                    // Stop observing after animation
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3 // Trigger when 30% of section is visible
        });
        
        observer.observe(this.statsSection);
    }
    
    animateCounters() {
        this.statNumbers.forEach(statEl => {
            const targetText = statEl.textContent.trim();
            // Extract number from text (e.g., "84%" -> 84)
            const match = targetText.match(/(\d+)/);
            if (!match) return;
            
            const targetValue = parseInt(match[1]);
            const suffix = targetText.replace(/\d+/, ''); // Get "%" or other suffix
            
            // Reset to 0
            statEl.textContent = `0${suffix}`;
            
            // Animate counting up
            this.countUp(statEl, 0, targetValue, suffix, 2000); // 2 second animation
        });
    }
    
    countUp(element, start, end, suffix, duration) {
        const startTime = performance.now();
        const range = end - start;
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(start + (range * easeOutQuart));
            
            element.textContent = `${currentValue}${suffix}`;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Ensure final value is exact
                element.textContent = `${end}${suffix}`;
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
}

// Initialize stats counter when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new StatsCounter();
    });
} else {
    new StatsCounter();
}

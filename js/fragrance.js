// Fragrance Selection Functionality

class FragranceSelector {
    constructor() {
        this.singleFragrances = document.querySelectorAll('input[name="scent-s"]');
        this.doubleFragrance1 = document.querySelectorAll('input[name="scent-1"]');
        this.doubleFragrance2 = document.querySelectorAll('input[name="scent-2"]');
        this.fragItems = document.querySelectorAll('.frag-item');
        
        this.init();
    }
    
    init() {
        // Single plan fragrance selection
        this.singleFragrances.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.updateFragranceVisualState(e.target);
                }
            });
        });
        
        // Double plan fragrance 1 selection
        this.doubleFragrance1.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.updateFragranceVisualState(e.target);
                }
            });
        });
        
        // Double plan fragrance 2 selection
        this.doubleFragrance2.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.updateFragranceVisualState(e.target);
                }
            });
        });
        
        // Click on frag-item label to select
        this.fragItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const radio = item.querySelector('input[type="radio"]');
                if (radio && !radio.checked) {
                    radio.checked = true;
                    radio.dispatchEvent(new Event('change'));
                }
            });
        });
        
        // Initialize visual states
        this.initializeVisualStates();
    }
    
    updateFragranceVisualState(radio) {
        const fragItem = radio.closest('.frag-item');
        if (!fragItem) return;
        
        // Remove selected state from siblings in same group
        const group = fragItem.parentElement;
        group.querySelectorAll('.frag-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        // Add selected state to selected item
        fragItem.classList.add('selected');
        
        // Animate selection - ensure image stays visible
        const img = fragItem.querySelector('img');
        if (img) {
            img.style.opacity = '1'; // Ensure image is always visible
            img.style.display = 'block'; // Ensure image is displayed
            img.style.animation = 'bottlePulse 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                img.style.animation = '';
                img.style.opacity = '1'; // Keep opacity at 1
            }, 600);
        }
    }
    
    initializeVisualStates() {
        // Set initial selected states for checked radios
        document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
            this.updateFragranceVisualState(radio);
        });
    }
    
    getSelectedFragrances() {
        const plan = window.subscriptionManager?.getSelectedPlan();
        const fragrances = {};
        
        if (plan === 'single') {
            const selected = document.querySelector('input[name="scent-s"]:checked');
            fragrances.primary = selected ? selected.value : null;
        } else if (plan === 'double') {
            const selected1 = document.querySelector('input[name="scent-1"]:checked');
            const selected2 = document.querySelector('input[name="scent-2"]:checked');
            fragrances.primary = selected1 ? selected1.value : null;
            fragrances.secondary = selected2 ? selected2.value : null;
        }
        
        return fragrances;
    }
}

// Initialize fragrance selector when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.fragranceSelector = new FragranceSelector();
    });
} else {
    window.fragranceSelector = new FragranceSelector();
}

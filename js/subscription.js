// Subscription Plan Toggle Functionality

class SubscriptionManager {
    constructor() {
        this.singlePlan = document.getElementById('single-plan');
        this.doublePlan = document.getElementById('double-plan');
        this.radioSingle = document.getElementById('radio-single');
        this.radioDouble = document.getElementById('radio-double');
        this.singleBody = this.singlePlan?.querySelector('.sub-body') || null;
        this.doubleBody = this.doublePlan?.querySelector('.sub-body') || null;
        
        // Find all subscription cards
        this.allCards = document.querySelectorAll('.sub-card');
        
        this.init();
    }
    
    init() {
        if (!this.singlePlan) return;
        
        // Radio button change handlers
        if (this.radioSingle) {
            this.radioSingle.addEventListener('change', () => {
                if (this.radioSingle.checked) {
                    this.selectPlan('single');
                }
            });
        }
        
        if (this.radioDouble) {
            this.radioDouble.addEventListener('change', () => {
                if (this.radioDouble.checked) {
                    this.selectPlan('double');
                }
            });
        }
        
        // Card click handlers (click anywhere on card to select)
        if (this.singlePlan) {
            this.singlePlan.addEventListener('click', (e) => {
                if (e.target.type !== 'radio' && e.target.tagName !== 'INPUT' && !e.target.closest('label')) {
                    if (this.radioSingle) {
                        this.radioSingle.checked = true;
                        this.selectPlan('single');
                    }
                }
            });
        }
        
        if (this.doublePlan) {
            this.doublePlan.addEventListener('click', (e) => {
                if (e.target.type !== 'radio' && e.target.tagName !== 'INPUT' && !e.target.closest('label')) {
                    if (this.radioDouble) {
                        this.radioDouble.checked = true;
                        this.selectPlan('double');
                    }
                }
            });
        }
        
        // Initialize based on checked radio
        if (this.radioSingle && this.radioSingle.checked) {
            this.selectPlan('single');
        } else if (this.radioDouble && this.radioDouble.checked) {
            this.selectPlan('double');
        }
    }
    
    selectPlan(planType) {
        // Remove active class from all cards first
        this.allCards.forEach(card => card.classList.remove('active'));
        
        if (planType === 'single') {
            // Activate single plan
            if (this.singlePlan) {
                this.singlePlan.classList.add('active');
            }
            this.setBodyOpen(this.singleBody, true);
            this.setBodyOpen(this.doubleBody, false);
            
            // Animate card selection
            if (this.singlePlan) {
                this.animateCardSelection(this.singlePlan);
            }
        } else if (planType === 'double') {
            // Activate double plan
            if (this.doublePlan) {
                this.doublePlan.classList.add('active');
            }
            this.setBodyOpen(this.singleBody, false);
            this.setBodyOpen(this.doubleBody, true);
            
            // Animate card selection
            if (this.doublePlan) {
                this.animateCardSelection(this.doublePlan);
            }
        }
    }

    setBodyOpen(bodyEl, isOpen) {
        if (!bodyEl) return;

        if (isOpen) {
            // Set max height to actual scroll height
            const scrollHeight = bodyEl.scrollHeight;
            bodyEl.style.maxHeight = scrollHeight + 'px';
            bodyEl.classList.add('open');
            
            // Use setTimeout to ensure transition works
            setTimeout(() => {
                bodyEl.style.maxHeight = 'none'; // Allow natural height after animation
            }, 400);
        } else {
            // First set to current height, then animate to 0
            bodyEl.style.maxHeight = bodyEl.scrollHeight + 'px';
            // Force reflow
            void bodyEl.offsetHeight;
            // Now animate to 0
            bodyEl.style.maxHeight = '0px';
            bodyEl.classList.remove('open');
        }
    }
    
    animateCardSelection(card) {
        card.style.transform = 'scale(1.02)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
    }
    
    getSelectedPlan() {
        if (this.radioSingle && this.radioSingle.checked) {
            return 'single';
        } else if (this.radioDouble && this.radioDouble.checked) {
            return 'double';
        }
        return null;
    }
}

// Initialize subscription manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.subscriptionManager = new SubscriptionManager();
    });
} else {
    window.subscriptionManager = new SubscriptionManager();
}

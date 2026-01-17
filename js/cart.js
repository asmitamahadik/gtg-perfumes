// Add to Cart Functionality

class CartManager {
    constructor() {
        this.cartButton = document.getElementById('cart-submit');
        this.init();
        this.updateCartLink();
    }
    
    init() {
        if (this.cartButton) {
            // Listen for changes in plan and fragrance selections
            this.setupChangeListeners();
            
            // Initial link update
            this.updateCartLink();
        }
    }
    
    setupChangeListeners() {
        // Listen to plan changes
        const planRadios = document.querySelectorAll('input[name="plan"]');
        planRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.updateCartLink();
                // Update subscription visibility
                if (window.subscriptionManager) {
                    const plan = window.subscriptionManager.getSelectedPlan();
                    window.subscriptionManager.selectPlan(plan);
                }
            });
        });
        
        // Listen to fragrance changes
        const fragranceRadios = document.querySelectorAll('input[name="scent-s"], input[name="scent-1"], input[name="scent-2"]');
        fragranceRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.updateCartLink();
            });
        });
    }
    
    updateCartLink() {
        if (!this.cartButton) return;
        
        // Get selected plan
        const plan = window.subscriptionManager?.getSelectedPlan() || 'single';
        
        // Get selected fragrances
        const fragrances = window.fragranceSelector?.getSelectedFragrances() || {};
        
        // Determine fragrance selection
        let fragrance = 'original'; // default
        if (plan === 'single') {
            fragrance = fragrances.primary || 'original';
        } else if (plan === 'double') {
            // For double, use primary fragrance
            fragrance = fragrances.primary || 'original';
        }
        
        // Create cart link based on selections (9 variations)
        // Format: /cart?plan=single&fragrance=original
        const cartLink = this.generateCartLink(plan, fragrance);
        
        // Update button href or data attribute
        if (this.cartButton.tagName === 'A') {
            this.cartButton.href = cartLink;
        } else {
            this.cartButton.dataset.cartLink = cartLink;
        }
    }
    
    generateCartLink(plan, fragrance) {
        // Generate 9 different links based on combinations
        // Plan: single, double
        // Fragrance: original, lily, rose
        // For double plan, we'll use the primary fragrance
        const baseUrl = '/cart';
        return `${baseUrl}?plan=${plan}&fragrance=${fragrance}`;
    }
    
    handleAddToCart() {
        if (!this.cartButton) return;
        
        // Get selected plan
        const plan = window.subscriptionManager?.getSelectedPlan();
        if (!plan) {
            this.showMessage('Please select a subscription plan', 'error');
            return;
        }
        
        // Get selected fragrances
        const fragrances = window.fragranceSelector?.getSelectedFragrances();
        if (!fragrances.primary) {
            this.showMessage('Please select a fragrance', 'error');
            return;
        }
        
        if (plan === 'double' && !fragrances.secondary) {
            this.showMessage('Please select both fragrances for double subscription', 'error');
            return;
        }
        
        // Get the cart link (updated based on selections)
        const cartLink = this.cartButton.dataset.cartLink || this.generateCartLink(plan, fragrances.primary);
        
        // Prepare cart data
        const cartData = {
            plan: plan,
            fragrances: fragrances,
            cartLink: cartLink,
            timestamp: new Date().toISOString()
        };
        
        // Show loading state
        this.setLoadingState(true);
        
        // Simulate API call (replace with actual API call)
        setTimeout(() => {
            // Save to localStorage (or send to API)
            this.saveToCart(cartData);
            
            // Log the cart link for debugging
            console.log('Add to Cart Link:', cartLink);
            
            // Show success message
            this.showMessage('Item added to cart successfully!', 'success');
            
            // Reset loading state
            this.setLoadingState(false);
            
            // Optional: Uncomment to navigate to cart page
            // window.location.href = cartLink;
        }, 800);
    }
    
    saveToCart(data) {
        // Get existing cart or create new array
        let cart = JSON.parse(localStorage.getItem('gtg_cart') || '[]');
        
        // Add new item
        cart.push(data);
        
        // Save back to localStorage
        localStorage.setItem('gtg_cart', JSON.stringify(cart));
        
        // Update cart count if badge exists
        this.updateCartCount(cart.length);
    }
    
    updateCartCount(count) {
        // If cart badge exists, update it
        const cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            cartBadge.textContent = count;
            cartBadge.style.display = count > 0 ? 'block' : 'none';
        }
    }
    
    setLoadingState(isLoading) {
        if (!this.cartButton) return;
        
        if (isLoading) {
            this.cartButton.classList.add('btn-loading');
            this.cartButton.disabled = true;
            const originalText = this.cartButton.textContent;
            this.cartButton.dataset.originalText = originalText;
            this.cartButton.textContent = 'Adding...';
        } else {
            this.cartButton.classList.remove('btn-loading');
            this.cartButton.disabled = false;
            this.cartButton.textContent = this.cartButton.dataset.originalText || 'Add to Cart';
        }
    }
    
    showMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessage = document.querySelector('.cart-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `cart-message ${type}`;
        messageEl.textContent = message;
        
        // Add styles
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background-color: ${type === 'success' ? '#1A4D2E' : '#d32f2f'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(messageEl);
        
        // Animate in
        setTimeout(() => {
            messageEl.style.opacity = '1';
            messageEl.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                messageEl.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize cart manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.cartManager = new CartManager();
        
        // Add click handler to button
        const cartButton = document.getElementById('cart-submit');
        if (cartButton) {
            cartButton.addEventListener('click', (e) => {
                e.preventDefault();
                window.cartManager.handleAddToCart();
            });
        }
    });
} else {
    window.cartManager = new CartManager();
    
    // Add click handler to button
    const cartButton = document.getElementById('cart-submit');
    if (cartButton) {
        cartButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.cartManager.handleAddToCart();
        });
    }
}

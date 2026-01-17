// Newsletter Form Functionality

class NewsletterForm {
    constructor() {
        this.form = document.querySelector('.newsletter-form');
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }
    
    handleSubmit() {
        const emailInput = this.form.querySelector('input[type="email"]');
        const email = emailInput?.value.trim();
        
        // Validate email
        if (!email) {
            this.showMessage('Please enter your email address', 'error');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            this.showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton?.textContent;
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';
        }
        
        // Simulate API call (replace with actual API call)
        setTimeout(() => {
            // Save to localStorage (or send to API)
            this.saveSubscription(email);
            
            // Show success message
            this.showMessage('Thank you for subscribing!', 'success');
            
            // Clear form
            if (emailInput) emailInput.value = '';
            
            // Reset button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText || 'Subscribe';
            }
        }, 800);
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    saveSubscription(email) {
        // Get existing subscriptions or create new array
        let subscriptions = JSON.parse(localStorage.getItem('gtg_newsletter') || '[]');
        
        // Add new subscription if not already exists
        if (!subscriptions.includes(email)) {
            subscriptions.push({
                email: email,
                date: new Date().toISOString()
            });
            localStorage.setItem('gtg_newsletter', JSON.stringify(subscriptions));
        }
    }
    
    showMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessage = document.querySelector('.newsletter-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `newsletter-message ${type}`;
        messageEl.textContent = message;
        
        // Add styles
        messageEl.style.cssText = `
            margin-top: 12px;
            padding: 12px;
            background-color: ${type === 'success' ? 'rgba(26, 77, 46, 0.2)' : 'rgba(211, 47, 47, 0.2)'};
            color: ${type === 'success' ? '#1A4D2E' : '#d32f2f'};
            border-radius: 4px;
            font-size: 14px;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        `;
        
        this.form.appendChild(messageEl);
        
        // Animate in
        setTimeout(() => {
            messageEl.style.opacity = '1';
            messageEl.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after 5 seconds
        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                messageEl.remove();
            }, 300);
        }, 5000);
    }
}

// Initialize newsletter form when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new NewsletterForm();
    });
} else {
    new NewsletterForm();
}

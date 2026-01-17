// Accordion Toggle Functionality

class Accordion {
    constructor() {
        this.accordionItems = document.querySelectorAll('.accordion-item');
        this.init();
    }
    
    init() {
        this.accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            if (header) {
                header.addEventListener('click', () => {
                    this.toggleItem(item);
                });
            }
        });
    }
    
    toggleItem(item) {
        const isActive = item.classList.contains('active');
        
        // Close all items (single open behavior)
        this.accordionItems.forEach(accordionItem => {
            accordionItem.classList.remove('active');
            const body = accordionItem.querySelector('.accordion-body');
            const icon = accordionItem.querySelector('.icon');
            
            if (body) {
                body.style.maxHeight = '0';
            }
            if (icon) {
                icon.textContent = '+';
            }
        });
        
        // If clicking on a closed item, open it
        if (!isActive) {
            item.classList.add('active');
            const body = item.querySelector('.accordion-body');
            const icon = item.querySelector('.icon');
            
            if (body) {
                // Set max-height to scrollHeight for smooth animation
                body.style.maxHeight = body.scrollHeight + 'px';
            }
            if (icon) {
                icon.textContent = '−';
            }
        }
    }
    
    // Optional: Allow multiple items open at once
    toggleItemMultiple(item) {
        const isActive = item.classList.contains('active');
        const body = item.querySelector('.accordion-body');
        const icon = item.querySelector('.icon');
        
        if (isActive) {
            item.classList.remove('active');
            if (body) body.style.maxHeight = '0';
            if (icon) icon.textContent = '+';
        } else {
            item.classList.add('active');
            if (body) body.style.maxHeight = body.scrollHeight + 'px';
            if (icon) icon.textContent = '−';
        }
    }
}

// Initialize accordion when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Accordion();
    });
} else {
    new Accordion();
}

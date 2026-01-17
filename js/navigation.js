// Navigation Menu Functionality

class Navigation {
    constructor() {
        this.header = document.querySelector('.main-header');
        this.navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
        this.navLinksContainer = document.getElementById('nav-links');
        this.mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        this.isMenuOpen = false;
        this.init();
    }
    
    init() {
        // Mobile menu toggle
        if (this.mobileMenuBtn && this.navLinksContainer) {
            this.mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
            
            // Close menu when clicking on a link
            this.navLinksContainer.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 767) {
                        this.closeMobileMenu();
                    }
                });
            });
            
            // Close menu when clicking overlay
            if (this.mobileMenuOverlay) {
                this.mobileMenuOverlay.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            }
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.isMenuOpen && 
                    !this.navLinksContainer.contains(e.target) && 
                    !this.mobileMenuBtn.contains(e.target) &&
                    !this.mobileMenuOverlay.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
            
            // Close menu on window resize if it becomes desktop size
            window.addEventListener('resize', () => {
                if (window.innerWidth > 767 && this.isMenuOpen) {
                    this.closeMobileMenu();
                }
            });
        }
        
        // Smooth scroll for anchor links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    e.preventDefault();
                    this.smoothScrollTo(href);
                }
            });
        });
        
        // Sticky header on scroll
        if (this.header) {
            window.addEventListener('scroll', () => {
                this.handleScroll();
            });
            
            // Initial check
            this.handleScroll();
        }
    }
    
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.classList.toggle('active', this.isMenuOpen);
        }
        
        if (this.navLinksContainer) {
            this.navLinksContainer.classList.toggle('active', this.isMenuOpen);
        }
        
        if (this.mobileMenuOverlay) {
            this.mobileMenuOverlay.classList.toggle('active', this.isMenuOpen);
        }
        
        // Prevent body scroll when menu is open
        if (this.isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    closeMobileMenu() {
        this.isMenuOpen = false;
        
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.classList.remove('active');
        }
        
        if (this.navLinksContainer) {
            this.navLinksContainer.classList.remove('active');
        }
        
        if (this.mobileMenuOverlay) {
            this.mobileMenuOverlay.classList.remove('active');
        }
        
        document.body.style.overflow = '';
    }
    
    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = this.header ? this.header.offsetHeight : 0;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    handleScroll() {
        if (!this.header) return;
        
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }
}

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Navigation();
    });
} else {
    new Navigation();
}

class ImageGallery {
    constructor() {
        this.currentIndex = 0;
        this.mainImage = document.getElementById('js-main-img');
        this.prevButton = document.getElementById('js-prev');
        this.nextButton = document.getElementById('js-next');
        this.thumbnails = document.querySelectorAll('.thumb');
        this.dots = document.querySelectorAll('.dot');
        
        this.images = [
            { main: 'Assets/bottle-pink.svg', thumb: 'Assets/t1.svg' },
            { main: 'Assets/bottle-orange.svg', thumb: 'Assets/t2.svg' },
            { main: 'Assets/bottle-pink.svg', thumb: 'Assets/t3.svg' },
            { main: 'Assets/bottle-orange.svg', thumb: 'Assets/t4.svg' }, 
            { main: 'Assets/bottle-pink.svg', thumb: 'Assets/t1.svg' },
            { main: 'Assets/bottle-orange.svg', thumb: 'Assets/t2.svg' },
            { main: 'Assets/bottle-pink.svg', thumb: 'Assets/t3.svg' },
            { main: 'Assets/bottle-orange.svg', thumb: 'Assets/t4.svg' }
        ];
        
        this.init();
    }
    
    init() {
        if (!this.mainImage) return;
        
        // Event listeners
        if (this.prevButton) {
            this.prevButton.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link/button jump
                this.showPrevious();
            });
        }
        
        if (this.nextButton) {
            this.nextButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.showNext();
            });
        }
        
        // Thumbnail clicks
        this.thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => this.goToImage(index));
        });
        
        // Dot clicks - Mapped to the main color groups
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Dot 1 -> Image 0 (Purple)
                // Dot 2 -> Image 1 (Pink)
                // Dot 3 -> Image 2 (Orange)
                this.goToImage(index);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.showPrevious();
            if (e.key === 'ArrowRight') this.showNext();
        });
        
        // Initialize first image
        this.updateGallery();
    }
    
    showPrevious() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateGallery();
    }
    
    showNext() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateGallery();
    }
    
    goToImage(index) {
        if (index >= 0 && index < this.images.length) {
            this.currentIndex = index;
            this.updateGallery();
        }
    }
    
    updateGallery() {
        // Update main image with fade effect
        if (this.mainImage) {
            const newSrc = this.images[this.currentIndex].main;
            
            // Apply fade-out
            this.mainImage.classList.add('fade-out');
            this.mainImage.classList.remove('fade-in');

            // Wait for fade-out, then swap and fade-in
            setTimeout(() => {
                this.mainImage.src = newSrc;
                this.mainImage.classList.remove('fade-out');
                this.mainImage.classList.add('fade-in');
            }, 200); // Short delay for smooth transition
        }
        
        // Update thumbnails active state
        this.thumbnails.forEach((thumb, index) => {
            if (index === this.currentIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
        
        // Update dots
        // Simplified Logic: The dots now cycle 0, 1, 2 repeatedly for the 8 images
        // This ensures a dot is always active even if you are on image 7
        const activeDotIndex = this.currentIndex % this.dots.length;
        
        this.dots.forEach((dot, index) => {
            if (index === activeDotIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// Initialize gallery when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ImageGallery();
    });
} else {
    new ImageGallery();
}
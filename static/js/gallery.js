// Gallery Lightbox Functionality
class GalleryLightbox {
    constructor() {
        this.currentIndex = 0;
        this.images = [];
        this.lightbox = null;
        this.init();
    }

    init() {
        this.createLightboxHTML();
        this.bindEvents();
        this.collectImages();
    }

    createLightboxHTML() {
        const lightboxHTML = `
            <div class="lightbox-overlay" id="lightbox">
                <div class="lightbox-container">
                    <button class="lightbox-close" id="lightbox-close">&times;</button>
                    <button class="lightbox-nav lightbox-prev" id="lightbox-prev">&#8249;</button>
                    <img class="lightbox-image" id="lightbox-image" src="" alt="">
                    <button class="lightbox-nav lightbox-next" id="lightbox-next">&#8250;</button>
                    <div class="lightbox-counter" id="lightbox-counter"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        this.lightbox = document.getElementById('lightbox');
    }

    collectImages() {
        const galleryThumbs = document.querySelectorAll('.gallery-thumb');
        this.images = Array.from(galleryThumbs).map(img => ({
            src: img.src,
            alt: img.alt || 'Gallery image'
        }));
    }

    bindEvents() {
        // Gallery thumbnail clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('gallery-thumb')) {
                e.preventDefault();
                const index = Array.from(document.querySelectorAll('.gallery-thumb')).indexOf(e.target);
                this.openLightbox(index);
            }
        });

        // Close lightbox
        document.addEventListener('click', (e) => {
            if (e.target.id === 'lightbox-close' || e.target.id === 'lightbox') {
                this.closeLightbox();
            }
        });

        // Navigation buttons
        document.addEventListener('click', (e) => {
            if (e.target.id === 'lightbox-prev') {
                this.prevImage();
            } else if (e.target.id === 'lightbox-next') {
                this.nextImage();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.prevImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });

        // Prevent body scroll when lightbox is open
        this.lightbox.addEventListener('wheel', (e) => {
            e.preventDefault();
        });
    }

    openLightbox(index) {
        this.currentIndex = index;
        this.updateLightboxContent();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.updateNavigation();
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateLightboxContent();
        this.updateNavigation();
    }

    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateLightboxContent();
        this.updateNavigation();
    }

    updateLightboxContent() {
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxCounter = document.getElementById('lightbox-counter');
        
        if (this.images[this.currentIndex]) {
            lightboxImage.src = this.images[this.currentIndex].src;
            lightboxImage.alt = this.images[this.currentIndex].alt;
            lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
        }
    }

    updateNavigation() {
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        
        // Show/hide navigation arrows based on image count
        if (this.images.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GalleryLightbox();
});

// Refresh gallery when new content is loaded (for dynamic content)
window.refreshGallery = function() {
    const existingLightbox = document.getElementById('lightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }
    new GalleryLightbox();
};
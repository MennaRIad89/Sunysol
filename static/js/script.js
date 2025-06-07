document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const closeFlashButtons = document.querySelectorAll('.close-flash');
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = document.querySelectorAll('.bar');
            if (menuToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset hamburger menu
                const bars = document.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });
    
    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Close flash messages
    closeFlashButtons.forEach(button => {
        button.addEventListener('click', () => {
            const flashMessage = button.parentElement;
            flashMessage.style.opacity = '0';
            setTimeout(() => {
                flashMessage.remove();
            }, 300);
        });
    });
    
    // Auto-hide flash messages after 5 seconds
    const flashMessages = document.querySelectorAll('.flash-message');
    if (flashMessages.length > 0) {
        setTimeout(() => {
            flashMessages.forEach(message => {
                message.style.opacity = '0';
                setTimeout(() => {
                    message.remove();
                }, 300);
            });
        }, 5000);
    }
    
    // Form validation
    const reviewForm = document.querySelector('.review-form');
    const contactForm = document.querySelector('.contact-form');
    
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const commentInput = document.getElementById('comment');
            
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                highlightError(nameInput);
                isValid = false;
            } else {
                resetError(nameInput);
            }
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                highlightError(emailInput);
                isValid = false;
            } else {
                resetError(emailInput);
            }
            
            if (commentInput.value.trim() === '') {
                highlightError(commentInput);
                isValid = false;
            } else {
                resetError(commentInput);
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const nameInput = document.getElementById('contact-name');
            const emailInput = document.getElementById('contact-email');
            const messageInput = document.getElementById('contact-message');
            
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                highlightError(nameInput);
                isValid = false;
            } else {
                resetError(nameInput);
            }
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                highlightError(emailInput);
                isValid = false;
            } else {
                resetError(emailInput);
            }
            
            if (messageInput.value.trim() === '') {
                highlightError(messageInput);
                isValid = false;
            } else {
                resetError(messageInput);
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    // Helper functions
    function highlightError(input) {
        input.style.borderColor = '#DC3545';
        input.style.boxShadow = '0 0 0 2px rgba(220, 53, 69, 0.25)';
    }
    
    function resetError(input) {
        input.style.borderColor = '';
        input.style.boxShadow = '';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Animate elements when they come into view
    document.addEventListener('DOMContentLoaded', () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Add animation classes to elements
        document.querySelectorAll('.tour-card, .review-card, .gallery-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(40px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    });
    
    // Handle window scroll for sticky navigation
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.main-nav');
        if (window.scrollY > 100) {
            nav.style.padding = '0.5rem 0';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.padding = '1rem 0';
            nav.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Add animation class to elements
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.animate').forEach(element => {
            element.classList.add('show');
        });
        
        // Tour card expand/collapse functionality
        const tourPreviewCards = document.querySelectorAll('.tour-preview-card');
    
        tourPreviewCards.forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
                    e.target.closest('a') || e.target.closest('button')) {
                    return; // Let buttons/links work normally
                }
    
                // Lock scroll position before any DOM changes
                const currentScrollY = window.scrollY;
                
                // Temporarily disable smooth scroll during accordion operations
                document.documentElement.classList.add('no-smooth-scroll');
    
                const isExpanded = this.classList.contains('expanded');
    
                // Only collapse others if clicked card is not already expanded
                tourPreviewCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.classList.remove('expanded');
                        const otherDetails = document.getElementById(otherCard.getAttribute('data-tour') + '-details');
                        if (otherDetails) {
                            otherDetails.classList.remove('expanded');
                        }
                    }
                });
    
                // Toggle clicked card
                if (!isExpanded) {
                    this.classList.add('expanded');
                    const detailsElement = document.getElementById(this.getAttribute('data-tour') + '-details');
                    if (detailsElement) {
                        detailsElement.classList.add('expanded');
                    }
                } else {
                    this.classList.remove('expanded');
                    const detailsElement = document.getElementById(this.getAttribute('data-tour') + '-details');
                    if (detailsElement) {
                        detailsElement.classList.remove('expanded');
                    }
                }
    
                // Force scroll position back to where it was
                window.scrollTo(0, currentScrollY);
    
                // Re-enable smooth scrolling after a brief timeout
                setTimeout(() => {
                    document.documentElement.classList.remove('no-smooth-scroll');
                }, 100);
            });
        });
        
        // Book This Tour button functionality
        document.querySelectorAll('.book-tour-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    });

    // Reviews Carousel Functionality
    const reviewsCarousel = document.querySelector('.reviews-carousel');
    const reviewCards = document.querySelectorAll('.review-card-mini');
    const prevBtn = document.getElementById('reviews-prev');
    const nextBtn = document.getElementById('reviews-next');
    
    if (reviewsCarousel && reviewCards.length > 0) {
        let currentReview = 0;
        
        function showReview(index) {
            reviewCards.forEach((card, i) => {
                card.classList.toggle('active', i === index);
            });
        }
        
        function nextReview() {
            currentReview = (currentReview + 1) % reviewCards.length;
            showReview(currentReview);
        }
        
        function prevReview() {
            currentReview = (currentReview - 1 + reviewCards.length) % reviewCards.length;
            showReview(currentReview);
        }
        
        if (nextBtn) nextBtn.addEventListener('click', nextReview);
        if (prevBtn) prevBtn.addEventListener('click', prevReview);
        
        // Auto-advance reviews every 5 seconds
        setInterval(nextReview, 5000);
    }
    
    // File input functionality for review photos
    const fileInput = document.getElementById('review_photos');
    const fileLabel = document.querySelector('.file-input-label span');
    
    if (fileInput && fileLabel) {
        fileInput.addEventListener('change', function() {
            const fileCount = this.files.length;
            if (fileCount > 0) {
                fileLabel.textContent = `${fileCount} photo${fileCount > 1 ? 's' : ''} selected`;
            } else {
                fileLabel.textContent = 'Choose photos to share';
            }
        });
    }

    // Reviews filtering functionality for all-reviews page
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allReviewCards = document.querySelectorAll('.review-card-full');

    if (filterButtons.length > 0 && allReviewCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                allReviewCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});
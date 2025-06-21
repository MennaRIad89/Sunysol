// Booking Modal System
class BookingModal {
    constructor() {
        this.modal = null;
        this.currentTour = null;
        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        const modalHTML = `
            <div id="bookingModal" class="booking-modal">
                <div class="booking-modal-content">
                    <div class="booking-modal-header">
                        <button class="booking-close" type="button">
                            <i class="fas fa-times"></i>
                        </button>
                        <h3 id="modalTourTitle">Book Your Tour</h3>
                        <div class="tour-info" id="modalTourInfo"></div>
                    </div>
                    <div class="booking-modal-body">
                        <form id="bookingForm">
                            <div class="booking-form-group">
                                <label for="bookingName" class="required">Full Name</label>
                                <input type="text" id="bookingName" name="name" required>
                            </div>
                            
                            <div class="booking-form-row">
                                <div class="booking-form-group">
                                    <label for="bookingEmail" class="required">Email Address</label>
                                    <input type="email" id="bookingEmail" name="email" required>
                                </div>
                                <div class="booking-form-group">
                                    <label for="bookingPhone" class="required">Phone Number</label>
                                    <input type="tel" id="bookingPhone" name="phone" required>
                                </div>
                            </div>

                            <div class="booking-form-row">
                                <div class="booking-form-group">
                                    <label for="bookingDate">Preferred Date</label>
                                    <input type="date" id="bookingDate" name="date" min="">
                                </div>
                                <div class="booking-form-group">
                                    <label for="bookingGroupSize" class="required">Group Size</label>
                                    <select id="bookingGroupSize" name="groupSize" required>
                                        <option value="">Select group size</option>
                                        <option value="1">1 Person</option>
                                        <option value="2">2 People</option>
                                        <option value="3">3 People</option>
                                        <option value="4">4 People</option>
                                        <option value="5">5 People</option>
                                        <option value="6">6 People</option>
                                        <option value="7">7 People</option>
                                        <option value="8">8 People</option>
                                        <option value="9+">9+ People</option>
                                    </select>
                                </div>
                            </div>

                            <div class="booking-form-group">
                                <label for="bookingType">Tour Type</label>
                                <select id="bookingType" name="tourType">
                                    <option value="private">Private Tour (Recommended)</option>
                                    <option value="group">Join Group Tour</option>
                                    <option value="vip">VIP Experience</option>
                                </select>
                            </div>

                            <div class="booking-form-group">
                                <label for="bookingRequests">Special Requests or Questions</label>
                                <textarea id="bookingRequests" name="requests" placeholder="Any special requirements, dietary restrictions, accessibility needs, or questions about the tour..."></textarea>
                            </div>

                            <div class="booking-form-note">
                                <i class="fas fa-info-circle"></i>
                                <strong>Note:</strong> This is not a confirmed booking. We'll contact you within 2 hours to confirm availability, provide exact pricing, and arrange payment details.
                            </div>

                            <div class="booking-actions">
                                <button type="button" class="booking-btn booking-btn-whatsapp" id="bookingWhatsApp">
                                    <i class="fab fa-whatsapp"></i>
                                    Send via WhatsApp
                                </button>
                                <button type="submit" class="booking-btn booking-btn-email">
                                    <i class="fas fa-envelope"></i>
                                    Send via Email
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('bookingModal');
        
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('bookingDate').setAttribute('min', today);
    }

    bindEvents() {
        // Book tour button clicks
        document.addEventListener('click', (e) => {
            console.log('Click detected on:', e.target);
            if (e.target.classList.contains('book-tour-btn')) {
                console.log('Book tour button clicked!');
                e.preventDefault();
                const tourCard = e.target.closest('.tour-preview-card');
                if (!tourCard) {
                    console.error('Tour card not found');
                    return;
                }
                const tourTitle = tourCard.querySelector('h3').textContent;
                const tourDescription = tourCard.querySelector('p').textContent;
                console.log('Opening modal for:', tourTitle);
                this.openModal(tourTitle, tourDescription);
            }
        });

        // Close modal events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('booking-close') || 
                (e.target.classList.contains('booking-modal') && e.target === this.modal)) {
                this.closeModal();
            }
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        // WhatsApp button
        document.addEventListener('click', (e) => {
            if (e.target.closest('#bookingWhatsApp')) {
                e.preventDefault();
                this.sendViaWhatsApp();
            }
        });

        // Email form submission
        document.getElementById('bookingForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendViaEmail();
        });
    }

    openModal(tourTitle, tourDescription) {
        this.currentTour = { title: tourTitle, description: tourDescription };
        
        document.getElementById('modalTourTitle').textContent = tourTitle;
        document.getElementById('modalTourInfo').textContent = tourDescription.substring(0, 100) + '...';
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            document.getElementById('bookingName').focus();
        }, 300);
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.resetForm();
    }

    resetForm() {
        document.getElementById('bookingForm').reset();
    }

    getFormData() {
        const form = document.getElementById('bookingForm');
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }

    validateForm() {
        const data = this.getFormData();
        const required = ['name', 'email', 'phone', 'groupSize'];
        
        for (let field of required) {
            if (!data[field] || data[field].trim() === '') {
                document.getElementById(`booking${field.charAt(0).toUpperCase() + field.slice(1)}`).focus();
                return false;
            }
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            document.getElementById('bookingEmail').focus();
            alert('Please enter a valid email address.');
            return false;
        }
        
        return true;
    }

    sendViaWhatsApp() {
        if (!this.validateForm()) return;
        
        const data = this.getFormData();
        const whatsappNumber = '971564649609'; // Your WhatsApp number
        
        let message = `🌟 *Sun y Sol Tour Booking Request* 🌟\n\n`;
        message += `*Tour:* ${this.currentTour.title}\n\n`;
        message += `*Customer Details:*\n`;
        message += `👤 Name: ${data.name}\n`;
        message += `📧 Email: ${data.email}\n`;
        message += `📱 Phone: ${data.phone}\n\n`;
        message += `*Tour Details:*\n`;
        message += `📅 Preferred Date: ${data.date || 'Flexible'}\n`;
        message += `👥 Group Size: ${data.groupSize}\n`;
        message += `🎯 Tour Type: ${data.tourType || 'Private Tour'}\n\n`;
        
        if (data.requests && data.requests.trim()) {
            message += `*Special Requests:*\n${data.requests}\n\n`;
        }
        
        message += `Please confirm availability and send pricing details. Thank you! 🙏`;
        
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
        
        this.showSuccessMessage('WhatsApp');
    }

    sendViaEmail() {
        if (!this.validateForm()) return;
        
        const data = this.getFormData();
        const submitBtn = document.querySelector('.booking-btn-email');
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Prepare email data
        const emailData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            tour_name: this.currentTour.title,
            tour_date: data.date || 'Flexible',
            group_size: data.groupSize,
            tour_type: data.tourType || 'Private Tour',
            special_requests: data.requests || 'None',
            message_type: 'tour_booking'
        };
        
        // Send to your contact form endpoint
        fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(emailData)
        })
        .then(response => response.json())
        .then(result => {
            this.showSuccessMessage('Email');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Sorry, there was an error sending your booking request. Please try WhatsApp or call us directly.');
        })
        .finally(() => {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-envelope"></i> Send via Email';
        });
    }

    showSuccessMessage(method) {
        const modalBody = this.modal.querySelector('.booking-modal-body');
        modalBody.innerHTML = `
            <div class="booking-success">
                <div class="booking-success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h4>Booking Request Sent!</h4>
                <p>Thank you for your interest in <strong>${this.currentTour.title}</strong>. We've received your booking request via ${method} and will contact you within 2 hours to confirm availability and provide pricing details.</p>
                <div class="booking-actions">
                    <button type="button" class="booking-btn booking-btn-email" onclick="bookingModal.closeModal()">
                        <i class="fas fa-check"></i>
                        Close
                    </button>
                </div>
            </div>
        `;
    }
}

// Initialize booking modal when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing booking modal...');
    window.bookingModal = new BookingModal();
    console.log('Booking modal initialized');
});
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
                                    <div class="phone-input-group">
                                        <select id="bookingCountryCode" name="countryCode" required>
                                            <option value="+971">🇦🇪 +971</option>
                                            <option value="+1">🇺🇸 +1</option>
                                            <option value="+44">🇬🇧 +44</option>
                                            <option value="+33">🇫🇷 +33</option>
                                            <option value="+49">🇩🇪 +49</option>
                                            <option value="+39">🇮🇹 +39</option>
                                            <option value="+34">🇪🇸 +34</option>
                                            <option value="+31">🇳🇱 +31</option>
                                            <option value="+41">🇨🇭 +41</option>
                                            <option value="+43">🇦🇹 +43</option>
                                            <option value="+32">🇧🇪 +32</option>
                                            <option value="+45">🇩🇰 +45</option>
                                            <option value="+46">🇸🇪 +46</option>
                                            <option value="+47">🇳🇴 +47</option>
                                            <option value="+358">🇫🇮 +358</option>
                                            <option value="+351">🇵🇹 +351</option>
                                            <option value="+30">🇬🇷 +30</option>
                                            <option value="+48">🇵🇱 +48</option>
                                            <option value="+420">🇨🇿 +420</option>
                                            <option value="+36">🇭🇺 +36</option>
                                            <option value="+385">🇭🇷 +385</option>
                                            <option value="+386">🇸🇮 +386</option>
                                            <option value="+421">🇸🇰 +421</option>
                                            <option value="+372">🇪🇪 +372</option>
                                            <option value="+371">🇱🇻 +371</option>
                                            <option value="+370">🇱🇹 +370</option>
                                            <option value="+7">🇷🇺 +7</option>
                                            <option value="+90">🇹🇷 +90</option>
                                            <option value="+20">🇪🇬 +20</option>
                                            <option value="+966">🇸🇦 +966</option>
                                            <option value="+962">🇯🇴 +962</option>
                                            <option value="+961">🇱🇧 +961</option>
                                            <option value="+965">🇰🇼 +965</option>
                                            <option value="+973">🇧🇭 +973</option>
                                            <option value="+974">🇶🇦 +974</option>
                                            <option value="+968">🇴🇲 +968</option>
                                            <option value="+91">🇮🇳 +91</option>
                                            <option value="+92">🇵🇰 +92</option>
                                            <option value="+880">🇧🇩 +880</option>
                                            <option value="+94">🇱🇰 +94</option>
                                            <option value="+86">🇨🇳 +86</option>
                                            <option value="+81">🇯🇵 +81</option>
                                            <option value="+82">🇰🇷 +82</option>
                                            <option value="+65">🇸🇬 +65</option>
                                            <option value="+60">🇲🇾 +60</option>
                                            <option value="+66">🇹🇭 +66</option>
                                            <option value="+84">🇻🇳 +84</option>
                                            <option value="+63">🇵🇭 +63</option>
                                            <option value="+62">🇮🇩 +62</option>
                                            <option value="+61">🇦🇺 +61</option>
                                            <option value="+64">🇳🇿 +64</option>
                                            <option value="+27">🇿🇦 +27</option>
                                            <option value="+55">🇧🇷 +55</option>
                                            <option value="+54">🇦🇷 +54</option>
                                            <option value="+56">🇨🇱 +56</option>
                                            <option value="+57">🇨🇴 +57</option>
                                            <option value="+51">🇵🇪 +51</option>
                                            <option value="+52">🇲🇽 +52</option>
                                            <option value="+1">🇨🇦 +1</option>
                                        </select>
                                        <input type="tel" id="bookingPhone" name="phone" placeholder="123456789" required>
                                    </div>
                                </div>
                            </div>

                            <div class="booking-form-row">
                                <div class="booking-form-group">
                                    <label for="bookingDate">Preferred Date</label>
                                    <input type="date" id="bookingDate" name="date" min="" placeholder="Select your preferred tour date">
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
                
                // Find the tour card - button is in tour-details, need to find the associated preview card
                const tourDetails = e.target.closest('.tour-details');
                let tourCard = null;
                let tourTitle = '';
                let tourDescription = '';
                
                if (tourDetails) {
                    // Get the ID from tour-details (e.g., "modern-details")
                    const detailsId = tourDetails.id;
                    const tourType = detailsId.replace('-details', '');
                    
                    // Find the corresponding tour preview card
                    tourCard = document.querySelector(`.tour-preview-card[data-tour="${tourType}"]`);
                }
                
                if (!tourCard) {
                    console.error('Tour card not found, trying fallback method');
                    // Fallback: try to find any tour card near the button
                    tourCard = e.target.closest('.tour-section').querySelector('.tour-preview-card');
                }
                
                if (!tourCard) {
                    console.error('Still no tour card found');
                    return;
                }
                
                tourTitle = tourCard.querySelector('h3').textContent;
                tourDescription = tourCard.querySelector('p').textContent;
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
        // Delay form reset to allow for smooth closing animation
        setTimeout(() => {
            this.resetForm();
        }, 300);
    }

    resetForm() {
        const form = document.getElementById('bookingForm');
        if (form) {
            form.reset();
        }
        
        // Reset modal body to original form
        const modalBody = this.modal.querySelector('.booking-modal-body');
        if (modalBody && !modalBody.querySelector('#bookingForm')) {
            this.createModalForm();
        }
    }
    
    createModalForm() {
        const modalBody = this.modal.querySelector('.booking-modal-body');
        modalBody.innerHTML = `
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
                        <div class="phone-input-group">
                            <select id="bookingCountryCode" name="countryCode" required>
                                <option value="+971">🇦🇪 +971</option>
                                <option value="+1">🇺🇸 +1</option>
                                <option value="+44">🇬🇧 +44</option>
                                <option value="+33">🇫🇷 +33</option>
                                <option value="+49">🇩🇪 +49</option>
                                <option value="+39">🇮🇹 +39</option>
                                <option value="+34">🇪🇸 +34</option>
                                <option value="+31">🇳🇱 +31</option>
                                <option value="+41">🇨🇭 +41</option>
                                <option value="+43">🇦🇹 +43</option>
                                <option value="+32">🇧🇪 +32</option>
                                <option value="+45">🇩🇰 +45</option>
                                <option value="+46">🇸🇪 +46</option>
                                <option value="+47">🇳🇴 +47</option>
                                <option value="+358">🇫🇮 +358</option>
                                <option value="+351">🇵🇹 +351</option>
                                <option value="+30">🇬🇷 +30</option>
                                <option value="+48">🇵🇱 +48</option>
                                <option value="+420">🇨🇿 +420</option>
                                <option value="+36">🇭🇺 +36</option>
                                <option value="+385">🇭🇷 +385</option>
                                <option value="+386">🇸🇮 +386</option>
                                <option value="+421">🇸🇰 +421</option>
                                <option value="+372">🇪🇪 +372</option>
                                <option value="+371">🇱🇻 +371</option>
                                <option value="+370">🇱🇹 +370</option>
                                <option value="+7">🇷🇺 +7</option>
                                <option value="+90">🇹🇷 +90</option>
                                <option value="+20">🇪🇬 +20</option>
                                <option value="+966">🇸🇦 +966</option>
                                <option value="+962">🇯🇴 +962</option>
                                <option value="+961">🇱🇧 +961</option>
                                <option value="+965">🇰🇼 +965</option>
                                <option value="+973">🇧🇭 +973</option>
                                <option value="+974">🇶🇦 +974</option>
                                <option value="+968">🇴🇲 +968</option>
                                <option value="+91">🇮🇳 +91</option>
                                <option value="+92">🇵🇰 +92</option>
                                <option value="+880">🇧🇩 +880</option>
                                <option value="+94">🇱🇰 +94</option>
                                <option value="+86">🇨🇳 +86</option>
                                <option value="+81">🇯🇵 +81</option>
                                <option value="+82">🇰🇷 +82</option>
                                <option value="+65">🇸🇬 +65</option>
                                <option value="+60">🇲🇾 +60</option>
                                <option value="+66">🇹🇭 +66</option>
                                <option value="+84">🇻🇳 +84</option>
                                <option value="+63">🇵🇭 +63</option>
                                <option value="+62">🇮🇩 +62</option>
                                <option value="+61">🇦🇺 +61</option>
                                <option value="+64">🇳🇿 +64</option>
                                <option value="+27">🇿🇦 +27</option>
                                <option value="+55">🇧🇷 +55</option>
                                <option value="+54">🇦🇷 +54</option>
                                <option value="+56">🇨🇱 +56</option>
                                <option value="+57">🇨🇴 +57</option>
                                <option value="+51">🇵🇪 +51</option>
                                <option value="+52">🇲🇽 +52</option>
                                <option value="+1">🇨🇦 +1</option>
                            </select>
                            <input type="tel" id="bookingPhone" name="phone" placeholder="123456789" required>
                        </div>
                    </div>
                </div>

                <div class="booking-form-row">
                    <div class="booking-form-group">
                        <label for="bookingDate">Preferred Date</label>
                        <input type="date" id="bookingDate" name="date" min="" placeholder="Select your preferred tour date">
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
        `;
        
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        const dateInput = modalBody.querySelector('#bookingDate');
        if (dateInput) {
            dateInput.setAttribute('min', today);
        }
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
        
        // Get phone number with country code
        const countryCode = document.getElementById('bookingCountryCode').value;
        const phoneNumber = document.getElementById('bookingPhone').value;
        const fullPhone = countryCode + phoneNumber;
        
        let message = `🌟 *Sun y Sol Tour Booking Request* 🌟\n\n`;
        message += `*Tour:* ${this.currentTour.title}\n\n`;
        message += `*Customer Details:*\n`;
        message += `👤 Name: ${data.name}\n`;
        message += `📧 Email: ${data.email}\n`;
        message += `📱 Phone: ${fullPhone}\n\n`;
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
        
        // Auto-close after 3 seconds to allow multiple bookings
        setTimeout(() => {
            this.closeModal();
        }, 3000);
    }
}

// Initialize booking modal when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing booking modal...');
    window.bookingModal = new BookingModal();
    console.log('Booking modal initialized');
});
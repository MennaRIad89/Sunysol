// Booking Modal System
class BookingModal {
    constructor() {
        this.modal = null;
        this.currentTour = null;
        this.init();
    }

    getTranslation(key, fallback) {
        if (window.translations && window.translations[document.documentElement.lang]) {
            return window.translations[document.documentElement.lang][key] || fallback;
        }
        return fallback;
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
                            
                            <div class="booking-form-group">
                                <label for="bookingEmail" class="required">Email Address</label>
                                <input type="email" id="bookingEmail" name="email" required>
                            </div>
                            
                            <div class="booking-form-group">
                                <label for="bookingPhone" class="required">Phone Number</label>
                                <div class="phone-input-group">
                                    <div class="custom-country-dropdown">
                                        <div class="country-dropdown-selected" id="countryDropdownSelected">
                                            <span class="flag">🇦🇪</span>
                                            <span class="country-text">United Arab Emirates (+971)</span>
                                            <i class="fas fa-chevron-down"></i>
                                        </div>
                                        <div class="country-dropdown-list" id="countryDropdownList">
                                            <div class="country-search-box">
                                                <input type="text" placeholder="Search country..." id="countrySearchInput">
                                            </div>
                                            <div class="country-options" id="countryOptions">
                                                <div class="country-option" data-value="+971" data-country="United Arab Emirates">
                                                    <span class="flag">🇦🇪</span>
                                                    <span class="country-text">United Arab Emirates (+971)</span>
                                                </div>
                                                <div class="country-option" data-value="+1" data-country="United States">
                                                    <span class="flag">🇺🇸</span>
                                                    <span class="country-text">United States (+1)</span>
                                                </div>
                                                <div class="country-option" data-value="+44" data-country="United Kingdom">
                                                    <span class="flag">🇬🇧</span>
                                                    <span class="country-text">United Kingdom (+44)</span>
                                                </div>
                                                <div class="country-option" data-value="+33" data-country="France">
                                                    <span class="flag">🇫🇷</span>
                                                    <span class="country-text">France (+33)</span>
                                                </div>
                                                <div class="country-option" data-value="+49" data-country="Germany">
                                                    <span class="flag">🇩🇪</span>
                                                    <span class="country-text">Germany (+49)</span>
                                                </div>
                                                <div class="country-option" data-value="+39" data-country="Italy">
                                                    <span class="flag">🇮🇹</span>
                                                    <span class="country-text">Italy (+39)</span>
                                                </div>
                                                <div class="country-option" data-value="+34" data-country="Spain">
                                                    <span class="flag">🇪🇸</span>
                                                    <span class="country-text">Spain (+34)</span>
                                                </div>
                                                <div class="country-option" data-value="+31" data-country="Netherlands">
                                                    <span class="flag">🇳🇱</span>
                                                    <span class="country-text">Netherlands (+31)</span>
                                                </div>
                                                <div class="country-option" data-value="+41" data-country="Switzerland">
                                                    <span class="flag">🇨🇭</span>
                                                    <span class="country-text">Switzerland (+41)</span>
                                                </div>
                                                <div class="country-option" data-value="+43" data-country="Austria">
                                                    <span class="flag">🇦🇹</span>
                                                    <span class="country-text">Austria (+43)</span>
                                                </div>
                                                <div class="country-option" data-value="+32" data-country="Belgium">
                                                    <span class="flag">🇧🇪</span>
                                                    <span class="country-text">Belgium (+32)</span>
                                                </div>
                                                <div class="country-option" data-value="+45" data-country="Denmark">
                                                    <span class="flag">🇩🇰</span>
                                                    <span class="country-text">Denmark (+45)</span>
                                                </div>
                                                <div class="country-option" data-value="+46" data-country="Sweden">
                                                    <span class="flag">🇸🇪</span>
                                                    <span class="country-text">Sweden (+46)</span>
                                                </div>
                                                <div class="country-option" data-value="+47" data-country="Norway">
                                                    <span class="flag">🇳🇴</span>
                                                    <span class="country-text">Norway (+47)</span>
                                                </div>
                                                <div class="country-option" data-value="+358" data-country="Finland">
                                                    <span class="flag">🇫🇮</span>
                                                    <span class="country-text">Finland (+358)</span>
                                                </div>
                                                <div class="country-option" data-value="+351" data-country="Portugal">
                                                    <span class="flag">🇵🇹</span>
                                                    <span class="country-text">Portugal (+351)</span>
                                                </div>
                                                <div class="country-option" data-value="+30" data-country="Greece">
                                                    <span class="flag">🇬🇷</span>
                                                    <span class="country-text">Greece (+30)</span>
                                                </div>
                                                <div class="country-option" data-value="+48" data-country="Poland">
                                                    <span class="flag">🇵🇱</span>
                                                    <span class="country-text">Poland (+48)</span>
                                                </div>
                                                <div class="country-option" data-value="+420" data-country="Czech Republic">
                                                    <span class="flag">🇨🇿</span>
                                                    <span class="country-text">Czech Republic (+420)</span>
                                                </div>
                                                <div class="country-option" data-value="+36" data-country="Hungary">
                                                    <span class="flag">🇭🇺</span>
                                                    <span class="country-text">Hungary (+36)</span>
                                                </div>
                                                <div class="country-option" data-value="+385" data-country="Croatia">
                                                    <span class="flag">🇭🇷</span>
                                                    <span class="country-text">Croatia (+385)</span>
                                                </div>
                                                <div class="country-option" data-value="+386" data-country="Slovenia">
                                                    <span class="flag">🇸🇮</span>
                                                    <span class="country-text">Slovenia (+386)</span>
                                                </div>
                                                <div class="country-option" data-value="+421" data-country="Slovakia">
                                                    <span class="flag">🇸🇰</span>
                                                    <span class="country-text">Slovakia (+421)</span>
                                                </div>
                                                <div class="country-option" data-value="+372" data-country="Estonia">
                                                    <span class="flag">🇪🇪</span>
                                                    <span class="country-text">Estonia (+372)</span>
                                                </div>
                                                <div class="country-option" data-value="+371" data-country="Latvia">
                                                    <span class="flag">🇱🇻</span>
                                                    <span class="country-text">Latvia (+371)</span>
                                                </div>
                                                <div class="country-option" data-value="+370" data-country="Lithuania">
                                                    <span class="flag">🇱🇹</span>
                                                    <span class="country-text">Lithuania (+370)</span>
                                                </div>
                                                <div class="country-option" data-value="+7" data-country="Russia">
                                                    <span class="flag">🇷🇺</span>
                                                    <span class="country-text">Russia (+7)</span>
                                                </div>
                                                <div class="country-option" data-value="+90" data-country="Turkey">
                                                    <span class="flag">🇹🇷</span>
                                                    <span class="country-text">Turkey (+90)</span>
                                                </div>
                                                <div class="country-option" data-value="+20" data-country="Egypt">
                                                    <span class="flag">🇪🇬</span>
                                                    <span class="country-text">Egypt (+20)</span>
                                                </div>
                                                <div class="country-option" data-value="+966" data-country="Saudi Arabia">
                                                    <span class="flag">🇸🇦</span>
                                                    <span class="country-text">Saudi Arabia (+966)</span>
                                                </div>
                                                <div class="country-option" data-value="+962" data-country="Jordan">
                                                    <span class="flag">🇯🇴</span>
                                                    <span class="country-text">Jordan (+962)</span>
                                                </div>
                                                <div class="country-option" data-value="+961" data-country="Lebanon">
                                                    <span class="flag">🇱🇧</span>
                                                    <span class="country-text">Lebanon (+961)</span>
                                                </div>
                                                <div class="country-option" data-value="+965" data-country="Kuwait">
                                                    <span class="flag">🇰🇼</span>
                                                    <span class="country-text">Kuwait (+965)</span>
                                                </div>
                                                <div class="country-option" data-value="+973" data-country="Bahrain">
                                                    <span class="flag">🇧🇭</span>
                                                    <span class="country-text">Bahrain (+973)</span>
                                                </div>
                                                <div class="country-option" data-value="+974" data-country="Qatar">
                                                    <span class="flag">🇶🇦</span>
                                                    <span class="country-text">Qatar (+974)</span>
                                                </div>
                                                <div class="country-option" data-value="+968" data-country="Oman">
                                                    <span class="flag">🇴🇲</span>
                                                    <span class="country-text">Oman (+968)</span>
                                                </div>
                                                <div class="country-option" data-value="+91" data-country="India">
                                                    <span class="flag">🇮🇳</span>
                                                    <span class="country-text">India (+91)</span>
                                                </div>
                                                <div class="country-option" data-value="+92" data-country="Pakistan">
                                                    <span class="flag">🇵🇰</span>
                                                    <span class="country-text">Pakistan (+92)</span>
                                                </div>
                                                <div class="country-option" data-value="+880" data-country="Bangladesh">
                                                    <span class="flag">🇧🇩</span>
                                                    <span class="country-text">Bangladesh (+880)</span>
                                                </div>
                                                <div class="country-option" data-value="+94" data-country="Sri Lanka">
                                                    <span class="flag">🇱🇰</span>
                                                    <span class="country-text">Sri Lanka (+94)</span>
                                                </div>
                                                <div class="country-option" data-value="+86" data-country="China">
                                                    <span class="flag">🇨🇳</span>
                                                    <span class="country-text">China (+86)</span>
                                                </div>
                                                <div class="country-option" data-value="+81" data-country="Japan">
                                                    <span class="flag">🇯🇵</span>
                                                    <span class="country-text">Japan (+81)</span>
                                                </div>
                                                <div class="country-option" data-value="+82" data-country="South Korea">
                                                    <span class="flag">🇰🇷</span>
                                                    <span class="country-text">South Korea (+82)</span>
                                                </div>
                                                <div class="country-option" data-value="+65" data-country="Singapore">
                                                    <span class="flag">🇸🇬</span>
                                                    <span class="country-text">Singapore (+65)</span>
                                                </div>
                                                <div class="country-option" data-value="+60" data-country="Malaysia">
                                                    <span class="flag">🇲🇾</span>
                                                    <span class="country-text">Malaysia (+60)</span>
                                                </div>
                                                <div class="country-option" data-value="+66" data-country="Thailand">
                                                    <span class="flag">🇹🇭</span>
                                                    <span class="country-text">Thailand (+66)</span>
                                                </div>
                                                <div class="country-option" data-value="+84" data-country="Vietnam">
                                                    <span class="flag">🇻🇳</span>
                                                    <span class="country-text">Vietnam (+84)</span>
                                                </div>
                                                <div class="country-option" data-value="+63" data-country="Philippines">
                                                    <span class="flag">🇵🇭</span>
                                                    <span class="country-text">Philippines (+63)</span>
                                                </div>
                                                <div class="country-option" data-value="+62" data-country="Indonesia">
                                                    <span class="flag">🇮🇩</span>
                                                    <span class="country-text">Indonesia (+62)</span>
                                                </div>
                                                <div class="country-option" data-value="+61" data-country="Australia">
                                                    <span class="flag">🇦🇺</span>
                                                    <span class="country-text">Australia (+61)</span>
                                                </div>
                                                <div class="country-option" data-value="+64" data-country="New Zealand">
                                                    <span class="flag">🇳🇿</span>
                                                    <span class="country-text">New Zealand (+64)</span>
                                                </div>
                                                <div class="country-option" data-value="+27" data-country="South Africa">
                                                    <span class="flag">🇿🇦</span>
                                                    <span class="country-text">South Africa (+27)</span>
                                                </div>
                                                <div class="country-option" data-value="+55" data-country="Brazil">
                                                    <span class="flag">🇧🇷</span>
                                                    <span class="country-text">Brazil (+55)</span>
                                                </div>
                                                <div class="country-option" data-value="+54" data-country="Argentina">
                                                    <span class="flag">🇦🇷</span>
                                                    <span class="country-text">Argentina (+54)</span>
                                                </div>
                                                <div class="country-option" data-value="+56" data-country="Chile">
                                                    <span class="flag">🇨🇱</span>
                                                    <span class="country-text">Chile (+56)</span>
                                                </div>
                                                <div class="country-option" data-value="+57" data-country="Colombia">
                                                    <span class="flag">🇨🇴</span>
                                                    <span class="country-text">Colombia (+57)</span>
                                                </div>
                                                <div class="country-option" data-value="+51" data-country="Peru">
                                                    <span class="flag">🇵🇪</span>
                                                    <span class="country-text">Peru (+51)</span>
                                                </div>
                                                <div class="country-option" data-value="+52" data-country="Mexico">
                                                    <span class="flag">🇲🇽</span>
                                                    <span class="country-text">Mexico (+52)</span>
                                                </div>
                                                <div class="country-option" data-value="+1" data-country="Canada">
                                                    <span class="flag">🇨🇦</span>
                                                    <span class="country-text">Canada (+1)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="hidden" id="bookingCountryCode" name="countryCode" value="+971" required>
                                    </div>
                                    <input type="tel" id="bookingPhone" name="phone" placeholder="123456789" required>
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
                                <strong>Note:</strong> This is not a confirmed booking. We'll contact you within 24 hours to confirm availability, provide exact pricing, and arrange payment details.
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
        
        // Update labels with translations after modal is created
        this.updateLabelsWithTranslations();
        
        // Initialize country search functionality
        this.initializeCountrySearch();
    }

    updateLabelsWithTranslations() {
        // Update all form labels with appropriate translations
        const labelUpdates = [
            { selector: 'label[for="bookingName"]', key: 'booking_name', fallback: 'Full Name' },
            { selector: 'label[for="bookingEmail"]', key: 'booking_email', fallback: 'Email Address' },
            { selector: 'label[for="bookingPhone"]', key: 'booking_phone', fallback: 'Phone Number' },
            { selector: 'label[for="bookingDate"]', key: 'booking_date', fallback: 'Preferred Date' },
            { selector: 'label[for="bookingGroupSize"]', key: 'booking_group_size', fallback: 'Group Size' },
            { selector: 'label[for="bookingType"]', key: 'booking_tour_type', fallback: 'Tour Type' },
            { selector: 'label[for="bookingRequests"]', key: 'booking_requests', fallback: 'Special Requests or Questions' }
        ];

        labelUpdates.forEach(update => {
            const element = document.querySelector(update.selector);
            if (element) {
                element.textContent = this.getTranslation(update.key, update.fallback);
            }
        });

        // No search input to update anymore

        const requestsTextarea = document.querySelector('#bookingRequests');
        if (requestsTextarea) {
            requestsTextarea.placeholder = this.getTranslation('booking_requests_placeholder', 'Any special requirements, dietary restrictions, accessibility needs, or questions about the tour...');
        }

        // Update select options
        const groupSizeSelect = document.querySelector('#bookingGroupSize');
        if (groupSizeSelect && groupSizeSelect.options[0]) {
            groupSizeSelect.options[0].textContent = this.getTranslation('select_group_size', 'Select group size');
        }

        // Update button text
        const whatsappBtn = document.querySelector('#bookingWhatsApp');
        if (whatsappBtn) {
            whatsappBtn.innerHTML = `<i class="fab fa-whatsapp"></i> ${this.getTranslation('booking_whatsapp', 'Send via WhatsApp')}`;
        }

        const emailBtn = document.querySelector('.booking-btn-email');
        if (emailBtn) {
            emailBtn.innerHTML = `<i class="fas fa-envelope"></i> ${this.getTranslation('booking_email_btn', 'Send via Email')}`;
        }

        // Update note text
        const noteElement = document.querySelector('.booking-form-note');
        if (noteElement) {
            const noteText = this.getTranslation('booking_note', 'Note: This is not a confirmed booking. We\'ll contact you within 24 hours to confirm availability, provide exact pricing, and arrange payment details.');
            noteElement.innerHTML = `<i class="fas fa-info-circle"></i> <strong>${noteText}</strong>`;
        }
    }

    initializeCountrySearch() {
        const selected = document.getElementById('countryDropdownSelected');
        const list = document.getElementById('countryDropdownList');
        const searchInput = document.getElementById('countrySearchInput');
        const options = document.getElementById('countryOptions');
        const hiddenInput = document.getElementById('bookingCountryCode');
        
        let allOptions = Array.from(options.children);
        
        // Toggle dropdown
        selected.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = list.classList.contains('open');
            if (isOpen) {
                this.closeCountryDropdown();
            } else {
                this.openCountryDropdown();
            }
        });
        
        // Search functionality
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            allOptions.forEach(option => {
                const countryName = option.getAttribute('data-country').toLowerCase();
                const countryText = option.textContent.toLowerCase();
                
                if (countryName.includes(searchTerm) || countryText.includes(searchTerm)) {
                    option.style.display = 'flex';
                } else {
                    option.style.display = 'none';
                }
            });
        });
        
        // Option selection
        options.addEventListener('click', (e) => {
            const option = e.target.closest('.country-option');
            if (option) {
                this.selectCountryOption(option);
            }
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.custom-country-dropdown')) {
                this.closeCountryDropdown();
            }
        });
        
        // Keyboard navigation
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const visibleOptions = allOptions.filter(opt => opt.style.display !== 'none');
                if (visibleOptions.length > 0) {
                    this.selectCountryOption(visibleOptions[0]);
                }
            } else if (e.key === 'Escape') {
                this.closeCountryDropdown();
            }
        });
    }
    
    openCountryDropdown() {
        const selected = document.getElementById('countryDropdownSelected');
        const list = document.getElementById('countryDropdownList');
        const searchInput = document.getElementById('countrySearchInput');
        
        selected.classList.add('open');
        list.classList.add('open');
        searchInput.focus();
        searchInput.value = '';
        
        // Show all options
        const options = document.getElementById('countryOptions');
        Array.from(options.children).forEach(option => {
            option.style.display = 'flex';
        });
    }
    
    closeCountryDropdown() {
        const selected = document.getElementById('countryDropdownSelected');
        const list = document.getElementById('countryDropdownList');
        
        selected.classList.remove('open');
        list.classList.remove('open');
    }
    
    selectCountryOption(option) {
        const flag = option.querySelector('.flag').textContent;
        const countryText = option.querySelector('.country-text').textContent;
        const value = option.getAttribute('data-value');
        
        // Update selected display
        const selected = document.getElementById('countryDropdownSelected');
        selected.querySelector('.flag').textContent = flag;
        selected.querySelector('.country-text').textContent = countryText;
        
        // Update hidden input
        const hiddenInput = document.getElementById('bookingCountryCode');
        hiddenInput.value = value;
        
        // Remove previous selection
        document.querySelectorAll('.country-option.selected').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Mark as selected
        option.classList.add('selected');
        
        this.closeCountryDropdown();
    }

    bindEvents() {
        // Close modal events
        document.addEventListener('click', (e) => {
            if (e.target.matches('.booking-close') || e.target.matches('.booking-modal')) {
                this.closeModal();
            }
        });

        // Book tour button events
        document.addEventListener('click', (e) => {
            if (e.target.matches('.book-tour-btn') || e.target.closest('.book-tour-btn')) {
                console.log('Book tour button clicked!');
                
                const button = e.target.matches('.book-tour-btn') ? e.target : e.target.closest('.book-tour-btn');
                
                // Find the tour card - could be tour-card, tour-preview-card, or tour-detail-card
                const tourCard = button.closest('.tour-card') || 
                                button.closest('.tour-preview-card') || 
                                button.closest('.tour-detail-card') ||
                                button.closest('.tour-details');
                
                if (tourCard) {
                    // Find tour title - could be in different locations
                    let tourTitle = '';
                    let tourDescription = '';
                    
                    // Try to find title in current card or previous card
                    const titleElement = tourCard.querySelector('h3') || 
                                       (tourCard.previousElementSibling && tourCard.previousElementSibling.querySelector('h3'));
                    
                    if (titleElement) {
                        tourTitle = titleElement.textContent.trim();
                    }
                    
                    // Try to find description in current card or previous card
                    const descElement = tourCard.querySelector('p') || 
                                      tourCard.querySelector('.tour-description p') ||
                                      (tourCard.previousElementSibling && tourCard.previousElementSibling.querySelector('p'));
                    
                    if (descElement) {
                        tourDescription = descElement.textContent.trim();
                    }
                    
                    // Fallback if we still don't have a title
                    if (!tourTitle) {
                        tourTitle = 'Tour Booking Request';
                        tourDescription = 'Thank you for your interest in our tours!';
                    }
                    
                    console.log('Opening modal for:', tourTitle);
                    this.openModal(tourTitle, tourDescription);
                } else {
                    // Fallback - open modal anyway with generic content
                    console.log('No tour card found, opening modal with generic content');
                    this.openModal('Tour Booking Request', 'Thank you for your interest in our tours!');
                }
            }
        });

        // WhatsApp button
        document.addEventListener('click', (e) => {
            if (e.target.matches('#bookingWhatsApp') || e.target.closest('#bookingWhatsApp')) {
                this.sendViaWhatsApp();
            }
        });

        // Form submission
        document.addEventListener('submit', (e) => {
            if (e.target.matches('#bookingForm')) {
                e.preventDefault();
                this.sendViaEmail();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && this.modal.style.display !== 'none') {
                this.closeModal();
            }
        });
    }

    openModal(tourTitle, tourDescription) {
        this.currentTour = { title: tourTitle, description: tourDescription };
        
        document.getElementById('modalTourTitle').textContent = tourTitle;
        document.getElementById('modalTourInfo').textContent = tourDescription;
        
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Reset form
        this.resetForm();
    }

    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    resetForm() {
        const form = document.getElementById('bookingForm');
        if (form) {
            form.reset();
            
            // Reset any custom states
            document.querySelectorAll('.booking-form-group input, .booking-form-group select, .booking-form-group textarea').forEach(field => {
                field.style.borderColor = '';
            });
            
            // Re-enable buttons
            document.querySelectorAll('.booking-btn').forEach(btn => {
                btn.disabled = false;
                if (btn.id === 'bookingWhatsApp') {
                    btn.innerHTML = `<i class="fab fa-whatsapp"></i> ${this.getTranslation('booking_whatsapp', 'Send via WhatsApp')}`;
                } else if (btn.classList.contains('booking-btn-email')) {
                    btn.innerHTML = `<i class="fas fa-envelope"></i> ${this.getTranslation('booking_email_btn', 'Send via Email')}`;
                }
            });
        }
    }

    getFormData() {
        return {
            name: document.getElementById('bookingName').value,
            email: document.getElementById('bookingEmail').value,
            phone: document.getElementById('bookingPhone').value,
            date: document.getElementById('bookingDate').value,
            groupSize: document.getElementById('bookingGroupSize').value,
            tourType: document.getElementById('bookingType').value,
            requests: document.getElementById('bookingRequests').value
        };
    }

    validateForm() {
        const requiredFields = ['bookingName', 'bookingEmail', 'bookingPhone', 'bookingGroupSize'];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });

        // Validate email format
        const emailField = document.getElementById('bookingEmail');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            emailField.style.borderColor = '#e74c3c';
            emailField.focus();
            alert('Please enter a valid email address.');
            return false;
        }
        
        return isValid;
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
        
        // Get phone number with country code
        const countryCode = document.getElementById('bookingCountryCode').value;
        const phoneNumber = document.getElementById('bookingPhone').value;
        const fullPhone = countryCode + phoneNumber;
        
        const emailData = {
            ...data,
            phone: fullPhone,
            tour_name: this.currentTour.title,
            message_type: 'tour_booking'
        };
        
        fetch('/send_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(emailData)
        })
        .then(response => response.json())
        .then(result => {
            if (result.status === 'success') {
                this.showSuccessMessage('Email');
            } else {
                throw new Error(result.message || 'Failed to send booking request');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error sending your booking request. Please try again or use WhatsApp.');
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i class="fas fa-envelope"></i> ${this.getTranslation('booking_email_btn', 'Send via Email')}`;
        });
    }

    showSuccessMessage(method) {
        const modal = document.getElementById('bookingModal');
        const successTitle = this.getTranslation('booking_success_title', 'Booking Request Sent!');
        const successMessage = this.getTranslation('booking_success_message', 'Thank you for your interest in {tour}. We\'ve received your booking request via {method} and will contact you within 24 hours to confirm availability and provide pricing details.')
            .replace('{tour}', `<strong>${this.currentTour.title}</strong>`)
            .replace('{method}', method);
        const closeText = this.getTranslation('booking_close', 'Close');
        
        modal.innerHTML = `
            <div class="booking-modal-content">
                <div class="booking-success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h4>${successTitle}</h4>
                <p>${successMessage}</p>
                <div class="booking-actions">
                    <button type="button" class="booking-btn booking-btn-email" onclick="bookingModal.closeModal()">
                        <i class="fas fa-check"></i>
                        ${closeText}
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
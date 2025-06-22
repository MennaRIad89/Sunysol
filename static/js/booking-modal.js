// Booking Modal System
class BookingModal {
    constructor() {
        this.modal = null;
        this.currentTour = null;
        this.init();
    }

    getTranslation(key, fallback) {
        // window.translations is already the current language's translations from Flask
        if (window.translations && window.translations[key]) {
            return window.translations[key];
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
                                    <!-- Mobile version with flags -->
                                    <select id="bookingCountryCodeMobile" name="countryCode" required class="country-select-mobile">
                                        <option value="+93" data-country="Afghanistan">🇦🇫 Afghanistan (+93)</option>
                                        <option value="+355" data-country="Albania">🇦🇱 Albania (+355)</option>
                                        <option value="+213" data-country="Algeria">🇩🇿 Algeria (+213)</option>
                                        <option value="+244" data-country="Angola">🇦🇴 Angola (+244)</option>
                                        <option value="+54" data-country="Argentina">🇦🇷 Argentina (+54)</option>
                                        <option value="+374" data-country="Armenia">🇦🇲 Armenia (+374)</option>
                                        <option value="+61" data-country="Australia">🇦🇺 Australia (+61)</option>
                                        <option value="+43" data-country="Austria">🇦🇹 Austria (+43)</option>
                                        <option value="+994" data-country="Azerbaijan">🇦🇿 Azerbaijan (+994)</option>
                                        <option value="+973" data-country="Bahrain">🇧🇭 Bahrain (+973)</option>
                                        <option value="+880" data-country="Bangladesh">🇧🇩 Bangladesh (+880)</option>
                                        <option value="+375" data-country="Belarus">🇧🇾 Belarus (+375)</option>
                                        <option value="+32" data-country="Belgium">🇧🇪 Belgium (+32)</option>
                                        <option value="+591" data-country="Bolivia">🇧🇴 Bolivia (+591)</option>
                                        <option value="+387" data-country="Bosnia and Herzegovina">🇧🇦 Bosnia (+387)</option>
                                        <option value="+55" data-country="Brazil">🇧🇷 Brazil (+55)</option>
                                        <option value="+359" data-country="Bulgaria">🇧🇬 Bulgaria (+359)</option>
                                        <option value="+855" data-country="Cambodia">🇰🇭 Cambodia (+855)</option>
                                        <option value="+1" data-country="Canada">🇨🇦 Canada (+1)</option>
                                        <option value="+56" data-country="Chile">🇨🇱 Chile (+56)</option>
                                        <option value="+86" data-country="China">🇨🇳 China (+86)</option>
                                        <option value="+57" data-country="Colombia">🇨🇴 Colombia (+57)</option>
                                        <option value="+506" data-country="Costa Rica">🇨🇷 Costa Rica (+506)</option>
                                        <option value="+385" data-country="Croatia">🇭🇷 Croatia (+385)</option>
                                        <option value="+53" data-country="Cuba">🇨🇺 Cuba (+53)</option>
                                        <option value="+357" data-country="Cyprus">🇨🇾 Cyprus (+357)</option>
                                        <option value="+420" data-country="Czech Republic">🇨🇿 Czech Rep (+420)</option>
                                        <option value="+45" data-country="Denmark">🇩🇰 Denmark (+45)</option>
                                        <option value="+1809" data-country="Dominican Republic">🇩🇴 Dominican (+1809)</option>
                                        <option value="+593" data-country="Ecuador">🇪🇨 Ecuador (+593)</option>
                                        <option value="+20" data-country="Egypt">🇪🇬 Egypt (+20)</option>
                                        <option value="+372" data-country="Estonia">🇪🇪 Estonia (+372)</option>
                                        <option value="+251" data-country="Ethiopia">🇪🇹 Ethiopia (+251)</option>
                                        <option value="+358" data-country="Finland">🇫🇮 Finland (+358)</option>
                                        <option value="+33" data-country="France">🇫🇷 France (+33)</option>
                                        <option value="+995" data-country="Georgia">🇬🇪 Georgia (+995)</option>
                                        <option value="+49" data-country="Germany">🇩🇪 Germany (+49)</option>
                                        <option value="+233" data-country="Ghana">🇬🇭 Ghana (+233)</option>
                                        <option value="+30" data-country="Greece">🇬🇷 Greece (+30)</option>
                                        <option value="+502" data-country="Guatemala">🇬🇹 Guatemala (+502)</option>
                                        <option value="+504" data-country="Honduras">🇭🇳 Honduras (+504)</option>
                                        <option value="+36" data-country="Hungary">🇭🇺 Hungary (+36)</option>
                                        <option value="+354" data-country="Iceland">🇮🇸 Iceland (+354)</option>
                                        <option value="+91" data-country="India">🇮🇳 India (+91)</option>
                                        <option value="+62" data-country="Indonesia">🇮🇩 Indonesia (+62)</option>
                                        <option value="+98" data-country="Iran">🇮🇷 Iran (+98)</option>
                                        <option value="+964" data-country="Iraq">🇮🇶 Iraq (+964)</option>
                                        <option value="+353" data-country="Ireland">🇮🇪 Ireland (+353)</option>
                                        <option value="+972" data-country="Israel">🇮🇱 Israel (+972)</option>
                                        <option value="+39" data-country="Italy">🇮🇹 Italy (+39)</option>
                                        <option value="+1876" data-country="Jamaica">🇯🇲 Jamaica (+1876)</option>
                                        <option value="+81" data-country="Japan">🇯🇵 Japan (+81)</option>
                                        <option value="+962" data-country="Jordan">🇯🇴 Jordan (+962)</option>
                                        <option value="+7" data-country="Kazakhstan">🇰🇿 Kazakhstan (+7)</option>
                                        <option value="+254" data-country="Kenya">🇰🇪 Kenya (+254)</option>
                                        <option value="+965" data-country="Kuwait">🇰🇼 Kuwait (+965)</option>
                                        <option value="+371" data-country="Latvia">🇱🇻 Latvia (+371)</option>
                                        <option value="+961" data-country="Lebanon">🇱🇧 Lebanon (+961)</option>
                                        <option value="+218" data-country="Libya">🇱🇾 Libya (+218)</option>
                                        <option value="+370" data-country="Lithuania">🇱🇹 Lithuania (+370)</option>
                                        <option value="+352" data-country="Luxembourg">🇱🇺 Luxembourg (+352)</option>
                                        <option value="+60" data-country="Malaysia">🇲🇾 Malaysia (+60)</option>
                                        <option value="+356" data-country="Malta">🇲🇹 Malta (+356)</option>
                                        <option value="+52" data-country="Mexico">🇲🇽 Mexico (+52)</option>
                                        <option value="+373" data-country="Moldova">🇲🇩 Moldova (+373)</option>
                                        <option value="+212" data-country="Morocco">🇲🇦 Morocco (+212)</option>
                                        <option value="+977" data-country="Nepal">🇳🇵 Nepal (+977)</option>
                                        <option value="+31" data-country="Netherlands">🇳🇱 Netherlands (+31)</option>
                                        <option value="+64" data-country="New Zealand">🇳🇿 New Zealand (+64)</option>
                                        <option value="+505" data-country="Nicaragua">🇳🇮 Nicaragua (+505)</option>
                                        <option value="+234" data-country="Nigeria">🇳🇬 Nigeria (+234)</option>
                                        <option value="+389" data-country="North Macedonia">🇲🇰 N Macedonia (+389)</option>
                                        <option value="+47" data-country="Norway">🇳🇴 Norway (+47)</option>
                                        <option value="+968" data-country="Oman">🇴🇲 Oman (+968)</option>
                                        <option value="+92" data-country="Pakistan">🇵🇰 Pakistan (+92)</option>
                                        <option value="+507" data-country="Panama">🇵🇦 Panama (+507)</option>
                                        <option value="+595" data-country="Paraguay">🇵🇾 Paraguay (+595)</option>
                                        <option value="+51" data-country="Peru">🇵🇪 Peru (+51)</option>
                                        <option value="+63" data-country="Philippines">🇵🇭 Philippines (+63)</option>
                                        <option value="+48" data-country="Poland">🇵🇱 Poland (+48)</option>
                                        <option value="+351" data-country="Portugal">🇵🇹 Portugal (+351)</option>
                                        <option value="+974" data-country="Qatar">🇶🇦 Qatar (+974)</option>
                                        <option value="+40" data-country="Romania">🇷🇴 Romania (+40)</option>
                                        <option value="+7" data-country="Russia">🇷🇺 Russia (+7)</option>
                                        <option value="+966" data-country="Saudi Arabia">🇸🇦 Saudi Arabia (+966)</option>
                                        <option value="+381" data-country="Serbia">🇷🇸 Serbia (+381)</option>
                                        <option value="+65" data-country="Singapore">🇸🇬 Singapore (+65)</option>
                                        <option value="+421" data-country="Slovakia">🇸🇰 Slovakia (+421)</option>
                                        <option value="+386" data-country="Slovenia">🇸🇮 Slovenia (+386)</option>
                                        <option value="+27" data-country="South Africa">🇿🇦 South Africa (+27)</option>
                                        <option value="+82" data-country="South Korea">🇰🇷 South Korea (+82)</option>
                                        <option value="+34" data-country="Spain">🇪🇸 Spain (+34)</option>
                                        <option value="+94" data-country="Sri Lanka">🇱🇰 Sri Lanka (+94)</option>
                                        <option value="+249" data-country="Sudan">🇸🇩 Sudan (+249)</option>
                                        <option value="+46" data-country="Sweden">🇸🇪 Sweden (+46)</option>
                                        <option value="+41" data-country="Switzerland">🇨🇭 Switzerland (+41)</option>
                                        <option value="+963" data-country="Syria">🇸🇾 Syria (+963)</option>
                                        <option value="+886" data-country="Taiwan">🇹🇼 Taiwan (+886)</option>
                                        <option value="+66" data-country="Thailand">🇹🇭 Thailand (+66)</option>
                                        <option value="+216" data-country="Tunisia">🇹🇳 Tunisia (+216)</option>
                                        <option value="+90" data-country="Turkey">🇹🇷 Turkey (+90)</option>
                                        <option value="+380" data-country="Ukraine">🇺🇦 Ukraine (+380)</option>
                                        <option value="+44" data-country="United Kingdom">🇬🇧 UK (+44)</option>
                                        <option value="+971" data-country="United Arab Emirates">🇦🇪 UAE (+971)</option>
                                        <option value="+1" data-country="United States">🇺🇸 USA (+1)</option>
                                        <option value="+598" data-country="Uruguay">🇺🇾 Uruguay (+598)</option>
                                        <option value="+58" data-country="Venezuela">🇻🇪 Venezuela (+58)</option>
                                        <option value="+84" data-country="Vietnam">🇻🇳 Vietnam (+84)</option>
                                        <option value="+967" data-country="Yemen">🇾🇪 Yemen (+967)</option>
                                    </select>
                                    
                                    <!-- Desktop version with country names -->
                                    <select id="bookingCountryCodeDesktop" name="countryCode" required class="country-select-desktop">
                                        <option value="+93" data-country="Afghanistan">Afghanistan (+93)</option>
                                        <option value="+355" data-country="Albania">Albania (+355)</option>
                                        <option value="+213" data-country="Algeria">Algeria (+213)</option>
                                        <option value="+244" data-country="Angola">Angola (+244)</option>
                                        <option value="+54" data-country="Argentina">Argentina (+54)</option>
                                        <option value="+374" data-country="Armenia">Armenia (+374)</option>
                                        <option value="+61" data-country="Australia">Australia (+61)</option>
                                        <option value="+43" data-country="Austria">Austria (+43)</option>
                                        <option value="+994" data-country="Azerbaijan">Azerbaijan (+994)</option>
                                        <option value="+973" data-country="Bahrain">Bahrain (+973)</option>
                                        <option value="+880" data-country="Bangladesh">Bangladesh (+880)</option>
                                        <option value="+375" data-country="Belarus">Belarus (+375)</option>
                                        <option value="+32" data-country="Belgium">Belgium (+32)</option>
                                        <option value="+591" data-country="Bolivia">Bolivia (+591)</option>
                                        <option value="+387" data-country="Bosnia and Herzegovina">Bosnia and Herzegovina (+387)</option>
                                        <option value="+55" data-country="Brazil">Brazil (+55)</option>
                                        <option value="+359" data-country="Bulgaria">Bulgaria (+359)</option>
                                        <option value="+855" data-country="Cambodia">Cambodia (+855)</option>
                                        <option value="+1" data-country="Canada">Canada (+1)</option>
                                        <option value="+56" data-country="Chile">Chile (+56)</option>
                                        <option value="+86" data-country="China">China (+86)</option>
                                        <option value="+57" data-country="Colombia">Colombia (+57)</option>
                                        <option value="+506" data-country="Costa Rica">Costa Rica (+506)</option>
                                        <option value="+385" data-country="Croatia">Croatia (+385)</option>
                                        <option value="+53" data-country="Cuba">Cuba (+53)</option>
                                        <option value="+357" data-country="Cyprus">Cyprus (+357)</option>
                                        <option value="+420" data-country="Czech Republic">Czech Republic (+420)</option>
                                        <option value="+45" data-country="Denmark">Denmark (+45)</option>
                                        <option value="+1809" data-country="Dominican Republic">Dominican Republic (+1809)</option>
                                        <option value="+593" data-country="Ecuador">Ecuador (+593)</option>
                                        <option value="+20" data-country="Egypt">Egypt (+20)</option>
                                        <option value="+372" data-country="Estonia">Estonia (+372)</option>
                                        <option value="+251" data-country="Ethiopia">Ethiopia (+251)</option>
                                        <option value="+358" data-country="Finland">Finland (+358)</option>
                                        <option value="+33" data-country="France">France (+33)</option>
                                        <option value="+995" data-country="Georgia">Georgia (+995)</option>
                                        <option value="+49" data-country="Germany">Germany (+49)</option>
                                        <option value="+233" data-country="Ghana">Ghana (+233)</option>
                                        <option value="+30" data-country="Greece">Greece (+30)</option>
                                        <option value="+502" data-country="Guatemala">Guatemala (+502)</option>
                                        <option value="+504" data-country="Honduras">Honduras (+504)</option>
                                        <option value="+36" data-country="Hungary">Hungary (+36)</option>
                                        <option value="+354" data-country="Iceland">Iceland (+354)</option>
                                        <option value="+91" data-country="India">India (+91)</option>
                                        <option value="+62" data-country="Indonesia">Indonesia (+62)</option>
                                        <option value="+98" data-country="Iran">Iran (+98)</option>
                                        <option value="+964" data-country="Iraq">Iraq (+964)</option>
                                        <option value="+353" data-country="Ireland">Ireland (+353)</option>
                                        <option value="+972" data-country="Israel">Israel (+972)</option>
                                        <option value="+39" data-country="Italy">Italy (+39)</option>
                                        <option value="+1876" data-country="Jamaica">Jamaica (+1876)</option>
                                        <option value="+81" data-country="Japan">Japan (+81)</option>
                                        <option value="+962" data-country="Jordan">Jordan (+962)</option>
                                        <option value="+7" data-country="Kazakhstan">Kazakhstan (+7)</option>
                                        <option value="+254" data-country="Kenya">Kenya (+254)</option>
                                        <option value="+965" data-country="Kuwait">Kuwait (+965)</option>
                                        <option value="+371" data-country="Latvia">Latvia (+371)</option>
                                        <option value="+961" data-country="Lebanon">Lebanon (+961)</option>
                                        <option value="+218" data-country="Libya">Libya (+218)</option>
                                        <option value="+370" data-country="Lithuania">Lithuania (+370)</option>
                                        <option value="+352" data-country="Luxembourg">Luxembourg (+352)</option>
                                        <option value="+60" data-country="Malaysia">Malaysia (+60)</option>
                                        <option value="+356" data-country="Malta">Malta (+356)</option>
                                        <option value="+52" data-country="Mexico">Mexico (+52)</option>
                                        <option value="+373" data-country="Moldova">Moldova (+373)</option>
                                        <option value="+212" data-country="Morocco">Morocco (+212)</option>
                                        <option value="+977" data-country="Nepal">Nepal (+977)</option>
                                        <option value="+31" data-country="Netherlands">Netherlands (+31)</option>
                                        <option value="+64" data-country="New Zealand">New Zealand (+64)</option>
                                        <option value="+505" data-country="Nicaragua">Nicaragua (+505)</option>
                                        <option value="+234" data-country="Nigeria">Nigeria (+234)</option>
                                        <option value="+389" data-country="North Macedonia">North Macedonia (+389)</option>
                                        <option value="+47" data-country="Norway">Norway (+47)</option>
                                        <option value="+968" data-country="Oman">Oman (+968)</option>
                                        <option value="+92" data-country="Pakistan">Pakistan (+92)</option>
                                        <option value="+507" data-country="Panama">Panama (+507)</option>
                                        <option value="+595" data-country="Paraguay">Paraguay (+595)</option>
                                        <option value="+51" data-country="Peru">Peru (+51)</option>
                                        <option value="+63" data-country="Philippines">Philippines (+63)</option>
                                        <option value="+48" data-country="Poland">Poland (+48)</option>
                                        <option value="+351" data-country="Portugal">Portugal (+351)</option>
                                        <option value="+974" data-country="Qatar">Qatar (+974)</option>
                                        <option value="+40" data-country="Romania">Romania (+40)</option>
                                        <option value="+7" data-country="Russia">Russia (+7)</option>
                                        <option value="+966" data-country="Saudi Arabia">Saudi Arabia (+966)</option>
                                        <option value="+381" data-country="Serbia">Serbia (+381)</option>
                                        <option value="+65" data-country="Singapore">Singapore (+65)</option>
                                        <option value="+421" data-country="Slovakia">Slovakia (+421)</option>
                                        <option value="+386" data-country="Slovenia">Slovenia (+386)</option>
                                        <option value="+27" data-country="South Africa">South Africa (+27)</option>
                                        <option value="+82" data-country="South Korea">South Korea (+82)</option>
                                        <option value="+34" data-country="Spain">Spain (+34)</option>
                                        <option value="+94" data-country="Sri Lanka">Sri Lanka (+94)</option>
                                        <option value="+249" data-country="Sudan">Sudan (+249)</option>
                                        <option value="+46" data-country="Sweden">Sweden (+46)</option>
                                        <option value="+41" data-country="Switzerland">Switzerland (+41)</option>
                                        <option value="+963" data-country="Syria">Syria (+963)</option>
                                        <option value="+886" data-country="Taiwan">Taiwan (+886)</option>
                                        <option value="+66" data-country="Thailand">Thailand (+66)</option>
                                        <option value="+216" data-country="Tunisia">Tunisia (+216)</option>
                                        <option value="+90" data-country="Turkey">Turkey (+90)</option>
                                        <option value="+380" data-country="Ukraine">Ukraine (+380)</option>
                                        <option value="+44" data-country="United Kingdom">United Kingdom (+44)</option>
                                        <option value="+971" data-country="United Arab Emirates">United Arab Emirates (+971)</option>
                                        <option value="+1" data-country="United States">United States (+1)</option>
                                        <option value="+598" data-country="Uruguay">Uruguay (+598)</option>
                                        <option value="+58" data-country="Venezuela">Venezuela (+58)</option>
                                        <option value="+84" data-country="Vietnam">Vietnam (+84)</option>
                                        <option value="+967" data-country="Yemen">Yemen (+967)</option>
                                    </select>
                                    
                                    <input type="tel" id="bookingPhone" name="phone" placeholder="123456789" required>
                                </div>
                            </div>

                            <div class="booking-form-row booking-dates-row">
                                <div class="booking-form-group">
                                    <label for="bookingStartDate">Trip Start Date</label>
                                    <input type="date" id="bookingStartDate" name="startDate" min="">
                                </div>
                                <div class="booking-form-group">
                                    <label for="bookingEndDate">Trip End Date</label>
                                    <input type="date" id="bookingEndDate" name="endDate" min="">
                                </div>
                            </div>

                            <div class="booking-form-row booking-details-row">
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
                                <div class="booking-form-group">
                                    <label for="bookingType">Tour Type</label>
                                    <select id="bookingType" name="tourType">
                                        <option value="">Select tour type...</option>
                                        <option value="private">Private Tour</option>
                                        <option value="group">Join Group Tour</option>
                                        <option value="vip">VIP Experience</option>
                                    </select>
                                </div>
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
        
        // Set minimum date to today for trip dates
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('bookingStartDate').setAttribute('min', today);
        document.getElementById('bookingEndDate').setAttribute('min', today);
        
        // Add event listener to ensure end date is after start date
        document.getElementById('bookingStartDate').addEventListener('change', (e) => {
            const startDate = e.target.value;
            const endDateInput = document.getElementById('bookingEndDate');
            endDateInput.setAttribute('min', startDate);
            
            // Clear end date if it's before the new start date
            if (endDateInput.value && endDateInput.value < startDate) {
                endDateInput.value = '';
            }
        });
        
        // Initialize country search functionality
        this.initializeCountrySearch();
        
        // Update labels with translations after modal is created (delay to ensure DOM is ready)
        setTimeout(() => {
            this.updateLabelsWithTranslations();
        }, 100);
    }

    updateLabelsWithTranslations() {
        console.log('Updating translations, current language:', document.documentElement.lang);
        
        // Update modal title
        const modalTitle = document.querySelector('#modalTourTitle');
        if (modalTitle) {
            modalTitle.textContent = this.getTranslation('booking_modal_title', 'Book This Tour');
        }
        
        // Update all form labels with appropriate translations
        const labelUpdates = [
            { selector: 'label[for="bookingName"]', key: 'booking_name', fallback: 'Full Name' },
            { selector: 'label[for="bookingEmail"]', key: 'booking_email', fallback: 'Email Address' },
            { selector: 'label[for="bookingPhone"]', key: 'booking_phone', fallback: 'Phone Number' },
            { selector: 'label[for="bookingStartDate"]', key: 'trip_start_date', fallback: 'Trip Start Date' },
            { selector: 'label[for="bookingEndDate"]', key: 'trip_end_date', fallback: 'Trip End Date' },
            { selector: 'label[for="bookingGroupSize"]', key: 'booking_group_size', fallback: 'Group Size' },
            { selector: 'label[for="bookingType"]', key: 'booking_tour_type', fallback: 'Tour Type' },
            { selector: 'label[for="bookingRequests"]', key: 'booking_requests', fallback: 'Special Requests or Questions' }
        ];

        labelUpdates.forEach(update => {
            const element = document.querySelector(update.selector);
            if (element) {
                const translatedText = this.getTranslation(update.key, update.fallback);
                element.textContent = translatedText;
                console.log(`Updated ${update.selector}: ${translatedText}`);
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

        // Update tour type options
        const tourTypeSelect = document.querySelector('#bookingType');
        if (tourTypeSelect) {
            if (tourTypeSelect.options[0]) {
                tourTypeSelect.options[0].textContent = this.getTranslation('select_option', 'Select tour type...');
            }
            if (tourTypeSelect.options[1]) {
                tourTypeSelect.options[1].textContent = this.getTranslation('private_tour', 'Private Tour');
            }
            if (tourTypeSelect.options[2]) {
                tourTypeSelect.options[2].textContent = this.getTranslation('group_tour', 'Join Group Tour');
            }
            if (tourTypeSelect.options[3]) {
                tourTypeSelect.options[3].textContent = this.getTranslation('vip_tour', 'VIP Experience');
            }
        }
        
        // Update group size options text
        const groupSizeOptions = document.querySelectorAll('#bookingGroupSize option');
        if (groupSizeOptions.length > 1) {
            // Update individual person/people labels
            for (let i = 1; i < groupSizeOptions.length; i++) {
                const option = groupSizeOptions[i];
                const value = option.value;
                if (value === '1') {
                    option.textContent = `1 ${this.getTranslation('person', 'Person')}`;
                } else if (value === '9+') {
                    option.textContent = `9+ ${this.getTranslation('people', 'People')}`;
                } else if (value && !isNaN(value)) {
                    option.textContent = `${value} ${this.getTranslation('people', 'People')}`;
                }
            }
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
        
        console.log('Translation update completed');
    }

    initializeCountrySearch() {
        const mobileSelect = document.getElementById('bookingCountryCodeMobile');
        const desktopSelect = document.getElementById('bookingCountryCodeDesktop');
        
        // Sync selections between mobile and desktop dropdowns
        if (mobileSelect && desktopSelect) {
            mobileSelect.addEventListener('change', () => {
                desktopSelect.value = mobileSelect.value;
            });
            
            desktopSelect.addEventListener('change', () => {
                mobileSelect.value = desktopSelect.value;
            });
        }
        
        // Add keyboard search functionality for both selects
        [mobileSelect, desktopSelect].forEach(select => {
            if (select) {
                let searchText = '';
                let searchTimeout;
                
                select.addEventListener('keydown', (e) => {
                    // Clear search text after 1 second of no typing
                    clearTimeout(searchTimeout);
                    searchTimeout = setTimeout(() => {
                        searchText = '';
                    }, 1000);
                    
                    // Only handle letter keys
                    if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
                        e.preventDefault();
                        searchText += e.key.toLowerCase();
                        
                        // Find the first option that starts with the search text
                        const options = Array.from(select.options);
                        const matchingOption = options.find(option => {
                            const countryName = option.getAttribute('data-country')?.toLowerCase() || '';
                            return countryName.startsWith(searchText);
                        });
                        
                        if (matchingOption) {
                            select.value = matchingOption.value;
                            // Sync the other select
                            const otherSelect = select === mobileSelect ? desktopSelect : mobileSelect;
                            if (otherSelect) {
                                otherSelect.value = matchingOption.value;
                            }
                        }
                    }
                });
            }
        });
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
            startDate: document.getElementById('bookingStartDate').value,
            endDate: document.getElementById('bookingEndDate').value,
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

        // Validate country code selection
        const mobileSelect = document.getElementById('bookingCountryCodeMobile');
        const desktopSelect = document.getElementById('bookingCountryCodeDesktop');
        const activeSelect = (window.innerWidth <= 768 ? mobileSelect : desktopSelect);
        
        if (!activeSelect.value) {
            activeSelect.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            activeSelect.style.borderColor = '';
        }

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
        const mobileSelect = document.getElementById('bookingCountryCodeMobile');
        const desktopSelect = document.getElementById('bookingCountryCodeDesktop');
        const activeSelect = (window.innerWidth <= 768 ? mobileSelect : desktopSelect);
        const countryCode = activeSelect ? activeSelect.value : '+971';
        const phoneNumber = document.getElementById('bookingPhone').value;
        const fullPhone = countryCode + phoneNumber;
        
        let message = `🌟 *Sun y Sol Tour Booking Request* 🌟\n\n`;
        message += `*Tour:* ${this.currentTour.title}\n\n`;
        message += `*Customer Details:*\n`;
        message += `👤 Name: ${data.name}\n`;
        message += `📧 Email: ${data.email}\n`;
        message += `📱 Phone: ${fullPhone}\n\n`;
        message += `*Tour Details:*\n`;
        message += `📅 Start Date: ${data.startDate || 'Flexible'}\n`;
        message += `📅 End Date: ${data.endDate || 'Flexible'}\n`;
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
        const mobileSelect = document.getElementById('bookingCountryCodeMobile');
        const desktopSelect = document.getElementById('bookingCountryCodeDesktop');
        const activeSelect = (window.innerWidth <= 768 ? mobileSelect : desktopSelect);
        const countryCode = activeSelect ? activeSelect.value : '+971';
        const phoneNumber = document.getElementById('bookingPhone').value;
        const fullPhone = countryCode + phoneNumber;
        
        const emailData = {
            ...data,
            phone: fullPhone,
            tour_name: this.currentTour.title,
            start_date: data.startDate,
            end_date: data.endDate,
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
        })
        .finally(() => {
            // Always re-enable button after 10 seconds as fallback
            setTimeout(() => {
                if (submitBtn.disabled) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<i class="fas fa-envelope"></i> ${this.getTranslation('booking_email_btn', 'Send via Email')}`;
                }
            }, 10000);
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
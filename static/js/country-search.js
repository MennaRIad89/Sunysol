// Enhanced country dropdown with keyboard navigation
document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('review-country');
    if (!countrySelect) return;

    let searchBuffer = '';
    let searchTimeout;

    countrySelect.addEventListener('keydown', function(e) {
        // Clear previous timeout
        clearTimeout(searchTimeout);
        
        // Add character to search buffer if it's a letter
        if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
            searchBuffer += e.key.toLowerCase();
            
            // Find matching option
            const options = Array.from(this.options);
            const matchingOption = options.find(option => 
                option.text.toLowerCase().startsWith(searchBuffer) && option.value !== ''
            );
            
            if (matchingOption) {
                this.value = matchingOption.value;
                e.preventDefault();
            }
        }
        
        // Clear search buffer after 1 second of inactivity
        searchTimeout = setTimeout(() => {
            searchBuffer = '';
        }, 1000);
        
        // Handle special keys
        if (e.key === 'Escape') {
            searchBuffer = '';
        }
    });

    // Clear search buffer when dropdown is closed
    countrySelect.addEventListener('blur', function() {
        clearTimeout(searchTimeout);
        searchBuffer = '';
    });
});
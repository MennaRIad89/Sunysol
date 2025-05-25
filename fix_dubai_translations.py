#!/usr/bin/env python3
"""
Quick script to fix all Dubai tours translation issues
"""

import re

# Read the current Dubai tours template
with open('templates/dubai_tours.html', 'r') as f:
    content = f.read()

# Fix all the missing translations systematically
replacements = [
    # Book This Tour buttons
    (r'<a href="#contact" class="btn primary-btn">Book This Tour</a>', 
     '<a href="#contact" class="btn primary-btn">{{ g.translations.book_this_tour }}</a>'),
    
    # Tour descriptions and titles
    (r'<h3>Dubai Half Day Classic Tour</h3>', 
     '<h3>{{ g.translations.dubai_heritage_tour }}</h3>'),
    
    (r'<p>Discover Dubai\'s rich heritage through traditional souqs, historic districts, and authentic cultural experiences including an abra ride\.</p>', 
     '<p>{{ g.translations.dubai_heritage_description }}</p>'),
    
    # Hours and pickup
    (r'<span><i class="fas fa-clock"></i> 4-5 Hours</span>', 
     '<span><i class="fas fa-clock"></i> 4-5 {{ g.translations.hours }}</span>'),
    
    (r'<span><i class="fas fa-map-marker-alt"></i> Hotel Pick-up</span>', 
     '<span><i class="fas fa-map-marker-alt"></i> {{ g.translations.hotel_pickup }}</span>'),
    
    # Itinerary headers
    (r'<h4><i class="fas fa-route"></i> Itinerary</h4>', 
     '<h4><i class="fas fa-route"></i> {{ g.translations.itinerary }}</h4>'),
    
    # Includes/excludes headers
    (r'<h4><i class="fas fa-check-circle"></i> Included</h4>', 
     '<h4><i class="fas fa-check-circle"></i> {{ g.translations.included }}</h4>'),
    
    (r'<h4><i class="fas fa-times-circle"></i> Not Included</h4>', 
     '<h4><i class="fas fa-times-circle"></i> {{ g.translations.not_included }}</h4>'),
    
    # Optional addons
    (r'<h4><i class="fas fa-plus"></i> Optional Add-ons \(Extra Charge\)</h4>', 
     '<h4><i class="fas fa-plus"></i> {{ g.translations.optional_addons }}</h4>'),
    
    (r'<h4><i class="fas fa-plus"></i> Optional Add-on \(Extra Charge\)</h4>', 
     '<h4><i class="fas fa-plus"></i> {{ g.translations.optional_addons }}</h4>'),
]

# Apply all replacements
for old_pattern, new_text in replacements:
    content = re.sub(old_pattern, new_text, content)

# Write the fixed content back
with open('templates/dubai_tours.html', 'w') as f:
    f.write(content)

print("Fixed all Dubai tours translations!")
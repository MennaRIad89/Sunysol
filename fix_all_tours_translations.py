#!/usr/bin/env python3
"""
Fix all remaining tour translation issues
"""

import re

# Read the current Dubai tours template
with open('templates/dubai_tours.html', 'r') as f:
    content = f.read()

# Fix all remaining translation issues
replacements = [
    # Individual inclusion/exclusion items
    (r'<li>Hotel pick-up & drop-off</li>', '<li>{{ g.translations.hotel_pickup_dropoff }}</li>'),
    (r'<li>Air-conditioned vehicle</li>', '<li>{{ g.translations.air_conditioned_vehicle }}</li>'),
    (r'<li>Professional guide \(English/Spanish\)</li>', '<li>{{ g.translations.professional_guide_eng_spa }}</li>'),
    (r'<li>Photo stops at landmarks</li>', '<li>{{ g.translations.photo_stops_landmarks }}</li>'),
    (r'<li>Bottled water</li>', '<li>{{ g.translations.bottled_water }}</li>'),
    (r'<li>Taxes & charges</li>', '<li>{{ g.translations.taxes_charges }}</li>'),
    (r'<li>Entry tickets for attractions</li>', '<li>{{ g.translations.entry_tickets_attractions }}</li>'),
    (r'<li>Entry tickets for optional attractions</li>', '<li>{{ g.translations.entrance_fees_attractions }}</li>'),
    (r'<li>Meals & personal expenses</li>', '<li>{{ g.translations.meals_personal_expenses }}</li>'),
    (r'<li>Tips & gratuities</li>', '<li>{{ g.translations.tips_gratuities }}</li>'),
    (r'<li>Personal expenses</li>', '<li>{{ g.translations.personal_expenses }}</li>'),
    (r'<li>Meals \(unless specified\)</li>', '<li>{{ g.translations.meals_unless_specified }}</li>'),
    (r'<li>Entrance fees to attractions</li>', '<li>{{ g.translations.entrance_fees_attractions }}</li>'),
]

# Apply all replacements
for old_pattern, new_text in replacements:
    content = re.sub(old_pattern, new_text, content)

# Write the fixed content back
with open('templates/dubai_tours.html', 'w') as f:
    f.write(content)

print("Fixed all remaining Dubai tours translations!")
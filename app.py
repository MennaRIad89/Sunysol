import os
import logging
from flask import Flask, render_template, request, flash, redirect, url_for, session, g

from translations import TRANSLATIONS

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")


# Set default language
@app.before_request
def before_request():
    language = session.get('language', 'en')
    g.language = language
    g.translations = TRANSLATIONS[language]


@app.route('/switch_language/<language>')
def switch_language(language):
    if language in TRANSLATIONS:
        session['language'] = language
    return redirect(request.referrer or url_for('index'))


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/agencies')
def agencies():
    return render_template('agencies.html')


@app.route('/dubai-tours')
def dubai_tours():
    return render_template('dubai_tours.html')


@app.route('/abudhabi-tours')
def abudhabi_tours():
    return render_template('abudhabi_tours.html')


@app.route('/northern-emirates-tours')
def northern_emirates_tours():
    return render_template('northern_emirates_tours.html')


@app.route('/galleries/dubai-modern')
def dubai_modern_gallery():
    return render_template('dubai-modern-gallery.html')


@app.route('/submit_review', methods=['POST'])
def submit_review():
    try:
        name = request.form.get('name')
        email = request.form.get('email')
        country = request.form.get('country')
        tour = request.form.get('tour')
        comment = request.form.get('comment')

        # Here we would normally save the review to a database
        # For now, we'll just log it
        logging.info(
            f"Review received from {name} ({email}) from {country} about {tour}: {comment}"
        )

        flash(g.translations['thank_you_review'], "success")
    except Exception as e:
        logging.error(f"Error processing review: {str(e)}")
        flash(g.translations['error_review'], "error")

    return redirect(url_for('index', _anchor='reviews'))


@app.route('/send_message', methods=['POST'])
def send_message():
    try:
        name = request.form.get('name')
        email = request.form.get('email')
        traveler_type = request.form.get('traveler_type')
        message = request.form.get('message')

        # Here we would normally send an email or save to a database
        # For now, we'll just log it
        logging.info(
            f"Contact message received from {name} ({email}), {traveler_type}: {message}"
        )

        flash(g.translations['thank_you_message'], "success")
    except Exception as e:
        logging.error(f"Error processing contact form: {str(e)}")
        flash(g.translations['error_message'], "error")

    return redirect(url_for('index', _anchor='contact'))


# Gallery Routes
@app.route('/galleries/<gallery_type>')
def gallery_page(gallery_type):
    # Gallery data with existing images
    galleries = {
        'dubai-modern': {
            'title': g.translations.get('dubai_modern_tour', 'Dubai Half Day Modern Tour'),
            'description': g.translations.get('dubai_modern_description', 'Experience Dubai\'s futuristic skyline, luxury hotels, and iconic landmarks including Burj Khalifa, Palm Jumeirah, and Dubai Marina.'),
            'images': [
                {'src': 'images/dubai-modern-1.jpg', 'alt': 'Dubai Modern Architecture'},
                {'src': 'images/dubai-modern-2.jpg', 'alt': 'Dubai Skyline View'},
                {'src': 'images/dubai-modern-3.jpg', 'alt': 'Modern Dubai Landmarks'},
                {'src': 'images/burj-khalifa.png', 'alt': 'Burj Khalifa Tower'},
                {'src': 'images/combo-dubai.jpg', 'alt': 'Dubai City Combo'},
            ]
        },
        'dubai-classic': {
            'title': g.translations.get('dubai_heritage_tour', 'Dubai Half Day Classic Heritage Tour'),
            'description': g.translations.get('dubai_heritage_description', 'Discover Dubai\'s traditional charm with visits to historic souks, heritage villages, and authentic cultural sites.'),
            'images': [
                {'src': 'images/heritage-dubai.jpg', 'alt': 'Dubai Heritage Village'},
                {'src': 'images/Gallary_Photo1.jpg', 'alt': 'Traditional Dubai Souks'},
                {'src': 'images/combo-dubai.jpg', 'alt': 'Classic Dubai Tour'},
                {'src': 'images/burj-khalifa.png', 'alt': 'Dubai Iconic Views'},
            ]
        },
        'dubai-full': {
            'title': g.translations.get('combo_tour', 'Dubai Full Day Modern & Classic Tour'),
            'description': g.translations.get('combo_description', 'Complete Dubai experience combining modern landmarks and traditional heritage in one comprehensive journey.'),
            'images': [
                {'src': 'images/combo-dubai.jpg', 'alt': 'Full Day Dubai Tour'},
                {'src': 'images/dubai-modern-1.jpg', 'alt': 'Modern Dubai Highlights'},
                {'src': 'images/heritage-dubai.jpg', 'alt': 'Heritage Dubai Sites'},
                {'src': 'images/burj-khalifa.png', 'alt': 'Burj Khalifa Experience'},
                {'src': 'images/Gallary_Photo1.jpg', 'alt': 'Dubai Complete Tour'},
            ]
        },
        'dubai-cruise': {
            'title': g.translations.get('marina_cruise_tour', 'Dubai Marina Cruise Experience'),
            'description': g.translations.get('marina_cruise_description', 'Enjoy a scenic dhow cruise along Dubai Marina with dinner, entertainment, and stunning waterfront views.'),
            'images': [
                {'src': 'images/marina-cruise.jpg', 'alt': 'Dubai Marina Dhow Cruise'},
                {'src': 'images/dubai-modern-2.jpg', 'alt': 'Marina Skyline Views'},
                {'src': 'images/Gallary_Photo2.jpg', 'alt': 'Cruise Experience'},
                {'src': 'images/combo-dubai.jpg', 'alt': 'Dubai Marina Tour'},
            ]
        },
        'dubai-desert': {
            'title': g.translations.get('desert_safari_tour', 'Desert Safari Tour'),
            'description': g.translations.get('desert_safari_description', 'Adventure and culture in the Arabian desert with dune bashing, camel riding, and traditional Bedouin entertainment.'),
            'images': [
                {'src': 'images/desert-safari.jpg', 'alt': 'Desert Safari Adventure'},
                {'src': 'images/Gallary_Photo3.jpg', 'alt': 'Desert Experience'},
                {'src': 'images/heritage-dubai.jpg', 'alt': 'Desert Cultural Activities'},
                {'src': 'images/combo-dubai.jpg', 'alt': 'Desert Safari Tour'},
            ]
        },
        'abudhabi-heritage': {
            'title': g.translations.get('abudhabi_heritage_tour', 'Abu Dhabi Full Day Heritage Edition Tour'),
            'description': g.translations.get('abudhabi_heritage_description', 'Explore Abu Dhabi\'s magnificent landmarks, cultural heritage, and traditional Bedouin lifestyle with visits to Grand Mosque, Presidential Palace, and Heritage Village.'),
            'images': [
                {'src': 'images/abu-dhabi-heritage.jpg', 'alt': 'Abu Dhabi Heritage Sites'},
                {'src': 'images/Gallary_Photo2.jpg', 'alt': 'Cultural Heritage Tour'},
                {'src': 'images/abu-dhabi-louvre.jpg', 'alt': 'Louvre Abu Dhabi'},
                {'src': 'images/combo-dubai.jpg', 'alt': 'Abu Dhabi Experience'},
            ]
        },
        'abudhabi-louvre': {
            'title': g.translations.get('abudhabi_louvre_tour', 'Abu Dhabi Full Day Louvre Edition Tour'),
            'description': g.translations.get('abudhabi_louvre_description', 'Experience Abu Dhabi\'s cultural treasures including the world-famous Louvre museum, majestic mosques, and architectural masterpieces.'),
            'images': [
                {'src': 'images/louvre-edition-tour.jpg', 'alt': 'Louvre Abu Dhabi Museum'},
                {'src': 'images/abu-dhabi-louvre.jpg', 'alt': 'Louvre Art Collections'},
                {'src': 'images/abu-dhabi-heritage.jpg', 'alt': 'Abu Dhabi Cultural Tour'},
                {'src': 'images/Gallary_Photo2.jpg', 'alt': 'Museum Experience'},
            ]
        },
        'northern-emirates': {
            'title': g.translations.get('northern_emirates_adventure_title', 'Northern Emirates Adventure Tours'),
            'description': g.translations.get('northern_emirates_tours_description', 'Discover the hidden treasures of Sharjah and Fujairah with scenic mountains, traditional markets, and pristine beaches.'),
            'images': [
                {'src': 'images/Gallary_Photo3.jpg', 'alt': 'Northern Emirates Landscapes'},
                {'src': 'images/heritage-dubai.jpg', 'alt': 'Traditional Emirates'},
                {'src': 'images/desert-safari.jpg', 'alt': 'Northern Adventure'},
                {'src': 'images/combo-dubai.jpg', 'alt': 'Emirates Tour'},
            ]
        }
    }
    
    gallery_data = galleries.get(gallery_type)
    if not gallery_data:
        return render_template('404.html'), 404
    
    return render_template('gallery.html', gallery=gallery_data, gallery_type=gallery_type)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

import os
import logging
from flask import Flask, render_template, request, flash, redirect, url_for, session, g

from translations import TRANSLATIONS



# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

def get_gallery_images(gallery_type=None):
    """Load gallery images from static/images/galleries folder if it exists, otherwise fallback to main images"""
    import glob
    import re
    import os
    
    def filename_to_alt_text(filename):
        """Convert filename to descriptive alt text"""
        # Remove file extension
        name = os.path.splitext(filename)[0]
        
        # Replace underscores with spaces
        name = name.replace('_', ' ')
        
        # Capitalize words
        words = name.split()
        capitalized_words = []
        
        for word in words:
            # Special handling for common UAE locations
            if word.lower() in ['dubai', 'abudhabi', 'abu', 'dhabi', 'sharjah', 'ajman', 'fujairah', 'uae']:
                if word.lower() == 'abudhabi':
                    capitalized_words.append('Abu Dhabi')
                elif word.lower() == 'abu':
                    capitalized_words.append('Abu')
                elif word.lower() == 'dhabi':
                    capitalized_words.append('Dhabi')
                else:
                    capitalized_words.append(word.capitalize())
            # Special handling for landmarks
            elif word.lower() in ['burj', 'khalifa', 'mosque', 'louvre', 'marina', 'frame', 'safari', 'desert']:
                capitalized_words.append(word.capitalize())
            # Handle numbers at the end
            elif word.isdigit():
                continue  # Skip number suffixes in alt text
            else:
                capitalized_words.append(word.capitalize())
        
        return ' '.join(capitalized_words) + ' - UAE Tour'
    
    images = []
    
    # Load from Gallaries folder for user's 42 gallery images
    if os.path.exists('static/images/Gallaries'):
        image_files = glob.glob('static/images/Gallaries/*.jpg') + glob.glob('static/images/Gallaries/*.jpeg') + glob.glob('static/images/Gallaries/*.png')
        folder_path = 'images/Gallaries/'
    else:
        # Fallback to main images folder for tour images, excluding system files
        image_files = glob.glob('static/images/*.jpg') + glob.glob('static/images/*.jpeg') + glob.glob('static/images/*.png')
        excluded_files = ['logo.png', 'logo.svg', 'partner-collaboration.png', 'Meet Menna.jpg']
        image_files = [f for f in image_files if os.path.basename(f) not in excluded_files]
        folder_path = 'images/'
    
    # Sort by filename to maintain order
    image_files.sort()
    
    for image_path in image_files:
        filename = os.path.basename(image_path)
        alt_text = filename_to_alt_text(filename)
        
        images.append({
            'src': f'{folder_path}{filename}',
            'alt': alt_text
        })
    
    return images

def load_reviews():
    """Load reviews from JSON file with fallback to default reviews"""
    import json
    try:
        with open('reviews.json', 'r', encoding='utf-8') as f:
            reviews = json.load(f)
        # Sort by timestamp, newest first
        reviews.sort(key=lambda x: x.get('timestamp', 0), reverse=True)
        return reviews
    except (FileNotFoundError, json.JSONDecodeError):
        # Fallback to default reviews if no JSON file exists
        return get_default_reviews()

def get_default_reviews():
    """Default reviews to show when no reviews are saved"""
    return [
        {
            'name': 'María González',
            'country': 'España',
            'rating': 5,
            'comment': 'Menna was an amazing guide! She showed us the real Dubai and Abu Dhabi. Speaking Spanish made everything so much easier. Highly recommended!',
            'photos': [],
            'date': '2024-03-15T10:30:00'
        },
        {
            'name': 'Carlos Méndez',
            'country': 'México',
            'rating': 5,
            'comment': 'Excellent desert safari experience! Menna knows all the best spots and the cultural explanations were perfect. Thank you!',
            'photos': [],
            'date': '2024-02-28T14:20:00'
        },
        {
            'name': 'Ana Rodríguez',
            'country': 'Argentina',
            'rating': 4,
            'comment': 'Beautiful tour of Abu Dhabi! The Sheikh Zayed Mosque was breathtaking. Professional and friendly service.',
            'photos': [],
            'date': '2024-01-22T09:15:00'
        }
    ]


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
    reviews = load_reviews()
    recent_reviews = reviews[:3]  # Get 3 most recent reviews
    return render_template('index.html', reviews=recent_reviews)


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
        import json
        import os
        from datetime import datetime
        from werkzeug.utils import secure_filename
        
        # Get form data
        name = request.form.get('name')
        country = request.form.get('country')
        email = request.form.get('email')
        rating = request.form.get('rating')
        comment = request.form.get('comment')
        photos = request.files.getlist('photos')

        # Create review_photos directory if it doesn't exist
        photos_dir = os.path.join('static', 'review_photos')
        os.makedirs(photos_dir, exist_ok=True)

        # Process photo uploads
        photo_filenames = []
        if photos:
            for photo in photos:
                if photo and photo.filename:
                    # Generate unique filename
                    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                    filename = secure_filename(f"{timestamp}_{photo.filename}")
                    photo_path = os.path.join(photos_dir, filename)
                    photo.save(photo_path)
                    photo_filenames.append(filename)

        # Create review data
        review_data = {
            'name': name,
            'country': country,
            'email': email,
            'rating': int(rating or 0),
            'comment': comment,
            'photos': photo_filenames,
            'date': datetime.now().isoformat(),
            'timestamp': datetime.now().timestamp()
        }

        # Load existing reviews or create empty list
        reviews_file = 'reviews.json'
        try:
            with open(reviews_file, 'r', encoding='utf-8') as f:
                reviews = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            reviews = []

        # Add new review
        reviews.append(review_data)

        # Save updated reviews
        with open(reviews_file, 'w', encoding='utf-8') as f:
            json.dump(reviews, f, ensure_ascii=False, indent=2)

        logging.info(f"Review saved from {name} ({country}): {rating} stars - {len(photo_filenames)} photos")

        flash(g.translations.get('thank_you_review', 'Thank you for your review! We appreciate your feedback.'), "success")
    except Exception as e:
        logging.error(f"Error processing review: {str(e)}")
        flash(g.translations.get('error_review', 'There was an error submitting your review. Please try again.'), "error")

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


@app.route('/all-reviews')
def all_reviews():
    reviews = load_reviews()
    return render_template('all-reviews.html', reviews=reviews)


# Gallery Routes
@app.route('/galleries/<gallery_type>')
def gallery_page(gallery_type):
    # Gallery data with existing images
    galleries = {
        'dubai-modern': {
            'title': g.translations.get('dubai_modern_tour', 'Dubai Half Day Modern Tour'),
            'description': g.translations.get('dubai_modern_description', 'Experience Dubai\'s futuristic skyline, luxury hotels, and iconic landmarks including Burj Khalifa, Palm Jumeirah, and Dubai Marina.'),
            'images': get_gallery_images()
        },
        'dubai-classic': {
            'title': g.translations.get('dubai_heritage_tour', 'Dubai Half Day Classic Heritage Tour'),
            'description': g.translations.get('dubai_heritage_description', 'Discover Dubai\'s traditional charm with visits to historic souks, heritage villages, and authentic cultural sites.'),
            'images': get_gallery_images()
        },
        'dubai-full': {
            'title': g.translations.get('combo_tour', 'Dubai Full Day Modern & Classic Tour'),
            'description': g.translations.get('combo_description', 'Complete Dubai experience combining modern landmarks and traditional heritage in one comprehensive journey.'),
            'images': get_gallery_images()
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

@app.route('/%23<anchor>')
def redirect_from_encoded_anchor(anchor):
    return redirect(f"/#{anchor}", code=302)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

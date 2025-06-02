import os
import logging
from datetime import datetime
from werkzeug.utils import secure_filename
from flask import Flask, render_template, request, flash, redirect, url_for, session, g
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

from translations import TRANSLATIONS

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL") or "sqlite:///reviews.db"
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}

# File upload configuration
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
UPLOAD_FOLDER = 'static/uploads/reviews'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialize database
db.init_app(app)

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Helper functions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Create database models
from models import create_models
Review = create_models(db)

# Create database tables
with app.app_context():
    db.create_all()


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
    # Get featured reviews for display
    featured_reviews = Review.query.filter_by(is_featured=True).order_by(Review.created_at.desc()).limit(6).all()
    return render_template('index.html', featured_reviews=featured_reviews)


@app.route('/agencies')
def agencies():
    return render_template('agencies.html')


@app.route('/all-reviews')
def all_reviews():
    # Get all reviews ordered by date (newest first)
    all_reviews_data = Review.query.order_by(Review.created_at.desc()).all()
    return render_template('all_reviews.html', reviews=all_reviews_data)


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
        # Get form data
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        country = request.form.get('country', '').strip()
        tour = request.form.get('tour', '').strip()
        rating = request.form.get('rating', '').strip()
        comment = request.form.get('comment', '').strip()
        visit_date = request.form.get('visit_date', '').strip()
        
        # Validation - Name and rating are required
        if not name:
            flash("Name is required", "error")
            return redirect(url_for('index', _anchor='reviews'))
            
        if not rating or not rating.isdigit() or int(rating) < 1 or int(rating) > 5:
            flash("Valid rating (1-5 stars) is required", "error")
            return redirect(url_for('index', _anchor='reviews'))
        
        # Handle file uploads
        uploaded_photos = []
        if 'photos' in request.files:
            files = request.files.getlist('photos')
            for file in files:
                if file and file.filename and file.filename != '':
                    if allowed_file(file.filename):
                        # Generate unique filename
                        filename = secure_filename(file.filename)
                        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S_')
                        filename = timestamp + filename
                        
                        # Save file
                        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                        file.save(file_path)
                        uploaded_photos.append(filename)
                    else:
                        flash("Invalid file type. Please upload PNG, JPG, JPEG, or GIF files.", "error")
                        return redirect(url_for('index', _anchor='reviews'))
        
        # Create review record
        review = Review(
            name=name,
            email=email if email else None,
            nationality=country if country else None,
            tour=tour if tour else None,
            rating=int(rating),
            comment=comment if comment else None,
            photos=','.join(uploaded_photos) if uploaded_photos else None,
            visit_date=visit_date if visit_date else None,
            is_featured=True  # Auto-feature new reviews
        )
        
        # Save to database
        db.session.add(review)
        db.session.commit()
        
        flash("Thank you so much for sharing your story! Your words mean so much to me, and they help other travelers feel the spirit of Sun y Sol. I'm grateful to have been a part of your adventure here in the UAE. Hope our paths cross again soon! — Menna", "success")
        logging.info(f"Review submitted by {name} with rating {rating}")
        
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error processing review: {str(e)}")
        flash("Sorry, there was an error submitting your review. Please try again.", "error")

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

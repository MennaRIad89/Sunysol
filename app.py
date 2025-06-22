import os
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import json
from werkzeug.utils import secure_filename
from flask import Flask, render_template, request, flash, redirect, url_for, session, g, jsonify

from translations import TRANSLATIONS



# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

def get_gallery_images(gallery_type=None):
    """Load gallery images based on gallery type or fallback to main gallery"""
    import glob
    import os
    
    def filename_to_alt_text(filename):
        """Convert filename to descriptive alt text"""
        name = os.path.splitext(filename)[0]
        name = name.replace('_', ' ')
        
        words = name.split()
        capitalized_words = []
        
        for word in words:
            if word.lower() in ['dubai', 'abudhabi', 'abu', 'dhabi', 'sharjah', 'ajman', 'fujairah', 'uae']:
                if word.lower() == 'abudhabi':
                    capitalized_words.append('Abu Dhabi')
                elif word.lower() == 'abu':
                    capitalized_words.append('Abu')
                elif word.lower() == 'dhabi':
                    capitalized_words.append('Dhabi')
                else:
                    capitalized_words.append(word.capitalize())
            elif word.lower() in ['burj', 'khalifa', 'mosque', 'louvre', 'marina', 'frame', 'safari', 'desert']:
                capitalized_words.append(word.capitalize())
            elif word.isdigit():
                continue
            else:
                capitalized_words.append(word.capitalize())
        
        return ' '.join(capitalized_words) + ' - UAE Tour'
    
    images = []
    
    # Check for specific tour gallery first
    if gallery_type:
        tour_gallery_path = f'static/images/Tour Galleries/{gallery_type}'
        if os.path.exists(tour_gallery_path):
            image_files = (glob.glob(f'{tour_gallery_path}/*.jpg') + 
                          glob.glob(f'{tour_gallery_path}/*.jpeg') + 
                          glob.glob(f'{tour_gallery_path}/*.png'))
            folder_path = f'images/Tour Galleries/{gallery_type}/'
            
            if image_files:  # If tour-specific images exist, use them
                image_files.sort()
                for image_path in image_files:
                    filename = os.path.basename(image_path)
                    alt_text = filename_to_alt_text(filename)
                    images.append({
                        'src': f'{folder_path}{filename}',
                        'alt': alt_text
                    })
                return images
    
    # Fallback to main Gallaries folder
    if os.path.exists('static/images/Gallaries'):
        image_files = (glob.glob('static/images/Gallaries/*.jpg') + 
                      glob.glob('static/images/Gallaries/*.jpeg') + 
                      glob.glob('static/images/Gallaries/*.png'))
        folder_path = 'images/Gallaries/'
    else:
        # Final fallback to main images folder
        image_files = (glob.glob('static/images/*.jpg') + 
                      glob.glob('static/images/*.jpeg') + 
                      glob.glob('static/images/*.png'))
        excluded_files = ['logo.png', 'logo.svg', 'partner-collaboration.png', 'Meet Menna.jpg']
        image_files = [f for f in image_files if os.path.basename(f) not in excluded_files]
        folder_path = 'images/'
    
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
    gallery_images = get_gallery_images()
    return render_template('index.html', reviews=recent_reviews, gallery_images=gallery_images)


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
        message_type = request.form.get('message_type', 'contact')
        
        if message_type == 'tour_booking':
            # Handle tour booking request
            tour_name = request.form.get('tour_name')
            phone = request.form.get('phone')
            tour_date = request.form.get('tour_date')
            group_size = request.form.get('group_size')
            tour_type = request.form.get('tour_type')
            special_requests = request.form.get('special_requests')
            
            # Send email notification to booking@sunysol.ae
            try:
                send_booking_email(name, email, phone, tour_name, tour_date, group_size, tour_type, special_requests)
                logging.info(f"Booking email sent successfully for {tour_name} from {name}")
            except Exception as email_error:
                logging.error(f"Failed to send booking email: {str(email_error)}")
            
            logging.info(
                f"Tour booking request from {name} ({email}, {phone}) for {tour_name} on {tour_date}, group size: {group_size}, type: {tour_type}, requests: {special_requests} - Forward to booking@sunysol.ae"
            )
            
            return jsonify({'status': 'success', 'message': 'Booking request received'})
        else:
            # Handle regular contact form
            traveler_type = request.form.get('traveler_type')
            message = request.form.get('message')
            
            # Send email notification to info@sunysol.ae
            try:
                send_contact_email(name, email, traveler_type, message)
                logging.info(f"Contact email sent successfully from {name}")
            except Exception as email_error:
                logging.error(f"Failed to send contact email: {str(email_error)}")
            
            logging.info(
                f"Contact message received from {name} ({email}), {traveler_type}: {message} - Forward to info@sunysol.ae"
            )
            
            flash(g.translations['thank_you_message'], "success")

    except Exception as e:
        logging.error(f"Error processing form: {str(e)}")
        if message_type == 'tour_booking':
            return jsonify({'status': 'error', 'message': 'Error processing booking request'})
        else:
            flash(g.translations['error_message'], "error")

    return redirect(url_for('index', _anchor='contact'))


def send_booking_email(name, email, phone, tour_name, tour_date, group_size, tour_type, special_requests):
    """Send booking notification email to booking@sunysol.ae"""
    
    # Email configuration for booking emails (Zoho)
    smtp_server = 'smtp.zoho.com'
    smtp_port = 465
    smtp_username = 'booking@sunysol.ae'
    smtp_password = os.environ.get('BOOKING_SMTP_PASSWORD', '')
    
    if not smtp_password:
        # Log that email sending is skipped due to missing configuration
        logging.info("Booking email configuration not found - booking logged but not emailed")
        return
    
    # Create message
    msg = MIMEMultipart()
    msg['From'] = smtp_username
    msg['To'] = 'booking@sunysol.ae'
    msg['Subject'] = f'New Tour Booking Request - {tour_name}'
    
    # Email body
    body = f"""
New Tour Booking Request

Tour Details:
- Tour: {tour_name}
- Date: {tour_date or 'Flexible'}
- Group Size: {group_size}
- Tour Type: {tour_type or 'Private Tour'}

Customer Information:
- Name: {name}
- Email: {email}
- Phone: {phone}

Special Requests:
{special_requests or 'None'}

Please contact the customer within 24 hours to confirm availability and provide pricing.

---
Sun y Sol Tours
www.sunysol.ae
    """
    
    msg.attach(MIMEText(body, 'plain'))
    
    # Send email using SSL for Zoho (booking emails)
    server = smtplib.SMTP_SSL(smtp_server, smtp_port)
    server.login(smtp_username, smtp_password)
    server.send_message(msg)
    server.quit()


def send_contact_email(name, email, traveler_type, message):
    """Send contact form notification email to info@sunysol.ae"""
    
    # Email configuration for contact emails (Zoho)
    smtp_server = 'smtp.zoho.com'
    smtp_port = 465
    smtp_username = 'info@sunysol.ae'
    smtp_password = os.environ.get('CONTACT_SMTP_PASSWORD', '')
    
    if not smtp_password:
        logging.info("Contact email configuration not found - contact message logged but not emailed")
        return
    
    # Create message
    msg = MIMEMultipart()
    msg['From'] = smtp_username
    msg['To'] = 'info@sunysol.ae'
    msg['Subject'] = f'New Contact Message from {name}'
    
    # Email body
    body = f"""
New Contact Form Submission

Customer Information:
- Name: {name}
- Email: {email}
- Traveler Type: {traveler_type}

Message:
{message}

---
Sun y Sol Tours
www.sunysol.ae
    """
    
    msg.attach(MIMEText(body, 'plain'))
    
    # Send email using SSL for Zoho (contact emails)
    server = smtplib.SMTP_SSL(smtp_server, smtp_port)
    server.login(smtp_username, smtp_password)
    server.send_message(msg)
    server.quit()


@app.route('/all-reviews')
def all_reviews():
    reviews = load_reviews()
    return render_template('all-reviews.html', reviews=reviews)


# Gallery Routes
@app.route('/tour-galleries/<gallery_type>')
def gallery_page(gallery_type):
    # Gallery data with existing images
    galleries = {
        'dubai-modern': {
            'title': g.translations.get('dubai_modern_tour', 'Dubai Half Day Modern Tour'),
            'description': g.translations.get('dubai_modern_description', 'Experience Dubai\'s futuristic skyline, luxury hotels, and iconic landmarks including Burj Khalifa, Palm Jumeirah, and Dubai Marina.'),
            'images': get_gallery_images('dubai-modern')
        },
        'dubai-classic': {
            'title': g.translations.get('dubai_heritage_tour', 'Dubai Half Day Classic Heritage Tour'),
            'description': g.translations.get('dubai_heritage_description', 'Discover Dubai\'s traditional charm with visits to historic souks, heritage villages, and authentic cultural sites.'),
            'images': get_gallery_images('dubai-classic')
        },
        'dubai-full': {
            'title': g.translations.get('combo_tour', 'Dubai Full Day Modern & Classic Tour'),
            'description': g.translations.get('combo_description', 'Complete Dubai experience combining modern landmarks and traditional heritage in one comprehensive journey.'),
            'images': get_gallery_images('dubai-full')
        },
        'dubai-cruise': {
            'title': g.translations.get('marina_cruise_tour', 'Dubai Marina Cruise Experience'),
            'description': g.translations.get('marina_cruise_description', 'Enjoy a scenic dhow cruise along Dubai Marina with dinner, entertainment, and stunning waterfront views.'),
            'images': get_gallery_images('dubai-cruise')
        },
        'dubai-desert': {
            'title': g.translations.get('desert_safari_tour', 'Desert Safari Tour'),
            'description': g.translations.get('desert_safari_description', 'Adventure and culture in the Arabian desert with dune bashing, camel riding, and traditional Bedouin entertainment.'),
            'images': get_gallery_images('dubai-desert')
        },
        'abudhabi-city': {
            'title': g.translations.get('abudhabi_city_tour', 'Abu Dhabi City Tour'),
            'description': g.translations.get('abudhabi_city_description', 'Explore the capital\'s magnificent architecture, cultural landmarks, and modern attractions including Sheikh Zayed Mosque.'),
            'images': get_gallery_images('abudhabi-city')
        },
        'abudhabi-louvre': {
            'title': g.translations.get('abudhabi_louvre_tour', 'Abu Dhabi Louvre Museum Tour'),
            'description': g.translations.get('abudhabi_louvre_description', 'Discover world-class art and cultural treasures at the stunning Louvre Abu Dhabi museum.'),
            'images': get_gallery_images('abudhabi-louvre')
        },
        'northern-emirates': {
            'title': g.translations.get('northern_emirates_tour', 'Northern Emirates Discovery'),
            'description': g.translations.get('northern_emirates_description', 'Journey through the diverse landscapes and hidden gems of Sharjah, Ajman, Ras Al Khaimah, and Fujairah.'),
            'images': get_gallery_images('northern-emirates')
        }
    }
    
    gallery_data = galleries.get(gallery_type)
    if not gallery_data:
        # Handle legacy routes
        if gallery_type == 'abudhabi-heritage':
            return redirect('/tour-galleries/abudhabi-city', code=301)
        return render_template('404.html'), 404
    
    return render_template('gallery.html', gallery=gallery_data, gallery_type=gallery_type)

@app.route('/%23<anchor>')
def redirect_from_encoded_anchor(anchor):
    return redirect(f"/#{anchor}", code=302)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

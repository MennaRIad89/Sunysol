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
        logging.info(f"Review received from {name} ({email}) from {country} about {tour}: {comment}")
        
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
        logging.info(f"Contact message received from {name} ({email}), {traveler_type}: {message}")
        
        flash(g.translations['thank_you_message'], "success")
    except Exception as e:
        logging.error(f"Error processing contact form: {str(e)}")
        flash(g.translations['error_message'], "error")
    
    return redirect(url_for('index', _anchor='contact'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

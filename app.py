import os
import logging
from flask import Flask, render_template, request, flash, redirect, url_for

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

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
        
        flash("Thank you for your review! We appreciate your feedback.", "success")
    except Exception as e:
        logging.error(f"Error processing review: {str(e)}")
        flash("There was an error submitting your review. Please try again.", "error")
    
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
        
        flash("Thank you for reaching out! We'll get back to you soon.", "success")
    except Exception as e:
        logging.error(f"Error processing contact form: {str(e)}")
        flash("There was an error sending your message. Please try again.", "error")
    
    return redirect(url_for('index', _anchor='contact'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

from datetime import datetime

def create_models(db):
    class Review(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(100), nullable=False)
        email = db.Column(db.String(120), nullable=True)
        nationality = db.Column(db.String(50), nullable=True)
        tour = db.Column(db.String(100), nullable=True)
        rating = db.Column(db.Integer, nullable=False)
        comment = db.Column(db.Text, nullable=True)
        photos = db.Column(db.Text, nullable=True)  # Store comma-separated photo filenames
        visit_date = db.Column(db.String(20), nullable=True)  # Store visit month/year
        created_at = db.Column(db.DateTime, default=datetime.utcnow)
        is_featured = db.Column(db.Boolean, default=False)
        
        def __repr__(self):
            return f'<Review {self.name} - {self.rating} stars>'
    
    return Review
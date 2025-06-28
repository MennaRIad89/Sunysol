from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


class AdminUser(UserMixin):
    def __init__(self, username=None, email=None):
        self.username = username
        self.email = email
        self.password_hash = None
        self.is_admin_active = True  # renamed to avoid conflict
        self.created_at = datetime.utcnow()
        self.last_login = None
        self.id = None
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def __repr__(self):
        return f'<AdminUser {self.username}>'


# Simplified model for now - we'll use file system instead of database for images
class GalleryImage():
    def __init__(self, filename, gallery_type):
        self.filename = filename
        self.gallery_type = gallery_type
        self.upload_date = datetime.utcnow()
    
    def __repr__(self):
        return f'<GalleryImage {self.filename} in {self.gallery_type}>'
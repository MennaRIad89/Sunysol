# Sun y Sol - UAE Tour Guide Website

## Overview

Sun y Sol is a comprehensive Flask-based tourism website for a Spanish-speaking tour guide operating in the UAE. The application serves as a digital platform to showcase tour offerings, facilitate bookings, and build trust through customer reviews and galleries. The site targets Spanish-speaking travelers and travel agencies looking for authentic UAE experiences.

## System Architecture

### Frontend Architecture
- **Framework**: Server-side rendered HTML templates with Jinja2
- **Styling**: Custom CSS with responsive design principles
- **JavaScript**: Vanilla JS for interactive components (galleries, accordions, forms)
- **Layout**: Template inheritance pattern with base layout
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop

### Backend Architecture
- **Framework**: Flask (Python web framework)
- **Template Engine**: Jinja2 for dynamic content rendering
- **Session Management**: Flask sessions for language preferences
- **File Handling**: Static file serving for images and assets
- **Internationalization**: Custom translation system supporting English/Spanish

### Data Storage Solutions
- **Reviews**: JSON file-based storage (`reviews.json`)
- **Static Content**: File system storage for images and assets
- **Translations**: Python dictionary-based translation system
- **Configuration**: Environment variables for sensitive data

## Key Components

### 1. Multilingual Support
- **Translation System**: Centralized translation dictionary in `translations.py`
- **Language Switching**: Dynamic language toggle with session persistence
- **Content Localization**: All user-facing content supports EN/ES translation

### 2. Tour Management
- **Tour Pages**: Dedicated pages for Dubai, Abu Dhabi, and Northern Emirates
- **Interactive Cards**: Expandable tour preview cards with detailed itineraries
- **Gallery Integration**: Photo galleries linked to specific tours
- **Booking Integration**: Contact form integration for tour reservations

### 3. Review System
- **Review Collection**: Customer review form with photo upload capability
- **Review Display**: Homepage preview and dedicated all-reviews page
- **Photo Management**: Automated photo handling and storage
- **Data Persistence**: JSON-based review storage with timestamp tracking

### 4. Agency Portal
- **B2B Section**: Dedicated page for travel agency partnerships
- **Service Showcase**: Comprehensive listing of agency-oriented services
- **Contact Integration**: Streamlined communication for business inquiries

### 5. Gallery System
- **Lightbox Functionality**: Full-screen image viewing with navigation
- **Responsive Galleries**: Adaptive grid layouts for different screen sizes
- **Tour-Specific Galleries**: Individual gallery pages for each tour type

## Data Flow

### 1. Request Processing
```
User Request → Flask Router → Template Selection → Translation Loading → Response Rendering
```

### 2. Language Switching
```
Language Toggle → Session Update → Page Refresh → New Language Context
```

### 3. Review Submission
```
Form Submission → File Upload Processing → JSON Data Storage → Success Feedback
```

### 4. Tour Browsing
```
Tour Page Access → Template Rendering → Interactive Elements Loading → Gallery Integration
```

## External Dependencies

### Production Dependencies
- **Flask**: Web framework and routing
- **Flask-SQLAlchemy**: Database ORM (prepared for future database integration)
- **Gunicorn**: WSGI HTTP Server for production deployment
- **psycopg2-binary**: PostgreSQL adapter (prepared for future database migration)
- **email-validator**: Email validation for contact forms

### Development Tools
- **Python 3.11**: Runtime environment
- **uv**: Modern Python package manager
- **Git**: Version control system

### External Services
- **Replit**: Hosting and deployment platform
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Typography (Playfair Display, Raleway)

## Deployment Strategy

### Current Setup
- **Platform**: Replit with autoscale deployment
- **Web Server**: Gunicorn with multiple worker processes
- **Port Configuration**: Internal port 5000, external port 80
- **Process Management**: Replit workflow automation

### Database Preparation
- **Current**: JSON file storage for reviews
- **Future**: PostgreSQL database integration (infrastructure already in place)
- **Migration Path**: Drizzle ORM prepared for database transition

### Static Assets
- **Images**: Served directly from Flask static folder
- **CSS/JS**: Bundled and served as static assets
- **Uploads**: Review photos stored in static/review_photos/

## Recent Changes

- June 21, 2025: Fixed gallery system to load from static/images/Gallaries/ folder containing 42 user gallery images with auto-generated descriptive alt text
- June 21, 2025: Updated gallery system to automatically generate descriptive alt text from filenames and load all user images dynamically
- June 21, 2025: Implemented comprehensive SEO optimization including meta tags, structured data, sitemap, and robots.txt
- June 21, 2025: Cleared all test reviews and photos, ready for real customer reviews
- June 21, 2025: Connected WhatsApp button to business number (+971564649609)
- June 21, 2025: Completed full Spanish translation system for all homepage sections including Travel Agencies and Contact Us sections
- June 21, 2025: Enhanced country dropdown with 90+ countries and keyboard search functionality
- June 21, 2025: Updated review display format to show reviewer name (bold) and country (small text) separately
- June 21, 2025: Fixed tour navigation background color consistency (#FFF8E9) across all sections

## Changelog

- June 17, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.
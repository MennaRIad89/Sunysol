import logging
from app import app

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# This ensures gunicorn can find the app object
application = app

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

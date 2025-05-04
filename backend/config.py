# Configuration settings 
"""
Configuration settings for the FDPA backend
"""
import os

# Base paths
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(PROJECT_ROOT, 'uploads')
MODELS_FOLDER = os.path.join(PROJECT_ROOT, 'models', 'saved_models')

# Ensure directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(MODELS_FOLDER, exist_ok=True)

# Model paths
IMAGE_MODEL_PATH = os.path.join(MODELS_FOLDER, 'image_detector.h5')
VIDEO_MODEL_PATH = os.path.join(MODELS_FOLDER, 'video_detector.h5')
AUDIO_MODEL_PATH = os.path.join(MODELS_FOLDER, 'audio_detector.h5')

# API settings
API_HOST = os.environ.get('API_HOST', '0.0.0.0')
API_PORT = int(os.environ.get('API_PORT', 5000))
DEBUG = os.environ.get('DEBUG', 'True').lower() == 'true'

# File upload settings
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB
ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg'}
ALLOWED_VIDEO_EXTENSIONS = {'mp4', 'avi', 'mov'}
ALLOWED_AUDIO_EXTENSIONS = {'wav', 'mp3'}
import React from 'react';
import { Link } from 'react-router-dom';
import { FaImage, FaVideo, FaVolumeUp, FaShieldAlt } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">
          Fake/Deepfake Prevention and Analysis
        </h1>
        <p className="hero-subtitle">
          Advanced AI-powered solution to detect manipulated media
        </p>
        <div className="hero-buttons">
          <Link to="/detector" className="hero-button primary-button">
            Start Detection
          </Link>
          <Link to="/about" className="hero-button secondary-button">
            Learn More
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Detection Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaImage />
            </div>
            <h3 className="feature-title">Image Detection</h3>
            <p className="feature-description">
              Analyze images for signs of manipulation using advanced convolutional neural networks.
            </p>
            <Link to="/detector/image" className="feature-link">
              Try Image Detection
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaVideo />
            </div>
            <h3 className="feature-title">Video Detection</h3>
            <p className="feature-description">
              Detect frame-by-frame inconsistencies and facial manipulation in video content.
            </p>
            <Link to="/detector/video" className="feature-link">
              Try Video Detection
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaVolumeUp />
            </div>
            <h3 className="feature-title">Audio Detection</h3>
            <p className="feature-description">
              Identify artificially generated or manipulated speech using spectrogram analysis.
            </p>
            <Link to="/detector/audio" className="feature-link">
              Try Audio Detection
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>
            <h3 className="feature-title">Comprehensive Reports</h3>
            <p className="feature-description">
              Get detailed analysis reports with confidence scores and forensic indicators.
            </p>
            <Link to="/resources" className="feature-link">
              View Resources
            </Link>
          </div>
        </div>
      </div>

      <div className="info-section">
        <div className="info-content">
          <h2 className="section-title">Why Use FDPA?</h2>
          <div className="info-grid">
            <div className="info-item">
              <h3 className="info-title">Accuracy</h3>
              <p className="info-description">
                Our models achieve over 92% accuracy on benchmark datasets, providing reliable detection results.
              </p>
            </div>
            <div className="info-item">
              <h3 className="info-title">Ease of Use</h3>
              <p className="info-description">
                Simple upload interface with instant results, no technical knowledge required.
              </p>
            </div>
            <div className="info-item">
              <h3 className="info-title">Privacy</h3>
              <p className="info-description">
                All processing happens on our secure servers with no data retention after analysis.
              </p>
            </div>
            <div className="info-item">
              <h3 className="info-title">Comprehensive</h3>
              <p className="info-description">
                Detect manipulations across images, videos, and audio with a single platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2 className="cta-title">Ready to detect deepfakes?</h2>
        <p className="cta-description">
          Start using our powerful detection tools to verify content authenticity.
        </p>
        <Link to="/detector" className="cta-button">
          Get Started Now
        </Link>
      </div>
    </div>
  );
};

export default Home;
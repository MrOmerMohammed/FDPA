import React from 'react';
import './About.css';
import { FaChartLine, FaShieldAlt, FaCode, FaUsers } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">About FDPA Project</h1>
        <p className="about-subtitle">
          Combating deepfakes with advanced AI-powered detection
        </p>
      </div>

      <div className="about-section">
        <h2 className="section-title">Project Overview</h2>
        <p className="section-text">
          The Fake/Deepfake Prevention and Analysis (FDPA) project aims to combat the growing threat of deepfake
          content—images, videos, and audio—using AI-powered detection techniques. Leveraging convolutional neural
          networks, pre-trained models, and forensic analysis methods, FDPA provides a user-friendly interface
          to identify fake media in real time.
        </p>
        <p className="section-text">
          This tool is especially useful in journalism, security, and digital content authentication, helping
          users verify the authenticity of digital media in an age where AI-generated content is becoming
          increasingly sophisticated and difficult to distinguish from genuine content.
        </p>
      </div>

      <div className="about-section">
        <h2 className="section-title">Key Objectives</h2>
        <div className="objectives-grid">
          <div className="objective-card">
            <div className="objective-icon">
              <FaShieldAlt />
            </div>
            <h3 className="objective-title">Detect AI-Generated Content</h3>
            <p className="objective-text">
              Identify deepfake images, videos, and audio using specialized detection algorithms.
            </p>
          </div>
          <div className="objective-card">
            <div className="objective-icon">
              <FaUsers />
            </div>
            <h3 className="objective-title">User-Friendly Interface</h3>
            <p className="objective-text">
              Offer a simple interface for end-users to upload media and get authenticity feedback.
            </p>
          </div>
          <div className="objective-card">
            <div className="objective-icon">
              <FaCode />
            </div>
            <h3 className="objective-title">Scalable Architecture</h3>
            <p className="objective-text">
              Build a scalable architecture for integrating future datasets and detection models.
            </p>
          </div>
          <div className="objective-card">
            <div className="objective-icon">
              <FaChartLine />
            </div>
            <h3 className="objective-title">Digital Trust</h3>
            <p className="objective-text">
              Contribute toward digital trust and content integrity in online spaces.
            </p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2 className="section-title">Technology Stack</h2>
        <div className="tech-table">
          <div className="tech-row">
            <div className="tech-cell header">Component</div>
            <div className="tech-cell header">Technology</div>
          </div>
          <div className="tech-row">
            <div className="tech-cell">Frontend</div>
            <div className="tech-cell">ReactJS</div>
          </div>
          <div className="tech-row">
            <div className="tech-cell">Backend</div>
            <div className="tech-cell">Python (Flask/Django)</div>
          </div>
          <div className="tech-row">
            <div className="tech-cell">Model Framework</div>
            <div className="tech-cell">TensorFlow / Keras</div>
          </div>
          <div className="tech-row">
            <div className="tech-cell">Dataset</div>
            <div className="tech-cell">FaceForensics++, Kaggle</div>
          </div>
          <div className="tech-row">
            <div className="tech-cell">Deployment</div>
            <div className="tech-cell">AWS / Render / Docker</div>
          </div>
          <div className="tech-row">
            <div className="tech-cell">Media Processing</div>
            <div className="tech-cell">OpenCV, Librosa</div>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2 className="section-title">Project Status</h2>
        <div className="status-table">
          <div className="status-row">
            <div className="status-cell header">Phase</div>
            <div className="status-cell header">Task</div>
            <div className="status-cell header">Status</div>
          </div>
          <div className="status-row">
            <div className="status-cell">I</div>
            <div className="status-cell">Image detection model implementation</div>
            <div className="status-cell complete">✅ Done</div>
          </div>
          <div className="status-row">
            <div className="status-cell">II</div>
            <div className="status-cell">Video frame extraction + analysis</div>
            <div className="status-cell in-progress">🔄 In progress</div>
          </div>
          <div className="status-row">
            <div className="status-cell">III</div>
            <div className="status-cell">Audio deepfake detection</div>
            <div className="status-cell pending">⏳ Pending</div>
          </div>
          <div className="status-row">
            <div className="status-cell">IV</div>
            <div className="status-cell">Backend & API integration</div>
            <div className="status-cell pending">⏳ Pending</div>
          </div>
          <div className="status-row">
            <div className="status-cell">V</div>
            <div className="status-cell">Frontend integration + UI polish</div>
            <div className="status-cell pending">⏳ Pending</div>
          </div>
          <div className="status-row">
            <div className="status-cell">VI</div>
            <div className="status-cell">Final Testing + Deployment</div>
            <div className="status-cell pending">⏳ Pending</div>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2 className="section-title">Results (Phase I)</h2>
        <div className="results-container">
          <div className="result-item">
            <h3 className="result-label">Accuracy:</h3>
            <div className="result-value">92.5% on validation set</div>
          </div>
          <div className="result-item">
            <h3 className="result-label">Model:</h3>
            <div className="result-value">EfficientNetB0 fine-tuned</div>
          </div>
          <div className="result-item">
            <h3 className="result-label">Misclassified rate:</h3>
            <div className="result-value">7.5%</div>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2 className="section-title">Future Scope</h2>
        <ul className="future-list">
          <li className="future-item">Support for social media integration</li>
          <li className="future-item">Browser plugin for real-time content verification</li>
          <li className="future-item">Use of GAN-based countermeasures</li>
          <li className="future-item">Model ensemble strategies for improved accuracy</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
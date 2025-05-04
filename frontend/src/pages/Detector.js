import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ImageDetector from '../components/ImageDetector';
import VideoDetector from '../components/VideoDetector';
import AudioDetector from '../components/AudioDetector';
import ResultDisplay from '../components/ResultDisplay';
import './Detector.css';
import { FaImage, FaVideo, FaVolumeUp } from 'react-icons/fa';

const Detector = () => {
  const { mediaType } = useParams();
  const [detectionResult, setDetectionResult] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null);

  // Reset results when changing detector type
  const resetResults = () => {
    setDetectionResult(null);
    setMediaUrl(null);
  };

  // Handle detection completion
  const handleDetectionComplete = (result, url) => {
    setDetectionResult(result);
    setMediaUrl(url);
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Validate media type
  const validMediaTypes = ['image', 'video', 'audio'];
  if (mediaType && !validMediaTypes.includes(mediaType)) {
    return <Navigate to="/detector/image" replace />;
  }

  // If no media type is specified, default to image
  if (!mediaType) {
    return <Navigate to="/detector/image" replace />;
  }

  return (
    <div className="detector-page">
      <div className="detector-header">
        <h1 className="detector-title">Deepfake Detection</h1>
        <p className="detector-description">
          Upload media to analyze for potential manipulation or AI generation
        </p>
      </div>

      <div className="media-tabs">
        <a 
          href="/detector/image"
          className={`media-tab ${mediaType === 'image' ? 'active' : ''}`}
          onClick={() => resetResults()}
        >
          <FaImage /> Image
        </a>
        <a 
          href="/detector/video"
          className={`media-tab ${mediaType === 'video' ? 'active' : ''}`}
          onClick={() => resetResults()}
        >
          <FaVideo /> Video
        </a>
        <a 
          href="/detector/audio"
          className={`media-tab ${mediaType === 'audio' ? 'active' : ''}`}
          onClick={() => resetResults()}
        >
          <FaVolumeUp /> Audio
        </a>
      </div>

      <div className="detector-content">
        {mediaType === 'image' && (
          <ImageDetector onDetectionComplete={handleDetectionComplete} />
        )}
        {mediaType === 'video' && (
          <VideoDetector onDetectionComplete={handleDetectionComplete} />
        )}
        {mediaType === 'audio' && (
          <AudioDetector onDetectionComplete={handleDetectionComplete} />
        )}
      </div>

      {detectionResult && (
        <div id="results-section" className="results-section">
          <ResultDisplay 
            result={detectionResult} 
            mediaType={mediaType}
            mediaUrl={mediaUrl}
          />
        </div>
      )}

      <div className="detector-info">
        <h2 className="info-title">How It Works</h2>
        {mediaType === 'image' && (
          <div className="info-content">
            <p>Our image deepfake detector uses state-of-the-art convolutional neural networks trained on the FaceForensics++ dataset to identify signs of manipulation in images. The system analyzes:</p>
            <ul>
              <li>Pixel-level inconsistencies</li>
              <li>Facial feature abnormalities</li>
              <li>Lighting and shadow inconsistencies</li>
              <li>Image noise patterns</li>
              <li>Compression artifacts</li>
            </ul>
            <p>The model has achieved a 92.5% accuracy on validation datasets, but please note that very high-quality deepfakes may still be difficult to detect.</p>
          </div>
        )}
        {mediaType === 'video' && (
          <div className="info-content">
            <p>Our video deepfake detector analyzes individual frames and temporal consistency between frames to detect manipulation. The system identifies:</p>
            <ul>
              <li>Face warping and blending artifacts</li>
              <li>Temporal inconsistencies</li>
              <li>Unnatural facial movements</li>
              <li>Blinking patterns</li>
              <li>Edge artifacts around manipulated regions</li>
            </ul>
            <p>For best results, upload videos with clear facial visibility and good lighting conditions.</p>
          </div>
        )}
        {mediaType === 'audio' && (
          <div className="info-content">
            <p>Our audio deepfake detector works by analyzing spectrograms and waveform patterns to identify signs of synthetic speech. The system detects:</p>
            <ul>
              <li>Unnatural speech patterns</li>
              <li>Frequency inconsistencies</li>
              <li>Artificial voice artifacts</li>
              <li>Abnormal phoneme transitions</li>
              <li>Background noise patterns</li>
            </ul>
            <p>For best results, upload audio with clear speech and minimal background noise.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detector;
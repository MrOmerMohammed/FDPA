import React from 'react';
import './ResultDisplay.css';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';

const ResultDisplay = ({ result, mediaType, mediaUrl }) => {
  if (!result) return null;

  const { prediction, confidence, details } = result;
  const isReal = prediction === 'real';
  const confidencePercent = (confidence * 100).toFixed(2);

  return (
    <div className="result-container">
      <h2 className="result-title">Detection Results</h2>
      
      <div className="result-media-container">
        {mediaType === 'image' && mediaUrl && (
          <img src={mediaUrl} alt="Analyzed media" className="result-media" />
        )}
        {mediaType === 'video' && mediaUrl && (
          <video src={mediaUrl} controls className="result-media" />
        )}
        {mediaType === 'audio' && mediaUrl && (
          <audio src={mediaUrl} controls className="result-audio" />
        )}
      </div>

      <div className={`result-card ${isReal ? 'result-real' : 'result-fake'}`}>
        <div className="result-icon">
          {isReal ? (
            <FaCheckCircle className="icon-real" />
          ) : (
            <FaTimesCircle className="icon-fake" />
          )}
        </div>
        <div className="result-content">
          <h3 className="result-prediction">
            {isReal ? 'Real Content' : 'Fake/Deepfake Content'}
          </h3>
          <p className="result-confidence">
            Confidence: <span className="confidence-value">{confidencePercent}%</span>
          </p>
        </div>
      </div>

      <div className="result-details">
        <h3 className="details-title">
          <FaInfoCircle className="details-icon" /> Analysis Details
        </h3>
        <div className="details-content">
          {details && details.map((detail, index) => (
            <div key={index} className="detail-item">
              <h4 className="detail-name">{detail.name}</h4>
              <div className="detail-bar-container">
                <div 
                  className="detail-bar" 
                  style={{ width: `${detail.value * 100}%` }}
                ></div>
              </div>
              <span className="detail-value">{(detail.value * 100).toFixed(2)}%</span>
              <p className="detail-description">{detail.description}</p>
            </div>
          ))}
          {!details && (
            <p className="no-details">No detailed analysis available for this content.</p>
          )}
        </div>
      </div>

      <div className="result-explanation">
        <h3 className="explanation-title">What Does This Mean?</h3>
        <p className="explanation-text">
          {isReal 
            ? `This content appears to be authentic with ${confidencePercent}% confidence. However, keep in mind that detection technology is not perfect, and very sophisticated deepfakes might still go undetected.`
            : `This content shows characteristics of being manipulated or AI-generated with ${confidencePercent}% confidence. The analysis has detected patterns typically associated with synthetic media.`
          }
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay;
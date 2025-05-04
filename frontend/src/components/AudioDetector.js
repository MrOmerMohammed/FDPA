import React, { useState } from 'react';
import ResultDisplay from './ResultDisplay';
import './MediaDetector.css';

const AudioDetector = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      // Check if file is an audio
      if (!selectedFile.type.match('audio.*')) {
        setError('Please select an audio file (WAV, MP3)');
        setFile(null);
        setPreview(null);
        return;
      }
      
      setError(null);
      setFile(selectedFile);
      
      // Create audio preview
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select an audio file');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('http://localhost:5000/api/detect/audio', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error detecting audio:', err);
      setError('Error processing audio. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="media-detector">
      <h2>Audio Deepfake Detection</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      {!result ? (
        <form onSubmit={handleSubmit}>
          <div className="file-upload-container">
            <label className="file-upload-label">
              {preview ? (
                <div className="audio-preview">
                  <i className="fas fa-music"></i>
                  <audio src={preview} controls className="audio-player"></audio>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <i className="fas fa-music"></i>
                  <p>Click to select an audio file</p>
                </div>
              )}
              <input
                type="file"
                onChange={handleFileChange}
                accept="audio/wav,audio/mp3,audio/mpeg"
                className="file-input"
              />
            </label>
          </div>
          
          <div className="button-container">
            <button 
              type="submit" 
              className="submit-button"
              disabled={!file || loading}
            >
              {loading ? 'Analyzing...' : 'Analyze Audio'}
            </button>
            
            {file && (
              <button 
                type="button" 
                className="reset-button"
                onClick={resetForm}
              >
                Reset
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="result-container">
          <ResultDisplay 
            result={result} 
            mediaType="audio" 
            mediaSrc={preview}
          />
          <button 
            className="reset-button" 
            onClick={resetForm}
          >
            Analyze Another Audio
          </button>
        </div>
      )}
      
      <div className="info-box">
        <h3>About Audio Deepfake Detection</h3>
        <p>
          This tool analyzes audio recordings to detect AI-generated or manipulated speech.
          It examines spectral characteristics, unnatural transitions, and other artifacts
          that are common in synthetic voice recordings.
        </p>
        <p>
          For best results, upload clear speech recordings with minimal background noise.
          The detector works best with spoken content rather than music or ambient sounds.
        </p>
        <p>
          <strong>Note:</strong> As voice synthesis technology improves, certain high-quality
          deepfakes might be challenging to detect with 100% accuracy.
        </p>
      </div>
    </div>
  );
};

export default AudioDetector;
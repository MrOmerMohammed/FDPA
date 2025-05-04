import React, { useState } from 'react';
import ResultDisplay from './ResultDisplay';
import './MediaDetector.css';

const VideoDetector = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      // Check if file is a video
      if (!selectedFile.type.match('video.*')) {
        setError('Please select a video file (MP4, AVI, MOV)');
        setFile(null);
        setPreview(null);
        return;
      }
      
      // Check file size (limit to 50MB)
      if (selectedFile.size > 50 * 1024 * 1024) {
        setError('File size too large. Please select a video smaller than 50MB');
        setFile(null);
        setPreview(null);
        return;
      }
      
      setError(null);
      setFile(selectedFile);
      
      // Create video preview
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a video file');
      return;
    }
    
    setLoading(true);
    setError(null);
    setProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Simulate progress for better UX (since we don't have real progress events)
      const progressInterval = setInterval(() => {
        setProgress(prevProgress => {
          const newProgress = prevProgress + 5;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 1000);
      
      const response = await fetch('http://localhost:5000/api/detect/video', {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      setProgress(100);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error detecting video:', err);
      setError('Error processing video. Please try again.');
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
    setProgress(0);
  };

  return (
    <div className="media-detector">
      <h2>Video Deepfake Detection</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      {!result ? (
        <form onSubmit={handleSubmit}>
          <div className="file-upload-container">
            <label className="file-upload-label">
              {preview ? (
                <video 
                  src={preview} 
                  controls 
                  className="file-preview"
                ></video>
              ) : (
                <div className="upload-placeholder">
                  <i className="fas fa-video"></i>
                  <p>Click to select a video</p>
                </div>
              )}
              <input
                type="file"
                onChange={handleFileChange}
                accept="video/mp4,video/avi,video/mov,video/quicktime"
                className="file-input"
              />
            </label>
          </div>
          
          {loading && (
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ width: `${progress}%` }}
              ></div>
              <div className="progress-text">{progress}%</div>
            </div>
          )}
          
          <div className="button-container">
            <button 
              type="submit" 
              className="submit-button"
              disabled={!file || loading}
            >
              {loading ? 'Analyzing...' : 'Analyze Video'}
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
            mediaType="video" 
            mediaSrc={preview}
          />
          <button 
            className="reset-button" 
            onClick={resetForm}
          >
            Analyze Another Video
          </button>
        </div>
      )}
      
      <div className="info-box">
        <h3>About Video Deepfake Detection</h3>
        <p>
          Our video deepfake detector analyzes video frames to identify signs of manipulation
          or AI generation. It looks for inconsistencies between frames, unnatural facial movements,
          and other telltale signs of deepfakes.
        </p>
        <p>
          For best results, upload videos with clear facial footage. 
          Note that processing may take several minutes for longer videos.
        </p>
        <p>
          <strong>Note:</strong> This detector works best for facial deepfakes and may not
          detect all types of video manipulation.
        </p>
      </div>
    </div>
  );
};

export default VideoDetector;
import os
import numpy as np
import cv2
import tensorflow as tf
from models.image_detector import ImageDetector
import tempfile

class VideoDetector:
    def __init__(self, model_path=None, frames_per_second=1, threshold=0.5):
        """
        Initialize the VideoDetector
        
        Args:
            model_path (str, optional): Path to saved model weights.
            frames_per_second (int): Number of frames to analyze per second
            threshold (float): Classification threshold (0.5 default)
        """
        self.model_path = model_path
        self.frames_per_second = frames_per_second
        self.threshold = threshold
        
        # Use the ImageDetector for frame analysis
        self.image_detector = ImageDetector(model_path=model_path)
    
    def extract_frames(self, video_path, output_dir=None):
        """
        Extract frames from a video file
        
        Args:
            video_path (str): Path to the video file
            output_dir (str, optional): Directory to save frames. If None, uses temp dir
            
        Returns:
            list: Paths to extracted frames
        """
        # Create temporary directory if output_dir is not provided
        if output_dir is None:
            output_dir = tempfile.mkdtemp()
        else:
            os.makedirs(output_dir, exist_ok=True)
        
        # Open the video file
        cap = cv2.VideoCapture(video_path)
        if not cap.isOpened():
            raise ValueError(f"Could not open video file: {video_path}")
        
        # Get video properties
        fps = cap.get(cv2.CAP_PROP_FPS)
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        # Calculate frame extraction interval
        frame_interval = int(fps / self.frames_per_second)
        if frame_interval < 1:
            frame_interval = 1
        
        # Extract frames
        frame_paths = []
        frame_count = 0
        
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            
            if frame_count % frame_interval == 0:
                frame_path = os.path.join(output_dir, f"frame_{frame_count:06d}.jpg")
                cv2.imwrite(frame_path, frame)
                frame_paths.append(frame_path)
            
            frame_count += 1
        
        cap.release()
        return frame_paths
    
    def detect(self, video_path):
        """
        Detect if a video contains deepfake content
        
        Args:
            video_path (str): Path to the video file
            
        Returns:
            dict: Result with predictions and confidence
        """
        try:
            # Create a temporary directory for extracted frames
            temp_dir = tempfile.mkdtemp()
            
            # Extract frames from the video
            frame_paths = self.extract_frames(video_path, temp_dir)
            
            if not frame_paths:
                raise ValueError("No frames could be extracted from the video")
            
            # Process each frame
            fake_count = 0
            total_confidence = 0
            frame_results = {}
            
            for i, frame_path in enumerate(frame_paths):
                result = self.image_detector.detect(frame_path)
                frame_results[f"frame_{i}"] = {
                    "is_fake": result["is_fake"],
                    "confidence": float(result["confidence"])
                }
                
                if result["is_fake"]:
                    fake_count += 1
                total_confidence += result["confidence"]
                
                # Clean up
                if os.path.exists(frame_path):
                    os.remove(frame_path)
            
            # Calculate overall results
            fake_ratio = fake_count / len(frame_paths)
            avg_confidence = total_confidence / len(frame_paths)
            
            # Video is considered fake if the fake ratio exceeds the threshold
            is_fake = fake_ratio >= self.threshold
            
            # Clean up temporary directory
            try:
                os.rmdir(temp_dir)
            except:
                pass
            
            return {
                'is_fake': is_fake,
                'confidence': float(avg_confidence),
                'fake_frame_ratio': float(fake_ratio),
                'frames_analyzed': len(frame_paths),
                'frame_analysis': frame_results
            }
            
        except Exception as e:
            # Clean up in case of exception
            try:
                if 'temp_dir' in locals():
                    for file in os.listdir(temp_dir):
                        os.remove(os.path.join(temp_dir, file))
                    os.rmdir(temp_dir)
            except:
                pass
            
            raise Exception(f"Error in video detection: {str(e)}")

# For testing purposes
if __name__ == "__main__":
    detector = VideoDetector()
    # Replace with path to your test video
    test_video_path = "test_video.mp4"
    if os.path.exists(test_video_path):
        result = detector.detect(test_video_path)
        print(f"Result: {'Fake' if result['is_fake'] else 'Real'}")
        print(f"Confidence: {result['confidence'] * 100:.2f}%")
        print(f"Fake frame ratio: {result['fake_frame_ratio'] * 100:.2f}%")
    else:
        print(f"Test video not found: {test_video_path}")
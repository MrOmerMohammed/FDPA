import os
import numpy as np
import librosa
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
import matplotlib.pyplot as plt
import tempfile

class AudioDetector:
    def __init__(self, model_path=None):
        """
        Initialize the AudioDetector
        
        Args:
            model_path (str, optional): Path to saved model weights.
        """
        self.model_path = model_path
        self.model = self._load_model()
        self.sample_rate = 22050  # Default sample rate
        self.duration = 5  # Process 5-second chunks
        
    def _load_model(self):
        """
        Load and prepare the model for inference
        
        Returns:
            A TensorFlow model ready for prediction
        """
        # Define CNN model for spectrogram analysis
        model = Sequential([
            # Input shape: (128, variable_length, 1) - mel spectrogram with 128 mel bands
            Conv2D(32, (3, 3), activation='relu', padding='same', input_shape=(128, 216, 1)),
            MaxPooling2D((2, 2)),
            Conv2D(64, (3, 3), activation='relu', padding='same'),
            MaxPooling2D((2, 2)),
            Conv2D(128, (3, 3), activation='relu', padding='same'),
            MaxPooling2D((2, 2)),
            Flatten(),
            Dense(128, activation='relu'),
            Dropout(0.5),
            Dense(1, activation='sigmoid')
        ])
        
        model.compile(
            optimizer='adam',
            loss='binary_crossentropy',
            metrics=['accuracy']
        )
        
        # If model weights are provided, load them
        if self.model_path and os.path.exists(self.model_path):
            model.load_weights(self.model_path)
            print(f"Loaded model weights from {self.model_path}")
        else:
            print("Warning: No model weights provided for audio detection. Using untrained model.")
        
        return model
    
    def create_spectrogram(self, audio_path, temp_img_path=None):
        """
        Create a spectrogram from an audio file
        
        Args:
            audio_path (str): Path to the audio file
            temp_img_path (str, optional): Path to save the spectrogram image
            
        Returns:
            numpy.ndarray: Processed spectrogram for model input
        """
        # Load audio file
        try:
            y, sr = librosa.load(audio_path, sr=self.sample_rate, duration=self.duration)
        except Exception as e:
            raise Exception(f"Error loading audio file: {str(e)}")
        
        # Create mel spectrogram
        mel_spectrogram = librosa.feature.melspectrogram(
            y=y,
            sr=sr,
            n_mels=128,
            fmax=8000
        )
        
        # Convert to decibels
        mel_spectrogram_db = librosa.power_to_db(mel_spectrogram, ref=np.max)
        
        # Resize if necessary to fit model input
        if mel_spectrogram_db.shape[1] < 216:
            # Pad with zeros
            padding = np.zeros((128, 216 - mel_spectrogram_db.shape[1]))
            mel_spectrogram_db = np.concatenate((mel_spectrogram_db, padding), axis=1)
        elif mel_spectrogram_db.shape[1] > 216:
            # Truncate
            mel_spectrogram_db = mel_spectrogram_db[:, :216]
        
        # If a temp path is provided, save the spectrogram as an image for visualization
        if temp_img_path:
            plt.figure(figsize=(10, 4))
            plt.imshow(mel_spectrogram_db, aspect='auto', origin='lower')
            plt.colorbar(format='%+2.0f dB')
            plt.title('Mel Spectrogram')
            plt.tight_layout()
            plt.savefig(temp_img_path)
            plt.close()
        
        # Normalize and reshape for model input
        mel_spectrogram_db = (mel_spectrogram_db - mel_spectrogram_db.min()) / (mel_spectrogram_db.max() - mel_spectrogram_db.min())
        mel_spectrogram_db = np.expand_dims(mel_spectrogram_db, axis=0)  # Add batch dimension
        mel_spectrogram_db = np.expand_dims(mel_spectrogram_db, axis=3)  # Add channel dimension
        
        return mel_spectrogram_db
    
    def detect(self, audio_path):
        """
        Detect if an audio contains deepfake content
        
        Args:
            audio_path (str): Path to the audio file
            
        Returns:
            dict: Result with predictions and confidence
        """
        try:
            # Create a temporary directory for visualization (if needed)
            temp_dir = tempfile.mkdtemp()
            temp_img_path = os.path.join(temp_dir, "spectrogram.png")
            
            # Process audio to create spectrogram
            spectrogram = self.create_spectrogram(audio_path, temp_img_path)
            
            # Make prediction
            prediction = self.model.predict(spectrogram)[0][0]
            
            # Confidence score and classification
            confidence = float(max(prediction, 1 - prediction))
            is_fake = bool(prediction > 0.5)
            
            # Clean up
            if os.path.exists(temp_img_path):
                os.remove(temp_img_path)
            try:
                os.rmdir(temp_dir)
            except:
                pass
            
            return {
                'is_fake': is_fake,
                'confidence': confidence,
                'raw_score': float(prediction)
            }
        except Exception as e:
            # Clean up in case of exception
            try:
                if 'temp_dir' in locals() and os.path.exists(temp_dir):
                    for file in os.listdir(temp_dir):
                        os.remove(os.path.join(temp_dir, file))
                    os.rmdir(temp_dir)
            except:
                pass
            
            raise Exception(f"Error in audio detection: {str(e)}")

# For testing purposes
if __name__ == "__main__":
    detector = AudioDetector()
    # Replace with path to your test audio
    test_audio_path = "test_audio.wav"
    if os.path.exists(test_audio_path):
        result = detector.detect(test_audio_path)
        print(f"Result: {'Fake' if result['is_fake'] else 'Real'}")
        print(f"Confidence: {result['confidence'] * 100:.2f}%")
    else:
        print(f"Test audio not found: {test_audio_path}")
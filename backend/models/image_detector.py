import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.efficientnet import EfficientNetB0, preprocess_input

class ImageDetector:
    def __init__(self, model_path=None):
        """
        Initialize the ImageDetector with a pre-trained EfficientNetB0 model
        
        Args:
            model_path (str, optional): Path to saved model weights. If None, uses the base model.
        """
        self.model_path = model_path
        self.model = self._load_model()
        self.img_size = (224, 224)  # EfficientNetB0 input size
        
    def _load_model(self):
        """
        Load and prepare the model for inference
        
        Returns:
            A TensorFlow model ready for prediction
        """
        # Base model
        base_model = EfficientNetB0(
            weights='imagenet',
            include_top=False,
            input_shape=(224, 224, 3)
        )
        
        # Add classification head
        x = tf.keras.layers.GlobalAveragePooling2D()(base_model.output)
        x = tf.keras.layers.Dense(512, activation='relu')(x)
        x = tf.keras.layers.Dropout(0.3)(x)
        outputs = tf.keras.layers.Dense(1, activation='sigmoid')(x)
        
        model = tf.keras.Model(inputs=base_model.input, outputs=outputs)
        
        # If model weights are provided, load them
        if self.model_path and os.path.exists(self.model_path):
            model.load_weights(self.model_path)
            print(f"Loaded model weights from {self.model_path}")
        else:
            print("Warning: No model weights provided. Using base model only.")
            # In a real implementation, you should fine-tune the model on deepfake dataset
        
        return model
    
    def preprocess_image(self, img_path):
        """
        Load and preprocess an image for the model
        
        Args:
            img_path (str): Path to the image file
            
        Returns:
            Preprocessed image array ready for model input
        """
        img = image.load_img(img_path, target_size=self.img_size)
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        preprocessed_img = preprocess_input(img_array)
        
        return preprocessed_img
    
    def detect(self, img_path):
        """
        Detect if an image is real or fake
        
        Args:
            img_path (str): Path to the image file
            
        Returns:
            dict: Result with predictions and confidence
        """
        try:
            preprocessed_img = self.preprocess_image(img_path)
            prediction = self.model.predict(preprocessed_img)[0][0]
            
            # Confidence score and classification
            confidence = float(max(prediction, 1 - prediction))
            is_fake = bool(prediction > 0.5)
            
            return {
                'is_fake': is_fake,
                'confidence': confidence,
                'raw_score': float(prediction)
            }
        except Exception as e:
            raise Exception(f"Error in image detection: {str(e)}")

# For testing purposes
if __name__ == "__main__":
    detector = ImageDetector()
    # Replace with path to your test image
    test_image_path = "test_image.jpg"
    if os.path.exists(test_image_path):
        result = detector.detect(test_image_path)
        print(f"Result: {'Fake' if result['is_fake'] else 'Real'}")
        print(f"Confidence: {result['confidence'] * 100:.2f}%")
    else:
        print(f"Test image not found: {test_image_path}")
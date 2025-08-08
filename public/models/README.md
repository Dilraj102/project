# Face-API Models

This directory should contain the face-api.js model files for facial detection and emotion recognition.

To use the full facial detection features, you would need to download the following model files from the face-api.js repository:

- tiny_face_detector_model-weights_manifest.json
- tiny_face_detector_model-shard1
- face_landmark_68_model-weights_manifest.json  
- face_landmark_68_model-shard1
- face_recognition_model-weights_manifest.json
- face_recognition_model-shard1 & face_recognition_model-shard2
- face_expression_model-weights_manifest.json
- face_expression_model-shard1

For this demo, the app will fall back to mock emotion detection if the models are not available.
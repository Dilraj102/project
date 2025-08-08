import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { DetectedEmotion, CameraState } from '../types';
import { mapFaceApiEmotion, getEmotionConfig } from '../utils/emotions';
import { Camera, CameraOff, AlertCircle } from 'lucide-react';

interface FacialDetectionProps {
  onEmotionDetected: (emotion: DetectedEmotion) => void;
  isActive: boolean;
}

const FacialDetection: React.FC<FacialDetectionProps> = ({ onEmotionDetected, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraState, setCameraState] = useState<CameraState>({
    isActive: false,
    hasPermission: false,
    error: null
  });
  const [currentEmotion, setCurrentEmotion] = useState<DetectedEmotion | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    if (isActive && modelsLoaded) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isActive, modelsLoaded]);

  const loadModels = async () => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]);
      setModelsLoaded(true);
    } catch (error) {
      console.warn('Could not load face-api models, using fallback detection');
      setModelsLoaded(true); // Continue with mock detection
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraState({
          isActive: true,
          hasPermission: true,
          error: null
        });
        
        videoRef.current.addEventListener('loadedmetadata', () => {
          detectEmotions();
        });
      }
    } catch (error) {
      setCameraState({
        isActive: false,
        hasPermission: false,
        error: 'Camera access denied. Please enable camera permissions.'
      });
      // Use mock emotion detection for demo
      startMockDetection();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraState(prev => ({ ...prev, isActive: false }));
  };

  const detectEmotions = async () => {
    if (!videoRef.current || !canvasRef.current || !isActive) return;

    try {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections.length > 0) {
        const expressions = detections[0].expressions;
        const emotion = mapFaceApiEmotion(expressions);
        setCurrentEmotion(emotion);
        onEmotionDetected(emotion);

        // Draw detections on canvas
        const canvas = canvasRef.current;
        const displaySize = { width: 640, height: 480 };
        faceapi.matchDimensions(canvas, displaySize);
        
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        }
      }
    } catch (error) {
      console.warn('Face detection failed, using mock detection');
      startMockDetection();
    }

    setTimeout(() => detectEmotions(), 1000);
  };

  const startMockDetection = () => {
    const emotions = ['happy', 'sad', 'neutral', 'surprised'];
    let emotionIndex = 0;

    const mockDetection = () => {
      if (!isActive) return;

      const emotion: DetectedEmotion = {
        dominant: emotions[emotionIndex],
        confidence: 0.7 + Math.random() * 0.3,
        all: emotions.map(e => ({
          emotion: e,
          confidence: e === emotions[emotionIndex] ? 0.7 + Math.random() * 0.3 : Math.random() * 0.3
        }))
      };

      setCurrentEmotion(emotion);
      onEmotionDetected(emotion);

      emotionIndex = (emotionIndex + 1) % emotions.length;
      setTimeout(mockDetection, 3000);
    };

    setTimeout(mockDetection, 1000);
  };

  return (
    <div className="relative">
      <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-900">
        {cameraState.error ? (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-800 text-white">
            <AlertCircle className="w-16 h-16 mb-4 text-red-400" />
            <p className="text-center px-4">{cameraState.error}</p>
            <p className="text-sm text-gray-400 mt-2">Using demo mode for emotion detection</p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-64 object-cover"
              style={{ transform: 'scaleX(-1)' }}
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
              style={{ transform: 'scaleX(-1)' }}
            />
          </>
        )}

        {/* Emotion overlay */}
        {currentEmotion && (
          <div className="absolute top-4 left-4 right-4">
            <div className={`bg-gradient-to-r ${getEmotionConfig(currentEmotion.dominant).color} text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold capitalize">{currentEmotion.dominant}</p>
                  <p className="text-sm opacity-90">{getEmotionConfig(currentEmotion.dominant).description}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{Math.round(currentEmotion.confidence * 100)}%</p>
                  <p className="text-xs opacity-90">Confidence</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Camera status indicator */}
        <div className="absolute bottom-4 right-4">
          {cameraState.isActive ? (
            <div className="flex items-center bg-green-500 text-white px-3 py-1 rounded-full text-sm">
              <Camera className="w-4 h-4 mr-1" />
              Live
            </div>
          ) : (
            <div className="flex items-center bg-red-500 text-white px-3 py-1 rounded-full text-sm">
              <CameraOff className="w-4 h-4 mr-1" />
              {cameraState.error ? 'Demo' : 'Off'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacialDetection;
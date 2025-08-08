import React, { useState, useEffect } from 'react';
import { Music, Brain, Camera, Headphones } from 'lucide-react';
import FacialDetection from './components/FacialDetection';
import MusicPlayer from './components/MusicPlayer';
import SpotifyAuth from './components/SpotifyAuth';
import SpotifyService from './services/SpotifyService';
import { DetectedEmotion, SpotifyTrack } from './types';
import { getEmotionConfig } from './utils/emotions';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<DetectedEmotion | null>(null);
  const [recommendations, setRecommendations] = useState<SpotifyTrack[]>([]);
  const [isDetectionActive, setIsDetectionActive] = useState(false);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const authenticated = await SpotifyService.authenticate();
    setIsAuthenticated(authenticated);
  };

  const handleEmotionDetected = async (emotion: DetectedEmotion) => {
    if (emotion.dominant === currentEmotion?.dominant) return;
    
    setCurrentEmotion(emotion);
    setIsLoadingRecommendations(true);
    
    try {
      const playlist = await SpotifyService.getRecommendations(emotion.dominant);
      setRecommendations(playlist.tracks);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const startDetection = () => {
    setIsDetectionActive(true);
  };

  const stopDetection = () => {
    setIsDetectionActive(false);
    setCurrentEmotion(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <SpotifyAuth onAuthenticated={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      currentEmotion 
        ? getEmotionConfig(currentEmotion.dominant).bgColor 
        : 'bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100'
    }`}>
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MoodTunes</h1>
                <p className="text-sm text-gray-600">AI-Powered Music for Your Emotions</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Music className="w-4 h-4" />
                <span>Powered by Spotify</span>
              </div>
              
              {!isDetectionActive ? (
                <button
                  onClick={startDetection}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Start Detection</span>
                </button>
              ) : (
                <button
                  onClick={stopDetection}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center space-x-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Stop Detection</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isDetectionActive ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Headphones className="w-16 h-16 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to MoodTunes
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let AI analyze your facial expressions and discover music that perfectly matches your mood. 
              Click "Start Detection" to begin your personalized music journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <Camera className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Facial Detection</h3>
                <p className="text-gray-600 text-sm">
                  Advanced AI analyzes your facial expressions in real-time
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Emotion Recognition</h3>
                <p className="text-gray-600 text-sm">
                  Identifies emotions like happy, sad, surprised, and more
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <Music className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Smart Recommendations</h3>
                <p className="text-gray-600 text-sm">
                  Curated playlists from Spotify that match your current mood
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Camera & Detection */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Camera className="w-6 h-6 mr-2" />
                  Live Emotion Detection
                </h2>
                <FacialDetection
                  onEmotionDetected={handleEmotionDetected}
                  isActive={isDetectionActive}
                />
              </div>

              {/* Emotion History */}
              {currentEmotion && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Mood</h3>
                  <div className={`bg-gradient-to-r ${getEmotionConfig(currentEmotion.dominant).color} text-white p-4 rounded-lg`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xl font-bold capitalize">{currentEmotion.dominant}</p>
                        <p className="opacity-90">{getEmotionConfig(currentEmotion.dominant).description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{Math.round(currentEmotion.confidence * 100)}%</p>
                        <p className="text-sm opacity-90">Confidence</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">All Detected Emotions:</h4>
                    {currentEmotion.all.slice(0, 5).map((emotion) => (
                      <div key={emotion.emotion} className="flex items-center justify-between">
                        <span className="text-sm capitalize text-gray-600">{emotion.emotion}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full transition-all"
                              style={{ width: `${emotion.confidence * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 w-8">
                            {Math.round(emotion.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Music Player */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Music className="w-6 h-6 mr-2" />
                  Music Recommendations
                </h2>
                
                {isLoadingRecommendations ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    <span className="ml-3 text-gray-600">Finding perfect songs for your mood...</span>
                  </div>
                ) : recommendations.length > 0 && currentEmotion ? (
                  <MusicPlayer 
                    tracks={recommendations} 
                    currentEmotion={currentEmotion.dominant}
                  />
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Music className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Start facial detection to get music recommendations</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              MoodTunes - AI-powered music recommendations based on facial emotion detection
            </p>
            <p className="text-xs mt-2">
              Powered by face-api.js and Spotify Web API
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
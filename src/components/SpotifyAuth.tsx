import React, { useState } from 'react';
import { Music, Key, ExternalLink } from 'lucide-react';
import SpotifyService from '../services/SpotifyService';

interface SpotifyAuthProps {
  onAuthenticated: () => void;
}

const SpotifyAuth: React.FC<SpotifyAuthProps> = ({ onAuthenticated }) => {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTokenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;

    setIsLoading(true);
    SpotifyService.setAccessToken(token.trim());
    
    // Simulate authentication check
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated();
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-6">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Music className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect to Spotify</h2>
        <p className="text-gray-600">
          Enter your Spotify access token to get personalized music recommendations
        </p>
      </div>

      <form onSubmit={handleTokenSubmit} className="space-y-4">
        <div>
          <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">
            Access Token
          </label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste your Spotify access token here"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!token.trim() || isLoading}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
            token.trim() && !isLoading
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Connecting...' : 'Connect to Spotify'}
        </button>

        <button
          type="button"
          onClick={onAuthenticated}
          className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
        >
          Continue with Demo Mode
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start">
          <ExternalLink className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">How to get your token:</h4>
            <ol className="text-xs text-blue-800 mt-2 space-y-1 list-decimal list-inside">
              <li>Go to Spotify Web Console</li>
              <li>Sign in with your Spotify account</li>
              <li>Get an access token with appropriate scopes</li>
              <li>Copy and paste it above</li>
            </ol>
            <p className="text-xs text-blue-700 mt-2">
              <strong>Note:</strong> Demo mode works without a token but uses sample data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyAuth;
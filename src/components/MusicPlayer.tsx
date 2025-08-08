import React, { useState, useRef, useEffect } from 'react';
import { SpotifyTrack } from '../types';
import { Play, Pause, SkipForward, SkipBack, Volume2, ExternalLink } from 'lucide-react';

interface MusicPlayerProps {
  tracks: SpotifyTrack[];
  currentEmotion: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ tracks, currentEmotion }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    setCurrentTrackIndex(0);
    setIsPlaying(false);
    setProgress(0);
  }, [tracks]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(progress) ? 0 : progress);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.warn('Audio playback failed:', error);
        setIsPlaying(false);
      }
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(false);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(false);
  };

  if (!currentTrack) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-center text-gray-500">No tracks available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Album Art & Track Info */}
      <div className="flex items-center p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <img
          src={currentTrack.album.images[0]?.url || 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300'}
          alt={currentTrack.album.name}
          className="w-20 h-20 rounded-lg shadow-lg mr-4"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold truncate">{currentTrack.name}</h3>
          <p className="text-sm opacity-90 truncate">
            {currentTrack.artists.map(artist => artist.name).join(', ')}
          </p>
          <p className="text-xs opacity-75 truncate mt-1">{currentTrack.album.name}</p>
        </div>
        <a
          href={currentTrack.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>

      {/* Audio Element */}
      {currentTrack.preview_url && (
        <audio
          ref={audioRef}
          src={currentTrack.preview_url}
          preload="metadata"
        />
      )}

      {/* Progress Bar */}
      <div className="px-6 pt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center p-6 space-x-4">
        <button
          onClick={prevTrack}
          className="p-3 hover:bg-gray-100 rounded-full transition-colors"
        >
          <SkipBack className="w-6 h-6 text-gray-700" />
        </button>

        <button
          onClick={togglePlayPause}
          disabled={!currentTrack.preview_url}
          className={`p-4 rounded-full transition-all ${
            currentTrack.preview_url
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8" />
          )}
        </button>

        <button
          onClick={nextTrack}
          className="p-3 hover:bg-gray-100 rounded-full transition-colors"
        >
          <SkipForward className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {!currentTrack.preview_url && (
        <div className="px-6 pb-4">
          <p className="text-center text-sm text-gray-500">
            Preview not available. Click the external link to play on Spotify.
          </p>
        </div>
      )}

      {/* Track List */}
      <div className="border-t bg-gray-50">
        <div className="p-4 max-h-64 overflow-y-auto">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 capitalize">
            {currentEmotion} Playlist ({tracks.length} tracks)
          </h4>
          <div className="space-y-2">
            {tracks.map((track, index) => (
              <div
                key={track.id}
                onClick={() => setCurrentTrackIndex(index)}
                className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                  index === currentTrackIndex
                    ? 'bg-purple-100 border-l-4 border-purple-600'
                    : 'hover:bg-gray-100'
                }`}
              >
                <img
                  src={track.album.images[0]?.url || 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=64'}
                  alt={track.album.name}
                  className="w-10 h-10 rounded object-cover mr-3"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{track.name}</p>
                  <p className="text-xs text-gray-600 truncate">
                    {track.artists.map(artist => artist.name).join(', ')}
                  </p>
                </div>
                {index === currentTrackIndex && isPlaying && (
                  <div className="flex space-x-1">
                    <div className="w-1 bg-purple-600 rounded-full animate-pulse" style={{ height: '16px' }}></div>
                    <div className="w-1 bg-purple-600 rounded-full animate-pulse" style={{ height: '12px', animationDelay: '0.1s' }}></div>
                    <div className="w-1 bg-purple-600 rounded-full animate-pulse" style={{ height: '14px', animationDelay: '0.2s' }}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
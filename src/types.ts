export interface Emotion {
  emotion: string;
  confidence: number;
}

export interface DetectedEmotion {
  dominant: string;
  confidence: number;
  all: Emotion[];
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyPlaylist {
  tracks: SpotifyTrack[];
  emotion: string;
}

export interface CameraState {
  isActive: boolean;
  hasPermission: boolean;
  error: string | null;
}
import axios from 'axios';
import { SpotifyTrack, SpotifyPlaylist } from '../types';
import { emotionConfig } from '../utils/emotions';

class SpotifyService {
  private accessToken: string | null = null;
  private baseURL = 'https://api.spotify.com/v1';

  async authenticate(): Promise<boolean> {
    try {
      // In a real app, you'd implement proper OAuth2 flow
      // For demo purposes, we'll use a mock token or require user to provide it
      const token = localStorage.getItem('spotify_token');
      if (token) {
        this.accessToken = token;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Authentication failed:', error);
      return false;
    }
  }

  setAccessToken(token: string) {
    this.accessToken = token;
    localStorage.setItem('spotify_token', token);
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    };
  }

  async searchTracks(emotion: string, limit: number = 20): Promise<SpotifyTrack[]> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Spotify');
    }

    try {
      const config = emotionConfig[emotion as keyof typeof emotionConfig];
      if (!config) {
        throw new Error('Unknown emotion');
      }

      // Search for tracks based on emotion-related genres
      const genre = config.genres[Math.floor(Math.random() * config.genres.length)];
      
      const response = await axios.get(`${this.baseURL}/search`, {
        headers: this.getHeaders(),
        params: {
          q: `genre:${genre}`,
          type: 'track',
          limit: limit,
          market: 'US'
        }
      });

      return response.data.tracks.items.map((track: any) => ({
        id: track.id,
        name: track.name,
        artists: track.artists,
        album: track.album,
        preview_url: track.preview_url,
        external_urls: track.external_urls
      }));
    } catch (error) {
      console.error('Error searching tracks:', error);
      // Return mock data for demo purposes
      return this.getMockTracks(emotion);
    }
  }

  async getRecommendations(emotion: string): Promise<SpotifyPlaylist> {
    if (!this.accessToken) {
      const tracks = this.getMockTracks(emotion);
      return { tracks, emotion };
    }

    try {
      const config = emotionConfig[emotion as keyof typeof emotionConfig];
      const response = await axios.get(`${this.baseURL}/recommendations`, {
        headers: this.getHeaders(),
        params: {
          seed_genres: config.genres.slice(0, 2).join(','),
          target_valence: (config.valence.min + config.valence.max) / 2,
          target_energy: (config.energy.min + config.energy.max) / 2,
          limit: 15
        }
      });

      const tracks = response.data.tracks.map((track: any) => ({
        id: track.id,
        name: track.name,
        artists: track.artists,
        album: track.album,
        preview_url: track.preview_url,
        external_urls: track.external_urls
      }));

      return { tracks, emotion };
    } catch (error) {
      console.error('Error getting recommendations:', error);
      const tracks = this.getMockTracks(emotion);
      return { tracks, emotion };
    }
  }

  private getMockTracks(emotion: string): SpotifyTrack[] {
    const mockTracks = {
      happy: [
        {
          id: 'mock1',
          name: 'Good as Hell',
          artists: [{ name: 'Lizzo' }],
          album: { name: 'Good as Hell', images: [{ url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg', height: 300, width: 300 }] },
          preview_url: null,
          external_urls: { spotify: '#' }
        },
        {
          id: 'mock2',
          name: 'Happy',
          artists: [{ name: 'Pharrell Williams' }],
          album: { name: 'GIRL', images: [{ url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg', height: 300, width: 300 }] },
          preview_url: null,
          external_urls: { spotify: '#' }
        }
      ],
      sad: [
        {
          id: 'mock3',
          name: 'Someone Like You',
          artists: [{ name: 'Adele' }],
          album: { name: '21', images: [{ url: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg', height: 300, width: 300 }] },
          preview_url: null,
          external_urls: { spotify: '#' }
        },
        {
          id: 'mock4',
          name: 'Mad World',
          artists: [{ name: 'Gary Jules' }],
          album: { name: 'Mad World', images: [{ url: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg', height: 300, width: 300 }] },
          preview_url: null,
          external_urls: { spotify: '#' }
        }
      ]
    };

    return mockTracks[emotion as keyof typeof mockTracks] || mockTracks.happy;
  }
}

export default new SpotifyService();
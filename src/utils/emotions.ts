export const emotionConfig = {
  happy: {
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
    genres: ['pop', 'dance', 'funk', 'reggae'],
    valence: { min: 0.6, max: 1.0 },
    energy: { min: 0.5, max: 1.0 },
    description: 'Upbeat and energetic'
  },
  sad: {
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    genres: ['blues', 'indie', 'alternative', 'acoustic'],
    valence: { min: 0.0, max: 0.4 },
    energy: { min: 0.0, max: 0.5 },
    description: 'Melancholic and reflective'
  },
  angry: {
    color: 'from-red-500 to-red-700',
    bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
    genres: ['rock', 'metal', 'punk', 'hardcore'],
    valence: { min: 0.0, max: 0.5 },
    energy: { min: 0.7, max: 1.0 },
    description: 'Intense and powerful'
  },
  surprised: {
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
    genres: ['electronic', 'experimental', 'synthpop'],
    valence: { min: 0.4, max: 0.8 },
    energy: { min: 0.6, max: 1.0 },
    description: 'Unexpected and dynamic'
  },
  fearful: {
    color: 'from-gray-600 to-gray-800',
    bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
    genres: ['ambient', 'chillout', 'downtempo'],
    valence: { min: 0.0, max: 0.3 },
    energy: { min: 0.0, max: 0.4 },
    description: 'Calming and soothing'
  },
  disgusted: {
    color: 'from-green-600 to-green-800',
    bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
    genres: ['grunge', 'alternative', 'indie-rock'],
    valence: { min: 0.0, max: 0.4 },
    energy: { min: 0.4, max: 0.8 },
    description: 'Raw and authentic'
  },
  neutral: {
    color: 'from-slate-500 to-slate-700',
    bgColor: 'bg-gradient-to-br from-slate-50 to-slate-100',
    genres: ['chill', 'lofi', 'jazz', 'classical'],
    valence: { min: 0.3, max: 0.7 },
    energy: { min: 0.2, max: 0.7 },
    description: 'Balanced and versatile'
  }
};

export const getEmotionConfig = (emotion: string) => {
  return emotionConfig[emotion as keyof typeof emotionConfig] || emotionConfig.neutral;
};

export const mapFaceApiEmotion = (expressions: any): DetectedEmotion => {
  const emotions = [
    { emotion: 'happy', confidence: expressions.happy },
    { emotion: 'sad', confidence: expressions.sad },
    { emotion: 'angry', confidence: expressions.angry },
    { emotion: 'surprised', confidence: expressions.surprised },
    { emotion: 'fearful', confidence: expressions.fearful },
    { emotion: 'disgusted', confidence: expressions.disgusted },
    { emotion: 'neutral', confidence: expressions.neutral }
  ];

  emotions.sort((a, b) => b.confidence - a.confidence);
  
  return {
    dominant: emotions[0].emotion,
    confidence: emotions[0].confidence,
    all: emotions
  };
};
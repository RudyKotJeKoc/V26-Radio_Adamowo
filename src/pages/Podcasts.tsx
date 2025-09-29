import React, { useState } from 'react';
import { Track, useAudioPlayer } from '../context/AudioPlayerContext';
import { SUPPORT_CATEGORIES } from '../utils/supportCategories';

interface PodcastsProps {
  tracks: Track[];
}

const Podcasts = ({ tracks }: PodcastsProps) => {
  const { play, currentTrack, isPlaying } = useAudioPlayer();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handlePlayClick = (track: Track) => {
    play(track, tracks);
  };

  // Separate support tracks from regular tracks
  const supportTracks = tracks.filter(track => track.supportCategory);
  const regularTracks = tracks.filter(track => !track.supportCategory);
  
  // Filter tracks based on selected category
  const getFilteredTracks = () => {
    if (selectedCategory === 'all') {
      return tracks;
    } else if (selectedCategory === 'support') {
      return supportTracks;
    } else {
      return tracks.filter(track => 
        track.category === selectedCategory || track.supportCategory === selectedCategory
      );
    }
  };

  const filteredTracks = getFilteredTracks();

  const getCategoryIcon = (track: Track) => {
    if (track.supportCategory) {
      const supportCategory = SUPPORT_CATEGORIES.find(cat => cat.id === track.supportCategory);
      return supportCategory?.icon || '🎧';
    }
    switch (track.category) {
      case 'ambient': return '🎵';
      case 'audio': return '📻';
      default: return '🎧';
    }
  };

  const categories = [
    { id: 'all', label: 'All', icon: '📚' },
    { id: 'support', label: 'Support Content', icon: '🆘' },
    { id: 'crisis-intervention', label: 'Crisis Help', icon: '🆘' },
    { id: 'healing-journey', label: 'Healing', icon: '🌱' },
    { id: 'education', label: 'Education', icon: '📚' },
    { id: 'ambient', label: 'Ambient', icon: '🎵' },
    { id: 'audio', label: 'Analysis', icon: '📻' }
  ];

  return (
    <div className="py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-8 font-special-elite">Tracks & Podcasts</h1>
      
      {/* Support content notice */}
      {supportTracks.length > 0 && (
        <div className="mb-6 p-4 bg-blue-900 border border-blue-600 rounded-lg">
          <h3 className="font-semibold text-blue-200 mb-2">🆘 Support Content Available</h3>
          <p className="text-sm text-blue-300">
            We have specialized audio content to support your healing journey and provide crisis guidance.
          </p>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category.icon} {category.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredTracks.length > 0 ? (
          filteredTracks.map((track, index) => (
            <div
              key={track.id}
              className={`p-4 md:p-5 rounded-xl flex items-center justify-between transition-all shadow-lg ${
                currentTrack?.file === track.file ? 'bg-green-900 ring-2 ring-green-500' : 
                track.urgent ? 'bg-red-900 border border-red-600' :
                track.supportCategory ? 'bg-blue-900 border border-blue-600' :
                'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">{getCategoryIcon(track)}</span>
                  <h3 className="text-xl font-semibold">{track.title}</h3>
                  {track.urgent && (
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                      URGENT
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 capitalize mb-1">{track.category}</p>
                {track.description && (
                  <p className="text-sm text-gray-300 italic">{track.description}</p>
                )}
              </div>
              <div className="flex items-center space-x-4">
                {/* Use the articleId from the track object itself */}
                {track.articleId && (
                    <a
                      href={`/#/article/${track.articleId}`}
                      className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                      Read Analysis
                    </a>
                )}
                <button
                  onClick={() => handlePlayClick(track)}
                  className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-600 w-28 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                  disabled={isPlaying && currentTrack?.file === track.file}
                >
                  {currentTrack?.file === track.file && isPlaying ? 'Playing...' : 'Play'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No tracks found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Podcasts;

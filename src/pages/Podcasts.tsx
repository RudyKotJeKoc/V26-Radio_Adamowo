import React from 'react';
import { Track, useAudioPlayer } from '../context/AudioPlayerContext';

interface PodcastsProps {
  tracks: Track[];
}

const Podcasts = ({ tracks }: PodcastsProps) => {
  const { play, currentTrack, isPlaying } = useAudioPlayer();

  const handlePlayClick = (track: Track) => {
    play(track, tracks);
  };

  return (
    <div className="py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-8 font-special-elite">Tracks & Podcasts</h1>
      <div className="space-y-4">
        {tracks.length > 0 ? (
          tracks.map((track, index) => (
            <div
              key={track.id}
              className={`p-4 md:p-5 rounded-xl flex items-center justify-between transition-all shadow-lg ${
                currentTrack?.file === track.file ? 'bg-green-900 ring-2 ring-green-500' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <div>
                <h3 className="text-xl font-semibold">{track.title}</h3>
                <p className="text-sm text-gray-400 capitalize">{track.category}</p>
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

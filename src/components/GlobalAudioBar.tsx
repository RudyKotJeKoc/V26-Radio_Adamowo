import React from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext';

const GlobalAudioBar = () => {
  const {
    currentTrack,
    isPlaying,
    isShuffle,
    isLoop,
    currentTime,
    duration,
    play,
    pause,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleLoop,
    seek,
  } = useAudioPlayer();

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds === 0) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      seek(Number(e.target.value));
  }

  if (!currentTrack) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-center h-24 border-t border-gray-700">
            <p className="text-gray-400">No track selected. Select audio to play.</p>
        </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-sm text-white p-4 flex items-center justify-between h-24 border-t border-gray-700">
      <div className="flex items-center w-1/4">
        <div>
          <h3 className="font-bold text-lg truncate">{currentTrack.title || currentTrack.file.split('/').pop()?.replace('.mp3', '')}</h3>
          <p className="text-sm text-gray-400">{currentTrack.artist || 'Unknown Artist'}</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-1/2">
        <div className="flex items-center space-x-6">
          <button onClick={toggleShuffle} className={`font-mono text-xs ${isShuffle ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}>
            SHUFFLE
          </button>
          <button onClick={playPrevious} className="text-gray-400 hover:text-white font-bold text-2xl">
            {"◄◄"}
          </button>
          <button onClick={isPlaying ? pause : () => play()} className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center text-2xl hover:scale-105 transition-transform">
            {isPlaying ? '❚❚' : '►'}
          </button>
          <button onClick={playNext} className="text-gray-400 hover:text-white font-bold text-2xl">
            {"►►"}
          </button>
          <button onClick={toggleLoop} className={`font-mono text-xs ${isLoop ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}>
            LOOP
          </button>
        </div>
        <div className="w-full flex items-center space-x-2 mt-2">
            <span className="text-xs text-gray-400 w-10 text-center">{formatTime(currentTime)}</span>
            <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm"
            />
            <span className="text-xs text-gray-400 w-10 text-center">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="w-1/4">
        {/* Volume controls can go here */}
      </div>
    </div>
  );
};

export default GlobalAudioBar;

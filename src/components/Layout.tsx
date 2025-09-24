import React, { useState, useEffect } from 'react';
import MainSidebar from './MainSidebar'; // Updated import
import GlobalAudioBar from './GlobalAudioBar';
import { Track, useAudioPlayer } from '../context/AudioPlayerContext';
import Podcasts from '../pages/Podcasts';
import KeyFacts from './KeyFacts';

const Layout = () => {
  const [allTracks, setAllTracks] = useState<Track[]>([]);
  const {
    setPlaylist,
    play,
    pause,
    isPlaying,
    seek,
    currentTime,
    volume,
    setVolume
  } = useAudioPlayer();

  // Fetch all tracks from the JSON file on mount
  useEffect(() => {
    fetch('/audio/playlist.json')
      .then(res => res.json())
      .then((data: Track[]) => {
        const tracksWithTitles = data.map(track => ({
            ...track,
            title: track.file.split('/').pop()?.replace('.mp3', '').replace(/_/g, ' ') || 'Unknown Title'
        }));
        setAllTracks(tracksWithTitles);
        // Set the full playlist in the audio player
        setPlaylist(tracksWithTitles);
      })
      .catch(error => console.error('Failed to load playlist:', error));
  }, [setPlaylist]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore shortcuts if user is typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault(); // Prevent page scroll
          if (isPlaying) {
            pause();
          } else {
            play();
          }
          break;
        case 'ArrowRight':
          seek(currentTime + 5);
          break;
        case 'ArrowLeft':
          seek(currentTime - 5);
          break;
        case 'KeyM':
          setVolume(volume > 0 ? 0 : 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying, play, pause, seek, currentTime, volume, setVolume]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Use the new MainSidebar */}
      <MainSidebar />

      {/* The main content area no longer needs filtering logic */}
      <main className="flex-1 ml-64 mb-24 p-8 overflow-y-auto">
        <KeyFacts />
        {/* Pass all tracks to the Podcasts component */}
        <Podcasts tracks={allTracks} />
      </main>

      <GlobalAudioBar />
    </div>
  );
};

export default Layout;

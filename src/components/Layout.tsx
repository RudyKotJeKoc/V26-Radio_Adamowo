import React, { useState, useEffect } from 'react';
import MainSidebar from './MainSidebar'; // Updated import
import GlobalAudioBar from './GlobalAudioBar';
import { Track, useAudioPlayer } from '../context/AudioPlayerContext';
import Podcasts from '../pages/Podcasts';
import KeyFacts from './KeyFacts';

const Layout = () => {
  const [allTracks, setAllTracks] = useState<Track[]>([]);
  const { setPlaylist } = useAudioPlayer();

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

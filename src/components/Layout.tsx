import React, { useState, useEffect } from 'react';
import MainSidebar from './MainSidebar';
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
        // The data is now in the correct format, no need to generate titles
        setAllTracks(data);
        setPlaylist(data);
      })
      .catch(error => console.error('Failed to load playlist:', error));
  }, [setPlaylist]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <MainSidebar />

      <main className="flex-1 ml-64 mb-24 p-8 overflow-y-auto">
        <KeyFacts />
        <Podcasts tracks={allTracks} />
      </main>

      <GlobalAudioBar />
    </div>
  );
};

export default Layout;

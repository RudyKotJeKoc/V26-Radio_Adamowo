import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

// 1. Types
export interface Track {
  file: string;
  category: string;
  title?: string;
  artist?: string;
  cover?: string;
  articleId?: string; // Add optional articleId
}

interface AudioPlayerContextType {
  playlist: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  isShuffle: boolean;
  isLoop: boolean;
  currentTime: number;
  duration: number;
  play: (track?: Track, playlist?: Track[]) => void;
  pause: () => void;
  playNext: () => void;
  playPrevious: () => void;
  addToQueue: (track: Track) => void;
  setPlaylist: (tracks: Track[]) => void;
  toggleShuffle: () => void;
  toggleLoop: () => void;
  seek: (time: number) => void;
}

// 2. Context
const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

// 3. Provider
interface AudioPlayerProviderProps {
  children: ReactNode;
}

export const AudioPlayerProvider = ({ children }: AudioPlayerProviderProps) => {
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [shuffledPlaylist, setShuffledPlaylist] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Load state from localStorage on initial mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('audioPlayerState');
      if (savedState) {
        const { playlist, currentTrackIndex, isShuffle, isLoop } = JSON.parse(savedState);
        if (playlist) setPlaylist(playlist);
        if (currentTrackIndex !== null) setCurrentTrackIndex(currentTrackIndex);
        if (isShuffle) setIsShuffle(isShuffle);
        if (isLoop) setIsLoop(isLoop);
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
    }
    setIsReady(true); // Mark as ready to avoid saving default state back to localStorage
  }, []);

  // Save state to localStorage
  useEffect(() => {
    if (!isReady) return; // Don't save until initial state is loaded
    try {
      const stateToSave = {
        playlist,
        currentTrackIndex,
        isShuffle,
        isLoop,
      };
      localStorage.setItem('audioPlayerState', JSON.stringify(stateToSave));
    } catch (error) {
      console.error("Failed to save state to localStorage", error);
    }
  }, [playlist, currentTrackIndex, isShuffle, isLoop, isReady]);

  // Create shuffled playlist when shuffle is toggled
  useEffect(() => {
    if (isShuffle) {
      const newShuffledPlaylist = [...playlist].sort(() => Math.random() - 0.5);
      setShuffledPlaylist(newShuffledPlaylist);
    } else {
      setShuffledPlaylist(playlist);
    }
  }, [isShuffle, playlist]);


  const currentTrack = currentTrackIndex !== null ? (isShuffle ? shuffledPlaylist[currentTrackIndex] : playlist[currentTrackIndex]) : null;

  // Audio effects
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (isLoop) {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isLoop, playNext]);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
        // Vite needs base path for assets in public folder
        const audioSrc = `/${currentTrack.file}`;
        if (audioRef.current.src !== window.location.origin + audioSrc) {
            audioRef.current.src = audioSrc;
        }
        if (isPlaying) {
            audioRef.current.play().catch(e => console.error("Error playing audio:", e));
        } else {
            audioRef.current.pause();
        }
    }
  }, [currentTrack, isPlaying]);


  const play = (track?: Track, newPlaylist?: Track[]) => {
    const targetPlaylist = newPlaylist || playlist;
    if (newPlaylist) {
      setPlaylist(newPlaylist);
    }

    let trackIndex = -1;
    if (track) {
      trackIndex = targetPlaylist.findIndex(t => t.file === track.file);
    } else if (targetPlaylist.length > 0) {
      trackIndex = currentTrackIndex !== null ? currentTrackIndex : 0;
    }

    if (trackIndex !== -1) {
      setCurrentTrackIndex(trackIndex);
      setIsPlaying(true);
    }
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const playNext = () => {
    const pl = isShuffle ? shuffledPlaylist : playlist;
    if (pl.length === 0) return;
    const newIndex = currentTrackIndex !== null ? (currentTrackIndex + 1) % pl.length : 0;
    setCurrentTrackIndex(newIndex);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    const pl = isShuffle ? shuffledPlaylist : playlist;
    if (pl.length === 0) return;
    const newIndex = currentTrackIndex !== null ? (currentTrackIndex - 1 + pl.length) % pl.length : 0;
    setCurrentTrackIndex(newIndex);
    setIsPlaying(true);
  };

  const addToQueue = (track: Track) => {
    setPlaylist(prev => [...prev, track]);
  };

  const handleSetPlaylist = (tracks: Track[]) => {
      setPlaylist(tracks);
      setCurrentTrackIndex(null);
      setIsPlaying(false);
  }

  const toggleShuffle = () => {
    setIsShuffle(prev => !prev);
  };

  const toggleLoop = () => {
    setIsLoop(prev => !prev);
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const value: AudioPlayerContextType = {
    playlist,
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
    addToQueue,
    setPlaylist: handleSetPlaylist,
    toggleShuffle,
    toggleLoop,
    seek,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} />
    </AudioPlayerContext.Provider>
  );
};

// 4. Custom Hook
export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};

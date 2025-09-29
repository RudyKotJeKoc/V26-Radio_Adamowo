
interface PodcastsProps {
  tracks: Track[];
}

const Podcasts = ({ tracks }: PodcastsProps) => {
  const { play, currentTrack, isPlaying } = useAudioPlayer();


  const handlePlayClick = (track: Track) => {
    play(track, tracks);
  };


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

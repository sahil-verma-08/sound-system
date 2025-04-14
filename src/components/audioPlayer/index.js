import React, { useState, useRef, useEffect } from "react";
import "./audioPlayer.css";
import Controls from "./Controls";
import ProgressCircle from "./progressCircle";
import WaveAnimation from "./WaveAnimation";

export default function AudioPLayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  tracks,
}) {
  const [isPlaying, setIsPlaying] = useState(false); // Initially set to false
  const [trackProgress, setTrackProgress] = useState(0);

  const audioSrc = tracks[currentIndex]?.track.external_urls.spotify;
  const audioRef = useRef(new Audio()); // Initialize without a source

  const intervalRef = useRef();

  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  useEffect(() => {
    if (audioSrc) {
      audioRef.current.src = audioSrc;
      audioRef.current.load(); // Load the new source
      setTrackProgress(0); // Reset progress
    }
  }, [audioSrc]);

  useEffect(() => {
    if (isPlaying && audioRef.current.src) {
      audioRef.current.play(); // Only play if isPlaying is true
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < tracks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else setCurrentIndex(0);
  };

  const handlePrev = () => {
    if (currentIndex - 1 < 0) setCurrentIndex(tracks.length - 1);
    else setCurrentIndex(currentIndex - 1);
  };

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };

  const artists = [];
  currentTrack?.album?.artists.forEach((artist) => {
    artists.push(artist.name);
  });

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="player-body flex">
      <div className="player-left-body">
        <ProgressCircle
          percentage={currentPercentage}
          isPlaying={isPlaying}
          image={currentTrack?.album?.images[0]?.url}
          size={300}
          color="#C96850"
        />
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{currentTrack?.name}</p>
        <p className="song-artist">{artists.join(" | ")}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">0:30</p>
          </div>
          {/* Add a play button */}
          <button onClick={handlePlay}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      </div>
    </div>
  );
}
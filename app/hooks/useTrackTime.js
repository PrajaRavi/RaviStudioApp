// useTrackTime.js
import { useProgress } from 'react-native-track-player';
import { useContext, useEffect, useState } from 'react';

const formatTime = (seconds = 0) => {

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default function useTrackTime() {
  const { position, duration } = useProgress(1000); // updates every 1s
  const sliderValue = duration > 0 
    ? Math.min(position,duration) 
    : 0;
  const [formatted, setFormatted] = useState({ position: '0:00', duration: '0:00' });

  useEffect(() => {
    setFormatted({
      position: formatTime(position),
      duration: formatTime(duration),
    });
  }, [position, duration]);

  return formatted;
}

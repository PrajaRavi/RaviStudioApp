import { useEffect, useState } from 'react';
import TrackPlayer, { Event, usePlaybackState, useTrackPlayerEvents } from 'react-native-track-player';

export default function usePlayer() {
  const playbackState = usePlaybackState();
  const [currentTrack, setCurrentTrack] = useState(null);
  const [progress, setProgress] = useState({ position: 0, duration: 0 });

  // Listen to important playback events
  useTrackPlayerEvents(
    [
      Event.PlaybackTrackChanged,
      Event.PlaybackQueueEnded,
      Event.PlaybackProgressUpdated,
    ],
    async (event) => {
      if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        setCurrentTrack(track);
      }
      if (event.type === Event.PlaybackProgressUpdated) {
        const progressData = await TrackPlayer.getProgress();
        setProgress(progressData);
      }
    }
  );

  // Initial load
  useEffect(() => {
    (async () => {
      const id = await TrackPlayer.getCurrentTrack();
      if (id != null) {
        const track = await TrackPlayer.getTrack(id);
        setCurrentTrack(track);
      }
    })();
  }, []);

  return { currentTrack, progress, playbackState };
}

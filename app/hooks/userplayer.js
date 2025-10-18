import { useEffect, useState } from 'react';
import TrackPlayer, { Capability, Event, State, usePlaybackState } from 'react-native-track-player';
// import { usePlaybackState, State } from 'react-native-track-player';
export default function usePlayer() {
  const playbackState = usePlaybackState();
  const [isSetup, setIsSetup] = useState(false);

  useEffect(() => {
    setupPlayer();
    return () => {
      console.log("unmounting the component")
      TrackPlayer.destroy();
    };
  }, []);

  async function setupPlayer() {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        stopWithApp: false,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
      setIsSetup(true);
    } catch (e) {
      console.log('Track Player setup error:', e);
    }
  }

  async function loadTracks(tracks) {
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
    await TrackPlayer.play();
  }

   async function togglePlayback() {
    const currentState = playbackState?.state || playbackState; // handle both shapes

    if (currentState === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  }

  return { playbackState, isSetup, loadTracks, togglePlayback };
}

import { useEffect } from 'react';
import TrackPlayer, { Event, State, useTrackPlayerEvents } from 'react-native-track-player';

/**
 * Custom hook to get a signal (callback) when the player state changes to Playing or Paused.
 * @param {function(boolean): void} callback - The function to call. It receives 'true' for play, 'false' for pause.
 */
export function usePlayPauseSignal(callback) {
  // Use the built-in hook to listen for playback state changes
  useTrackPlayerEvents([Event.PlaybackState], (event) => {
    // Check if the event is the one we're interested in
    if (event.type === Event.PlaybackState) {
      const newState = event.state;

      if (newState === State.Playing) {
        alert("true"); // Signal: Song is Playing
      } else if (newState === State.Paused) {
        alert("false"); // Signal: Song is Paused
      }
      // Note: You can add other states like State.Stopped or State.Buffering if needed.
    }
  });
}
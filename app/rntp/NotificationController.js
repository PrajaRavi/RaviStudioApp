import { useEffect } from 'react';
import {
  setupNotificationControls,
  updateNotificationMetadata,
  syncNotificationState,
} from './NotificationManger';

/**
 * Props:
 * - sound: Audio.Sound object from expo-av
 * - currentSong: { title, artist, artwork, url }
 * - nextSong: function
 * - previousSong: function
 */
export default function NotificationController({ sound, currentSong, nextSong, previousSong }) {
  useEffect(() => {
    if (!sound) return;

    // Set global references for background service
    global.expoSound = sound;
    global.nextSong = nextSong;
    global.previousSong = previousSong;

    // Setup player & capabilities (safe to call multiple times)
    setupNotificationControls();

    // Update notification metadata
    if (currentSong) updateNotificationMetadata(currentSong);

    // Sync notification play/pause state with expo-av
    const subscription = sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isPlaying) syncNotificationState('play');
      else syncNotificationState('pause');
    });

    return () => subscription && sound.setOnPlaybackStatusUpdate(null);
  }, [sound, currentSong]);
  
  return null; // no UI
}

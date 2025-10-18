import TrackPlayer, { Capability } from 'react-native-track-player';

let isPlayerSetup = false; // ensures setupPlayer runs only once

/**
 * Setup player capabilities (call once, safe to call multiple times)
 */
export async function setupNotificationControls() {
  try {
    if (!isPlayerSetup) {
      await TrackPlayer.setupPlayer();
      isPlayerSetup = true;
    }

    await TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
    });
  } catch (err) {
    console.log('Error setting up media controls:', err);
  }
}

/**
 * Update notification metadata
 */
export async function updateNotificationMetadata({ title, artist, artwork, url }) {
  try {
    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: Date.now().toString(),
      url: url || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // dummy if needed
      title: title || 'Unknown Title',
      artist: artist || 'Unknown Artist',
      artwork: artwork || null,
    });
    await TrackPlayer.play(); // show as "playing" in notification
  } catch (err) {
    console.log('Error updating notification metadata:', err);
  }
}

/**
 * Sync play/pause state with TrackPlayer
 */
export async function syncNotificationState(action) {
  try {
    if (action === 'play') await TrackPlayer.play();
    else if (action === 'pause') await TrackPlayer.pause();
  } catch (err) {
    console.log('Error syncing notification state:', err);
  }
}

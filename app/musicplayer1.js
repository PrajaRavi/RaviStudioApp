import TrackPlayer, {
  Capability,
  RepeatMode,
  State,
  usePlaybackState,
} from 'react-native-track-player';

let isPlayerInitialized = false;

// 🔧 Initialize the player
export async function setupPlayer() {
  if (isPlayerInitialized) return;

  try {
    await TrackPlayer.setupPlayer();

    await TrackPlayer.updateOptions({
      stopWithApp: false,
      alwaysPauseOnInterruption: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SeekTo,
      ],
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      // Use your own small white PNG icon for Android notification
     
    });

    isPlayerInitialized = true;
    console.log('✅ Track Player initialized');
  } catch (error) {
    console.error('❌ Error setting up Track Player:', error);
  }
}

// 🎵 Play a specific song with overlayed logo

// ⏯️ Play / Pause toggle

// ⏭️ Next track
export async function playNext() {
  try {
    await TrackPlayer.skipToNext();
    await TrackPlayer.play();
  } catch (error) {
    console.error('❌ Error skipping to next track:', error);
  }
}

// ⏮️ Previous track
export async function playPrevious() {
  try {
    await TrackPlayer.skipToPrevious();
    await TrackPlayer.play();
  } catch (error) {
    console.error('❌ Error skipping to previous track:', error);
  }
}

// 🔁 Loop toggle (repeat current track)
export async function toggleLoop() {
  try {
    const currentMode = await TrackPlayer.getRepeatMode();
    if (currentMode === RepeatMode.Track) {
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
      console.log('🔁 Loop off');
    } else {
      await TrackPlayer.setRepeatMode(RepeatMode.Track);
      console.log('🔂 Loop on (current track)');
    }
  } catch (error) {
    console.error('❌ Error toggling loop:', error);
  }
}

// ⏹️ Stop playback
export async function stopPlayback() {
  try {
    await TrackPlayer.stop();
  } catch (error) {
    console.error('❌ Error stopping playback:', error);
  }
}

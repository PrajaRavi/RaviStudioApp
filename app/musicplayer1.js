import TrackPlayer, {
  Capability,
  RepeatMode,
  State,
  usePlaybackState,
} from 'react-native-track-player';
import Marker from 'react-native-image-marker';
import { Platform } from 'react-native';

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
      icon: require('../assets/images/icon.png'),
    });

    isPlayerInitialized = true;
    console.log('✅ Track Player initialized');
  } catch (error) {
    console.error('❌ Error setting up Track Player:', error);
  }
}

// 🎵 Play a specific song with overlayed logo
export async function playSong(idx, url, songname, artist, cover, logo) {
  try {
    if (!isPlayerInitialized) await setupPlayer();

    let artwork = cover;

    // 🧩 Overlay logo on cover before using it
    if (logo) {
      try {
        console.log('🖼️ Adding logo overlay...');
        const resultPath = await Marker.markImage({
          src: cover,            // main image (song cover)
          markerSrc: logo,       // logo image
          X: 30,                 // x position
          Y: 30,                 // y position
          markerScale: 0.3,      // scale of logo
          quality: 100,
          saveFormat: 'jpg',
        });

        artwork = Platform.OS === 'android' ? `file://${resultPath}` : resultPath;
        console.log('✅ Overlay applied:', artwork);
      } catch (err) {
        console.warn('⚠️ Failed to overlay logo, using original cover:', err);
      }
    }

    await TrackPlayer.reset();

    const track = {
      id: String(idx),
      url,
      title: songname,
      artist,
      artwork, // <-- shows in notification too
    };

    await TrackPlayer.add([track]);
    await TrackPlayer.play();
    console.log(`▶️ Now playing: ${songname}`);
  } catch (error) {
    console.error('❌ Error playing song:', error);
  }
}

// ⏯️ Play / Pause toggle
export async function togglePlayPause() {
  const state = await TrackPlayer.getState();

  if (state === State.Playing) {
    await TrackPlayer.pause();
    console.log('⏸️ Paused');
  } else {
    await TrackPlayer.play();
    console.log('▶️ Resumed');
  }
}

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

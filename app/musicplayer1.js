import TrackPlayer, {
  Capability,
  RepeatMode,
  State,
  usePlaybackState,
  AppKilledPlaybackBehavior,
} from 'react-native-track-player';
import { manipulateAsync } from 'expo-image-manipulator'; // For logo overlay

let isPlayerInitialized = false;

// 🧩 Initialize Track Player once
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
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      icon: require('../assets/images/icon.png'), // small notification icon
    });
    isPlayerInitialized = true;
    console.log('✅ Track Player initialized');
    
    // await TrackPlayer.add(track)
    
  } catch (error) {
    console.error('❌ Error setting up Track Player:', error);
  }
}

// 🎵 Play a specific song
export async function playSong(idx, url, songname, artist, cover, logo) {
  try {

    if (!isPlayerInitialized) await setupPlayer();

    // overlay logo on cover
    let artwork = cover;
    if (logo) {
      const manipulated = await manipulateAsync(
        cover,
        [
          {
            overlay: logo,
            position: { bottom: 20, right: 20 },
            resize: { width: 80, height: 80 },
          },
        ],
        { compress: 1, format: 'jpeg' }
      );
      artwork = manipulated.uri;
    }

    await TrackPlayer.reset();

    const track = {
      id: String(idx),
      url,
      title: songname,
      artist,
      artwork,
    };

    await TrackPlayer.add([track]);
    await TrackPlayer.play();
    console.log(`▶️ Now playing: ${songname}`);
  } catch (error) {
    console.error('❌ Error playing song:', error);
  }
}

// ⏯️ Play / Pause toggle
export async function togglePlayPause() 
{
  const playbackState=usePlaybackState();

  // console.log(State)
  if (playbackState === State.Playing) {
    await TrackPlayer.pause();
  } else {
    await TrackPlayer.play();
  }
}// ⏭️ Next track
export async function playNext() {
  try {
    alert("hello")
  
    
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

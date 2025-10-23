import { Audio } from 'expo-av';

/**
 * Loads an audio file using expo-av to get its duration, then unloads it.
 * @param {string} uri - The remote URL or local path of the audio file.
 * @returns {Promise<number | null>} The duration in seconds, or null if loading fails.
 */
export const getAudioDuration = async (uri) => {
  let soundObject = new Audio.Sound();

  try {
    // Load the sound from the URI. shouldPlay: false prevents playback.
    const { sound, status } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: false } 
    );

    // Get the duration from the status object in milliseconds
    const durationMillis = status.durationMillis;

    // Immediately unload the sound to free resources
    await sound.unloadAsync();

    if (durationMillis) {
      // Convert milliseconds to seconds for react-native-track-player
      return durationMillis / 1000;
    }

    return null; // Duration not found
  } catch (error) {
    console.error('Error getting audio duration:', error);
    return null; // Error occurred
  }
};
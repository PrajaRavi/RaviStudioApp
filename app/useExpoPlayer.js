import * as React from 'react';
import { Audio } from 'expo-av';
import TrackPlayer, { Capability } from 'react-native-track-player';

export default function useExpoPlayer() {
  const [sound, setSound] = React.useState(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const [playlist, setPlaylist] = React.useState([
    {
      id: '1',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      title: 'SoundHelix Song 1',
      artist: 'SoundHelix',
      artwork: 'https://picsum.photos/300',
    },
    {
      id: '2',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      title: 'SoundHelix Song 2',
      artist: 'SoundHelix',
      artwork: 'https://picsum.photos/301',
    },
    {
      id: '3',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      title: 'SoundHelix Song 3',
      artist: 'SoundHelix',
      artwork: 'https://picsum.photos/302',
    },
  ]);

  // 🔧 Setup TrackPlayer options
  React.useEffect(() => {
    (async () => {
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
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
    })();
  }, []);

  // 🎵 Play a song (expo-av)
  async function playSong(index) {
    const track = playlist[index];
    if (!track) return;

    // Stop previous sound
    if (sound) await sound.unloadAsync();

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: track.url },
      { shouldPlay: true }
    );

    global.expoSound = newSound;
    setSound(newSound);
    setCurrentIndex(index);

    // Update now playing info in notification
    await TrackPlayer.reset();
    await TrackPlayer.add(track);
    await TrackPlayer.play();

    // Update global next/previous callbacks for service
    global.nextSong = nextSong;
    global.previousSong = previousSong;
  }

  async function pauseSong() {
    if (sound) {
      await sound.pauseAsync();
      await TrackPlayer.pause();
    }
  }

  async function resumeSong() {
    if (sound) {
      await sound.playAsync();
      await TrackPlayer.play();
    }
  }

  async function nextSong() {
    const nextIndex = (currentIndex + 1) % playlist.length;
    await playSong(nextIndex);
  }

  async function previousSong() {
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    await playSong(prevIndex);
  }

  return {
    playSong,
    pauseSong,
    resumeSong,
    nextSong,
    previousSong,
    playlist,
    currentIndex,
  };
}

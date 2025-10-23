// service.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer, { Event, RepeatMode, State } from 'react-native-track-player';
import { DeviceEventEmitter } from 'react-native';
// import * as SecureStore from "expo-secure-store"
export default async function service () {
  // Called when the service starts
 
  
  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    console.log('▶ Remote Play pressed');
    DeviceEventEmitter.emit("playsong")
    await TrackPlayer.play();
    });

  TrackPlayer.addEventListener(Event.RemotePause, async () => {
    console.log('⏸ Remote Pause pressed');
    DeviceEventEmitter.emit("pausesong")

    await TrackPlayer.pause();
    // setIsPlay(false)
  });

  TrackPlayer.addEventListener(Event.RemoteNext, async () => {
    console.log('⏭ Remote Next pressed');
    DeviceEventEmitter.emit("nextsong")

    await TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
    console.log('⏮ Remote Previous pressed');
    DeviceEventEmitter.emit("prevsong")

    await TrackPlayer.skipToPrevious();
  });
 
  TrackPlayer.addEventListener(Event.RemoteSeek, async (event) => {
    console.log('Seek to:', event.position);
    await TrackPlayer.seekTo(event.position);
  });

  TrackPlayer.addEventListener(Event.RemoteStop, async () => {
    console.log('⏹ Remote Stop pressed');
    await TrackPlayer.stop();
  });
  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, async (event) => {
  // event.position = where playback ended (in seconds)
  // event.track = track id that finished
  // event.nextTrack = next track id (if any)

  const queue = await TrackPlayer.getQueue();
  const currentTrack = await TrackPlayer.getCurrentTrack();

  // if playback finished naturally (not user stop)
  if (event.position > 1 && event.nextTrack == null) {
    // get next track manually
    const nextIndex = queue.findIndex((t) => t.id === currentTrack) + 1;
    if (nextIndex < queue.length) {
      await TrackPlayer.skip(queue[nextIndex].id);
      await TrackPlayer.play();
    } else {
      console.log('Queue ended — restarting first track');
      await TrackPlayer.skip(queue[0].id);
      await TrackPlayer.play();
    }
  }
});
};

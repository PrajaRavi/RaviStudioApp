import { Audio } from "expo-av";
import { useContext, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import deleteicon from "../assets/delete.png";
import nexticon from "../assets/next.png";
import pauseicon from '../assets/pause.png';
import playbtnicon from "../assets/play-button.png";
import playicon from "../assets/play.png";
import { hp } from "./helper";
import { useDownloadManager } from "./hooks/DownloadManager";
import { AppContext } from "./Store";

export function DownloadScreen() {
  // const {IsDownloadPage}=useContext(AppContext)
  const { downloads, deleteSong } = useDownloadManager();
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const soundRef = useRef(null);
  // ✅ Play or toggle a song
  const playSong = async (song) => {
    try {
      if (currentSong?.id === song.id) {
        if (isPlaying) {
          await soundRef.current?.pauseAsync();
          setIsPlaying(false);
        } else {
          await soundRef.current?.playAsync();
          setIsPlaying(true);
        }
        return;
      }

      // unload previous
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      // load and play new
      const { sound } = await Audio.Sound.createAsync(
        { uri: song.uri },
        { shouldPlay: true }
      );

      soundRef.current = sound;
      setCurrentSong(song);
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis || 0);
          setDuration(status.durationMillis || 1);

          // 🔥 Auto-play next song when current ends
          if (status.didJustFinish) {
            playNextSong(song.id);
          }
        }
      });
    } catch (err) {
      console.error("Playback error:", err);
    }
  };

  // ✅ Next Song
  const playNextSong = async (currentSongId) => {
    const currentIndex = downloads.findIndex((s) => s.id === currentSongId);
    if (currentIndex >= 0 && currentIndex < downloads.length - 1) {
      const nextSong = downloads[currentIndex + 1];
      await playSong(nextSong);
    } else {
      setIsPlaying(false);
      setCurrentSong(null);
    }
  };

  // ✅ Stop playback
  const stopPlayback = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
    setIsPlaying(false);
    setCurrentSong(null);
    setPosition(0);
    setDuration(1);
  };

  // ⏱ Format time
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
    
      {downloads.length === 0 ? (
        <Text style={styles.empty}>No songs downloaded</Text>
      ) : (
        <FlatList
          data={downloads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isCurrent = currentSong?.id === item.id;
            return (
              <View style={styles.card}>
                <Image source={{ uri: item.artwork }} style={styles.cover} />
                <View style={styles.info}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.artist}>{item.artist}</Text>
                </View>

                {/* Play/Pause button */}
                <TouchableOpacity onPress={() => playSong(item)}>
                  <Text style={styles.playButton}>
                    {isCurrent && isPlaying ?<Image source={pauseicon} style={{width:30,height:30}}/>: <Image source={playbtnicon} style={{width:30,height:30}}/>}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteSong(item.id)}>
                  <Text style={styles.delete}><Image source={deleteicon} style={{width:30,height:30}}/></Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}

      {/* 🎶 Full Music Player (bottom fixed) */}
      {currentSong && (
        <View style={styles.playerContainer}>
          <Image source={{ uri: currentSong.artwork }} style={styles.playerCover} />

          <View style={styles.playerInfo}>
            <Text style={styles.playerTitle} numberOfLines={1}>
              {currentSong.title}
            </Text>
            <Text style={styles.playerArtist} numberOfLines={1}>
              {currentSong.artist}
            </Text>
            <Text style={styles.timeText}>
              {formatTime(position)} / {formatTime(duration)}
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.playerButtons}>
            <TouchableOpacity onPress={() => playSong(currentSong)}>
              <Text style={styles.playerButtonText}>
                {isPlaying ? <Image source={pauseicon} style={{width:40,height:40}}/>: <Image source={playicon} style={{width:40,height:40}}/>}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => playNextSong(currentSong.id)}>
              <Text style={styles.playerButtonText}><Image source={nexticon} style={{width:40,height:40}}/></Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,height:hp(100) },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  empty: { fontSize: 16, textAlign: "center", marginTop: 40 },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    // backgroundColor: "#f4f4f4",
    borderRadius: 8,
  },
  cover: { width: 40, height: 40, borderRadius: 6 },
  info: { flex: 1, marginLeft: 10 },
  title: { fontSize: 16, fontWeight: "bold" },
  artist: { fontSize: 13, color: "#666" },
  playButton: { fontSize: 24, marginHorizontal: 10 },
  delete: { fontSize: 18, color: "red", marginLeft: 5 },

  // Player Section
  playerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#111",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius:5,
  },
  playerCover: { width: 50, height: 50, borderRadius: 8 },
  playerInfo: { flex: 1, marginLeft: 10 },
  playerTitle: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  playerArtist: { fontSize: 13, color: "#aaa" },
  timeText: { fontSize: 11, color: "#bbb", marginTop: 4 },
  playerButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  playerButtonText: { fontSize: 26, color: "#fff", marginHorizontal: 10 },
});

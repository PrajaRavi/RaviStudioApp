import { Audio } from "expo-av";
import * as SecureStore from "expo-secure-store";
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
import pauseicon from "../assets/pause.png";
import playbtnicon from "../assets/play-button.png";
import { hp } from "./helper";
import { useDownloadManager } from "./hooks/DownloadManager";
import { AppContext } from "./Store";
import TrackPlayer from "react-native-track-player";
let IP = "10.205.8.23";
export function DownloadScreen() {
  // const {IsDownloadPage}=useContext(AppContext)
  const {
    ImageUrl,
    setImageUrl,
    IsPlay,
    setArtist,
    setIsPlay,
    para,
    setpara,
    sound,
    setsound,
    Bhojsongdata,
    setBhojsongdata,
    IsCurr,
    setIsCurr,
    IsLogin,
    userdata,
    BackgroundImage,
    setBackgroundImage,
    songurl,
    setsongurl,
  } = useContext(AppContext);

  const { downloads, deleteSong } = useDownloadManager();
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  let [Bhojsongdata1,setBhojsongdata1]=useState([])
  const soundRef = useRef(null);
  
  async function AddDownloadedSongInQue(){
    let newarr=downloads.map((item,index)=>{
      return {
        id:String(index),
        url:item.uri,
        artwork:item.cover,
        title:item.songname,
        artist:item.artist
      }
    })
       await TrackPlayer.reset();
        await TrackPlayer.add(newarr)
        console.log(newarr)
        console.log("downloadnewarr")
    
  }
  async function playSound(name, cover, idx, artist, uri) {
    
    // alert(name+" "+cover+" "+idx+" "+artist)
    AddDownloadedSongInQue()
    setIsCurr(name);
    setsongurl(uri);

    setArtist(artist);
    //  console.log(data)
     
        setTimeout(async ()=>{
          await TrackPlayer.skip(Number(idx))
          await TrackPlayer.play();
        },500)
        setpara(name)
        setArtist(artist)
        setImageUrl({uri:cover})
        setIsPlay(true)
        setIsCurr(name)
    // let Data = await SecureStore.setItemAsync(
    //   "SongData",
    //   JSON.stringify({
    //     name,
    //     cover,
    //     idx,
    //     artist,
    //     TotalSong: Bhojsongdata.length,
    //   })
    // );
    // try {
    //   await Audio.setAudioModeAsync({
    //     staysActiveInBackground: true,
    //     shouldDuckAndroid: true,
    //     playThroughEarpieceAndroid: false,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    // try {
    //   setpara(name);
    //   setImageUrl({ uri: cover });

    //   if (sound) {
    //     await sound.pauseAsync();
    //     await sound.unloadAsync();
    //     const { sound: newSound } = await Audio.Sound.createAsync(
    //       {
    //         uri: uri,
    //       },
    //       {
    //         shouldPlay: true,
    //       },

    //       (status) => {
    //       }
    //     );
    //     setsound(newSound);
    //     // ;
    //     setIsPlay(true);
    //   } else {
    //     // alert('else case')
    //     const { sound } = await Audio.Sound.createAsync(
    //       {
    //         uri: uri,
    //       },
    //       {
    //         shouldPlay: true,
    //       },
    //       (status) => {
    //         // 

    //         ;
    //         // count=1
    //       }
    //     );
    //     setsound(sound);
    //     // setSound(sound);
    //     // sound.setStatusAsync=true

    //     // console.log('Playing Sound');
    //     setIsPlay(true);
    //     // 
    //     // console.log(status.positionMillis)
    //     let Data = await SecureStore.setItemAsync(
    //       "SongData",
    //       JSON.stringify({
    //         name,
    //         cover,
    //         idx,
    //         artist,
    //         TotalSong: Bhojsongdata.length,
    //       })
    //     );
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

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
                <Image source={{ uri: item.cover }} style={styles.cover} />
                <View style={styles.info}>
                  <Text style={styles.title}>
                    {String(item.songname).length > 20
                      ? item.songname.slice(0, 20) + ".."
                      : item.songname}
                  </Text>
                  {/* <Text>{item.name}</Text> */}
                  <Text style={styles.artist}>{item.artist}</Text>
                </View>

                {/* Play/Pause button */}
                <TouchableOpacity
                  onPress={() => {
                    playSound(
                      item.songname,
                      item.cover,
                      item.id,
                      item.artist,
                      item.uri
                    );
                  }}
                >
                  <Text style={styles.playButton}>
                    {isCurrent && isPlaying ? (
                      <Image
                        source={pauseicon}
                        style={{ width: 25, height: 25 }}
                      />
                    ) : (
                      <Image
                        source={playbtnicon}
                        style={{ width: 25, height: 25 }}
                      />
                    )}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteSong(item.id)}>
                  <Text style={styles.delete}>
                    <Image
                      source={deleteicon}
                      style={{ width: 25, height: 25 }}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}

      {/* 🎶 Full Music Player (bottom fixed) */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, height: hp(100) },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  empty: { fontSize: 16, textAlign: "center", marginTop: 40 },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
    marginBottom: 1,
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
    borderRadius: 5,
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

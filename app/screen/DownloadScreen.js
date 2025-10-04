import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as SecureStore from "expo-secure-store";
import React, { useContext, useRef, useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useDownloadManager } from "../hooks/DownloadManager";
import { AppContext } from "../Store";
let   IP='192.168.1.156';


export  function DownloadScreen() {
  const { downloads, deleteSong } = useDownloadManager();
  const [currentId, setCurrentId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);
  const {ImageUrl,setImageUrl,IsPlay,setArtist,setIsPlay,para,setpara,sound,setsound,setstatus,status,Bhojsongdata,setBhojsongdata,IsCurr,setIsCurr,IsLogin,userdata}=useContext(AppContext)

  // Play or toggle a song
  async function playSound(name,cover,idx,artist,title) {
    setIsCurr(name)
   

    setArtist(artist)
    let Data=await SecureStore.setItemAsync('SongData',JSON.stringify({name,cover,idx,artist,TotalSong:Bhojsongdata.length}))
    try {
      
      await Audio.setAudioModeAsync({
        staysActiveInBackground:true,
        shouldDuckAndroid:true,
        playThroughEarpieceAndroid:false,
      })
    } catch (error) {
      console.log(error)
    }
    try {
    setpara(title)
    setImageUrl({uri: cover})
    
    if(sound){
         await sound.pauseAsync()
         await sound.unloadAsync()
      const { sound:newSound } = await Audio.Sound.createAsync({
        uri:name
      },
      {
        shouldPlay:true,
      
      },


      (status)=>{
        setstatus(status)
          
      });
      setsound(newSound)
      console.log(status)
      setIsPlay(true)
      
      
    }
    else{
      // alert('else case')
      const { sound } = await Audio.Sound.createAsync({
        uri:name
      },
      {
        shouldPlay:true
      },
      (status)=>{
        // console.log(status)
        
        setstatus(status)
        // count=1
          
      });
      setsound(sound)
      // setSound(sound);
      // sound.setStatusAsync=true
      
 
      // console.log('Playing Sound');
      setIsPlay(true)
      // console.log(status)
      // console.log(status.positionMillis)
      let Data=await SecureStore.setItemAsync('SongData',JSON.stringify({name,cover,idx,artist,TotalSong:Bhojsongdata.length}))
    }
    } catch (error) {
      console.log(error)    
      
    }
  }

  const togglePlaySong = async (song) => {
    try {
      // If the current song is the same → toggle play/pause
      if (currentId === song.id) {
        if (isPlaying) {
          await soundRef.current?.pauseAsync();
          setIsPlaying(false);
        } else {
          await soundRef.current?.playAsync();
          setIsPlaying(true);
        }
        return;
      }

      // Stop previous song
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      // Load new song
      const { sound } = await Audio.Sound.createAsync(
        { uri: song.uri },
        { shouldPlay: true }
      );

      soundRef.current = sound;
      setCurrentId(song.id);
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
          setCurrentId(null);
        }
      });
    } catch (e) {
      console.error("Playback error:", e);
    }
  };

  return (
    <View style={styles.container}>
      
      {downloads.length === 0 ? (
        <Text style={styles.empty}>No songs downloaded</Text>
      ) : (
        <FlatList
          data={downloads}
          keyExtractor={(item) => item.id}
          renderItem={({ item ,index}) => {
            const isCurrent = currentId === item.id;

            return (
              <TouchableOpacity onPress={()=>{
                // togglePlaySong(item)
                playSound(item.uri,item.artwork,index,item.artist,item.title)
              }} style={styles.card}>
                <TouchableOpacity >
                  <Image source={{ uri: item.artwork }} style={styles.cover} />
                </TouchableOpacity>

                <View style={styles.info}>
                  <Text style={styles.title}>{String(item.title).length>25?(item.title).slice(0,25)+"..":item.title}</Text>
                  <Text style={styles.artist}>{item.artist}</Text>
                  <Text style={styles.duration}>
                    {item.duration
                      ? `${Math.floor(item.duration / 60)}:${Math.floor(
                          item.duration % 60
                        )
                          .toString()
                          .padStart(2, "0")}`
                      : "Unknown length"}
                  </Text>
                </View>

                <TouchableOpacity onPress={() => deleteSong(item.id)}>
                  <MaterialCommunityIcons name="delete" size={24} color="black" />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  empty: { fontSize: 16, textAlign: "center", marginTop: 40 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
  },
  cover: { width: 60, height: 60, borderRadius: 6 },
  info: { flex: 1, marginLeft: 12 },
  title: { fontSize: 16, fontWeight: "bold" },
  artist: { fontSize: 14, color: "#666" },
  duration: { fontSize: 12, color: "#999" },
  playButton: { marginHorizontal: 10 },
  playButtonText: { fontSize: 24 },
  delete: { fontSize: 20, color: "red", padding: 8 },
});

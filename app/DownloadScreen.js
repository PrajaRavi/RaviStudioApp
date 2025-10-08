import { Audio } from "expo-av";
import { use, useContext, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import deleteicon from "../assets/delete.png";
import * as SecureStore from 'expo-secure-store';
import nexticon from "../assets/next.png";
import pauseicon from '../assets/pause.png';
import playbtnicon from "../assets/play-button.png";
import playicon from "../assets/play.png";
import { hp } from "./helper";
import { useDownloadManager } from "./hooks/DownloadManager";
import { AppContext } from "./Store";
let IP='192.168.1.156';
export function DownloadScreen() {
  // const {IsDownloadPage}=useContext(AppContext)
  const {ImageUrl,setImageUrl,IsPlay,setArtist,setIsPlay,para,setpara,sound,setsound,setstatus,status,Bhojsongdata,setBhojsongdata,IsCurr,setIsCurr,IsLogin,userdata,BackgroundImage,setBackgroundImage,songurl,setsongurl}=useContext(AppContext)
  
  const { downloads, deleteSong } = useDownloadManager();
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const soundRef = useRef(null);
  useEffect(() => {
    setBhojsongdata(downloads)
    console.log(downloads)
    
    }, [downloads]);
   async function playSound(name,cover,idx,artist,uri) {
    // alert(name+" "+cover+" "+idx+" "+artist)
      setIsCurr(name)
     setsongurl(uri)
  
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
      setpara(name)
      setImageUrl({uri: cover})
      
      if(sound){
           await sound.pauseAsync()
           await sound.unloadAsync()
        const { sound:newSound } = await Audio.Sound.createAsync({
          uri:uri
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
          uri:uri

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
  
  
  return (
    <View style={styles.container}>
    
      {Bhojsongdata.length === 0 ? (
        <Text style={styles.empty}>No songs downloaded</Text>
      ) : (
        <FlatList
          data={Bhojsongdata}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isCurrent = currentSong?.id === item.id;
            return (
              <View style={styles.card}>
                <Image source={{ uri: item.cover }} style={styles.cover} />
                <View style={styles.info}>
                  <Text style={styles.title}>{String(item.songname).length>20?(item.songname).slice(0,20)+"..":item.songname}</Text>
                  {/* <Text>{item.name}</Text> */}
                  <Text style={styles.artist}>{item.artist}</Text>
                </View>

                {/* Play/Pause button */}
                <TouchableOpacity onPress={()=>{
playSound(item.songname,item.cover,item.id,item.artist,item.uri)
                }} >
                  <Text style={styles.playButton}>
                    {isCurrent && isPlaying ?<Image source={pauseicon} style={{width:25,height:25}}/>: <Image source={playbtnicon} style={{width:25,height:25}}/>}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteSong(item.id)}>
                  <Text style={styles.delete}><Image source={deleteicon} style={{width:25,height:25}}/></Text>
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


import { AntDesign, Feather, FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import { Audio } from 'expo-av'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Animated, DeviceEventEmitter, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import crossicon from "../assets/cancel.png"
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { VolumeManager } from 'react-native-volume-manager';
import loopicon from "../assets/exchange.png"
import nextbtnicon from "../assets/next.png"
import pauseicon from "../assets/pause.png"
import playicon from "../assets/play.png"
import threedotoption from "../assets/three-dots.png"
import '../global.css'
import logo from "../assets/ravi4.png"
import { DeviceDetect } from './utils/DeviceDetect'
import { isUserOnline } from './utils/Internate'
import { RotatingImage } from './utils/RotateImage'
import {usePlayPauseSignal} from './hooks/useSongPlayPaus'
// import {useCurrentTrack} from "./hooks/usecurrentrack"
let newarr=[];
let newTranscript;
// import TrackPlayer from 'react-native-track-player';

let {width,height}=Dimensions.get('window')

let   IP='192.168.1.155';
// let   IP='192.168.1.155';;
import axios from 'axios'
import { router, useRouter } from 'expo-router'
import * as Speech from 'expo-speech'
import { useContext } from 'react'
import { hp, wp } from './helper'
// import {} from "./musicplayer1"
// import {CircularMusicVisualizer} from './MusicVisualizer'
import { AppContext } from './Store'
// all imports of TTS
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent
} from 'expo-speech-recognition'
import Progressbar from "./utils/playerprogressbar"

import {setupPlayer,playSong,togglePlayPause,playNext} from "./musicplayer1"
import TrackPlayer ,{Event,RepeatMode,State,usePlaybackState, useTrackPlayerEvents} from 'react-native-track-player'
import TrackTime from "./hooks/useTrackTime"

export default function MusicPlayer({HandleProgress,HandleSlider,durationinmilli,positioninmilli,Second,Minute,currMinute,currSec,UserPlaylistData,userdata

}) {
const spinvalue=useRef(new Animated.Value(0)).current;  
const {t,i18n}=useTranslation()
     const {ImageUrl,setImageUrl,IsPlay,setArtist,setIsPlay,para,setpara,sound,setsound,Bhojsongdata,setBhojsongdata,Artist,IsCurr,setIsCurr,oneloop,setoneloop,songurl,setsongurl}=useContext(AppContext)
     let Data=useContext(AppContext)
     let [showadd,setshowadd]=useState(false)
    let [IsActive,setIsActive]=useState(false)
    // let [,oneloop,setoneloop]=useState(false)
    let [loop,setloop]=useState(false)
    let [internate,setinternate]=useState(true)
    let [IsFavrait,setIsFavrait]=useState(false)
  let [LikedSongData,setLikedSongData]=useState([])
  let [AddToPlaylist,setAddToPlaylist]=useState(false)
  let [Options,setOptions]=useState(false)
    let Inputvalue=useRef()
  let [selectedplaylsit,setselectedplaylist]=useState()
  const rotuer=useRouter();
  let [SQ,setSQ]=useState(false)//SQ->song quality
  // let [userplaylistSongs,setuserplaylistsongs]=useState([])
  // let [spokentext,setspokentext]=useState('')
  // const {currentTrack,playbackState}=useCurrentTrack()
const {position,duration}=TrackTime();
// implementing the TTS
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  let [volumeflag,setvolumeflag]=useState(1)
  let [nextflag,setnextflag]=useState(false)
  let [backflag,setbackflag]=useState(false)
  const [selectedId, setSelectedId] = useState('2'); // 'High' as default
  const QUALITY_OPTIONS = [
  { id: '1', quality: 'Normal', bitrate: '96 kbps', icon: 'speaker' },
  { id: '2', quality: 'High', bitrate: '160 kbps', icon: 'graphic-eq' },
  { id: '3', quality: 'Very High', bitrate: '320 kbps', icon: 'equalizer' },
  { id: '4', quality: 'Lossless (FLAC)', bitrate: '1411 kbps', icon: 'fiber-smart-record' },
];
const renderItem = ({ item }) => {
    const isSelected = item.id === selectedId;

    return (
      <Pressable 
        style={styles.itemContainer} 
        onPress={() => setSelectedId(item.id)}
      >
        <MaterialIcons 
          name={item.icon} 
          size={24} 
          color={isSelected ? '#3fa9f5' : 'white'} // Spotify green for selected
          style={styles.icon}
        />
        
        <View style={styles.textGroup}>
          <Text style={[styles.qualityText, isSelected && styles.selectedText]}>
            {item.quality}
          </Text>
          <Text style={styles.bitrateText}>
            {item.bitrate}
          </Text>
        </View>

        {/* --- Selection Indicator (Checkmark) --- */}
        {isSelected && (
          <MaterialIcons 
            name="check-circle" 
            size={24} 
            color="#3fa9f5" 
          />
        )}
      </Pressable>
    );
  };
  // let [Transcript,setTranscript]=useState("")
  const playback=usePlaybackState();

  // --- Event Listeners/Hooks ---

  useSpeechRecognitionEvent('start', () => {
    setIsRecognizing(true);
    setIsLoading(false);
    setTranscript(''); // Clear the interim transcript on start
  });

  useSpeechRecognitionEvent('end', () => {
    setIsRecognizing(false);
  });
  
  // This event fires continuously as the user speaks.
  useSpeechRecognitionEvent('result', async (event) => {
    
    newTranscript = event.results[0]?.transcript || '';
    setTranscript(newTranscript.trim().toLowerCase())
    
    setTranscript(newTranscript);
    console.log(newTranscript)
    // console.log(finalTranscript+'final')
    if(newTranscript.toLowerCase().includes("echo")||newTranscript.toLowerCase().includes("ego")||newTranscript.toLowerCase().includes("eko")||newTranscript.toLowerCase().includes("echo")||newTranscript.toLowerCase().includes("eaco")||newTranscript.toLowerCase().includes("eco")||newTranscript.toLowerCase().includes("bico")||newTranscript.toLowerCase().includes("e4")){
      if(TrackPlayer){

        await TrackPlayer.setVolume(0.2)
      } 
      else{
        Speech.speak("first play any song")
        alert("first play any song")
        return;
      }
      
      
      if(newTranscript.toLowerCase().includes("whoareyou")||newTranscript.toLowerCase().includes("who are you")||newTranscript.toLowerCase().includes("about yourself")||newTranscript.toLowerCase().includes("aboutyourself")||newTranscript.toLowerCase().includes("hu r u")||newTranscript.toLowerCase().includes("who r you")||newTranscript.toLowerCase().includes("who r u")||newTranscript.toLowerCase().includes("who r u")){
        await TrackPlayer.pause()
        await VolumeManager.setVolume(1);
        handleStopRecording()
        // await TrackPlayer.setVolume(0.2)
        Speech.speak("I am your voice assistant")
        setTimeout(async ()=>{
          await VolumeManager.setVolume(0.5);
          
          await TrackPlayer.play()
          setIsPlay(true)
          setTranscript("")
          handleStartRecording()
         
        // await TrackPlayer.setVolume(1)


          },2000)
        
      
      }
     else if(newTranscript.toLowerCase().includes("set volume")||newTranscript.toLowerCase().includes("Set volume")){
      // handleStopRecording()
  if(newTranscript.toLowerCase().includes("25")||newTranscript.toLowerCase().includes("twenty five")){
    await VolumeManager.setVolume(0.25)
    setvolumeflag(0.25)
  }        
     
  else if(newTranscript.toLowerCase().includes("50")||newTranscript.toLowerCase().includes("fifty")||newTranscript.toLowerCase().includes("be")){
    await VolumeManager.setVolume(0.50)
    setvolumeflag(0.50)

  }        
  else if(newTranscript.toLowerCase().includes("seventy five")||newTranscript.toLowerCase().includes("75")){
    await VolumeManager.setVolume(0.75)
    setvolumeflag(0.75)

  }        
  else if(newTranscript.toLowerCase().includes("100")||newTranscript.toLowerCase().includes("hundred")||newTranscript.toLowerCase().includes("full")){
    await VolumeManager.setVolume(1)
    setvolumeflag(1)

  }        
      // handleStartRecording()
      }
    
     else if(newTranscript.toLowerCase().includes("loop")||newTranscript.toLowerCase().includes("loom")){
     
       handleStopRecording()
      HandleLoop(Data.para);
          setTimeout(async ()=>{
await TrackPlayer.setVolume(volumeflag);
handleStartRecording()
        },2000)
        
      
      }
     else if(newTranscript.toLowerCase().includes("add this song in favourite")||newTranscript.toLowerCase().includes("at this song in favourite")){
      // alert(para)
      handleStopRecording()
      HandleAddFavraitSong(para)
          setTimeout(async ()=>{
await TrackPlayer.setVolume(volumeflag);
handleStartRecording()
        },2000)
        
      
      }
    //  else if(newTranscript.toLowerCase().includes("listen")||newTranscript.toLowerCase().includes("hear")){
    //       await VolumeManager.setVolume(1);
    //       await TrackPlayer.pause()
    //       Speech.speak("yes, absolutely, i can hear you")
    //     setTimeout(async ()=>{
    //       await VolumeManager.setVolume(volumeflag);
    //       await TrackPlayer.play()

    //       },2000)
        
      
    //   }
   
     else if(newTranscript.toLowerCase().includes("show MP")||newTranscript.toLowerCase().includes("show mp")||newTranscript.toLowerCase().includes("open mp")||newTranscript.toLowerCase().includes("so mp")||newTranscript.toLowerCase().includes("so MP")||newTranscript.toLowerCase().includes("open MP")){
      handleStopRecording()
      HandleSongMP();
          setTimeout(async ()=>{
await TrackPlayer.setVolume(volumeflag);
handleStartRecording()
        },2000)
        
      
      }
     else if(newTranscript.toLowerCase().includes("close MP")||newTranscript.toLowerCase().includes("close mp")){
      handleStopRecording()
      HandleCross();
          setTimeout(async ()=>{
await TrackPlayer.setVolume(volumeflag);
handleStartRecording()
        },2000)
        
      
      }
     else if(newTranscript.toLowerCase().includes("open download section")||newTranscript.toLowerCase().includes("open downloads")||newTranscript.toLowerCase().includes("downloads")||newTranscript.toLowerCase().includes("download") ||newTranscript.toLowerCase().includes("open download")){
      // navigation.navigate('DownloadSong')
      handleStopRecording()

      router.push('/DownloadSong')
      
          setTimeout(async ()=>{
await TrackPlayer.setVolume(volumeflag);
handleStartRecording()

        },2000)
        
      
      }
     else if(newTranscript.toLowerCase().includes("open home section")||newTranscript.toLowerCase().includes("open home")||newTranscript.toLowerCase().includes("home")||newTranscript.toLowerCase().includes("home") ||newTranscript.toLowerCase().includes("open home")){
      handleStopRecording()

      // navigation.navigate('DownloadSong')
      router.push('/(tabs)')
      
          setTimeout(async ()=>{
await TrackPlayer.setVolume(volumeflag);
handleStartRecording()

        },2000)
        
      
      }
     else if(newTranscript.toLowerCase().includes("open favourite section")||newTranscript.toLowerCase().includes("open favourite")||newTranscript.toLowerCase().includes("favourite")||newTranscript.toLowerCase().includes("favourite") ||newTranscript.toLowerCase().includes("open favourite")){
      // navigation.navigate('DownloadSong')
      handleStopRecording()

      router.push('/FavraitSong')
      
          setTimeout(async ()=>{
await TrackPlayer.setVolume(volumeflag);
handleStartRecording()

        },2000)
        
      
      }
     else if(newTranscript.toLowerCase().includes("open setting section")||newTranscript.toLowerCase().includes("open settings section")||newTranscript.toLowerCase().includes("open setting")||newTranscript.toLowerCase().includes("open settings")||newTranscript.toLowerCase().includes("setting")||newTranscript.toLowerCase().includes("setting") ||newTranscript.toLowerCase().includes("settings")){
      handleStopRecording()

      // navigation.navigate('DownloadSong')
      router.push('/setting')
      
          setTimeout(async ()=>{
await TrackPlayer.setVolume(volumeflag);
handleStartRecording()

        },2000)
        
      
      }
      else if(newTranscript.toLowerCase().includes("pause")||newTranscript.toLowerCase().includes("pose")||newTranscript.toLowerCase().includes("ecos")||newTranscript.toLowerCase().includes("stop")||newTranscript.toLowerCase().includes("stock")||newTranscript.toLowerCase().includes("cause")||newTranscript.toLowerCase().includes("paws")||newTranscript.toLowerCase().includes("paz")||newTranscript.toLowerCase().includes("eco top")||newTranscript.toLowerCase().includes("eco shop")){
     
  setIsPlay(false)
        await TrackPlayer.pause();
      
         setTimeout(async ()=>{
await TrackPlayer.setVolume(volumeflag);
// handleStartRecording()


        },2000)
     
      }
      else if(newTranscript.toLowerCase().includes("next")||newTranscript.toLowerCase().includes("forward")||newTranscript.toLowerCase().includes("forward")||newTranscript.toLowerCase().includes("echonext")||newTranscript.toLowerCase().includes("econext")||newTranscript.toLowerCase().includes("Econext")){
        // console.log("chala")
await TrackPlayer.setVolume(0.3);

        handleStopRecording();
        if(nextflag==false){

          Handlenext()
        }
        setnextflag(true)
         setTimeout(async ()=>{
await TrackPlayer.setVolume(volumeflag);
setnextflag(false)
handleStartRecording();

        },2000)
     
      }
      else if(newTranscript.toLowerCase().includes("previous")||newTranscript.toLowerCase().includes("back")||newTranscript.toLowerCase().includes("echoprevious")||newTranscript.toLowerCase().includes("ecoprevious")||newTranscript.toLowerCase().includes("Ecoprevious")||newTranscript.toLowerCase().includes("Ecoback") ||newTranscript.toLowerCase().includes("echo back")||newTranscript.toLowerCase().includes("ecoback")||newTranscript.toLowerCase().includes("eco bag")||newTranscript.toLowerCase().includes("echoback")){
        handleStopRecording();

        if(backflag==false){

          HandlePrev()
        }
        setbackflag(true)
        setTimeout(async ()=>{
          await TrackPlayer.setVolume(volumeflag);
          setbackflag(false)
handleStartRecording();

        },2000)
     
    }
      else if(newTranscript.toLowerCase().includes("play")||newTranscript.toLowerCase().includes("start")||newTranscript.toLowerCase().includes("start")||newTranscript.toLowerCase().includes("clap")||newTranscript.toLowerCase().includes("plague")||newTranscript.toLowerCase().includes("plate")||newTranscript.toLowerCase().includes("place")){
      handleStopRecording()
        setIsPlay(true)
        await TrackPlayer.play();
          setTimeout(async ()=>{
await TrackPlayer.setVolume(volumeflag);
handleStartRecording()
        },2000)
        
      
      }
    else{
      

         setTimeout(async ()=>{
await TrackPlayer.setVolume(volumeflag);
// setTranscript("")
// handleStartRecording();

        },2000)
    }   
  
  }
    // When the 'final' property is true, this is the final, confirmed text for a segment of speech.
    if (event.isFinal) {
      // Append the final result to the main history/final result state
      setFinalTranscript(prev => prev + newTranscript + ' '); 
      
      setTranscript(''); // Clear the current interim text
    }
    });

  useSpeechRecognitionEvent('error', (event) => {
    setIsRecognizing(false);
    setIsLoading(false);
    console.error('Speech Recognition Error:', event.error);
    handleStartRecording();
    // Alert.alert("Error", `Recognition failed: ${event.error?.message}`);
  });

  // setting up the data for next/previous function*ality in react-native-track-player
  async function CheckIfSongEndedOrNot(){
  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged,(data)=>{
    // console.log(data)
    // alert("yes ended")
    setTimeout(async ()=>{
let data=await TrackPlayer.getActiveTrack()
// alert(data.title)
setpara(data.title)
setIsCurr(data.title)
setImageUrl({uri:data.artwork})
    },500)

  })
}


  async function SetUpPlayer(){
    newarr=Bhojsongdata.map((item,index)=>{
      return ( {
        id:String(index+1),
        url:`http://${IP}:4500/${item.songname}`,
        title:item.songname,
        artist:item.artist,
        artwork:`http://${IP}:4500/${item.cover?item.cover:item.covername}`
      })
    })
      setupPlayer();
      setTimeout(async ()=>{

        await TrackPlayer.reset();
        await TrackPlayer.add(newarr)
      },1000)
      
    }

    

    // --- Permission and Initialization ---

  useEffect(() => {
    CheckIfSongEndedOrNot();
   SetUpPlayer();
  
    (async () => {
      setIsLoading(true);
      const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (result.granted) {
        setIsPermissionGranted(true);
       
      } else {
        Alert.alert("Permission Required", "Microphone and speech recognition permissions are needed.");
        // handleStartRecording();
      }
      setIsLoading(false);
    })();
  }, []);
  const handleStartRecording = async () => {
    if (!isPermissionGranted || isLoading) return;
    
    try {
      // Clear all text before starting a new session
      setTranscript('');
      setFinalTranscript('');
      
      // Start continuous listening
      await ExpoSpeechRecognitionModule.start({
        lang: 'en-IN',
        interimResults: true, // Crucial for real-time text
        continuous: true,    // Crucial for continuous listening
      });
      // The 'start' event hook will set isRecognizing to true
      // alert("started")
    } catch (error) {
      console.error('Failed to start recognition:', error);
      Alert.alert("Error", "Could not start recording.");
      setIsRecognizing(false);
    }
  };

  const handleStopRecording = async () => {
    try {
      // Manually stopping recognition. The 'end' event hook will set isRecognizing to false.
      await ExpoSpeechRecognitionModule.stop();
      // After stopping, the last 'interim' transcript is usually the final result. 
      // We push the last interim text to the final display.
      setFinalTranscript(prev => prev + transcript); 
      setTranscript('');
    } catch (error) {
      console.error('Failed to stop recognition:', error);
      Alert.alert("Error", "Could not stop recording.");
    }
  };

          
    // finalTranscript.trim() || "The finalized spoken text will appear here once the session ends.";
    // console.log(finalTranscript.trim())
  
  useEffect(()=>{
// setupSongEndListener(sound, Handlenext)
 const sub = DeviceEventEmitter.addListener('rntp-player-action', async (data) => {
      // data = { type: 'next' | 'previous' | 'play' | 'pause' | 'seek', seekTo?: number }
      // Update UI state by pulling latest info from TrackPlayer
     
        if (data?.type === 'nextsong'){
alert("next song")
        }
      
      })
      
    let myinterval=setInterval(()=>{
      IsUserOnline()
    },2000)
    Animated.loop(
      Animated.timing(spinvalue,{
          toValue:0,
          duration:3000,
          
          useNativeDriver:true
        })
      ).start()
      return ()=>clearInterval(myinterval)
    },[])
    const spin=spinvalue.interpolate({
      inputRange:[0,1],
      outputRange:['0deg','3600deg']
     })
  
  async function CollectDataLS(){


  } 
    async function IsUserOnline(){
  let data=await isUserOnline();
  // alert(data+"online")
  if(data==true) setinternate(true)
    else setinternate(false)

 }
  async function HandlePlay(){
    // alert("hello")
    try {
      
      if(IsPlay==true){
        setIsPlay(false)
        TrackPlayer.pause();
        
      }
      else{
        setIsPlay(true)
        // togglePlayPause();
        TrackPlayer.play();
        
        
      }
        // const playbackState=usePlaybackState();
      
        // // console.log(State)
        // if (playbackState === State.Playing) {
        //   await TrackPlayer.pause();
        //   setIsPlay(false)
        // } else {
        //   await TrackPlayer.play();
        //   setIsPlay(true)
        // }
      
    } catch (error) {
      console.log(error)
    }
  }
async function Handlenext(){
  
   
    
    let Data1=await SecureStore.getItemAsync('SongData')
  console.log(await TrackPlayer.getQueue())
  console.log("this is queue")
  // alert(parseInt(JSON.parse(Data1).idx)+1)
  setIsPlay(true)


  // await TrackPlayer.skip(parseInt(JSON.parse(Data1).idx)+1);
  await TrackPlayer.skipToNext();
  await TrackPlayer.play();
  let data=await TrackPlayer.getActiveTrack();
  console.log(data)
  console.log("data")
 CheckSongIsFavrait(data.title)
      setIsCurr(data.title)
      setsongurl(data.url)
      setpara(data.title)
      setImageUrl({uri:data.artwork})
      setArtist(data.artist)
let Data=await SecureStore.setItemAsync('SongData',JSON.stringify({name:data.title,cover:data.artwork,idx:Number(data.idx)+1,artist:data.artist,TotalSong:Bhojsongdata.length}))

  // console.log(data)
  
  // // alert("Music player test hai")
  //   let SongData=JSON.parse(Data1)
  // //  console.log(Data1)
  //   let {idx,TotalSong}=SongData
  //   try {
    
   
  //   if(idx<TotalSong-1){
  //     // await TrackPlayer.reset();
  //    let nextsong=Bhojsongdata[idx+1]
  //     // alert(nextsong.songname+"and"+nextsong.name)
  //     CheckSongIsFavrait(nextsong.songname)
  //     setIsCurr(nextsong.songname)
  //     setsongurl(nextsong.uri)
  //     setpara(nextsong.songname)
  //     await TrackPlayer.load({id:idx,url:`http://${IP}:4500/${nextsong.songname}`,title:nextsong.songname,artist:nextsong.artist,artwork:`http://${IP}:4500/${nextsong.cover?nextsong.cover:nextsong.covername}`})
  //     setImageUrl({uri:`http://${IP}:4500/${nextsong.cover?nextsong.cover:nextsong.covername}`})
  //     await TrackPlayer.play();
  //   console.log(`▶️ Now playing: ${nextsong.songname}`);

  //   }
  //   else{
  //     // alert('else')
  //     CheckSongIsFavrait(Bhojsongdata[0].songname)
  //     setIsCurr(Bhojsongdata[0].songname)
  //     setsongurl(Bhojsongdata[0].uri)
  //     setpara(Bhojsongdata[0].songname)
  //     await TrackPlayer.load({id:idx,url:`http://${IP}:4500/${Bhojsongdata[0].songname}`,title:Bhojsongdata[0].songname,artist:Bhojsongdata[0].artist,artwork:Bhojsongdata[0].cover})
  //     let Data=await SecureStore.setItemAsync('SongData',JSON.stringify({name:Bhojsongdata[0].songname,cover:Bhojsongdata[0].cover,idx:0,artist:Bhojsongdata[0].artist,TotalSong:Bhojsongdata.length}))
  //     setImageUrl({uri:`http://${IP}:4500/${Bhojsongdata[0].cover?Bhojsongdata[0].cover:Bhojsongdata[0].covername}`})
     

   
  //   }

   
     
             
  //   } catch (error) {
  //     console.log(error)
  //   }
    
  }
async function HandlePrev(){
   let Data1=await SecureStore.getItemAsync('SongData')
  console.log(await TrackPlayer.getQueue())
  console.log("this is queue")
  setIsPlay(true)
  // alert(parseInt(JSON.parse(Data1).idx)+1)

  // await TrackPlayer.skip(parseInt(JSON.parse(Data1).idx)+1);
  await TrackPlayer.skipToPrevious();
  await TrackPlayer.play();
  let data=await TrackPlayer.getActiveTrack();
  console.log(data)
  console.log("data")
 CheckSongIsFavrait(data.title)
      setIsCurr(data.title)
      setsongurl(data.url)
      setpara(data.title)
      setImageUrl({uri:data.artwork})
      setArtist(data.artist)
let Data=await SecureStore.setItemAsync('SongData',JSON.stringify({name:data.title,cover:data.artwork,idx:Number(data.idx)+1,artist:data.artist,TotalSong:Bhojsongdata.length}))

  }

  useEffect(()=>{
  CollectDataLS()
  CollectLikedSongData()
},[])
 function HandleSongMP(){
   

  handleStartRecording()
  // startListening()
setIsActive(true)
 }
 function HandleCross(){
  setIsActive(false)

 }
 async function HandleLoop(name){
  
  // alert(songurl+"loop")
  if(oneloop==false &&loop==false){
    // setloop(true)
  //  one loop
  setoneloop(true)
    // oneloop(true)
    await TrackPlayer.setRepeatMode(RepeatMode.Track);
     Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            
            textBody: `playing ${name} song in loop`,
      
          })
        }
        
  if(oneloop==true){
    setoneloop(false)
    setloop(true)

    // all songs playing in loop
    
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
     Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            
            textBody: `playing All song in loop`,
      
          })

  }
  if(loop==true && oneloop==false){
    setoneloop(false)
    alert("Nothing playing in loop")
    await TrackPlayer.setRepeatMode(RepeatMode.Off);

    setloop(false)
  }

 }
 async function CollectSongsOfUserPlaylist(playlistname){
  
  try {
    
    let Data=await axios.get(`http://${IP}:4500/UserPlaylistSongData/${userdata._id}/${playlistname}/`)
console.log(Data.data)
    if(Data.data==''){
   

      setIsSong(false)
      // alert("Data Not Found")
      
    }
    else{
      
      let SongExistOrNot=Data.data.filter((item)=>{
        return item.name==para
      })
      // console.log(SongExistOrNot)
      return SongExistOrNot
      
   

    }
  } catch (error) {
  console.log(error)
  }
  // console.log(Data.data)
  }
 async function HandleAddFavraitSong(songname){

  if(IsFavrait==false){

    let name=songname;
    let artist=Artist;
    let cover=ImageUrl.uri.replace(`http://${IP}:4500/`,'')

    // console.log(`${songname} and ${Artist} and ${ImageUrl.uri.replace(`http://${IP}:4500/`,'')}`)
    try {
      
      let Data = await axios.post(
    `http://${IP}:4500/AddFavSong/${userdata._id}`,
    { name, cover, artist }
  );
  // console.log(Data.data)  
  CollectLikedSongData()
  alert('Song added in favrait list')
  CheckSongIsFavrait(songname)
} catch (error) {
  console.log(error)
}
}
else{
  alert('Song already added in favrait list')
}
 }
 async function CollectLikedSongData() {
  
    try {
       
      let Data = await axios.get(
        `http://${IP}:4500/FavSongData/${userdata._id}`
      );
      // alert('Lided Song')
      // console.log(Data.data)
      if (Data) {
        console.log(Data.data)
        setLikedSongData(Data.data);
     
        
      } else {
    
        console.log("Data not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
  function CheckSongIsFavrait(para){
// console.log(LikedSongData)
if(LikedSongData.length>=1){

  let Data=LikedSongData.filter((item)=>{
    return (item.songname==para)
  })
  console.log(Data)
  if(Data.length!=0){
    setIsFavrait(true)
  }
  else{
    setIsFavrait(false)
  }
}
  }
  async function HandleThreeDotOption(){
    console.log(UserPlaylistData)
    if(AddToPlaylist==false){

      setAddToPlaylist(true)
      setOptions(false)
    }
    else{
setAddToPlaylist(false)
setOptions(false)
    }

  }
  async function HandleOptions(){
    if(Options==false){
      

      setAddToPlaylist(false)
      setOptions(true)
    }
    else{
      setOptions(false)
    }
  }
  function HandleInput(){
    // alert('hi')
    // console.log(Inputvalue.current)
  }
  async function HandleSongAddInUserPlaylist(userplaylistname){
    // console.log(userdata)
    let {data}=await axios.get(`http://${IP}:4500/UserPlaylistSongData/${userdata._id}/${userplaylistname}/`)
    console.log(data)
        if(data==''){
       
         alert('if')
        
          let Data=await SecureStore.getItemAsync('SongData')
            let SongData=JSON.parse(Data)
            let{idx,TotalSong}=SongData
            let cover=(ImageUrl.uri).replace(`http://${IP}:4500/`,'')
            // console.log(SongData)
            // console.log(`${para} and ${Artist} and ${cover}`)
            try {
              let Data = await axios.post(
                `http://${IP}:4500/AddSongsINUserPlaylist/${userdata._id}`,
                {
                  userplaylistname,
                  newsong: {
                    name:para,
                    artist:Artist,
                    cover,
                    idx,
                    TotalSong,
                  },
                }
              );
              if(Data.data){
        
                console.log(Data.data)
                alert(t('songaddinplaylist'))
              }
              else{
                console.log('Data Not found')
              }
            } catch (error) {
              console.log(error)
            }
          // alert("Data Not Found")
          
        }
      else{

        ``
        let SongExistOrNot=data.filter((item)=>{
           return item.name==para
          })
        
          if(SongExistOrNot[0]==undefined){
            // alert("name nahi hai")
            let Data=await SecureStore.getItemAsync('SongData')
            let SongData=JSON.parse(Data)
            let{idx,TotalSong}=SongData
            let cover=(ImageUrl.uri).replace(`http://${IP}:4500/`,'')
            // console.log(SongData)
            // console.log(`${para} and ${Artist} and ${cover}`)
            try {
              let Data = await axios.post(
                `http://${IP}:4500/AddSongsINUserPlaylist/${userdata._id}`,
                {
                  userplaylistname,
                  newsong: {
                    name:para,
                    artist:Artist,
                    cover,
                    idx,
                    TotalSong,
                  },
                }
              );
              if(Data.data){
        
                console.log(Data.data)
                alert(t('songaddinplaylist'))
              }
              else{
                console.log('Data Not found')
              }
            } catch (error) {
              console.log(error)
            }
        }
        else{
          // alert('name  hai')
          alert('Song already exist in this playlist')
        }
                          
                          
               }
                        }

  

                        return (
    
    <>
{/* <NotificationController sound={sound} nextSong={Handlenext} previousSong={HandlePrev}/>     */}
  {/* <AlertNotificationRoot> */}
    <View >

     <View style={DeviceDetect()=='Mobile'?{position:'absolute',bottom:50,zIndex:30}: {position:'absolute',bottom:80,zIndex:30}}  >
      <Text style={transcript==""?{textAlign:'center',backgroundColor:'black',color:'white',borderWidth:3,borderColor:'transparent',width:wp(90),marginHorizontal:'auto',borderRadius:10}:{textAlign:'center',backgroundColor:'#000',color:'#3fa9f5',borderWidth:3,borderColor:'#3fa9f5',width:wp(90),marginHorizontal:'auto',borderRadius:10}}>{transcript==""?"speak something":transcript}</Text>
     
<View style={{paddingHorizontal:14,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:wp(100),backgroundColor:'black',paddingVertical:6,borderRadius:23,}}  className=' flex  items-center  justify-between w-[90%] py-1 bg-black rounded-md   border-2 flex-row'>
{/* <AntDesign name="pause-circle" className='border-2 text- border-white rounded-full' size={40} color="white" /> */}

<TouchableOpacity onPress={()=>{
  HandlePlay()
}}>{Data.IsPlay?<Image source={pauseicon} style={{width:40,height:40}}/>:<Image source={playicon} style={{width:40,height:40}}/>}</TouchableOpacity>
{/* {para.length>40?(para.slice(0,40)+'...'):para} */}
<Text onPress={()=>{
  HandleSongMP()
  // alert(para)
  CheckSongIsFavrait(para)
}} className=' ' ref={Data.songname1}   style={{width:width*0.5,color:'white'}}>{para!=undefined?para.length>40?((para).slice(0,40)+'...'):para:null}</Text>
{/* <Text > {para.length>40?(para.slice(0,40)+'...'):para}</Text> */}
{/* <Image  source={Data.ImageUrl} style={{width:50,height:50,borderRadius:100,borderColor:'#3fa9f5',padding:5,borderWidth:3}} className='w-[50px] hover:scale-50 right-image  h-[50px]     border-2  rounded-full' /> */}
<RotatingImage imageSource={Data.ImageUrl} size={50} isPlaying={IsPlay} duration={5000} soundObject={sound} />
</View>
</View>

{IsActive?<View style={DeviceDetect()=='Mobile'?{backgroundColor:'black',zIndex:50,position:'absolute',bottom:0,padding:5,borderRadius:15,height:hp(70),display:'flex',flexDirection:'column',gap:20,paddingTop:20}:{backgroundColor:'black',zIndex:50,position:'absolute',bottom:0,padding:5,borderRadius:15,height:hp(80),display:'flex',flexDirection:'column',gap:20,paddingTop:20}} >
<View className='header flex w-[100%] justify-between flex-row '>
{/* <Entypo name="cross" onPress={HandleCross} size={40} color="#3fa9f5" /> */}
<TouchableOpacity onPress={()=>{
  HandleCross()
}} style={{paddingHorizontal:5}}>

<Image source={crossicon} style={{width:25,height:25}}/>
</TouchableOpacity>

<TouchableOpacity onPress={()=>{
  HandleThreeDotOption()
  setSQ(false)
}}><Image source={threedotoption} style={{width:30,height:30}}/></TouchableOpacity>
{AddToPlaylist?<View style={{position:'absolute',top:20,right:25,backgroundColor:'#1F2A38',padding:15,borderRadius:10,width:wp(50),zIndex:50,gap:10}}>
  <TouchableOpacity onPress={()=>{
    HandleOptions()
  }} style={{display:'flex',flexDirection:'row',justifyContent:'space-around',gap:10}}>
    <AntDesign name="plus" size={20} color="white" /><Text className='text-white'>Add to Playlist</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={()=>{
  setSQ(true)
  }} style={{display:'flex',flexDirection:'row',justifyContent:'space-around',gap:10}}>
    <Feather name="music" size={24} color="white" /><Text className='text-white'>Song quality</Text>
  </TouchableOpacity>
  
  </View>:null
  
}
{SQ?<View style={styles.listWrapper}>
      <Text style={styles.header}>Select Streaming Quality</Text>
      <FlatList
        data={QUALITY_OPTIONS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        // No numColumns needed here since it's a single list
      />
    </View>:null
}
{Options?<View className='flex items-center justify-center bg-black gap-4  z-50 absolute left-[50px] rounded-md'>

<FlatList style={{height:200}}  data={UserPlaylistData} renderItem={({item})=>{
return <TouchableOpacity onPress={()=>{
  HandleInput()
}} style={{display:'flex',alignItems:'center',justifyContent:'center',width:300}}>
<Text editable={false} ref={Inputvalue} value={item.playlistname} onPress={()=>{
  setselectedplaylist(item.playlistname)
}}   className={selectedplaylsit!=item.playlistname?'text-white  text-xl px-5  my-2  border-2 border-white rounded-md w-[200px] text-center':'text-black bg-[#3fa9f5]  text-xl px-5  my-2  border-2 border-black rounded-md w-[200px] text-center'}>{item.playlistname}</Text>
</TouchableOpacity>
}}/>
<TouchableOpacity onPress={()=>{
  // alert(selectedplaylsit)
  HandleSongAddInUserPlaylist(selectedplaylsit)
  setOptions(false)
  setselectedplaylist('')
}}>
<Text className='text-black bg-[#3fa9f5]  text-xl px-5  my-2  border-2 border-black rounded-md w-[200px] text-center'>Done</Text>
</TouchableOpacity>
</View>:null}
</View>
<View style={{display:'flex',alignItems:'center',justifyContent:'center'}}>

{showadd==false?<Image  source={ImageUrl} style={{width:200,height:200,borderRadius:100}}  />:
<View>
  <Text style={{color:"white",fontSize:40,borderWidth:3,borderColor:'red',width:wp(90),height:hp(40)}}>show ads</Text>
  </View>}
</View>
<View className='w-[90%] mx-auto flex items-center justify-center flex-col'>

<Text className='text-white'>{Data.Artist!=undefined?Data.Artist.length>40?((Data.Artist).slice(0,40)+'...'):Data.Artist:null}</Text>
<Text className='text-white'>{Data.para!=undefined?Data.para.length>40?((Data.para).slice(0,40)+'...'):Data.para:null}</Text>
  <Text style={transcript==""?{textAlign:'center',backgroundColor:'black',color:'white',width:wp(90),marginHorizontal:'auto',borderRadius:10,position:'relative',top:30}:{textAlign:'center',backgroundColor:'#000',color:'#3fa9f5',width:wp(90),marginHorizontal:'auto',borderRadius:10,position:'relative',top:30}}>{transcript==""?"speak something":transcript}</Text>
</View>
<View>
<TouchableOpacity onPress={()=>{
  // setIsFavrait(!IsFavrait)
  HandleAddFavraitSong(Data.para)
}}>

{IsFavrait?<AntDesign className='absolute right-5 bottom-[40px]' name="heart" size={24} color="red" />:<AntDesign className='absolute right-9 bottom-[40px]' name="heart" size={24} color="white" />}
</TouchableOpacity>
<Progressbar/>
  </View>
 { <View style={{display:'flex',alignContent:'center',flexDirection:'row',alignItems:'center',justifyContent:'center',width:'100%',gap:20}}>
  
<View style={{position:'relative',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

 <TouchableOpacity onPress={()=>{
  HandleLoop(Data.para)
 }}>
  <Image source={loopicon} style={{width:25,height:25}}/>
 </TouchableOpacity>
 {oneloop?<Text className='text-[#3fa9f5]'>1</Text>:null}
 </View>
  {/* <AntDesign name="backward" onPress={()=>{
    HandlePrev(Data.para)
  }} size={30} color="white" /> */}
  <TouchableOpacity onPress={()=>{
  HandlePrev(Data.para)
}}>

<Image source={nextbtnicon}  style={{width:30,height:30,transform:[{rotateY:'180deg'}]}}/>
</TouchableOpacity>

  <TouchableOpacity onPress={()=>{
    HandlePlay()
  }}>{Data.IsPlay?<Image source={pauseicon} style={{width:40,height:40}}/>:<Image source={playicon} style={{width:40,height:40}}/>}</TouchableOpacity>
{/* <Feather name="skip-forward" onPress={()=>{
  Handlenext(Data.para)
}} size={30} color="white" /> */}
<TouchableOpacity onPress={()=>{
  Handlenext(Data.para)
}}>

<Image source={nextbtnicon}  style={{width:30,height:30}}/>
</TouchableOpacity>
{/* <SimpleLineIcons name="shuffle" size={22} className='mx-3' color="white" /> */}
<TouchableOpacity onPress={()=>{
  alert('This feature coming soon')
}}>

<FontAwesome6 name="shuffle"  size={24} color="white" />
</TouchableOpacity>
  </View>}

</View>:null}
    </View>
    
{/* </AlertNotificationRoot> */}
</>
      
    
  )
}
const styles = StyleSheet.create({
  listWrapper: {
    flex: 1,
    backgroundColor: '#1F2A38',
    padding: 20,
    color:'white',
    borderRadius:23,
    position:'absolute',
    top:10,
    zIndex:50,
    right:30,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  icon: {
    marginRight: 15,
  },
  textGroup: {
    flex: 1, // Ensures the text group takes up available space
    justifyContent: 'center',
  },
  qualityText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  bitrateText: {
    fontSize: 14,
    color: 'white',
  },
  selectedText: {
    color: '#3fa9f5', // Change text color when selected
    fontWeight: 'bold',
  }
});
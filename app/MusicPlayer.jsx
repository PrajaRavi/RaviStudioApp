
import { AntDesign, FontAwesome6 } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import { Audio } from 'expo-av'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Animated, Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import crossicon from "../assets/cancel.png"
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
let newarr=[];
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
import {CircularRainbowVisualizer} from './MusicVisualizer'
import { AppContext } from './Store'
// all imports of TTS
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent
} from 'expo-speech-recognition'
import Progressbar from "./utils/playerprogressbar"

import {setupPlayer,playSong,togglePlayPause,playNext} from "./musicplayer1"
import TrackPlayer ,{Event,usePlaybackState} from 'react-native-track-player'
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
  // let [userplaylistSongs,setuserplaylistsongs]=useState([])
  // let [spokentext,setspokentext]=useState('')
  
const {position,duration}=TrackTime();
// implementing the TTS
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

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
    
    const newTranscript = event.results[0]?.transcript || '';
    
    // setTranscript(newTranscript);
    console.log(newTranscript)
    if(newTranscript.includes("echo")||newTranscript.includes("ego")||newTranscript.includes("eko")||newTranscript.includes("Echo")||newTranscript.includes("Eco")||newTranscript.includes("Eeco")){
      if(sound){

        await sound.setVolumeAsync(0.2);
      } 
      else{
        Speech.speak("first play any song")
        alert("first play any song")
        return;
      }
      
      
      if(newTranscript.includes("whoareyou")||newTranscript.includes("who are you")||newTranscript.includes("about yourself")||newTranscript.includes("aboutyourself")||newTranscript.includes("who r u")||newTranscript.includes("who r you")||newTranscript.includes("who r u")||newTranscript.includes("who r u")){
        await sound.setVolumeAsync(1);
        Speech.speak("I am your voice assistant")
        
      
      }
     else if(newTranscript.includes("play in loop")){
      HandleLoop(Data.para);
          setTimeout(async ()=>{
await sound.setVolumeAsync(1);
        },2000)
        
      
      }
     else if(newTranscript.includes("play")||newTranscript.includes("start")||newTranscript.includes("start")||newTranscript.includes("clap")||newTranscript.includes("plague")||newTranscript.includes("plate")||newTranscript.includes("place")){
        setIsPlay(true)
        await sound.playAsync();
          setTimeout(async ()=>{
await sound.setVolumeAsync(1);
        },2000)
        
      
      }
     else if(newTranscript.includes("show MP")||newTranscript.includes("show mp")||newTranscript.includes("open mp")||newTranscript.includes("so mp")||newTranscript.includes("so MP")||newTranscript.includes("open MP")){
      HandleSongMP();
          setTimeout(async ()=>{
await sound.setVolumeAsync(1);
        },2000)
        
      
      }
     else if(newTranscript.includes("close MP")||newTranscript.includes("close mp")){
      HandleCross();
          setTimeout(async ()=>{
await sound.setVolumeAsync(1);
        },2000)
        
      
      }
     else if(newTranscript.includes("open download section")||newTranscript.includes("open downloads")||newTranscript.includes("downloads")||newTranscript.includes("download") ||newTranscript.includes("open download")){
      // navigation.navigate('DownloadSong')
      router.push('/DownloadSong')
      
          setTimeout(async ()=>{
await sound.setVolumeAsync(1);
        },2000)
        
      
      }
     else if(newTranscript.includes("open home section")||newTranscript.includes("open home")||newTranscript.includes("home")||newTranscript.includes("home") ||newTranscript.includes("open home")){
      // navigation.navigate('DownloadSong')
      router.push('/(tabs)')
      
          setTimeout(async ()=>{
await sound.setVolumeAsync(1);
        },2000)
        
      
      }
     else if(newTranscript.includes("open favourite section")||newTranscript.includes("open favourite")||newTranscript.includes("favourite")||newTranscript.includes("favourite") ||newTranscript.includes("open favourite")){
      // navigation.navigate('DownloadSong')
      router.push('/FavraitSong')
      
          setTimeout(async ()=>{
await sound.setVolumeAsync(1);
        },2000)
        
      
      }
     else if(newTranscript.includes("open setting section")||newTranscript.includes("open settings section")||newTranscript.includes("open setting")||newTranscript.includes("open settings")||newTranscript.includes("setting")||newTranscript.includes("setting") ||newTranscript.includes("settings")){
      // navigation.navigate('DownloadSong')
      router.push('/setting')
      
          setTimeout(async ()=>{
await sound.setVolumeAsync(1);
        },2000)
        
      
      }
      else if(newTranscript.includes("pause")||newTranscript.includes("pose")||newTranscript.includes("stop")||newTranscript.includes("cause")||newTranscript.includes("paws")||newTranscript.includes("paz")||newTranscript.includes("EcoSport")){
  setIsPlay(false)
        await sound.pauseAsync();
      
         setTimeout(async ()=>{
await sound.setVolumeAsync(1);

        },2000)
     
      }
      else if(newTranscript.includes("next")||newTranscript.includes("forward")||newTranscript.includes("forward")||newTranscript.includes("echonext")||newTranscript.includes("econext")||newTranscript.includes("Econext")){
        Handlenext()
         setTimeout(async ()=>{
await sound.setVolumeAsync(1);
        },2000)
     
      }
      else if(newTranscript.includes("previous")||newTranscript.includes("back")||newTranscript.includes("echoprevious")||newTranscript.includes("ecoprevious")||newTranscript.includes("Ecoprevious")||newTranscript.includes("Ecoback") ||newTranscript.includes("echo back")||newTranscript.includes("ecoback")||newTranscript.includes("eco bag")||newTranscript.includes("echoback")){
        HandlePrev()
         setTimeout(async ()=>{
await sound.setVolumeAsync(1);
        },2000)
     
    }
    else{
         setTimeout(async ()=>{
await sound.setVolumeAsync(1);
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
    Alert.alert("Error", `Recognition failed: ${event.error?.message}`);
  });

  // setting up the data for next/previous function*ality in react-native-track-player
  async function CheckIfSongEndedOrNot(){
  TrackPlayer.addEventListener(Event.PlaybackQueueEnded,(data)=>{
    console.log(data)
    alert("yes ended")

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
      await TrackPlayer.reset();
      await TrackPlayer.add(newarr)
      
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
        // handleStartRecording()
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

  // await TrackPlayer.skip(parseInt(JSON.parse(Data1).idx)+1);
  await TrackPlayer.skipToNext();
  await TrackPlayer.play();
  let data=await TrackPlayer.getActiveTrack();
  console.log(data)
  console.log("data")
//  CheckSongIsFavrait(data.songname)
      setIsCurr(data.title)
      setsongurl(data.url)
      setpara(data.title)
      setImageUrl({uri:data.artwork})
      setArtist(data.artist)
let Data=await SecureStore.setItemAsync('SongData',JSON.stringify({name:data.title,cover:data.artwork,idx:(JSON.parse(Data1).idx)+1,artist:data.artist,TotalSong:Bhojsongdata.length}))

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
    let SongData=JSON.parse(Data1)
    console.log(SongData)
    let {idx,TotalSong}=SongData
    try {
    //  console.log(SongData.idx)
    // //  console.log(Data.Bhojsongdata)
    if(idx==0){
      // alert('if')
      let nextsong=Bhojsongdata[0]
      setsongurl(nextsong.uri)

      if(sound){
        // alert("run")
        
         await  sound.pauseAsync()
          await sound.unloadAsync()
           const { sound:newSound } = await Audio.Sound.createAsync({
          uri:String(nextsong.uri).includes("file:///")?nextsong.uri:`http://${IP}:4500/${nextsong.songname}`
          
        },
        {
          shouldPlay:true
        },
  
  
        (status)=>{
          // 
          
          // count=1
            
        });
        // alert('sound')
        setsound(newSound)
        // await Audio.setAudioModeAsync()
        setIsPlay(true)
        
        setArtist(nextsong.artist)
        setpara(nextsong.songname)
        if(String(nextsong.cover).includes("file:///")){
          setImageUrl({uri:nextsong.cover})
        }
        else{

       setImageUrl({uri:String(nextsong.cover).includes("file:///")?nextsong.cover:`http://${IP}:4500/${nextsong.covername}`})
        }

        // sound.setStatusAsync=true
       
     
        console.log('Playing Sound');
        
  let LSData=await SecureStore.setItemAsync('SongData',JSON.stringify({name:nextsong.songname,cover:nextsong.cover,idx:SongData.idx+1,artist:nextsong.artist,TotalSong:Bhojsongdata.length}))
      }
       else{
            // alert('else case')
            // console.log(LSdata.sound)
            const { sound } = await Audio.Sound.createAsync({
              uri:String(nextsong.uri).includes("file:///")?nextsong.uri:`http://${IP}:4500/${nextsong.songname}`
            },
            {
              shouldPlay:true
            },
            (status)=>{
              // 
              
              
              // count=1
                
            });
            setsound(sound)
            // setSound(sound);
            // sound.setStatusAsync=true
            setArtist(nextsong.artist)
        setpara(nextsong.songname)
        if(String(nextsong.cover).includes("file:///")){
          setImageUrl({uri:nextsong.cover})
        }
        else{

        setImageUrl({uri: String(nextsong.cover).includes("file:///")?nextsong.cover:`http://${IP}:4500/${nextsong.covername}`})
        }

       
            console.log('Playing Sound');
            let LSData=await SecureStore.setItemAsync('SongData',JSON.stringify({name:nextsong.songname,cover:nextsong.cover,idx:SongData.idx+1,artist:nextsong.artist,TotalSong:Bhojsongdata.length}))
            setIsPlay(true)
            // 
            // console.log(status.positionMillis)
          }
    }
    else{
      // alert('else')
      let nextsong=Bhojsongdata[idx-1]
      setsongurl(nextsong.uri)
      // console.log(nextsong.songname||nextsong.name)
      setIsCurr(nextsong.songname)
      CheckSongIsFavrait(nextsong.songname)
      if(sound){
        // alert("run")
        
           sound.pauseAsync()
           sound.unloadAsync()
           const { sound:newSound } = await Audio.Sound.createAsync({
          uri:String(nextsong.uri).includes("file:///")?nextsong.uri:`http://${IP}:4500/${nextsong.songname}`
        },
        {
          shouldPlay:true
        },
  
  
        (status)=>{
          // 
          
          // count=1
            
        });
        // alert('sound')
        setsound(newSound)
        // await Audio.setAudioModeAsync()
        setIsPlay(true)
        setArtist(nextsong.artist)
        setpara(nextsong.songname)
        if(String(nextsong.cover).includes("file:///")){
          setImageUrl({uri:nextsong.cover})
        }
        else{
        setImageUrl({uri: String(nextsong.cover).includes("file:///")?nextsong.cover:`http://${IP}:4500/${nextsong.covername}`})
        }
        
        // setSound(sound);
        // sound.setStatusAsync=true
       
     
        console.log('Playing Sound');
        
  let LSData=await SecureStore.setItemAsync('SongData',JSON.stringify({name:nextsong.songname,cover:nextsong.cover,idx:0,artist:nextsong.artist,TotalSong:Bhojsongdata.length}))
  // // // console.log(Data.status.didJustFinish)
  // // // console.log(Data.status)
  // // // console.log(Data.sound.getStatusAsync())
  // // // console.log(songurl)
  // // // console.log('songurl')
      }
       else{
            // alert('else case')
            // console.log(LSdata.sound)
            const { sound } = await Audio.Sound.createAsync({
              uri:String(nextsong.uri).includes("file:///")?nextsong.uri:`http://${IP}:4500/${nextsong.songname}`
            },
            {
              shouldPlay:true
            },
            (status)=>{
              // 
              
              
              // count=1
                
            });
            setsound(sound)
            // setSound(sound);
            // sound.setStatusAsync=true
            
            setArtist(nextsong.artist)
            setpara(nextsong.songname)
            if(String(nextsong.cover).includes("file:///")){  
              setImageUrl({uri:nextsong.cover})
            }
            else{

            setImageUrl({uri: String(nextsong.cover).includes("file:///")?nextsong.cover:`http://${IP}:4500/${nextsong.covername}`})
            }

            console.log('Playing Sound');
            let LSData=await SecureStore.setItemAsync('SongData',JSON.stringify({name:nextsong.songname,cover:nextsong.cover,idx:SongData.idx+1,artist:nextsong.artist,TotalSong:Bhojsongdata.length}))
            setIsPlay(true)
            // 
            // console.log(status.positionMillis)
          }
    }

   
     
             
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
  CollectDataLS()
  CollectLikedSongData()
},[])
 function HandleSongMP(){
   

  // handleStartRecording()
  // startListening()
setIsActive(true)
 }
 function HandleCross(){
  setIsActive(false)

 }
 async function HandleLoop(name){
  
  // alert(songurl+"loop")
  if(oneloop==false &&loop==false){
    setloop(true)
    setoneloop(true)
    // only one song playing in loop
      try {
        if(sound){
          // alert("run")
             await sound.pauseAsync()
             await sound.unloadAsync()
          const { sound:newSound } = await Audio.Sound.createAsync({
            uri: songurl.includes("file:///")?songurl:`http://${IP}:4500/${name}`
          },
          {
            shouldPlay:true,
            isLooping:true,
          
          },
    
    
          (status)=>{
            // 
            
            // count=1
              
          });
          setsound(newSound)
          // 
          // await Audio.setAudioModeAsync()
          setIsPlay(true)
          
          
          // setSound(sound);
          // sound.setStatusAsync=true
         
       
          console.log('Playing Sound');
          // 
    
          // console.log(status.isPlaying+'isplaying')
        }
        else{
          // alert('else case')
          const { sound } = await Audio.Sound.createAsync({
            uri:`http://${IP}:4500/${name}`
          },
          {
            shouldPlay:true
          },
          (status)=>{
            // 
            
            
            // count=1
              
          });
          setsound(sound)
          // setSound(sound);
          // sound.setStatusAsync=true
          
     
          console.log('Playing Sound');
          setIsPlay(true)
          // 
          // console.log(status.positionMillis)
          let Data=await SecureStore.setItemAsync('SongData',JSON.stringify({name,cover,idx,artist,TotalSong:Bhojsongdata.length}))
        }
        } catch (error) {
          console.log(error)    
          
        }
    oneloop(true)
  }
  if(oneloop==true){
    setoneloop(false)
    setloop(true)
    // all songs playing in loop
    

  }
  if(loop==true && oneloop==false){
    setoneloop(false)
    alert('all')
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
  CheckSongIsFavrait(songname)
  alert('Song added in favrait list')
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
    return (item.name==para)
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

  // soundObject.setOnPlaybackStatusUpdate((status) => {
  //   // Ensure the status is an AVPlaybackStatus
  //   if (status.isLoaded) {
  //     // The key property is didJustFinish
  //     if (status.didJustFinish) {
  //       alert("Song finished playing.");
  //       onFinishCallback();
  //     }
  //   }
  // });

                        return (
    
    <>
{/* <NotificationController sound={sound} nextSong={Handlenext} previousSong={HandlePrev}/>     */}

    <View style={{position:'absolute',top:0,left:0,width:wp(100),height:hp(100)}}>

     <View style={DeviceDetect()=='Mobile'?{position:'absolute',bottom:10,zIndex:30}: {position:'absolute',bottom:80,zIndex:30}}  >
     
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
}}><Image source={threedotoption} style={{width:30,height:30}}/></TouchableOpacity>
{AddToPlaylist?<TouchableOpacity onPress={()=>{
  HandleOptions()
}} style={{position:'absolute',top:20,right:25,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:3,borderWidth:2,borderColor:'white',paddingHorizontal:10,paddingVertical:5,borderRadius:12}}>
<AntDesign name="plus" size={20} color="white" /><Text className='text-white'>Add to Playlist</Text>
</TouchableOpacity>:null}
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

{showadd==false?<CircularRainbowVisualizer soundObject={sound} image={ImageUrl} size={200} innerImageSize={190} />:
<View>
  <Text style={{color:"white",fontSize:40,borderWidth:3,borderColor:'red',width:wp(90),height:hp(40)}}>show ads</Text>
  </View>}
</View>
<View className='w-[90%] mx-auto flex items-center justify-center flex-col'>

<Text className='text-white'>{Data.Artist!=undefined?Data.Artist.length>40?((Data.Artist).slice(0,40)+'...'):Data.Artist:null}</Text>
<Text className='text-white'>{Data.para!=undefined?Data.para.length>40?((Data.para).slice(0,40)+'...'):Data.para:null}</Text>
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
    

</>
      
    
  )
}


import { Stack, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
// import Index from './index'
import axios from 'axios';
import MusicPlayer from './MusicPlayer';
import { AppContext } from './Store';
import { isUserOnline } from './utils/Internate';
import * as Linking from "expo-linking"
import TrackPlayer, {useProgress} from "react-native-track-player"
let email;
let   IP='192.168.1.155'
// import * as SecureStore from "expo-secure-store"
;
// import {Slider} from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { useTranslation } from 'react-i18next';
import ReviewPage from './ReviewPage';
import WantToStopMusic from './WantToStopMusic';
import MyLinking from "./utils/linking."
import PlaybackService from "./service"
import { AppState } from 'react-native';
// import {useCurrentTrack} from "./hooks/usecurrentrack"
TrackPlayer.registerPlaybackService(() => PlaybackService);
// TrackPlayer.registerPlaybackService(() => useCurrentTrack);

// import { StatusBar } from 'react-native-web';
export default function _layout() {
  const {t}=useTranslation()

  let [para,setpara]=useState('Hello I am Hindi Song')
  let [Artist,setArtist]=useState('Ravi Prajapati')
   let [ImageUrl,setImageUrl]=useState(require('../assets/ravi4.png'))
   const {position,duration}=useProgress()
     let songname1=useRef()
      let [IsPlay,setIsPlay]=useState(false)
let [IsCurr,setIsCurr]=useState()

      let [ActiveReveiwPage,setActiveReviewPage]=useState(false)
      let [positioninmilli,setpositioninmilli]=useState()
      let [durationinmilli,setdurationinmilli]=useState()
      let [IsSelectedLang,setIsSeletedLang]=useState('en')
      
      const [sound,setsound]=useState()
      let [IsLogin,setisLogin]=useState(false)
    let [oneloop,setoneloop]=useState(false)
    // let [IsDownloadPage,setIsDownloadpage]=useState(false)
    
    let [IconSize,setIconSize]=useState(120)
      let [Minute,setMinute]=useState()
      let [BackgroundImage,setBackgroundImage]=useState("")
      let [songurl,setsongurl]=useState([])
      let [currMinute,setCurrMinute]=useState()
      let [currSec,setcurrSec]=useState()
      let [Second,setSecond]=useState()
      let [userdata,setuserdata]=useState([])
      let [internate,setinternate]=useState()
      let [ActiveWantToStopMusic,setWantToStopMusic]=useState(false)
  let [Bhojsongdata,setBhojsongdata]=useState([])
  let [UserPlaylistData,setuserplaylistdata]=useState([])
  let [ShowMP,setShowMP]=useState(true)
  let [trigger,settrigger]=useState(true)
    const router = useRouter();

 async function IsUserOnline(){
  let data=await isUserOnline();
  // alert(data)
  if(data==true) setinternate(true)
    else setinternate(false)

 }
   function HandleProgress(value){

    // alert(value)
    
    setpositioninmilli(value)
    
  
    
  }
  async function GetLastPlaySong(){
    let data=await SecureStore.getItemAsync("SongData");
    console.log(data);
    // alert(JSON.parse(data).cover+'cover')
    // alert(JSON.parse(data).name)
    setpara(JSON.parse(data).name)
    setImageUrl({uri:JSON.parse(data).cover})
    setArtist(JSON.parse(data).artist)
  }
  async function CollectUserPlaylistData(){
   
  }
  function SongTimeFormat(){
    setpositioninmilli(position)
  }
     async function getuserdatafromLS(){
    let data=await SecureStore.getItemAsync('user')
    setuserdata(JSON.parse(data))
  }
  
  async function GetUserData(){
  
        try {
          let data1=await SecureStore.getItemAsync('user')
          if(!data1){
            return
          }
           email=JSON.parse(data1).email
          // alert(email)

        
          let {data}=await axios.get(`http://${IP}:4500/GetUserData/${email}`)
         setuserdata(data)
         await SecureStore.setItemAsync('user',JSON.stringify(data))
         
          axios.defaults.withCredentials=true;
          let Data=await axios.get(`http://${IP}:4500/GetUserPlaylistDataApp/${email}`)
          // console.log(Data.data)
          setuserplaylistdata(Data.data)
          if(data.FirstName){

            setisLogin(true)
            // alert(IsLogin)
          }
         
        } catch (error) {
          console.log(error)
        }
// alert('getuserdata end');

      }
  function HandleSlider(value){
   
  }
useEffect(()=>{
    getuserdatafromLS();
    SongTimeFormat()
    

  },[trigger])
  useEffect(()=>{
     const handleDeepLink = ({ url }) => {
      const { path } = Linking.parse(url);
      // alert(url)
      if (url == 'trackplayer://notification.click') {
        router.push('/(tabs)');
      }
    };

    // Listen for app already running
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Handle app cold start (app killed → opened via link)
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    let newarr=Bhojsongdata.map((item)=>{
      return item.songname
    })
    setsongurl([...songurl,...newarr])
    return () => subscription.remove();
  },[Bhojsongdata])
  useEffect(()=>{
    GetLastPlaySong();
    CollectUserPlaylistData()

setTimeout(()=>{
  setActiveReviewPage(true)

},40*10*1000)
 return () => {
      // console.log("unmounting the component")
      TrackPlayer.reset();
      TrackPlayer.stop();

    };
  },[])
  async function CheackIfTokenExistOrNot(){
    let Token =await SecureStore.getItemAsync('Token')
    if(Token){
      setisLogin(true)
    }
    else{
      setisLogin(false)
    }
  }
  async function GetIconSizeFromPhone(){
    let size=await SecureStore.getItemAsync('iconSize')
    if(size){
      setIconSize(parseInt(size))
    } 
  }
  async function GetBackgroundImageFromPhone(){
    let bgimage=await SecureStore.getItemAsync('BackgroundImage')
    if(bgimage){
      setBackgroundImage(bgimage)
    }
  }
useEffect(()=>{
GetIconSizeFromPhone();
GetBackgroundImageFromPhone();
IsUserOnline();
},[])
  
  useEffect(()=>{

CheackIfTokenExistOrNot()
    GetUserData()

  },[IsLogin])
  return (
    <>
{/* <StatusBar hidden={true} /> */}

    <AppContext.Provider value={{ImageUrl,setImageUrl,IsPlay,setIsPlay,para,setpara,sound,setsound,Artist,setArtist,Bhojsongdata,setBhojsongdata,IsLogin,setisLogin,IsCurr,setIsCurr,IsSelectedLang,setIsSeletedLang,userdata,setuserdata,setWantToStopMusic,UserPlaylistData,setuserplaylistdata,ActiveReveiwPage,ShowMP,setShowMP,oneloop,setoneloop,IconSize,setIconSize,BackgroundImage,setBackgroundImage,songurl,setsongurl,trigger,settrigger}} >
      {ActiveReveiwPage?<ReviewPage  ActiveReveiwPage={ActiveReveiwPage} setActiveReviewPage={setActiveReviewPage}/>:null}
   {ActiveWantToStopMusic?<WantToStopMusic setWantToStopMusic={setWantToStopMusic} ActiveWantToStopMusic={ActiveWantToStopMusic} sound={sound} setIsPlay={setIsPlay}/>:null}
  
  
   
      <Stack  >

   <Stack.Screen name='index' options={{headerShown:false}} />
   <Stack.Screen name='FogotEmail' options={{headerShown:false}} />
   {/* <Stack.Screen name="DownloadScreen" options={{headerShown:false}}/> */}
   <Stack.Screen name='ResetPas' options={{headerShown:false}} />
   <Stack.Screen name='Login' options={{headerShown:false}} />
   <Stack.Screen name='setting' options={{headerShown:false}}/>
   <Stack.Screen name="WallpaperSelector" options={{headerShown:false}}/>
  <Stack.Screen name="PlaylistAdd" options={{headerShown:false}}/>
   <Stack.Screen name='(tabs)' options={{headerShown:false}} />
   <Stack.Screen name='hooks/UseWakeWord' options={{headerShown:false}} />
   <Stack.Screen name='AIManual' options={{headerShown:false}} />
   <Stack.Screen name='hooks/useTrackTime' options={{headerShown:false}} />
   {/* <Stack.Screen name='musicplayer1' options={{headerShown:false}} /> */}

   {/* <Stack.Screen name='ChangeBackground' options={{headerShown:false}} /> */}
   <Stack.Screen name='LanguageSelect' options={{headerShown:false}} />
   <Stack.Screen name='Contact' options={{headerShown:false}} />
   <Stack.Screen name='service' options={{headerShown:false}} />
    <Stack.Screen name='ShowSong' options={{headerShown:false}} />
    <Stack.Screen name='WantToStopMusic' options={{headerShown:false}} />
   <Stack.Screen name='FavraitSong' options={{headerShown:false}} />
   <Stack.Screen name='DownloadSong' options={{headerShown:false}} />
   <Stack.Screen name='ProfileUpdate' options={{headerShown:false}} />
   <Stack.Screen name='ShowSongUserPlaylist' options={{headerShown:false}} />
   
   </Stack>
   {(userdata?.FirstName||internate==false) ?<MusicPlayer   positioninmilli={positioninmilli} durationinmilli={durationinmilli} HandleSlider={HandleSlider} HandleProgress={HandleProgress} songurl={songurl} Minute={Minute} Second={Second}   currMinute={currMinute} currSec={currSec} setsongurl={setsongurl} userdata={userdata} UserPlaylistData={UserPlaylistData} ShowMP={ShowMP}/>:null}


   
    </AppContext.Provider>
{/* <Index/> */}
    </>
  )
}

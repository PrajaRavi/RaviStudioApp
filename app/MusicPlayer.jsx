
import { AntDesign, Feather, FontAwesome6, SimpleLineIcons } from '@expo/vector-icons'
import { Audio } from 'expo-av'
import { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
let {width,height}=Dimensions.get('window')
import playicon from "../assets/play.png"
import pauseicon from "../assets/pause.png"
import crossicon from "../assets/cancel.png"
import threedotoption from "../assets/three-dots.png"
let   IP='192.168.1.156';
import { RotatingImage } from './utils/RotateImage'

import Entypo from '@expo/vector-icons/Entypo'
import Slider from '@react-native-community/slider'
import * as SecureStore from 'expo-secure-store'
import { useTranslation } from 'react-i18next'
import '../global.css'
import nextbtnicon from "../assets/next.png"
import loopicon from "../assets/exchange.png"
// let   IP='192.168.1.155';;
import axios from 'axios'
import { useContext } from 'react'
import { wp,hp } from './helper'
import { AppContext } from './Store'
import { CircularRainbowVisualizer } from './MusicVisualizer'


export default function MusicPlayer({position,bottom,HandlePlay,HandleProgress,HandleSlider,durationinmilli,positioninmilli,Second,Minute,currMinute,currSec,songurl,setsongurl,UserPlaylistData,userdata

}) {
const spinvalue=useRef(new Animated.Value(0)).current;  
const {t}=useTranslation()
     const {ImageUrl,setImageUrl,IsPlay,setArtist,setIsPlay,para,setpara,sound,setsound,setstatus,status,Bhojsongdata,setBhojsongdata,Artist,IsCurr,setIsCurr,ravi}=useContext(AppContext)
     let Data=useContext(AppContext)
     let [showadd,setshowadd]=useState(false)
    let [IsActive,setIsActive]=useState(false)
    let [oneloop,setoneloop]=useState(false)
    let [loop,setloop]=useState(false)
    let [IsFavrait,setIsFavrait]=useState(false)
  let [LikedSongData,setLikedSongData]=useState([])
  let [AddToPlaylist,setAddToPlaylist]=useState(false)
  let [Options,setOptions]=useState(false)
    let Inputvalue=useRef()
  let [selectedplaylsit,setselectedplaylist]=useState()
  let [userplaylistSongs,setuserplaylistsongs]=useState([])
             
          
  
  useEffect(()=>{
      Animated.loop(
        Animated.timing(spinvalue,{
          toValue:0,
          duration:3000,
         
          useNativeDriver:true
        })
      ).start()
    },[spinvalue])
    const spin=spinvalue.interpolate({
      inputRange:[0,1],
      outputRange:['0deg','3600deg']
     })
  
  async function CollectDataLS(){


  } 
  async function HandlePlay(){
    try {
      
      if(status.isPlaying==true||IsPlay==true){
        setIsPlay(false)
        await sound.pauseAsync();
        
        
      }
      else{
        setIsPlay(true)
        await sound.playAsync();
        
        
        
      }
    } catch (error) {
      console.log(error)
    }
  }
async function Handlenext(){
    let Data1=await SecureStore.getItemAsync('SongData')
    let SongData=JSON.parse(Data1)
  //  console.log(Data1)
  console.log(SongData)
  console.log("songdataravi")
  alert(SongData.name)
    let {idx,TotalSong}=SongData
    try {
    
   
    if(idx<TotalSong-1){
      // alert('if')
      let nextsong=Bhojsongdata[idx+1]
      CheckSongIsFavrait(nextsong.songname)
      setIsCurr(nextsong.songname)
      // console.log(nextsong.songname)
      
      // console.log(nextsong)
      if(sound){
        
        
          await sound.pauseAsync()
          await sound.unloadAsync()
           const { sound:newSound } = await Audio.Sound.createAsync({
          uri:`http://${IP}:4500/${nextsong.songname}`
        },
        {
          shouldPlay:true
        },
  
  
        (status)=>{
          // console.log(status)
          setstatus(status)
          // count=1
            
        });
        // alert('sound')
        setsound(newSound)
        // await Audio.setAudioModeAsync()
        setIsPlay(true)
        
        setArtist(nextsong.artist)
        setpara(nextsong.songname)
        // alert(nextsong.covername)
        // setImageUrl()
        // setSound(sound);
    setImageUrl({uri: `http://${IP}:4500/${nextsong.covername}`})

        // sound.setStatusAsync=true
       
     
        console.log('Playing Sound');
        
  let LSData=await SecureStore.setItemAsync('SongData',JSON.stringify({name:nextsong.songname,cover:nextsong.cover,idx:SongData.idx+1,artist:nextsong.artist,TotalSong:Bhojsongdata.length}))
      }
       else{
          
            const { sound } = await Audio.Sound.createAsync({
              uri:`http://${IP}:4500/${nextsong.songname}`
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
            sound.setStatusAsync=true
            setArtist(nextsong.artist)
        setpara(nextsong.songname)
        setImageUrl({uri: `http://${IP}:4500/${nextsong.covername}`})

       
            console.log('Playing Sound');
            let LSData=await SecureStore.setItemAsync('SongData',JSON.stringify({name:nextsong.songname,cover:nextsong.cover,idx:SongData.idx+1,artist:nextsong.artist,TotalSong:Bhojsongdata.length}))
            setIsPlay(true)
            // console.log(status)
            // console.log(status.positionMillis)
          }
    }
    else{
      alert('else')
      let nextsong=Bhojsongdata[0]
      console.log(nextsong.songname)
      if(sound){
        // alert("run")
        
           sound.pauseAsync()
           sound.unloadAsync()
           const { sound:newSound } = await Audio.Sound.createAsync({
          uri:`http://${IP}:4500/${nextsong.songname}`
        },
        {
          shouldPlay:true
        },
  
  
        (status)=>{
          // console.log(status)
          setstatus(status)
          // count=1
            
        });
        // alert('sound')
        setsound(newSound)
        // await Audio.setAudioModeAsync()
        setIsPlay(true)
        setArtist(nextsong.artist)
        setpara(nextsong.songname)
        setImageUrl({uri: `http://${IP}:4500/${nextsong.covername}`})

        
        // setSound(sound);
        // sound.setStatusAsync=true
       
     
        console.log('Playing Sound');
        
  let LSData=await SecureStore.setItemAsync('SongData',JSON.stringify({name:nextsong.songname,cover:nextsong.cover,idx:0,artist:nextsong.artist,TotalSong:Bhojsongdata.length}))
  
      }
       else{
            // alert('else case')
            // console.log(LSdata.sound)
            const { sound } = await Audio.Sound.createAsync({
              uri:`http://${IP}:4500/${nextsong.songname}`
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
            
            setArtist(nextsong.artist)
            setpara(nextsong.songname)
            setImageUrl({uri: `http://${IP}:4500/${nextsong.covername}`})

            console.log('Playing Sound');
            let LSData=await SecureStore.setItemAsync('SongData',JSON.stringify({name:nextsong.songname,cover:nextsong.cover,idx:SongData.idx+1,artist:nextsong.artist,TotalSong:Bhojsongdata.length}))
            setIsPlay(true)
            // console.log(status)
            // console.log(status.positionMillis)
          }
    }

   
     
             
    } catch (error) {
      console.log(error)
    }
    
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
      console.log(nextsong.songname)
      // console.log(nextsong)
      if(sound){
        // alert("run")
        
         await  sound.pauseAsync()
          await sound.unloadAsync()
           const { sound:newSound } = await Audio.Sound.createAsync({
          uri:`http://${IP}:4500/${nextsong.songname}`
        },
        {
          shouldPlay:true
        },
  
  
        (status)=>{
          // console.log(status)
          setstatus(status)
          // count=1
            
        });
        // alert('sound')
        setsound(newSound)
        // await Audio.setAudioModeAsync()
        setIsPlay(true)
        
        setArtist(nextsong.artist)
        setpara(nextsong.songname)
        // alert(nextsong.covername)
        // setImageUrl()
        // setSound(sound);
    setImageUrl({uri: `http://${IP}:4500/${nextsong.covername}`})

        // sound.setStatusAsync=true
       
     
        console.log('Playing Sound');
        
  let LSData=await SecureStore.setItemAsync('SongData',JSON.stringify({name:nextsong.songname,cover:nextsong.cover,idx:SongData.idx+1,artist:nextsong.artist,TotalSong:Bhojsongdata.length}))
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
              uri:`http://${IP}:4500/${nextsong.songname}`
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
            setArtist(nextsong.artist)
        setpara(nextsong.songname)
        setImageUrl({uri: `http://${IP}:4500/${nextsong.covername}`})

       
            console.log('Playing Sound');
            let LSData=await SecureStore.setItemAsync('SongData',JSON.stringify({name:nextsong.songname,cover:nextsong.cover,idx:SongData.idx+1,artist:nextsong.artist,TotalSong:Bhojsongdata.length}))
            setIsPlay(true)
            // console.log(status)
            // console.log(status.positionMillis)
          }
    }
    else{
      // alert('else')
      let nextsong=Bhojsongdata[idx-1]
      // console.log(nextsong.songname)
      setIsCurr(nextsong.songname)
      CheckSongIsFavrait(nextsong.songname)
      if(sound){
        // alert("run")
        
           sound.pauseAsync()
           sound.unloadAsync()
           const { sound:newSound } = await Audio.Sound.createAsync({
          uri:`http://${IP}:4500/${nextsong.songname}`
        },
        {
          shouldPlay:true
        },
  
  
        (status)=>{
          // console.log(status)
          setstatus(status)
          // count=1
            
        });
        // alert('sound')
        setsound(newSound)
        // await Audio.setAudioModeAsync()
        setIsPlay(true)
        setArtist(nextsong.artist)
        setpara(nextsong.songname)
        setImageUrl({uri: `http://${IP}:4500/${nextsong.covername}`})

        
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
              uri:`http://${IP}:4500/${nextsong.songname}`
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
            
            setArtist(nextsong.artist)
            setpara(nextsong.songname)
            setImageUrl({uri: `http://${IP}:4500/${nextsong.covername}`})

            console.log('Playing Sound');
            let LSData=await SecureStore.setItemAsync('SongData',JSON.stringify({name:nextsong.songname,cover:nextsong.cover,idx:SongData.idx+1,artist:nextsong.artist,TotalSong:Bhojsongdata.length}))
            setIsPlay(true)
            // console.log(status)
            // console.log(status.positionMillis)
          }
    }

   
     
             
    } catch (error) {
      console.log(error)
    }
  }
async function SongEnded(){
  if(status.didJustFinish &&oneloop==false){
    Handlenext()
  }
}

  useEffect(()=>{
  
SongEnded()
  
  CollectDataLS()
  CollectLikedSongData()
},[])
  useEffect(()=>{
  
SongEnded()
  
  // CollectDataLS()
},[status])
 function HandleSongMP(){
setIsActive(true)
 }
 function HandleCross(){
  setIsActive(false)

 }
 async function HandleLoop(name){
  // alert(name)
  if(oneloop==false &&loop==false){
    alert('one')
    setloop(true)
    setoneloop(true)
    // only one song playing in loop
      try {
        if(sound){
          // alert("run")
             await sound.pauseAsync()
             await sound.unloadAsync()
          const { sound:newSound } = await Audio.Sound.createAsync({
            uri:`http://${IP}:4500/${name}`
          },
          {
            shouldPlay:true,
            isLooping:true,
          
          },
    
    
          (status)=>{
            // console.log(status)
            setstatus(status)
            // count=1
              
          });
          setsound(newSound)
          console.log(status)
          // await Audio.setAudioModeAsync()
          setIsPlay(true)
          
          
          // setSound(sound);
          // sound.setStatusAsync=true
         
       
          console.log('Playing Sound');
          console.log(status)
    
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
            // console.log(status)
            
            setstatus(status)
            // count=1
              
          });
          setsound(sound)
          // setSound(sound);
          // sound.setStatusAsync=true
          
     
          console.log('Playing Sound');
          setIsPlay(true)
          // console.log(status)
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
    SongEnded()

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
    let result = await SecureStore.getItemAsync('Token');
    if (result) {
      // alert(result);
      console.log(result)
      
      
    } else {
      alert('No values stored under that key.');
    }
    
    try {
      
      let {data}=await axios.post(`http://${IP}:4500/GetUserDataForApp`,{Token:result})
      let Data = await axios.post(
    `http://${IP}:4500/AddFavSong/${data._id}`,
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
    <View style={{position:'absolute',top:0,left:0,width:wp(100),height:hp(100)}}>

     <View style={{position:'absolute',bottom:50,zIndex:30}}  >
     
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
}} className=' ' ref={Data.songname1}   style={{width:width*0.5,color:'white'}}>{Data.para!=undefined?Data.para.length>40?((Data.para).slice(0,40)+'...'):Data.para:null}</Text>
{/* <Text > {para.length>40?(para.slice(0,40)+'...'):para}</Text> */}
{/* <Image  source={Data.ImageUrl} style={{width:50,height:50,borderRadius:100,borderColor:'#3fa9f5',padding:5,borderWidth:3}} className='w-[50px] hover:scale-50 right-image  h-[50px]     border-2  rounded-full' /> */}
<RotatingImage imageSource={Data.ImageUrl} size={50} isPlaying={IsPlay} duration={5000} soundObject={sound} />
</View>
</View>

{IsActive?<View style={{backgroundColor:'black',zIndex:50,position:'absolute',bottom:0,padding:5,borderRadius:15,height:hp(70),display:'flex',flexDirection:'column',gap:20,paddingTop:20}} >
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

{showadd==false?<CircularRainbowVisualizer image={ImageUrl} soundObject={sound} />:
<View>
  <Text style={{color:"white",fontSize:40,borderWidth:3,borderColor:'red',width:wp(90),height:hp(40)}}>show ads</Text>
  </View>}
</View>
{/* <Image source={Data.ImageUrl} style={{borderColor:'#3fa9f5',borderWidth:5}} className='border-2 z-20 rounded-full relative  w-[80%] h-[300px] mx-auto'>
</Image> */}
<View className='w-[90%] mx-auto flex items-center justify-center flex-col'>

<Text className='text-white'>{Data.Artist!=undefined?Data.Artist.length>40?((Data.Artist).slice(0,40)+'...'):Data.Artist:null}</Text>
<Text className='text-white'>{Data.para!=undefined?Data.para.length>40?((Data.para).slice(0,40)+'...'):Data.para:null}</Text>
</View>
<View>
<TouchableOpacity onPress={()=>{
  // setIsFavrait(!IsFavrait)
  HandleAddFavraitSong(Data.para)
}}>

{IsFavrait?<AntDesign className='absolute right-5 bottom-[40px]' name="heart" size={24} color="red" />:<AntDesign className='absolute right-5 bottom-[40px]' name="heart" size={24} color="white" />}
</TouchableOpacity>
<Slider  style={{ width:'100%',position:'absolute',bottom:20,zIndex:40} }
  minimumValue={0}
  maximumValue={durationinmilli}
  value={positioninmilli}
  minimumTrackTintColor="#3fa9f5"
  maximumTrackTintColor="white"
  onSlidingComplete={(value)=>{
    HandleSlider(value)
  }}
  
  onValueChange={(value)=>{
    HandleProgress(value)
  }}
  
  />
  <View className='w-[100%] flex items-center justify-between flex-row'>
    <Text className='text-white text-xl'>{`0${currMinute}:${currSec}`}</Text>
    <Text className='text-white text-xl'>{`0${Minute}:${Second}`}</Text>
  </View>
  </View>
 { <View style={{display:'flex',alignContent:'center',flexDirection:'row',alignItems:'center',justifyContent:'center',width:'100%',gap:20}}>
  
<View style={{position:'relative',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

 {/* <SimpleLineIcons onPress={()=>{
  HandleLoop(Data.para)
 }} name="loop" size={22} className={`my-3 py-3  relative text-white`} color={loop?'#3fa9f5':'white'} >

 </SimpleLineIcons> */}
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

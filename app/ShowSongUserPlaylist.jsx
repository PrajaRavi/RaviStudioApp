
import { useRoute } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Animated, FlatList, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'


import { Stack, useNavigation } from 'expo-router'
// import { StatusBar } from 'expo-status-bar'
import AntDesign from '@expo/vector-icons/AntDesign'
import * as SecureStore from 'expo-secure-store'
let firstrender=true
let   IP='192.168.1.155';;

import axios from 'axios'
import { Audio } from 'expo-av'
// import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons'
import { useContext } from 'react'
import { Dimensions } from 'react-native'
import { AppContext } from './Store'
let {width,height}=Dimensions.get('window')


export default function ShowSongUserPlaylist() {
  const {ImageUrl,setImageUrl,IsPlay,setArtist,setIsPlay,para,setpara,sound,setsound,setstatus,status,Bhojsongdata,setBhojsongdata,IsCurr,setIsCurr,userdata,userplaylistSongs,IsLogin,setuserplaylistsongs,UserPlaylistData,setuserplaylistdata}=useContext(AppContext)
  // console.log(Data)
  const spinvalue=useRef(new Animated.Value(0)).current;  
const navigation=useNavigation()
  // let CurrSong=useRef()
  let [Index,setIndex]=useState(false)
  // let para='Hello I am Hindi Song'
 
//  let [CurrSong,setCurrSong]=useState()
  
 let [IsFavrait1,setIsFavrait1]=useState([])
 let [globalcolor,setglobalcolor]=useState('white');
let [inputvalue,setinputvalue]=useState('')
 let [searchsongdata,setsearchsongdata]=useState([])
 let [activityindicator,setacindi]=useState(true)
let ravi={name:'Rai'}
//  let [userdata,setuserdata]=useState([])
  const {params:data}=useRoute();
  console.log(data)
  count=1
 

 
  useEffect(()=>{
    Animated.loop(
      Animated.timing(spinvalue,{
        toValue:1,
        duration:3000,
        useNativeDriver:true
      })
    ).start()
  },[spinvalue])
 const spin=spinvalue.interpolate({
  inputRange:[0,1],
  outputRange:['0deg','360deg']
 })
 function HandleSongSearch(name){
  // console.log(name)
  setinputvalue(name)
  let SearchSongsArray=Bhojsongdata.filter((item)=>{
    return item.name.includes(name)
  })
  // console.log(SearchSongsArray)
  setsearchsongdata(SearchSongsArray)
}
  async function playSound(name,cover,idx,artist) {
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
    setpara(name)
    setImageUrl({uri: `http://${IP}:4500/${cover}`})
    
    // {<-----------------COMPLETE PLAY PAUSE LOGIC----------------------------------->}
    // console.log(soundRef)
    
    // if(status==undefined){
      
    //   console.log('Loading Sound');
    
    //   const { sound } = await Audio.Sound.createAsync({
      //     uri:`http://${IP}:4500/${name}`
      //   },
      //   {
      //     shouldPlay:true
      //   },
      //   (status)=>{
        //     // 
      //     
      //     // count=1
      
      //   });
      //   setsound(sound)
      //   // setSound(sound);
      //   // sound.setStatusAsync=true
      
      //   console.log('Playing Sound');
      //   
      // }
      // {<--------------complete playpause logic-------------------------------->}
      // if(status!=undefined){
        
      //   if(status.isPlaying==true){
      //     await sound.pauseAsync();
      //     alert("Song Pause")
      //   }
      //   else{
        //     const { sound } = await Audio.Sound.createAsync({
          //       uri:`http://${IP}:4500/${name}`
          //     },
          //     {
            //       shouldPlay:true
            //     },
            //     (status)=>{
              //       // 
              //       
              //       // count=1
              
              //     });
              //   setsound(sound)
              
              //     alert("Song Play")
              //     await sound.playAsync()
              //   }
              // }
              
              // let Data=await sound.getStatusAsync()
              // setstatus(Data)
              
              // console.log(sound)
    if(sound){
      // alert("run")
         await sound.pauseAsync()
         await sound.unloadAsync()
      const { sound:newSound } = await Audio.Sound.createAsync({
        uri:`http://${IP}:4500/${name}`
      },
      {
        shouldPlay:true,
      
      },


      (status)=>{
        // 
        
        // count=1
          
      });
      setsound(newSound)
      
      // await Audio.setAudioModeAsync()
      setIsPlay(true)
      
      
      // setSound(sound);
      // sound.setStatusAsync=true
     
   
      // console.log('Playing Sound');
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
      
 
      // console.log('Playing Sound');
      setIsPlay(true)
      // 
      // console.log(status.positionMillis)
      let Data=await SecureStore.setItemAsync('SongData',JSON.stringify({name,cover,idx,artist,TotalSong:Bhojsongdata.length}))
    }
    } catch (error) {
      console.log(error)    
      
    }
  }

  async function HandlePlay(){
    setIsCurr(para)
    if(IsPlay==true){
      await sound.pauseAsync();
      setIsPlay(false)
      
    }
    else{
      await sound.playAsync();
      setIsPlay(true)

    }
   
  }

  // alert(searchplaylistdata)
  async function CollectSongsOfUserPlaylist(){
  
  try {
    
    let Data=await axios.get(`http://${IP}:4500/UserPlaylistSongData/${userdata._id}/${data[0].playlistname}/`)
console.log(Data.data)
    if(Data.data==''){
    setBhojsongdata([])

      setIsSong(false)
      // alert("Data Not Found")
      
    }
    else{
      // setUserPlaylistSongData(Data.data)
      setBhojsongdata(Data.data)
   

    }
  } catch (error) {
  console.log(error)
  }
  // console.log(Data.data)
  }
  useEffect(()=>{
    // alert(para)
    setTimeout(()=>{
   setacindi(false)
    },2000)
    CollectSongsOfUserPlaylist()
    setIsCurr(para)
    
 
    // CollectLikedSongData()
   
  }
  ,[])
  
 
async function HandleDelete(songname){

// alert(songname)
try {
  let Data=await axios.post(`http://${IP}:4500/DeleteUserPlaylistSongData/${userdata._id}/${data[0].playlistname}/${songname}`)
  CollectSongsOfUserPlaylist()
  if(!Data){
    console.log('data not found')
  }
  else{
    console.log(Data)
  }
  
} catch (error) {
  console.log(error)
}


}
   
async function HandleUserPlaylistDelete(playlistname){
//  console.log(userdata.PlaylistData)
let updatedPlaylistData=userdata.PlaylistData.filter((item)=>{
  return item.playlistname!=playlistname
})
// console.log(updatedPlaylistData)
try {
  let Data=await axios.post(`http://${IP}:4500/UpdateUserPlaylistData/${userdata._id}`,{PlaylistData:updatedPlaylistData})
let {data}=await axios.get(`http://${IP}:4500/GetUserPlaylistDataApp/${userdata.email}`)
console.log(data)

console.log('UpdatedUserPlaylistdata')
navigation.navigate('index')
alert(t('playlistdelete'))
} catch (error) {
  console.log(error)
}


}
  
  return (
    <>
   

   

 


   
    <SafeAreaView>

 <AppContext.Provider value={{HandlePlay,ravi}}>
    
                                                                                                                                                                                                                                        
    <View style={{backgroundColor:'#021b04',height:height}}>
  
    <View style={{display:'flex',flexDirection:'row',alignContent:'center',justifyContent:'center',alignItems:'center',}} className=''>
    {data!=undefined?<Image className='border-2 border-[#54ff1c] rounded-xl px-4  my-2 object-cover' source={{uri: `http://${IP}:4500/${data[0].playlistimage}`}} style={{width:'40%',height:height*0.18}} />:null}
    <View style={{display:'flex',alignItems:'flex-start',justifyContent:'center',width:'50%',gap:10}}>

    <Text style={{fontSize:width*0.05,fontWeight:'bold',fontFamily:'Bahnschrift',color:globalcolor}}>  {data!=undefined?data[0].playlistname:null}</Text>
    <TouchableOpacity onPress={()=>{
      HandleUserPlaylistDelete(data[0].playlistname)
    }} style={{width:width*0.5}} className='border-2 border-white text-xl font-bold flex flex-row items-center justify-center gap-2 rounded-md px-5'> <MaterialIcons  name="delete" size={24} color={globalcolor} /><Text className='text-xl font-bold text-white'> Playlist</Text></TouchableOpacity>
    <TextInput onChangeText={(text)=>{
      HandleSongSearch(text)
    }} placeholder="Search" style={{borderWidth:2,borderColor:globalcolor,width:width*0.5,fontWeight:500,borderRadius:24,paddingBottom:4,paddingTop:2,fontSize:15}}/>
    </View>
  
   </View>
     {/* songlist */}
     {
      activityindicator?<ActivityIndicator color={'#54ff1c'} size={50}/>: <View style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center'}}>

      <View   style={{width:width*0.9,height:height*0.65,minHeight:height*0.50,}} className="flex  flex-col gap-1 ">
  <View  style={{width:width*0.9,height:'100%',minHeight:height*0.50}} className="flex my-3 flex-col gap-1 ">
 { inputvalue==''&& IsLogin?<FlatList  data={Bhojsongdata} showsVerticalScrollIndicator={false} renderItem={({item,index})=>(
   
   
   
   <TouchableOpacity  key={index} id={String(index)} onPress={()=>{
     playSound(item.name,item.cover,index,item.artist)
   }} className={IsCurr!=item.name?"border-2 border-white w-[100%] my-1   rounded-md  items-center justify-between flex-row":"border-2 border-[#54ff1c] w-[100%] my-1   rounded-md  items-center justify-between flex-row"}>
   <Image className="border-2 border-white rounded-full w-[40px] h-[40px] mx-1 my-1 " source={{uri:`http://${IP}:4500/${item.cover}`}}>

   </Image>
 <Text className=' '    style={{width:width*0.5}}>{String(item.name).length>40?(String(item.name).slice(0,40)+'...'):item.name}</Text>
 
   <Text onPress={async ()=>{
     // playSound(item.songname)
     // pauseSound()
     await sound.pauseAsync()
     
   }}><AntDesign name="play" size={20} color={globalcolor} /></Text>
  <TouchableOpacity onPress={()=>{
    HandleDelete(item.name)
  }}>

  <MaterialIcons  name="delete" size={24} color={globalcolor} />
  </TouchableOpacity>
  </TouchableOpacity>
  
 )}/>:<FlatList  data={searchsongdata} showsVerticalScrollIndicator={false} renderItem={({item,index})=>(
   
   
   
  <TouchableOpacity  key={index} id={String(index)} onPress={()=>{
    playSound(item.name,item.cover,index,item.artist)
  }} className={IsCurr!=item.name?"border-2 border-white w-[100%] my-1   rounded-md  items-center justify-between flex-row":"border-2 border-[#54ff1c] w-[100%] my-1   rounded-md  items-center justify-between flex-row"}>
  <Image className="border-2 border-white rounded-full w-[40px] h-[40px] mx-1 my-1 " source={{uri:`http://${IP}:4500/${item.cover}`}}>

  </Image>
<Text className=' '    style={{width:width*0.5}}>{String(item.name).length>40?(String(item.name).slice(0,40)+'...'):item.name}</Text>

  <Text onPress={async ()=>{
    // playSound(item.songname)
    // pauseSound()
    await sound.pauseAsync()
    
  }}><AntDesign name="play" size={20} color={globalcolor} /></Text>
 <TouchableOpacity onPress={()=>{
   HandleDelete(item.name)
 }}>

 <MaterialIcons  name="delete" size={24} color={globalcolor} />
 </TouchableOpacity>
 </TouchableOpacity>
 
)}/>}
   

  </View>

 
</View>
</View>
     }
     
  
    
 
 
   
    <Stack>
      {/* <Stack.Screen name='ShowSong' options={{headerShown:false}} /> */}
   
      <Stack.Screen name='index' options={{headerShown:false}} />
      <Stack.Screen name='FogotEmail' options={{headerShown:false}} />
      <Stack.Screen name='ResetPas' options={{headerShown:false}} />
      <Stack.Screen name='Login' options={{headerShown:false}} />
      <Stack.Screen name='(tabs)/index' options={{headerShown:false}} />
      <Stack.Screen name='(tabs)' options={{headerShown:false}} />
      
      </Stack>
       
  </View>
  </AppContext.Provider>
    
    </SafeAreaView>
 

    </>
  )
}


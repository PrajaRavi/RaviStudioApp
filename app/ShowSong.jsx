
// import AntDesign from '@expo/vector-icons/AntDesign';
// import { useRoute } from '@react-navigation/native';
// import * as SecureStore from 'expo-secure-store';
// import { useEffect, useRef, useState } from 'react';
// import { ActivityIndicator, Animated, FlatList, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
// import { hp, wp } from "./helper";
// import { useDownloadManager } from "./hooks/DownloadManager";
// // import { pushMusicNotification } from './Notifications/Notification';
// let firstrender=true
// let   IP='192.168.1.156';

// import { Entypo } from '@expo/vector-icons';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import axios from 'axios';
// import { Audio } from 'expo-av';

// import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation } from 'expo-router';
// import { useContext } from 'react';
// import { Dimensions, ScrollView } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { AppContext } from './Store';
// import { ImageBackground } from 'expo-image';
// let {width,height}=Dimensions.get('window')
// export default function ShowSong() {
//   const {ImageUrl,setImageUrl,IsPlay,setArtist,setIsPlay,para,setpara,sound,setsound,setstatus,status,Bhojsongdata,setBhojsongdata,IsCurr,setIsCurr,IsLogin,userdata,BackgroundImage,setBackgroundImage}=useContext(AppContext)
//   const {top,bottom}=useSafeAreaInsets();
//   const paddingtop=top>0?10:top;
  
//   const {downloadSong}=useDownloadManager()
//   const spinvalue=useRef(new Animated.Value(0)).current;  
//    let [activityindicator,setacindi]=useState(true)
  
//   const navigation=useNavigation();
//   let [Index,setIndex]=useState(false)
  
//  let [IsFavrait1,setIsFavrait1]=useState([])
//  let [globalcolor,setglobalcolor]=useState('black');
//  let [inputvalue,setinputvalue]=useState('')
 
//  let [searchsongdata,setsearchsongdata]=useState([])

//   const {params:data}=useRoute();

 

  
//   async function CollectHindiSongData() {
  
//   let playlistname=data[0].name.replace(' Song','')
//     let Data = await axios.get(
//       `http://${IP}:4500/GetHindiSong/${playlistname}`
//     );
//     setBhojsongdata(Data.data);

   
//   }
//   async function CollectBhojSongData() {
//   let playlistname=data[0].name.replace(' Song','')
    

//     let Data = await axios.get(
//       `http://${IP}:4500/GetBhojpuriSong/${playlistname}`
//     );
//    console.log(Data.data)
//     setBhojsongdata(Data.data);
   
    
//   }
//   async function playSound(name,cover,idx,artist) {
//     setIsCurr(name)
   

//     setArtist(artist)
//     let Data=await SecureStore.setItemAsync('SongData',JSON.stringify({name,cover,idx,artist,TotalSong:Bhojsongdata.length}))
//     try {
      
//       await Audio.setAudioModeAsync({
//         staysActiveInBackground:true,
//         shouldDuckAndroid:true,
//         playThroughEarpieceAndroid:false,
//       })
//     } catch (error) {
//       console.log(error)
//     }
//     try {
//     setpara(name)
//     setImageUrl({uri: `http://${IP}:4500/${cover}`})
    
//     if(sound){
//          await sound.pauseAsync()
//          await sound.unloadAsync()
//       const { sound:newSound } = await Audio.Sound.createAsync({
//         uri:`http://${IP}:4500/${name}`
//       },
//       {
//         shouldPlay:true,
      
//       },


//       (status)=>{
//         setstatus(status)
          
//       });
//       setsound(newSound)
//       console.log(status)
//       setIsPlay(true)
      
      
//     }
//     else{
//       // alert('else case')
//       const { sound } = await Audio.Sound.createAsync({
//         uri:`http://${IP}:4500/${name}`
//       },
//       {
//         shouldPlay:true
//       },
//       (status)=>{
//         // console.log(status)
        
//         setstatus(status)
//         // count=1
          
//       });
//       setsound(sound)
//       // setSound(sound);
//       // sound.setStatusAsync=true
      
 
//       // console.log('Playing Sound');
//       setIsPlay(true)
//       // console.log(status)
//       // console.log(status.positionMillis)
//       let Data=await SecureStore.setItemAsync('SongData',JSON.stringify({name,cover,idx,artist,TotalSong:Bhojsongdata.length}))
//     }
//     } catch (error) {
//       console.log(error)    
      
//     }
//   }

//   async function HandlePlay(){
//     setIsCurr(para)
//     if(status.isPlaying==true){
//       await sound.pauseAsync();
//       setIsPlay(false)
      
//     }
//     else{
//       await sound.playAsync();
//       setIsPlay(true)

//     }
   
//   }

//   // alert(searchplaylistdata)
 
//   useEffect(()=>{
//     // alert(para)
//     setTimeout(()=>{
// setacindi(false)
//     },500)
//     setIsCurr(para)
    
//     CollectBhojSongData()
//     CollectHindiSongData()
//     // CollectLikedSongData()
   
//   }
//   ,[])
  
 
// async function HandleShare(){



// }
   
//   function HandleSongSearch(name){
//     // console.log(name)
//     setinputvalue(name)
//     let SearchSongsArray=Bhojsongdata.filter((item)=>{
//       return item.songname.includes(name)
//     })
//     // console.log(SearchSongsArray)
//     setsearchsongdata(SearchSongsArray)
//   }
//   return (
//     <>
   

   

 


//    <AlertNotificationRoot>

  
    
    
//   <View  style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'start',gap:5,width:'100%',position:'relative'}}>
// <ScrollView showsVerticalScrollIndicator={true}>
//    {BackgroundImage==""? <LinearGradient
//           // colors={['white', '#1D8DA3']}
//           colors={['white', '#3fa9f5','white','#3fa9f5']}

//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={{flex:1,zIndex:300}}
          
//         >

 
//     <View style={{display:'flex',flexDirection:'colum',alignContent:'center',justifyContent:'center',alignItems:'center',gap:10,marginTop:4,position:'relative',borderBottomColor:'white'}}>
//     {data!=undefined?<Image  source={{uri: `http://${IP}:4500/${data[0].playlistimage}`}} style={{width:wp(94),height:hp(40),borderRadius:23}} />:null}
    
//  <TouchableOpacity onPress={()=>{
// navigation.goBack()

//       }} style={{width:40,height:40,backgroundColor:'black',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:12,position:'absolute', left:30,top:30}}>
//       <Entypo name="chevron-left" size={30} style={{zIndex:999}} color={'#3fa9f5'} />
//       </TouchableOpacity>
//     <View style={{display:'flex',alignItems:'flex-start',justifyContent:'center',width:wp(100),paddingBottom:10}}>

//     <Text style={{fontSize:wp(8),width:wp(100),fontWeight:'bold',fontFamily:'Bahnschrift',color:globalcolor,textAlign:'center'}}>  {data!=undefined?data[0].title:null}</Text>
//     <Text style={{fontSize:wp(3.5),width:wp(100),textAlign:'center',fontWeight:600,fontFamily:'Bahnschrift',color:globalcolor}}> {data!=undefined?data[0].description:null}</Text>
//     <TextInput  placeholderTextColor={globalcolor?globalcolor:'white'} onChangeText={(text)=>{
//       HandleSongSearch(text)
//     }} placeholder="Search Songs" style={{borderWidth:2,borderColor:globalcolor,color:globalcolor,width:wp(90),marginHorizontal:'auto',fontWeight:500,borderRadius:5,paddingBottom:4,paddingTop:2,paddingVertical:5,fontSize:wp(4)}}/>
//     </View>
  
//    </View>
//      {/* songlist */}
   
//      {
//       activityindicator?  <ActivityIndicator color={'black'}  size={50}/>:<View style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center'}}>

//       <View   style={{width:width*0.9,height:height*0.65,minHeight:height*0.50,display:'flex',flexDirection:'column',gap:3}} className="flex  flex-col gap-1 ">
//   <View  style={{width:width*0.90,height:'100%',gap:100,display:'flex',flexDirection:'column',paddingBottom:100}} >
//  { inputvalue==''&&userdata.FirstName?<FlatList  data={Bhojsongdata} showsVerticalScrollIndicator={false} renderItem={({item,index})=>(
   
   
   
//    <TouchableOpacity  key={index} id={String(index)} onPress={()=>{
//      playSound(item.songname,item.covername,index,item.artist)
//    }}  className={IsCurr!=item.songname?"border-2 border-transparent w-[100%] my-1   rounded-md  items-center justify-between flex-row px-1 py-1":"border-2 border-[#000] w-[100%] my-1 px-1 py-1    rounded-md  items-center  justify-between flex-row"}>
//    <Image style={{width:40,height:40,borderRadius:12}} source={{uri:`http://${IP}:4500/${item.covername}`}}>

//    </Image>
//  <Text className=' '    style={{width:width*0.5,color:globalcolor}}>{String(item.songname).length>40?(String(item.songname).slice(0,40)+'...'):item.songname}</Text>
//  <TouchableOpacity onPress={()=>{
//      playSound(item.songname,item.covername,index,item.artist)
  
//  }}>

//    <AntDesign name="play-circle"  size={25} color={globalcolor}/>
//  </TouchableOpacity>
//   <AntDesign onPress={()=>{
//     // alert(typeof(index))
//     let data=downloadSong(String(index),`http://${IP}:4500/${item.songname}`,`http://${IP}:4500/${item.covername}`,item.songname,item.artist)
//     Toast.show({
//        type: ALERT_TYPE.SUCCESS,
//        title: 'Success',
       
//        textBody: data,
       
//       })

//   }} name="download" size={20} color={globalcolor}/>
//   <FontAwesome onPress={()=>{
//    HandleShare()
//   }} name="share" className='px-2' size={15} color={globalcolor} />
//   </TouchableOpacity>
  
//  )}/>:<FlatList  data={searchsongdata} showsVerticalScrollIndicator={false} renderItem={({item,index})=>(
   
   
   
//   <TouchableOpacity  key={index} id={String(index)} onPress={()=>{
//     playSound(item.songname,item.covername,index,item.artist)
//   }} className={IsCurr!=item.songname?"border-2 border-white w-[100%] my-1    rounded-md  items-center justify-between flex-row":"border-2 border-[#54ff1c] w-[100%] my-1   rounded-md  items-center justify-between flex-row"}>
//   <Image className="border-2 border-black rounded-full w-[40px] h-[40px] mx-1 my-1 " source={{uri:`http://${IP}:4500/${item.covername}`}}>

//   </Image>
// <Text className=' '    style={{width:width*0.5}}>{String(item.songname).length>40?(String(item.songname).slice(0,40)+'...'):item.songname}</Text>
//   <Text onPress={async ()=>{
//     await sound.pauseAsync()
    
//   }}><AntDesign name="play-circle" size={10} color="black" /></Text>
 
//  <FontAwesome onPress={()=>{
//   HandleShare()
//  }} name="share" className='px-2' size={22} color="black" />
//  </TouchableOpacity>
 
// )}/>}
 
//   </View>

 
// </View>
// </View>
//      }
      
  
    
 
 
//    </LinearGradient>:<ImageBackground source={{ uri: BackgroundImage }} style={{ flex: 1 }} >
//      <View style={{display:'flex',flexDirection:'colum',alignContent:'center',justifyContent:'center',alignItems:'center',gap:10,marginTop:4,position:'relative',borderBottomColor:'white'}}>
//     {data!=undefined?<Image  source={{uri: `http://${IP}:4500/${data[0].playlistimage}`}} style={{width:wp(94),height:hp(40),borderRadius:23}} />:null}
    
//  <TouchableOpacity onPress={()=>{
// navigation.goBack()

//       }} style={{width:40,height:40,backgroundColor:'black',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:12,position:'absolute', left:30,top:30}}>
//       <Entypo name="chevron-left" size={30} style={{zIndex:999}} color={'#3fa9f5'} />
//       </TouchableOpacity>
//     <View style={{display:'flex',alignItems:'flex-start',justifyContent:'center',width:wp(100),paddingBottom:10}}>

//     <Text style={{fontSize:wp(8),width:wp(100),fontWeight:'bold',fontFamily:'Bahnschrift',color:globalcolor,textAlign:'center'}}>  {data!=undefined?data[0].title:null}</Text>
//     <Text style={{fontSize:wp(3.5),width:wp(100),textAlign:'center',fontWeight:600,fontFamily:'Bahnschrift',color:globalcolor}}> {data!=undefined?data[0].description:null}</Text>
//     <TextInput  placeholderTextColor={globalcolor?globalcolor:'white'} onChangeText={(text)=>{
//       HandleSongSearch(text)
//     }} placeholder="Search Songs" style={{borderWidth:2,borderColor:globalcolor,color:globalcolor,width:wp(90),marginHorizontal:'auto',fontWeight:500,borderRadius:5,paddingBottom:4,paddingTop:2,paddingVertical:5,fontSize:wp(4)}}/>
//     </View>
  
//    </View>
//      {/* songlist */}
   
//      {
//       activityindicator?  <ActivityIndicator color={'black'}  size={50}/>:<View style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center'}}>

//       <View   style={{width:width*0.9,height:height*0.65,minHeight:height*0.50,display:'flex',flexDirection:'column',gap:3}} className="flex  flex-col gap-1 ">
//   <View  style={{width:width*0.90,height:'100%',gap:100,display:'flex',flexDirection:'column',paddingBottom:100}} >
//  { inputvalue==''&&userdata.FirstName?<FlatList  data={Bhojsongdata} showsVerticalScrollIndicator={false} renderItem={({item,index})=>(
   
   
   
//    <TouchableOpacity  key={index} id={String(index)} onPress={()=>{
//      playSound(item.songname,item.covername,index,item.artist)
//    }}  className={IsCurr!=item.songname?"border-2 border-transparent w-[100%] my-1   rounded-md  items-center justify-between flex-row px-1 py-1":"border-2 border-[#000] w-[100%] my-1 px-1 py-1    rounded-md  items-center  justify-between flex-row"}>
//    <Image style={{width:40,height:40,borderRadius:12}} source={{uri:`http://${IP}:4500/${item.covername}`}}>

//    </Image>
//  <Text className=' '    style={{width:width*0.5,color:globalcolor}}>{String(item.songname).length>40?(String(item.songname).slice(0,40)+'...'):item.songname}</Text>
//  <TouchableOpacity onPress={()=>{
//      playSound(item.songname,item.covername,index,item.artist)
  
//  }}>

//    <AntDesign name="play-circle"  size={25} color={globalcolor}/>
//  </TouchableOpacity>
//   <AntDesign onPress={()=>{
//     // alert(typeof(index))
//     let data=downloadSong(String(index),`http://${IP}:4500/${item.songname}`,`http://${IP}:4500/${item.covername}`,item.songname,item.artist)
//     Toast.show({
//        type: ALERT_TYPE.SUCCESS,
//        title: 'Success',
       
//        textBody: data,
       
//       })

//   }} name="download" size={20} color={globalcolor}/>
//   <FontAwesome onPress={()=>{
//    HandleShare()
//   }} name="share" className='px-2' size={15} color={globalcolor} />
//   </TouchableOpacity>
  
//  )}/>:<FlatList  data={searchsongdata} showsVerticalScrollIndicator={false} renderItem={({item,index})=>(
   
   
   
//   <TouchableOpacity  key={index} id={String(index)} onPress={()=>{
//     playSound(item.songname,item.covername,index,item.artist)
//   }} className={IsCurr!=item.songname?"border-2 border-white w-[100%] my-1    rounded-md  items-center justify-between flex-row":"border-2 border-[#54ff1c] w-[100%] my-1   rounded-md  items-center justify-between flex-row"}>
//   <Image className="border-2 border-black rounded-full w-[40px] h-[40px] mx-1 my-1 " source={{uri:`http://${IP}:4500/${item.covername}`}}>

//   </Image>
// <Text className=' '    style={{width:width*0.5}}>{String(item.songname).length>40?(String(item.songname).slice(0,40)+'...'):item.songname}</Text>
//   <Text onPress={async ()=>{
//     await sound.pauseAsync()
    
//   }}><AntDesign name="play-circle" size={10} color="black" /></Text>
 
//  <FontAwesome onPress={()=>{
//   HandleShare()
//  }} name="share" className='px-2' size={22} color="black" />
//  </TouchableOpacity>
 
// )}/>}
 
//   </View>

 
// </View>
// </View>
//      }
   
//     </ImageBackground>
// }</ScrollView>
   
//    </View>
    
 
//    </AlertNotificationRoot>

//     </>
//   )
// }

import { useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";
// import { useRouter } from "expo-router";j
import { wp,hp } from "./helper";
import { useDownloadManager } from "./hooks/DownloadManager";

import * as SecureStore from "expo-secure-store";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Alert,
} from "react-native";
import axios from "axios";
import { AppContext } from "./Store";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
let IP='192.168.1.156'
// import "../global.css"
import { LinearGradient } from "expo-linear-gradient";
// import { Toast } from "react-native-alert-notification";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

export default function ShowSong() {
  const {downloadSong}=useDownloadManager()

  const [search, setSearch] = useState("");
  const {params:data}=useRoute();
 let [inputvalue,setinputvalue]=useState('')
const {ImageUrl,setImageUrl,IsPlay,setArtist,setIsPlay,para,setpara,sound,setsound,setstatus,status,Bhojsongdata,setBhojsongdata,IsCurr,setIsCurr,IsLogin,userdata,BackgroundImage,setBackgroundImage}=useContext(AppContext)
 let [searchsongdata,setsearchsongdata]=useState([])

    async function CollectBhojSongData() {
  let playlistname=data[0].name.replace(' Song','')
    

    let Data = await axios.get(
      `http://${IP}:4500/GetBhojpuriSong/${playlistname}`
    );
   console.log(Data.data)
    setBhojsongdata(Data.data);
   
    
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
    
    if(sound){
         await sound.pauseAsync()
         await sound.unloadAsync()
      const { sound:newSound } = await Audio.Sound.createAsync({
        uri:`http://${IP}:4500/${name}`
      },
      {
        shouldPlay:true
      
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

  async function HandlePlay(){
    setIsCurr(para)
    if(status.isPlaying==true){
      await sound.pauseAsync();
      setIsPlay(false)
      
    }
    else{
      await sound.playAsync();
      setIsPlay(true)

    }
   
  }


     function HandleSongSearch(name){
    // console.log(name)
    setinputvalue(name)
    let SearchSongsArray=Bhojsongdata.filter((item)=>{
      return item.songname.includes(name)
    })
    // console.log(SearchSongsArray)
    setsearchsongdata(SearchSongsArray)
  }
  const renderSong = ({index, item }) => (
    <TouchableOpacity  style={{width:wp(90),marginHorizontal:'auto'}} key={index} id={String(index)} onPress={()=>{
    playSound(item.songname,item.covername,index,item.artist)
  }} className={IsCurr!=item.songname?"border-2 border-transparent w-[100%] my-1    rounded-md  items-center justify-between flex-row":"border-2 border-[#000] w-[100%] my-1   rounded-md  items-center justify-between flex-row"}>
  <Image className="border-2 border-black rounded-full w-[40px] h-[40px] mx-1 my-1 " source={{uri:`http://${IP}:4500/${item.covername}`}}>

  </Image>
<Text className=' '    style={{width:wp(50)}}>{String(item.songname).length>40?(String(item.songname).slice(0,40)+'...'):item.songname}</Text>
  <TouchableOpacity onPress={()=>{
     playSound(item.songname,item.covername,index,item.artist)
  }}>
 <AntDesign name="play-circle" size={25} color="black" />
  </TouchableOpacity>
 <AntDesign onPress={()=>{
    let data=downloadSong(String(index),`http://${IP}:4500/${item.songname}`,`http://${IP}:4500/${item.covername}`,item.songname,item.artist)
    Toast.show({
       type: ALERT_TYPE.SUCCESS,
       title: 'Success',
       
       textBody: data,
       
      })


  }} name="download" size={20} color={'black'} style={{paddingHorizontal:2}}/>
  
 <FontAwesome onPress={()=>{
  HandleShare()
 }} name="share" className='px-2' size={22} color="black" />
 </TouchableOpacity>
 
  );

  useEffect(()=>{
// alert(data)
CollectBhojSongData()
  },[])
  return (
    <>
    <AlertNotificationRoot>

      <StatusBar translucent backgroundColor="transparent" />
      
      {/* Foreground Scroll Content */}
     {BackgroundImage==""? <LinearGradient
              // colors={['white', '#1D8DA3']}
                colors={['white', '#3fa9f5','white','#3fa9f5']}
      
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{flex:1}}
            >
               <View style={styles.overlay}>
        <FlatList
          data={Bhojsongdata}
          renderItem={renderSong}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <>
              {/* Playlist Image */}
              <View style={styles.imageContainer}>
                     {data!=undefined?<Image  source={{uri: `http://${IP}:4500/${data[0].playlistimage}`}} style={{width:wp(94),height:hp(40),borderRadius:23}} />:null}

              </View>

              {/* Playlist Name */}
               <Text style={{fontSize:wp(8),width:wp(100),fontWeight:'bold',fontFamily:'Bahnschrift',color:'black',textAlign:'center'}}>  {data!=undefined?data[0].title:null}</Text>
     <Text style={{fontSize:wp(3.5),width:wp(100),textAlign:'center',fontWeight:600,fontFamily:'Bahnschrift',color:'black'}}> {data!=undefined?data[0].description:null}</Text>
              {/* Search Box */}
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search songs..."
                  placeholderTextColor="#aaa"
                  value={inputvalue}
                  onChangeText={(text)=>{HandleSongSearch(text)}}
                />
              </View>
            </>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
     

            </LinearGradient>
:
      <ImageBackground source={{ uri: BackgroundImage }} style={{ flex: 1 }} >

      <View style={styles.overlay}>
        <FlatList
          data={Bhojsongdata}
          renderItem={renderSong}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <>
              {/* Playlist Image */}
              <View style={styles.imageContainer}>
                     {data!=undefined?<Image  source={{uri: `http://${IP}:4500/${data[0].playlistimage}`}} style={{width:wp(94),height:hp(40),borderRadius:23}} />:null}

              </View>

              {/* Playlist Name */}
               <Text style={{fontSize:wp(8),width:wp(100),fontWeight:'bold',fontFamily:'Bahnschrift',color:'black',textAlign:'center'}}>  {data!=undefined?data[0].title:null}</Text>
     <Text style={{fontSize:wp(3.5),width:wp(100),textAlign:'center',fontWeight:600,fontFamily:'Bahnschrift',color:'black'}}> {data!=undefined?data[0].description:null}</Text>
              {/* Search Box */}
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search songs..."
                  placeholderTextColor="#aaa"
                  value={inputvalue}
                  onChangeText={(text)=>{HandleSongSearch(text)}}
                />
              </View>
            </>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
      </ImageBackground>
}
    </AlertNotificationRoot>

    </>

   );
}

const styles = StyleSheet.create({
  
  background: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    // backgroundColor: "rgba(0,0,0,0.5)", // dark overlay on top of background
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  playlistImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#fff",
  },
  playlistName: {
    textAlign: "center",
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },
  searchContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
  },
  searchInput: {
    color: "#000",
    placeholderTextColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 60,
  },
  songItem: {
    marginHorizontal: 20,
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  songText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

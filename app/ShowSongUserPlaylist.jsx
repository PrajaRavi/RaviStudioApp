
import { useRoute } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Animated, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'


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
import { LinearGradient } from 'expo-linear-gradient'
import { wp,hp } from './helper'
import TrackPlayer from 'react-native-track-player'
import { getAudioDuration } from './utils/GetAudioDuration'
let {width,height}=Dimensions.get('window')


export default function ShowSongUserPlaylist() {
  const {ImageUrl,setImageUrl,IsPlay,setArtist,setIsPlay,para,setpara,sound,setsound,setstatus,status,Bhojsongdata,setBhojsongdata,IsCurr,setIsCurr,userdata,userplaylistSongs,IsLogin,setuserplaylistsongs,UserPlaylistData,setuserplaylistdata,BackgroundImage}=useContext(AppContext)
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
    return item?.name.includes(name)
  })
  // console.log(SearchSongsArray)
  setsearchsongdata(SearchSongsArray)
}
  async function playSound(name,cover,idx,artist) {
    let newarr=Bhojsongdata.map((item,index)=>{
      return {
        id:String(index),
        url:`http://${IP}:4500/${item.name}`,
        artwork:`http://${IP}:4500/${item.cover}`,
        duration:getAudioDuration(`http://${IP}:4500/${item.name}`),
        title:item.name,
        artist:item.artist,
      }
    })
setIsPlay(true)
    setIsCurr(name)
    setArtist(artist)
    setImageUrl(`http://${IP}:4500/${cover}`)
    await TrackPlayer.reset();
    await TrackPlayer.add(newarr)
setTimeout(async ()=>{
await TrackPlayer.skip(Number(idx))
await TrackPlayer.play()
},500)
   


   
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
      console.log(Data.data)
      console.log("user playlist")
   

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
const renderSong = ({index, item }) => (
    <TouchableOpacity  style={{width:wp(90),marginHorizontal:'auto'}} key={item.name} id={String(index)} onPress={()=>{
    playSound(item.name,item.cover,index,item.artist)
  }} className={IsCurr!=item.name?"border-2 border-transparent w-[100%] my-1    rounded-md  items-center justify-between flex-row":"border-2 border-[#000] w-[100%] my-1   rounded-md  items-center justify-between flex-row"}>
  <Image className="border-2 border-black rounded-full w-[40px] h-[40px] mx-1 my-1 " source={{uri:`http://${IP}:4500/${item.cover}`}}>

  </Image>
<Text className=' '    style={{width:wp(50)}}>{String(item.name).length>40?(String(item.name).slice(0,40)+'...'):item.name}</Text>
  <TouchableOpacity onPress={()=>{
     playSound(item.name,item.cover,index,item.artist)
  }}>
 <AntDesign name="play-circle" size={25} color="black" />
  </TouchableOpacity>

 
 </TouchableOpacity>
 
  );
  
  return (
    <>
   
{BackgroundImage==""? <LinearGradient
              // colors={['white', '#1D8DA3']}
                colors={['white', '#3fa9f5','white','#3fa9f5']}
      
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{flex:1}}
            >
               <View style={styles.overlay}>
        <FlatList
          data={searchsongdata.length>0?searchsongdata:Bhojsongdata}
          renderItem={renderSong}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={
            <>
              {/* Playlist Image */}
              <View style={styles.imageContainer}>
                     {data!=undefined?<Image  source={{uri: `http://${IP}:4500/${data[0].playlistimage}`}} style={{width:wp(94),height:hp(40),borderRadius:23}} />:null}

              </View>

              {/* Playlist Name */}
               <Text style={{fontSize:wp(8),width:wp(100),fontWeight:'bold',fontFamily:'Bahnschrift',color:'black',textAlign:'center'}}>  {data!=undefined?data[0].playlistname:null}</Text>
     <Text style={{fontSize:wp(3.5),width:wp(100),textAlign:'center',fontWeight:600,fontFamily:'Bahnschrift',color:'black'}}> {data!=undefined?data[0].title:null}</Text>
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
          keyExtractor={(item) => item._id}
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
   

 


   
    
    
                                                                                                                                                                                                                                        
  
 
 

    </>
  )
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
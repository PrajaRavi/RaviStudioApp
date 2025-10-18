import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { Audio } from 'expo-av';
import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import deleteicon from "../assets/delete.png";
import play from "../assets/play-button.png";
import { AppContext } from './Store';
const {width,height}=Dimensions.get('window')
let   IP='192.168.1.155'
;
export default function FavraitSong() {
  const navigaion=useNavigation()
  let [LikedSongData,setLikedSongData]=useState([])
  let [globalcolor,setglobalcolor]=useState('black')
  const {top}=useSafeAreaInsets();
    const paddingtop=top>0?30:top;
    
  let [FilteredLikedSongData,setFilteredLikedSongData]=useState([])
   const {ImageUrl,setImageUrl,IsPlay,setArtist,setIsPlay,para,setpara,sound,setsound,setstatus,status,Bhojsongdata,setBhojsongdata,userdata,IsCurr,setIsCurr,BackgroundImage,setBackgroundImage}=useContext(AppContext)
   const {t}=useTranslation()
  async function CollectLikedSongData() {
  
    try {
       
      let Data = await axios.get(
        `http://${IP}:4500/FavSongData/${userdata._id}`
      );
      // alert('Lided Song')
      // console.log(Data.data)
      if (Data) {
        console.log(Data.data)
        // setLikedSongData(Data.data);
        setBhojsongdata(Data.data)
     
        
      } else {
    
        console.log("Data not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function HandleShare(){

  }
  async function playSound(name,cover,idx,artist) {
    // alert(IsCurr+'iscurr')
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
     setpara(name)
     setImageUrl({uri: `http://${IP}:4500/${cover}`})
     try {
     if(sound){
       // alert("run")
          await sound.pauseAsync()
          await sound.unloadAsync()
       const { sound:newSound } = await Audio.Sound.createAsync({
         uri:`http://${IP}:4500/${name}`
       },
       {
         shouldPlay:true
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
   }
   async function HandleFavraitSongDelete(name){
    let newarr=LikedSongData.filter((item)=>{
      return item.name!=name
    })
    try {
      let result =  SecureStore.getItem('Token');
      let {data}=await axios.post(`http://${IP}:4500/GetUserDataForApp`,{Token:result})
      let Data=await axios.post(`http://${IP}:4500/SetFavSongData/${data._id}`,{
        FavSongData:newarr
      })
      Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Success',
              
              textBody:'Song Deleted',
        
            })
      setLikedSongData(newarr)
      CollectLikedSongData()

    } catch (error) {
      console.log(error)
    }
    console.log(newarr)
   }
  useEffect(()=>{
CollectLikedSongData()
  },[])
  return (
    <>
    <AlertNotificationRoot>
      {BackgroundImage==""?<LinearGradient
            // colors={['white', '#1D8DA3']}
          colors={['white', '#3fa9f5','white','#3fa9f5']}

            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{flex:1}}
          >
      
    <View style={{flex:1,display:'flex',paddingTop:paddingtop,flexDirection:'column'}}>
      <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingVertical:3,paddingHorizontal:3,borderColor:'black',borderBottomWidth:2,borderColor:globalcolor}}>

      <TouchableOpacity onPress={()=>{
        navigaion.goBack()
        
      }} style={{width:40,height:40,backgroundColor:globalcolor,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:12,}}>
      <Entypo name="chevron-left" size={30} color="white" />
      </TouchableOpacity>
      <Text style={{fontSize:28,fontWeight:'bold',color:globalcolor}}>{t('Favourite')}</Text>
        </View>
      <View style={{width,height:height*0.8,paddingHorizontal:10,marginTop:20}}>
      { !LikedSongData==''?<FlatList  data={Bhojsongdata} showsVerticalScrollIndicator={false} renderItem={({item,index})=>(
      
      
      
      <TouchableOpacity  key={index} id={String(index)} onPress={()=>{
        playSound(item.name,item.cover,index,item.artist)
      }} className={IsCurr==item.name?"border-2 border-black w-[100%] my-1   rounded-md  items-center justify-between flex-row":"border-2 border-transparent w-[100%] my-1   rounded-md  items-center justify-between flex-row"}>
      <Image className="border-2 border-black rounded-full w-[40px] h-[40px] mx-1 my-1 " source={{uri:`http://${IP}:4500/${item.cover}`}}>

      </Image>
    <Text className=' '    style={{width:width*0.5,color:globalcolor}}>{String(item.name).length>40?(String(item.name).slice(0,40)+'...'):item.name}</Text>
    {/* <Text>{item.IsSelected}</Text> */}
    {/* <TouchableOpacity  onPress={()=>{
      HandleFavrait(item.name,item.cover,index,item.artist,item.IsSelected)
      
    }}>{item.IsSelected==true?<AntDesign  name="heart" size={20} color="red"  />:<AntDesign  name="hearto" size={20} color="black"  />}</TouchableOpacity> */}
      <Text onPress={async ()=>{
        // playSound(item.name)
        // pauseSound()
        await sound.pauseAsync()
        
      }}><Image source={play} style={{width:30,height:30}}/></Text>
     
     <TouchableOpacity onPress={()=>{
      HandleFavraitSongDelete(item.name)
     }}>
<Image source={deleteicon} style={{width:30,height:30}}/>
     </TouchableOpacity>
     </TouchableOpacity>
     
    )}/>:null}
      </View>


      </View>
      </LinearGradient>:
      <ImageBackground source={{uri:BackgroundImage}} style={{flex:1}}>
   <View style={{flex:1,display:'flex',paddingTop:paddingtop,flexDirection:'column'}}>
      <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingVertical:3,paddingHorizontal:3,borderColor:'black',borderBottomWidth:2,borderColor:globalcolor}}>

      <TouchableOpacity onPress={()=>{
        navigaion.goBack()
        
      }} style={{width:40,height:40,backgroundColor:globalcolor,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:12,}}>
      <Entypo name="chevron-left" size={30} color="white" />
      </TouchableOpacity>
      <Text style={{fontSize:28,fontWeight:'bold',color:globalcolor}}>{t('Favourite')}</Text>
        </View>
      <View style={{width,height:height*0.8,paddingHorizontal:10,marginTop:20}}>
      { !LikedSongData==''?<FlatList  data={Bhojsongdata} showsVerticalScrollIndicator={false} renderItem={({item,index})=>(
      
      
      
      <TouchableOpacity  key={index} id={String(index)} onPress={()=>{
        playSound(item.name,item.cover,index,item.artist)
      }} className={IsCurr==item.name?"border-2 border-black w-[100%] my-1   rounded-md  items-center justify-between flex-row":"border-2 border-transparent w-[100%] my-1   rounded-md  items-center justify-between flex-row"}>
      <Image className="border-2 border-black rounded-full w-[40px] h-[40px] mx-1 my-1 " source={{uri:`http://${IP}:4500/${item.cover}`}}>

      </Image>
    <Text className=' '    style={{width:width*0.5,color:globalcolor}}>{String(item.name).length>40?(String(item.name).slice(0,40)+'...'):item.name}</Text>
    {/* <Text>{item.IsSelected}</Text> */}
    {/* <TouchableOpacity  onPress={()=>{
      HandleFavrait(item.name,item.cover,index,item.artist,item.IsSelected)
      
    }}>{item.IsSelected==true?<AntDesign  name="heart" size={20} color="red"  />:<AntDesign  name="hearto" size={20} color="black"  />}</TouchableOpacity> */}
      <Text onPress={async ()=>{
        // playSound(item.name)
        // pauseSound()
        await sound.pauseAsync()
        
      }}><Image source={play} style={{width:30,height:30}}/></Text>
     
     <TouchableOpacity onPress={()=>{
      HandleFavraitSongDelete(item.name)
     }}>
<Image source={deleteicon} style={{width:30,height:30}}/>
     </TouchableOpacity>
     </TouchableOpacity>
     
    )}/>:null}
      </View>


      </View>
        
      </ImageBackground>
}
    </AlertNotificationRoot>
      
    </>
  )
}

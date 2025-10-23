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
import TrackPlayer from 'react-native-track-player';
const {width,height}=Dimensions.get('window')
let   IP='192.168.1.155'
let newarr;
let firstrender=false;
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
    //  console.log(data)
      if(firstrender==true){

          newarr=Bhojsongdata?.map((item,index)=>{
            return {
              id:String(index),
              url:`http://${IP}:4500/${item.songname}`,
              artist:item.artist,
              artwork:`http://${IP}:4500/${item.cover}`,
              title:item.songname
            }
          })
          await TrackPlayer.reset()
          await TrackPlayer.add(newarr)
        }
      
        setTimeout(async ()=>{
          await TrackPlayer.skip(Number(idx))
          await TrackPlayer.play();
        },500)
        setpara(name)
        setArtist(artist)
        setImageUrl({uri:`http://${IP}:4500/${cover}`})
        setIsPlay(true)
        setIsCurr(name)
   }
   async function HandleFavraitSongDelete(name){
    let newarr=Bhojsongdata.filter((item)=>{
      return item.songname!=name
    })
    
    try {
      let data=await SecureStore.getItemAsync("user")

      let Data=await axios.post(`http://${IP}:4500/SetFavSongData/${JSON.parse(data)._id}`,{
        FavSongData:newarr
      })
      setBhojsongdata(newarr)
      Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Success',
              
              textBody:'Song Deleted',
        
            })
            // CollectLikedSongData()

    } catch (error) {
      console.log(error)
    }
    console.log(newarr)
   }
  useEffect(()=>{
    firstrender=true;
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
        playSound(item.songname,item.cover,index,item.artist)
      }} className={IsCurr==item.songname?"border-2 border-black w-[100%] my-1   rounded-md  items-center justify-between flex-row":"border-2 border-transparent w-[100%] my-1   rounded-md  items-center justify-between flex-row"}>
      <Image className="border-2 border-black rounded-full w-[40px] h-[40px] mx-1 my-1 " source={{uri:`http://${IP}:4500/${item.cover}`}}>

      </Image>
      <View>

    <Text className=' '    style={{width:width*0.5,color:globalcolor}}>{String(item.songname).length>40?(String(item.songname).slice(0,40)+'...'):item.songname}</Text>
    <Text style={{fontSize:12}}>{item.artist}</Text>
      </View>
    {/* <TouchableOpacity  onPress={()=>{
      HandleFavrait(item.name,item.cover,index,item.artist,item.IsSelected)
      
    }}>{item.IsSelected==true?<AntDesign  name="heart" size={20} color="red"  />:<AntDesign  name="hearto" size={20} color="black"  />}</TouchableOpacity> */}
      <Text onPress={async ()=>{
      
        playSound(item.songname,item.cover,index,item.artist)
        
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
        playSound(item.songname,item.cover,index,item.artist)
      }} className={IsCurr==item.songname?"border-2 border-black w-[100%] my-1   rounded-md  items-center justify-between flex-row":"border-2 border-transparent w-[100%] my-1   rounded-md  items-center justify-between flex-row"}>
      <Image className="border-2 border-black rounded-full w-[40px] h-[40px] mx-1 my-1 " source={{uri:`http://${IP}:4500/${item.cover}`}}>

      </Image>
    <Text className=' '    style={{width:width*0.5,color:globalcolor}}>{String(item.songname).length>40?(String(item.songname).slice(0,40)+'...'):item.songname}</Text>
    {/* <Text>{item.IsSelected}</Text> */}
    {/* <TouchableOpacity  onPress={()=>{
      HandleFavrait(item.name,item.cover,index,item.artist,item.IsSelected)
      
    }}>{item.IsSelected==true?<AntDesign  name="heart" size={20} color="red"  />:<AntDesign  name="hearto" size={20} color="black"  />}</TouchableOpacity> */}
      <Text onPress={async ()=>{
        playSound(item.songname,item.cover,index,item.artist)
       
        
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

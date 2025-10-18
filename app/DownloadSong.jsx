import { Image, ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import { useContext, useEffect } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import lefticon from "../assets/left.png";
import { DownloadScreen } from "./DownloadScreen";
import { AppContext } from './Store';
import { hp } from './helper';
const {width,height}=Dimensions.get('window')
// let   IP='192.168.1.155'
;
let   IP='192.168.1.155'
;

export default function DownloadedSong() {
  const {BackgroundImage,setBackgroundImage}=useContext(AppContext)
  const navigaion=useNavigation()
  const {top}=useSafeAreaInsets();
  const paddingtop=top>0?30:top;
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
      
    <View style={{flex:1,display:'flex',flexDirection:'column',paddingTop:paddingtop}}>
      <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingVertical:3,paddingHorizontal:3,borderColor:'black',borderBottomWidth:2}}>

      <TouchableOpacity onPress={()=>{
        navigaion.goBack()
        
      }} style={{width:40,height:40,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:12,}}>
        <Image source={lefticon} style={{width:30,height:30}}/>
      </TouchableOpacity>
      <Text style={{fontSize:28,fontWeight:'bold'}}>Downloaded Song</Text>
        </View>
      <View style={{width,height:hp(90),paddingHorizontal:10,marginTop:20}}>
        <DownloadScreen/>
      </View>

      </View>
      </LinearGradient>:
      <ImageBackground source={{ uri: BackgroundImage }} style={{ flex: 1 }} >
 <View style={{flex:1,display:'flex',flexDirection:'column',paddingTop:paddingtop}}>
      <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingVertical:3,paddingHorizontal:3,borderColor:'black',borderBottomWidth:2}}>

      <TouchableOpacity onPress={()=>{
        navigaion.goBack()
        
      }} style={{width:40,height:40,backgroundColor:'black',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:12,}}>
        <Image source={lefticon} style={{width:30,height:30}}/>
      </TouchableOpacity>
      <Text style={{fontSize:28,fontWeight:'bold'}}>Downloaded Song</Text>
        </View>
      <View style={{width,height:hp(90),paddingHorizontal:10,marginTop:20}}>
        <DownloadScreen/>
      </View>

      </View>
   
      </ImageBackground>
}    </AlertNotificationRoot>

      
    </>
  )
}

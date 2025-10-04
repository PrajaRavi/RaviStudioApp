import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import lefticon from "../assets/left.png"
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DownloadScreen } from "./screen/DownloadScreen";
import { Image } from 'expo-image';
const {width,height}=Dimensions.get('window')
// let   IP='192.168.1.156';
let   IP='192.168.1.156';

export default function DownloadedSong() {
  const navigaion=useNavigation()
  const {top}=useSafeAreaInsets();
  const paddingtop=top>0?30:top;
  useEffect(()=>{
    // alert("mai chala")
  },[])
  return (
    <>
    <AlertNotificationRoot>
      
      <LinearGradient
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
        
      }} style={{width:40,height:40,backgroundColor:'black',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:12,}}>
        <Image source={lefticon} style={{width:30,height:30}}/>
      </TouchableOpacity>
      <Text style={{fontSize:28,fontWeight:'bold'}}>Downloaded Song</Text>
        </View>
      <View style={{width,height:height*0.8,paddingHorizontal:10,marginTop:20}}>
        <DownloadScreen/>
      </View>

      </View>
      </LinearGradient>
      
    </AlertNotificationRoot>

      
    </>
  )
}

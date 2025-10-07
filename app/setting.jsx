import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import galleryicon from "../assets/gallery.png"
import { FontSizeSlider } from './SizeSlider'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, ImageBackground } from 'expo-image';
import { hp, wp } from './helper';
import { AppContext } from './Store';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from 'expo-router';
const setting = () => {
  const {IconSize,setIconSize,BackgroundImage,setBackgroundImage}=useContext(AppContext)
  const {top,bottom}=useSafeAreaInsets();
    const paddingtop=top>0?10:top;
    const navigation=useNavigation()
  async function Hello(data,sliderValue){
    // alert(data)
    if(data==14){
      setIconSize(120)
      sliderValue(0)
      await SecureStore.setItemAsync('iconSize', '120');
    }
    else if(data==18){
      setIconSize(160)
      sliderValue(1)
      await SecureStore.setItemAsync('iconSize', '160');

    }
    else if(data==22){
      setIconSize(180)
      sliderValue(2)
      await SecureStore.setItemAsync('iconSize', '180');
    }


    
  }

  return (
    <>
    {BackgroundImage==""?<LinearGradient
            // colors={['white', '#1D8DA3']}
              colors={['white', '#3fa9f5','white','#3fa9f5']}
    
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{flex:1}}
          >
    
    <View style={{flex:1,marginTop:30,alignItems:'center',justifyContent:'start',gap:10}}>
<FontSizeSlider onFontSizeChange={Hello}/>

<TouchableOpacity onPress={()=>{
  
   navigation.navigate('WallpaperSelector')
}} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10,marginTop:0,    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width:wp(90),paddingVertical:10,borderRadius:15,borderWidth:1 }}>
<Image source={galleryicon} style={{width:40,height:40}}/>

<Text style={{color:'#555',fontSize:wp(5)}}>Change Background</Text>
</TouchableOpacity>
      </View>
      </LinearGradient>:<ImageBackground source={{ uri: BackgroundImage }} style={{ flex: 1 }} >
         <View style={{flex:1,marginTop:30,alignItems:'center',justifyContent:'start',gap:10}}>
<FontSizeSlider onFontSizeChange={Hello}/>

<TouchableOpacity onPress={()=>{
  
   navigation.navigate('WallpaperSelector')
}} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10,marginTop:0,    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width:wp(90),paddingVertical:10,borderRadius:15,borderWidth:1 }}>
<Image source={galleryicon} style={{width:40,height:40}}/>

<Text style={{color:'#555',fontSize:wp(5)}}>Change Background</Text>
</TouchableOpacity>
      </View>
   
        </ImageBackground>
}    </>

  )
}

export default setting
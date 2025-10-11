import { View, Text,ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useContext } from 'react'
import {wp,hp} from "./helper"
import { Line } from 'react-native-svg'
import { AppContext } from './Store'
import { LinearGradient } from 'expo-linear-gradient'
const AIManual = () => {
      const {IconSize,setIconSize,BackgroundImage,setBackgroundImage}=useContext(AppContext)
    
  return (
    <>
    {BackgroundImage==""?<LinearGradient
                // colors={['white', '#1D8DA3']}
                  colors={['white', '#3fa9f5','white','#3fa9f5']}
        
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{flex:1}}
              >
    <SafeAreaView>

    <ScrollView style={{padding:20}}>
      <Text style={{fontSize:wp(5),fontWeight:'bold'}}>How to use Virtual Assistant</Text>
      <Text style={{fontSize:wp(4)}}>1.Start saying echo(name of the ai) this ai has limited command</Text>

    </ScrollView>
    </SafeAreaView>
    </LinearGradient>:<BackgroundImage source={{ uri: BackgroundImage }} style={{ flex: 1 }} >
        <SafeAreaView>

    <ScrollView style={{padding:20}}>
      <Text style={{fontSize:wp(5),fontWeight:'bold'}}>How to use Virtual Assistant</Text>
      <Text style={{fontSize:wp(4)}}>1.Start saying echo(name of the ai) this ai has limited command</Text>

    </ScrollView>
    </SafeAreaView>
    
        </BackgroundImage>}
    </>
  )
}

export default AIManual
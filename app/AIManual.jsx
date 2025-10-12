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
      <Text style={{fontSize:wp(4)}}>2.echo play or echo start for play song</Text>
      <Text style={{fontSize:wp(4)}}>3.echo pause or echo stop for pause song</Text>
      <Text style={{fontSize:wp(4)}}>4.echo next or echo forward for next song</Text>
      <Text style={{fontSize:wp(4)}}>5.echo previous or echo back for previous song</Text>
      <Text style={{fontSize:wp(4)}}>6.echo open download for download section</Text>
      <Text style={{fontSize:wp(4)}}>7.echo open Favourite for Favourite section</Text>
      <Text style={{fontSize:wp(4)}}>8.echo open Setting for Setting section</Text>
      <Text style={{fontSize:wp(4)}}>9.echo open home for home section</Text>

    </ScrollView>
    </SafeAreaView>
    </LinearGradient>:<BackgroundImage source={{ uri: BackgroundImage }} style={{ flex: 1 }} >
        <SafeAreaView>

    <ScrollView style={{padding:20}}>
      <Text style={{fontSize:wp(5),fontWeight:'bold'}}>How to use Virtual Assistant</Text>
      <Text style={{fontSize:wp(4)}}>1.Start saying echo(name of the ai) this ai has limited command</Text>
      <Text style={{fontSize:wp(4)}}>2.echo play for play song</Text>
      <Text style={{fontSize:wp(4)}}>3.echo pause for pause song</Text>
      <Text style={{fontSize:wp(4)}}>4.echo next for next song</Text>
      <Text style={{fontSize:wp(4)}}>5.echo previous for previous song</Text>
      <Text style={{fontSize:wp(4)}}>6.echo open download for download section</Text>
      <Text style={{fontSize:wp(4)}}>7.echo open Favourite for Favourite section</Text>
      <Text style={{fontSize:wp(4)}}>8.echo open Setting for Setting section</Text>
      <Text style={{fontSize:wp(4)}}>9.echo open home for home section</Text>

    </ScrollView>
    </SafeAreaView>
    
        </BackgroundImage>}
    </>
  )
}

export default AIManual
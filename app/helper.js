
import { View, Text } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'
// function for width in precentage according the device body

const {width:devicewidth,height:deviceheight} =Dimensions.get('window')
export function wp(percent){
return (percent*devicewidth)/100;
}
export function hp(percent){
return (percent*deviceheight)/100;
}
export function GetColumCount(){
    if(devicewidth>1000){
        // desktop
        return 4
    }
    else if(devicewidth>700){
        // tablet
        return 3
    }
    else{
        return 2
    }
}
// import React, { Component } from 'react'

export const helper=()=>{
   {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}

export default helper

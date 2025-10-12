import { View, Text } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'


export function DeviceDetect(){
const {width:devicewidth,height:deviceheight} =Dimensions.get('window')
    if(devicewidth>700){
        return "Tablet"
    }
    else{
        return "Mobile"
    }
}
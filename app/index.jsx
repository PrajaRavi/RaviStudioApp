import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import '../global.css'
import TabLayout from './(tabs)/_layout'
// import * as Notification from 'expo-notifications'
let   IP='192.168.1.155';;




import { useTranslation } from 'react-i18next'

import { useContext } from 'react'
import { AppContext } from './Store'

export default function index() {

  const {t}=useTranslation()
  const {sound}=useContext(AppContext)
   let [para,setpara]=useState('Hello I am Hindi Song')
    let [ImageUrl,setImageUrl]=useState(require('../assets/ravi4.png'))
    
  let [IsPlay,setIsPlay]=useState(false)

    
  async function DefiinigBackgorundTask(){
  
  }

   async function GetSongData(){
      // alert("GetSongData from index")
      try {
        
        let Data=JSON.parse(SecureStore.getItem('SongData'))
  
        
        
        setpara(Data.name)
        setImageUrl({uri: `http://${IP}:4500/${Data.cover}`})
        setIsPlay(Data.IsPlay)
        count=0
        
  
        
      } catch (error) {
        console.log(error)
      }
    }
    async function func(){
      //  alert('run')
      let SongData= (SecureStore.getItem('SongData'))
    
          let Data=JSON.parse(SongData)
          // console.log(Data)
    
    if(IsPlay==true){
    setIsPlay(false)
    await sound.pauseAsync();
    
    }
    else{
    // alert("else")
    setIsPlay(true)
    }
    
     }
    async function func1(){
      
  
  console.log("status");

    }

    
    useEffect(()=>{
      
      // alert('helllo')
      func1();
    
      
      GetSongData()
      func()
     DefiinigBackgorundTask()
    },[])
  
  return (
    <>
    
{/* <RiverTheme children={<TabLayout/>}/> */}
<TabLayout/>
   
    
 
      
    </>
  )
}

import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios'
import { useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as yup from "yup"
const {width,height}=Dimensions.get('window')
let   IP='10.205.8.23'
;

import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification'
// import { ActivityIndicator } from 'react-native-web'
import { ActivityIndicator } from 'react-native'

import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from 'expo-router'
import { useTranslation } from 'react-i18next'


export default function FogotEmail() {
  const {t}=useTranslation()
  const [globalcolor,setglobalcolor]=useState('black')
  const schema = yup
  .object({
  
    email: yup.string().email(t('plzzentervalidemail')).required(t('emailreq')),
    

    
  })
  const navigation=useNavigation()
  let [activityIndicator,setactivityIndicator]=useState(false)
  const {
    control,
    handleSubmit,
    reset,
  
    formState: { errors },
  } = useForm({
    resolver:yupResolver(schema),
   
  })
  async function onsubmit(Data){
  // first check that if the useremail exist in our database or not

  let UserExist=await axios.get(`http://${IP}:4500/GetUserAge/${Data.email}`)
  try {
    if(UserExist.data.msg=='Data not found'){
       Toast.show({
              type: ALERT_TYPE.WARNING,
              title: 'Warning',
              
              textBody:t('plzcreteanaccount'),
        
            })
            setTimeout(()=>{

              navigation.navigate('index')
            },2000)
    }
    else{
      setactivityIndicator(true)
      let ResetOTPexpiryTime=UserExist.data.msg.resetOtpExpiresAt;
      // alert('Userexist')
      // now userexist with the given mail so now we can send otp but before sending otp we have to send that if the user have already a otp if yes then we have to  give alert that enter preveous otp
      if(ResetOTPexpiryTime>Date.now()){
        // OTP IS NOT EXPIRED
        Toast.show({
          type: ALERT_TYPE.INFO,
          title: 'Information',
          
          textBody:t('Enter Preveous OTP'),
    
        })
        // navigate('/Forgot')
        setTimeout(()=>{

          navigation.navigate('ResetPas')
        },2000)
      }
  else{
    // otp is expired
    let {data}=await axios.post(`http://${IP}:4500/SendResetPassOTP`,{email:Data.email})
    console.log(data)
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Sucess',
      
      textBody:t('ResetPassword OTP is send to your mail'),

    })
    setTimeout(()=>{

      navigation.navigate('ResetPas')
    },2000)

    // navigate('/Forgot')
    
    
  }

    }
    // alert(UserExist.data.msg.email)
    
  } catch (error) {
    console.log(error)
  }
  
  }
 
  return (
    <AlertNotificationRoot>
    <LinearGradient
      // colors={['white', '#1D8DA3']}
          colors={['white', '#3fa9f5','white','#3fa9f5']}

      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{flex:1}}
    >

   <View  style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14,width:'100%',height:height}}>
      
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput keyboardType="email-address"  onBlur={onBlur} onChangeText={onChange} value={value} placeholder={t('enteremail')} placeholderTextColor={globalcolor}
          style={{fontWeight:'bold',fontSize:15,color:globalcolor,borderRadius:23,borderColor:globalcolor,width:width*0.8,borderWidth:2,paddingHorizontal:20}}/>
        )}
        name="email"
      />
       {errors.email && <Text className='text-red-800 font-bold'>*{errors.email.message}</Text>}

  {activityIndicator?<ActivityIndicator size={40}/>: <TouchableOpacity onPress={handleSubmit(onsubmit)}>
              <Text style={{fontSize:20,fontWeight:'bold',borderRadius:23,borderColor:globalcolor,borderWidth:2,paddingVertical:5,paddingHorizontal:30,color:globalcolor}} className='text-2xl font-bold border-2 px-5 rounded-md'>{t('submit')}</Text>
            </TouchableOpacity>}
        
    
    </View>
    </LinearGradient>
    </AlertNotificationRoot>
  )
}

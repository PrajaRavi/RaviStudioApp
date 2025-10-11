import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
// import { useNavigation } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
let   IP='10.205.8.23'
;

import { Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { useNavigation } from 'expo-router';
// import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import * as yup from "yup";

export default function ResetPas() {
  const {t}=useTranslation()
  const navigation=useNavigation()


  const schema = yup
  .object({
    // name: yup.string().required('username is required').min(4,'username is too sort'),
  email: yup.string().email(t('plzzentervalidemail')).required(t('emailreq')),
    // contact: yup.string().required('contact is required').min(10,'Enter a valid contact'),
     password:yup.string().required(t('passreq')).min(5,t('passhort')),
    OTP:yup.string().required(t('enterotp')).min(6,t('validotp'))
    
  })
  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver:yupResolver(schema),
   
  })
async function HandleResendOTP(){
  navigation.navigate('FogotEmail')
}
  async function onsubmit(Data){
    let {data}=await axios.post(`http://${IP}:4500/ResetPass`,{
      email:Data.email,
      NewPassword:Data.password,
      otp:Data.OTP,
    })
    if(data.success==false){
        Toast.show({
              type: ALERT_TYPE.WARNING,
              title: 'Warning',
              
              textBody: data.message,
            })
    }
    else{
      setTimeout(()=>{

        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          
          textBody: data.message,
        })
      },2000)
      navigation.navigate('Login')
    }
  }
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

    <View className="flex flex-col items-center justify-center gap-3 w-[100%] h-[100%]">

<Text className="font-bold text-3xl" style={{fontSize:30}}>{t('resetpass')}</Text>
 <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder={t('enteremail')}  onBlur={onBlur} onChangeText={onChange} value={value}   className="font-bold text-xl rounded-md border-2 border-black w-[80%]"/>
        )}
        name="email"
      />
       {errors.email && <Text className='text-red-800 font-bold'>*{errors.email.message}</Text>}
 <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder={t('newpass')}  onBlur={onBlur} onChangeText={onChange} value={value}   className="font-bold text-xl rounded-md border-2 border-black w-[80%]"/>
        )}
        name="password"
      />
       {errors.password && <Text className='text-red-800 font-bold'>*{errors.password.message}.</Text>}
 <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder={t('enterotp')}  onBlur={onBlur} onChangeText={onChange} value={value}   className="font-bold text-xl rounded-md border-2 border-black w-[80%]"/>
        )}
        name="OTP"
      />
       {errors.OTP && <Text className='text-red-800 font-bold'>*{errors.OTP.message}.</Text>}
       <TouchableOpacity onPress={()=>{
        HandleResendOTP()
       }}>

       <Text className='font-bold text-2xl italic text-black underline'>{t('resendotp')}</Text>
       </TouchableOpacity>
 <TouchableOpacity onPress={handleSubmit(onsubmit)}>
          <Text className='text-2xl font-bold border-2 px-5 my-3 rounded-md'>{t('submit')}</Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>
    </AlertNotificationRoot>

    </>
  )
}

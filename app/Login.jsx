import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
// let   IP='10.205.8.23'
;
let   IP='10.205.8.23'
;

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import { Controller, useForm } from "react-hook-form";
import { Dimensions } from 'react-native';
const {width,height}=Dimensions.get('window')

// import { useNavigation } from 'expo-router'
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import * as yup from "yup";
import { AppContext } from './Store';
export default function Login() {

 let [globalcolor,setglobalcolor]=useState('white');
  
  const {t}=useTranslation()
  const schema = yup
  .object({
  
    email: yup.string().email(t('validemail')).required(t('emailreq')),
    
    password:yup.string().required(t('passreq')).min(5,t('passhort'))
    
  })
  

const {IsLogin,setisLogin,setuserdata}=useContext(AppContext)
  const navigation=useNavigation()
   const {
      control,
      handleSubmit,
      reset,
    
      formState: { errors },
    } = useForm({
      resolver:yupResolver(schema),
     
    })
    
    async function onsubmit(Data){
      // console.log(Data)
      axios.defaults.withCredentials=true;
      let {data}=await axios.post(`http://${IP}:4500/user/Login`,{
        email:Data.email,
        password:Data.password,
        Credential:true
      })
      
      
      if(data.msg=='Loged In Successfully'){
        setisLogin(true)
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          
          textBody: data.msg,
          
        })
        save("user",JSON.stringify(data.user))
        setuserdata(JSON.stringify(data.user))
        
        setTimeout(()=>{
          navigation.navigate('index')
          
        },1000)
        
      reset();
      console.log(data)
      navigation.navigate('Login')
    }
    if(data.msg=="You didn't Sign Up"){
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Warning',
        
        textBody: data.msg,
      })
      // console.log(data)
      setTimeout(()=>{

        navigation.navigate('(tabs)/SignUp')
      },1000)
  
      reset();
  
    }
    if(data.msg=='Invalid Credentials'){
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Warning',
        
        textBody: data.msg,
      })
    }
    
    
    
  }
  async function save(key, value) {
      await SecureStore.setItemAsync(key, value);
    }
    
    async function getValueFor(key) {
      let result =  SecureStore.getItem(key);
      if (result) {
        return result
        // alert("stored \n" + result);
      } else {
        return "nothing"
        // alert('No values stored under that key.');
      }
    }
  async function HandleForgot(){
    navigation.navigate('FogotEmail')
let result=await axios.post(`http://${IP}:4500/SendResetPassOTP`)


  }
  useEffect(()=>{
   
// GetUserDatafromDB()
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

    <View  style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14,width:'100%',height:height,}}>
    
        {/* <Text className="font-bold text-6xl py-10">{t('login')}</Text> */}
        <Text  style={{paddingVertical:30,fontWeight:'bold',color:'black',fontSize:60}}>{t('login')}</Text>
        {/* <TextInput placeholder="Name" className="font-bold text-xl rounded-md border-2 border-black w-[80%]"/> */}
        <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput keyboardType="email-address"  onBlur={onBlur} onChangeText={onChange} value={value} placeholder={t('enteremail')} placeholderTextColor={'black'}
          style={{fontWeight:'bold',fontSize:15,color:'black',borderRadius:23,borderColor:'black',width:width*0.8,borderWidth:2,paddingHorizontal:20}}/>
        )}
        name="email"
      />
      
       {errors.email && <Text style={{color:'red'}}>*{errors.email.message}</Text>}
       <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder={t('enterpass')} secureTextEntry={true} onBlur={onBlur} onChangeText={onChange} value={value}  placeholderTextColor={'black'}
          style={{fontWeight:'bold',fontSize:15,color:'black',borderRadius:23,borderColor:'black',width:width*0.8,borderWidth:2,paddingHorizontal:20}}/>
        )}
        name="password"
      />
      
       {errors.password && <Text style={{color:'red'}}>*{errors.password.message}.</Text>}   
        
       <Text style={{color:'black',fontWeight:'bold',fontSize:15}}>{t('createacc')}?<Text style={{fontSize:20}}><Link href={'/'}>{t('signup')}</Link></Text></Text>
       <TouchableOpacity onPress={HandleForgot} style={{borderBottomColor:'black',borderBottomWidth:2,marginBottom:5}}>
          <Text style={{color:'black',fontSize:20,fontWeight:'bold',textDecorationColor:'underline'}}>{t('forgotpass')}</Text>
        </TouchableOpacity>
        {/* <Button onPress={handleSubmit(onsubmit)} title='LogIn' ></Button> */}

     <TouchableOpacity onPress={handleSubmit(onsubmit)}>
            <Text style={{fontSize:20,fontWeight:'bold',borderRadius:23,borderColor:'black',borderWidth:2,paddingVertical:5,paddingHorizontal:30,color:'black'}} className='text-2xl font-bold border-2 px-5 rounded-md'>{t('login')}</Text>
          </TouchableOpacity>
       
        </View>
        </LinearGradient>
    </AlertNotificationRoot>
      
    </>
  )
}

import axios from "axios";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import '../../global.css';
const {width,height}=Dimensions.get('window')
// import logo from '../assets/images/react.logo.png'
import { Controller, useForm } from "react-hook-form";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
// import { useNavigation } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { wp } from "../helper";
// let   IP='192.168.1.155';
let   IP='192.168.1.155'

  
// import index from "./(drawer)/index";
// const Schema=yup.
export default function SignUp() {
  const navigation=useNavigation();
  const {t}=useTranslation()
  let[Apidata,setApidata]=useState([])
 let [globalcolor,setglobalcolor]=useState('white');
  const schema = yup
  .object({
    FirstName: yup.string().required(t('firstnamerror')).min(4,t('firstnameshort')),
    LastName: yup.string().required(t('lastnamerror')).min(4,t('lastnameshort')),
    email: yup.string().email(t('plzzentervalidemail')).required(t('emailreq')),
    DOB: yup.string().required(t('dobreq')),
   
    contact: yup.string().required(t('contreq')).min(10,t('validcont')),
    password:yup.string().required(t('passreq')).min(5,t('passhort'))
    
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
  async function onsubmit(Data){
    // console.log(data)

  let {data}=await axios.post(`http://${IP}:4500/SignUp`,Data)
  // console.log(Data)
  if(data.msg=="User already exist in database"){
    Toast.show({
      type: ALERT_TYPE.WARNING,
      title: 'Warning',
      
      textBody:'You Already SignedUp!! Plzz Login',

    })
    setTimeout(()=>{

      navigation.navigate('Login',{})
    },1000)

    console.log(data)
    // navigation.navigate('Login')
    reset();
  }
  else if(data.msg=='Sign Up Successfully'){
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      
      textBody:data.msg,

    })
    setTimeout(()=>{

      navigation.navigate('Login',{})
    },1000)

    console.log(data)
    // navigation.navigate('Login')
    reset();
  }
  else{
    Toast.show({
      type: ALERT_TYPE.INFO,
      title: 'Success',
      
      textBody: data.msg,
    })
    console.log(data)
   


  }


    

  }
  useEffect(()=>{
    // Getdata()
    // console.log(data)
  },[])
  return (
    <>
{/* <index/> */}
<AlertNotificationRoot>
  <ScrollView>
  <LinearGradient
      // colors={['white', '#1D8DA3']}
          colors={['white', '#3fa9f5','white','#3fa9f5']}

      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{flex:1}}
    >


<View  style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:7,width:'100%',height:height,backgroundColor:'transparent'}}>
  <Text  style={{paddingVertical:20,fontWeight:'bold',color:'black',fontSize:70}}>{t('signup')}</Text>
{/* <-------------------Name section validation ----------------------------->*/}
    <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder={t('firstnamerror')}   onBlur={onBlur} onChangeText={onChange} value={value}  placeholderTextColor={'black'}
          style={{fontWeight:'bold',fontSize:15,color:'black',borderRadius:12,borderColor:'black',width:wp(90),borderWidth:2,paddingHorizontal:20}}
            />
        )}
        
        name="FirstName"
      />
      
       {errors.FirstName && <Text style={{color:'red'}}>*{errors.FirstName.message}.</Text>}
    <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder={t('lastnamerror')}  onBlur={onBlur} onChangeText={onChange} value={value}  placeholderTextColor={'black'}   style={{fontWeight:'bold',fontSize:15,color:'black',borderRadius:12,borderColor:'black',width:wp(90),borderWidth:2,paddingHorizontal:20}}/>
        )}
        name="LastName"
      />
      
       {errors.LastName && <Text style={{color:'red'}}>*{errors.LastName.message}.</Text>}
   {/* <-------------------email section validation ----------------------------->*/}

    <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput keyboardType="email-address"  onBlur={onBlur} onChangeText={onChange} value={value} placeholder={t('enteremail')}  placeholderTextColor={'black'}   style={{fontWeight:'bold',fontSize:15,color:'black',borderRadius:12,borderColor:'black',width:wp(90),borderWidth:2,paddingHorizontal:20}}/>
        )}
        name="email"
      />
      
       {errors.email && <Text style={{color:'red'}}>*{errors.email.message}</Text>}
   {/* <-------------------Password section validation ----------------------------->*/}

    <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder={t('enterpass')} secureTextEntry={true} onBlur={onBlur} onChangeText={onChange} value={value}   placeholderTextColor={'black'}   style={{fontWeight:'bold',fontSize:15,color:'black',borderRadius:12,borderColor:'black',width:wp(90),borderWidth:2,paddingHorizontal:20}}/>
        )}
        name="password"
      />
      
       {errors.password && <Text style={{color:'red'}}>*{errors.password.message}.</Text>}
   {/* <-------------------Contact section validation ----------------------------->*/}

    <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder={t('entercontact')} keyboardType="phone-pad" onBlur={onBlur} onChangeText={onChange} value={value} 
           placeholderTextColor={'black'}   style={{fontWeight:'bold',fontSize:15,color:'black',borderRadius:12,borderColor:'black',width:wp(90),borderWidth:2,paddingHorizontal:20}}/>
        )}
        name="contact"
      />
      
       {errors.contact && <Text style={{color:'red'}}>*{errors.contact.message}.</Text>}
    
    <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder={`${t('DOB')}:YY-MM-DD`} keyboardType="numeric"  onBlur={onBlur} onChangeText={onChange} value={value}  placeholderTextColor={'black'}   style={{fontWeight:'bold',fontSize:15,color:'black',borderRadius:12,borderColor:'black',width:wp(90),borderWidth:2,paddingHorizontal:20}}/>
        )}
        name="DOB"
      />
      
       {errors.DOB && <Text style={{color:'red'}}>*{errors.DOB.message}.</Text>}
    
   
   
      <Text style={{fontWeight:'bold',color:'black'}}>{t('alreadysignup')}?<Text
       onPress={()=>{ 
        //  alert("difjfdijj")
         Toast.show({
           type: ALERT_TYPE.SUCCESS,
           title: 'Registered',
           
           textBody: 'Congrats! SignUp Successfully',
          })
        }} style={{fontSize:20,textDecorationColor:'underline'}}><Link href={'/Login'}>{t('login')}</Link></Text></Text>
  
    <TouchableOpacity onPress={handleSubmit(onsubmit)}>
            <Text style={{fontSize:20,fontWeight:'bold',borderRadius:12,borderColor:'black',textAlign:'center',borderWidth:2,paddingVertical:5,paddingHorizontal:30,color:'black'}} className='text-2xl font-bold border-2 px-5 rounded-md'>{t('signup')}</Text>
          </TouchableOpacity>
</View>
</LinearGradient>

  </ScrollView>
   
</AlertNotificationRoot>

    {/* adding logic for home page */}
      
    </>
  )
}

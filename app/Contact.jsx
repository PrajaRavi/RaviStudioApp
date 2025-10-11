import Entypo from '@expo/vector-icons/Entypo';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import * as yup from "yup";
const {width,height}=Dimensions.get('window')
let   IP='10.205.8.23'
;

const schema = yup
  .object({
    name: yup.string().required('username is required').min(4,'username is too sort'),
    email: yup.string().email('Please Enter a valid email').required('email is required'),
    contact: yup.string().required('contact is required').min(10,'Enter a valid contact'),
    message:yup.string().required('message is required').min(10,'message is too short')
    
  })
export default function Contact() {
  let [globalcolor,setglobalcolor]=useState('black');
  const {t}=useTranslation()
  const navigaion=useNavigation()
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
      console.log(Data)
      reset()
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        
        textBody:'Data Submitted',
  
      })
    try {
      let {data}=await axios.post(`http://${IP}:4500/contact`,{
        name:Data.name,email:Data.email,contact:Data.contact,message:Data.message
      })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
    }
  return (
    <>
    <AlertNotificationRoot>

     {/* <View style={{backgroundColor:'#021b04',height:height}}> */}
   <LinearGradient
        //  colors={['white', '#1D8DA3']}
          colors={['white', '#3fa9f5','white','#3fa9f5']}

         start={{ x: 0, y: 0 }}
         end={{ x: 1, y: 1 }}
         style={{flex:1}}


       >
   
    <View style={{flex:1,position:'relative',paddingTop:20}}>
      <ScrollView >

      <TouchableOpacity onPress={()=>{
navigaion.goBack()

      }} style={{width:40,height:40,backgroundColor:'#3fa9f5',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:12,position:'absolute', left:30,top:20}}>
      <Entypo name="chevron-left" size={30} color={'black'} />
      </TouchableOpacity>
      

      
   {/* <-------------------Password section validation ----------------------------->*/}
   <View className="flex flex-col items-center justify-center gap-5 w-[100%] " style={{height,marginBottom:100}}>
     <Text className="font-bold " style={{fontSize:40,paddingVertical:0,textAlign:'center',color:globalcolor}}>{t('feelfreetocontact')}</Text>
   <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder="Name" placeholderTextColor={globalcolor} style={{borderColor:globalcolor}} onBlur={onBlur} onChangeText={onChange} value={value}   className="font-bold text-xl rounded-md border-2 border-black w-[80%]"/>
        )}
        name="name"
      />
      
       {errors.name && <Text className='text-red-800 font-bold'>*Name is required.</Text>}
       <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput keyboardType="email-address"  onBlur={onBlur} style={{borderColor:globalcolor}} placeholderTextColor={globalcolor} onChangeText={onChange} value={value} placeholder="Email" className="font-bold text-xl rounded-md border-2  w-[80%]"/>
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
          <TextInput placeholder="contact"  onBlur={onBlur} onChangeText={onChange} value={value} style={{borderColor:globalcolor}} placeholderTextColor={globalcolor} className="font-bold text-xl rounded-md border-2 border-black w-[80%]"/>
        )}
        name="contact"
      />
      
       {errors.contact && <Text className='text-red-800 font-bold'>*{errors.contact.message}.</Text>}
       {/* Handling messagebox */}
       <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder="message"  placeholderTextColor={globalcolor} style={{height:200,alignItems:'flex-start',justifyContent:'flex-start',textAlignVertical:'top',borderColor:globalcolor}} multiline={true}  onBlur={onBlur} onChangeText={onChange} value={value} className="font-bold text-xl rounded-md border-2 border-black w-[80%]"/>
        )}
        name="message"
      />
      
       {errors.message && <Text className='text-red-800 font-bold'>*{errors.message.message}.</Text>}
       <TouchableOpacity onPress={handleSubmit(onsubmit)}>
                   <Text style={{color:globalcolor,borderColor:globalcolor}} className='text-2xl font-bold border-2 px-5 rounded-md'>Submit</Text>
                 </TouchableOpacity>
</View>
      </ScrollView>
    </View>
    </LinearGradient>

    </AlertNotificationRoot>
    </>
  )
}

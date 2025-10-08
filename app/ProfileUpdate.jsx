import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppContext } from './Store';
import { ImageBackground } from 'expo-image';
const {width,height}=Dimensions.get('window')
let   IP='192.168.1.156';
export default function ProfileUpdate() {
  const {t}=useTranslation()
  let FirstName1=useRef()
  const navigation=useNavigation()
  const navigaion=useNavigation()
  const {IsLogin,userdata,setuserdata,setisLogin,BackgroundImage,setBackgroundImage}=useContext(AppContext)
  let [FirstName,setFirstName]=useState()
  let [LastName,setLastName]=useState()
  let [email,setemail]=useState()
 
  let [cont,setcont]=useState()
  let [DOB,setDOB]=useState()
  const {top}=useSafeAreaInsets();
      const paddingtop=top>0?30:top;
    
    useEffect(()=>{
  // alert(userdata)
  GetUserData()
  setFirstName(userdata.FirstName)
  setLastName(userdata.LastName)
  setemail(userdata.email)
  setcont(userdata.contact)
  // alert(userdata.contact)
  setDOB(userdata.DOB)
  // setpass()
    },[IsLogin,userdata])
    async function HandleSubmit(){
      try {
        
        let {data}=await axios.post(`http://${IP}:4500/UpdateProfile/${userdata.email}`,{
          FirstName,LastName,contact:cont,DOB,email
        })
        if(data.msg=='Profile updated successfully'){
          navigaion.navigate('index')
          Toast.show({
                   type: ALERT_TYPE.SUCCESS,
                   title: 'Success',
                   
                   textBody: data.msg,
                   
                 })
          // navigate('/')
          
        
        }
        else{
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: 'Warning',
            
            textBody: data.msg,
            
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    async function GetUserData(){
      // alert("Hello")
          let result = await SecureStore.getItemAsync('Token');
          if (result) {
            // alert(result);
            console.log(result)
            
      
          } else {
            alert('No values stored under that key.');
          }
      
          try {
            
            let {data}=await axios.post(`http://${IP}:4500/GetUserDataForApp`,{Token:result})
            // console.log(data)
            setuserdata(data)
            if(data.FirstName){
  
              setisLogin(true)
            }
           
          } catch (error) {
            console.log(error)
          }
  
  
        }
   useEffect(()=>{
GetUserData()
setFirstName(userdata.FirstName)
  setLastName(userdata.LastName)
  setemail(userdata.email)
  setcont(userdata.contact)
   },[])
  return (
    <>
<AlertNotificationRoot>
 {BackgroundImage==""? <LinearGradient
        // colors={['white', '#1D8DA3']}
          colors={['white', '#3fa9f5','white','#3fa9f5']}

        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{flex:1}}
      >
  
<View style={{flex:1,display:'flex',flexDirection:'column',paddingTop:paddingtop}}>
      <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingVertical:3,paddingHorizontal:3,borderColor:'black',borderBottomWidth:2}}>

      <TouchableOpacity onPress={()=>{
        navigaion.goBack()
        
      }} style={{width:40,height:40,backgroundColor:'black',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:12,}}>
      <Entypo name="chevron-left" size={30} color="white" />
      </TouchableOpacity>
   
      </View>
          <View className="flex flex-col items-center justify-center gap-3 w-[100%] h-[80%]">
    

      <TextInput placeholder={t('firstnamerror')}  value={FirstName} onChangeText={(text)=>{
        setFirstName(text)
      }} style={{borderColor:'black',borderWidth:2,fontSize:20,paddingHorizontal:40,borderRadius:23,width:width*0.8}}/>
      <TextInput placeholder={t('lastnamerror')} value={LastName} style={{borderColor:'black',borderWidth:2,fontSize:20,paddingHorizontal:40,borderRadius:23,width:width*0.8}} onChangeText={(text)=>{
        setLastName(text)
      }}/>
      <TextInput placeholder={t('emailreq')} multiline={true} textAlignVertical='start' style={{borderColor:'black',borderWidth:2,fontSize:20,paddingHorizontal:40,borderRadius:23,width:width*0.8}} value={email} onChangeText={(text)=>{
        setemail(text)
      }}/>
      <TextInput placeholder={t('dobreq')} value={DOB} onChangeText={(text)=>{
        setDOB(text)
      }} style={{borderColor:'black',borderWidth:2,fontSize:20,paddingHorizontal:40,borderRadius:23,width:width*0.8,}}/>
      <TextInput placeholder={t('contreq')} value={cont} onChangeText={(text)=>{
        setcont(text)
      }} style={{borderColor:'black',borderWidth:2,fontSize:20,paddingHorizontal:40,borderRadius:23,width:width*0.8}}/>
      <TouchableOpacity onPress={()=>{
       HandleSubmit()
     }}>
                <Text className='text-2xl font-bold border-2 px-10 py-2 rounded-2xl'>{t('submit')}</Text>
              </TouchableOpacity>
   </View>
      </View>
</LinearGradient>:
<ImageBackground source={{ uri: BackgroundImage }} style={{ flex: 1 }} >
  <View style={{flex:1,display:'flex',flexDirection:'column',paddingTop:paddingtop}}>
      <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingVertical:3,paddingHorizontal:3,borderColor:'black',borderBottomWidth:2}}>

      <TouchableOpacity onPress={()=>{
        navigaion.goBack()
        
      }} style={{width:40,height:40,backgroundColor:'black',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:12,}}>
      <Entypo name="chevron-left" size={30} color="white" />
      </TouchableOpacity>
   
      </View>
          <View className="flex flex-col items-center justify-center gap-3 w-[100%] h-[80%]">
    

      <TextInput placeholder={t('firstnamerror')}  value={FirstName} onChangeText={(text)=>{
        setFirstName(text)
      }} style={{borderColor:'black',borderWidth:2,fontSize:20,paddingHorizontal:40,borderRadius:23,width:width*0.8}}/>
      <TextInput placeholder={t('lastnamerror')} value={LastName} style={{borderColor:'black',borderWidth:2,fontSize:20,paddingHorizontal:40,borderRadius:23,width:width*0.8}} onChangeText={(text)=>{
        setLastName(text)
      }}/>
      <TextInput placeholder={t('emailreq')} multiline={true} textAlignVertical='start' style={{borderColor:'black',borderWidth:2,fontSize:20,paddingHorizontal:40,borderRadius:23,width:width*0.8}} value={email} onChangeText={(text)=>{
        setemail(text)
      }}/>
      <TextInput placeholder={t('dobreq')} value={DOB} onChangeText={(text)=>{
        setDOB(text)
      }} style={{borderColor:'black',borderWidth:2,fontSize:20,paddingHorizontal:40,borderRadius:23,width:width*0.8,}}/>
      <TextInput placeholder={t('contreq')} value={cont} onChangeText={(text)=>{
        setcont(text)
      }} style={{borderColor:'black',borderWidth:2,fontSize:20,paddingHorizontal:40,borderRadius:23,width:width*0.8}}/>
      <TouchableOpacity onPress={()=>{
       HandleSubmit()
     }}>
                <Text className='text-2xl font-bold border-2 px-10 py-2 rounded-2xl'>{t('submit')}</Text>
              </TouchableOpacity>
   </View>
      </View>

</ImageBackground>
}</AlertNotificationRoot>
      
    </>
  )
}

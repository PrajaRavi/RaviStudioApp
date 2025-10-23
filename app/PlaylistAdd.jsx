import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { AppContext } from './Store';
import { ImageBackground } from 'expo-image';
import { wp } from './helper';
const {width,height}=Dimensions.get('window');
let   IP='192.168.1.155'
;;

const PlaylistAdd = () => {
  const {IsLogin,setisLogin,BackgroundImage,setBackgroundImage}=useContext(AppContext)
  let [name,setname]=useState()
  
let [userdata,setuserdata]=useState()
let [globalcolor,setglobalcolor]=useState('black')
let [UserPlaylistData,setuserplaylistdata]=useState([])
const {t}=useTranslation()
 
  // formdata.append('title',title)
  // formdata.append('description',description)
  // formdata.append('PlaylistImage',playlistimage)


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    // let Data=ImagePicker.getMediaLibraryPermissionsAsync()
    try {
      
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      alert(result.assets[0].fileName)
      let formdata=new FormData()
      formdata.append('PlaylistImage',{
    uri:result.assets[0].uri,
    name:result.assets[0].fileName,
    type:result.assets[0].mimeType
  })
  formdata.append('PlaylistName',name)
  
  // console.log(result.assets[0].uri);
  // alert(userdata._id)
  let {data}=await axios.post(`http://${IP}:4500/UploadUserPlaylistData/${userdata._id}`,formdata,{
    headers:{
      "Content-Type":'multipart/form-data'
    }
  })
  console.log(data)
  // setname('')
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: 'Success',
    
    textBody: 'Playlist Added',
  })
  setisLogin(IsLogin)
  CollectUserPlaylistData()
  setname('')

  
  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
} catch (error) {
  console.log(error)
}
  };
  async function CollectUserPlaylistData(){
      axios.defaults.withCredentials=true;
      let Data=await axios.get(`http://${IP}:4500/GetUserPlaylistDataApp/${userdata.email}`)
      console.log(Data.data)
      setuserplaylistdata(Data.data)
    }
  async function SendData(){
    let data=await axios.post(`http://192.168.0.155:4500/UploadUserPlaylistData/${userdata._id}`,formdata,{
      headers:{
        "Content-Type":'multipart/form-data'
      }
    })
console.log(data)
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
    
    let {data}=await axios.post(`http://${IP}:4500/GetUserDataForApp`,{Token:result})
    console.log(data)
    setuserdata(data)
      }

      useEffect(()=>{
GetUserData()
      },[])
  return (
    <>
    <AlertNotificationRoot>
{BackgroundImage==""?<LinearGradient
      // colors={['white', '#1D8DA3']}
          colors={['white', '#3fa9f5','white','#3fa9f5']}

      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{flex:1}}
    >

    <View  style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14,width:'100%',height:height}}>
       
    <Text className='font-bold ' style={{fontSize:50,marginBottom:10,textAlign:'center',color:globalcolor}}>{t('addyourplaylist')}</Text>
    <TextInput placeholder={t('playlistname')} placeholderTextColor={globalcolor}   onChangeText={(text)=>setname(text)} value={name}    
          style={{fontWeight:'bold',fontSize:15,color:globalcolor,borderRadius:13,borderColor:globalcolor,width:wp(80),borderWidth:2,paddingHorizontal:20}}/>
    <TouchableOpacity placeholder="Select Cover Image"   onPress={pickImage} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:30,borderColor:'black',borderWidth:2,width:wp(80),borderRadius:13}} >
      

      <Text  style={{color:globalcolor,fontSize:20,paddingVertical:5}}>{t('choosefile')}</Text>
      <AntDesign name="upload" size={24} color={globalcolor} />
    
    </TouchableOpacity>
    {/* <Button title='Playlist Image' onPress={pickImage}/> */}
    {/* <TouchableOpacity onPress={SendData} >
               <Text className='text-2xl font-bold border-2 px-5 rounded-md'>Submit</Text>
             </TouchableOpacity> */}
    </View>
    </LinearGradient>:
    <ImageBackground source={{uri:BackgroundImage}} style={{flex:1}}>
 <View  style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14,width:'100%',height:height}}>
       
    <Text className='font-bold ' style={{fontSize:50,marginBottom:10,textAlign:'center',color:globalcolor}}>{t('addyourplaylist')}</Text>
    <TextInput placeholder={t('playlistname')} placeholderTextColor={globalcolor}   onChangeText={(text)=>setname(text)} value={name}    
          style={{fontWeight:'bold',fontSize:15,color:globalcolor,borderRadius:23,borderColor:globalcolor,width:width*0.8,borderWidth:2,paddingHorizontal:20}}/>
    <TouchableOpacity placeholder="Select Cover Image"   onPress={pickImage} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:30,borderColor:'black',borderWidth:2,width:wp(80),borderRadius:13}} >
      

      <Text  style={{color:globalcolor,fontSize:20,paddingVertical:5}}>{t('choosefile')}</Text>
      <AntDesign name="upload" size={24} color={globalcolor} />
    
    </TouchableOpacity>
    {/* <Button title='Playlist Image' onPress={pickImage}/> */}
    {/* <TouchableOpacity onPress={SendData} >
               <Text className='text-2xl font-bold border-2 px-5 rounded-md'>Submit</Text>
             </TouchableOpacity> */}
    </View>
   
    </ImageBackground>
    }
    </AlertNotificationRoot>
      
    </>
  )
}

export default PlaylistAdd
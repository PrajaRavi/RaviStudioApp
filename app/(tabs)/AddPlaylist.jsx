import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import React from "react";
import {  StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
// import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { AppContext } from '../Store';
import {hp, wp} from "../helper"
import { Image, ImageBackground } from 'expo-image';
import { useNavigation } from 'expo-router';
const {width,height}=Dimensions.get('window');
let   IP='192.168.1.155';;
export default function AddPlaylist() {
  const {IsLogin,setisLogin,para,ImageUrl,Artist,BackgroundImage,setBackgroundImage}=useContext(AppContext)
  let [name,setname]=useState()
  
let [userdata,setuserdata]=useState()
let [globalcolor,setglobalcolor]=useState('black')
let [UserPlaylistData,setuserplaylistdata]=useState([])
const {t}=useTranslation()
 const navigation=useNavigation();
 
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
        alert(ImageUrl)
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
      style={{flex:1,display:'flex',alignItems:'start',justifyContent:'start'}}
    >
 <View style={styles.container}>
      {/* Glassmorphic Card 1 */}
      <TouchableOpacity onPress={()=>{
              navigation.navigate('FavraitSong')

            }}   style={[styles.card,{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:5}]}>
          <Text style={styles.icon}>❤️</Text>
          {/* <Text style={styles.text}>Liked Songs</Text> */}
          <Text style={styles.menuText}>{t('Favourite')}</Text>
          
      </TouchableOpacity>

      {/* Glassmorphic Card 2 */}
      <TouchableOpacity activeOpacity={0.3}  style={styles.card}>
          <TouchableOpacity style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:5}}>

          <Text style={styles.icon}>🎵</Text>
          <Text style={styles.text}>Last Played</Text>
          
          </TouchableOpacity>
          <TouchableOpacity style={styles.card1}>
                <TouchableOpacity >
                  <Image source={ ImageUrl } style={styles.cover} />
                </TouchableOpacity>

                <View style={styles.info}>
                  <Text style={styles.title}>{String(para).length>25?(para).slice(0,25)+"..":para}</Text>
                  <Text style={styles.Artist}>{Artist}</Text>
                </View>

              </TouchableOpacity>
           
          </TouchableOpacity>

      {/* Glassmorphic Card 3 */}
      <TouchableOpacity onPress={()=>{
        navigation.navigate("PlaylistAdd")
      }} activeOpacity={0.3} style={[styles.card,{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:5}]}>
          <Text style={styles.icon}>➕</Text>
          <Text style={styles.text}>Add Your Playlist</Text>
      </TouchableOpacity>
    </View>
    {/* a view for showing ads */}
    <View style={{borderWidth:3,height:hp(45)}}>
      <Text>Showing adds</Text>

    </View>
       </LinearGradient>:<ImageBackground source={{ uri: BackgroundImage }} style={{ flex: 1 }} >
        <View style={styles.container}>
      {/* Glassmorphic Card 1 */}
      <TouchableOpacity onPress={()=>{
              navigation.navigate('FavraitSong')

            }}   style={[styles.card,{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:5}]}>
          <Text style={styles.icon}>❤️</Text>
          {/* <Text style={styles.text}>Liked Songs</Text> */}
          <Text style={styles.menuText}>{t('Favourite')}</Text>
          
      </TouchableOpacity>

      {/* Glassmorphic Card 2 */}
      <TouchableOpacity activeOpacity={0.3}  style={styles.card}>
          <TouchableOpacity style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:5}}>

          <Text style={styles.icon}>🎵</Text>
          <Text style={styles.text}>Last Played</Text>
          
          </TouchableOpacity>
          <TouchableOpacity style={styles.card1}>
                <TouchableOpacity >
                  <Image source={ ImageUrl } style={styles.cover} />
                </TouchableOpacity>

                <View style={styles.info}>
                  <Text style={styles.title}>{String(para).length>25?(para).slice(0,25)+"..":para}</Text>
                  <Text style={styles.Artist}>{Artist}</Text>
                </View>

              </TouchableOpacity>
           
          </TouchableOpacity>

      {/* Glassmorphic Card 3 */}
      <TouchableOpacity onPress={()=>{
        navigation.navigate("PlaylistAdd")
      }} activeOpacity={0.3} style={[styles.card,{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:5}]}>
          <Text style={styles.icon}>➕</Text>
          <Text style={styles.text}>Add Your Playlist</Text>
      </TouchableOpacity>
    </View>
    {/* a view for showing ads */}
    <View style={{borderWidth:3,height:hp(45)}}>
      <Text>Showing adds</Text>

    </View>
 
        </ImageBackground>}

    </AlertNotificationRoot>
      
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "colum",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    paddingVertical:40,
    gap:20,
  },
  card: {
    width:wp(90) ,
    paddingVertical:10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth:1,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column'


  },
  blur: {
    paddingVertical: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  icon: {
    fontSize: 20,
    marginBottom: 6,
  },
  text: {
    color: "#000",
    fontWeight: "600",
    fontSize: 14,
  },
    card1: {
    flexDirection: "row",
    alignItems: "center",
    gap:15,
    padding: 10,
    width:wp(84),
    marginBottom: 12,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
  },
  cover: { width: 60, height: 60, borderRadius: 6 },

});
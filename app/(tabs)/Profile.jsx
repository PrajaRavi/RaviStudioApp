// import { Entypo, FontAwesome5 } from '@expo/vector-icons';
// import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';
// import * as SecureStore from 'expo-secure-store';
// import { useCallback, useEffect, useState } from 'react';
// import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
// import '../../global.css';
// import { hp } from '../helper';
// // import {} from 'react-icon-library'
// // import useUser from '@clerk/clerk-expo'
// let firstrender=true
// let {width,height}=Dimensions.get('window')

// import {
//     BottomSheetModal,
//     BottomSheetModalProvider,
//     BottomSheetView,
// } from '@gorhom/bottom-sheet';
// import { useNavigation } from 'expo-router';
// import { useContext, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import { StyleSheet } from 'react-native';
// import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { AppContext } from '../Store';
// let IP='192.168.0.155';;


// export default function Profile() {
//   const {IsLogin,setisLogin,sound,userdata,setuserdata}=useContext(AppContext)
//   const {t,i18n}=useTranslation()
// const navigation=useNavigation()
// let [BarActive,setBA]=useState(true)
//   // const { user } = useUser()
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,

      
//       justifyContent: 'center',
//       backgroundColor: 'transparent',
//     },
//     contentContainer: {
//       flex: 1,
//       alignItems: 'center',
//       paddingBottom:130,
//       display:'flex',
//       flexDirection:'column',
//       gap:10,
//     },
//   });
  
// //  let [userdata,setuserdata]=useState()
    const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

  let formdata=new FormData()
  formdata.append('Profile',{
    uri:result.assets[0].uri,
    name:result.assets[0].fileName,
    type:result.assets[0].mimeType
  })
    // console.log(result.assets[0].uri);
    // alert(userdata.email)
    try {
      let email=await SecureStore.getItemAsync('useremail')
      let {data}=await axios.post(`http://${IP}:4500/SearchApiForAddDPApp/${email}`,formdata,{
        headers:{
          "Content-Type":'multipart/form-data'
        }
      })
      console.log(data)
     
    } catch (error) {
      console.log(error)
    }

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
//   const bottomSheetModalRef = useRef();

//   // callbacks
//   const handlePresentModalPress = useCallback(() => {
//     bottomSheetModalRef.current?.present();
//   }, []);
//   const handleCloseModalPress = useCallback(() => {
//     bottomSheetModalRef.current?.close();
//   }, []);
//   const handleSheetChanges = useCallback((index) => {
//     console.log('handleSheetChanges', index);
//     if(index=='-1'){
//       // alert('idjff')
//       setBA(true)
//     }
//   }, []);
  
//   async function HandleSignOut(){
//     setisLogin(false)
//     i18n.changeLanguage('en')
   
//     Toast.show({
//             type: ALERT_TYPE.SUCCESS,
//             title: 'Success',
            
//             textBody: 'SignOut successfully',
      
//           })
//           setuserdata([])
          
//      let data=await SecureStore.deleteItemAsync('useremail')
//      await sound.pauseAsync()
//      await sound.unloadAsync()
//   //  console.log(data)
 
 
//   }
//   async function GetUserData(){
    
//       let email=await SecureStore.getItemAsync('useremail')
//         let {data}=await axios.get(`http://${IP}:4500/GetUserData/${email}`)
//           console.log(data.FirstName)
//           setuserdata(data);
          
//   }
//   useEffect(()=>{
//     alert('profile')
//     GetUserData();
//     // console.log(userdata)
    
//    },[])
// //  alert("idfjdifjj")
  
//   return (
//     <>
//     <AlertNotificationRoot>

//     <GestureHandlerRootView style={styles.container}>
    
//    {userdata ?<View style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14,width:'100%',backgroundColor:'#021b04',height:hp(100)}}>
//    <View className='w-[100%] flex flex-row items-center justify-between absolute top-0 py-4' style={{paddingHorizontal:10,width:width,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',position:'absolute',top:20}}>

  
//   <Text style={{color:'white',textAlign:'center',fontSize:30}} className="font-bold text-3xl ">{t('Profile')}

//   </Text>
//   <TouchableOpacity onPress={()=>{
//     if(BarActive==true){

//       handlePresentModalPress()
//       setBA(false)
//     }
//     else{
//       handleCloseModalPress()
//       setBA(true)

//     }
//   }}>

//   {BarActive?<FontAwesome5 name="bars" size={30} color="white" />: <Entypo name="circle-with-cross" size={35} color="white" />}
 
//   </TouchableOpacity>
//    </View>
// <TouchableOpacity onPress={pickImage} style={{backgroundImage:'./react-logo.png'}}>

//           {userdata.FirstName?<Image  source={{uri:`http://${IP}:4500/${userdata.Profile}`}} style={{width:width*0.5,height:height*0.25,borderRadius:24,borderWidth:2,borderColor:'white'}}/>:<Image  source={{uri:`http://${IP}:4500/camra.jpg`}} style={{width:width*0.5,height:height*0.25,borderRadius:24,borderWidth:2,borderColor:'white'}}/>}
          
// </TouchableOpacity>
//       <View style={{display:'flex',flexDirection:'column',marginTop:20}}>

//     <Text className='font-bold text-white' style={{fontSize:20,color:'white'}}>1.{t('username')}:{userdata?userdata.FirstName:null}</Text>
//     <Text className='font-bold' style={{fontSize:18,color:'white'}}>2.{t('useremail')}:{userdata.email?((userdata.email).length>20?(userdata.email).slice(0,20)+'...':userdata.email):null}</Text>
//     <Text className='font-bold' style={{fontSize:18,color:'white'}}>3.{t('contact')}:{userdata?userdata.contact:null}</Text>
//     <TouchableOpacity onPress={()=>{
//       navigation.navigate('ProfileUpdate')
//     }}  style={{borderWidth:2,borderColor:'white',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',marginTop:10,}}>
//       <Text  className='text-white font-bold text-3xl ' style={{fontSize:20,color:'white'}} >{t('updateprofile')}</Text>
//     </TouchableOpacity >
//     <TouchableOpacity onPress={HandleSignOut} style={{borderWidth:2,borderColor:'white',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',marginTop:10,}}>
//       <Text className='text-white font-bold text-3xl ' style={{fontSize:20,color:'white'}}>{t('log')}</Text>
//     </TouchableOpacity>
//       </View>


//     </View>:null}
// {/* <SignOutButton/> */}

//         <BottomSheetModalProvider>
         
//           <BottomSheetModal
//             ref={bottomSheetModalRef}
//             onChange={handleSheetChanges}
//           >
//             <BottomSheetView style={styles.contentContainer}>
//              <TouchableOpacity onPress={()=>{
//            navigation.navigate('Contact')
//              }}>
//               <Text className='border-2 border-black px-5 py-1  rounded-xl text-2xl font-bold'>{t('contact')}</Text>
//              </TouchableOpacity>
//              <TouchableOpacity onPress={()=>{
//               navigation.navigate('FavraitSong')
//              }}>
//              <Text className='border-2 border-black px-5 py-1 rounded-xl text-2xl font-bold'>{t('Favourite')}</Text>

//              </TouchableOpacity>
//              <TouchableOpacity onPress={()=>{
//               navigation.navigate('DownloadSong')
//              }}>
//              <Text className='border-2 border-black px-5 py-1  rounded-xl text-2xl font-bold'>{t('downloadedsong')}</Text>

//              </TouchableOpacity>
           
//             </BottomSheetView>
//         </BottomSheetModal>
//         </BottomSheetModalProvider>
//     </GestureHandlerRootView>
//     </AlertNotificationRoot>

//     </>
//   )
// }

import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hp, wp } from "../helper";
import { AppContext } from "../Store";
let IP='192.168.1.156';;

export default function Profile() {

  const {t,i18n}=useTranslation();
  const [menuVisible, setMenuVisible] = useState(false);
  const {IsLogin,setisLogin,sound,userdata,setuserdata}=useContext(AppContext)
const [userdp,setuserdp]=useState(userdata.Profile)
const {top}=useSafeAreaInsets();
const paddingtop=top>0?15:top;
const navigation=useNavigation();
async function DeleteSecureKey(key){
  let data=await SecureStore.deleteItemAsync(key)
}

const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
// alert(result.assets[0].uri+"uri")
  let formdata=new FormData()
  formdata.append('Profile',{
    uri:result.assets[0].uri,
    name:result.assets[0].fileName,
    type:result.assets[0].mimeType
  })
  setuserdp(result.assets[0].uri)
    // console.log(result.assets[0].uri);
    // alert(userdata.email)
    try {
          let data1=await SecureStore.getItemAsync('user')
          let email=JSON.parse(data1).email
          let {data}=await axios.post(`http://${IP}:4500/SearchApiForAddDPApp/${email}`,formdata,{
        headers:{
          "Content-Type":'multipart/form-data'
        }
      })
      console.log(data)
     
    } catch (error) {
      console.log(error)
    }

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
 async function HandleSignOut(){
    setisLogin(false)
    i18n.changeLanguage('en')
   setTimeout(()=>{

     Toast.show({
       type: ALERT_TYPE.SUCCESS,
       title: 'Success',
       
       textBody: 'SignOut successfully',
       
      })
    },1000)
    DeleteSecureKey("useremail")
          setuserdata([])
          
     let data=await SecureStore.deleteItemAsync('useremail')
     navigation.navigate("Home")
     await sound.pauseAsync()
     await sound.unloadAsync()
  //  console.log(data)
 
 
  }
  useEffect(()=>{
    // alert("Profile")
    setuserdp(userdata.Profile)
  })
  return (
    <AlertNotificationRoot>
  <LinearGradient
        // colors={['white', '#1D8DA3']}
          colors={['white', '#3fa9f5','white','#3fa9f5']}

        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{flex:1}}
      >

    <View style={[styles.container,{paddingTop:paddingtop+30}]}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>Profile</Text>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      IP='192.168.1.155'

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image
          source={String(userdp).includes("file:///")?{ uri:userdp }:{uri:`http://${IP}:4500/${userdata.Profile}`}}
          style={styles.userImage}
        />
        
        <AntDesign onPress={()=>{
          pickImage()
        }} style={{position:'absolute',top:hp(10),right:wp(35)}} name="camera" size={34} color="black" />
        {/* <input type="file" name="file" id="file" /> */}
        <Text style={styles.userName}>{userdata.FirstName+" "+userdata.LastName}</Text>
        <Text style={styles.userEmail}>{userdata.email}</Text>
        <Text style={styles.userPhone}>+91 {userdata.contact}</Text>
      </View>

      {/* Info Section */}
      <View style={styles.infoBox}>
        <Ionicons name="location-outline" size={20} color="#2196f3" />
        <Text style={styles.infoText}>Mumbai, India</Text>
      </View>
      <View style={styles.infoBox}>
        <Ionicons name="calendar-outline" size={20} color="#2196f3" />
        <Text style={styles.infoText}>Joined: Jan 2025</Text>
      </View>

      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={()=>{
              navigation.navigate('Contact')

            }} style={styles.menuItem}>
              <Feather name="phone" size={24} color="black" />
              <Text style={styles.menuText}>{t('contact')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              navigation.navigate('DownloadSong')


            }} style={styles.menuItem}>
              <AntDesign name="download" size={24} color="black" />
              <Text style={styles.menuText}>{t('downloadsong')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              navigation.navigate('FavraitSong')

            }} style={styles.menuItem}>
              <AntDesign name="heart" size={24} color="red" />
              <Text style={styles.menuText}>{t('Favourite')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
      navigation.navigate('ProfileUpdate')

            }} style={styles.menuItem}>
              <Ionicons name="person-outline" size={22} color="#2196f3" />
              <Text style={styles.menuText}>{t("updateprofile")}</Text>
            </TouchableOpacity> 
            <TouchableOpacity onPress={()=>{
              HandleSignOut()
            }} style={styles.menuItem}>
              <Ionicons name="log-out-outline" size={22} color="#f44336" />
              <Text style={[styles.menuText, { color: "#f44336" }]}>
                {t("log")}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
    </LinearGradient>
    </AlertNotificationRoot>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, },

  // Navbar
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2196f3",
    paddingVertical: 14,
    paddingHorizontal: 16,
    width:wp(90),
    marginHorizontal:'auto',
    elevation: 4,
  },
  navTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },

  // Profile Card
  profileCard: {
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "#2196f3",
  },
  userName: { fontSize: 22, fontWeight: "bold", color: "#333" },
  userEmail: { fontSize: 16, color: "#666", marginTop: 4 },
  userPhone: { fontSize: 16, color: "#666", marginTop: 2 },

  // Info boxes
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 2,
  },
  infoText: { fontSize: 16, marginLeft: 8, color: "#444" },

  // Menu modal
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  menuContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  menuText: {
    fontSize: 18,
    marginLeft: 12,
    color: "#333",
  },
});

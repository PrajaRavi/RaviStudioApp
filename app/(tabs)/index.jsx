import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { useColorScheme } from 'react-native';
 import { GestureHandlerRootView } from 'react-native-gesture-handler';

import '../../global.css';
let email;

import { DeviceDetect } from '../utils/DeviceDetect';
// import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';
import * as ScreenCapture from 'expo-screen-capture';
import * as SecureStore from 'expo-secure-store';
import * as Speech from 'expo-speech';
import { useContext } from 'react';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "../../Services/i18next";
import { DropImage } from '../DropShape';
import { AppContext } from '../Store';
let {width,height}=Dimensions.get('window')
// import { useTranslation } from 'react-i18next';
import { useTranslation } from "react-i18next";
import { hp } from "../helper";
import RiverBackground from '../theme/RiverTheme';
import { isUserOnline } from "../utils/Internate";
let firstrender=true
let   IP='192.168.1.155'

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    color:'black'
  },
  container: {
    flex: 1,
    color:'black',
    paddingTop: 20,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  section: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 15,
    marginBottom: 10,
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    // textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  horizontalScrollView: {
    paddingHorizontal: 10,

  },
  singerItem: {
    alignItems: 'center',
    marginHorizontal: -10,
    // width: width * 0.25,
  },
  singerImage: {
    // width: 120,
    // height: 120,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#000',
  },
  
  singerName: {
    color: '#000',
    marginTop: 5,
    textAlign: 'center',
    fontSize: 3,
    fontWeight: 'bold',
  },
  playlistItem: {
    alignItems: 'center',
    marginHorizontal: -10,
    // width: width * 0.4,
  },
  playlistImage: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#000',
  },
  playlistName: {
    color: '#000',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 3,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginTop: 20,
    borderRadius: 15,
    marginHorizontal: 10,
    marginLeft:30,
    marginBottom:80,
  },
  footerText: {
    color: '#000',
    fontSize: 3,
    fontWeight: '500',
    marginBottom: 3,
  },
});


export default function Index() {
  // const {t,i18n}=useTranslation()
  const {t,i18n}=useTranslation()
  const {top,bottom}=useSafeAreaInsets();
  const paddingtop=top>0?10:top;
  const {IsLogin,setisLogin,IsSelectedLang,setIsSeletedLang,setWantToStopMusic,UserPlaylistData,setuserplaylistdata,userdata,setuserdata,ActiveReveiwPage,setShowMP,IconSize,setIconSize,trigger,settrigger}=useContext(AppContext)
  const navigation=useNavigation()
  let [singerdata,setsingerdata]=useState([])
let [playlistdata,setplaylistdata]=useState([])
// let [userdata,setuserdata]=useState([])

let [light,setlight]=useState(true)
let [IsModal,setIsModal]=useState(false)
let [globalcolor,setglobalcolor]=useState('white');
let [Iconsize1,setIconSize1]=useState(IconSize)
let [searchplaylistdata,setsearchplaylistdata]=useState([])
// let [UserPlaylistData,setuserplaylistdata]=useState()
let [langcode,setlangcode]=useState()
let [internate,setinternate]=useState();
let [ShowAI,setShowAI]=useState(false);
let [lang,setlang]=useState([
    
    {
        "name": "Hindi",
        "nativeName": "हिन्दी, हिंदी",
        "code": "hi"
    },
    {
        "name": "English",
        "nativeName": "हिन्दी, हिंदी",
        "code": "en"
    },
    {
        "name": "Bengali",
        "nativeName": "বাংলা",
        "code": "bn"
    },
    {
        "name": "Marathi (Marāṭhī)",
        "nativeName": "मराठी",
        "code": "Mr"
    },
    {
        "name": "Telugu",
        "nativeName": "తెలుగు",
        "code": "te"
    },
    {
        "name": "Gujarati",
        "nativeName": "ગુજરાતી",
        "code": "gu"
    },
    {
        "name": "Urdu",
        "nativeName": "اردو",
        "code": "ur"
    },
    {
        "name": "Kannada",
        "nativeName": "ಕನ್ನಡ",
        "code": "kn"
    },
    {
        "name": "Oriya",
        "nativeName": "ଓଡ଼ିଆ",
        "code": "or"
    },
    {
        "name": "Malayalam",
        "nativeName": "മലയാളം",
        "code": "ml"
    },
    {
        "name": "Panjabi, Punjabi",
        "nativeName": "ਪੰਜਾਬੀ, پنجابی‎",
        "code": "pa"
    },
    {
        "name": "Assamese",
        "nativeName": "অসমীয়া",
        "code": "as"
    },
    {
        "name": "Bihari",
        "nativeName": "भोजपुरी",
        "code": "bh"
    },
  
    {
        "name": "Nepali",
        "nativeName": "नेपाली",
        "code": "ne"
    },
    {
        "name": "Sindhi",
        "nativeName": "सिन्धी, سنڌي، سندھی‎",
        "code": "sd"
    },
    {
        "name": "Tamil",
        "nativeName": "தமிழ்",
        "code": "ta"
    },
   
    {
        "name": "Santali",
        "nativeName": "Santali",
        "code": "sat"
    },
    {
        "name": "Maithili",
        "nativeName": "मैथिली",
        "code": "mai"
    },
    {
        "name": "Dogri",
        "nativeName": "डोगरी,ڈوگری",
        "code": "doi"
    },
    {
        "name": "Manipuri",
        "nativeName": "Meitei",
        "code": "mni"
    },
    
  ])

   async function IsUserOnline(){
  let data=await isUserOnline();
  // alert(data+"online")
  if(data==true) setinternate(true)
    else setinternate(false)

 }

  const activate = async () => {
    await ScreenCapture.preventScreenCaptureAsync();
  };
const speak = () => {
    const thingToSay = 'Hello My name is Ravi Prajapati';
    Speech.speak(thingToSay);
  };
  async function GetSingerData(){
  let {data}=await axios.get(`http://${IP}:4500/GetSingerData`)
    setsingerdata(data)
    
  }
  async function RefreshToken(){
        let data1=await SecureStore.getItemAsync('user')
              if(!data1){
                return
              }
               email=JSON.parse(data1).email
          
 if(email){
axios.defaults.withCredentials=true;
   let {data}=await axios.get(`http://${IP}:4500/refresh/${email}`,{withCredentials:true}).catch(err=>console.log(err.message))
  
  //  setisLogin(true)
  //  setuserdata(data)
             }

  }
  async function GetPlaylistData(){
    let {data}=await axios.get(`http://${IP}:4500/GetPlaylistData`)
    console.log(data)
    setplaylistdata(data)
    
  }
  async function CollectPlaylistData(name) {
    let {data}=await axios.get(`http://${IP}:4500/getplaylistdatafromsearch/${name}`)
    setsearchplaylistdata(data)
  }
  async function GetUserData(){
let data1=await SecureStore.getItemAsync('user')
              if(!data1){
                return
              }
               email=JSON.parse(data1).email
        let Data=await axios.get(`http://${IP}:4500/GetUserPlaylistDataApp/${userdata?.email}`)
    // console.log(Data.data)
    setuserplaylistdata(Data.data)
  }
  async function HandleSongPageShift(playlistname){
    settrigger(false)
    // alert(playlistname)
  if(userdata?.FirstName){

    let {data}=await axios.get(`http://${IP}:4500/getplaylistdatafromsearch/${playlistname}`)
    
    // console.log(data)
    navigation.navigate('ShowSong',data)
  } 
  else{

 alert("Please Login First")         
  } 

  }
async function HandleUserSongPageShift(userplaylistname){
  console.log(UserPlaylistData)
  let data=UserPlaylistData.filter((item)=>{
    return item.playlistname==userplaylistname

  })
  navigation.navigate('ShowSongUserPlaylist',data)

}

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      alert(result);
      return result

    } else {
      alert('No values stored under that key.');
    }
  }
  
    
    

 
  async function GenrateTokenOnComingOnHomePage(){
    let data1=await SecureStore.getItemAsync('user')
              if(!data1){
                return
              }
               email=JSON.parse(data1).email
        
      if(email!=''){

        try {
          
          let {data}=await axios.post(`http://${IP}:4500/GenrateTokenOnComingOnHomePage`,{email
    
          })
          console.log(data)
          console.log("token genrated")
        } catch (error) {
          console.log(error)
        }
        
      }
    }

// use this function to manipulate the securestore
  async function DeleteToken(){
let data=await SecureStore.deleteItemAsync('Token');
  }
  useEffect(()=>{
    // CollectPlaylistData();
    let myinterval=setInterval(()=>{

      IsUserOnline();
    },1000)
    setTimeout(()=>{
      i18n.changeLanguage("hi")
      // alert("hello")
      return (()=>clearInterval(myinterval))
})

GenrateTokenOnComingOnHomePage();
  
      activate()
      GetUserData()
      GetSingerData()
      GetPlaylistData()
      let Intarval=setInterval(()=>{
        RefreshToken()
        // GenrateTokenOnComingOnHomePage
        // alert('refresh')
      },2000)
      
      return ()=>{clearInterval(Intarval)}
    
  },[])
  
  async function HandleChangeLang(){
    setIsModal(!IsModal)
  }
  async function HandleSelectLang(code){
    setlangcode(code)
// setIsModal(!IsModal)
setIsSeletedLang(code)

  }
  async function HandleOK(){
    // alert(langcode)
    try {
      let {data}=await axios.post(`http://${IP}:4500/updateuserlang/${userdata.email}`,{language:langcode})
      
      console.log(data)
      i18n.changeLanguage(langcode)
      setIsModal(false)
     
  } catch (error) {
      console.log(error)
  }

  }

  // this useffect for WantToStopMusic page
  // useEffect(()=>{
  //   if(firstrender==false){

  //     let interval=setInterval(() => {
  //       if(trigger==true){
  //     alert("chala")
  //         setWantToStopMusic(true)
  //       }
  //     }, 500);
  //     return ()=>clearInterval(interval)
  //   }
  //   firstrender=false;

  // },[trigger])
  useEffect(()=>{   
// alert(IconSize+"size")
    setIconSize1(IconSize)
  },[IconSize])

  return (
    <>

<GestureHandlerRootView>

<AlertNotificationRoot>

<RiverBackground>
   <StatusBar  hidden={true} />
      {/* <LinearGradient
      colors={['white', '#1D8DA3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    > */}

{internate==true?   <ScrollView  showsVerticalScrollIndicator={false}  style={{backgroundColor:'transparent',borderColor:'red',height:hp(100),position:'fixed',top:0,left:-10,marginTop:paddingtop}}>
<View className="text-white" style={{backgroundColor:'transparent',marginTop:paddingtop}}>

{/* Handling navbar section */}
 <View style={styles.navbar}>
           <Text style={styles.appName}>Music Hub</Text>
           <TouchableOpacity onPress={() => {
            // pushMusicNotification("Hello I am Ravi Prajapati")
            navigation.navigate("LanguageSelect",{data:"Ravi Prajapati"})
         
          setShowMP(false)
          }}>
             <FontAwesome name="language" style={{cursor:'pointer'}} size={24} color="#000" />
           </TouchableOpacity>
         </View>

{/* singer section */}
<View style={styles.section} >
<Text style={styles.sectionTitle}>{t('artist')}</Text>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollView}>
               {singerdata.map((singer,index) => (
                <TouchableOpacity key={index} style={styles.singerItem}>

                   <DropImage key={index} size={Iconsize1} src={`http://${IP}:4500/${singer.singerimage}`}/>
                   
                   <Text style={IconSize==120?[styles.singerName,{fontSize:13}]:[styles.singerName,{fontSize:15}]}>{singer.name}</Text>
                 </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

 {/* All Playlists Section */}
           <View style={[styles.section,{}]}>
             <Text style={styles.sectionTitle}>{t('popularplaylist')}</Text>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollView}>
               {playlistdata.map((playlist,index) => (
                <TouchableOpacity onPress={()=>{
                  HandleSongPageShift(playlist.name)
                }} key={index} style={styles.playlistItem}>
                  {/* <Image source={{ uri: `http://${IP}:4500/${playlist.playlistimage}` }} style={styles.playlistImage} /> */}
                <DropImage key={index} size={Iconsize1}  src={`http://${IP}:4500/${playlist.playlistimage}`}/>

                  <Text style={IconSize==120?[styles.singerName,{fontSize:13}]:[styles.singerName,{fontSize:15}]}>{playlist.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
           <View style={[styles.section,{}]}>
             <Text style={styles.sectionTitle}>{t('popularplaylist')}</Text>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollView}>
               {playlistdata.map((playlist,index) => (
                <TouchableOpacity onPress={()=>{
                  HandleSongPageShift(playlist.name)
                }} key={index} style={styles.playlistItem}>
                  {/* <Image source={{ uri: `http://${IP}:4500/${playlist.playlistimage}` }} style={styles.playlistImage} /> */}
                <DropImage key={index} size={Iconsize1}  src={`http://${IP}:4500/${playlist.playlistimage}`}/>

                  <Text style={IconSize==120?[styles.singerName,{fontSize:13}]:[styles.singerName,{fontSize:15}]}>{playlist.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
           {UserPlaylistData.length>0?<View style={[styles.section,{}]}>
             <Text style={styles.sectionTitle}>{t('myplaylist')}</Text>

             <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollView}>
              {UserPlaylistData.map((playlist,index) => (
                <TouchableOpacity onPress={()=>{
                  alert(playlist.name)
                  HandleSongPageShift(playlist.name)
                }} key={index} style={styles.playlistItem}>
                  {/* <Image source={{ uri: `http://${IP}:4500/${playlist.playlistimage}` }} style={styles.playlistImage} /> */}
                <DropImage key={index} size={Iconsize1}  src={`http://${IP}:4500/${playlist.playlistimage}`}/>

                  <Text style={IconSize==120?[styles.singerName,{fontSize:13}]:[styles.singerName,{fontSize:15}]}>{playlist.playlistname}</Text>
                </TouchableOpacity>
              ))}
                         </ScrollView>
          </View>:null}
           

{/* Footer Section */}
           <View style={styles.footer}>
             <Text style={IconSize==120?[styles.singerName,{fontSize:13}]:[styles.singerName,{fontSize:14}]}>© 2024 Music Hub. All rights reserved.</Text>
             <Text style={IconSize==120?[styles.singerName,{fontSize:13}]:[styles.singerName,{fontSize:14}]}>Made with ❤️</Text>
           </View>
</View>

</ScrollView>:<View>
  <Text style={{fontWeight:500,fontSize:40}}>You are offline</Text>
  <ActivityIndicator color={'black'} size={40}/>
  <Link href={'DownloadSong'}><Text style={{textAlign:'center',fontSize:40,cursor:'pointer'}}>Go to download</Text></Link>
</View>
}
      
  </RiverBackground> 
</AlertNotificationRoot>

</GestureHandlerRootView>




    </>
  )
}

// index.js

// import React from 'react';
// import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, SafeAreaView, Dimensions, StatusBar } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { FontAwesome } from '@expo/vector-icons';

// const { width } = Dimensions.get('window');

// // Sample data for singers and playlists
// const singers = [
//   { id: '1', name: 'Arijit Singh', image: 'https://placehold.co/100x100/A31D1D/ffffff?text=Singer' },
//   { id: '2', name: 'Shreya Ghoshal', image: 'https://placehold.co/100x100/1D8DA3/ffffff?text=Singer' },
//   { id: '3', name: 'Sonu Nigam', image: 'https://placehold.co/100x100/A31D1D/ffffff?text=Singer' },
//   { id: '4', name: 'Lata Mangeshkar', image: 'https://placehold.co/100x100/1D8DA3/ffffff?text=Singer' },
//   { id: '5', name: 'Kishore Kumar', image: 'https://placehold.co/100x100/A31D1D/ffffff?text=Singer' },
//   { id: '6', name: 'Jubin Nautiyal', image: 'https://placehold.co/100x100/1D8DA3/ffffff?text=Singer' },
// ];

// const playlists = [
//   { id: 'p1', name: 'Bollywood Hits', image: 'https://placehold.co/150x150/A31D1D/ffffff?text=Playlist' },
//   { id: 'p2', name: 'Romantic Anthems', image: 'https://placehold.co/150x150/1D8DA3/ffffff?text=Playlist' },
//   { id: 'p3', name: 'Party Mix', image: 'https://placehold.co/150x150/A31D1D/ffffff?text=Playlist' },
//   { id: 'p4', name: 'Workout Jams', image: 'https://placehold.co/150x150/1D8DA3/ffffff?text=Playlist' },
//   { id: 'p5', name: 'Indie Vibes', image: 'https://placehold.co/150x150/A31D1D/ffffff?text=Playlist' },
//   { id: 'p6', name: 'Relaxing Instrumentals', image: 'https://placehold.co/150x150/1D8DA3/ffffff?text=Playlist' },
// ];

// const index = () => {
//   return (
//     <>

//     <StatusBar hidden={true}/>
//     <LinearGradient
//       colors={['white', '#1D8DA3']}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//       style={styles.gradient}
//     >
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.navbar}>
//           <Text style={styles.appName}>Music Hub</Text>
//           <TouchableOpacity onPress={() => console.log('Change language pressed')}>
//             <FontAwesome name="language" size={24} color="#000" />
//           </TouchableOpacity>
//         </View>

//         <ScrollView style={styles.container}>
//           {/* All Singers Section */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>All Singers</Text>
//             <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollView}>
//               {singers.map(singer => (
//                 <TouchableOpacity key={singer.id} style={styles.singerItem}>
//                   <Image source={{ uri: singer.image }} style={styles.singerImage} />
//                   <Text style={styles.singerName}>{singer.name}</Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>

//           {/* All Playlists Section */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>All Playlists</Text>
//             <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollView}>
//               {playlists.map(playlist => (
//                 <TouchableOpacity key={playlist.id} style={styles.playlistItem}>
//                   <Image source={{ uri: playlist.image }} style={styles.playlistImage} />
//                   <Text style={styles.playlistName}>{playlist.name}</Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>

//           {/* Footer Section */}
//           <View style={styles.footer}>
//             <Text style={styles.footerText}>© 2024 Music Hub. All rights reserved.</Text>
//             <Text style={styles.footerText}>Made with ❤️</Text>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </LinearGradient>
//     </>

//   );
// };

// const styles = StyleSheet.create({
//   gradient: {
//     flex: 1,
//   },
//   safeArea: {
//     flex: 1,
//     color:'black'
//   },
//   container: {
//     flex: 1,
//     color:'black',
//     paddingTop: 20,
//   },
//   navbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: 'black',
//   },
//   appName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   section: {
//     marginBottom: 30,
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: 'black',
//     marginLeft: 15,
//     marginBottom: 10,
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: { width: -1, height: 1 },
//     textShadowRadius: 5,
//   },
//   horizontalScrollView: {
//     paddingHorizontal: 10,
//   },
//   singerItem: {
//     alignItems: 'center',
//     marginHorizontal: 8,
//     width: width * 0.25,
//   },
//   singerImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     borderWidth: 3,
//     borderColor: '#000',
//   },
//   singerName: {
//     color: '#000',
//     marginTop: 5,
//     textAlign: 'center',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   playlistItem: {
//     alignItems: 'center',
//     marginHorizontal: 8,
//     width: width * 0.4,
//   },
//   playlistImage: {
//     width: width * 0.35,
//     height: width * 0.35,
//     borderRadius: 12,
//     borderWidth: 3,
//     borderColor: '#000',
//   },
//   playlistName: {
//     color: '#000',
//     marginTop: 8,
//     textAlign: 'center',
//     fontWeight: '700',
//     fontSize: 16,
//   },
//   footer: {
//     alignItems: 'center',
//     paddingVertical: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.2)',
//     marginTop: 20,
//     borderRadius: 15,
//     marginHorizontal: 15,
//   },
//   footerText: {
//     color: '#000',
//     fontSize: 15,
//     fontWeight: '500',
//     marginBottom: 3,
//   },
// });

// export default index;

// nvabar
// {<View className='mx-2 text-white hidden' style={{borderBottomWidth:2,borderColor:globalcolor,backgroundColor:'',marginTop:2,display:'none',flexDirection:"row",justifyContent:'center',alignItems:'center',paddingTop:paddingtop,paddingBottom:bottom}}>
//   <View style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center',}}>
//     <Text style={light?{fontSize:width*0.08,fontWeight:'bold',marginLeft:10,color:globalcolor}:{fontSize:width*0.08,fontWeight:'bold',marginLeft:10,color:globalcolor}} >{t('RaviPraj')}</Text>
//     <TouchableOpacity onPress={HandleToggle}>

//     {/* {light?<Feather  name="sun" style={{marginRight:10,fontWeight:'bold'}} size={width*0.06}  color={light?"#000000":'white'}/>:<Feather name="moon" style={{marginRight:10,fontWeight:'bold'}} size={width*0.06} color={light?"#000000":'white'} />} */}
//     <TouchableOpacity onPress={()=>{
//       HandleChangeLang()
//       setIsSeletedLang(langcode)
//       HandleToggle()
//       // Voice.start('en-IN')
      
      
     
     

//     }}>

//     <MaterialIcons name="language" size={30} color="white" />
//     </TouchableOpacity>
//     </TouchableOpacity>
//   </View>

// </View>
// }

// model
{/* <Modal isVisible={IsModal?true:false} deviceHeight={height} deviceWidth={width} style={{backgroundColor:'transparent',borderRadius:23,justifyContent:'flex-start',alignItems:'center',display:'flex'}}>
      <Entypo name="circle-with-cross" size={35} color="white" style={{position:'absolute',right:-10,top:-20}} onPress={()=>{
        setIsModal(false)
        setIsSeletedLang(langcode)
      }} />

        <FlatList data={lang} style={{height:height*0.6,marginLeft:30,marginTop:10}} renderItem={({item})=>{
          return <TouchableOpacity onPress={()=>{
            HandleSelectLang(item.code)
          }}>
            <Text style={IsSelectedLang==item.code?{color:'black',fontSize:20,backgroundColor:'#54ff1c',marginVertical:5,paddingHorizontal:10,paddingVertical:5,marginHorizontal:5,borderRadius:12,boxShadow:'black',width:width*0.7}:{color:"black",fontSize:20,backgroundColor:'white',marginVertical:5,paddingHorizontal:10,paddingVertical:5,marginHorizontal:5,borderRadius:12,boxShadow:'black',width:width*0.7}}>{item.name+' '+'['+item.code+']'}</Text>
          </TouchableOpacity>
        }}/>
        <TouchableOpacity onPress={()=>{
          HandleOK()
        }}>
          <Text style={{fontSize:20,fontWeight:'bold',borderColor:'black',borderWidth:2,paddingHorizontal:40,paddingVertical:2,backgroundColor:'#54ff1c',borderRadius:23}}>OK</Text>
        </TouchableOpacity>
     
      </Modal> */}


      // singer section
//       <View className='mx-2' style={{marginTop:5,backgroundColor:'transparent'}}>
//   <Text style={light?{fontSize:width*0.05,fontWeight:'bold',color:'white'}:{fontSize:width*0.05,fontWeight:'bold',color:'white'}}>{t('artist')}</Text>
//   <FlatList showsHorizontalScrollIndicator={false} horizontal={true} style={{display:'flex',flexDirection:'row'}} data={singerdata} renderItem={({item})=>(
//     <View style={{marginRight:20}}>
//      <Image source={{uri: `http://${IP}:4500/${item.singerimage}`}} style={{width:width*0.33,height:height*0.2,borderRadius:13,borderWidth:2,borderColor:'#54ff1c'}}/>
//       <Text style={light?{fontWeight:'bold',fontSize:15,marginLeft:5,marginTop:5,color:globalcolor}:{fontWeight:'bold',fontSize:15,marginLeft:5,marginTop:5,color:'white'}}>{item.name}</Text>
      
                              
      
//     </View>
//   )}>

//   </FlatList>
// </View>

// playlist section
{/* <View className='mx-2' style={{marginTop:5}}>
  <Text style={light?{fontSize:width*0.05,fontWeight:'bold',color:'white'}:{fontSize:width*0.05,fontWeight:'bold',color:'white'}}>{t('popularplaylist')}</Text>
  <FlatList showsHorizontalScrollIndicator={false} horizontal={true} style={{display:'flex',flexDirection:'row'}} data={playlistdata} renderItem={({item})=>(
    <TouchableOpacity onPress={()=>{
     
      HandleSongPageShift(item.name)
  
    }}>

    <View style={{marginRight:20}}>
     <Image source={{uri: `http://${IP}:4500/${item.playlistimage}`}} style={{width:width*0.33,height:height*0.15,borderRadius:13,borderWidth:2,borderColor:'#54ff1c'}}/>
      <Text style={light?{fontWeight:'bold',fontSize:width*0.04,marginLeft:5,marginTop:5,color:globalcolor}:{fontWeight:'bold',fontSize:width*0.04,marginLeft:5,marginTop:5,color:'white'}}>{item.name}</Text>
      
                              
      
    </View>
    </TouchableOpacity>
  )}>

  </FlatList>
</View> */}


// import { useEffect, useRef, useState } from 'react'

// import { useTranslation } from 'react-i18next'

// import { Entypo } from '@expo/vector-icons'
// import axios from 'axios'
// import { Button, Text, View } from 'react-native'
// export default function LanguageSelect({setselectlang,userdata}) {
 
//     let currdiv=useRef()
//     let [langcode,setlangcode]=useState()
//   let [lang,setlang]=useState([
    
//     {
//         "name": "Hindi",
//         "nativeName": "हिन्दी, हिंदी",
//         "code": "hi"
//     },
//     {
//         "name": "English",
//         "nativeName": "हिन्दी, हिंदी",
//         "code": "en"
//     },
//     {
//         "name": "Bengali",
//         "nativeName": "বাংলা",
//         "code": "bn"
//     },
//     {
//         "name": "Marathi (Marāṭhī)",
//         "nativeName": "मराठी",
//         "code": "Mr"
//     },
//     {
//         "name": "Telugu",
//         "nativeName": "తెలుగు",
//         "code": "te"
//     },
//     {
//         "name": "Gujarati",
//         "nativeName": "ગુજરાતી",
//         "code": "gu"
//     },
//     {
//         "name": "Urdu",
//         "nativeName": "اردو",
//         "code": "ur"
//     },
//     {
//         "name": "Kannada",
//         "nativeName": "ಕನ್ನಡ",
//         "code": "kn"
//     },
//     {
//         "name": "Oriya",
//         "nativeName": "ଓଡ଼ିଆ",
//         "code": "or"
//     },
//     {
//         "name": "Malayalam",
//         "nativeName": "മലയാളം",
//         "code": "ml"
//     },
//     {
//         "name": "Panjabi, Punjabi",
//         "nativeName": "ਪੰਜਾਬੀ, پنجابی‎",
//         "code": "pa"
//     },
//     {
//         "name": "Assamese",
//         "nativeName": "অসমীয়া",
//         "code": "as"
//     },
//     {
//         "name": "Bihari",
//         "nativeName": "भोजपुरी",
//         "code": "bh"
//     },
  
//     {
//         "name": "Nepali",
//         "nativeName": "नेपाली",
//         "code": "ne"
//     },
//     {
//         "name": "Sindhi",
//         "nativeName": "सिन्धी, سنڌي، سندھی‎",
//         "code": "sd"
//     },
//     {
//         "name": "Tamil",
//         "nativeName": "தமிழ்",
//         "code": "ta"
//     },
   
//     {
//         "name": "Santali",
//         "nativeName": "Santali",
//         "code": "sat"
//     },
//     {
//         "name": "Maithili",
//         "nativeName": "मैथिली",
//         "code": "mai"
//     },
//     {
//         "name": "Dogri",
//         "nativeName": "डोगरी,ڈوگری",
//         "code": "doi"
//     },
//     {
//         "name": "Manipuri",
//         "nativeName": "Meitei",
//         "code": "mni"
//     },
    
//   ])
//   const {t,i18n}=useTranslation()
//   async function handleLangchange(code){
   
//     setlangcode(code)
   
    

//   }
//   async function HandleOK(){
//     // alert(langcode)
//     try {
//         let {data}=await axios.post(`http://localhost:4500/updateuserlang/${userdata.email}`,{language:langcode})
        
//         console.log(data)
//         // i18n.changeLanguage(langcode)
//         // i18n.changeLanguage(langcode)
        
//         setselectlang(false)
//     } catch (error) {
//         console.log(error)
//     }
//   }
//   useEffect(()=>{
    
//     // alert('else')    
//     alert("chaal")
//     console.log(i18n)

//     console.log("I am the boss")
        
    
  
//   },[t,i18n.language])
//   return (
//     <View className='w-[100%] flex items-center justify-center flex-col fixed top-0 h-[98vh]  z-50  Polymorphism'>
//         <Entypo name='circle-with-cross' size={35} color={'white'} onPress={()=>{
//             setselectlang(false)
//         }} className='absolute right-5 text-2xl cursor-pointer top-15'/>
        

//        <View className=' w-[90%] md:h-[60%] h-[80%] flex flex-wrap md:gap-4 gap-1 '>
//         {
//           lang.map((item,idx)=>{
//             return <View  ref={currdiv} key={idx} id={item.code} onClick={()=>{
//               handleLangchange(item.code)
//             }} className={langcode==item.code?'border-2  md:text-xl text-sm font-bold hover:bg-black hover:text-[#54ff1c] cursor-pointer transition-all duration-700 text-black border-[#54ff1c] rounded-[34px] px-3  md:h-[40px] h-[30px] flex items-center justify-center active-lang':'border-2 md:text-xl text-sm font-bold hover:bg-black hover:text-[#54ff1c] cursor-pointer transition-all duration-700 text-black border-[#54ff1c] rounded-[34px] px-3  md:h-[40px] h-[30px] flex items-center justify-center'}>
//                <Text style={{color:'black'}}>{`${item.name}[${item.code}]`}</Text>
//             </View>
//           })
//         }
        
//        </View>
      
      
//     </View>
//   )
// }



import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AppContext } from "./Store";
let   IP='192.168.1.155'
;

export default function LanguageSelect() {
  const languages = [
  { id: 1, name: "Hindi", code: "hi", icon: <FontAwesome5 name="language" size={20} color="#ff5722" /> },
  { id: 2, name: "English", code: "en", icon: <Ionicons name="globe-outline" size={20} color="#3f51b5" /> },
  { id: 3, name: "Bengali", code: "bn", icon: <MaterialCommunityIcons name="script" size={20} color="#009688" /> },
  { id: 4, name: "Telugu", code: "te", icon: <Ionicons name="book-outline" size={20} color="#9c27b0" /> },
  { id: 5, name: "Marathi", code: "Mr", icon: <Ionicons name="document-text-outline" size={20} color="#795548" /> },
  { id: 6, name: "Tamil", code: "ta", icon: <FontAwesome5 name="font" size={20} color="#f44336" /> },
  { id: 7, name: "Urdu", code: "ur", icon: <Ionicons name="create-outline" size={20} color="#607d8b" /> },
  { id: 8, name: "Gujarati", code: "gu", icon: <FontAwesome5 name="pen" size={20} color="#ff9800" /> },
  { id: 9, name: "Kannada", code: "kn", icon: <Ionicons name="reader-outline" size={20} color="#673ab7" /> },
  { id: 10, name: "Odia", code: "or", icon: <FontAwesome5 name="file-alt" size={20} color="#4caf50" /> },
  { id: 11, name: "Punjabi", code: "pa", icon: <Ionicons name="pencil-outline" size={20} color="#009688" /> },
  { id: 12, name: "Malayalam", code: "ml", icon: <MaterialCommunityIcons name="format-text" size={20} color="#e91e63" /> },
  { id: 13, name: "Assamese", code: "as", icon: <FontAwesome5 name="book" size={20} color="#8bc34a" /> },
  { id: 14, name: "Maithili", code: "mai", icon: <Ionicons name="text-outline" size={20} color="#ff5722" /> },
  { id: 15, name: "Santali", code: "sat", icon: <MaterialCommunityIcons name="alphabetical" size={20} color="#3f51b5" /> },
  { id: 16, name: "Kashmiri", code: "ks", icon: <Ionicons name="leaf-outline" size={20} color="#009688" /> },
  { id: 17, name: "Nepali", code: "ne", icon: <FontAwesome5 name="mountain" size={20} color="#9c27b0" /> },
  { id: 18, name: "Sindhi", code: "sd", icon: <MaterialCommunityIcons name="script-text" size={20} color="#795548" /> },
  { id: 19, name: "Dogri", code: "doi", icon: <Ionicons name="bookmarks-outline" size={20} color="#607d8b" /> },
  { id: 20, name: "Konkani", code: "kok", icon: <FontAwesome5 name="fish" size={20} color="#2196f3" /> },
  { id: 21, name: "Manipuri", code: "mni", icon: <MaterialCommunityIcons name="feather" size={20} color="#f44336" /> },
  { id: 22, name: "Bodo", code: "brx", icon: <Ionicons name="leaf" size={20} color="#4caf50" /> },
  { id: 23, name: "Sanskrit", code: "sa", icon: <FontAwesome5 name="om" size={20} color="#ff9800" /> },
];

const {IsLogin,setisLogin,IsSelectedLang,setIsSeletedLang,setWantToStopMusic,UserPlaylistData,setuserplaylistdata,userdata,setuserdata,ActiveReveiwPage,setShowMP}=useContext(AppContext)
  
const navigation=useNavigation();
const {t,i18n}=useTranslation()
  const [selected, setSelected] = useState(null);
  async function HandleOK(){
             let data1=await SecureStore.getItemAsync('user')
          let email=JSON.parse(data1).email
          
    try {
      // alert(selected)
        let data=await axios.post(`http://${IP}:4500/updateuserlang/${email}`,{language:selected}).then(({data})=>{
          console.log(data)
            navigation.goBack();

        })
        
        
      } catch (error) {
        console.log(error)
    }
  }


  const handleSelect = (lang) => {
    setSelected(lang);
    setIsSeletedLang(lang)
    i18n.changeLanguage(lang)
    
    // alert(lang)
  };

  return (
    
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <LinearGradient
            // colors={['white', '#1D8DA3']}
                colors={['white', '#3fa9f5','white','#3fa9f5']}
      
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{flex:1}}
          >
      
      {/* Top Bar with Close Button */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          padding: 15,
        }}
      >
        <TouchableOpacity style={{position:'absolute',top:40,right:30,zIndex:50}} onPress={() => {
            // alert("helo")
            navigation.goBack();
        

        }}>
          <Ionicons name="close" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          textAlign: "center",
          // marginBottom: 10,
          marginTop:10
        }}
      >
        Select Your Language
      </Text>

      {/* Language List */}
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {languages.map((lang, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelect(lang.code)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 12,
              marginBottom: 8,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: selected === lang.code ? "#00bcd4" : "#ccc",
              backgroundColor: selected === lang.code ? "#e0f7fa" : "#fff",
            }}
          >
            {/* Icon */}
            <View style={{ marginRight: 12 }}>{lang.icon}</View>

            {/* Language Name */}
            <Text style={{ fontSize: 16, flex: 1 }}>{lang.name}</Text>

            {/* Selection Indicator */}
            <Ionicons
              name={
                selected === lang.name ? "radio-button-on" : "radio-button-off"
              }
              size={22}
              color={selected === lang.name ? "#3fa9f5" : "gray"}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={()=>{
          HandleOK();
          // alert("hello")
        }}
        style={{
          backgroundColor: "#3fa9f5",
          margin: 20,
          padding: 15,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          Submit
        </Text>
      </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

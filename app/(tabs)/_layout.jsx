// import { useEffect } from 'react';
// // import './gesture-handler';
// import axios from 'axios';
// import { Dimensions } from 'react-native';
// let {width,height}=Dimensions.get('window')
// let   IP='192.168.1.155';;

// // import {  } from '../Store/ContextAPI';


// import { AntDesign, FontAwesome, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
// import * as SecureStore from "expo-secure-store";
// import { useContext } from 'react';
// import { AppContext } from '../Store';
// import AddPlaylist from './AddPlaylist';
// import index from './Index';
// import Profile from './Profile';
// import Search from './Search';
// import SignUp from './SignUp';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import { StatusBar } from 'react-native';


// const Tab = createBottomTabNavigator();
// export default function TabLayout() {
//   const {IsLogin,userdata,setuserdata,setuserplaylistdata}=useContext(AppContext)
//    async function GetUserData(){
  
      
//     alert('getuserdata start')
//         try {
//           let email=await SecureStore.getItemAsync('useremail')

        
//           let {data}=await axios.get(`http://${IP}:4500/GetUserData/${email}`)
//           // console.log(data,'mydata')
//           alert(data.FirstName)
          
//           setuserdata(data)
//           axios.defaults.withCredentials=true;
//           let Data=await axios.get(`http://${IP}:4500/GetUserPlaylistDataApp/${email}`)
//           // console.log(Data.data)
//           setuserplaylistdata(Data.data)
         
         
//         } catch (error) {
//           console.log(error)
//         }
// alert('getuserdata end');

//       }
//   useEffect(()=>{
//     // alert(userdata.FirstName+'tabslayout')
//     GetUserData();
//     // alert(userdata.FirstName+'check')
//   //  alert(IsLogin+'login')
//   },[])
//   return (
//     <>
  
//     {/* <Text>Hello I am Home Page for drawer navigation</Text> */}
    
//     <Tab.Navigator
//     screenOptions={{
//       tabBarShowLabel:false,
//       tabBarStyle:{
//        position:'absolute',
//        bottom:0,
//        borderRadius:23
//       },
//       tabBarIconStyle:{
//         width:60,
//         height:40,
//         borderRadius:23
//       },
//       tabBarActiveBackgroundColor:'green',
      

//     }}>
//       <Tab.Screen  name="Home" component={index} options={{headerShown:false,tabBarIcon:({color,focused})=>(
//          <FontAwesome size={width*0.08} name='home'  color={focused?'black':'green'} />
//   ),title:'Home'}} />
//       <Tab.Screen name="Search" component={Search} options={{headerShown:false,tabBarIcon:({color,focused})=>(
//          <FontAwesome size={width*0.08} name='search'   color={focused?'black':'green'} />
//   ),title:'search'}} />
     
//       {!userdata.FirstName?<Tab.Screen name="SignUp" component={SignUp}  options={{headerShown:false,tabBarIcon:({color,focused})=>(
//         <SimpleLineIcons name="login" size={width*0.08} color={focused?'black':'green'} />
//       ),title:'SignUp'}}/>:null}
//       <Tab.Screen name="AddPlaylist" component={AddPlaylist}  options={{headerShown:false,tabBarIcon:({color,focused})=>(
//         <MaterialCommunityIcons name="playlist-plus" size={width*0.08}  color={focused?'black':'green'} />
//       ),title:'Playlist'}}/>
//       <Tab.Screen name="Profile" component={Profile} options={{headerShown:false,tabBarIcon:({color,focused})=>(
//         <AntDesign name="idcard" size={width*0.08}  color={focused?'black':'green'} />
//   ),title:'Profile'}}/>
//     </Tab.Navigator>
//     {/* <MusicPlayer position={'fixed'} bottom={'1000px'} /> */}
     
      
    
//     </>
//   )
// }

// App.js or Navigation.js

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Linking from "../utils/linking."
// import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from 'expo-secure-store';
import { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Index from ".";
import { AppContext } from '../Store';
import AddPlaylist from "./AddPlaylist";
import Profile from "./Profile";
import Search from "./Search";
import SignUp from "./SignUp";
import {DeviceDetect} from '../utils/DeviceDetect'
let   IP='192.168.1.155'
let email;
const Tab = createBottomTabNavigator();

const TabBarBackground = () => (
  <LinearGradient
    colors={['white', '#3fa9f5','white','#3fa9f5']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={StyleSheet.absoluteFill}
  />
);

export default function App() {
  const {userdata,IsLogin,setuserdata}=useContext(AppContext)
  const [device,setdeviece]=useState('Mobile')
//   }
  async function getuserdatafromLS(){
    let data=await SecureStore.getItemAsync('user')
    setuserdata(JSON.parse(data))
    alert(JSON.parse(data).FirstName)
  }
    async function GetUserData(){
  
        try {
          let data1=await SecureStore.getItemAsync('user')
          if(!data1){
            return
          }
           email=JSON.parse(data1).email
          // alert(email)

        
          let {data}=await axios.get(`http://${IP}:4500/GetUserData/${email}`)
         setuserdata(data)
        //  alert(data.FirstName+"firstname")
        } catch (error) {
          console.log(error)
        }
// // alert('getuserdata end');
}
useEffect(()=>{
  getuserdatafromLS()
  GetUserData();
  },[])
  return (
    <>
      {DeviceDetect()=="Mobile"?<Tab.Navigator
      
        screenOptions={({ route }) => ({
          headerShown:false,
         tabBarStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.40)',
          borderTopWidth: 0,
           
          // elevation: 0, // for Android shadow removal
          // bottom:10,
          position: 'absolute', // to allow content to go behind the tab bar
          headerShown: false,
         },
          // tabBarBackground: () => <TabBarBackground />,
          
          textShadowColor: 'rgba(0, 0, 0, 0.75)',
         tabBarActiveTintColor: '#2196f3', 
        // tabBarInactiveTintColor: 'gray',
          tabBarInactiveTintColor: '#000',
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home-outline';
                break;
              case 'Search':
                iconName = 'search-outline';
                break;
              case 'Signup':
                iconName = 'person-add-outline';
                break;
              case 'Playlist':
                iconName = 'musical-notes-outline';
                break;
              case 'Profile':
                iconName = 'person-circle-outline';
                break;
              default:
                iconName = 'ellipse-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Index} />
        <Tab.Screen name="Search" component={Search} />
        {!userdata?.FirstName?<Tab.Screen name="Signup" component={SignUp} />:null}
        <Tab.Screen name="Playlist" component={AddPlaylist} />
       { userdata?.FirstName?<Tab.Screen name="Profile" component={Profile} />:null}
       
      </Tab.Navigator>:<Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarBackground: () => <TabBarBackground />,
          textShadowColor: 'rgba(0, 0, 0, 0.75)',
          tabBarActiveTintColor: 'rgba(0, 0, 0, 0.75)',
          tabBarActiveBackgroundColor:'white',
          tabBarPosition:'bottom',
          
          tabBarInactiveTintColor: '#000',
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home-outline';
                break;
              case 'Search':
                iconName = 'search-outline';
                break;
              case 'Signup':
                iconName = 'person-add-outline';
                break;
              case 'Playlist':
                iconName = 'musical-notes-outline';
                break;
              case 'Profile':
                iconName = 'person-circle-outline';
                break;
              default:
                iconName = 'ellipse-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Index} />
        <Tab.Screen name="Search" component={Search} />
        {!userdata?.FirstName?<Tab.Screen name="Signup" component={SignUp} />:null}
        {userdata?.FirstName?<Tab.Screen name="Playlist" component={AddPlaylist} />:null}
       { userdata?.FirstName?<Tab.Screen name="Profile" component={Profile} />:null}
       
      </Tab.Navigator>}
    </>

    // </NavigationContainer>
  );
}


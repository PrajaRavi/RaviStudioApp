import { Entypo } from '@expo/vector-icons'
import axios from 'axios'
import { BlurView } from 'expo-blur'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import { Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification'
import { useSafeAreaInsets } from "react-native-safe-area-context"
const {width,height}=Dimensions.get('window')
let   IP='10.205.8.23'
;
export default function ReviewPage({setActiveReviewPage}) {
  const navigation=useNavigation()
  const [review,setreview]=useState()
  // const {ActiveReveiwPage,setActiveReviewPage}=useContext(AppContext)
  const inset=useSafeAreaInsets();
  async function HandleSubmit(){
    try {
      
      let {data}=await axios.post(`http://${IP}:4500/Review`,{
        Review:review,
        
      })
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        
        textBody:'Review Submited',
  
      })
      console.log(data)
    
      setActiveReviewPage(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <AlertNotificationRoot>
        <BlurView intensity={50} tint='dark' style={{display:'flex',flexDirection:'column',position:'absolute',width:width,height,backgroundColor:'rgba(0,0,0,0.7)',zIndex:50}}>
         
          <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingVertical:3,paddingHorizontal:3,borderColor:'black',borderBottomWidth:2}}>
    
          <TouchableOpacity onPress={()=>{
          setActiveReviewPage(false)
            
          
          }} style={{width:40,height:40,backgroundColor:'black',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:12,position:'relative',top:50,left:20}}>
        <Entypo name="circle-with-cross" size={35} color="white" />
          </TouchableOpacity>
         
            </View>
            
          <View style={{width,height:height*0.8,paddingHorizontal:10,marginTop:20,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:30,fontWeight:'bold',color:'#54ff1c',marginVertical:5}}>Write your review</Text>
          {/* <RichTextarea style={{width:width,height:height*0.6}}/> */}
          <TextInput onChangeText={(text)=>{
setreview(text)
console.log(text)
          }} multiline={true} style={{width:width*0.96,height:height*0.60,borderColor:'black',borderWidth:2,backgroundColor:'black',borderRadius:23,color:'#54ff1c',textAlignVertical:'top'}}>
          </TextInput>
           <TouchableOpacity onPress={()=>{
            HandleSubmit()
           }}>
            <Text style={{fontSize:30,fontWeight:'bold',borderColor:'#54ff1c',color:'#54ff1c',backgroundColor:'black',paddingHorizontal:30,borderRadius:12,marginVertical:10}}>Submit</Text>
           </TouchableOpacity>
          </View>
   
    
          </BlurView>
        </AlertNotificationRoot>
    
      
    </>
  )
}

import { Entypo } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Dimensions, TextInput } from 'react-native'
const {width,height}=Dimensions.get('window')
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'
import { useContext } from 'react'
import { AppContext } from './Store'
import * as Speech from 'expo-speech'
import { useTranslation } from 'react-i18next'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import { BlurView } from 'expo-blur'
import axios from 'axios'


export default function WantToStopMusic({setWantToStopMusic,ActiveWantToStopMusic,sound,setIsPlay}) {
  const {t,i18n}=useTranslation()
  const navigation=useNavigation()
  const [review,setreview]=useState()
  async function GetAllVoices(){
    // let Data=await Speech.getAvailableVoicesAsync();
    // console.log(Data)
    await sound.pauseAsync()
    
  }
  // const {ActiveReveiwPage,setActiveReviewPage}=useContext(AppContext)
  async function HandleYes(){
    setWantToStopMusic(false)
    setIsPlay(false)
    
    if(i18n.language=='ur'){
      Speech.speak(t('oksongstop'),{
        rate:0.8,
        voice:'ur-in-x-urc-local'
        
      })
    }
    else if(i18n.language=='as'){
      Speech.speak(t('oksongstop'),{
        rate:0.8,
        voice:'as-in-x-end-local'
        
      })
    }
    else if(i18n.language=='bn'){
      Speech.speak(t('oksongstop'),{
        rate:0.8,
        voice:'bn-IN-language'

        
      })
    }
    else if(i18n.language=='ml'){
      Speech.speak(t('oksongstop'),{
        rate:0.8,
        voice:'ml-in-x-mlc-local'
        
      })
    }
    else if(i18n.language=='mr'){
      Speech.speak(t('oksongstop'),{
        rate:0.8,
        voice:'mr-in-x-mrd-local'
        
      })
    }
    else if(i18n.language=='gu'){
      Speech.speak(t('oksongstop'),{
        rate:0.8,
        voice:'gu-in-x-gud-local'
        
      })
    }
    else if(i18n.language=='pa'){
      Speech.speak(t('oksongstop'),{
        rate:0.8,
        voice:'pa-in-x-pac-network'

        
      })
    }
    
    
    else if(i18n.language=='te'){
      Speech.speak(t('oksongstop'),{
        rate:0.8,
        voice:'te-in-x-teg-network'
        
      })
    }
    else if(i18n.language=='kn'){
      Speech.speak(t('oksongstop'),{
        rate:0.8,
        voice:'kn-in-x-knc-network'
        
      })
    }
    else if(i18n.language=='or'){
      Speech.speak(t('oksongplay'),{
        rate:0.8,
        voice:'or-IN-language'
        
      })
    }
    else if(i18n.language=='mai'){
      Speech.speak(t('oksongstop'),{
        rate:0.8,
        voice:'mai-in-x-end-local'
        
      })
    }
    else if(i18n.language=='mni'){
      Speech.speak(t('oksongstop'),{
        rate:0.8,
        voice:'mni-in-x-end-local'
        
      })
    }
    else if(i18n.language=='sd'){
      Speech.speak(t('oksongstop'),{
        rate:0.8,
        voice:'sd-in-x-end-local'
        
      })
    }
    else if(i18n.language=='ta'){
      Speech.speak(t('oksongstop'),{
        rate:0.8,
        voice:'ta-in-x-tac-local'
        
      })
    }
    else if(i18n.language=='mai'){
      Speech.speak(t('oksongstop'),{
        rate:0.8,
        voice:'mai-in-x-end-local'
        
      })
    }
    else if(i18n.language=='sat'){
      Speech.speak(t('oksongplay'),{
        rate:0.8,
        voice:'sat-in-x-end-local'
        
      })
    }
    else {
    alert('else')
      Speech.speak(t('oksongstop'),{
        rate:0.8,
        voice:'hi-IN-language'
        
      })
    }
  }
  async function HandleNo(){
    setWantToStopMusic(false)
    setTimeout(async ()=>{

      await sound.playAsync()
    },3000)

    if(i18n.language=='ur'){
      Speech.speak(t('oksongplay'),{
        rate:0.8,
        voice:'ur-in-x-urc-loca'
        
      })
    }
    else if(i18n.language=='as'){
      Speech.speak(t('oksongplay'),{
        rate:0.8,
        voice:'as-in-x-end-local'
        
      })
    }
    else if(i18n.language=='sat'){
      Speech.speak(t('oksongplay'),{
        rate:0.8,
        voice:'sat-in-x-end-local'
        
      })
    }
    else if(i18n.language=='bn'){
      Speech.speak(t('oksongplay'),{
        rate:0.8,
        voice:'bn-in-x-bnd-local'
        
      })
    }
    else if(i18n.language=='ml'){
      Speech.speak(t('oksongplay'),{
        rate:0.8,
        voice:'ml-in-x-mlc-local'
        
      })
    }
    else if(i18n.language=='mr'){
      Speech.speak(t('oksongplay'),{
        rate:0.8,
        voice:'mr-in-x-mrd-local'
        
      })
    }
    else if(i18n.language=='gu'){
      Speech.speak(t('oksongplay'),{
        rate:0.8,
        voice:'gu-in-x-gud-local'
        
      })
    }
    else if(i18n.language=='pa'){
      Speech.speak(t('oksongplay'),{
        rate:0.8,
        voice:'pa-in-x-pag-local'
        
      })
    }
    else if(i18n.language=='doi'){
      Speech.speak(t('oksongplay'),{
        rate:0.8,
        voice:'doi-IN-language'
        
      })
    }
    else if(i18n.language=='te'){
      Speech.speak(t('oksongplay'),{
        rate:0.8,
        voice:'te-in-x-teg-network'
        
      })
    }
    else if(i18n.language=='kn'){
      Speech.speak(t('oksongplay'),{
        rate:0.8,
        voice:'kn-in-x-knc-network'
        
      })
    }
    else if(i18n.language=='sd'){
      Speech.speak(t('oksongplay'),{
        rate:0.8,
        voice:'sd-in-x-end-local'
        
      })
    }
    else if(i18n.language=='ta'){
      Speech.speak(t('oksongplay'),{
        rate:0.8,
        voice:'ta-in-x-tac-local'
        
      })
    }
    else if(i18n.language=='or'){
      Speech.speak(t('oksongplay'),{
        rate:0.8,
        voice:'or-IN-language'
        
      })
    }
    else if(i18n.language=='mai'){
      Speech.speak(t('oksongstop'),{
        rate:0.8,
        voice:'mai-in-x-end-local'
        
      })
    }
    else if(i18n.language=='mni'){
      Speech.speak(t('oksongstop'),{
        rate:0.8,
        voice:'mni-in-x-end-local'
        
      })
    }
    else {
    alert('else')
      Speech.speak(t('oksongplay'),{
        rate:0.8,
        voice:'hi-IN-language'
        
      })
    }
  }
  useEffect(()=>{
    GetAllVoices()
    alert(i18n.language)

  
 if(i18n.language=='ur'){
  Speech.speak(t('doyouwanttostopmusic'),{
    rate:0.8,
    voice:'ur-in-x-urc-loca'
    
  })
}
else if(i18n.language=='as'){
  Speech.speak(t('doyouwanttostopmusic'),{
    rate:0.8,
    voice:'as-in-x-end-local'
    
  })
}
else if(i18n.language=='bn'){
  Speech.speak(t('doyouwanttostopmusic'),{
    rate:0.8,
    voice:'bn-in-x-bnd-local'
    
  })
}
else if(i18n.language=='ml'){
  Speech.speak(t('doyouwanttostopmusic'),{
    rate:0.8,
    voice:'ml-in-x-mlc-local'
    
  })
}
else if(i18n.language=='mr'){
  Speech.speak(t('doyouwanttostopmusic'),{
    rate:0.8,
    voice:'mr-in-x-mrd-local'
    
  })
}
else if(i18n.language=='gu'){
  Speech.speak(t('doyouwanttostopmusic'),{
    rate:0.8,
    voice:'gu-in-x-gud-local'
    
  })
}
else if(i18n.language=='pa'){
  Speech.speak(t('doyouwanttostopmusic'),{
    rate:0.8,
    voice:'pa-in-x-pag-local'
    
  })
}
else if(i18n.language=='doi'){
  Speech.speak(t('doyouwanttostopmusic'),{
    rate:0.8,
    voice:'doi-IN-language'
    
  })
}
else if(i18n.language=='te'){
  Speech.speak(t('doyouwanttostopmusic'),{
    rate:0.8,
    voice:'te-in-x-teg-network'
    
  })
}
else if(i18n.language=='kn'){
  Speech.speak(t('doyouwanttostopmusic'),{
    rate:0.8,
    voice:'kn-in-x-knc-network'
    
  })
}
else if(i18n.language=='sd'){
  Speech.speak(t('doyouwanttostopmusic'),{
    rate:0.8,
    voice:'sd-in-x-end-local'
    
  })
}
else if(i18n.language=='ta'){
  Speech.speak(t('doyouwanttostopmusic'),{
    rate:0.8,
    voice:'ta-in-x-tac-local'
    
  })
}
else if(i18n.language=='mai'){
  Speech.speak(t('doyouwanttostopmusic'),{
    rate:0.8,
    voice:'mai-in-x-end-local'
    
  })
}
else if(i18n.language=='mni'){
  Speech.speak(t('doyouwanttostopmusic'),{
    rate:0.8,
    voice:'mni-in-x-end-local'
    
  })
}
else if(i18n.language=='sat'){
  Speech.speak(t('doyouwanttostopmusic'),{
    rate:0.8,
    voice:'sat-in-x-end-local'
    
  })
}
else if(i18n.language=='or'){
  Speech.speak(t('doyouwanttostopmusic'),{
    rate:0.8,
    voice:'or-IN-language'
    
  })
}
else {

  Speech.speak(t('doyouwanttostopmusic'),{
    rate:0.8,
    voice:'hi-in-x-hia-local'
    
  })
}
  },[])
  return (
    <>
      <AlertNotificationRoot>
        <BlurView intensity={50} tint='dark' className='z-50' style={{display:'flex',flexDirection:'column',width:width,height,backgroundColor:'rgba(0,0,0,0.7)',zIndex:50}}>
          <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingVertical:3,paddingHorizontal:3,borderColor:'black',borderBottomWidth:2}}>
    
          
         
            </View>
          <View style={{width,height:height,paddingHorizontal:10,marginTop:20,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:30,fontWeight:'bold',color:'#3fa9f5',marginVertical:5,textAlign:'center'}}>{t('doyouwanttostopmusic')+'?'}</Text>
            <View className='w-[100%] flex flex-row items-center justify-center gap-8 my-8'>

            <TouchableOpacity onPress={()=>{
              HandleYes()
            }}>
              <Text className='font-bold text-3xl border-2 rounded-xl border-[#3fa9f5] text-[#3fa9f5] px-7'>
                {t('yes')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              HandleNo()
            }}>
              <Text className='font-bold text-3xl border-2 rounded-xl border-[#3fa9f5] text-[#3fa9f5] px-7'>
                {t('no')}
              </Text>
            </TouchableOpacity>
            </View>
          {/* <RichTextarea style={{width:width,height:height*0.6}}/> */}
        
        
          </View>
    
    
          </BlurView>
        </AlertNotificationRoot>
    
      
    </>
  )
}

import { createContext, useEffect, useState } from "react";

export const AppContext=createContext({
  data:{},
  data1:[],
  para:'hello',
  HandlePlay:()=>{},

  
  
  
})
export const AppProvider=({chidren})=>{
 let [data1,setdata]=useState([])
  let ArrayData=[
    {
      name:'ravi',
      surname:'prajapati'
    },
    {
      name:'ravi',
      surname:'prajapati'
    },
    {
      name:'ravi',
      surname:'prajapati'
    }
  ]
  useEffect(()=>{

    setdata(ArrayData)
  })


  return (
    <AppContext.Provider value={{data1,setdata}}>
{chidren}
    </AppContext.Provider>
  )
}
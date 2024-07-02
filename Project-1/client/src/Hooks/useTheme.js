import React, { useState, useEffect } from 'react'

const useTheme = () => {
    const [lightTheme, setLightTheme] = useState(true)

    useEffect(()=>{
        if(lightTheme){
            document.documentElement.classList.remove("dark")
        }
        else{
            document.documentElement.classList.add("dark")
        }

    },[lightTheme])

    const toggleTheme = ()=>{
        setLightTheme(prev => !prev)
        console.log(lightTheme);
    }

    return [lightTheme, toggleTheme];
}

export default useTheme

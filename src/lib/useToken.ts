import { useState, useEffect } from 'react'

//export default useAgent

export default function useToken(){
    const [token, setToken] = useState<String|null>(null)
    useEffect(()=>{
        if (typeof window !== "undefined") {
            //console.log("useToken")
            const token = localStorage.getItem("token")
            const expirationTime = parseInt(localStorage.getItem("expirationTime") || "0")
            if (!token || !expirationTime || expirationTime < Date.now()) {                
                localStorage.removeItem("token")
                setToken(null)
            }
            setToken(token)
        }
    })
    return token
}
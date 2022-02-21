import { useState, useEffect } from 'react'
const mobileAgents = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
];
function useAgent() {
    const [isMobile, setIsMobile] = useState<Boolean>(false)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const result = mobileAgents.some(agent => {
                return navigator.userAgent.match(agent);
            })
            setIsMobile(result)
        }
    },[])
    return isMobile
}

export default useAgent
import LOG from "./log"

export default function getLocalToken(): string | null {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token")
        const expirationTime = parseInt(localStorage.getItem("expirationTime") || "0")
        if (!token || !expirationTime) return null
        if (expirationTime < Date.now()) {
            //LOG("Token expired")
            localStorage.removeItem("token")
            return null
        }
        return token
    }
    return null
}


export default function getLocalToken(): string | null {
    if (typeof window !== "undefined") {
        const token = JSON.parse(localStorage.getItem("token") || "null")
        if (!token) return null
        if (token.timeStamp < Date.now() - 3600000) {
            localStorage.removeItem("token")
            return null
        }
        return token.token
    }
    return null
}


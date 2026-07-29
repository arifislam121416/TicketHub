import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
     provider: "google",
    
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "http://localhost:3000"
})

export const { signIn, signUp, useSession } = createAuthClient()
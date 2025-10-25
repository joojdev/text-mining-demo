"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/auth"
import { login as authLogin, verifyToken, getStoredToken, setStoredToken, removeStoredToken } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored token on mount
    const token = getStoredToken()
    if (token) {
      const verifiedUser = verifyToken(token)
      setUser(verifiedUser)
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const { token, user } = await authLogin(email, password)
    setStoredToken(token)
    setUser(user)
    router.push("/admin")
  }

  const logout = () => {
    removeStoredToken()
    setUser(null)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface AuthContextType {
  user: { role: "user" | "chef" | "manager"; email: string } | null
  login: (role: "user" | "chef" | "manager", email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null)

  const login = (role: "user" | "chef" | "manager", email: string) => {
    setUser({ role, email })
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

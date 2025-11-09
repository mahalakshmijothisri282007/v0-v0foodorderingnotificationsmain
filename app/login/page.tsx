"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<"user" | "chef" | "manager">("user")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      login(selectedRole, email)
      router.push("/dashboard")
    }
  }

  const demoCredentials: Record<string, string> = {
    user: "user@mec.college",
    chef: "chef@mec.college",
    manager: "manager@mec.college",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-start pt-8 pointer-events-none">
        <div className="relative z-5 transform transition-transform hover:scale-105 duration-300">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mec-J23JBwT6PADUBOLuFmKRWWKN15UplU.png"
            alt="Madras Engineering College Logo"
            width={200}
            height={200}
            className="drop-shadow-2xl"
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mt-8 drop-shadow-lg text-center tracking-wide">
          MADRAS ENGINEERING COLLEGE
        </h1>
        <p className="text-purple-100 text-xl mt-3 text-center drop-shadow-md font-light">Canteen Management System</p>
      </div>

      <Card className="w-full max-w-md bg-white/10 border-purple-500/30 backdrop-blur-xl relative z-10 mt-56">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            MEC Canteen Login
          </CardTitle>
          <CardDescription className="text-purple-200">Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-purple-200">Select Role</label>
              <div className="grid grid-cols-3 gap-2">
                {(["user", "chef", "manager"] as const).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`py-2 px-3 rounded-lg font-medium transition ${
                      selectedRole === role
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-purple-700/40 text-purple-200 hover:bg-purple-600/40"
                    }`}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-200">Email</label>
              <Input
                type="email"
                placeholder={demoCredentials[selectedRole]}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-purple-700/40 border-purple-500/30 text-white placeholder:text-purple-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-200">Password</label>
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-purple-700/40 border-purple-500/30 text-white placeholder:text-purple-300"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
            >
              Login
            </Button>

            <div className="text-center text-sm text-purple-300">Demo: {demoCredentials[selectedRole]} / password</div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

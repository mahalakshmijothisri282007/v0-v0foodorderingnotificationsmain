"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()

  // Login state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<"user" | "chef" | "manager">("user")

  // Signup state
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user" as "user" | "chef" | "manager",
  })
  const [signupSuccess, setSignupSuccess] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginEmail && loginPassword) {
      login(selectedRole, loginEmail)
      router.push("/dashboard")
    }
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    if (signupData.name && signupData.email && signupData.phone && signupData.password) {
      setSignupSuccess(true)
      setTimeout(() => {
        setSignupSuccess(false)
        // For users, automatically login
        if (signupData.role === "user") {
          login(signupData.role, signupData.email)
          router.push("/dashboard")
        }
      }, 2000)
    }
  }

  const demoCredentials: Record<string, string> = {
    user: "user@mec.college",
    chef: "chef@mec.college",
    manager: "manager@mec.college",
  }

  const getAuthorizationMessage = (role: string) => {
    if (role === "user") return "Self-Registration (Instant Access)"
    if (role === "chef") return "Manager Approval Required"
    return "System Admin Approval Required"
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
            MEC Canteen
          </CardTitle>
          <CardDescription className="text-purple-200">Login or Sign up to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-purple-700/40">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
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
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="bg-purple-700/40 border-purple-500/30 text-white placeholder:text-purple-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-200">Password</label>
                  <Input
                    type="password"
                    placeholder="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
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

                <div className="text-center text-sm text-purple-300">
                  Demo: {demoCredentials[selectedRole]} / password
                </div>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              {signupSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {signupData.role === "user" ? "Account Created!" : "Registration Submitted!"}
                  </p>
                  <p className="text-sm text-purple-200">
                    {signupData.role === "user"
                      ? "Redirecting to dashboard..."
                      : `Your ${signupData.role} registration is pending approval.`}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-purple-200">Select Role</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["user", "chef", "manager"] as const).map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setSignupData({ ...signupData, role })}
                          className={`py-2 px-3 rounded-lg font-medium transition text-sm ${
                            signupData.role === role
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                              : "bg-purple-700/40 text-purple-200 hover:bg-purple-600/40"
                          }`}
                        >
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </button>
                      ))}
                    </div>
                    <Badge className="w-full justify-center bg-purple-600/60 text-purple-100 text-xs py-1">
                      {getAuthorizationMessage(signupData.role)}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-purple-200">Full Name</Label>
                    <Input
                      type="text"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      className="bg-purple-700/40 border-purple-500/30 text-white placeholder:text-purple-300"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-purple-200">Email</Label>
                    <Input
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className="bg-purple-700/40 border-purple-500/30 text-white placeholder:text-purple-300"
                      placeholder="your.email@mec.college"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-purple-200">Phone Number</Label>
                    <Input
                      type="tel"
                      value={signupData.phone}
                      onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                      className="bg-purple-700/40 border-purple-500/30 text-white placeholder:text-purple-300"
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-purple-200">Password</Label>
                    <Input
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      className="bg-purple-700/40 border-purple-500/30 text-white placeholder:text-purple-300"
                      placeholder="Create a password"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-purple-200">Confirm Password</Label>
                    <Input
                      type="password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      className="bg-purple-700/40 border-purple-500/30 text-white placeholder:text-purple-300"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
                  >
                    Create Account
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

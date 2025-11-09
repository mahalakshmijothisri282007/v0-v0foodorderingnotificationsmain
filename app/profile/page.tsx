"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, LogOut, ArrowLeft, Settings } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.email?.split("@")[0] || "",
    email: user?.email || "",
    phone: "+91 98765 43210",
    address: "Madras Engineering College, Chennai",
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl mb-4">Please login to view your profile</p>
          <Button onClick={() => router.push("/login")} className="bg-gradient-to-r from-purple-500 to-pink-500">
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      {/* Header */}
      <div className="bg-purple-950/50 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg bg-purple-700/40 hover:bg-purple-600/40 text-purple-200 transition"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Profile
            </h1>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        {/* Profile Card */}
        <Card className="bg-purple-900/40 border-purple-500/30 mb-8 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-2xl">Profile Information</CardTitle>
              <Button onClick={() => setIsEditing(!isEditing)} variant="outline" size="sm">
                <Settings size={16} className="mr-2" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Avatar */}
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center border-4 border-purple-400/30">
                  <User size={48} className="text-white" />
                </div>
              </div>

              {/* Profile Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-purple-300 text-sm font-semibold mb-2 block">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-purple-800/40 border border-purple-500/30 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-400"
                    />
                  ) : (
                    <p className="text-white text-lg">{formData.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-purple-300 text-sm font-semibold mb-2 block flex items-center gap-2">
                    <Mail size={16} />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 bg-purple-800/40 border border-purple-500/30 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-400"
                    />
                  ) : (
                    <p className="text-white text-lg">{formData.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-purple-300 text-sm font-semibold mb-2 block">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 bg-purple-800/40 border border-purple-500/30 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-400"
                    />
                  ) : (
                    <p className="text-white text-lg">{formData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="text-purple-300 text-sm font-semibold mb-2 block">Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2 bg-purple-800/40 border border-purple-500/30 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-400"
                    />
                  ) : (
                    <p className="text-white text-lg">{formData.address}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4 pt-4">
                  <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Save Changes
                  </Button>
                  <Button onClick={() => setIsEditing(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-purple-900/40 border-purple-500/30 backdrop-blur">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-purple-300 text-sm mb-2">Total Orders</p>
                <p className="text-3xl font-bold text-white">12</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-900/40 border-purple-500/30 backdrop-blur">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-purple-300 text-sm mb-2">Total Spent</p>
                <p className="text-3xl font-bold text-pink-400">₹2,340</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-900/40 border-purple-500/30 backdrop-blur">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-purple-300 text-sm mb-2">Member Since</p>
                <p className="text-lg font-bold text-white">Jan 2024</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

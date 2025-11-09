"use client"

import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import UserDashboard from "@/components/dashboards/user-dashboard"
import ChefDashboard from "@/components/dashboards/chef-dashboard"
import ManagerDashboard from "@/components/dashboards/manager-dashboard"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  return (
    <div>
      {user.role === "user" && <UserDashboard />}
      {user.role === "chef" && <ChefDashboard />}
      {user.role === "manager" && <ManagerDashboard />}
    </div>
  )
}

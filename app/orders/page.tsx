"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useNotifications } from "@/context/notification-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Bell, CheckCircle, Package, AlertCircle } from "lucide-react"
import { useEffect } from "react"

export default function OrdersPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { notifications, markAsRead, clearNotifications } = useNotifications()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order_placed":
        return <Package className="w-6 h-6 text-blue-500" />
      case "order_ready":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "payment_success":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "order_received":
        return <AlertCircle className="w-6 h-6 text-yellow-500" />
      default:
        return <Bell className="w-6 h-6 text-purple-500" />
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      {/* Header */}
      <div className="bg-purple-950/50 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.back()}
              variant="outline"
              size="sm"
              className="border-purple-400 text-purple-300 hover:bg-purple-800"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                📬 Your Notifications
              </h1>
              <p className="text-xs text-purple-300">Stay updated with your orders</p>
            </div>
          </div>
          {notifications.length > 0 && (
            <Button
              onClick={clearNotifications}
              variant="outline"
              size="sm"
              className="border-purple-400 text-purple-300 hover:bg-purple-800 bg-transparent"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        {notifications.length === 0 ? (
          <Card className="bg-purple-900/40 border-purple-500/30">
            <CardContent className="pt-8 pb-8 text-center">
              <Bell size={48} className="mx-auto mb-4 text-purple-400 opacity-50" />
              <p className="text-purple-200 text-lg">No notifications yet</p>
              <p className="text-purple-300 text-sm mt-2">Orders and updates will appear here</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`border-purple-500/30 cursor-pointer transition ${
                  notification.read
                    ? "bg-purple-900/20"
                    : "bg-purple-900/40 border-purple-400/60 shadow-lg shadow-purple-500/20"
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-white">{notification.title}</h3>
                        <span className="text-xs text-purple-300">{formatTime(notification.timestamp)}</span>
                      </div>
                      <p className="text-purple-200 text-sm mb-2">{notification.message}</p>
                      {notification.orderNumber && (
                        <div className="flex gap-4 text-xs text-purple-300">
                          {notification.orderNumber && <span>Order #: {notification.orderNumber}</span>}
                          {notification.amount && <span>Amount: ₹{notification.amount}</span>}
                        </div>
                      )}
                      {!notification.read && (
                        <div className="mt-2 inline-block px-2 py-1 bg-purple-500 rounded text-xs text-white">New</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useNotifications } from "@/context/notification-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { LogOut, Bell, Calculator, Plus, UtensilsCrossed, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Calculator as CalculatorComponent } from "@/components/calculator"
import Image from "next/image"

const SAMPLE_ORDERS = [
  { id: "#001", items: "Biryani x2, Naan x1", status: "pending", time: "5 mins", user: "user1@mec.college" },
  { id: "#002", items: "Butter Chicken x1, Dosa x2", status: "preparing", time: "15 mins", user: "user2@mec.college" },
  { id: "#003", items: "Samosa x3", status: "preparing", time: "8 mins", user: "user3@mec.college" },
]

interface MenuItem {
  id: string
  name: string
  price: number
  category: string
}

export default function ChefDashboard() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { addNotification } = useNotifications()
  const [orders, setOrders] = useState(SAMPLE_ORDERS)

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: "1", name: "Chicken Biryani", price: 200, category: "Non-Veg" },
    { id: "2", name: "Samosa", price: 30, category: "Special" },
    { id: "3", name: "Butter Chicken", price: 250, category: "Non-Veg" },
    { id: "4", name: "Paneer Tikka", price: 180, category: "Veg" },
  ])
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "Veg" })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const markReady = (orderId: string, userEmail: string) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: "ready" } : order)))

    addNotification({
      type: "order_ready",
      title: "Order Ready!",
      message: `Your order ${orderId} is ready for pickup. Please collect from the counter.`,
      orderNumber: orderId,
    })
  }

  const handleAddItem = () => {
    if (newItem.name && newItem.price && newItem.category) {
      const item: MenuItem = {
        id: Date.now().toString(),
        name: newItem.name,
        price: Number.parseFloat(newItem.price),
        category: newItem.category,
      }
      setMenuItems((prev) => [...prev, item])
      setNewItem({ name: "", price: "", category: "Veg" })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100">
      <div className="bg-white/80 backdrop-blur-md border-b border-primary/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mec-J23JBwT6PADUBOLuFmKRWWKN15UplU.png"
              alt="MEC Logo"
              width={48}
              height={48}
            />
            <div>
              <h1 className="text-2xl font-bold text-primary">Chef Dashboard</h1>
              <p className="text-sm text-muted-foreground">MEC Canteen Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl bg-white/50 hover:bg-white">
                  <Calculator size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Quick Calculator</DialogTitle>
                </DialogHeader>
                <CalculatorComponent />
              </DialogContent>
            </Dialog>
            <Button
              onClick={() => {
                logout()
                router.push("/login")
              }}
              variant="outline"
              className="rounded-xl bg-white/50 hover:bg-white"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white/60 backdrop-blur rounded-2xl p-6 mb-8 border border-primary/10">
          <p className="text-foreground">
            Logged in as: <span className="font-semibold text-primary">{user?.email}</span>
          </p>
        </div>

        <Card className="border-primary/20 shadow-lg mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <UtensilsCrossed size={20} className="text-primary" />
                </div>
                <CardTitle className="text-foreground">Daily Menu Update</CardTitle>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 rounded-xl">
                    <Plus size={16} className="mr-2" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Menu Item</DialogTitle>
                    <DialogDescription>Add today's menu item with pricing</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label>Item Name</Label>
                      <Input
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        placeholder="e.g., Paneer Tikka"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Price (₹)</Label>
                      <Input
                        type="number"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        placeholder="e.g., 180"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <select
                        value={newItem.category}
                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                        className="w-full mt-1 p-2 border rounded-lg"
                      >
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                        <option value="Combo">Combo Offers</option>
                        <option value="Special">Special Offers</option>
                      </select>
                    </div>
                    <Button onClick={handleAddItem} className="w-full">
                      Add to Menu
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 bg-muted/50 rounded-xl hover:bg-muted transition"
                >
                  <div>
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <Badge variant="outline" className="mt-1">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-primary">₹{item.price}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <h2 className="text-xl font-bold text-foreground mb-4">Order Management</h2>
        <div className="grid gap-6">
          {orders.map((order) => (
            <Card key={order.id} className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">{order.id}</CardTitle>
                    <CardDescription className="text-muted-foreground mt-1">{order.items}</CardDescription>
                    <p className="text-xs text-muted-foreground mt-2">Customer: {order.user}</p>
                  </div>
                  <Badge
                    className={
                      order.status === "pending"
                        ? "bg-yellow-500"
                        : order.status === "preparing"
                          ? "bg-blue-500"
                          : "bg-green-500"
                    }
                  >
                    {order.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Estimated time: {order.time}</span>
                  {order.status !== "ready" && (
                    <Button
                      onClick={() => markReady(order.id, order.user)}
                      className="bg-primary hover:bg-primary/90 rounded-xl shadow-md"
                    >
                      <Bell size={16} className="mr-2" />
                      Mark Ready & Notify
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

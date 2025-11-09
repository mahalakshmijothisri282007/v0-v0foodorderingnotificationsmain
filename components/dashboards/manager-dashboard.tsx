"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { LogOut, BarChart3, Plus, Calculator, Trash2, UtensilsCrossed, Receipt } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calculator as CalculatorComponent } from "@/components/calculator"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MenuItem {
  id: string
  name: string
  price: number
  category: string
}

interface Transaction {
  id: string
  orderNumber: string
  amount: number
  date: string
  customer: string
  status: string
}

export default function ManagerDashboard() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: "1", name: "Chicken Biryani", price: 200, category: "Non-Veg" },
    { id: "2", name: "Samosa", price: 30, category: "Special" },
    { id: "3", name: "Butter Chicken", price: 250, category: "Non-Veg" },
    { id: "4", name: "Paneer Tikka", price: 180, category: "Veg" },
  ])
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "Veg" })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [transactions] = useState<Transaction[]>([
    {
      id: "TXN001",
      orderNumber: "#001",
      amount: 450,
      date: "2025-01-09",
      customer: "user1@mec.college",
      status: "Completed",
    },
    {
      id: "TXN002",
      orderNumber: "#002",
      amount: 380,
      date: "2025-01-09",
      customer: "user2@mec.college",
      status: "Completed",
    },
    {
      id: "TXN003",
      orderNumber: "#003",
      amount: 90,
      date: "2025-01-09",
      customer: "user3@mec.college",
      status: "Pending",
    },
  ])

  const handleLogout = () => {
    logout()
    router.push("/login")
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

  const totalRevenue = transactions.reduce((sum, txn) => sum + txn.amount, 0)
  const completedTransactions = transactions.filter((t) => t.status === "Completed").length

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
              <h1 className="text-2xl font-bold text-primary">Manager Dashboard</h1>
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
            <Button onClick={handleLogout} variant="outline" className="rounded-xl bg-white/50 hover:bg-white">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Orders", value: "142", color: "from-purple-500 to-violet-500" },
            { label: "Revenue", value: `₹${totalRevenue}`, color: "from-green-500 to-emerald-500" },
            { label: "Active Users", value: "45", color: "from-blue-500 to-cyan-500" },
            { label: "Menu Items", value: menuItems.length.toString(), color: "from-pink-500 to-rose-500" },
          ].map((stat, i) => (
            <Card key={i} className="border-primary/20 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} opacity-20`}></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur">
            <TabsTrigger value="menu">Daily Menu</TabsTrigger>
            <TabsTrigger value="billing">Billing & Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="menu">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <UtensilsCrossed size={20} className="text-primary" />
                    </div>
                    <CardTitle className="text-foreground">Daily Menu Management</CardTitle>
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
                        <DialogTitle>Add New Menu Item</DialogTitle>
                        <DialogDescription>Add a new item to today's menu with pricing</DialogDescription>
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
          </TabsContent>

          <TabsContent value="billing">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Receipt size={20} className="text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">Billing & Transaction Management</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">View and manage all transactions</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold text-green-700">₹{totalRevenue}</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold text-blue-700">{completedTransactions}</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold text-purple-700">
                        {transactions.length - completedTransactions}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {transactions.map((txn) => (
                      <div
                        key={txn.id}
                        className="flex justify-between items-center p-4 bg-muted/50 rounded-xl hover:bg-muted transition"
                      >
                        <div>
                          <p className="font-semibold text-foreground">{txn.id}</p>
                          <p className="text-sm text-muted-foreground">
                            Order: {txn.orderNumber} • {txn.customer}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{txn.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-primary">₹{txn.amount}</span>
                          <Badge className={txn.status === "Completed" ? "bg-green-500" : "bg-yellow-500"}>
                            {txn.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BarChart3 size={20} className="text-primary" />
                  </div>
                  <CardTitle className="text-foreground">Sales Analytics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Top Selling Items</h3>
                  {[
                    { name: "Biryani", sales: "45", revenue: "₹9,000" },
                    { name: "Butter Chicken", sales: "38", revenue: "₹9,500" },
                    { name: "Tandoori Chicken", sales: "32", revenue: "₹7,040" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-3 border-b border-border last:border-0"
                    >
                      <span className="text-foreground font-medium">{item.name}</span>
                      <div className="flex gap-8">
                        <span className="text-muted-foreground">{item.sales} sold</span>
                        <span className="text-primary font-semibold">{item.revenue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

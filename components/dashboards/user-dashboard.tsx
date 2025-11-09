"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useCart } from "@/context/cart-context"
import { useNotifications } from "@/context/notification-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Bell, ShoppingCart, User, Star, Settings, History, LogOut, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

const MENU_ITEMS = [
  { id: "1", name: "Paneer Tikka", price: 180, image: "/paneer-tikka.png", category: "Veg" },
  { id: "4", name: "Masala Dosa", price: 100, image: "/masala-dosa.png", category: "Veg" },
  { id: "7", name: "Crispy Dosa", price: 80, image: "/crispy-dosa.png", category: "Veg" },
  { id: "9", name: "Chole Bhature", price: 120, image: "/chole-bhature.jpg", category: "Veg" },
  { id: "10", name: "Idli", price: 40, image: "/fluffy-idli.png", category: "Veg" },
  { id: "11", name: "Vada Pav", price: 60, image: "/vada-pav.png", category: "Veg" },
  { id: "2", name: "Chicken Biryani", price: 200, image: "/flavorful-biryani.png", category: "Non-Veg" },
  { id: "3", name: "Butter Chicken", price: 250, image: "/butter-chicken.png", category: "Non-Veg" },
  { id: "8", name: "Tandoori Chicken", price: 220, image: "/tandoori-chicken.png", category: "Non-Veg" },
  { id: "12", name: "Biryani + Raita Combo", price: 230, image: "/flavorful-biryani.png", category: "Combo" },
  { id: "13", name: "Meal Combo", price: 180, image: "/pulao.jpg", category: "Combo" },
  { id: "5", name: "Samosa (3 pcs)", price: 30, image: "/crispy-golden-samosas.png", category: "Special" },
  { id: "6", name: "Garlic Naan", price: 50, image: "/naan-bread.png", category: "Special" },
]

export default function UserDashboard() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { cartItems, addToCart, removeFromCart, clearCart, totalPrice } = useCart()
  const { notifications, markAsRead } = useNotifications()
  const [showCart, setShowCart] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const [userProfile, setUserProfile] = useState({
    name: "Student User",
    email: user?.email || "",
    contact: "+91 9876543210",
    allergies: "",
  })

  const [preferences, setPreferences] = useState({
    spiceLevel: "medium",
    dietary: "none",
    allergies: "",
  })

  const [feedback, setFeedback] = useState({
    rating: 5,
    comments: "",
  })
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false)
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const [orderHistory] = useState([
    { id: "#001", items: "Biryani, Raita", total: 230, date: "2025-01-09", status: "Completed" },
    { id: "#002", items: "Paneer Tikka, Naan", total: 230, date: "2025-01-08", status: "Completed" },
    { id: "#003", items: "Dosa, Samosa", total: 110, date: "2025-01-07", status: "Ready" },
  ])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleSubmitFeedback = () => {
    setFeedbackSubmitted(true)
    setTimeout(() => {
      setIsFeedbackOpen(false)
      setFeedbackSubmitted(false)
      setFeedback({ rating: 5, comments: "" })
    }, 2000)
  }

  const handleCancelOrder = () => {
    clearCart()
    setShowCart(false)
  }

  const filteredItems =
    selectedCategory === "All" ? MENU_ITEMS : MENU_ITEMS.filter((item) => item.category === selectedCategory)

  const categories = ["All", "Veg", "Non-Veg", "Combo", "Special"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100 relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-blob"></div>
      </div>

      <div className="bg-white/80 backdrop-blur-md border-b border-primary/10 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mec-J23JBwT6PADUBOLuFmKRWWKN15UplU.png"
              alt="MEC Logo"
              width={48}
              height={48}
            />
            <div>
              <h1 className="text-2xl font-bold text-primary">MEC Canteen</h1>
              <p className="text-xs text-muted-foreground">Madras Engineering College</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl bg-white/50 hover:bg-white">
                  <History size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Order History</DialogTitle>
                  <DialogDescription>View your past orders</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 mt-4">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-4 bg-muted/50 rounded-xl">
                      <div>
                        <p className="font-semibold text-foreground">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.items}</p>
                        <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">₹{order.total}</p>
                        <Badge className={order.status === "Completed" ? "bg-green-500" : "bg-yellow-500"}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isCustomizeOpen} onOpenChange={setIsCustomizeOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl bg-white/50 hover:bg-white">
                  <Settings size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Customize Your Experience</DialogTitle>
                  <DialogDescription>Set your food preferences and dietary requirements</DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="preferences" className="mt-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="dietary">Dietary</TabsTrigger>
                  </TabsList>
                  <TabsContent value="preferences" className="space-y-4">
                    <div>
                      <Label>Spice Level</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {["mild", "medium", "spicy"].map((level) => (
                          <Button
                            key={level}
                            variant={preferences.spiceLevel === level ? "default" : "outline"}
                            onClick={() => setPreferences({ ...preferences, spiceLevel: level })}
                            className="capitalize"
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="dietary" className="space-y-4">
                    <div>
                      <Label>Dietary Preference</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {["none", "vegetarian", "vegan", "halal"].map((diet) => (
                          <Button
                            key={diet}
                            variant={preferences.dietary === diet ? "default" : "outline"}
                            onClick={() => setPreferences({ ...preferences, dietary: diet })}
                            className="capitalize"
                          >
                            {diet}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>Allergies</Label>
                      <Textarea
                        value={preferences.allergies}
                        onChange={(e) => setPreferences({ ...preferences, allergies: e.target.value })}
                        placeholder="e.g., nuts, dairy, shellfish"
                        className="mt-1"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
                <Button onClick={() => setIsCustomizeOpen(false)} className="w-full mt-4">
                  Save Preferences
                </Button>
              </DialogContent>
            </Dialog>

            <Dialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl bg-white/50 hover:bg-white">
                  <Star size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Your Feedback</DialogTitle>
                  <DialogDescription>Help us improve your dining experience</DialogDescription>
                </DialogHeader>
                {feedbackSubmitted ? (
                  <div className="py-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="text-green-600" size={32} />
                    </div>
                    <p className="text-lg font-semibold text-foreground">Thank you for your feedback!</p>
                    <p className="text-sm text-muted-foreground mt-2">Your opinion helps us serve you better</p>
                  </div>
                ) : (
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label>Rating</Label>
                      <div className="flex gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setFeedback({ ...feedback, rating: star })}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              size={32}
                              className={star <= feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>Comments</Label>
                      <Textarea
                        value={feedback.comments}
                        onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
                        placeholder="Tell us about your experience..."
                        rows={4}
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={handleSubmitFeedback} className="w-full">
                      Submit Feedback
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            <Dialog open={showCart} onOpenChange={setShowCart}>
              <DialogTrigger asChild>
                <button className="relative p-2 rounded-xl bg-white/50 hover:bg-white text-foreground transition border border-border">
                  <ShoppingCart size={20} />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-semibold">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Shopping Cart</DialogTitle>
                  <DialogDescription>Review and manage your cart items</DialogDescription>
                </DialogHeader>
                {cartItems.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground">Your cart is empty</div>
                ) : (
                  <div className="space-y-4 mt-4">
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-xl">
                          <div className="flex-1">
                            <p className="font-semibold text-foreground">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-primary">₹{item.price * item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                              className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between text-foreground font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-primary">₹{totalPrice}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={handleCancelOrder}
                        className="flex-1 border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
                      >
                        Cancel Order
                      </Button>
                      <Button onClick={() => router.push("/checkout")} className="flex-1">
                        Proceed to Checkout
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
              <DialogTrigger asChild>
                <button className="relative p-2 rounded-xl bg-white/50 hover:bg-white text-foreground transition border border-border">
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center animate-bounce font-semibold">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Notifications</DialogTitle>
                  <DialogDescription>Stay updated with your orders</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 mt-4 max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No notifications yet</p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markAsRead(notif.id)}
                        className={`p-4 rounded-xl cursor-pointer transition ${
                          notif.read ? "bg-muted/30" : "bg-primary/10 border-2 border-primary/30"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-foreground">{notif.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(notif.timestamp).toLocaleString()}
                            </p>
                          </div>
                          {!notif.read && <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
              <DialogTrigger asChild>
                <button className="p-2 rounded-xl bg-white/50 hover:bg-white text-foreground transition border border-border">
                  <User size={20} />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>User Profile</DialogTitle>
                  <DialogDescription>View and update your personal information</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={userProfile.name}
                      onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Contact Info</Label>
                    <Input
                      value={userProfile.contact}
                      onChange={(e) => setUserProfile({ ...userProfile, contact: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={userProfile.email} disabled className="mt-1 bg-muted" />
                  </div>
                  <div>
                    <Label>Allergies/Preferences</Label>
                    <Textarea
                      value={userProfile.allergies}
                      onChange={(e) => setUserProfile({ ...userProfile, allergies: e.target.value })}
                      placeholder="List any food allergies or special dietary needs"
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <Button onClick={() => setIsProfileOpen(false)} className="w-full">
                    Save Profile
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full text-destructive border-destructive hover:bg-destructive/10 bg-transparent"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="bg-white/60 backdrop-blur rounded-2xl p-6 mb-8 border border-primary/10">
          <p className="text-foreground">
            Welcome, <span className="font-semibold text-primary">{userProfile.name}</span>
          </p>
          {preferences.dietary !== "none" && (
            <p className="text-sm text-muted-foreground mt-1">
              Dietary preference: <span className="capitalize font-medium">{preferences.dietary}</span>
            </p>
          )}
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className="rounded-xl whitespace-nowrap"
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="border-primary/20 hover:border-primary/40 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-40 bg-gradient-to-br from-purple-100 to-violet-100 rounded-t-xl overflow-hidden">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                <Badge className="absolute top-2 right-2 bg-primary">{item.category}</Badge>
              </div>
              <CardContent className="pt-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold text-lg">₹{item.price}</span>
                  <Button
                    onClick={() =>
                      addToCart({ id: item.id, name: item.name, price: item.price, quantity: 1, image: item.image })
                    }
                    size="sm"
                    className="bg-primary hover:bg-primary/90 rounded-xl"
                  >
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

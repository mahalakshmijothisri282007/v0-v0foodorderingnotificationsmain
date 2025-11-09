"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { useNotifications } from "@/context/notification-context"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, totalPrice, clearCart } = useCart()
  const { addNotification } = useNotifications()
  const { user } = useAuth()
  const [address, setAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "gpay">("upi")
  const [upiId, setUpiId] = useState("")
  const [gpayPhone, setGpayPhone] = useState("")
  const [loading, setLoading] = useState(false)

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <Card className="bg-purple-900/40 border-purple-500/30">
          <CardContent className="pt-6 text-center">
            <p className="text-purple-200 mb-4">Your cart is empty</p>
            <Button onClick={() => router.push("/dashboard")} variant="outline">
              Back to Menu
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address) {
      alert("Please enter delivery address")
      return
    }
    if (paymentMethod === "upi" && !upiId) {
      alert("Please enter UPI ID")
      return
    }
    if (paymentMethod === "gpay" && !gpayPhone) {
      alert("Please enter phone number")
      return
    }

    setLoading(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const orderId = `#${Math.floor(Math.random() * 10000)}`
    addNotification({
      type: "order_placed",
      title: "Order Placed!",
      message: `Your order ${orderId} has been confirmed`,
      orderNumber: orderId,
      amount: totalPrice,
    })

    addNotification({
      type: "payment_success",
      title: "Payment Successful",
      message: `Payment of ₹${totalPrice} via ${paymentMethod.toUpperCase()} completed`,
      amount: totalPrice,
    })

    clearCart()
    setLoading(false)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-purple-300 hover:text-purple-200 mb-6"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="grid gap-6">
          {/* Order Summary */}
          <Card className="bg-purple-900/40 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-purple-200">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t border-purple-500/20 pt-3 flex justify-between text-purple-300 font-bold">
                  <span>Total:</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checkout Form */}
          <Card className="bg-purple-900/40 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">Delivery Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-6">
                <div>
                  <label className="block text-purple-200 text-sm font-medium mb-2">Delivery Address</label>
                  <Input
                    placeholder="Enter your delivery address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-purple-700/40 border-purple-500/30 text-white placeholder:text-purple-400"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-purple-200 text-sm font-medium mb-3">Payment Method</label>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {["upi", "gpay"].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method as "upi" | "gpay")}
                        className={`py-3 px-4 rounded-lg font-medium transition ${
                          paymentMethod === method
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                            : "bg-purple-700/40 text-purple-200 hover:bg-purple-600/40"
                        }`}
                      >
                        {method === "upi" ? "📱 UPI" : "💳 Google Pay"}
                      </button>
                    ))}
                  </div>

                  {paymentMethod === "upi" && (
                    <Input
                      placeholder="Enter UPI ID (user@upi)"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="bg-purple-700/40 border-purple-500/30 text-white placeholder:text-purple-400"
                    />
                  )}

                  {paymentMethod === "gpay" && (
                    <Input
                      placeholder="Enter phone number"
                      value={gpayPhone}
                      onChange={(e) => setGpayPhone(e.target.value)}
                      className="bg-purple-700/40 border-purple-500/30 text-white placeholder:text-purple-400"
                    />
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
                >
                  {loading ? "Processing..." : `Pay ₹${totalPrice}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

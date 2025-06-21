"use client"

import { X, Plus, Minus, ShoppingCart, CreditCard, Shield, Truck, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"

export const CartModal = ({
  showCart,
  setShowCart,
  cart,
  updateCartQuantity,
  removeFromCart,
  getTotalItems,
  getTotalPrice,
}) => {
  if (!showCart) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCart(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-gray-900 text-white border-l border-gray-700 animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-red-600/20 to-yellow-500/20">
            <div>
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <p className="text-xs text-gray-400">{getTotalItems()} items</p>
            </div>
            <button
              onClick={() => setShowCart(false)}
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-400 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-4">Add some amazing products!</p>
                <Button
                  onClick={() => setShowCart(false)}
                  className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center space-x-3 bg-gray-800 p-3 rounded-xl border border-gray-700"
                  >
                    <div className="text-3xl">{item.image}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white text-sm leading-tight">{item.name}</h4>
                      <p className="text-yellow-500 font-semibold text-sm">${item.price}</p>
                      <p className="text-xs text-gray-400">{item.supplierName}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateCartQuantity(item._id, -1)}
                        className="w-7 h-7 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item._id, 1)}
                        className="w-7 h-7 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="w-7 h-7 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-700 p-4 bg-gradient-to-r from-red-600/10 to-yellow-500/10">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-3xl font-bold text-yellow-500">${getTotalPrice().toFixed(2)}</span>
                </div>

                <Button className="w-full bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white py-3 text-lg font-semibold">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Checkout Now
                </Button>

                <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Truck className="w-3 h-3" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Gift className="w-3 h-3" />
                    <span>Free Returns</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

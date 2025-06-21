"use client"

import { X, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export const WishlistModal = ({ showWishlist, setShowWishlist, wishlist, toggleWishlist }) => {
  if (!showWishlist) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowWishlist(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-gray-900 text-white border-l border-gray-700 animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-red-600/20 to-yellow-500/20">
            <h2 className="text-lg font-semibold">Wishlist</h2>
            <button
              onClick={() => setShowWishlist(false)}
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-400 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-500 mb-4">Add some amazing products!</p>
                <Button
                  onClick={() => setShowWishlist(false)}
                  className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlist.map((item) => (
                  <div key={item._id} className="flex items-center space-x-3 bg-gray-800 p-3 rounded-xl">
                    <div className="text-3xl">{item.image}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{item.name}</h4>
                      <p className="text-sm text-gray-400">${item.price}</p>
                      <p className="text-xs text-gray-500">{item.supplierName}</p>
                    </div>
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="border-t border-gray-700 p-4">
            <Button
              onClick={() => setShowWishlist(false)}
              className="w-full bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

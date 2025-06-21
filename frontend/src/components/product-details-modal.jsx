"use client"

import { X, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export const ProductDetailsModal = ({
  showProductDetails,
  setShowProductDetails,
  currentProduct,
  currentSupplier,
  addToCart,
}) => {
  if (!showProductDetails) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowProductDetails(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 text-white border-l border-gray-700 animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-red-600/20 to-yellow-500/20">
            <h2 className="text-lg font-semibold">Product Details</h2>
            <button
              onClick={() => setShowProductDetails(false)}
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {/* Product Image and Name */}
              <div className="flex items-center space-x-4">
                <div className="text-5xl">{currentProduct?.image}</div>
                <div>
                  <h3 className="text-xl font-semibold">{currentProduct?.name}</h3>
                  <p className="text-sm text-gray-400">{currentSupplier?.name}</p>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-yellow-500">${currentProduct?.price}</span>
                  {currentProduct?.originalPrice > currentProduct?.price && (
                    <>
                      <span className="text-lg text-gray-400 line-through">${currentProduct?.originalPrice}</span>
                      <div className="bg-red-600 px-2 py-1 rounded-full text-xs font-bold">
                        -{currentProduct?.discount}%
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-800 rounded-xl p-4">
                <h4 className="text-lg font-semibold mb-2">Description</h4>
                <p className="text-sm text-gray-300">{currentProduct?.description}</p>
              </div>

              {/* Stock */}
              <div className="bg-gray-800 rounded-xl p-4">
                <h4 className="text-lg font-semibold mb-2">Availability</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">In Stock</span>
                  <span className="text-sm font-bold text-green-500">{currentProduct?.stockQuantity} units</span>
                </div>
              </div>

              {/* Rating and Reviews */}
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold">Rating & Reviews</h4>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-bold">{currentProduct?.rating}</span>
                    <span className="text-xs text-gray-400">({currentProduct?.totalReviews} reviews)</span>
                  </div>
                </div>
                <p className="text-sm text-gray-300">{currentProduct?.views} people have viewed this product.</p>
              </div>

              {/* Category */}
              <div className="bg-gray-800 rounded-xl p-4">
                <h4 className="text-lg font-semibold mb-2">Category</h4>
                <span className="inline-block bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-sm">
                  {currentProduct?.category}
                </span>
              </div>

              {/* Supplier Info */}
              <div className="bg-gray-800 rounded-xl p-4">
                <h4 className="text-lg font-semibold mb-2">Supplier Information</h4>
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{currentSupplier?.image}</div>
                  <div>
                    <h5 className="text-md font-semibold">{currentSupplier?.name}</h5>
                    <p className="text-sm text-gray-400">{currentSupplier?.username}</p>
                    <p className="text-xs text-gray-500">{currentSupplier?.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="border-t border-gray-700 p-4">
            <Button
              onClick={() => {
                addToCart(currentProduct)
                setShowProductDetails(false)
              }}
              className="w-full bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

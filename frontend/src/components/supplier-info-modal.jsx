"use client"

import { X, Award, MapPin, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const SupplierInfoModal = ({
  showSupplierInfo,
  setShowSupplierInfo,
  currentSupplier,
  products,
  setCurrentProductIndex,
  setShowProductDetails,
}) => {
  if (!showSupplierInfo) return null

  const supplierProducts = products.filter((product) => product.supplierId === currentSupplier?._id)

  const handleProductClick = (productIndex) => {
    const globalIndex = products.findIndex((p) => p._id === supplierProducts[productIndex]._id)
    setCurrentProductIndex(globalIndex)
    setShowSupplierInfo(false)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowSupplierInfo(false)} />
      <div className="absolute left-0 top-0 h-full w-full max-w-md bg-gray-900 text-white border-r border-gray-700 animate-slide-in-left">
        <div className="flex flex-col h-full">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-red-600/20 to-yellow-500/20">
            <h2 className="text-lg font-semibold">Supplier Information</h2>
            <button
              onClick={() => setShowSupplierInfo(false)}
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {/* Supplier Header */}
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="text-5xl">{currentSupplier?.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-xl font-semibold">{currentSupplier?.name}</h3>
                      {currentSupplier?.verified && <Award className="w-5 h-5 text-yellow-500" />}
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{currentSupplier?.username}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{currentSupplier?.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{currentSupplier?.followers}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-3">{currentSupplier?.description}</p>
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{currentSupplier?.responseTime}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="bg-gray-800 rounded-xl p-4">
                <h4 className="text-lg font-semibold mb-2">Rating</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-yellow-500">{currentSupplier?.rating}</span>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(currentSupplier?.rating || 0) ? "text-yellow-500" : "text-gray-600"
                        }`}
                      >
                        ⭐
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">({currentSupplier?.totalReviews} reviews)</span>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-gray-800 rounded-xl p-4">
                <h4 className="text-lg font-semibold mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {currentSupplier?.categories?.map((category, index) => (
                    <Badge key={index} className="bg-yellow-500/20 text-yellow-500 text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Products */}
              <div className="bg-gray-800 rounded-xl p-4">
                <h4 className="text-lg font-semibold mb-3">Products ({supplierProducts.length})</h4>
                <div className="grid grid-cols-2 gap-3">
                  {supplierProducts.map((product, index) => (
                    <button
                      key={product._id}
                      onClick={() => handleProductClick(index)}
                      className="bg-gray-700 rounded-xl p-3 hover:bg-gray-600 transition-colors text-left"
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{product.image}</div>
                        <h5 className="text-sm font-semibold mb-1 line-clamp-2">{product.name}</h5>
                        <p className="text-lg font-bold text-yellow-500">${product.price}</p>
                        {product.trending && (
                          <Badge className="bg-red-500/20 text-red-500 text-xs mt-1">Trending</Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="border-t border-gray-700 p-4">
            <Button
              onClick={() => setShowSupplierInfo(false)}
              className="w-full bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white"
            >
              View All Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

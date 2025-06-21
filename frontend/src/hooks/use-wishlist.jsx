"use client"

import { useState } from "react"

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([])

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item._id === product._id)
      if (!exists) {
        return [...prev, product]
      }
      return prev.filter((item) => item._id !== product._id)
    })
  }

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId)
  }

  return {
    wishlist,
    toggleWishlist,
    isInWishlist,
  }
}

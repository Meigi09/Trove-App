"use client"

import { useState } from "react"

export const useCart = () => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id)
      if (existingItem) {
        return prevCart.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const updateCartQuantity = (productId, change) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: Math.max(1, item.quantity + change) } : item,
      ),
    )
  }

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId))
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return {
    cart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
  }
}

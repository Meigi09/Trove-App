"use client"

import { useState, useRef, useCallback } from "react"
import { ShoppingCart, Heart, Home, Gamepad2, Coins } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { MobileContent } from "@/components/mobile-content"
import { GameCenter } from "@/components/game-center"
import { CartModal } from "@/components/cart-modal"
import { WishlistModal } from "@/components/wishlist-modal"
import { ProductDetailsModal } from "@/components/product-details-modal"
import { SupplierInfoModal } from "@/components/supplier-info-modal"
import { ChatModal } from "@/components/chat-modal"
import { ProfileModal } from "@/components/profile-modal"
import { useGameProfile } from "@/hooks/use-game-profile"
import { useProducts } from "@/hooks/use-products"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"

export const CustomerPage = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [showProductDetails, setShowProductDetails] = useState(false)
  const [showSupplierInfo, setShowSupplierInfo] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showWishlist, setShowWishlist] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showGameCenter, setShowGameCenter] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [likedProducts, setLikedProducts] = useState(new Set())
  const [activeTab, setActiveTab] = useState("home")

  // Custom hooks
  const { gameProfile, addXP, addCoins, completeQuest, notifications, setNotifications } = useGameProfile()
  const { products, suppliers } = useProducts()
  const { cart, addToCart, updateCartQuantity, removeFromCart, getTotalItems, getTotalPrice } = useCart()
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist()

  const containerRef = useRef(null)
  const startY = useRef(0)
  const currentY = useRef(0)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const currentX = useRef(0)

  const currentProduct = products[currentProductIndex]
  const currentSupplier = suppliers.find((s) => s._id === currentProduct?.supplierId)

  // Enhanced interaction functions
  const nextProduct = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentProductIndex((prev) => (prev + 1) % products.length)
    setTimeout(() => setIsTransitioning(false), 300)
    addXP(5, "browsing products")
  }, [isTransitioning, products.length, addXP])

  const prevProduct = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentProductIndex((prev) => (prev - 1 + products.length) % products.length)
    setTimeout(() => setIsTransitioning(false), 300)
    addXP(5, "browsing products")
  }, [isTransitioning, products.length, addXP])

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY
    startX.current = e.touches[0].clientX
    isDragging.current = true
  }

  const handleTouchMove = (e) => {
    if (!isDragging.current) return
    currentY.current = e.touches[0].clientY
    currentX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!isDragging.current) return
    isDragging.current = false

    const deltaY = startY.current - currentY.current
    const deltaX = startX.current - currentX.current
    const threshold = 50

    if (Math.abs(deltaY) > threshold && Math.abs(deltaY) > Math.abs(deltaX)) {
      if (deltaY > 0) {
        nextProduct()
      } else {
        prevProduct()
      }
    } else if (Math.abs(deltaX) > threshold && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        setShowProductDetails(true)
      } else {
        setShowSupplierInfo(true)
      }
    }
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    addXP(product.xpReward || 15, "adding to cart")
    addCoins(10, "adding to cart")

    // Check daily quest
    const cartQuest = gameProfile.dailyQuests.find((q) => q.title.includes("cart"))
    if (cartQuest && !cartQuest.completed) {
      const newProgress = cartQuest.progress + 1
      if (newProgress >= cartQuest.target) {
        completeQuest(cartQuest.id)
        addXP(cartQuest.reward, "completing daily quest")
      }
    }
  }

  const toggleLike = (productId) => {
    setLikedProducts((prev) => {
      const newLiked = new Set(prev)
      const isLiking = !newLiked.has(productId)

      if (isLiking) {
        newLiked.add(productId)
        addXP(10, "liking a product")
        addCoins(5, "liking a product")

        // Check daily quest
        const likeQuest = gameProfile.dailyQuests.find((q) => q.title.includes("Like"))
        if (likeQuest && !likeQuest.completed) {
          const newProgress = likeQuest.progress + 1
          if (newProgress >= likeQuest.target) {
            completeQuest(likeQuest.id)
            addXP(likeQuest.reward, "completing daily quest")
          }
        }
      } else {
        newLiked.delete(productId)
      }

      return newLiked
    })
  }

  const shareProduct = async (product) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    }

    addXP(20, "sharing a product")
    addCoins(15, "sharing a product")

    // Check daily quest
    const shareQuest = gameProfile.dailyQuests.find((q) => q.title.includes("Share"))
    if (shareQuest && !shareQuest.completed) {
      const newProgress = shareQuest.progress + 1
      if (newProgress >= shareQuest.target) {
        completeQuest(shareQuest.id)
        addXP(shareQuest.reward, "completing daily quest")
      }
    }
  }

  const handleWishlist = (product) => {
    toggleWishlist(product)
    if (!isInWishlist(product._id)) {
      addXP(15, "adding to wishlist")
      addCoins(8, "adding to wishlist")
    }
  }

  if (!currentProduct) return null

  return (
    <>
      <div className="flex justify-center min-h-screen bg-black">
        {/* Desktop Container */}
        <div className="hidden lg:flex w-full max-w-7xl">
          {/* Left Sidebar */}
          <div className="w-64 bg-gray-900 text-white p-4 flex flex-col">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-yellow-500 rounded-xl flex items-center justify-center text-white font-bold">
                R
              </div>
              <div>
                <h1 className="text-lg font-bold">Rwanda Shop</h1>
                <p className="text-xs text-gray-400">Social Commerce</p>
              </div>
            </div>

            {/* Game Stats */}
            <div className="bg-gradient-to-r from-red-600/20 to-yellow-500/20 rounded-xl p-3 mb-6 border border-yellow-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Level {gameProfile.level}</span>
                <div className="flex items-center space-x-1">
                  <Coins className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-bold text-yellow-500">{gameProfile.coins}</span>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                <div
                  className="bg-gradient-to-r from-red-600 to-yellow-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(gameProfile.xp / gameProfile.totalXp) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{gameProfile.xp} XP</span>
                <span>{gameProfile.xpToNext} to next</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 mb-8">
              <button
                onClick={() => setActiveTab("home")}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                  activeTab === "home"
                    ? "bg-red-600/20 text-yellow-500"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Home className="w-5 h-5" />
                <span>For You</span>
              </button>
              <button
                onClick={() => setShowGameCenter(true)}
                className="w-full flex items-center space-x-3 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Gamepad2 className="w-5 h-5" />
                <span>Game Center</span>
                {gameProfile.dailyQuests.filter((q) => !q.completed).length > 0 && (
                  <Badge className="bg-yellow-500 text-black text-xs">
                    {gameProfile.dailyQuests.filter((q) => !q.completed).length}
                  </Badge>
                )}
              </button>
              <button
                onClick={() => setShowWishlist(true)}
                className="w-full flex items-center space-x-3 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
                {wishlist.length > 0 && <Badge className="bg-red-600 text-white text-xs">{wishlist.length}</Badge>}
              </button>
              <button
                onClick={() => setShowCart(true)}
                className="w-full flex items-center space-x-3 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
                {getTotalItems() > 0 && <Badge className="bg-yellow-500 text-black text-xs">{getTotalItems()}</Badge>}
              </button>
            </nav>

            {/* User Profile */}
            <div className="mt-auto">
              <button
                onClick={() => setShowProfile(true)}
                className="w-full flex items-center space-x-3 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full flex items-center justify-center text-sm font-bold">
                  👤
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">ShopperPro</p>
                  <p className="text-xs text-yellow-500">Level {gameProfile.level}</p>
                </div>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex justify-center bg-black">
            <div className="w-full max-w-sm bg-black relative">
              <MobileContent
                currentProduct={currentProduct}
                currentSupplier={currentSupplier}
                products={products}
                currentProductIndex={currentProductIndex}
                setCurrentProductIndex={setCurrentProductIndex}
                isTransitioning={isTransitioning}
                likedProducts={likedProducts}
                gameProfile={gameProfile}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                nextProduct={nextProduct}
                prevProduct={prevProduct}
                toggleLike={toggleLike}
                addToCart={handleAddToCart}
                shareProduct={shareProduct}
                toggleWishlist={handleWishlist}
                isInWishlist={isInWishlist}
                getTotalItems={getTotalItems}
                handleTouchStart={handleTouchStart}
                handleTouchMove={handleTouchMove}
                handleTouchEnd={handleTouchEnd}
                containerRef={containerRef}
                setShowProductDetails={setShowProductDetails}
                setShowSupplierInfo={setShowSupplierInfo}
                setShowCart={setShowCart}
                setShowWishlist={setShowWishlist}
                setShowChat={setShowChat}
                setShowProfile={setShowProfile}
                setShowGameCenter={setShowGameCenter}
                wishlist={wishlist}
              />
            </div>
          </div>

          {/* Right Sidebar - Simplified for desktop */}
          <div className="w-80 bg-white p-4 overflow-y-auto">
            <div className="space-y-6">
              {/* Current Product Info */}
              {currentProduct && (
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <h3 className="font-semibold text-red-600 mb-2">Now Viewing</h3>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{currentProduct.image}</div>
                    <div>
                      <p className="font-medium text-sm">{currentProduct.name}</p>
                      <p className="text-xs text-gray-600">{currentProduct.supplierName}</p>
                      <p className="text-lg font-bold text-yellow-600">${currentProduct.price}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden w-full">
          <MobileContent
            currentProduct={currentProduct}
            currentSupplier={currentSupplier}
            products={products}
            currentProductIndex={currentProductIndex}
            setCurrentProductIndex={setCurrentProductIndex}
            isTransitioning={isTransitioning}
            likedProducts={likedProducts}
            gameProfile={gameProfile}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            nextProduct={nextProduct}
            prevProduct={prevProduct}
            toggleLike={toggleLike}
            addToCart={handleAddToCart}
            shareProduct={shareProduct}
            toggleWishlist={handleWishlist}
            isInWishlist={isInWishlist}
            getTotalItems={getTotalItems}
            handleTouchStart={handleTouchStart}
            handleTouchMove={handleTouchMove}
            handleTouchEnd={handleTouchEnd}
            containerRef={containerRef}
            setShowProductDetails={setShowProductDetails}
            setShowSupplierInfo={setShowSupplierInfo}
            setShowCart={setShowCart}
            setShowWishlist={setShowWishlist}
            setShowChat={setShowChat}
            setShowProfile={setShowProfile}
            setShowGameCenter={setShowGameCenter}
            wishlist={wishlist}
          />
        </div>
      </div>

      {/* Modals */}
      <GameCenter
        showGameCenter={showGameCenter}
        setShowGameCenter={setShowGameCenter}
        gameProfile={gameProfile}
        addXP={addXP}
        addCoins={addCoins}
        products={products}
      />

      <CartModal
        showCart={showCart}
        setShowCart={setShowCart}
        cart={cart}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        getTotalItems={getTotalItems}
        getTotalPrice={getTotalPrice}
      />

      <WishlistModal
        showWishlist={showWishlist}
        setShowWishlist={setShowWishlist}
        wishlist={wishlist}
        toggleWishlist={handleWishlist}
      />

      <ProductDetailsModal
        showProductDetails={showProductDetails}
        setShowProductDetails={setShowProductDetails}
        currentProduct={currentProduct}
        currentSupplier={currentSupplier}
        addToCart={handleAddToCart}
      />

      <SupplierInfoModal
        showSupplierInfo={showSupplierInfo}
        setShowSupplierInfo={setShowSupplierInfo}
        currentSupplier={currentSupplier}
        products={products}
        setCurrentProductIndex={setCurrentProductIndex}
        setShowProductDetails={setShowProductDetails}
      />

      <ChatModal showChat={showChat} setShowChat={setShowChat} currentSupplier={currentSupplier} />

      <ProfileModal showProfile={showProfile} setShowProfile={setShowProfile} gameProfile={gameProfile} />
    </>
  )
}

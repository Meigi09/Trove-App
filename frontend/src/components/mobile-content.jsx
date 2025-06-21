"use client";

import {
  ShoppingCart,
  Heart,
  MessageSquare,
  Share2,
  Star,
  ChevronLeft,
  ChevronRight,
  Eye,
  Award,
  Bookmark,
  Home,
  UserCircle,
  Gamepad2,
  Coins,
  Flame,
} from "lucide-react";

export const MobileContent = ({
  currentProduct,
  currentSupplier,
  products,
  currentProductIndex,
  setCurrentProductIndex,
  isTransitioning,
  likedProducts,
  gameProfile,
  activeTab,
  setActiveTab,
  nextProduct,
  prevProduct,
  toggleLike,
  addToCart,
  shareProduct,
  toggleWishlist,
  isInWishlist,
  getTotalItems,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  containerRef,
  setShowProductDetails,
  setShowSupplierInfo,
  setShowCart,
  setShowWishlist,
  setShowChat,
  setShowProfile,
  setShowGameCenter,
  wishlist,
}) => {
  return (
    <div className="h-screen bg-black text-white overflow-hidden relative">
      {/* Main Product Display */}
      <div
        ref={containerRef}
        className={`h-full w-full relative transition-all duration-300 ${
          isTransitioning ? "scale-95 opacity-80" : "scale-100 opacity-100"
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 via-orange-500/20 to-yellow-500/30" />
        </div>

        {/* Product Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`text-[18rem] opacity-25 select-none pointer-events-none transition-all duration-500 ${
              isTransitioning ? "scale-110" : "scale-100"
            }`}
          >
            {currentProduct?.image}
          </div>
        </div>

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-12 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-rwanda-gradient rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">R</span>
              </div>
              <span className="text-sm font-medium">Rwanda Shop</span>
            </div>
            <div className="flex items-center space-x-2">
              {/* Game Stats - Mobile */}
              <div className="flex items-center space-x-2 rwanda-glass rounded-full px-3 py-1">
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-bold text-primary-gold">
                    L{gameProfile.level}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Coins className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs font-bold text-primary-gold">
                    {gameProfile.coins}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowCart(true)}
                className="relative w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {getTotalItems()}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Swipe Indicators */}
        <div className="absolute left-4 top-1/3 transform -translate-y-1/2 z-10">
          <div
            className="w-16 h-24 bg-black/20 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-black/30 transition-colors border border-white/10"
            onClick={() => setShowProductDetails(true)}
          >
            <ChevronLeft className="w-5 h-5 mb-1" />
            <span className="text-xs text-center">Details</span>
          </div>
        </div>

        <div className="absolute right-4 top-1/3 transform -translate-y-1/2 z-10">
          <div
            className="w-16 h-24 bg-black/20 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-black/30 transition-colors border border-white/10"
            onClick={() => setShowSupplierInfo(true)}
          >
            <ChevronRight className="w-5 h-5 mb-1" />
            <span className="text-xs text-center">Supplier</span>
          </div>
        </div>

        {/* Product Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="flex items-end justify-between">
            {/* Product Details */}
            <div className="flex-1 mr-4">
              {/* Trending Badge */}
              <div className="inline-flex items-center space-x-1 bg-primary-gold/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold mb-3 border border-primary-gold/30">
                <Flame className="w-3 h-3 text-primary-gold" />
                <span className="text-primary-gold">TRENDING</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl font-bold text-primary-gold">
                  ${currentProduct?.price}
                </span>
                {currentProduct?.originalPrice > currentProduct?.price && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      ${currentProduct?.originalPrice}
                    </span>
                    <div className="bg-primary-burgundy px-2 py-1 rounded-full text-xs font-bold">
                      -{currentProduct?.discount}%
                    </div>
                  </>
                )}
              </div>

              {/* Product Name */}
              <h2 className="text-xl font-bold mb-2 leading-tight">
                {currentProduct?.name}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-300 mb-3 leading-relaxed line-clamp-2">
                {currentProduct?.description}
              </p>

              {/* Supplier Info */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="text-lg">{currentSupplier?.image}</div>
                <span className="text-sm text-gray-300">
                  {currentSupplier?.username}
                </span>
                {currentSupplier?.verified && (
                  <Award className="w-4 h-4 text-primary-gold" />
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>{currentProduct?.views?.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart
                    className={`w-3 h-3 ${
                      likedProducts.has(currentProduct?._id)
                        ? "text-red-600 fill-current"
                        : ""
                    }`}
                  />
                  <span>{currentProduct?.likes?.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span>{currentProduct?.rating}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => toggleLike(currentProduct?._id)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  likedProducts.has(currentProduct?._id)
                    ? "bg-red-600 text-white scale-110"
                    : "bg-black/20 backdrop-blur-md hover:bg-black/30 hover:scale-110"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    likedProducts.has(currentProduct?._id) ? "fill-current" : ""
                  }`}
                />
              </button>

              <button
                onClick={() => toggleWishlist(currentProduct)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isInWishlist(currentProduct?._id)
                    ? "bg-yellow-500 text-black scale-110"
                    : "bg-black/20 backdrop-blur-md hover:bg-black/30 hover:scale-110"
                }`}
              >
                <Bookmark className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowChat(true)}
                className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/30 transition-all duration-300 hover:scale-110"
              >
                <MessageSquare className="w-5 h-5" />
              </button>

              <button
                onClick={() => shareProduct(currentProduct)}
                className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/30 transition-all duration-300 hover:scale-110"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <button
                onClick={() => addToCart(currentProduct)}
                className="w-12 h-12 bg-rwanda-gradient rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 rwanda-shadow-gold"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProductIndex(index)}
                className={`transition-all duration-300 ${
                  index === currentProductIndex
                    ? "w-6 h-2 bg-primary-gold rounded-full"
                    : "w-2 h-2 bg-white/40 rounded-full hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Navigation - Mobile */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-md border-t border-white/10">
          <div className="flex items-center justify-around py-2">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex flex-col items-center p-2 ${
                activeTab === "home" ? "text-primary-gold" : "text-gray-400"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button
              onClick={() => setShowGameCenter(true)}
              className="flex flex-col items-center p-2 text-gray-400 relative"
            >
              <Gamepad2 className="w-5 h-5" />
              <span className="text-xs mt-1">Games</span>
              {gameProfile.dailyQuests.filter((q) => !q.completed).length >
                0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-bold text-black">
                  {gameProfile.dailyQuests.filter((q) => !q.completed).length}
                </div>
              )}
            </button>
            <button
              onClick={() => setShowWishlist(true)}
              className="flex flex-col items-center p-2 text-gray-400 relative"
            >
              <Heart className="w-5 h-5" />
              <span className="text-xs mt-1">Wishlist</span>
              {wishlist.length > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {wishlist.length}
                </div>
              )}
            </button>
            <button
              onClick={() => setShowProfile(true)}
              className="flex flex-col items-center p-2 text-gray-400"
            >
              <UserCircle className="w-5 h-5" />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

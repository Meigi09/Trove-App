"use client";

import { useState, useRef, useCallback } from "react";
import {
  ShoppingCart,
  Heart,
  MessageSquare,
  Share2,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  Award,
  Search,
  Bookmark,
  Home,
  UserCircle,
  Target,
  Flame,
  Trophy,
  Coins,
  Gamepad2,
  RotateCcw,
  Play,
  Zap,
  Brain,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const CustomerPage = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [showSupplierInfo, setShowSupplierInfo] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showOrderTracking, setShowOrderTracking] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showGameCenter, setShowGameCenter] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [followedSuppliers, setFollowedSuppliers] = useState(new Set());
  const [viewHistory, setViewHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Minigames State
  const [showMinigames, setShowMinigames] = useState(false);
  const [activeMinigame, setActiveMinigame] = useState(null);
  const [memoryGame, setMemoryGame] = useState({
    cards: [],
    flipped: [],
    matched: [],
    moves: 0,
    score: 0,
    gameActive: false,
  });
  const [spinWheel, setSpinWheel] = useState({
    spinning: false,
    result: null,
    angle: 0,
  });
  const [quickTap, setQuickTap] = useState({
    active: false,
    score: 0,
    timeLeft: 30,
    targets: [],
  });

  // Gamification State
  const [gameProfile, setGameProfile] = useState({
    level: 12,
    xp: 2450,
    xpToNext: 550,
    totalXp: 3000,
    coins: 1250,
    gems: 45,
    streak: 7,
    achievements: [],
    badges: ["Early Adopter", "Trendsetter", "Social Butterfly"],
    dailyQuests: [
      {
        id: 1,
        title: "Like 5 products",
        progress: 3,
        target: 5,
        reward: 50,
        completed: false,
      },
      {
        id: 2,
        title: "Add 2 items to cart",
        progress: 1,
        target: 2,
        reward: 75,
        completed: false,
      },
      {
        id: 3,
        title: "Share a product",
        progress: 0,
        target: 1,
        reward: 100,
        completed: false,
      },
    ],
    weeklyChallenge: {
      title: "Shopping Spree",
      description: "Purchase 3 items this week",
      progress: 1,
      target: 3,
      reward: 500,
      timeLeft: "4 days",
    },
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "achievement",
      message: "🏆 Level Up! You reached level 12!",
      time: "2m ago",
      read: false,
    },
    {
      id: 2,
      type: "quest",
      message: "✨ Daily quest completed! +75 XP",
      time: "1h ago",
      read: false,
    },
    {
      id: 3,
      type: "reward",
      message: "🎁 Streak bonus: +50 coins!",
      time: "3h ago",
      read: true,
    },
  ]);

  const containerRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  // Sample data
  const [suppliers] = useState([
    {
      _id: "sup1",
      name: "Kigali Artisan Collective",
      username: "@kigali_artisans",
      description:
        "Traditional Rwandan crafts ✨ Preserving culture through art 🎨",
      image: "🏪",
      rating: 4.8,
      totalReviews: 156,
      location: "Kigali, Rwanda",
      verified: true,
      followers: "12.5K",
      responseTime: "Usually responds within 2 hours",
      categories: ["Arts & Crafts", "Home Decor", "Traditional Items"],
    },
    {
      _id: "sup2",
      name: "Thousand Hills Coffee",
      username: "@thousandhills_coffee",
      description:
        "Premium single-origin coffee ☕ From farm to cup with love 💚",
      image: "☕",
      rating: 4.9,
      totalReviews: 203,
      location: "Nyungwe, Rwanda",
      verified: true,
      followers: "8.2K",
      responseTime: "Usually responds within 1 hour",
      categories: ["Coffee", "Beverages", "Organic Products"],
    },
  ]);

  const [products] = useState([
    {
      _id: "1",
      name: "Handwoven Agaseke Basket",
      description:
        "Traditional Rwandan peace basket ✨ Each piece tells a story of unity 🕊️",
      price: 45.99,
      originalPrice: 65.99,
      stockQuantity: 25,
      category: "Arts & Crafts",
      image: "🧺",
      supplierId: "sup1",
      supplierName: "Kigali Artisan Collective",
      rating: 4.8,
      totalReviews: 34,
      views: 1240,
      likes: 892,
      shares: 156,
      trending: true,
      discount: 30,
      xpReward: 25,
    },
    {
      _id: "2",
      name: "Rwandan Coffee Beans",
      description:
        "Premium Arabica coffee ☕ Wake up to the taste of Rwanda! ☀️",
      price: 28.5,
      originalPrice: 35.0,
      stockQuantity: 35,
      category: "Food & Beverages",
      image: "☕",
      supplierId: "sup2",
      supplierName: "Thousand Hills Coffee",
      rating: 4.9,
      totalReviews: 67,
      views: 2150,
      likes: 1456,
      shares: 234,
      trending: true,
      discount: 19,
      xpReward: 30,
    },
    {
      _id: "3",
      name: "Imigongo Art Painting",
      description: "Traditional geometric art 🎨 Ancient meets modern style ✨",
      price: 125.0,
      originalPrice: 150.0,
      stockQuantity: 8,
      category: "Arts & Crafts",
      image: "🎨",
      supplierId: "sup1",
      supplierName: "Kigali Artisan Collective",
      rating: 4.7,
      totalReviews: 23,
      views: 890,
      likes: 567,
      shares: 89,
      trending: false,
      discount: 17,
      xpReward: 40,
    },
  ]);

  const currentProduct = products[currentProductIndex];
  const currentSupplier = suppliers.find(
    (s) => s._id === currentProduct?.supplierId
  );

  // Minigame data
  const minigames = [
    {
      id: "memory",
      name: "Product Memory",
      description: "Match product pairs to win coins!",
      icon: "🧠",
      reward: "50-200 coins",
      difficulty: "Easy",
    },
    {
      id: "spin",
      name: "Lucky Spin",
      description: "Spin the wheel for amazing rewards!",
      icon: "🎰",
      reward: "10-500 coins",
      difficulty: "Luck",
    },
    {
      id: "quicktap",
      name: "Coin Rush",
      description: "Tap coins as fast as you can!",
      icon: "⚡",
      reward: "100-300 coins",
      difficulty: "Hard",
    },
    {
      id: "quiz",
      name: "Product Quiz",
      description: "Test your product knowledge!",
      icon: "🧩",
      reward: "75-250 coins",
      difficulty: "Medium",
    },
  ];

  const wheelPrizes = [
    { label: "10 Coins", value: 10, color: "from-gray-500 to-gray-600" },
    { label: "50 Coins", value: 50, color: "from-blue-500 to-blue-600" },
    { label: "100 Coins", value: 100, color: "from-green-500 to-green-600" },
    {
      label: "25 XP",
      value: 25,
      color: "from-purple-500 to-purple-600",
      type: "xp",
    },
    { label: "200 Coins", value: 200, color: "from-yellow-500 to-yellow-600" },
    { label: "500 Coins", value: 500, color: "from-red-500 to-red-600" },
    {
      label: "50 XP",
      value: 50,
      color: "from-pink-500 to-pink-600",
      type: "xp",
    },
    { label: "75 Coins", value: 75, color: "from-teal-500 to-teal-600" },
  ];

  // Gamification Functions
  const addXP = (amount, action) => {
    setGameProfile((prev) => {
      const newXp = prev.xp + amount;
      const levelUp = newXp >= prev.totalXp;

      if (levelUp) {
        setNotifications((prevNotifs) => [
          {
            id: Date.now(),
            type: "achievement",
            message: `🎉 Level Up! You reached level ${prev.level + 1}!`,
            time: "now",
            read: false,
          },
          ...prevNotifs,
        ]);
      }

      return {
        ...prev,
        xp: levelUp ? newXp - prev.totalXp : newXp,
        level: levelUp ? prev.level + 1 : prev.level,
        totalXp: levelUp ? prev.totalXp + 500 : prev.totalXp,
        xpToNext: levelUp
          ? prev.totalXp + 500 - (newXp - prev.totalXp)
          : prev.xpToNext - amount,
      };
    });

    setNotifications((prev) => [
      {
        id: Date.now(),
        type: "xp",
        message: `+${amount} XP for ${action}! ⭐`,
        time: "now",
        read: false,
      },
      ...prev,
    ]);
  };

  const addCoins = (amount, reason) => {
    setGameProfile((prev) => ({ ...prev, coins: prev.coins + amount }));
    setNotifications((prev) => [
      {
        id: Date.now(),
        type: "coins",
        message: `+${amount} coins for ${reason}! 🪙`,
        time: "now",
        read: false,
      },
      ...prev,
    ]);
  };

  const completeQuest = (questId) => {
    setGameProfile((prev) => ({
      ...prev,
      dailyQuests: prev.dailyQuests.map((quest) =>
        quest.id === questId
          ? { ...quest, completed: true, progress: quest.target }
          : quest
      ),
    }));
  };

  // Minigame Functions
  const initMemoryGame = () => {
    const gameProducts = [...products, ...products].map((product, index) => ({
      id: index,
      productId: product._id,
      image: product.image,
      name: product.name,
      flipped: false,
      matched: false,
    }));

    // Shuffle cards
    for (let i = gameProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameProducts[i], gameProducts[j]] = [gameProducts[j], gameProducts[i]];
    }

    setMemoryGame({
      cards: gameProducts,
      flipped: [],
      matched: [],
      moves: 0,
      score: 0,
      gameActive: true,
    });
  };

  const flipCard = (cardId) => {
    if (
      memoryGame.flipped.length >= 2 ||
      memoryGame.flipped.includes(cardId) ||
      memoryGame.matched.includes(cardId)
    )
      return;

    const newFlipped = [...memoryGame.flipped, cardId];
    setMemoryGame((prev) => ({ ...prev, flipped: newFlipped }));

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const firstCard = memoryGame.cards.find((c) => c.id === first);
      const secondCard = memoryGame.cards.find((c) => c.id === second);

      setTimeout(() => {
        if (firstCard.productId === secondCard.productId) {
          setMemoryGame((prev) => ({
            ...prev,
            matched: [...prev.matched, first, second],
            flipped: [],
            moves: prev.moves + 1,
            score: prev.score + 50,
          }));

          if (memoryGame.matched.length + 2 === memoryGame.cards.length) {
            const bonus = Math.max(100 - memoryGame.moves * 5, 50);
            addCoins(memoryGame.score + bonus, "completing memory game");
            addXP(75, "completing memory game");
          }
        } else {
          setMemoryGame((prev) => ({
            ...prev,
            flipped: [],
            moves: prev.moves + 1,
          }));
        }
      }, 1000);
    }
  };

  const spinTheWheel = () => {
    if (spinWheel.spinning) return;

    setSpinWheel((prev) => ({ ...prev, spinning: true }));

    const randomAngle = Math.random() * 360 + 1440;
    const finalAngle = randomAngle % 360;
    const prizeIndex = Math.floor((360 - finalAngle) / 45) % wheelPrizes.length;
    const prize = wheelPrizes[prizeIndex];

    setTimeout(() => {
      setSpinWheel({
        spinning: false,
        result: prize,
        angle: randomAngle,
      });

      if (prize.type === "xp") {
        addXP(prize.value, "spinning the wheel");
      } else {
        addCoins(prize.value, "spinning the wheel");
      }
    }, 3000);
  };

  const startQuickTap = () => {
    setQuickTap({
      active: true,
      score: 0,
      timeLeft: 30,
      targets: [],
    });

    const interval = setInterval(() => {
      setQuickTap((prev) => {
        if (prev.timeLeft <= 0) {
          clearInterval(interval);
          addCoins(prev.score * 2, "quick tap game");
          addXP(prev.score, "quick tap game");
          return { ...prev, active: false };
        }

        const newTargets = [...prev.targets];
        if (Math.random() < 0.7 && newTargets.length < 5) {
          newTargets.push({
            id: Date.now(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 60 + 20,
            type: Math.random() < 0.8 ? "coin" : "gem",
          });
        }

        return {
          ...prev,
          timeLeft: prev.timeLeft - 1,
          targets: newTargets.filter((t) => Date.now() - t.id < 3000),
        };
      });
    }, 1000);
  };

  const tapTarget = (targetId, type) => {
    setQuickTap((prev) => ({
      ...prev,
      score: prev.score + (type === "gem" ? 10 : 5),
      targets: prev.targets.filter((t) => t.id !== targetId),
    }));
  };

  // Enhanced interaction functions
  const nextProduct = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentProductIndex((prev) => (prev + 1) % products.length);
    setTimeout(() => setIsTransitioning(false), 300);
    addXP(5, "browsing products");
  }, [isTransitioning, products.length]);

  const prevProduct = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentProductIndex(
      (prev) => (prev - 1 + products.length) % products.length
    );
    setTimeout(() => setIsTransitioning(false), 300);
    addXP(5, "browsing products");
  }, [isTransitioning, products.length]);

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    currentY.current = e.touches[0].clientY;
    currentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const deltaY = startY.current - currentY.current;
    const deltaX = startX.current - currentX.current;
    const threshold = 50;

    if (Math.abs(deltaY) > threshold && Math.abs(deltaY) > Math.abs(deltaX)) {
      if (deltaY > 0) {
        nextProduct();
      } else {
        prevProduct();
      }
    } else if (
      Math.abs(deltaX) > threshold &&
      Math.abs(deltaX) > Math.abs(deltaY)
    ) {
      if (deltaX > 0) {
        setShowProductDetails(true);
      } else {
        setShowSupplierInfo(true);
      }
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    addXP(product.xpReward || 15, "adding to cart");
    addCoins(10, "adding to cart");

    // Check daily quest
    const cartQuest = gameProfile.dailyQuests.find((q) =>
      q.title.includes("cart")
    );
    if (cartQuest && !cartQuest.completed) {
      const newProgress = cartQuest.progress + 1;
      setGameProfile((prev) => ({
        ...prev,
        dailyQuests: prev.dailyQuests.map((quest) =>
          quest.id === cartQuest.id
            ? { ...quest, progress: newProgress }
            : quest
        ),
      }));
      if (newProgress >= cartQuest.target) {
        completeQuest(cartQuest.id);
        addXP(cartQuest.reward, "completing daily quest");
      }
    }
  };

  const toggleLike = (productId) => {
    setLikedProducts((prev) => {
      const newLiked = new Set(prev);
      const isLiking = !newLiked.has(productId);

      if (isLiking) {
        newLiked.add(productId);
        addXP(10, "liking a product");
        addCoins(5, "liking a product");

        // Check daily quest
        const likeQuest = gameProfile.dailyQuests.find((q) =>
          q.title.includes("Like")
        );
        if (likeQuest && !likeQuest.completed) {
          const newProgress = likeQuest.progress + 1;
          setGameProfile((prev) => ({
            ...prev,
            dailyQuests: prev.dailyQuests.map((quest) =>
              quest.id === likeQuest.id
                ? { ...quest, progress: newProgress }
                : quest
            ),
          }));
          if (newProgress >= likeQuest.target) {
            completeQuest(likeQuest.id);
            addXP(likeQuest.reward, "completing daily quest");
          }
        }
      } else {
        newLiked.delete(productId);
      }

      return newLiked;
    });
  };

  const shareProduct = async (product) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }

    addXP(20, "sharing a product");
    addCoins(15, "sharing a product");

    // Check daily quest
    const shareQuest = gameProfile.dailyQuests.find((q) =>
      q.title.includes("Share")
    );
    if (shareQuest && !shareQuest.completed) {
      const newProgress = shareQuest.progress + 1;
      setGameProfile((prev) => ({
        ...prev,
        dailyQuests: prev.dailyQuests.map((quest) =>
          quest.id === shareQuest.id
            ? { ...quest, progress: newProgress }
            : quest
        ),
      }));
      if (newProgress >= shareQuest.target) {
        completeQuest(shareQuest.id);
        addXP(shareQuest.reward, "completing daily quest");
      }
    }
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (!exists) {
        addXP(15, "adding to wishlist");
        addCoins(8, "adding to wishlist");
        return [...prev, product];
      }
      return prev.filter((item) => item._id !== product._id);
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const updateCartQuantity = (productId, change) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  if (!currentProduct) return null;

  return (
    <>
      <div className="flex justify-center min-h-screen bg-black">
        {/* Desktop Container */}
        <div className="hidden lg:flex w-full max-w-7xl">
          {/* Left Sidebar */}
          <div className="w-64 bg-gray-900 text-white p-4 flex flex-col">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-rwanda-gradient rounded-xl flex items-center justify-center text-white font-bold">
                R
              </div>
              <div>
                <h1 className="text-lg font-bold">Rwanda Shop</h1>
                <p className="text-xs text-gray-400">Social Commerce</p>
              </div>
            </div>

            {/* Game Stats */}
            <div className="bg-rwanda-gradient-soft rounded-xl p-3 mb-6 border border-primary-gold/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Level {gameProfile.level}
                </span>
                <div className="flex items-center space-x-1">
                  <Coins className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-bold text-yellow-500">
                    {gameProfile.coins}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                <div
                  className="bg-rwanda-gradient h-2 rounded-full transition-all duration-500"
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
                    ? "bg-burgundy-soft text-primary-burgundy"
                    : "text-gray-400 hover:text-primary-burgundy hover:bg-burgundy-whisper"
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
                {gameProfile.dailyQuests.filter((q) => !q.completed).length >
                  0 && (
                  <Badge className="bg-primary-gold text-primary-burgundy text-xs">
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
                {wishlist.length > 0 && (
                  <Badge className="bg-red-600 text-white text-xs">
                    {wishlist.length}
                  </Badge>
                )}
              </button>
              <button
                onClick={() => setShowCart(true)}
                className="w-full flex items-center space-x-3 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
                {getTotalItems() > 0 && (
                  <Badge className="bg-yellow-500 text-black text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </button>
            </nav>

            {/* User Profile */}
            <div className="mt-auto">
              <button
                onClick={() => setShowProfile(true)}
                className="w-full flex items-center space-x-3 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 bg-rwanda-gradient rounded-full flex items-center justify-center text-sm font-bold">
                  👤
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">ShopperPro</p>
                  <p className="text-xs text-primary-gold">
                    Level {gameProfile.level}
                  </p>
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
                suppliers={suppliers}
                currentProductIndex={currentProductIndex}
                setCurrentProductIndex={setCurrentProductIndex}
                isTransitioning={isTransitioning}
                setIsTransitioning={setIsTransitioning}
                likedProducts={likedProducts}
                setLikedProducts={setLikedProducts}
                cart={cart}
                wishlist={wishlist}
                gameProfile={gameProfile}
                showProductDetails={showProductDetails}
                setShowProductDetails={setShowProductDetails}
                showSupplierInfo={showSupplierInfo}
                setShowSupplierInfo={setShowSupplierInfo}
                showCart={showCart}
                setShowCart={setShowCart}
                showWishlist={showWishlist}
                setShowWishlist={setShowWishlist}
                showChat={showChat}
                setShowChat={setShowChat}
                showProfile={showProfile}
                setShowProfile={setShowProfile}
                showGameCenter={showGameCenter}
                setShowGameCenter={setShowGameCenter}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                nextProduct={nextProduct}
                prevProduct={prevProduct}
                toggleLike={toggleLike}
                addToCart={addToCart}
                shareProduct={shareProduct}
                toggleWishlist={toggleWishlist}
                isInWishlist={isInWishlist}
                getTotalItems={getTotalItems}
                getTotalPrice={getTotalPrice}
                updateCartQuantity={updateCartQuantity}
                removeFromCart={removeFromCart}
                handleTouchStart={handleTouchStart}
                handleTouchMove={handleTouchMove}
                handleTouchEnd={handleTouchEnd}
                containerRef={containerRef}
                minigames={minigames}
                activeMinigame={activeMinigame}
                setActiveMinigame={setActiveMinigame}
                memoryGame={memoryGame}
                initMemoryGame={initMemoryGame}
                flipCard={flipCard}
                spinWheel={spinWheel}
                spinTheWheel={spinTheWheel}
                quickTap={quickTap}
                startQuickTap={startQuickTap}
                tapTarget={tapTarget}
                notifications={notifications}
                setNotifications={setNotifications}
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 bg-white p-4 overflow-y-auto">
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-red-200 focus:border-red-600"
                />
              </div>

              {/* Current Product Info */}
              {currentProduct && (
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <h3 className="font-semibold text-red-600 mb-2">
                    Now Viewing
                  </h3>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{currentProduct.image}</div>
                    <div>
                      <p className="font-medium text-sm">
                        {currentProduct.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {currentProduct.supplierName}
                      </p>
                      <p className="text-lg font-bold text-yellow-600">
                        ${currentProduct.price}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Daily Quests */}
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h3 className="font-semibold text-red-600 mb-3 flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Daily Quests
                </h3>
                <div className="space-y-2">
                  {gameProfile.dailyQuests.slice(0, 2).map((quest) => (
                    <div
                      key={quest.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span
                        className={
                          quest.completed
                            ? "line-through text-gray-500"
                            : "text-gray-700"
                        }
                      >
                        {quest.title}
                      </span>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-yellow-600">
                          {quest.progress}/{quest.target}
                        </span>
                        {quest.completed && (
                          <Trophy className="w-3 h-3 text-yellow-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden w-full">
          <MobileContent
            currentProduct={currentProduct}
            currentSupplier={currentSupplier}
            products={products}
            suppliers={suppliers}
            currentProductIndex={currentProductIndex}
            setCurrentProductIndex={setCurrentProductIndex}
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            likedProducts={likedProducts}
            setLikedProducts={setLikedProducts}
            cart={cart}
            wishlist={wishlist}
            gameProfile={gameProfile}
            showProductDetails={showProductDetails}
            setShowProductDetails={setShowProductDetails}
            showSupplierInfo={showSupplierInfo}
            setShowSupplierInfo={setShowSupplierInfo}
            showCart={showCart}
            setShowCart={setShowCart}
            showWishlist={showWishlist}
            setShowWishlist={setShowWishlist}
            showChat={showChat}
            setShowChat={setShowChat}
            showProfile={showProfile}
            setShowProfile={setShowProfile}
            showGameCenter={showGameCenter}
            setShowGameCenter={setShowGameCenter}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            nextProduct={nextProduct}
            prevProduct={prevProduct}
            toggleLike={toggleLike}
            addToCart={addToCart}
            shareProduct={shareProduct}
            toggleWishlist={toggleWishlist}
            isInWishlist={isInWishlist}
            getTotalItems={getTotalItems}
            getTotalPrice={getTotalPrice}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
            handleTouchStart={handleTouchStart}
            handleTouchMove={handleTouchMove}
            handleTouchEnd={handleTouchEnd}
            containerRef={containerRef}
            minigames={minigames}
            activeMinigame={activeMinigame}
            setActiveMinigame={setActiveMinigame}
            memoryGame={memoryGame}
            initMemoryGame={initMemoryGame}
            flipCard={flipCard}
            spinWheel={spinWheel}
            spinTheWheel={spinTheWheel}
            quickTap={quickTap}
            startQuickTap={startQuickTap}
            tapTarget={tapTarget}
            notifications={notifications}
            setNotifications={setNotifications}
          />
        </div>
      </div>
    </>
  );
};

const MobileContent = ({
  currentProduct,
  currentSupplier,
  products,
  suppliers,
  currentProductIndex,
  setCurrentProductIndex,
  isTransitioning,
  setIsTransitioning,
  likedProducts,
  setLikedProducts,
  cart,
  wishlist,
  gameProfile,
  showProductDetails,
  setShowProductDetails,
  showSupplierInfo,
  setShowSupplierInfo,
  showCart,
  setShowCart,
  showWishlist,
  setShowWishlist,
  showChat,
  setShowChat,
  showProfile,
  setShowProfile,
  showGameCenter,
  setShowGameCenter,
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
  getTotalPrice,
  updateCartQuantity,
  removeFromCart,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  containerRef,
  minigames,
  activeMinigame,
  setActiveMinigame,
  memoryGame,
  initMemoryGame,
  flipCard,
  spinWheel,
  spinTheWheel,
  quickTap,
  startQuickTap,
  tapTarget,
  notifications,
  setNotifications,
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
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">R</span>
              </div>
              <span className="text-sm font-medium">Rwanda Shop</span>
            </div>
            <div className="flex items-center space-x-2">
              {/* Game Stats - Mobile */}
              <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-md rounded-full px-3 py-1">
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-bold text-yellow-500">
                    L{gameProfile.level}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Coins className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs font-bold text-yellow-500">
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
              {currentProduct?.trending && (
                <div className="inline-flex items-center space-x-1 bg-yellow-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold mb-3 border border-yellow-500/30">
                  <Flame className="w-3 h-3 text-yellow-500" />
                  <span className="text-yellow-500">TRENDING</span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl font-bold text-yellow-500">
                  ${currentProduct?.price}
                </span>
                {currentProduct?.originalPrice > currentProduct?.price && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      ${currentProduct?.originalPrice}
                    </span>
                    <div className="bg-red-600 px-2 py-1 rounded-full text-xs font-bold">
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
                  <Award className="w-4 h-4 text-yellow-500" />
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
                className="w-12 h-12 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
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
                    ? "w-6 h-2 bg-yellow-500 rounded-full"
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
                activeTab === "home" ? "text-yellow-500" : "text-gray-400"
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

      {/* Game Center Modal */}
      {showGameCenter && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowGameCenter(false)}
          />
          <div className="absolute inset-0 bg-gray-900 text-white">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-red-600/20 to-yellow-500/20">
                <div className="flex items-center space-x-3">
                  <Gamepad2 className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-xl font-bold">Game Center</h2>
                </div>
                <button
                  onClick={() => setShowGameCenter(false)}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Game Content */}
              <div className="flex-1 overflow-y-auto">
                {!activeMinigame ? (
                  <div className="p-4">
                    {/* Stats Overview */}
                    <div className="bg-gradient-to-r from-red-600/20 to-yellow-500/20 rounded-xl p-4 mb-6 border border-yellow-500/30">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-yellow-500">
                            {gameProfile.level}
                          </div>
                          <div className="text-xs text-gray-400">Level</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-yellow-500">
                            {gameProfile.coins}
                          </div>
                          <div className="text-xs text-gray-400">Coins</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-yellow-500">
                            {gameProfile.streak}
                          </div>
                          <div className="text-xs text-gray-400">
                            Day Streak
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Daily Quests */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <Target className="w-5 h-5 mr-2 text-yellow-500" />
                        Daily Quests
                      </h3>
                      <div className="space-y-3">
                        {gameProfile.dailyQuests.map((quest) => (
                          <div
                            key={quest.id}
                            className="bg-gray-800 rounded-xl p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{quest.title}</span>
                              <div className="flex items-center space-x-2">
                                <Coins className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-bold text-yellow-500">
                                  +{quest.reward}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Progress
                                value={(quest.progress / quest.target) * 100}
                                className="flex-1"
                              />
                              <span className="text-xs text-gray-400">
                                {quest.progress}/{quest.target}
                              </span>
                              {quest.completed && (
                                <Trophy className="w-4 h-4 text-yellow-500" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Minigames */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                        Mini Games
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {minigames.map((game) => (
                          <button
                            key={game.id}
                            onClick={() => {
                              setActiveMinigame(game.id);
                              if (game.id === "memory") initMemoryGame();
                            }}
                            className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors text-left"
                          >
                            <div className="text-3xl mb-2">{game.icon}</div>
                            <h4 className="font-semibold mb-1">{game.name}</h4>
                            <p className="text-xs text-gray-400 mb-2">
                              {game.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge className="bg-yellow-500/20 text-yellow-500 text-xs">
                                {game.reward}
                              </Badge>
                              <Badge className="bg-gray-700 text-gray-300 text-xs">
                                {game.difficulty}
                              </Badge>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    {/* Memory Game */}
                    {activeMinigame === "memory" && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => setActiveMinigame(null)}
                              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <h3 className="text-lg font-semibold">
                              Product Memory
                            </h3>
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <span>Moves: {memoryGame.moves}</span>
                            <span>Score: {memoryGame.score}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-4">
                          {memoryGame.cards.map((card) => (
                            <button
                              key={card.id}
                              onClick={() => flipCard(card.id)}
                              className={`aspect-square rounded-xl flex items-center justify-center text-4xl transition-all duration-300 ${
                                memoryGame.flipped.includes(card.id) ||
                                memoryGame.matched.includes(card.id)
                                  ? "bg-yellow-500/20 border-2 border-yellow-500"
                                  : "bg-gray-800 hover:bg-gray-700"
                              }`}
                            >
                              {(memoryGame.flipped.includes(card.id) ||
                                memoryGame.matched.includes(card.id)) &&
                                card.image}
                            </button>
                          ))}
                        </div>

                        <Button
                          onClick={initMemoryGame}
                          className="w-full bg-gradient-to-r from-red-600 to-yellow-500"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          New Game
                        </Button>
                      </div>
                    )}

                    {/* Spin Wheel */}
                    {activeMinigame === "spin" && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => setActiveMinigame(null)}
                              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <h3 className="text-lg font-semibold">
                              Lucky Spin
                            </h3>
                          </div>
                        </div>

                        <div className="flex flex-col items-center space-y-6">
                          <div className="relative w-64 h-64">
                            <div
                              className={`w-full h-full rounded-full border-8 border-gray-700 relative overflow-hidden transition-transform duration-3000 ease-out ${
                                spinWheel.spinning ? "animate-spin" : ""
                              }`}
                              style={{
                                transform: `rotate(${spinWheel.angle}deg)`,
                              }}
                            >
                              {wheelPrizes.map((prize, index) => (
                                <div
                                  key={index}
                                  className={`absolute w-full h-full bg-gradient-to-r ${prize.color} opacity-80`}
                                  style={{
                                    clipPath: `polygon(50% 50%, ${
                                      50 +
                                      40 *
                                        Math.cos(
                                          ((index * 45 - 22.5) * Math.PI) / 180
                                        )
                                    }% ${
                                      50 +
                                      40 *
                                        Math.sin(
                                          ((index * 45 - 22.5) * Math.PI) / 180
                                        )
                                    }%, ${
                                      50 +
                                      40 *
                                        Math.cos(
                                          ((index * 45 + 22.5) * Math.PI) / 180
                                        )
                                    }% ${
                                      50 +
                                      40 *
                                        Math.sin(
                                          ((index * 45 + 22.5) * Math.PI) / 180
                                        )
                                    }%)`,
                                  }}
                                >
                                  <div
                                    className="absolute text-xs font-bold text-white"
                                    style={{
                                      top: "30%",
                                      left: "60%",
                                      transform: `rotate(${index * 45}deg)`,
                                    }}
                                  >
                                    {prize.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-white z-10"></div>
                          </div>

                          {spinWheel.result && (
                            <div className="text-center bg-gray-800 rounded-xl p-4">
                              <h4 className="text-lg font-bold text-yellow-500 mb-2">
                                You Won!
                              </h4>
                              <p className="text-2xl font-bold">
                                {spinWheel.result.label}
                              </p>
                            </div>
                          )}

                          <Button
                            onClick={spinTheWheel}
                            disabled={spinWheel.spinning}
                            className="w-full bg-gradient-to-r from-red-600 to-yellow-500 disabled:opacity-50"
                          >
                            {spinWheel.spinning ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Spinning...
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Spin the Wheel
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Quick Tap Game */}
                    {activeMinigame === "quicktap" && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => setActiveMinigame(null)}
                              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <h3 className="text-lg font-semibold">Coin Rush</h3>
                          </div>
                          {quickTap.active && (
                            <div className="flex items-center space-x-4 text-sm">
                              <span>Time: {quickTap.timeLeft}s</span>
                              <span>Score: {quickTap.score}</span>
                            </div>
                          )}
                        </div>

                        {quickTap.active ? (
                          <div className="relative w-full h-96 bg-gray-800 rounded-xl overflow-hidden">
                            {quickTap.targets.map((target) => (
                              <button
                                key={target.id}
                                onClick={() =>
                                  tapTarget(target.id, target.type)
                                }
                                className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-2xl animate-pulse ${
                                  target.type === "gem"
                                    ? "bg-purple-500"
                                    : "bg-yellow-500"
                                }`}
                                style={{
                                  left: `${target.x}%`,
                                  top: `${target.y}%`,
                                }}
                              >
                                {target.type === "gem" ? "💎" : "🪙"}
                              </button>
                            ))}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg font-bold">
                              Tap the coins and gems!
                            </div>
                          </div>
                        ) : (
                          <div className="text-center space-y-4">
                            <div className="bg-gray-800 rounded-xl p-6">
                              <Zap className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                              <h4 className="text-lg font-bold mb-2">
                                Ready to Rush?
                              </h4>
                              <p className="text-gray-400 mb-4">
                                Tap coins and gems as fast as you can in 30
                                seconds!
                              </p>
                              <div className="text-sm text-gray-500">
                                🪙 Coins = 5 points • 💎 Gems = 10 points
                              </div>
                            </div>
                            <Button
                              onClick={startQuickTap}
                              className="w-full bg-gradient-to-r from-red-600 to-yellow-500"
                            >
                              <Zap className="w-4 h-4 mr-2" />
                              Start Game
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Quiz Game */}
                    {activeMinigame === "quiz" && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => setActiveMinigame(null)}
                              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <h3 className="text-lg font-semibold">
                              Product Quiz
                            </h3>
                          </div>
                        </div>

                        <div className="text-center space-y-4">
                          <div className="bg-gray-800 rounded-xl p-6">
                            <Brain className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                            <h4 className="text-lg font-bold mb-2">
                              Coming Soon!
                            </h4>
                            <p className="text-gray-400">
                              Test your knowledge about products and suppliers
                              to earn coins and XP!
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Page() {
  return <CustomerPage />;
}

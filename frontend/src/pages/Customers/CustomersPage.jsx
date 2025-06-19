"use client";

import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  X,
  Star,
  Heart,
  Eye,
  Package,
  Truck,
  Shield,
} from "lucide-react";

const CustomerPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "Rwanda",
    },
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Rwanda-based products data
  const [products] = useState([
    {
      _id: "1",
      name: "Handwoven Agaseke Basket",
      description:
        "Traditional Rwandan peace basket made by skilled artisans with natural fibers",
      price: 45.99,
      unit: "piece",
      stockQuantity: 25,
      category: "Arts & Crafts",
      image: "🧺",
      supplier: "Kigali Artisan Collective",
      rating: 4.8,
      views: 1240,
    },
    {
      _id: "2",
      name: "Rwandan Coffee Beans",
      description:
        "Premium single-origin Arabica coffee from the hills of Nyungwe",
      price: 28.5,
      unit: "kg",
      stockQuantity: 35,
      category: "Food & Beverages",
      image: "☕",
      supplier: "Thousand Hills Coffee",
      rating: 4.9,
      views: 2150,
    },
    {
      _id: "3",
      name: "Imigongo Art Painting",
      description: "Traditional geometric cow dung art piece from Nyakarimbi",
      price: 125.0,
      unit: "piece",
      stockQuantity: 8,
      category: "Arts & Crafts",
      image: "🎨",
      supplier: "Nyakarimbi Art Center",
      rating: 4.7,
      views: 890,
    },
    {
      _id: "4",
      name: "Banana Fiber Laptop Bag",
      description:
        "Eco-friendly laptop bag made from sustainable banana fibers",
      price: 65.0,
      unit: "piece",
      stockQuantity: 15,
      category: "Fashion & Accessories",
      image: "💼",
      supplier: "EcoRwanda Products",
      rating: 4.6,
      views: 756,
    },
    {
      _id: "5",
      name: "Kinyarwanda Learning Kit",
      description:
        "Complete language learning set with books, audio, and flashcards",
      price: 42.75,
      unit: "kit",
      stockQuantity: 20,
      category: "Education",
      image: "📚",
      supplier: "Rwanda Language Institute",
      rating: 4.5,
      views: 634,
    },
    {
      _id: "6",
      name: "Solar-Powered Radio",
      description: "Portable solar radio supporting local Rwandan stations",
      price: 78.0,
      unit: "piece",
      stockQuantity: 12,
      category: "Electronics",
      image: "📻",
      supplier: "TechKigali Solutions",
      rating: 4.8,
      views: 1120,
    },
    {
      _id: "7",
      name: "Ubwoba Dance Mask",
      description:
        "Traditional ceremonial mask used in Rwandan cultural dances",
      price: 95.0,
      unit: "piece",
      stockQuantity: 6,
      category: "Arts & Crafts",
      image: "🎭",
      supplier: "Cultural Heritage Rwanda",
      rating: 4.9,
      views: 445,
    },
    {
      _id: "8",
      name: "Honey from Akagera",
      description:
        "Pure wild honey harvested from Akagera National Park region",
      price: 32.0,
      unit: "jar",
      stockQuantity: 28,
      category: "Food & Beverages",
      image: "🍯",
      supplier: "Akagera Beekeepers Coop",
      rating: 4.7,
      views: 892,
    },
  ]);

  const categories = [
    "all",
    "Arts & Crafts",
    "Food & Beverages",
    "Fashion & Accessories",
    "Education",
    "Electronics",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    alert(
      "Murakoze cyane! Order placed successfully! You will receive a confirmation email shortly."
    );
    setCart([]);
    setShowCheckout(false);
    setShowCart(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-coral-main rounded-lg flex items-center justify-center text-white font-bold text-sm">
                R
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Rwanda Treasures
                </h1>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-coral-main/20 focus:border-coral-main transition-all text-sm"
                />
              </div>
            </div>

            {/* Cart */}
            <button
              onClick={() => setShowCart(true)}
              className="relative h-10 px-4 bg-coral-main text-white rounded-full font-medium hover:bg-coral-secondary transition-colors flex items-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {getTotalItems() > 0 && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {getTotalItems()}
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
              Discover Rwanda's
              <br />
              <span className="font-semibold text-coral-main">
                Finest Treasures
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              Authentic crafts, premium coffee, and cultural artifacts from the
              Land of a Thousand Hills
            </p>

            {/* Trust Indicators */}
            <div className="flex justify-center items-center space-x-12 text-gray-500">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-coral-whisper rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-coral-main" />
                </div>
                <span className="text-sm font-medium">Authentic Quality</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-coral-whisper rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-coral-main" />
                </div>
                <span className="text-sm font-medium">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-coral-whisper rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-coral-main" />
                </div>
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-coral-main text-white"
                    : "bg-white text-gray-600 hover:bg-coral-whisper hover:text-coral-main border border-gray-200"
                }`}
              >
                {category === "all" ? "All Products" : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product._id}
                className={`group bg-white rounded-2xl border border-gray-100 hover:border-coral-soft hover:shadow-lg transition-all duration-300 overflow-hidden ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gray-50 flex items-center justify-center">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-coral-whisper transition-colors">
                      <Heart className="w-4 h-4 text-coral-main" />
                    </button>
                    <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-coral-whisper transition-colors">
                      <Eye className="w-4 h-4 text-coral-main" />
                    </button>
                  </div>

                  {/* Stock Badge */}
                  {product.stockQuantity <= 10 && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-coral-main text-white text-xs font-medium px-2 py-1 rounded-full">
                        Limited Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight group-hover:text-coral-main transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        ({product.rating})
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        per {product.unit}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">
                        {product.supplier}
                      </div>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <Eye className="w-3 h-3 mr-1" />
                        {product.views}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        product.stockQuantity > 10
                          ? "bg-green-100 text-green-700"
                          : product.stockQuantity > 0
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stockQuantity > 0
                        ? `${product.stockQuantity} available`
                        : "Sold out"}
                    </span>

                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stockQuantity === 0}
                      className="bg-coral-main text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-coral-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-coral-main rounded-lg flex items-center justify-center text-white font-bold text-sm">
                R
              </div>
              <div>
                <h3 className="text-lg font-semibold">Rwanda Treasures</h3>
                <p className="text-gray-400 text-sm">Ubwoba bw'u Rwanda</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2025 Rwanda Treasures. Made with ❤️ in the Land of a Thousand
                Hills.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowCart(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Cart Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">
                  Shopping Cart
                </h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="text-2xl">{item.image}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">
                            {item.name}
                          </h4>
                          <p className="text-coral-main font-semibold text-sm">
                            ${item.price}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateCartQuantity(item._id, item.quantity - 1)
                            }
                            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-3 h-3 text-gray-600" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item._id, item.quantity + 1)
                            }
                            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-3 h-3 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-gray-900">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-coral-main">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setShowCart(false);
                      setShowCheckout(true);
                    }}
                    className="w-full bg-coral-main text-white py-3 rounded-xl font-semibold hover:bg-coral-secondary transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowCheckout(false)}
            />
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
              <div className="p-8">
                {/* Checkout Header */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Complete Your Order
                  </h2>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Customer Information Form */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.name}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-main/20 focus:border-coral-main transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={customerInfo.email}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-main/20 focus:border-coral-main transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-main/20 focus:border-coral-main transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.address.street}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          address: {
                            ...customerInfo.address,
                            street: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-main/20 focus:border-coral-main transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.address.city}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            address: {
                              ...customerInfo.address,
                              city: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-main/20 focus:border-coral-main transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Province
                      </label>
                      <select
                        required
                        value={customerInfo.address.state}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            address: {
                              ...customerInfo.address,
                              state: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-main/20 focus:border-coral-main transition-all"
                      >
                        <option value="">Select Province</option>
                        <option value="City of Kigali">City of Kigali</option>
                        <option value="Eastern Province">
                          Eastern Province
                        </option>
                        <option value="Northern Province">
                          Northern Province
                        </option>
                        <option value="Southern Province">
                          Southern Province
                        </option>
                        <option value="Western Province">
                          Western Province
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={customerInfo.address.zip}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            address: {
                              ...customerInfo.address,
                              zip: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-main/20 focus:border-coral-main transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        value={customerInfo.address.country}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600"
                      />
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Order Summary
                    </h3>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{item.image}</span>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">
                                {item.name}
                              </p>
                              <p className="text-gray-500 text-xs">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <span className="font-semibold text-coral-main">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 pt-3 mt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">
                            Total:
                          </span>
                          <span className="text-xl font-bold text-coral-main">
                            ${getTotalPrice().toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-coral-main text-white rounded-xl font-semibold text-lg hover:bg-coral-secondary transition-colors"
                  >
                    Place Order - ${getTotalPrice().toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;

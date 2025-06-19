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
  MessageSquare,
  Send,
  MapPin,
  Phone,
  Mail,
  Award,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CustomerPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeView, setActiveView] = useState("marketplace"); // marketplace, suppliers, products
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showSupplierProfile, setShowSupplierProfile] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chatSupplier, setChatSupplier] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewTarget, setReviewTarget] = useState(null); // { type: 'product' | 'supplier', id: string }
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showOrderTracking, setShowOrderTracking] = useState(false);
  const [showBulkOrderForm, setShowBulkOrderForm] = useState(false);
  const [bulkOrderProduct, setBulkOrderProduct] = useState(null);
  const [bulkOrderForm, setBulkOrderForm] = useState({
    quantity: "",
    targetPrice: "",
    deadline: "",
    notes: "",
    contactMethod: "email",
  });
  const [customerOrders] = useState([
    {
      id: "ORD-2024-001",
      supplierId: "sup1",
      supplierName: "Kigali Artisan Collective",
      items: [
        { name: "Handwoven Agaseke Basket", quantity: 2, price: 45.99 },
        { name: "Imigongo Art Painting", quantity: 1, price: 125.0 },
      ],
      total: 216.98,
      status: "processing",
      orderDate: "2024-01-15",
      estimatedDelivery: "2024-01-22",
      trackingNumber: "RT2024001",
      statusHistory: [
        {
          status: "placed",
          date: "2024-01-15 10:30",
          description: "Order placed successfully",
        },
        {
          status: "confirmed",
          date: "2024-01-15 11:15",
          description: "Order confirmed by supplier",
        },
        {
          status: "processing",
          date: "2024-01-16 09:00",
          description: "Items being prepared for shipment",
        },
      ],
    },
    {
      id: "ORD-2024-002",
      supplierId: "sup2",
      supplierName: "Thousand Hills Coffee",
      items: [{ name: "Rwandan Coffee Beans", quantity: 3, price: 28.5 }],
      total: 85.5,
      status: "shipped",
      orderDate: "2024-01-10",
      estimatedDelivery: "2024-01-17",
      trackingNumber: "RT2024002",
      statusHistory: [
        {
          status: "placed",
          date: "2024-01-10 14:20",
          description: "Order placed successfully",
        },
        {
          status: "confirmed",
          date: "2024-01-10 15:30",
          description: "Order confirmed by supplier",
        },
        {
          status: "processing",
          date: "2024-01-11 08:00",
          description: "Items being prepared for shipment",
        },
        {
          status: "shipped",
          date: "2024-01-12 16:45",
          description: "Package shipped via Rwanda Post",
        },
      ],
    },
  ]);

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

  // Suppliers data
  const [suppliers] = useState([
    {
      _id: "sup1",
      name: "Kigali Artisan Collective",
      description:
        "Traditional Rwandan crafts and handwoven items made by skilled local artisans",
      image: "🏪",
      rating: 4.8,
      totalReviews: 156,
      location: "Kigali, Rwanda",
      phone: "+250 788 123 456",
      email: "info@kigaliartisans.rw",
      established: "2018",
      specialties: ["Arts & Crafts", "Traditional Items"],
      totalProducts: 24,
      verified: true,
      responseTime: "Usually responds within 2 hours",
    },
    {
      _id: "sup2",
      name: "Thousand Hills Coffee",
      description: "Premium single-origin coffee from the hills of Rwanda",
      image: "☕",
      rating: 4.9,
      totalReviews: 203,
      location: "Nyungwe, Rwanda",
      phone: "+250 788 654 321",
      email: "orders@thousandhills.rw",
      established: "2015",
      specialties: ["Food & Beverages", "Coffee"],
      totalProducts: 12,
      verified: true,
      responseTime: "Usually responds within 1 hour",
    },
    {
      _id: "sup3",
      name: "EcoRwanda Products",
      description:
        "Sustainable and eco-friendly products made from local materials",
      image: "🌱",
      rating: 4.6,
      totalReviews: 89,
      location: "Butare, Rwanda",
      phone: "+250 788 987 654",
      email: "hello@ecorwanda.rw",
      established: "2020",
      specialties: ["Fashion & Accessories", "Eco-friendly"],
      totalProducts: 18,
      verified: true,
      responseTime: "Usually responds within 3 hours",
    },
    {
      _id: "sup4",
      name: "TechKigali Solutions",
      description: "Modern technology solutions with local innovation",
      image: "💻",
      rating: 4.7,
      totalReviews: 67,
      location: "Kigali, Rwanda",
      phone: "+250 788 456 789",
      email: "support@techkigali.rw",
      established: "2019",
      specialties: ["Electronics", "Technology"],
      totalProducts: 15,
      verified: true,
      responseTime: "Usually responds within 4 hours",
    },
  ]);

  // Enhanced products data with supplier references
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
      supplierId: "sup1",
      supplierName: "Kigali Artisan Collective",
      rating: 4.8,
      totalReviews: 34,
      views: 1240,
      images: ["🧺", "🎨", "🏺"],
      specifications: {
        material: "Natural fibers",
        dimensions: "30cm x 25cm",
        weight: "0.5kg",
        origin: "Kigali, Rwanda",
      },
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
      supplierId: "sup2",
      supplierName: "Thousand Hills Coffee",
      rating: 4.9,
      totalReviews: 67,
      views: 2150,
      images: ["☕", "🌱", "🏔️"],
      specifications: {
        type: "Arabica",
        roast: "Medium",
        origin: "Nyungwe Forest",
        altitude: "1,800m",
      },
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
      supplierId: "sup1",
      supplierName: "Kigali Artisan Collective",
      rating: 4.7,
      totalReviews: 23,
      views: 890,
      images: ["🎨", "🖼️", "🏺"],
      specifications: {
        material: "Natural cow dung, natural pigments",
        dimensions: "40cm x 30cm",
        weight: "2kg",
        origin: "Nyakarimbi, Rwanda",
      },
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
      supplierId: "sup3",
      supplierName: "EcoRwanda Products",
      rating: 4.6,
      totalReviews: 19,
      views: 756,
      images: ["💼", "🌱", "👜"],
      specifications: {
        material: "Banana fiber",
        dimensions: "35cm x 25cm x 5cm",
        weight: "0.8kg",
        capacity: "15-inch laptop",
      },
    },
    {
      _id: "5",
      name: "Solar-Powered Radio",
      description: "Portable solar radio supporting local Rwandan stations",
      price: 78.0,
      unit: "piece",
      stockQuantity: 12,
      category: "Electronics",
      image: "📻",
      supplierId: "sup4",
      supplierName: "TechKigali Solutions",
      rating: 4.8,
      totalReviews: 28,
      views: 1120,
      images: ["📻", "☀️", "🔋"],
      specifications: {
        power: "Solar + Battery",
        frequency: "FM/AM",
        battery: "2000mAh",
        features: "USB charging port",
      },
    },
  ]);

  // Sample reviews data
  const [reviews] = useState([
    {
      _id: "rev1",
      targetType: "product",
      targetId: "1",
      customerName: "Alice Mukamana",
      rating: 5,
      comment:
        "Beautiful basket! The craftsmanship is excellent and it arrived quickly.",
      date: "2024-01-10",
      verified: true,
    },
    {
      _id: "rev2",
      targetType: "supplier",
      targetId: "sup1",
      customerName: "Jean Baptiste",
      rating: 5,
      comment: "Amazing supplier! Great communication and authentic products.",
      date: "2024-01-08",
      verified: true,
    },
    {
      _id: "rev3",
      targetType: "product",
      targetId: "2",
      customerName: "Sarah Johnson",
      rating: 5,
      comment: "Best coffee I've ever tasted! Will definitely order again.",
      date: "2024-01-12",
      verified: true,
    },
  ]);

  // Sample chat messages
  const [chatMessages] = useState([
    {
      id: 1,
      supplierId: "sup1",
      customerName: "You",
      message:
        "Hi, I'm interested in bulk orders for the Agaseke baskets. Do you offer discounts?",
      timestamp: "2024-01-15 10:30",
      isFromCustomer: true,
    },
    {
      id: 2,
      supplierId: "sup1",
      customerName: "Kigali Artisan Collective",
      message:
        "Hello! Yes, we offer 10% discount for orders of 10+ baskets. Would you like more details?",
      timestamp: "2024-01-15 10:45",
      isFromCustomer: false,
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
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesSearch;
  });

  const getSupplierProducts = (supplierId) => {
    return products.filter((product) => product.supplierId === supplierId);
  };

  const getProductReviews = (productId) => {
    return reviews.filter(
      (review) =>
        review.targetType === "product" && review.targetId === productId
    );
  };

  const getSupplierReviews = (supplierId) => {
    return reviews.filter(
      (review) =>
        review.targetType === "supplier" && review.targetId === supplierId
    );
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

  const openSupplierProfile = (supplier) => {
    setSelectedSupplier(supplier);
    setShowSupplierProfile(true);
  };

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const startChat = (supplier) => {
    setChatSupplier(supplier);
    setShowChat(true);
  };

  const openReviewForm = (type, id) => {
    setReviewTarget({ type, id });
    setNewReview({ rating: 5, comment: "" });
    setShowReviewForm(true);
  };

  const submitReview = () => {
    console.log("Submitting review:", { ...newReview, target: reviewTarget });
    setShowReviewForm(false);
    setReviewTarget(null);
    setNewReview({ rating: 5, comment: "" });
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      console.log(
        "Sending message:",
        newMessage,
        "to supplier:",
        chatSupplier?.name
      );
      setNewMessage("");
    }
  };

  const toggleWishlist = (item, type = "product") => {
    setWishlist((prevWishlist) => {
      const existingIndex = prevWishlist.findIndex(
        (w) => w.id === item._id && w.type === type
      );
      if (existingIndex >= 0) {
        return prevWishlist.filter((_, index) => index !== existingIndex);
      } else {
        return [
          ...prevWishlist,
          { ...item, id: item._id, type, addedDate: new Date().toISOString() },
        ];
      }
    });
  };

  const isInWishlist = (itemId, type = "product") => {
    return wishlist.some((w) => w.id === itemId && w.type === type);
  };

  const openBulkOrderForm = (product) => {
    setBulkOrderProduct(product);
    setBulkOrderForm({
      quantity: "",
      targetPrice: "",
      deadline: "",
      notes: "",
      contactMethod: "email",
    });
    setShowBulkOrderForm(true);
  };

  const submitBulkOrder = () => {
    console.log("Submitting bulk order:", {
      product: bulkOrderProduct,
      ...bulkOrderForm,
    });
    alert(
      "Bulk order request sent! The supplier will contact you within 24 hours."
    );
    setShowBulkOrderForm(false);
    setBulkOrderProduct(null);
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "placed":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderMarketplace = () => (
    <div className="space-y-8">
      {/* Featured Suppliers Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Featured Suppliers
          </h2>
          <Button
            variant="outline"
            onClick={() => setActiveView("suppliers")}
            className="border-coral-main text-coral-main hover:bg-coral-whisper"
          >
            View All Suppliers <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {suppliers.slice(0, 4).map((supplier) => (
            <Card
              key={supplier._id}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
              onClick={() => openSupplierProfile(supplier)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {supplier.image}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-coral-main transition-colors">
                  {supplier.name}
                </h3>
                <div className="flex items-center justify-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(supplier.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({supplier.totalReviews})
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {supplier.specialties.join(", ")}
                </p>
                <Badge variant="outline" className="text-xs">
                  {supplier.totalProducts} products
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Featured Products
          </h2>
          <Button
            variant="outline"
            onClick={() => setActiveView("products")}
            className="border-coral-main text-coral-main hover:bg-coral-whisper"
          >
            View All Products <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product, index) => (
            <div
              key={product._id}
              className={`group bg-white rounded-2xl border border-gray-100 hover:border-coral-soft hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
              onClick={() => openProductDetails(product)}
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-50 flex items-center justify-center">
                <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product, "product");
                    }}
                    className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-colors ${
                      isInWishlist(product._id, "product")
                        ? "bg-coral-main text-white"
                        : "bg-white hover:bg-coral-whisper text-coral-main"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isInWishlist(product._id, "product")
                          ? "fill-current"
                          : ""
                      }`}
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openProductDetails(product);
                    }}
                    className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-coral-whisper transition-colors"
                  >
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
                      ({product.totalReviews})
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
                      {product.supplierName}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
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
      </section>
    </div>
  );

  const renderSuppliers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">All Suppliers</h2>
        <p className="text-sm text-gray-600">
          {filteredSuppliers.length} suppliers found
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <Card
            key={supplier._id}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
            onClick={() => openSupplierProfile(supplier)}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="text-4xl group-hover:scale-110 transition-transform">
                  {supplier.image}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-coral-main transition-colors">
                      {supplier.name}
                    </h3>
                    {supplier.verified && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        <Award className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(supplier.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                      {supplier.rating} ({supplier.totalReviews} reviews)
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {supplier.description}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    {supplier.location}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {supplier.specialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        variant="outline"
                        className="text-xs"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {supplier.totalProducts} products
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          startChat(supplier);
                        }}
                        className="text-xs"
                      >
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Chat
                      </Button>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openSupplierProfile(supplier);
                        }}
                        className="bg-coral-main hover:bg-coral-secondary text-white text-xs"
                      >
                        View Store
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">All Products</h2>
        <p className="text-sm text-gray-600">
          {filteredProducts.length} products found
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <div
            key={product._id}
            className={`group bg-white rounded-2xl border border-gray-100 hover:border-coral-soft hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${index * 50}ms` }}
            onClick={() => openProductDetails(product)}
          >
            {/* Product Image */}
            <div className="relative h-48 bg-gray-50 flex items-center justify-center">
              <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                {product.image}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product, "product");
                  }}
                  className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-colors ${
                    isInWishlist(product._id, "product")
                      ? "bg-coral-main text-white"
                      : "bg-white hover:bg-coral-whisper text-coral-main"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isInWishlist(product._id, "product") ? "fill-current" : ""
                    }`}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openProductDetails(product);
                  }}
                  className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-coral-whisper transition-colors"
                >
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
                    ({product.totalReviews})
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
                    {product.supplierName}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
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
  );

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

            {/* Navigation Tabs */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setActiveView("marketplace")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeView === "marketplace"
                    ? "text-coral-main border-b-2 border-coral-main"
                    : "text-gray-600 hover:text-coral-main"
                }`}
              >
                Marketplace
              </button>
              <button
                onClick={() => setActiveView("suppliers")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeView === "suppliers"
                    ? "text-coral-main border-b-2 border-coral-main"
                    : "text-gray-600 hover:text-coral-main"
                }`}
              >
                Suppliers
              </button>
              <button
                onClick={() => setActiveView("products")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeView === "products"
                    ? "text-coral-main border-b-2 border-coral-main"
                    : "text-gray-600 hover:text-coral-main"
                }`}
              >
                Products
              </button>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products, suppliers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-coral-main/20 focus:border-coral-main transition-all text-sm"
                />
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center space-x-3">
              {/* Wishlist */}
              <button
                onClick={() => setShowWishlist(true)}
                className="relative h-10 px-4 bg-white border border-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Wishlist</span>
                {wishlist.length > 0 && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-coral-main text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {wishlist.length}
                  </div>
                )}
              </button>

              {/* Order Tracking */}
              <button
                onClick={() => setShowOrderTracking(true)}
                className="relative h-10 px-4 bg-white border border-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Orders</span>
                {customerOrders.filter((o) => o.status !== "delivered").length >
                  0 && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {
                      customerOrders.filter((o) => o.status !== "delivered")
                        .length
                    }
                  </div>
                )}
              </button>

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
        </div>
      </nav>

      {/* Hero Section - Only show on marketplace view */}
      {activeView === "marketplace" && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className={`transition-all duration-1000 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
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
                Connect with local suppliers and discover authentic crafts,
                premium coffee, and cultural artifacts from the Land of a
                Thousand Hills
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
      )}

      {/* Categories - Show for products view */}
      {activeView === "products" && (
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
      )}

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeView === "marketplace" && renderMarketplace()}
          {activeView === "suppliers" && renderSuppliers()}
          {activeView === "products" && renderProducts()}
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

      {/* Supplier Profile Modal */}
      {showSupplierProfile && selectedSupplier && (
        <Dialog
          open={showSupplierProfile}
          onOpenChange={setShowSupplierProfile}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <span className="text-3xl">{selectedSupplier.image}</span>
                <div>
                  <div className="flex items-center space-x-2">
                    <span>{selectedSupplier.name}</span>
                    {selectedSupplier.verified && (
                      <Badge className="bg-green-100 text-green-800">
                        <Award className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(selectedSupplier.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      {selectedSupplier.rating} ({selectedSupplier.totalReviews}{" "}
                      reviews)
                    </span>
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Products by {selectedSupplier.name}
                  </h3>
                  <Button
                    onClick={() => startChat(selectedSupplier)}
                    className="bg-coral-main hover:bg-coral-secondary text-white"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat with Supplier
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getSupplierProducts(selectedSupplier._id).map((product) => (
                    <Card
                      key={product._id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="text-center mb-3">
                          <div className="text-4xl mb-2">{product.image}</div>
                          <h4 className="font-semibold text-gray-900">
                            {product.name}
                          </h4>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-bold text-coral-main">
                            ${product.price}
                          </span>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-500 ml-1">
                              {product.rating}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openProductDetails(product)}
                            className="flex-1"
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                            className="flex-1 bg-coral-main hover:bg-coral-secondary text-white"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="about" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">About</h3>
                    <p className="text-gray-600 mb-4">
                      {selectedSupplier.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedSupplier.location}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedSupplier.phone}
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedSupplier.email}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Established:</span>
                        <span>{selectedSupplier.established}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Products:</span>
                        <span>{selectedSupplier.totalProducts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Response Time:</span>
                        <span>{selectedSupplier.responseTime}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSupplier.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <Button
                    onClick={() =>
                      openReviewForm("supplier", selectedSupplier._id)
                    }
                    variant="outline"
                    className="border-coral-main text-coral-main hover:bg-coral-whisper"
                  >
                    Write Review
                  </Button>
                </div>
                <div className="space-y-4">
                  {getSupplierReviews(selectedSupplier._id).map((review) => (
                    <Card key={review._id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">
                                {review.customerName}
                              </span>
                              {review.verified && (
                                <Badge className="bg-green-100 text-green-800 text-xs">
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}

      {/* Product Details Modal */}
      {showProductDetails && selectedProduct && (
        <Dialog open={showProductDetails} onOpenChange={setShowProductDetails}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedProduct.name}</span>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const supplier = suppliers.find(
                        (s) => s._id === selectedProduct.supplierId
                      );
                      if (supplier) startChat(supplier);
                    }}
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => addToCart(selectedProduct)}
                    className="bg-coral-main hover:bg-coral-secondary text-white"
                  >
                    Add to Cart
                  </Button>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-center mb-4">
                  <div className="text-8xl mb-4">{selectedProduct.image}</div>
                  <div className="flex justify-center space-x-2">
                    {selectedProduct.images.map((img, index) => (
                      <div
                        key={index}
                        className="text-2xl p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        {img}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-bold text-coral-main">
                      ${selectedProduct.price}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(selectedProduct.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">
                        {selectedProduct.rating} ({selectedProduct.totalReviews}{" "}
                        reviews)
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {selectedProduct.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Specifications</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(selectedProduct.specifications).map(
                      ([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600 capitalize">
                            {key}:
                          </span>
                          <span>{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Supplier</h3>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="text-2xl">
                      {
                        suppliers.find(
                          (s) => s._id === selectedProduct.supplierId
                        )?.image
                      }
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {selectedProduct.supplierName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {
                          suppliers.find(
                            (s) => s._id === selectedProduct.supplierId
                          )?.location
                        }
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const supplier = suppliers.find(
                          (s) => s._id === selectedProduct.supplierId
                        );
                        if (supplier) openSupplierProfile(supplier);
                      }}
                    >
                      View Store
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() =>
                      openReviewForm("product", selectedProduct._id)
                    }
                    variant="outline"
                    className="flex-1 border-coral-main text-coral-main hover:bg-coral-whisper"
                  >
                    Write Review
                  </Button>
                  <Button
                    onClick={() => openBulkOrderForm(selectedProduct)}
                    variant="outline"
                    className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    Bulk Order
                  </Button>
                  <Button
                    onClick={() => addToCart(selectedProduct)}
                    className="flex-1 bg-coral-main hover:bg-coral-secondary text-white"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                {getProductReviews(selectedProduct._id).map((review) => (
                  <Card key={review._id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              {review.customerName}
                            </span>
                            {review.verified && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Chat Modal */}
      {showChat && chatSupplier && (
        <Dialog open={showChat} onOpenChange={setShowChat}>
          <DialogContent className="max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <span className="text-2xl">{chatSupplier.image}</span>
                <div>
                  <span>Chat with {chatSupplier.name}</span>
                  <p className="text-sm text-gray-500 font-normal">
                    {chatSupplier.responseTime}
                  </p>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col h-96">
              <div className="flex-1 overflow-y-auto p-4 border border-gray-200 rounded-lg mb-4 space-y-4">
                {chatMessages
                  .filter((m) => m.supplierId === chatSupplier._id)
                  .map((message) => (
                    <div
                      key={message.id}
                      className={`${
                        message.isFromCustomer ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`inline-block p-3 rounded-lg max-w-xs ${
                          message.isFromCustomer
                            ? "bg-coral-main text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.isFromCustomer
                              ? "text-coral-100"
                              : "text-gray-500"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  className="bg-coral-main hover:bg-coral-secondary text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Review Form Modal */}
      {showReviewForm && reviewTarget && (
        <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                Write a Review for{" "}
                {reviewTarget.type === "product"
                  ? products.find((p) => p._id === reviewTarget.id)?.name
                  : suppliers.find((s) => s._id === reviewTarget.id)?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setNewReview({ ...newReview, rating })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          rating <= newReview.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  placeholder="Share your experience..."
                  className="w-full p-3 border border-gray-200 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-coral-main/20 focus:border-coral-main"
                />
              </div>
              <Button
                onClick={submitReview}
                className="w-full bg-coral-main hover:bg-coral-secondary text-white"
              >
                Submit Review
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

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
                          <p className="text-xs text-gray-500">
                            {item.supplierName}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateCartQuantity(item._id, item.quantity - 1)
                            }
                            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={item.quantity <= 1}
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
                            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={item.quantity >= item.stockQuantity}
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
                                Qty: {item.quantity} • {item.supplierName}
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
                    disabled={cart.length === 0}
                  >
                    Place Order - ${getTotalPrice().toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Modal */}
      {showWishlist && (
        <Dialog open={showWishlist} onOpenChange={setShowWishlist}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-coral-main" />
                <span>My Wishlist ({wishlist.length} items)</span>
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="products">
                  Products (
                  {wishlist.filter((w) => w.type === "product").length})
                </TabsTrigger>
                <TabsTrigger value="suppliers">
                  Suppliers (
                  {wishlist.filter((w) => w.type === "supplier").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlist
                    .filter((w) => w.type === "product")
                    .map((item) => (
                      <Card
                        key={item.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4">
                          <div className="text-center mb-3">
                            <div className="text-4xl mb-2">{item.image}</div>
                            <h4 className="font-semibold text-gray-900">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {item.supplierName}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-lg font-bold text-coral-main">
                              ${item.price}
                            </span>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-500 ml-1">
                                {item.rating}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => {
                                const product = products.find(
                                  (p) => p._id === item.id
                                );
                                if (product) addToCart(product);
                              }}
                              className="flex-1 bg-coral-main hover:bg-coral-secondary text-white"
                            >
                              Add to Cart
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleWishlist(item, "product")}
                              className="text-red-500 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
                {wishlist.filter((w) => w.type === "product").length === 0 && (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      No products in your wishlist yet
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="suppliers" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {wishlist
                    .filter((w) => w.type === "supplier")
                    .map((item) => (
                      <Card
                        key={item.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className="text-3xl">{item.image}</div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">
                                {item.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {item.location}
                              </p>
                              <div className="flex items-center mt-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-500 ml-1">
                                  {item.rating} ({item.totalReviews})
                                </span>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleWishlist(item, "supplier")}
                              className="text-red-500 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
                {wishlist.filter((w) => w.type === "supplier").length === 0 && (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      No suppliers in your wishlist yet
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}

      {/* Order Tracking Modal */}
      {showOrderTracking && (
        <Dialog open={showOrderTracking} onOpenChange={setShowOrderTracking}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-coral-main" />
                <span>My Orders ({customerOrders.length})</span>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {customerOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    {/* Order Header */}
                    <div className="bg-gray-50 p-4 border-b">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {order.id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {order.supplierName}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={getOrderStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">
                            Total: ${order.total}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            Order Date
                          </h4>
                          <p className="text-sm text-gray-600">
                            {order.orderDate}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            Estimated Delivery
                          </h4>
                          <p className="text-sm text-gray-600">
                            {order.estimatedDelivery}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            Tracking Number
                          </h4>
                          <p className="text-sm font-mono text-coral-main">
                            {order.trackingNumber}
                          </p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Items
                        </h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded"
                            >
                              <span className="text-sm">
                                {item.name} × {item.quantity}
                              </span>
                              <span className="text-sm font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Status Timeline */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          Order Status
                        </h4>
                        <div className="space-y-3">
                          {order.statusHistory.map((status, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-3"
                            >
                              <div
                                className={`w-3 h-3 rounded-full mt-1 ${
                                  index === order.statusHistory.length - 1
                                    ? "bg-coral-main"
                                    : "bg-green-500"
                                }`}
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium capitalize">
                                    {status.status}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {status.date}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {status.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2 mt-4 pt-4 border-t">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const supplier = suppliers.find(
                              (s) => s._id === order.supplierId
                            );
                            if (supplier) startChat(supplier);
                          }}
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Contact Supplier
                        </Button>
                        {order.status === "delivered" && (
                          <Button
                            size="sm"
                            onClick={() =>
                              openReviewForm("supplier", order.supplierId)
                            }
                            className="bg-coral-main hover:bg-coral-secondary text-white"
                          >
                            Leave Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {customerOrders.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No orders yet</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Bulk Order Request Modal */}
      {showBulkOrderForm && bulkOrderProduct && (
        <Dialog open={showBulkOrderForm} onOpenChange={setShowBulkOrderForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <div className="text-2xl">{bulkOrderProduct.image}</div>
                <div>
                  <span>Bulk Order Request</span>
                  <p className="text-sm text-gray-600 font-normal">
                    {bulkOrderProduct.name}
                  </p>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Product Info */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{bulkOrderProduct.name}</h4>
                    <p className="text-sm text-gray-600">
                      {bulkOrderProduct.supplierName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-coral-main">
                      ${bulkOrderProduct.price}
                    </p>
                    <p className="text-xs text-gray-500">
                      per {bulkOrderProduct.unit}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bulk Order Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity Needed
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 100"
                    value={bulkOrderForm.quantity}
                    onChange={(e) =>
                      setBulkOrderForm({
                        ...bulkOrderForm,
                        quantity: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Price (per unit)
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 40.00"
                    value={bulkOrderForm.targetPrice}
                    onChange={(e) =>
                      setBulkOrderForm({
                        ...bulkOrderForm,
                        targetPrice: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Deadline
                </label>
                <Input
                  type="date"
                  value={bulkOrderForm.deadline}
                  onChange={(e) =>
                    setBulkOrderForm({
                      ...bulkOrderForm,
                      deadline: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Contact Method
                </label>
                <select
                  value={bulkOrderForm.contactMethod}
                  onChange={(e) =>
                    setBulkOrderForm({
                      ...bulkOrderForm,
                      contactMethod: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-200 rounded-md"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  placeholder="Any specific requirements, customizations, or questions..."
                  value={bulkOrderForm.notes}
                  onChange={(e) =>
                    setBulkOrderForm({
                      ...bulkOrderForm,
                      notes: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-200 rounded-lg h-24 resize-none"
                />
              </div>

              {/* Estimated Savings */}
              {bulkOrderForm.quantity && bulkOrderForm.targetPrice && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">
                    💰 Potential Savings
                  </h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Regular Price:</span>
                      <span>
                        $
                        {(
                          bulkOrderProduct.price *
                          Number.parseInt(bulkOrderForm.quantity || 0)
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Your Target Price:</span>
                      <span>
                        $
                        {(
                          Number.parseFloat(bulkOrderForm.targetPrice || 0) *
                          Number.parseInt(bulkOrderForm.quantity || 0)
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium text-green-700 border-t border-green-200 pt-1">
                      <span>Potential Savings:</span>
                      <span>
                        $
                        {(
                          (bulkOrderProduct.price -
                            Number.parseFloat(bulkOrderForm.targetPrice || 0)) *
                          Number.parseInt(bulkOrderForm.quantity || 0)
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowBulkOrderForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={submitBulkOrder}
                  className="flex-1 bg-coral-main hover:bg-coral-secondary text-white"
                  disabled={
                    !bulkOrderForm.quantity || !bulkOrderForm.targetPrice
                  }
                >
                  Send Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CustomerPage;

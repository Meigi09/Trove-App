"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Star,
  Users,
  Package,
  Truck,
  Shield,
  Heart,
  MapPin,
  Award,
  ChevronRight,
  CheckCircle,
  Globe,
  Coffee,
  Palette,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsLoaded(true);

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRoleSelection = (role) => {
    if (role === "customer") {
      window.location.href = "/customer";
    } else {
      // Store the selected role and redirect to login
      localStorage.setItem("selectedRole", role);
      window.location.href = "/login";
    }
  };

  const featuredProducts = [
    {
      id: 1,
      name: "Handwoven Agaseke Basket",
      price: 45.99,
      image: "🧺",
      supplier: "Kigali Artisan Collective",
      rating: 4.8,
      reviews: 34,
    },
    {
      id: 2,
      name: "Premium Coffee Beans",
      price: 28.5,
      image: "☕",
      supplier: "Thousand Hills Coffee",
      rating: 4.9,
      reviews: 67,
    },
    {
      id: 3,
      name: "Imigongo Art Painting",
      price: 125.0,
      image: "🎨",
      supplier: "Kigali Artisan Collective",
      rating: 4.7,
      reviews: 23,
    },
    {
      id: 4,
      name: "Banana Fiber Laptop Bag",
      price: 65.0,
      image: "💼",
      supplier: "EcoRwanda Products",
      rating: 4.6,
      reviews: 19,
    },
  ];

  const suppliers = [
    {
      id: 1,
      name: "Kigali Artisan Collective",
      image: "🏪",
      specialties: ["Arts & Crafts", "Traditional Items"],
      rating: 4.8,
      products: 24,
      verified: true,
    },
    {
      id: 2,
      name: "Thousand Hills Coffee",
      image: "☕",
      specialties: ["Food & Beverages", "Coffee"],
      rating: 4.9,
      products: 12,
      verified: true,
    },
    {
      id: 3,
      name: "EcoRwanda Products",
      image: "🌱",
      specialties: ["Fashion & Accessories", "Eco-friendly"],
      rating: 4.6,
      products: 18,
      verified: true,
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Alice Mukamana",
      role: "Customer",
      content:
        "Rwanda Treasures connected me with authentic local artisans. The quality is exceptional and the delivery was fast!",
      rating: 5,
      avatar: "👩🏾",
    },
    {
      id: 2,
      name: "Jean Baptiste Uwimana",
      role: "Supplier",
      content:
        "This platform helped me reach customers worldwide. My traditional crafts business has grown 300% since joining!",
      rating: 5,
      avatar: "👨🏾",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      role: "International Customer",
      content:
        "I love supporting Rwandan businesses. The coffee beans I ordered are the best I've ever tasted!",
      rating: 5,
      avatar: "👩🏼",
    },
  ];

  const stats = [
    { label: "Active Suppliers", value: "500+", icon: Users },
    { label: "Products Listed", value: "2,000+", icon: Package },
    { label: "Happy Customers", value: "10,000+", icon: Heart },
    { label: "Countries Served", value: "25+", icon: Globe },
  ];

  const categories = [
    { name: "Arts & Crafts", icon: Palette, count: "450+ products" },
    { name: "Food & Beverages", icon: Coffee, count: "320+ products" },
    { name: "Fashion & Accessories", icon: "👜", count: "280+ products" },
    { name: "Electronics", icon: Smartphone, count: "150+ products" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-coral-main rounded-xl flex items-center justify-center text-white font-bold text-lg">
                R
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Rwanda Treasures
                </h1>
                <p className="text-xs text-gray-500">Ubwoba bw'u Rwanda</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-coral-main transition-colors"
              >
                Features
              </a>
              <a
                href="#products"
                className="text-gray-600 hover:text-coral-main transition-colors"
              >
                Products
              </a>
              <a
                href="#suppliers"
                className="text-gray-600 hover:text-coral-main transition-colors"
              >
                Suppliers
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-coral-main transition-colors"
              >
                About
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => handleRoleSelection("supplier")}
                className="border-coral-main text-coral-main hover:bg-coral-whisper"
              >
                Become a Supplier
              </Button>
              <Button
                onClick={() => handleRoleSelection("customer")}
                className="bg-coral-main hover:bg-coral-secondary text-white"
              >
                Start Shopping
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-coral-whisper via-white to-coral-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div
              className={`transition-all duration-1000 ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="inline-flex items-center space-x-2 bg-coral-main/10 px-4 py-2 rounded-full mb-6">
                <Award className="w-4 h-4 text-coral-main" />
                <span className="text-sm font-medium text-coral-main">
                  Trusted by 10,000+ customers
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Discover Rwanda's
                <br />
                <span className="text-coral-main">Finest Treasures</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with authentic local suppliers and discover premium
                crafts, coffee, and cultural artifacts from the Land of a
                Thousand Hills. Support local businesses while getting unique,
                high-quality products.
              </p>

              {/* Role Selection Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-coral-main group"
                  onClick={() => handleRoleSelection("customer")}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-coral-whisper rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-coral-main transition-colors">
                      <Package className="w-6 h-6 text-coral-main group-hover:text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      I'm a Customer
                    </h3>
                    <p className="text-sm text-gray-600">
                      Browse and buy authentic products
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-coral-main group"
                  onClick={() => handleRoleSelection("supplier")}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-coral-whisper rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-coral-main transition-colors">
                      <Users className="w-6 h-6 text-coral-main group-hover:text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      I'm a Supplier
                    </h3>
                    <p className="text-sm text-gray-600">
                      Sell your products globally
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-coral-main group"
                  onClick={() => handleRoleSelection("admin")}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-coral-whisper rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-coral-main transition-colors">
                      <Shield className="w-6 h-6 text-coral-main group-hover:text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      I'm an Admin
                    </h3>
                    <p className="text-sm text-gray-600">Manage the platform</p>
                  </CardContent>
                </Card>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Verified Suppliers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span className="text-sm">Secure Payments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-purple-500" />
                  <span className="text-sm">Fast Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Content - Product Showcase */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative">
                {/* Main Product Card */}
                <Card className="relative z-10 bg-white shadow-2xl">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="text-8xl mb-4">🧺</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Handwoven Agaseke Basket
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Traditional Rwandan peace basket
                      </p>
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          (34 reviews)
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-coral-main">
                          $45.99
                        </span>
                        <Button className="bg-coral-main hover:bg-coral-secondary text-white">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-coral-main rounded-full flex items-center justify-center text-white font-bold text-lg animate-bounce">
                  🎨
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-coral-secondary rounded-full flex items-center justify-center text-white font-bold animate-pulse">
                  ☕
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-1000 delay-${
                  index * 100
                } ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="w-16 h-16 bg-coral-main rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover handpicked treasures from Rwanda's finest artisans and
              producers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <Card
                key={product.id}
                className={`group cursor-pointer hover:shadow-xl transition-all duration-500 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {product.image}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-coral-main transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {product.supplier}
                    </p>
                    <div className="flex items-center justify-center space-x-1 mb-3">
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
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-coral-main">
                      ${product.price}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => handleRoleSelection("customer")}
              className="bg-coral-main hover:bg-coral-secondary text-white px-8 py-3"
            >
              View All Products <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Explore our diverse range of authentic Rwandan products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card
                key={category.name}
                className={`cursor-pointer hover:shadow-lg transition-all duration-500 group ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => handleRoleSelection("customer")}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-coral-whisper rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-coral-main transition-colors">
                    {typeof category.icon === "string" ? (
                      <span className="text-2xl">{category.icon}</span>
                    ) : (
                      <category.icon className="w-8 h-8 text-coral-main group-hover:text-white" />
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-coral-main transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Suppliers Section */}
      <section id="suppliers" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted Suppliers
            </h2>
            <p className="text-xl text-gray-600">
              Meet the artisans and businesses behind our amazing products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {suppliers.map((supplier, index) => (
              <Card
                key={supplier.id}
                className={`cursor-pointer hover:shadow-xl transition-all duration-500 group ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {supplier.image}
                  </div>
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <h3 className="font-bold text-gray-900 group-hover:text-coral-main transition-colors">
                      {supplier.name}
                    </h3>
                    {supplier.verified && (
                      <Badge className="bg-green-100 text-green-800">
                        <Award className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-center space-x-1 mb-3">
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
                    <span className="text-sm text-gray-500">
                      ({supplier.rating})
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
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
                  <p className="text-sm text-gray-600">
                    {supplier.products} products
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => handleRoleSelection("supplier")}
              variant="outline"
              className="border-coral-main text-coral-main hover:bg-coral-whisper px-8 py-3"
            >
              Become a Supplier <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from customers and suppliers
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-12">
                <div className="text-center">
                  <div className="text-6xl mb-6">
                    {testimonials[activeTestimonial].avatar}
                  </div>
                  <div className="flex items-center justify-center space-x-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed">
                    "{testimonials[activeTestimonial].content}"
                  </blockquote>
                  <div>
                    <div className="font-bold text-gray-900">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-coral-main">
                      {testimonials[activeTestimonial].role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial
                      ? "bg-coral-main"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Rwanda Treasures?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the best of Rwandan commerce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Verified Suppliers",
                description:
                  "All our suppliers are thoroughly vetted and verified for quality and authenticity.",
              },
              {
                icon: Package,
                title: "Quality Products",
                description:
                  "Handpicked products that represent the best of Rwandan craftsmanship and innovation.",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description:
                  "Quick and reliable delivery to your doorstep, both locally and internationally.",
              },
              {
                icon: Heart,
                title: "Support Local",
                description:
                  "Every purchase directly supports local artisans and small businesses in Rwanda.",
              },
              {
                icon: Globe,
                title: "Global Reach",
                description:
                  "Connect Rwandan suppliers with customers around the world.",
              },
              {
                icon: CheckCircle,
                title: "Secure Payments",
                description:
                  "Safe and secure payment processing with multiple payment options.",
              },
            ].map((feature, index) => (
              <Card
                key={feature.title}
                className={`text-center hover:shadow-lg transition-all duration-500 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-coral-whisper rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-coral-main" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-coral-main to-coral-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Discover Rwanda's Treasures?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of customers and suppliers who are already part of
              our thriving marketplace
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => handleRoleSelection("customer")}
                className="bg-white text-coral-main hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                Start Shopping Now
              </Button>
              <Button
                onClick={() => handleRoleSelection("supplier")}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-coral-main px-8 py-4 text-lg font-semibold"
              >
                Become a Supplier
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-coral-main rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  R
                </div>
                <div>
                  <h3 className="text-xl font-bold">Rwanda Treasures</h3>
                  <p className="text-gray-400 text-sm">Ubwoba bw'u Rwanda</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Connecting Rwanda's finest suppliers with customers worldwide.
                Discover authentic crafts, premium coffee, and cultural
                artifacts while supporting local businesses.
              </p>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Kigali, Rwanda</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#products"
                    className="hover:text-white transition-colors"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#suppliers"
                    className="hover:text-white transition-colors"
                  >
                    Suppliers
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => handleRoleSelection("customer")}
                    className="hover:text-white transition-colors"
                  >
                    Shop Now
                  </button>
                </li>
              </ul>
            </div>

            {/* For Business */}
            <div>
              <h4 className="font-semibold mb-4">For Business</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => handleRoleSelection("supplier")}
                    className="hover:text-white transition-colors"
                  >
                    Become a Supplier
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleRoleSelection("admin")}
                    className="hover:text-white transition-colors"
                  >
                    Admin Portal
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Rwanda Treasures. Made with ❤️ in the Land of a Thousand
              Hills.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

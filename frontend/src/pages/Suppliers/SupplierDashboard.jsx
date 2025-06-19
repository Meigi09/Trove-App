"use client";

import { useState } from "react";
import {
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  Package2,
  ShoppingBag,
  User,
  MessageSquare,
  Send,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SupplierDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [categories, setCategories] = useState([
    {
      _id: "cat1",
      name: "Arts & Crafts",
      description: "Traditional Rwandan crafts and artwork",
      productCount: 2,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      _id: "cat2",
      name: "Food & Beverages",
      description: "Local food products and beverages",
      productCount: 1,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      _id: "cat3",
      name: "Fashion & Accessories",
      description: "Clothing and fashion accessories",
      productCount: 0,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
  ]);

  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [showOrderTracking, setShowOrderTracking] = useState(false);
  const [selectedOrderForTracking, setSelectedOrderForTracking] =
    useState(null);
  const [showBulkOrders, setShowBulkOrders] = useState(false);
  const [bulkOrders] = useState([
    {
      id: "BULK-001",
      customerId: "cust1",
      customerName: "Alice Mukamana",
      customerEmail: "alice@example.com",
      customerPhone: "+250 788 123 456",
      productId: "1",
      productName: "Handwoven Agaseke Basket",
      quantity: 50,
      currentPrice: 45.99,
      targetPrice: 40.0,
      deadline: "2024-02-15",
      contactMethod: "email",
      notes:
        "Need these for a hotel chain. Looking for consistent quality and bulk pricing.",
      status: "pending", // pending, quoted, accepted, rejected
      requestDate: "2024-01-16",
      potentialValue: 2000.0,
    },
    {
      id: "BULK-002",
      customerId: "cust2",
      customerName: "John Baptiste",
      customerEmail: "john@example.com",
      customerPhone: "+250 788 654 321",
      productId: "3",
      productName: "Imigongo Art Painting",
      quantity: 20,
      currentPrice: 125.0,
      targetPrice: 110.0,
      deadline: "2024-02-20",
      contactMethod: "phone",
      notes:
        "For an art gallery exhibition. Need authentic pieces with certificates.",
      status: "quoted",
      requestDate: "2024-01-14",
      quotedPrice: 115.0,
      potentialValue: 2300.0,
    },
  ]);

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    cost: "",
    stock: "",
    category: "",
    unit: "piece",
    image: "📦",
  });

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      customerId: 1,
      customerName: "John Doe",
      message:
        "Hi, I'm interested in bulk orders for the Agaseke baskets. Can you provide wholesale pricing?",
      timestamp: "2024-01-15 10:30",
      isRead: false,
      isFromCustomer: true,
    },
    {
      id: 2,
      customerId: 2,
      customerName: "Jane Smith",
      message:
        "Thank you for the quick delivery! The coffee beans are excellent quality.",
      timestamp: "2024-01-14 15:45",
      isRead: true,
      isFromCustomer: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  // Sample data
  const [products] = useState([
    {
      id: 1,
      name: "Handwoven Agaseke Basket",
      category: "Arts & Crafts",
      price: 45.99,
      stock: 25,
      status: "active",
      image: "🧺",
    },
    {
      id: 2,
      name: "Rwandan Coffee Beans",
      category: "Food & Beverages",
      price: 28.5,
      stock: 35,
      status: "active",
      image: "☕",
    },
    {
      id: 3,
      name: "Imigongo Art Painting",
      category: "Arts & Crafts",
      price: 125.0,
      stock: 8,
      status: "low_stock",
      image: "🎨",
    },
  ]);

  const [orders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      phone: "+250 788 123 456",
      address: {
        street: "123 Kigali Street",
        city: "Gasabo District",
        state: "Kigali",
        zip: "00100",
        country: "Rwanda",
      },
      items: 3,
      total: 156.47,
      status: "pending", // Will be auto-calculated based on packing status
      date: "2024-01-15",
      orderItems: [
        {
          _id: "item1",
          productId: "prod1",
          productName: "Handwoven Agaseke Basket",
          productImage: "🧺",
          category: "Arts & Crafts",
          quantity: 2,
          unitPrice: 45.99,
          totalPrice: 91.98,
          sku: "AGS-001",
          weight: "0.5kg each",
          dimensions: "30x25x15cm",
          fragile: true,
          specialNotes: "Wrap individually",
          storageLocation: "Shelf A-12",
          isPacked: false,
        },
        {
          _id: "item2",
          productId: "prod2",
          productName: "Rwandan Coffee Beans",
          productImage: "☕",
          category: "Food & Beverages",
          quantity: 1,
          unitPrice: 28.5,
          totalPrice: 28.5,
          sku: "COF-002",
          weight: "1kg",
          dimensions: "20x15x8cm",
          fragile: false,
          specialNotes: "Keep dry",
          storageLocation: "Shelf B-05",
          isPacked: false,
        },
        {
          _id: "item3",
          productId: "prod3",
          productName: "Traditional Honey",
          productImage: "🍯",
          category: "Food & Beverages",
          quantity: 1,
          unitPrice: 35.99,
          totalPrice: 35.99,
          sku: "HON-003",
          weight: "0.5kg",
          dimensions: "12x12x15cm",
          fragile: true,
          specialNotes: "Handle with care - glass jar",
          storageLocation: "Shelf B-08",
          isPacked: false,
        },
      ],
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      phone: "+250 788 654 321",
      address: {
        street: "456 Nyamirambo Road",
        city: "Nyarugenge District",
        state: "Kigali",
        zip: "00200",
        country: "Rwanda",
      },
      items: 2,
      total: 74.49,
      status: "delivered",
      date: "2024-01-14",
      orderItems: [
        {
          _id: "item4",
          productId: "prod2",
          productName: "Rwandan Coffee Beans",
          productImage: "☕",
          category: "Food & Beverages",
          quantity: 2,
          unitPrice: 28.5,
          totalPrice: 57.0,
          sku: "COF-002",
          weight: "1kg each",
          dimensions: "20x15x8cm",
          fragile: false,
          specialNotes: "Keep dry",
          storageLocation: "Shelf B-05",
          isPacked: true,
        },
        {
          _id: "item5",
          productId: "prod4",
          productName: "Banana Fiber Bag",
          productImage: "👜",
          category: "Fashion & Accessories",
          quantity: 1,
          unitPrice: 17.49,
          totalPrice: 17.49,
          sku: "BAG-004",
          weight: "0.3kg",
          dimensions: "35x25x10cm",
          fragile: false,
          specialNotes: "Eco-friendly packaging",
          storageLocation: "Shelf C-02",
          isPacked: true,
        },
      ],
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      email: "mike@example.com",
      phone: "+250 788 987 654",
      address: {
        street: "789 Kimisagara Street",
        city: "Nyarugenge District",
        state: "Kigali",
        zip: "00300",
        country: "Rwanda",
      },
      items: 1,
      total: 45.99,
      status: "processing",
      date: "2024-01-13",
      orderItems: [
        {
          _id: "item6",
          productId: "prod1",
          productName: "Handwoven Agaseke Basket",
          productImage: "🧺",
          category: "Arts & Crafts",
          quantity: 1,
          unitPrice: 45.99,
          totalPrice: 45.99,
          sku: "AGS-001",
          weight: "0.5kg",
          dimensions: "30x25x15cm",
          fragile: true,
          specialNotes: "Wrap individually",
          storageLocation: "Shelf A-12",
          isPacked: true,
        },
      ],
    },
  ]);

  const [customers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+250 788 123 456",
      orders: 5,
      totalSpent: 342.15,
      lastOrder: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+250 788 654 321",
      orders: 3,
      totalSpent: 198.75,
      lastOrder: "2024-01-14",
    },
  ]);

  const getBulkOrderStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "quoted":
        return "bg-blue-100 text-blue-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const updateBulkOrderStatus = (
    bulkOrderId,
    newStatus,
    quotedPrice = null
  ) => {
    console.log(
      `Updating bulk order ${bulkOrderId} to ${newStatus}`,
      quotedPrice ? `with price ${quotedPrice}` : ""
    );
    // Update bulk order status logic here
  };

  const openOrderTracking = (order) => {
    setSelectedOrderForTracking(order);
    setShowOrderTracking(true);
  };

  const sidebarItems = [
    {
      title: "Overview",
      icon: BarChart3,
      id: "overview",
    },
    {
      title: "Products",
      icon: Package,
      id: "products",
    },
    {
      title: "Categories",
      icon: Package2,
      id: "categories",
    },
    {
      title: "Orders",
      icon: ShoppingCart,
      id: "orders",
    },
    {
      title: "Bulk Orders",
      icon: ShoppingBag,
      id: "bulk-orders",
      badge: bulkOrders.filter((b) => b.status === "pending").length,
    },
    {
      title: "Customers",
      icon: Users,
      id: "customers",
    },
    {
      title: "Messages",
      icon: MessageSquare,
      id: "messages",
      badge: messages.filter((m) => !m.isRead).length,
    },
    {
      title: "Settings",
      icon: Settings,
      id: "settings",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "low_stock":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    // Update order status logic here
    console.log(`Updating order ${orderId} to ${newStatus}`);
  };

  const calculateOrderStatus = (orderItems) => {
    const totalItems = orderItems.length;
    const packedItems = orderItems.filter((item) => item.isPacked).length;

    if (packedItems === 0) {
      return "pending"; // No items packed yet
    } else if (packedItems === totalItems) {
      return "ready_to_ship"; // All items packed
    } else {
      return "processing"; // Some items packed
    }
  };

  const getOrderStatusDisplay = (status) => {
    switch (status) {
      case "pending":
        return { text: "Not Started", color: "bg-gray-100 text-gray-800" };
      case "processing":
        return {
          text: "Packing in Progress",
          color: "bg-blue-100 text-blue-800",
        };
      case "ready_to_ship":
        return { text: "Ready to Ship", color: "bg-green-100 text-green-800" };
      case "shipped":
        return { text: "Shipped", color: "bg-purple-100 text-purple-800" };
      case "delivered":
        return { text: "Delivered", color: "bg-green-100 text-green-800" };
      case "cancelled":
        return { text: "Cancelled", color: "bg-red-100 text-red-800" };
      default:
        return { text: status, color: "bg-gray-100 text-gray-800" };
    }
  };

  const toggleItemPacked = (orderId, itemId) => {
    // Update the specific item's packed status
    console.log(
      `Toggling packed status for item ${itemId} in order ${orderId}`
    );
    // This would update the order in your state/database
    // After updating, recalculate the order status based on all items
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package2 className="h-4 w-4 text-coral-main" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-coral-main">
              {products.length}
            </div>
            <p className="text-xs text-gray-600">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-coral-main" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-coral-main">
              {orders.length}
            </div>
            <p className="text-xs text-gray-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-coral-main" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-coral-main">
              ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </div>
            <p className="text-xs text-gray-600">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-coral-main" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-coral-main">
              {customers.length}
            </div>
            <p className="text-xs text-gray-600">+3 new this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
              >
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.total}</p>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Products</h2>
        <Button
          onClick={() => {
            setEditingProduct(null);
            setProductForm({
              name: "",
              description: "",
              price: "",
              cost: "",
              stock: "",
              category: "",
              unit: "piece",
              image: "📦",
            });
            setShowProductForm(true);
          }}
          className="bg-coral-main hover:bg-coral-secondary text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-md"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{product.image}</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setEditingProduct(product);
                        setProductForm({
                          name: product.name,
                          description: product.description || "",
                          price: product.price.toString(),
                          cost: product.cost?.toString() || "",
                          stock: product.stock.toString(),
                          category: product.category,
                          unit: product.unit || "piece",
                          image: product.image,
                        });
                        setShowProductForm(true);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-coral-main">
                  ${product.price}
                </span>
                <Badge className={getStatusColor(product.status)}>
                  {product.stock} in stock
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <Dialog open={showProductForm} onOpenChange={setShowProductForm}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Product name"
                value={productForm.name}
                onChange={(e) =>
                  setProductForm({ ...productForm, name: e.target.value })
                }
              />
              <textarea
                placeholder="Product description"
                value={productForm.description}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-200 rounded-md h-20 resize-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Price"
                  type="number"
                  value={productForm.price}
                  onChange={(e) =>
                    setProductForm({ ...productForm, price: e.target.value })
                  }
                />
                <Input
                  placeholder="Cost"
                  type="number"
                  value={productForm.cost}
                  onChange={(e) =>
                    setProductForm({ ...productForm, cost: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Stock quantity"
                  type="number"
                  value={productForm.stock}
                  onChange={(e) =>
                    setProductForm({ ...productForm, stock: e.target.value })
                  }
                />
                <select
                  value={productForm.unit}
                  onChange={(e) =>
                    setProductForm({ ...productForm, unit: e.target.value })
                  }
                  className="p-2 border border-gray-200 rounded-md"
                >
                  <option value="piece">Piece</option>
                  <option value="kg">Kilogram</option>
                  <option value="liter">Liter</option>
                  <option value="meter">Meter</option>
                </select>
              </div>
              <select
                value={productForm.category}
                onChange={(e) =>
                  setProductForm({ ...productForm, category: e.target.value })
                }
                className="w-full p-2 border border-gray-200 rounded-md"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <Input
                placeholder="Product emoji/icon"
                value={productForm.image}
                onChange={(e) =>
                  setProductForm({ ...productForm, image: e.target.value })
                }
              />
              <Button
                className="w-full bg-coral-main hover:bg-coral-secondary text-white"
                onClick={() => {
                  // Handle product save logic here
                  console.log("Saving product:", productForm);
                  setShowProductForm(false);
                }}
              >
                {editingProduct ? "Update Product" : "Add Product"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Categories</h2>
        <Button
          onClick={() => {
            setEditingCategory(null);
            setCategoryForm({ name: "", description: "" });
            setShowCategoryForm(true);
          }}
          className="bg-coral-main hover:bg-coral-secondary text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card
            key={category._id}
            className="hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Package2 className="w-8 h-8 text-coral-main" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setEditingCategory(category);
                        setCategoryForm({
                          name: category.name,
                          description: category.description,
                        });
                        setShowCategoryForm(true);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {category.productCount} products
                </span>
                <Badge variant="outline">
                  {category.productCount > 0 ? "Active" : "Empty"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Form Modal */}
      {showCategoryForm && (
        <Dialog open={showCategoryForm} onOpenChange={setShowCategoryForm}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Add New Category"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Category name"
                value={categoryForm.name}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, name: e.target.value })
                }
              />
              <textarea
                placeholder="Category description"
                value={categoryForm.description}
                onChange={(e) =>
                  setCategoryForm({
                    ...categoryForm,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-200 rounded-md h-20 resize-none"
              />
              <Button
                className="w-full bg-coral-main hover:bg-coral-secondary text-white"
                onClick={() => {
                  // Handle category save logic here
                  console.log("Saving category:", categoryForm);
                  setShowCategoryForm(false);
                }}
              >
                {editingCategory ? "Update Category" : "Add Category"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Orders</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.customer}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.items}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-coral-main">
                      ${order.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        className={
                          getOrderStatusDisplay(
                            calculateOrderStatus(order.orderItems)
                          ).color
                        }
                      >
                        {
                          getOrderStatusDisplay(
                            calculateOrderStatus(order.orderItems)
                          ).text
                        }
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openOrderTracking(order)}
                          title="Track Order"
                        >
                          <Package className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowOrderDetails(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() =>
                                updateOrderStatus(order.id, "processing")
                              }
                            >
                              <Clock className="w-4 h-4 mr-2" />
                              Mark Processing
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                updateOrderStatus(order.id, "delivered")
                              }
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark Delivered
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                updateOrderStatus(order.id, "cancelled")
                              }
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Cancel Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
          <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Order Details - {selectedOrder.id}</span>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={
                      getOrderStatusDisplay(
                        calculateOrderStatus(selectedOrder.orderItems)
                      ).color
                    }
                  >
                    {
                      getOrderStatusDisplay(
                        calculateOrderStatus(selectedOrder.orderItems)
                      ).text
                    }
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {
                      selectedOrder.orderItems.filter((item) => item.isPacked)
                        .length
                    }{" "}
                    of {selectedOrder.orderItems.length} items packed
                  </span>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Order Header Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold mb-2 text-coral-main">
                    Customer Information
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Name:</strong> {selectedOrder.customer}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedOrder.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedOrder.phone}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-coral-main">
                    Delivery Address
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>{selectedOrder.address.street}</p>
                    <p>{selectedOrder.address.city}</p>
                    <p>
                      {selectedOrder.address.state},{" "}
                      {selectedOrder.address.country}
                    </p>
                    <p>Postal Code: {selectedOrder.address.zip}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-coral-main">
                    Order Summary
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Order Date:</strong> {selectedOrder.date}
                    </p>
                    <p>
                      <strong>Items:</strong> {selectedOrder.items}
                    </p>
                    <p>
                      <strong>Total:</strong>{" "}
                      <span className="text-coral-main font-semibold">
                        ${selectedOrder.total}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Packing Progress */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-blue-800">
                    📦 Packing Progress
                  </h4>
                  <div className="text-sm text-blue-600">
                    {
                      selectedOrder.orderItems.filter((item) => item.isPacked)
                        .length
                    }{" "}
                    / {selectedOrder.orderItems.length} items packed
                  </div>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        (selectedOrder.orderItems.filter(
                          (item) => item.isPacked
                        ).length /
                          selectedOrder.orderItems.length) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Order Items - Detailed Packing List */}
              <div className="border-2 border-coral-main rounded-lg p-4 bg-coral-whisper/20">
                <h4 className="font-semibold mb-4 text-coral-main flex items-center">
                  📋 Order Items - Packing Checklist
                </h4>
                <div className="space-y-4">
                  {selectedOrder.orderItems.map((item, index) => (
                    <div
                      key={item._id}
                      className={`bg-white p-4 rounded-lg border-2 transition-all ${
                        item.isPacked
                          ? "border-green-300 bg-green-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{item.productImage}</div>
                          <div>
                            <h5 className="font-semibold flex items-center">
                              {item.productName}
                              {item.isPacked && (
                                <span className="ml-2 text-green-600">✅</span>
                              )}
                            </h5>
                            <p className="text-sm text-gray-600">
                              Category: {item.category}
                            </p>
                            <p className="text-xs text-gray-500">
                              SKU: {item.sku}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-coral-main">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-600">
                            ${item.unitPrice} each
                          </p>
                          <p className="text-sm font-medium">
                            ${item.totalPrice} total
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <p>
                            <strong>Weight:</strong> {item.weight}
                          </p>
                          <p>
                            <strong>Dimensions:</strong> {item.dimensions}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Fragile:</strong>{" "}
                            {item.fragile ? "⚠️ Yes" : "No"}
                          </p>
                          <p>
                            <strong>Location:</strong> {item.storageLocation}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Special Notes:</strong>
                          </p>
                          <p className="text-gray-600">{item.specialNotes}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`item-${item._id}`}
                            checked={item.isPacked}
                            onChange={() =>
                              toggleItemPacked(selectedOrder.id, item._id)
                            }
                            className="w-4 h-4 text-coral-main border-gray-300 rounded focus:ring-coral-main"
                          />
                          <label
                            htmlFor={`item-${item._id}`}
                            className="text-sm font-medium"
                          >
                            {item.isPacked
                              ? "✅ Packed and ready"
                              : "📦 Mark as packed"}
                          </label>
                        </div>
                        {item.fragile && (
                          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                            ⚠️ Handle with care
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-800">
                    📋 Packaging Requirements
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>
                      • Total Weight:{" "}
                      {selectedOrder.orderItems
                        .reduce(
                          (sum, item) =>
                            sum +
                            Number.parseFloat(
                              item.weight.replace(/[^\d.]/g, "")
                            ),
                          0
                        )
                        .toFixed(1)}
                      kg
                    </li>
                    <li>
                      • Fragile Items:{" "}
                      {
                        selectedOrder.orderItems.filter((item) => item.fragile)
                          .length
                      }
                    </li>
                    <li>
                      • Special Handling Required:{" "}
                      {selectedOrder.orderItems.filter((item) => item.fragile)
                        .length > 0
                        ? "Yes"
                        : "No"}
                    </li>
                    <li>
                      • Total Items:{" "}
                      {selectedOrder.orderItems.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      )}{" "}
                      pieces
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-2 text-green-800">
                    🚚 Delivery Information
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• Estimated Delivery: 2-3 business days</li>
                    <li>• Delivery Method: Standard shipping</li>
                    <li>
                      • Insurance:{" "}
                      {selectedOrder.orderItems.some((item) => item.fragile)
                        ? "Required"
                        : "Optional"}
                    </li>
                    <li>• Tracking: Will be generated upon shipping</li>
                  </ul>
                </div>
              </div>

              {/* Order Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  {calculateOrderStatus(selectedOrder.orderItems) ===
                    "ready_to_ship" && (
                    <Button
                      onClick={() =>
                        updateOrderStatus(selectedOrder.id, "shipped")
                      }
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      🚚 Mark as Shipped
                    </Button>
                  )}
                  {calculateOrderStatus(selectedOrder.orderItems) ===
                    "processing" && (
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-600 hover:bg-blue-50"
                    >
                      ⏳ Continue Packing
                    </Button>
                  )}
                  {calculateOrderStatus(selectedOrder.orderItems) ===
                    "pending" && (
                    <Button
                      variant="outline"
                      className="border-orange-500 text-orange-600 hover:bg-orange-50"
                    >
                      📦 Start Packing
                    </Button>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">📄 Print Packing Slip</Button>
                  <Button variant="outline">🏷️ Print Shipping Label</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Customers</h2>
        <p className="text-sm text-gray-600">
          View customer information and communicate
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {customer.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {customer.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {customer.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.orders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-coral-main">
                      ${customer.totalSpent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.lastOrder}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setShowMessaging(true);
                        }}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Customer Messages
        </h2>
        <Badge variant="outline">
          {messages.filter((m) => !m.isRead).length} unread
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={`cursor-pointer transition-all ${
              !message.isRead
                ? "border-coral-main bg-coral-whisper/20"
                : "hover:shadow-md"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {message.customerName}
                    </h4>
                    {!message.isRead && (
                      <Badge className="bg-coral-main text-white text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-700 mb-2">{message.message}</p>
                  <p className="text-sm text-gray-500">{message.timestamp}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const customer = customers.find(
                      (c) => c.id === message.customerId
                    );
                    setSelectedCustomer(customer);
                    setShowMessaging(true);
                  }}
                >
                  Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Messaging Modal */}
      {showMessaging && selectedCustomer && (
        <Dialog open={showMessaging} onOpenChange={setShowMessaging}>
          <DialogContent className="max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Message {selectedCustomer.name}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col h-96">
              <div className="flex-1 overflow-y-auto p-4 border border-gray-200 rounded-lg mb-4">
                {messages
                  .filter((m) => m.customerId === selectedCustomer.id)
                  .map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 ${
                        message.isFromCustomer ? "text-left" : "text-right"
                      }`}
                    >
                      <div
                        className={`inline-block p-3 rounded-lg max-w-xs ${
                          message.isFromCustomer
                            ? "bg-gray-100 text-gray-900"
                            : "bg-coral-main text-white"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.isFromCustomer
                              ? "text-gray-500"
                              : "text-coral-100"
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
                      // Handle send message
                      console.log("Sending message:", newMessage);
                      setNewMessage("");
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  className="bg-coral-main hover:bg-coral-secondary text-white"
                  onClick={() => {
                    // Handle send message
                    console.log("Sending message:", newMessage);
                    setNewMessage("");
                  }}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );

  const renderBulkOrders = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Bulk Order Requests
        </h2>
        <div className="flex items-center space-x-2">
          <Badge className="bg-yellow-100 text-yellow-800">
            {bulkOrders.filter((b) => b.status === "pending").length} pending
          </Badge>
          <Badge className="bg-blue-100 text-blue-800">
            {bulkOrders.filter((b) => b.status === "quoted").length} quoted
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {bulkOrders.map((bulkOrder) => (
          <Card key={bulkOrder.id} className="overflow-hidden">
            <CardContent className="p-0">
              {/* Header */}
              <div className="bg-gray-50 p-4 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {bulkOrder.id}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {bulkOrder.customerName}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={getBulkOrderStatusColor(bulkOrder.status)}
                    >
                      {bulkOrder.status.charAt(0).toUpperCase() +
                        bulkOrder.status.slice(1)}
                    </Badge>
                    <p className="text-sm text-coral-main font-semibold mt-1">
                      ${bulkOrder.potentialValue.toFixed(2)} potential
                    </p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Product</h4>
                    <p className="text-sm text-gray-600">
                      {bulkOrder.productName}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Quantity</h4>
                    <p className="text-sm text-gray-600">
                      {bulkOrder.quantity} units
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Target Price
                    </h4>
                    <p className="text-sm text-gray-600">
                      ${bulkOrder.targetPrice}
                      <span className="text-xs text-gray-500 ml-1">
                        (vs ${bulkOrder.currentPrice} regular)
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Deadline</h4>
                    <p className="text-sm text-gray-600">
                      {bulkOrder.deadline}
                    </p>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Contact</h4>
                    <p className="text-sm text-gray-600">
                      {bulkOrder.customerEmail}
                    </p>
                    <p className="text-sm text-gray-600">
                      {bulkOrder.customerPhone}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Preferred Method
                    </h4>
                    <p className="text-sm text-gray-600 capitalize">
                      {bulkOrder.contactMethod}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Request Date
                    </h4>
                    <p className="text-sm text-gray-600">
                      {bulkOrder.requestDate}
                    </p>
                  </div>
                </div>

                {/* Notes */}
                {bulkOrder.notes && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Customer Notes
                    </h4>
                    <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                      {bulkOrder.notes}
                    </p>
                  </div>
                )}

                {/* Pricing Analysis */}
                <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">
                    💰 Pricing Analysis
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Regular Total:</span>
                      <p className="font-semibold">
                        $
                        {(bulkOrder.currentPrice * bulkOrder.quantity).toFixed(
                          2
                        )}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Customer Target:</span>
                      <p className="font-semibold">
                        $
                        {(bulkOrder.targetPrice * bulkOrder.quantity).toFixed(
                          2
                        )}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Discount Requested:</span>
                      <p className="font-semibold text-orange-600">
                        {(
                          ((bulkOrder.currentPrice - bulkOrder.targetPrice) /
                            bulkOrder.currentPrice) *
                          100
                        ).toFixed(1)}
                        %
                      </p>
                    </div>
                    {bulkOrder.quotedPrice && (
                      <div>
                        <span className="text-gray-600">Your Quote:</span>
                        <p className="font-semibold text-blue-600">
                          $
                          {(bulkOrder.quotedPrice * bulkOrder.quantity).toFixed(
                            2
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {bulkOrder.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => {
                          const quote = prompt(
                            "Enter your quoted price per unit:",
                            bulkOrder.targetPrice
                          );
                          if (quote)
                            updateBulkOrderStatus(
                              bulkOrder.id,
                              "quoted",
                              Number.parseFloat(quote)
                            );
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Send Quote
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateBulkOrderStatus(bulkOrder.id, "rejected")
                        }
                        className="border-red-500 text-red-600 hover:bg-red-50"
                      >
                        Decline
                      </Button>
                    </>
                  )}
                  {bulkOrder.status === "quoted" && (
                    <Badge className="bg-blue-100 text-blue-800">
                      Waiting for customer response
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const customer = customers.find(
                        (c) => c.id.toString() === bulkOrder.customerId
                      );
                      if (customer) {
                        setSelectedCustomer(customer);
                        setShowMessaging(true);
                      }
                    }}
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Contact Customer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {bulkOrders.length === 0 && (
        <div className="text-center py-12">
          <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No bulk order requests yet</p>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview();
      case "products":
        return renderProducts();
      case "categories":
        return renderCategories();
      case "orders":
        return renderOrders();
      case "bulk-orders":
        return renderBulkOrders();
      case "customers":
        return renderCustomers();
      case "messages":
        return renderMessages();
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-gray-200">
        <SidebarHeader className="border-b border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-coral-main rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Supplier Portal</h2>
              <p className="text-sm text-gray-600">Rwanda Treasures</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveSection(item.id)}
                      isActive={activeSection === item.id}
                      className="w-full justify-start"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                      {item.badge && item.badge > 0 && (
                        <Badge className="ml-auto bg-coral-main text-white text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Supplier Name</p>
              <p className="text-xs text-gray-600">supplier@example.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 px-6">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-semibold text-gray-900 capitalize">
              {activeSection}
            </h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
        {/* Order Tracking Modal */}
        {showOrderTracking && selectedOrderForTracking && (
          <Dialog open={showOrderTracking} onOpenChange={setShowOrderTracking}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-coral-main" />
                  <span>Order Tracking - {selectedOrderForTracking.id}</span>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Order Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold mb-2 text-coral-main">
                      Customer
                    </h4>
                    <p className="text-sm">
                      {selectedOrderForTracking.customer}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedOrderForTracking.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedOrderForTracking.phone}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-coral-main">
                      Order Details
                    </h4>
                    <p className="text-sm">
                      Items: {selectedOrderForTracking.items}
                    </p>
                    <p className="text-sm">
                      Total: ${selectedOrderForTracking.total}
                    </p>
                    <p className="text-sm">
                      Date: {selectedOrderForTracking.date}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-coral-main">
                      Status
                    </h4>
                    <Badge
                      className={
                        getOrderStatusDisplay(
                          calculateOrderStatus(
                            selectedOrderForTracking.orderItems
                          )
                        ).color
                      }
                    >
                      {
                        getOrderStatusDisplay(
                          calculateOrderStatus(
                            selectedOrderForTracking.orderItems
                          )
                        ).text
                      }
                    </Badge>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-800">
                    🚚 Delivery Address
                  </h4>
                  <div className="text-sm space-y-1">
                    <p>{selectedOrderForTracking.address.street}</p>
                    <p>
                      {selectedOrderForTracking.address.city},{" "}
                      {selectedOrderForTracking.address.state}
                    </p>
                    <p>
                      {selectedOrderForTracking.address.country}{" "}
                      {selectedOrderForTracking.address.zip}
                    </p>
                  </div>
                </div>

                {/* Packing Progress */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-green-800">
                      📦 Packing Progress
                    </h4>
                    <span className="text-sm text-green-600">
                      {
                        selectedOrderForTracking.orderItems.filter(
                          (item) => item.isPacked
                        ).length
                      }{" "}
                      / {selectedOrderForTracking.orderItems.length} items
                      packed
                    </span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (selectedOrderForTracking.orderItems.filter(
                            (item) => item.isPacked
                          ).length /
                            selectedOrderForTracking.orderItems.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      updateOrderStatus(
                        selectedOrderForTracking.id,
                        "processing"
                      )
                    }
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    Mark Processing
                  </Button>
                  <Button
                    size="sm"
                    onClick={() =>
                      updateOrderStatus(selectedOrderForTracking.id, "shipped")
                    }
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Mark Shipped
                  </Button>
                  <Button
                    size="sm"
                    onClick={() =>
                      updateOrderStatus(
                        selectedOrderForTracking.id,
                        "delivered"
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Mark Delivered
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedOrder(selectedOrderForTracking);
                      setShowOrderDetails(true);
                      setShowOrderTracking(false);
                    }}
                  >
                    View Full Details
                  </Button>
                </div>

                {/* Order Items List */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Order Items</h4>
                  {selectedOrderForTracking.orderItems.map((item) => (
                    <div
                      key={item._id}
                      className={`p-3 rounded-lg border-2 ${
                        item.isPacked
                          ? "border-green-300 bg-green-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{item.productImage}</span>
                          <div>
                            <h5 className="font-medium">{item.productName}</h5>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity} • ${item.unitPrice} each
                            </p>
                            <p className="text-xs text-gray-500">
                              Location: {item.storageLocation}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {item.isPacked ? (
                            <Badge className="bg-green-100 text-green-800">
                              ✅ Packed
                            </Badge>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() =>
                                toggleItemPacked(
                                  selectedOrderForTracking.id,
                                  item._id
                                )
                              }
                              className="bg-coral-main hover:bg-coral-secondary text-white"
                            >
                              Mark Packed
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SupplierDashboard;

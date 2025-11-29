import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createSlug, createUniqueSlug } from "@shared/utils/slug";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extend session interface to include user
declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      const existingUsername = await storage.getUserByUsername(userData.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }

      const user = await storage.createUser(userData);
      
      // Store user in session
      req.session.userId = user.id;
      
      // Don't send password back
      const { password, ...userWithoutPassword } = user;
      res.status(201).json({ user: userWithoutPassword });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      // Find user by username or email
      let user = await storage.getUserByUsername(username);
      if (!user) {
        user = await storage.getUserByEmail(username);
      }

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Verify password
      const isValid = await storage.verifyPassword(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Store user in session
      req.session.userId = user.id;
      console.log('Login successful - Session ID:', req.sessionID);
      console.log('Login successful - Stored user ID:', user.id);

      // Don't send password back
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      // Debug logging
      console.log('Auth check - Session ID:', req.sessionID);
      console.log('Auth check - User ID in session:', req.session.userId);
      
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user) {
        console.log('User not found in database:', req.session.userId);
        return res.status(404).json({ message: "User not found" });
      }

      // Don't send password back
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error: any) {
      console.error('Auth check error:', error);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.put("/api/auth/profile", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const { firstName, lastName, email, phone, avatar } = req.body;
      
      // Basic validation
      if (!firstName || !lastName || !email) {
        return res.status(400).json({ message: "First name, last name, and email are required" });
      }

      // Check if email is already taken by another user
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser && existingUser.id !== req.session.userId) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Build update object
      const updateData: any = {
        firstName,
        lastName,
        email,
        phone
      };

      // Only include avatar if it's provided
      if (avatar !== undefined) {
        updateData.avatar = avatar;
      }

      const updatedUser = await storage.updateUser(req.session.userId, updateData);

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Don't send password back
      const { password, ...userWithoutPassword } = updatedUser;
      res.json({ user: userWithoutPassword });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const { categorySlug } = req.query;
      let products;
      
      if (categorySlug && typeof categorySlug === 'string') {
        // Filter products by category slug
        products = await storage.getProductsByCategorySlug(categorySlug);
      } else {
        products = await storage.getProducts();
      }
      
      res.json({ products });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/products/featured", async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json({ products });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/products/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const products = await storage.searchProducts(q);
      res.json({ products });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/products/:idOrSlug", async (req, res) => {
    try {
      const product = await storage.getProductByIdOrSlug(req.params.idOrSlug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ product });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Category routes
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json({ categories });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/categories/:id/products", async (req, res) => {
    try {
      const products = await storage.getProductsByCategory(req.params.id);
      res.json({ products });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Cart routes
  app.get("/api/cart", async (req, res) => {
    try {
      const cart = await storage.getOrCreateCart(req.session.userId, req.sessionID);
      const items = await storage.getCartItems(cart.id);
      res.json({ cart: { ...cart, items } });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/cart/add", async (req, res) => {
    try {
      const { productId, quantity = 1 } = req.body;
      
      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      const cart = await storage.getOrCreateCart(req.session.userId, req.sessionID);
      await storage.addToCart(cart.id, productId, quantity);
      
      const items = await storage.getCartItems(cart.id);
      res.json({ cart: { ...cart, items } });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.put("/api/cart/update", async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      
      if (!productId || quantity === undefined) {
        return res.status(400).json({ message: "Product ID and quantity are required" });
      }

      const cart = await storage.getOrCreateCart(req.session.userId, req.sessionID);
      await storage.updateCartItem(cart.id, productId, quantity);
      
      const items = await storage.getCartItems(cart.id);
      res.json({ cart: { ...cart, items } });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.delete("/api/cart/remove/:productId", async (req, res) => {
    try {
      const cart = await storage.getOrCreateCart(req.session.userId, req.sessionID);
      await storage.removeFromCart(cart.id, req.params.productId);
      
      const items = await storage.getCartItems(cart.id);
      res.json({ cart: { ...cart, items } });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Authentication middleware
  const requireAuth = async (req: any, res: any, next: any) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  // Admin routes (require admin role)
  const requireAdmin = async (req: any, res: any, next: any) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  // Admin product management
  app.post("/api/admin/products", requireAdmin, async (req, res) => {
    try {
      console.log('Creating product with data:', req.body);
      
      // Validate required fields
      const { name, categoryId, price, description } = req.body;
      if (!name || !categoryId || !price) {
        return res.status(400).json({ 
          message: "Name, category, and price are required fields" 
        });
      }

      // Generate slug for the product
      const baseSlug = createSlug(name);
      const existingProducts = await storage.getProducts();
      const existingSlugs = existingProducts.map(p => p.slug).filter(Boolean);
      const uniqueSlug = createUniqueSlug(baseSlug, existingSlugs);

      // Clean up the product data
      const productData = {
        ...req.body,
        slug: uniqueSlug,
        images: req.body.images?.filter((img: string) => img && img.trim()) || [],
        price: req.body.price.toString(),
        stock: Number(req.body.stock) || 0,
        isActive: Boolean(req.body.isActive !== false), // Default to true
        featured: Boolean(req.body.featured),
      };

      const product = await storage.createProduct(productData);
      console.log('Created product:', product);
      res.status(201).json({ product });
    } catch (error: any) {
      console.error('Product creation error:', error);
      res.status(500).json({ 
        message: `Failed to create product: ${error.message}` 
      });
    }
  });

  app.put("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      const updateData = { ...req.body };
      
      // If name is being updated, regenerate slug
      if (updateData.name) {
        const baseSlug = createSlug(updateData.name);
        const existingProducts = await storage.getProducts();
        // Exclude current product from slug conflict check
        const existingSlugs = existingProducts
          .filter(p => p.id !== req.params.id)
          .map(p => p.slug)
          .filter(Boolean);
        updateData.slug = createUniqueSlug(baseSlug, existingSlugs);
      }
      
      const product = await storage.updateProduct(req.params.id, updateData);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ product });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.delete("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      const success = await storage.deleteProduct(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Product options management
  app.get("/api/products/:id/options", async (req, res) => {
    try {
      const options = await storage.getProductOptions(req.params.id);
      res.json({ options });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/admin/products/:id/options", requireAdmin, async (req, res) => {
    try {
      const option = await storage.createProductOption({
        ...req.body,
        productId: req.params.id
      });
      res.status(201).json({ option });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.put("/api/admin/products/:productId/options/:id", requireAdmin, async (req, res) => {
    try {
      const option = await storage.updateProductOption(req.params.id, req.body);
      if (!option) {
        return res.status(404).json({ message: "Product option not found" });
      }
      res.json({ option });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.delete("/api/admin/products/:productId/options/:id", requireAdmin, async (req, res) => {
    try {
      const success = await storage.deleteProductOption(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Product option not found" });
      }
      res.json({ message: "Product option deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Admin category management
  app.post("/api/admin/categories", requireAdmin, async (req, res) => {
    try {
      const category = await storage.createCategory(req.body);
      res.status(201).json({ category });
    } catch (error: any) {
      console.error("Error creating category:", error);
      const message = error.message || "Server error";
      res.status(500).json({ message });
    }
  });

  app.put("/api/admin/categories/:id", requireAdmin, async (req, res) => {
    try {
      const category = await storage.updateCategory(req.params.id, req.body);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json({ category });
    } catch (error: any) {
      console.error("Error updating category:", error);
      const message = error.message || "Server error";
      res.status(500).json({ message });
    }
  });

  app.delete("/api/admin/categories/:id", requireAdmin, async (req, res) => {
    try {
      const success = await storage.deleteCategory(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json({ message: "Category deleted successfully" });
    } catch (error: any) {
      console.error("Error deleting category:", error);
      // Pass the actual error message to the frontend
      const message = error.message || "Server error";
      res.status(500).json({ message });
    }
  });

  // User order endpoints
  app.post("/api/orders", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const { items, shippingAddress, paymentMethod, notes } = req.body;
      
      // Validate that user has items in cart or items are provided
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "No items provided" });
      }

      // Calculate total from cart items
      let totalAmount = 0;
      const orderItems = [];

      console.log('Processing items:', items);

      for (const item of items) {
        const product = await storage.getProduct(item.productId);
        if (!product) {
          return res.status(400).json({ message: `Product ${item.productId} not found` });
        }
        
        if (product.stock < item.quantity) {
          return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
        }

        const productPrice = parseFloat(product.price);
        const itemTotal = productPrice * item.quantity;
        totalAmount += itemTotal;
        
        console.log(`Product: ${product.name}, Price: ${productPrice}, Quantity: ${item.quantity}, Item Total: ${itemTotal}`);
        
        orderItems.push({
          productId: item.productId,
          quantity: item.quantity,
          price: productPrice,
          name: product.name
        });
      }

      console.log('Total amount calculated:', totalAmount);

      // Ensure totalAmount is at least 0.01 (minimum for decimal)
      if (totalAmount <= 0) {
        return res.status(400).json({ message: "Order total must be greater than zero" });
      }

      // Create the order
      const orderData = {
        userId,
        status: 'pending',
        subtotal: totalAmount.toFixed(2),
        tax: '0.00',
        shipping: '0.00',
        total: totalAmount.toFixed(2),
        billingAddress: shippingAddress || {
          firstName: 'Guest',
          lastName: 'User',
          address1: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'BD'
        },
        shippingAddress: shippingAddress || {
          firstName: 'Guest',
          lastName: 'User',
          address1: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'BD'
        },
        notes: notes || '',
      };

      console.log('Order data to be created:', orderData);

      const order = await storage.createOrder(orderData);

      // Create order items
      for (const item of orderItems) {
        await storage.createOrderItem({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          name: item.name
        });
      }

      // Update product stock
      for (const item of items) {
        const product = await storage.getProduct(item.productId);
        if (product) {
          await storage.updateProduct(item.productId, {
            stock: product.stock - item.quantity
          });
        }
      }

      // Clear user's cart after successful order
      const userCart = await storage.getOrCreateCart(userId);
      await storage.clearCart(userCart.id);

      res.status(201).json({ order });
    } catch (error: any) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/orders", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const orders = await storage.getOrders(userId);
      res.json({ orders });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/orders/:id", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Ensure user can only access their own orders
      if (order.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      res.json({ order });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Admin order management
  app.get("/api/admin/orders", requireAdmin, async (req, res) => {
    try {
      const orders = await storage.getOrders();
      res.json({ orders });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.put("/api/admin/orders/:id/status", requireAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      const order = await storage.updateOrderStatus(req.params.id, status);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json({ order });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.put("/api/admin/orders/:id/assets", requireAdmin, async (req, res) => {
    try {
      const { accounts, redeemCodes } = req.body;
      const order = await storage.updateOrderAssets(req.params.id, accounts, redeemCodes);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json({ order });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Admin Users Management
  app.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json({ users });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.put("/api/admin/users/:id/role", requireAdmin, async (req, res) => {
    try {
      const { role } = req.body;
      const user = await storage.updateUserRole(req.params.id, role);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ user });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.delete("/api/admin/users/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteUser(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Image upload endpoint
  app.post("/api/admin/upload", requireAdmin, async (req, res) => {
    try {
      const { imageData, filename } = req.body;
      
      if (!imageData || !filename) {
        return res.status(400).json({ message: "Image data and filename are required" });
      }

      // Extract base64 data (remove data:image/type;base64, prefix)
      const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');
      
      // Generate unique filename
      const timestamp = Date.now();
      const fileExtension = filename.split('.').pop() || 'jpg';
      const uniqueFilename = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
      
      // Ensure uploads directory exists - use correct path relative to server
      const uploadsDir = path.join(__dirname, '..', 'client', 'public', 'uploads');
      console.log('Upload directory:', uploadsDir);
      
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
        console.log('Created uploads directory');
      }
      
      // Write the file
      const filepath = path.join(uploadsDir, uniqueFilename);
      fs.writeFileSync(filepath, base64Data, 'base64');
      console.log('Saved file to:', filepath);
      
      // Return the public URL
      const imageUrl = `/uploads/${uniqueFilename}`;
      console.log('Image URL:', imageUrl);
      
      res.json({ imageUrl });
    } catch (error: any) {
      console.error('Upload error:', error);
      res.status(500).json({ message: `Failed to upload image: ${error.message}` });
    }
  });

  // User avatar upload endpoint
  app.post("/api/upload/avatar", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const { imageData, filename } = req.body;
      
      if (!imageData || !filename) {
        return res.status(400).json({ message: "Image data and filename are required" });
      }

      // Validate image format
      if (!imageData.startsWith('data:image/')) {
        return res.status(400).json({ message: "Invalid image format" });
      }

      // Extract base64 data (remove data:image/type;base64, prefix)
      const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');
      
      // Generate unique filename for avatar
      const timestamp = Date.now();
      const fileExtension = filename.split('.').pop() || 'jpg';
      const uniqueFilename = `avatar-${req.session.userId}-${timestamp}.${fileExtension}`;
      
      // In production, you would save to cloud storage (AWS S3, Cloudinary, etc.)
      // For now, we'll just return a mock URL since we can't write files directly
      const imageUrl = `/uploads/avatars/${uniqueFilename}`;
      
      // In a real implementation, you would:
      // 1. Validate the image (format, size, dimensions)
      // 2. Resize/optimize the image for avatar use
      // 3. Save to cloud storage
      // 4. Return the public URL
      
      res.json({ imageUrl });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

import { 
  type User, 
  type InsertUser, 
  type Product,
  type ProductOption,
  type InsertProductOption,
  type Category,
  type Order,
  type CartItem,
  users,
  products,
  productOptions,
  categories,
  orders,
  orderItems,
  cart,
  cartItems
} from "@shared/schema";
import { db } from "@shared/db";
import { eq, and, desc, asc, sql } from "drizzle-orm";
import { createSlug, createUniqueSlug } from "@shared/utils/slug";
import bcrypt from "bcryptjs";

// Storage interface with all the methods we need
export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  updateUserRole(id: string, role: string): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;
  
  // Authentication methods
  verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductByIdOrSlug(idOrSlug: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  getProductsByCategorySlug(categorySlug: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: any): Promise<Product>;
  updateProduct(id: string, updates: any): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  
  // Product options methods
  getProductOptions(productId: string): Promise<ProductOption[]>;
  createProductOption(option: InsertProductOption): Promise<ProductOption>;
  updateProductOption(id: string, updates: Partial<ProductOption>): Promise<ProductOption | undefined>;
  deleteProductOption(id: string): Promise<boolean>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: any): Promise<Category>;
  updateCategory(id: string, updates: any): Promise<Category | undefined>;
  deleteCategory(id: string): Promise<boolean>;
  
  // Cart methods
  getOrCreateCart(userId?: string, sessionId?: string): Promise<any>;
  getCartItems(cartId: string): Promise<CartItem[]>;
  addToCart(cartId: string, productId: string, quantity: number): Promise<any>;
  updateCartItem(cartId: string, productId: string, quantity: number): Promise<any>;
  removeFromCart(cartId: string, productId: string): Promise<boolean>;
  clearCart(cartId: string): Promise<boolean>;
  
  // Order methods
  getOrders(userId?: string): Promise<any[]>;
  getOrder(id: string): Promise<any>;
  createOrder(orderData: any): Promise<Order>;
  createOrderItem(itemData: { orderId: string; productId: string; quantity: number; price: number; name: string; }): Promise<any>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  updateOrderAssets(id: string, accounts?: string, redeemCodes?: string): Promise<Order | undefined>;
}

export class DatabaseStorage implements IStorage {
  
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await this.hashPassword(insertUser.password);
    const result = await db.insert(users).values({
      ...insertUser,
      password: hashedPassword,
    }).returning();
    return result[0];
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const result = await db.update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users).orderBy(desc(users.createdAt));
  }

  async updateUserRole(id: string, role: string): Promise<User | undefined> {
    const result = await db.update(users)
      .set({ role: role as any, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id));
    return result.rowCount > 0;
  }

  // Authentication methods
  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return db.select().from(products).where(eq(products.isActive, true)).orderBy(asc(products.createdAt));
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return result[0];
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
    return result[0];
  }

  async getProductByIdOrSlug(idOrSlug: string): Promise<Product | undefined> {
    // First try to find by slug (more SEO-friendly)
    let result = await db.select().from(products).where(eq(products.slug, idOrSlug)).limit(1);
    
    // If not found by slug, try by ID (for backward compatibility)
    if (!result[0]) {
      result = await db.select().from(products).where(eq(products.id, idOrSlug)).limit(1);
    }
    
    return result[0];
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return db.select().from(products)
      .where(and(eq(products.categoryId, categoryId), eq(products.isActive, true)))
      .orderBy(asc(products.createdAt));
  }

  async getProductsByCategorySlug(categorySlug: string): Promise<Product[]> {
    // First, find the category by slug
    const category = await db.select()
      .from(categories)
      .where(eq(categories.slug, categorySlug))
      .limit(1);
    
    if (!category || category.length === 0) {
      return [];
    }
    
    // Then get products for that category
    return db.select().from(products)
      .where(and(eq(products.categoryId, category[0].id), eq(products.isActive, true)))
      .orderBy(asc(products.createdAt));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return db.select().from(products)
      .where(and(eq(products.featured, true), eq(products.isActive, true)))
      .orderBy(asc(products.createdAt));
  }

  async searchProducts(query: string): Promise<Product[]> {
    return db.select().from(products)
      .where(and(
        sql`${products.name} ILIKE ${`%${query}%`} OR ${products.description} ILIKE ${`%${query}%`}`,
        eq(products.isActive, true)
      ))
      .orderBy(asc(products.createdAt));
  }

  async createProduct(product: any): Promise<Product> {
    const result = await db.insert(products).values(product).returning();
    return result[0];
  }

  async updateProduct(id: string, updates: any): Promise<Product | undefined> {
    const result = await db.update(products)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return result[0];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.update(products)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return result.length > 0;
  }

  // Product options methods
  async getProductOptions(productId: string): Promise<ProductOption[]> {
    return db.select()
      .from(productOptions)
      .where(eq(productOptions.productId, productId))
      .orderBy(asc(productOptions.sortOrder));
  }

  async createProductOption(option: InsertProductOption): Promise<ProductOption> {
    const result = await db.insert(productOptions).values(option).returning();
    return result[0];
  }

  async updateProductOption(id: string, updates: Partial<ProductOption>): Promise<ProductOption | undefined> {
    const result = await db.update(productOptions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(productOptions.id, id))
      .returning();
    return result[0];
  }

  async deleteProductOption(id: string): Promise<boolean> {
    const result = await db.delete(productOptions)
      .where(eq(productOptions.id, id))
      .returning();
    return result.length > 0;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return db.select().from(categories).orderBy(asc(categories.name));
  }

  async getCategory(id: string): Promise<Category | undefined> {
    const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
    return result[0];
  }

  async createCategory(category: any): Promise<Category> {
    // Generate a unique slug from the category name
    const baseSlug = createSlug(category.name);
    
    // Get existing category slugs
    const existingCategories = await db.select({ slug: categories.slug }).from(categories);
    const existingSlugs = existingCategories.map(c => c.slug);
    const slug = createUniqueSlug(baseSlug, existingSlugs);
    
    const result = await db.insert(categories).values({
      ...category,
      slug
    }).returning();
    return result[0];
  }

  async updateCategory(id: string, updates: any): Promise<Category | undefined> {
    // If name is being updated, regenerate the slug
    let updatedData = { ...updates, updatedAt: new Date() };
    
    if (updates.name) {
      const baseSlug = createSlug(updates.name);
      
      // Get existing category slugs (excluding current category)
      const existingCategories = await db
        .select({ slug: categories.slug })
        .from(categories)
        .where(sql`${categories.id} != ${id}`);
      const existingSlugs = existingCategories.map(c => c.slug);
      const slug = createUniqueSlug(baseSlug, existingSlugs);
      
      updatedData.slug = slug;
    }
    
    const result = await db.update(categories)
      .set(updatedData)
      .where(eq(categories.id, id))
      .returning();
    return result[0];
  }

  async deleteCategory(id: string): Promise<boolean> {
    // Check if any products reference this category
    const productsWithCategory = await db
      .select()
      .from(products)
      .where(eq(products.categoryId, id))
      .limit(1);
    
    if (productsWithCategory.length > 0) {
      throw new Error("Cannot delete category: it has associated products");
    }
    
    const result = await db.delete(categories).where(eq(categories.id, id)).returning();
    return result.length > 0;
  }

  // Cart methods
  async getOrCreateCart(userId?: string, sessionId?: string): Promise<any> {
    let existingCart;
    
    if (userId) {
      existingCart = await db.select().from(cart).where(eq(cart.userId, userId)).limit(1);
    } else if (sessionId) {
      existingCart = await db.select().from(cart).where(eq(cart.sessionId, sessionId)).limit(1);
    }

    if (existingCart && existingCart.length > 0) {
      return existingCart[0];
    }

    // Create new cart
    const newCart = await db.insert(cart).values({
      userId,
      sessionId,
    }).returning();

    return newCart[0];
  }

  async getCartItems(cartId: string): Promise<CartItem[]> {
    return db.select({
      id: cartItems.id,
      cartId: cartItems.cartId,
      productId: cartItems.productId,
      quantity: cartItems.quantity,
      createdAt: cartItems.createdAt,
      updatedAt: cartItems.updatedAt,
      product: products,
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.cartId, cartId));
  }

  async addToCart(cartId: string, productId: string, quantity: number): Promise<any> {
    // Check if item already exists in cart
    const existingItem = await db.select().from(cartItems)
      .where(and(eq(cartItems.cartId, cartId), eq(cartItems.productId, productId)))
      .limit(1);

    if (existingItem.length > 0) {
      // Update quantity
      return this.updateCartItem(cartId, productId, existingItem[0].quantity + quantity);
    } else {
      // Add new item
      const result = await db.insert(cartItems).values({
        cartId,
        productId,
        quantity,
      }).returning();
      return result[0];
    }
  }

  async updateCartItem(cartId: string, productId: string, quantity: number): Promise<any> {
    if (quantity <= 0) {
      return this.removeFromCart(cartId, productId);
    }

    const result = await db.update(cartItems)
      .set({ quantity, updatedAt: new Date() })
      .where(and(eq(cartItems.cartId, cartId), eq(cartItems.productId, productId)))
      .returning();
    return result[0];
  }

  async removeFromCart(cartId: string, productId: string): Promise<boolean> {
    const result = await db.delete(cartItems)
      .where(and(eq(cartItems.cartId, cartId), eq(cartItems.productId, productId)))
      .returning();
    return result.length > 0;
  }

  async clearCart(cartId: string): Promise<boolean> {
    await db.delete(cartItems).where(eq(cartItems.cartId, cartId));
    return true;
  }

  // Order methods
  async getOrders(userId?: string): Promise<any[]> {
    let ordersResult;
    if (userId) {
      ordersResult = await db.select({
        id: orders.id,
        orderNumber: orders.orderNumber,
        userId: orders.userId,
        status: orders.status,
        subtotal: orders.subtotal,
        tax: orders.tax,
        shipping: orders.shipping,
        total: orders.total,
        billingAddress: orders.billingAddress,
        shippingAddress: orders.shippingAddress,
        notes: orders.notes,
        createdAt: orders.createdAt,
        updatedAt: orders.updatedAt,
        userEmail: users.email,
        userFirstName: users.firstName,
        userLastName: users.lastName,
        userPhone: users.phone,
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));
    } else {
      ordersResult = await db.select({
        id: orders.id,
        orderNumber: orders.orderNumber,
        userId: orders.userId,
        status: orders.status,
        subtotal: orders.subtotal,
        tax: orders.tax,
        shipping: orders.shipping,
        total: orders.total,
        billingAddress: orders.billingAddress,
        shippingAddress: orders.shippingAddress,
        notes: orders.notes,
        createdAt: orders.createdAt,
        updatedAt: orders.updatedAt,
        userEmail: users.email,
        userFirstName: users.firstName,
        userLastName: users.lastName,
        userPhone: users.phone,
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .orderBy(desc(orders.createdAt));
    }

    // Get order items for each order
    const ordersWithItems = await Promise.all(
      ordersResult.map(async (order) => {
        const items = await db.select({
          id: orderItems.id,
          productId: orderItems.productId,
          productName: orderItems.productName,
          productPrice: orderItems.productPrice,
          quantity: orderItems.quantity,
        }).from(orderItems).where(eq(orderItems.orderId, order.id));
        
        return {
          ...order,
          items
        };
      })
    );

    return ordersWithItems;
  }

  async getOrder(id: string): Promise<any> {
    const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
    const order = result[0];
    
    if (!order) return undefined;

    // Get order items
    const items = await db.select({
      id: orderItems.id,
      productId: orderItems.productId,
      productName: orderItems.productName,
      productPrice: orderItems.productPrice,
      quantity: orderItems.quantity,
    }).from(orderItems).where(eq(orderItems.orderId, order.id));

    return {
      ...order,
      items
    };
  }

  async createOrder(orderData: any): Promise<Order> {
    // Generate sequential order number
    const lastOrder = await db.select({ orderNumber: orders.orderNumber })
      .from(orders)
      .orderBy(sql`${orders.createdAt} DESC`)
      .limit(1);
    
    let nextNumber = 1;
    if (lastOrder.length > 0 && lastOrder[0].orderNumber) {
      const match = lastOrder[0].orderNumber.match(/CRF-(\d+)/);
      if (match) {
        nextNumber = parseInt(match[1]) + 1;
      }
    }
    
    const orderNumber = `CRF-${nextNumber.toString().padStart(5, '0')}`;
    
    const result = await db.insert(orders).values({
      ...orderData,
      orderNumber,
    }).returning();
    return result[0];
  }

  async createOrderItem(itemData: {
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    name: string;
  }): Promise<any> {
    const result = await db.insert(orderItems).values({
      orderId: itemData.orderId,
      productId: itemData.productId,
      productName: itemData.name,
      productPrice: itemData.price.toString(),
      quantity: itemData.quantity,
    }).returning();
    return result[0];
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const result = await db.update(orders)
      .set({ status: status as any, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return result[0];
  }

  async updateOrderAssets(id: string, accounts?: string, redeemCodes?: string): Promise<Order | undefined> {
    const updateData: any = { updatedAt: new Date() };
    if (accounts !== undefined) updateData.accounts = accounts;
    if (redeemCodes !== undefined) updateData.redeemCodes = redeemCodes;
    
    const result = await db.update(orders)
      .set(updateData)
      .where(eq(orders.id, id))
      .returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();

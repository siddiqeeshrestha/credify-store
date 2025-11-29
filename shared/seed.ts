import { db } from "./db";
import { categories, products, users } from "./schema";
import bcrypt from "bcryptjs";

export async function seedDatabase() {
  console.log("Starting database seeding...");

  try {
    // Create categories
    const categoryData = [
      {
        name: "Electronics",
        description: "Latest gadgets and electronic devices",
        image: "/images/categories/electronics.jpg",
        icon: "📱"
      },
      {
        name: "Clothing",
        description: "Fashion and apparel for all occasions",
        image: "/images/categories/clothing.jpg",
        icon: "👕"
      },
      {
        name: "Home & Garden",
        description: "Everything for your home and garden",
        image: "/images/categories/home-garden.jpg",
        icon: "🏠"
      },
      {
        name: "Sports & Outdoors",
        description: "Sports equipment and outdoor gear",
        image: "/images/categories/sports.jpg",
        icon: "⚽"
      },
      {
        name: "Books",
        description: "Books, e-books and educational materials",
        image: "/images/categories/books.jpg",
        icon: "📚"
      },
      {
        name: "Beauty & Health",
        description: "Beauty products and health supplements",
        image: "/images/categories/beauty.jpg",
        icon: "💄"
      }
    ];

    const insertedCategories = await db.insert(categories).values(categoryData).returning();
    console.log(`✓ Created ${insertedCategories.length} categories`);

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = await db.insert(users).values({
      username: "admin",
      email: "admin@credify.com",
      password: hashedPassword,
      firstName: "Admin",
      lastName: "User",
      role: "admin"
    }).returning();
    console.log("✓ Created admin user");

    // Create sample products
    const electronicsCategory = insertedCategories.find(cat => cat.name === "Electronics");
    const clothingCategory = insertedCategories.find(cat => cat.name === "Clothing");
    const homeCategory = insertedCategories.find(cat => cat.name === "Home & Garden");
    const sportsCategory = insertedCategories.find(cat => cat.name === "Sports & Outdoors");
    const booksCategory = insertedCategories.find(cat => cat.name === "Books");
    const beautyCategory = insertedCategories.find(cat => cat.name === "Beauty & Health");

    const productData = [
      // Electronics
      {
        name: "iPhone 15 Pro",
        description: "Latest Apple iPhone with A17 Pro chip and titanium design",
        price: "999.99",
        originalPrice: "1099.99",
        stock: 50,
        categoryId: electronicsCategory?.id,
        images: ["/images/products/iphone-15-pro.jpg"],
        featured: true,
        sku: "IPH15PRO",
        tags: ["smartphone", "apple", "5g"]
      },
      {
        name: "Samsung Galaxy S24",
        description: "Flagship Samsung smartphone with AI features",
        price: "799.99",
        originalPrice: "899.99",
        stock: 30,
        categoryId: electronicsCategory?.id,
        images: ["/images/products/galaxy-s24.jpg"],
        featured: true,
        sku: "SAMS24",
        tags: ["smartphone", "samsung", "android"]
      },
      {
        name: "MacBook Air M3",
        description: "Powerful and efficient laptop with M3 chip",
        price: "1299.99",
        stock: 25,
        categoryId: electronicsCategory?.id,
        images: ["/images/products/macbook-air-m3.jpg"],
        featured: true,
        sku: "MBAM3",
        tags: ["laptop", "apple", "m3"]
      },
      {
        name: "Sony WH-1000XM5",
        description: "Premium noise-canceling wireless headphones",
        price: "349.99",
        originalPrice: "399.99",
        stock: 40,
        categoryId: electronicsCategory?.id,
        images: ["/images/products/sony-headphones.jpg"],
        sku: "SONYWH1000",
        tags: ["headphones", "wireless", "noise-canceling"]
      },

      // Clothing
      {
        name: "Classic Denim Jacket",
        description: "Timeless denim jacket perfect for any season",
        price: "89.99",
        originalPrice: "119.99",
        stock: 75,
        categoryId: clothingCategory?.id,
        images: ["/images/products/denim-jacket.jpg"],
        sku: "DENJACK001",
        tags: ["jacket", "denim", "casual"]
      },
      {
        name: "Cotton T-Shirt Set",
        description: "Pack of 3 premium cotton t-shirts",
        price: "39.99",
        stock: 100,
        categoryId: clothingCategory?.id,
        images: ["/images/products/cotton-tshirt.jpg"],
        featured: true,
        sku: "COTTSET3",
        tags: ["t-shirt", "cotton", "basics"]
      },
      {
        name: "Wool Winter Coat",
        description: "Warm and stylish wool coat for winter",
        price: "249.99",
        stock: 20,
        categoryId: clothingCategory?.id,
        images: ["/images/products/wool-coat.jpg"],
        sku: "WOOLCOAT",
        tags: ["coat", "wool", "winter"]
      },

      // Home & Garden
      {
        name: "Smart Home Security Camera",
        description: "WiFi-enabled security camera with night vision",
        price: "129.99",
        originalPrice: "179.99",
        stock: 35,
        categoryId: homeCategory?.id,
        images: ["/images/products/security-camera.jpg"],
        sku: "SMARTCAM01",
        tags: ["security", "camera", "smart-home"]
      },
      {
        name: "Garden Tool Set",
        description: "Complete 10-piece garden tool set with carrying case",
        price: "79.99",
        stock: 45,
        categoryId: homeCategory?.id,
        images: ["/images/products/garden-tools.jpg"],
        sku: "GARDSET10",
        tags: ["gardening", "tools", "outdoor"]
      },

      // Sports & Outdoors
      {
        name: "Yoga Mat Premium",
        description: "Non-slip yoga mat with alignment guides",
        price: "49.99",
        originalPrice: "69.99",
        stock: 60,
        categoryId: sportsCategory?.id,
        images: ["/images/products/yoga-mat.jpg"],
        featured: true,
        sku: "YOGAMAT01",
        tags: ["yoga", "fitness", "exercise"]
      },
      {
        name: "Camping Backpack 50L",
        description: "Durable backpack perfect for hiking and camping",
        price: "159.99",
        stock: 25,
        categoryId: sportsCategory?.id,
        images: ["/images/products/backpack.jpg"],
        sku: "CAMPBACK50",
        tags: ["backpack", "camping", "hiking"]
      },

      // Books
      {
        name: "The Art of Programming",
        description: "Comprehensive guide to modern programming practices",
        price: "49.99",
        stock: 80,
        categoryId: booksCategory?.id,
        images: ["/images/products/programming-book.jpg"],
        sku: "PROGBOOK01",
        tags: ["book", "programming", "education"]
      },
      {
        name: "Mindfulness and Meditation",
        description: "A beginner's guide to mindfulness and meditation",
        price: "24.99",
        originalPrice: "34.99",
        stock: 65,
        categoryId: booksCategory?.id,
        images: ["/images/products/meditation-book.jpg"],
        sku: "MINDBOOK01",
        tags: ["book", "mindfulness", "self-help"]
      },

      // Beauty & Health
      {
        name: "Vitamin C Serum",
        description: "Anti-aging vitamin C serum for radiant skin",
        price: "29.99",
        originalPrice: "39.99",
        stock: 90,
        categoryId: beautyCategory?.id,
        images: ["/images/products/vitamin-c-serum.jpg"],
        featured: true,
        sku: "VITCSER01",
        tags: ["skincare", "vitamin-c", "serum"]
      },
      {
        name: "Electric Toothbrush",
        description: "Rechargeable electric toothbrush with multiple modes",
        price: "79.99",
        originalPrice: "99.99",
        stock: 40,
        categoryId: beautyCategory?.id,
        images: ["/images/products/electric-toothbrush.jpg"],
        sku: "ELECBR01",
        tags: ["dental", "electric", "health"]
      }
    ];

    const insertedProducts = await db.insert(products).values(productData).returning();
    console.log(`✓ Created ${insertedProducts.length} products`);

    console.log("🎉 Database seeding completed successfully!");
    console.log(`
Admin credentials:
Username: admin
Email: admin@credify.com
Password: admin123
    `);

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}
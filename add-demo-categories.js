import { db } from './shared/db.js';
import { categories } from './shared/schema.js';

const demoCategories = [
  {
    name: "Electronics",
    description: "Latest gadgets and electronic devices",
    image: "/figmaAssets/product.png",
    icon: "📱"
  },
  {
    name: "Clothing",
    description: "Fashion and apparel for all occasions",
    image: "/figmaAssets/image.png",
    icon: "👕"
  },
  {
    name: "Home & Garden",
    description: "Everything for your home and garden",
    image: "/figmaAssets/image-4.png",
    icon: "🏠"
  },
  {
    name: "Sports & Outdoors",
    description: "Sports equipment and outdoor gear",
    image: "/figmaAssets/image-5.png",
    icon: "⚽"
  },
  {
    name: "Books",
    description: "Books, e-books and educational materials",
    image: "/figmaAssets/image-1.png",
    icon: "📚"
  },
  {
    name: "Beauty & Health",
    description: "Beauty products and health supplements",
    image: "/figmaAssets/image-20.png",
    icon: "💄"
  }
];

async function addDemoCategories() {
  try {
    console.log('Adding demo categories...');
    
    for (const category of demoCategories) {
      try {
        const result = await db.insert(categories).values(category).returning();
        console.log(`✅ Added category: ${category.name} with icon ${category.icon}`);
      } catch (error) {
        console.log(`⚠️  Category ${category.name} already exists or error:`, error.message);
      }
    }
    
    console.log('✅ Demo categories setup complete!');
  } catch (error) {
    console.error('❌ Error adding categories:', error);
  }
}

addDemoCategories();
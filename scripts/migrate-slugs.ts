import "dotenv/config";
import { db } from '../shared/db';
import { products, categories } from '../shared/schema';
import { createSlug, createUniqueSlug } from '../shared/utils/slug';
import { eq } from 'drizzle-orm';

export async function addSlugsToExistingData() {
  console.log('Starting slug migration...');

  try {
    // Get all existing products
    const existingProducts = await db.select().from(products);
    console.log(`Found ${existingProducts.length} products to update`);

    // Get all existing categories  
    const existingCategories = await db.select().from(categories);
    console.log(`Found ${existingCategories.length} categories to update`);

    // Update products with slugs
    const productSlugs: string[] = [];
    for (const product of existingProducts) {
      const baseSlug = createSlug(product.name);
      const uniqueSlug = createUniqueSlug(baseSlug, productSlugs);
      productSlugs.push(uniqueSlug);

      await db.update(products)
        .set({ slug: uniqueSlug })
        .where(eq(products.id, product.id));
      
      console.log(`Updated product "${product.name}" with slug "${uniqueSlug}"`);
    }

    // Update categories with slugs
    const categorySlugs: string[] = [];
    for (const category of existingCategories) {
      const baseSlug = createSlug(category.name);
      const uniqueSlug = createUniqueSlug(baseSlug, categorySlugs);
      categorySlugs.push(uniqueSlug);

      await db.update(categories)
        .set({ slug: uniqueSlug })
        .where(eq(categories.id, category.id));
      
      console.log(`Updated category "${category.name}" with slug "${uniqueSlug}"`);
    }

    console.log('Slug migration completed successfully!');
  } catch (error) {
    console.error('Error during slug migration:', error);
    throw error;
  }
}

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  addSlugsToExistingData()
    .then(() => {
      console.log('Migration completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}
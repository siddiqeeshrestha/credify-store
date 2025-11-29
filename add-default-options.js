import { db } from "./shared/db.js";
import { products, productOptions } from "./shared/schema.js";
import { eq } from "drizzle-orm";

async function addDefaultOptionsToAllProducts() {
  console.log("Adding default options to all products...");

  try {
    // Get all active products
    const allProducts = await db.select().from(products).where(eq(products.isActive, true));
    
    if (allProducts.length === 0) {
      console.log("No products found.");
      return;
    }

    console.log(`Found ${allProducts.length} products`);

    // Default VP amounts option (select type)
    const vpAmountsOption = {
      type: "select",
      name: "Select Amount",
      key: "amount",
      required: true,
      placeholder: "",
      options: [
        { label: "475 VP", value: "475", priceModifier: 0, description: "" },
        { label: "950 VP", value: "950", priceModifier: 5, description: "" },
        { label: "1,900 VP", value: "1900", priceModifier: 10, description: "" },
        { label: "3,325 VP", value: "3325", priceModifier: 18, description: "" },
        { label: "5,350 VP", value: "5350", priceModifier: 28, description: "" },
        { label: "11,000 VP", value: "11000", priceModifier: 50, description: "" },
        { label: "Custom", value: "custom", priceModifier: 0, description: "" },
        { label: "Bundle", value: "bundle", priceModifier: 15, description: "" },
        { label: "Premium", value: "premium", priceModifier: 25, description: "" },
        { label: "Ultimate", value: "ultimate", priceModifier: 45, description: "" }
      ],
      sortOrder: 0,
      isActive: true
    };

    // Default IGN#TAG option (input type)
    const ignTagOption = {
      type: "input",
      name: "IGN#TAG",
      key: "ign_tag",
      required: true,
      placeholder: "Enter your ingame name",
      options: [],
      sortOrder: 1,
      isActive: true
    };

    let successCount = 0;
    let errorCount = 0;

    for (const product of allProducts) {
      try {
        // Check if this product already has options
        const existingOptions = await db.select()
          .from(productOptions)
          .where(eq(productOptions.productId, product.id));

        if (existingOptions.length > 0) {
          console.log(`⏭️  Product "${product.name}" already has options. Skipping...`);
          continue;
        }

        // Add VP amounts option
        await db.insert(productOptions).values({
          ...vpAmountsOption,
          productId: product.id
        });

        // Add IGN#TAG option
        await db.insert(productOptions).values({
          ...ignTagOption,
          productId: product.id
        });

        console.log(`✅ Added default options to product: "${product.name}"`);
        successCount++;

      } catch (error) {
        console.error(`❌ Error adding options to product "${product.name}":`, error);
        errorCount++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`✅ Successfully added options to ${successCount} products`);
    console.log(`❌ Failed to add options to ${errorCount} products`);
    console.log(`⏭️  Skipped ${allProducts.length - successCount - errorCount} products (already had options)`);

  } catch (error) {
    console.error("Error adding default options:", error);
  }
}

addDefaultOptionsToAllProducts().then(() => {
  console.log("✨ Default options setup complete!");
  process.exit(0);
}).catch(error => {
  console.error("💥 Failed to add default options:", error);
  process.exit(1);
});
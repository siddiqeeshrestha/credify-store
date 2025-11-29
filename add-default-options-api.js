const API_BASE = 'http://localhost:5001/api';

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

async function addDefaultOptionsToAllProducts() {
  console.log("🚀 Adding default options to all products via API...");

  try {
    // First, login as admin
    console.log("🔐 Logging in as admin...");
    const loginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username: 'admin@credify.com',
        password: 'admin123'
      })
    });

    if (!loginResponse.ok) {
      throw new Error(`Failed to login: ${loginResponse.status}`);
    }

    const loginData = await loginResponse.json();
    console.log(`✅ Logged in as: ${loginData.user.email}`);

    // Get the session cookie for subsequent requests
    const cookies = loginResponse.headers.get('set-cookie');

    // Get all products
    console.log("📦 Fetching all products...");
    const productsResponse = await fetch(`${API_BASE}/products`, {
      credentials: 'include',
      headers: {
        'Cookie': cookies || ''
      }
    });

    if (!productsResponse.ok) {
      throw new Error(`Failed to fetch products: ${productsResponse.status}`);
    }

    const productsData = await productsResponse.json();
    const products = productsData.products || [];

    if (products.length === 0) {
      console.log("ℹ️  No products found.");
      return;
    }

    console.log(`📋 Found ${products.length} products`);

    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;

    for (const product of products) {
      try {
        console.log(`\n🔍 Processing product: "${product.name}" (${product.id})`);

        // Check if this product already has options
        const optionsResponse = await fetch(`${API_BASE}/products/${product.id}/options`, {
          credentials: 'include',
          headers: {
            'Cookie': cookies || ''
          }
        });

        if (optionsResponse.ok) {
          const optionsData = await optionsResponse.json();
          const existingOptions = optionsData.options || [];

          if (existingOptions.length > 0) {
            console.log(`  ⏭️  Already has ${existingOptions.length} options. Skipping...`);
            skippedCount++;
            continue;
          }
        }

        // Add VP amounts option
        console.log(`  ➕ Adding "Select Amount" option...`);
        const vpAmountResponse = await fetch(`${API_BASE}/admin/products/${product.id}/options`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': cookies || ''
          },
          credentials: 'include',
          body: JSON.stringify(vpAmountsOption)
        });

        if (!vpAmountResponse.ok) {
          throw new Error(`Failed to add VP amounts option: ${vpAmountResponse.status}`);
        }

        // Add IGN#TAG option
        console.log(`  ➕ Adding "IGN#TAG" option...`);
        const ignTagResponse = await fetch(`${API_BASE}/admin/products/${product.id}/options`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': cookies || ''
          },
          credentials: 'include',
          body: JSON.stringify(ignTagOption)
        });

        if (!ignTagResponse.ok) {
          throw new Error(`Failed to add IGN#TAG option: ${ignTagResponse.status}`);
        }

        console.log(`  ✅ Successfully added default options`);
        successCount++;

      } catch (error) {
        console.error(`  ❌ Error processing product "${product.name}":`, error.message);
        errorCount++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`✅ Successfully added options to ${successCount} products`);
    console.log(`❌ Failed to add options to ${errorCount} products`);
    console.log(`⏭️  Skipped ${skippedCount} products (already had options)`);
    console.log(`📋 Total products processed: ${products.length}`);

  } catch (error) {
    console.error("💥 Error adding default options:", error.message);
  }
}

addDefaultOptionsToAllProducts().then(() => {
  console.log("\n✨ Default options setup complete!");
  process.exit(0);
}).catch(error => {
  console.error("\n💥 Failed to add default options:", error);
  process.exit(1);
});
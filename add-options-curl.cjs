#!/usr/bin/env node

// Add default options to all products using curl commands
const { execSync } = require('child_process');

function runCommand(command, description) {
  console.log(`${description}...`);
  try {
    const output = execSync(command, { encoding: 'utf8' });
    return output;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  }
}

async function addDefaultOptions() {
  console.log("🚀 Adding default options to all products...");

  // Login and save cookies
  console.log("🔐 Logging in as admin...");
  const loginResult = runCommand(
    `curl -s -X POST http://localhost:5001/api/auth/login -H "Content-Type: application/json" -d '{"username":"admin@credify.com","password":"admin123"}' -c cookies.txt`,
    "Authenticating"
  );

  if (!loginResult) {
    console.error("❌ Failed to login");
    return;
  }

  console.log("✅ Login successful");

  // Get all products
  console.log("📦 Fetching products...");
  const productsResult = runCommand(
    `curl -s http://localhost:5001/api/products -b cookies.txt`,
    "Fetching products"
  );

  if (!productsResult) {
    console.error("❌ Failed to fetch products");
    return;
  }

  const productsData = JSON.parse(productsResult);
  const products = productsData.products || [];

  console.log(`📋 Found ${products.length} products`);

  const vpAmountsOption = {
    type: "select",
    name: "Select Amount",
    key: "amount",
    required: true,
    placeholder: "",
    options: [
      { label: "475 VP", value: "475", priceModifier: 0 },
      { label: "950 VP", value: "950", priceModifier: 5 },
      { label: "1,900 VP", value: "1900", priceModifier: 10 },
      { label: "3,325 VP", value: "3325", priceModifier: 18 },
      { label: "5,350 VP", value: "5350", priceModifier: 28 },
      { label: "11,000 VP", value: "11000", priceModifier: 50 }
    ],
    sortOrder: 0,
    isActive: true
  };

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

  for (const product of products) {
    console.log(`\n🔍 Processing: "${product.name}"`);

    // Check existing options
    const existingOptionsResult = runCommand(
      `curl -s http://localhost:5001/api/products/${product.id}/options -b cookies.txt`,
      `Checking existing options for ${product.name}`
    );

    if (existingOptionsResult) {
      const existingData = JSON.parse(existingOptionsResult);
      if (existingData.options && existingData.options.length > 0) {
        console.log(`  ⏭️  Already has options. Skipping...`);
        continue;
      }
    }

    // Add VP amounts option
    const vpCommand = `curl -s -X POST http://localhost:5001/api/admin/products/${product.id}/options -H "Content-Type: application/json" -d '${JSON.stringify(vpAmountsOption)}' -b cookies.txt`;
    const vpResult = runCommand(vpCommand, `Adding VP amounts option`);
    
    if (!vpResult) {
      console.log(`  ❌ Failed to add VP amounts option`);
      continue;
    }

    // Add IGN#TAG option  
    const ignCommand = `curl -s -X POST http://localhost:5001/api/admin/products/${product.id}/options -H "Content-Type: application/json" -d '${JSON.stringify(ignTagOption)}' -b cookies.txt`;
    const ignResult = runCommand(ignCommand, `Adding IGN#TAG option`);
    
    if (!ignResult) {
      console.log(`  ❌ Failed to add IGN#TAG option`);
      continue;
    }

    console.log(`  ✅ Successfully added default options`);
    successCount++;
  }

  console.log(`\n📊 Summary: Added options to ${successCount}/${products.length} products`);
  console.log("✨ Setup complete!");

  // Cleanup
  runCommand('rm -f cookies.txt', 'Cleaning up');
}

addDefaultOptions().catch(console.error);
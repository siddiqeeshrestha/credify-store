#!/usr/bin/env tsx
import dotenv from "dotenv";
import { seedDatabase } from "../shared/seed";

// Load environment variables
dotenv.config();

async function main() {
  try {
    await seedDatabase();
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed database:", error);
    process.exit(1);
  }
}

main();
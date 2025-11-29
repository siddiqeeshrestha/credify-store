/**
 * Utility functions for generating and handling URL-friendly slugs
 */

/**
 * Generate a URL-friendly slug from a string
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate a unique slug by appending a number if needed
 * @param baseSlug - The base slug to start with
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug
 */
export function createUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  let slug = baseSlug;
  let counter = 1;
  
  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

/**
 * Generate a product slug from product name
 * @param productName - The product name
 * @returns A product-specific slug
 */
export function createProductSlug(productName: string): string {
  return createSlug(productName);
}

/**
 * Generate a category slug from category name
 * @param categoryName - The category name
 * @returns A category-specific slug
 */
export function createCategorySlug(categoryName: string): string {
  return createSlug(categoryName);
}

/**
 * Validate if a string is a valid slug format
 * @param slug - The slug to validate
 * @returns True if valid slug format
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Convert slug back to readable title
 * @param slug - The slug to convert
 * @returns A human-readable title
 */
export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
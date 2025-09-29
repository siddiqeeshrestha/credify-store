import React from "react";
import { Layout } from "@/components/Layout";
import { CategoriesSection } from "./sections/CategoriesSection";
import { CustomRequestSection } from "./sections/CustomRequestSection";
import { FeaturedProductsSection } from "./sections/FeaturedProductsSection";
import { HeroSection } from "./sections/HeroSection";
import { ProductsGridSection } from "./sections/ProductsGridSection";
import { PromotionSection } from "./sections/PromotionSection";
import { SubscriptionSection } from "./sections/SubscriptionSection";

export const HomePage = (): JSX.Element => {
  return (
    <Layout>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <PromotionSection />
      <ProductsGridSection />
      <SubscriptionSection />
      <CustomRequestSection />
    </Layout>
  );
};

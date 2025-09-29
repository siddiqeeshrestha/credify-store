import React from "react";
import { Layout } from "@/components/Layout";
import { HeroSection } from "./sections/HeroSection";
import { ProductsGridSection } from "./sections/ProductsGridSection";

export const CategoriesPage = (): JSX.Element => {
  return (
    <Layout>
      <HeroSection />
      <ProductsGridSection />
    </Layout>
  );
};

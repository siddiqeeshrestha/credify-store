import React from "react";
import { Layout } from "@/components/Layout";
import { ProductDetailSection } from "./sections/ProductDetailSection";

export const ProductPage = (): JSX.Element => {
  return (
    <Layout>
      <ProductDetailSection />
    </Layout>
  );
};

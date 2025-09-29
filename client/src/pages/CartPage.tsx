import React from "react";
import { Layout } from "@/components/Layout";
import { CartSection } from "./sections/CartSection";

export const CartPage = (): JSX.Element => {
  return (
    <Layout>
      <CartSection />
    </Layout>
  );
};

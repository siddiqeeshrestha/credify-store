import React from "react";
import { Layout } from "@/components/Layout";
import { OrderHistorySection } from "./sections/OrderHistorySection";

export const OrderDetailsPage = (): JSX.Element => {
  return (
    <Layout>
      <OrderHistorySection />
    </Layout>
  );
};

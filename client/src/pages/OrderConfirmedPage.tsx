import React from "react";
import { Layout } from "@/components/Layout";
import { OrderConfirmationSection } from "./sections/OrderConfirmationSection";

export const OrderConfirmedPage = (): JSX.Element => {
  return (
    <Layout>
      <OrderConfirmationSection />
    </Layout>
  );
};

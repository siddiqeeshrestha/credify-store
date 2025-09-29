import React from "react";
import { Layout } from "@/components/Layout";
import { RedeemCodeSection } from "./sections/RedeemCodeSection";

export const RedeemCodePage = (): JSX.Element => {
  return (
    <Layout>
      <RedeemCodeSection />
    </Layout>
  );
};

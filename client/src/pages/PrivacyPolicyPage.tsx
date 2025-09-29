import React from "react";
import { Layout } from "@/components/Layout";
import { PrivacyPolicySection } from "./sections/PrivacyPolicySection";

export const PrivacyPolicyPage = (): JSX.Element => {
  return (
    <Layout>
      <PrivacyPolicySection />
    </Layout>
  );
};

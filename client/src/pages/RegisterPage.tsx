import React from "react";
import { Layout } from "@/components/Layout";
import { RegisterSection } from "./sections/RegisterSection";

export const RegisterPage = (): JSX.Element => {
  return (
    <Layout>
      <RegisterSection />
    </Layout>
  );
};

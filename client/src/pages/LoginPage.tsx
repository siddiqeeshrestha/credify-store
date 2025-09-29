import React from "react";
import { Layout } from "@/components/Layout";
import { LoginSection } from "./sections/LoginSection";

export const LoginPage = (): JSX.Element => {
  return (
    <Layout>
      <LoginSection />
    </Layout>
  );
};

import React from "react";
import { Layout } from "@/components/Layout";
import { UserProfileSection } from "./sections/UserProfileSection";

export const MyProfilePage = (): JSX.Element => {
  return (
    <Layout>
      <UserProfileSection />
    </Layout>
  );
};

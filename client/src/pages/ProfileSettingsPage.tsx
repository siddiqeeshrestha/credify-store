import React from "react";
import { Layout } from "@/components/Layout";
import { ProfileEditSection } from "./sections/ProfileEditSection";

export const ProfileSettingsPage = (): JSX.Element => {
  return (
    <Layout>
      <ProfileEditSection />
    </Layout>
  );
};

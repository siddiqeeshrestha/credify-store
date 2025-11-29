import React from "react";
import { Layout } from "@/components/Layout";
import { ProfileManagementSection } from "./sections/ProfileManagementSection";
import { ProfileEditSection } from "./sections/ProfileEditSection";
import { ProfileSettingsForm } from "./sections/ProfileSettingsForm";

export const ProfileSettingsPage = (): JSX.Element => {
  return (
    <Layout>
      <ProfileManagementSection />
      <ProfileEditSection />
      <ProfileSettingsForm />
    </Layout>
  );
};

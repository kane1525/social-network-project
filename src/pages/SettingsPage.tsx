import React from "react";

import PasswordForm from "../components/Forms/ChangePasswordForm";
import SettingsForm from "../components/Forms/SettingsForm";
import PageContainer from "../layouts/PageContainer";

const SettingsPage = () => {
  return (
    <PageContainer>
      <SettingsForm />
      <PasswordForm />
    </PageContainer>
  );
};

export default SettingsPage;

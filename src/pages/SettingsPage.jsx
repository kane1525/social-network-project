import React from 'react';

import SettingsForm from '../components/Forms/SettingsForm/SettingsForm';
import PasswordForm from '../components/Forms/ChangePasswordForm/ChangePasswordForm';
import PageContainer from '../layouts/PageContainer';

const SettingsPage = () => {
  return (
    <PageContainer>
      <SettingsForm />
      <PasswordForm />
    </PageContainer>
  );
};

export default SettingsPage;

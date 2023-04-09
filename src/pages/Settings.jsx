import React from 'react';

import SettingsForm from '../components/SettingsForm/SettingsForm';
import PasswordForm from '../components/SettingsForm/PasswordForm';

const Settings = () => {
  return (
    <div className="users-container">
      <SettingsForm />
      <PasswordForm />
    </div>
  );
};

export default Settings;

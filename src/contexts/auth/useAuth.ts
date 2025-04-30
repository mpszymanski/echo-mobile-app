import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AuthContext from './AuthContext';

// Custom hook for using the auth context
export function useAuth() {
  const { t } = useTranslation();
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(t('auth.errors.useAuthHook'));
  }
  return context;
}
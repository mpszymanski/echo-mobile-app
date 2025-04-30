import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '~/contexts/auth';
import { View, ActivityIndicator, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import type { Route } from 'expo-router';

type AuthGuardProps = {
  children: React.ReactNode;
  redirectTo?: Route;
  showErrors?: boolean;
};

export function AuthGuard({ 
  children, 
  redirectTo = '/feed' as Route,
  showErrors = false
}: AuthGuardProps) {
  const { t } = useTranslation();
  const { isAuthenticated, isLoading, error } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      push(redirectTo);
    }
  }, [isAuthenticated, isLoading, push, redirectTo]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10, fontSize: 16, color: '#333' }}>
          {t('auth.checking')}
        </Text>
      </View>
    );
  }

  if (error && showErrors) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', fontSize: 16, marginBottom: 10 }}>{t('auth.error')}</Text>
        <Text style={{ textAlign: 'center' }}>{error.message}</Text>
      </View>
    );
  }

  return !isAuthenticated ? <>{children}</> : null;
}

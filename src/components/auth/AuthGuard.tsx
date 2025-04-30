import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '~/contexts/AuthContext';
import { View, ActivityIndicator, Text } from 'react-native';

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
          Checking authentication...
        </Text>
      </View>
    );
  }

  if (error && showErrors) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', fontSize: 16, marginBottom: 10 }}>Authentication Error</Text>
        <Text style={{ textAlign: 'center' }}>{error.message}</Text>
      </View>
    );
  }

  return !isAuthenticated ? <>{children}</> : null;
}

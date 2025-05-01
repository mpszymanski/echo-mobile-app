import { useEffect } from 'react';
import { Route, useRouter } from 'expo-router';
import { useAuth } from '~/contexts/auth';
import { View, ActivityIndicator, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

type ProtectedRouteProps = {
  children: React.ReactNode;
  redirectTo?: Route;
  showErrors?: boolean;
};

export function ProtectedRoute({
  children,
  redirectTo = '/' as Route,
  showErrors = false,
}: ProtectedRouteProps) {
  const { t } = useTranslation();
  const { isAuthenticated, isLoading, error } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      push(redirectTo);
    }
  }, [isAuthenticated, isLoading, push, redirectTo]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#f5f5f5]">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2.5 text-base text-[#333]">{t('auth.checking')}</Text>
      </View>
    );
  }

  if (error && showErrors) {
    return (
      <View className="flex-1 items-center justify-center p-5">
        <Text className="mb-2.5 text-base text-red-500">{t('auth.error')}</Text>
        <Text className="text-center">{error.message}</Text>
      </View>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}

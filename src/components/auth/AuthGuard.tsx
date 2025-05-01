import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import type { Route } from 'expo-router';
import { View } from 'react-native';
import { useAuth } from '~/contexts/auth';
import { ActivityIndicator } from '~/components/ui/activity-indicator';
import { Text } from '~/components/ui/text';

type AuthGuardProps = {
  children: ReactNode;
  redirectTo?: Route;
};

export function AuthGuard({ children, redirectTo = '/onboarding' as Route }: AuthGuardProps) {
  const { t } = useTranslation();
  const { isAuthenticated, isLoading } = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      replace(redirectTo);
    }
  }, [isAuthenticated, isLoading, replace, redirectTo]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
        <Text>{t('auth.checking')}</Text>
      </View>
    );
  }

  return !isAuthenticated ? <>{children}</> : null;
}

import { useEffect, type ReactNode } from 'react';
import { Route, useRouter } from 'expo-router';
import { useAuth } from '~/contexts/auth';
import { View, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useToast } from '~/hooks/useToast';
import { Text } from '~/components/ui/text';

type ProtectedRouteProps = {
  children: ReactNode;
  redirectTo?: Route;
};

export function ProtectedRoute({ children, redirectTo = '/' as Route }: ProtectedRouteProps) {
  const { t } = useTranslation();
  const { isAuthenticated, isLoading } = useAuth();
  const { push } = useRouter();
  const { showInfo } = useToast();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      showInfo(t('auth.loggedOut'));
      push(redirectTo);
    }
  }, [isAuthenticated, isLoading, push, redirectTo, showInfo, t]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
        <Text>{t('auth.checking')}</Text>
      </View>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}

import { View, Text } from 'react-native';
import { ProtectedRoute } from '~/components/auth/ProtectedRoute';
import { useAuth } from '~/contexts/auth';
import { Button } from '~/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useToast } from '~/utils/useToast';
import {useEffect} from "react";

export default function Feed() {
  const { profile, error, signOut } = useAuth();
  const { t } = useTranslation();
  const { showError } = useToast();


  useEffect(() => {
    if (error) {
      showError(error.message);
    }
  }, [error, showError]);

  return (
    <ProtectedRoute>
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-xl font-semibold text-foreground">You are logged in!</Text>
        <Text className="mt-4 text-foreground">
          {JSON.stringify(profile, null, 2)}
        </Text>
        <Button className="mt-8" variant="destructive" onPress={signOut}>
          <Text>{t('auth.logout')}</Text>
        </Button>
      </View>
    </ProtectedRoute>
  );
}

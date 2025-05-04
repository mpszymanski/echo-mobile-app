import { View, Text } from 'react-native';
import { ProtectedRoute } from '~/components/auth/ProtectedRoute';
import { useAuth } from '~/contexts/auth';
import { Button } from '~/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useToast } from '~/hooks/useToast';

export default function Feed() {
  const { profile, signOut } = useAuth();
  const { t } = useTranslation();
  const { showError } = useToast();

  const singUserOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Error signing out:', err);
      showError(t('auth.errors.signOut.title'), t('auth.errors.signOut.description'));
    }
  };

  return (
    <ProtectedRoute>
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-semibold text-foreground">You are logged in!</Text>
        <Text className="mt-4 text-foreground">{JSON.stringify(profile, null, 2)}</Text>
        <Button className="mt-8" variant="destructive" onPress={singUserOut}>
          <Text className="text-white">{t('auth.logout')}</Text>
        </Button>
      </View>
    </ProtectedRoute>
  );
}

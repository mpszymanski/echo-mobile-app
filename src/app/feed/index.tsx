import {View, Text} from 'react-native';
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import { useAuth } from "~/contexts/auth";
import { Button } from "~/components/ui/button";
import { useTranslation } from 'react-i18next';

export default function Feed() {
    const { user, error, signOut } = useAuth();
    const { t } = useTranslation();

    return (
        <ProtectedRoute>
            <View className="flex-1 items-center justify-center bg-background">
                <Text className="text-xl font-semibold text-foreground">
                    You are logged in!
                </Text>
                <Text className="mt-4 text-foreground">
                    {error ? error.message : JSON.stringify(user, null, 2)}
                </Text>
                <Button 
                    className="mt-8" 
                    variant="destructive" 
                    onPress={signOut}
                >
                    <Text>{t('auth.logout')}</Text>
                </Button>
            </View>
        </ProtectedRoute>
    );
}

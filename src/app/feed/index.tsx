import {View, Text} from 'react-native';
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import { useAuth } from "~/contexts/AuthContext";

export default function Feed() {
    const { user, error } = useAuth();

    return (
        <ProtectedRoute>
            <View className="flex-1 items-center justify-center bg-background">
                <Text className="text-xl font-semibold text-foreground">
                    You are logged in!
                </Text>
                <Text className="mt-4 text-foreground">
                    {error ? error.message : JSON.stringify(user, null, 2)}
                </Text>
            </View>
        </ProtectedRoute>
    );
}

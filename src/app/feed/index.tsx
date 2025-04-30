import {View, Text} from 'react-native';
import {getUserData} from "~/features/auth/getUserData";
import {useEffect, useState} from "react";

export default function Feed() {
    const [userData, setUserData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserData();
                setUserData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch user data');
            }
        };

        fetchUserData();
    }, []);

    return (
        <View className="flex-1 items-center justify-center bg-background">
            <Text className="text-xl font-semibold text-foreground">
                You are logged in!
            </Text>
            <Text className="mt-4 text-foreground">
                {error ? error : JSON.stringify(userData, null, 2)}
            </Text>
        </View>
    );
}
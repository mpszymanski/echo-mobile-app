import {View, Text} from 'react-native';

export default function Feed() {
    return (
        <View className="flex-1 items-center justify-center bg-background">
            <Text className="text-xl font-semibold text-foreground">
                You are logged in!
            </Text>
        </View>
    );
}
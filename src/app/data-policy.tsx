import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H2, P } from '~/components/ui/typography';
import { Stack } from 'expo-router';

export default function DataPolicy() {
  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ title: 'Data Policy' }} />
      <View className="flex-1 p-4">
        <H2 className="mb-4">Data Policy</H2>
        <P className="mb-2">
          At Echo, we take your privacy seriously. This policy explains how we collect, use, and
          protect your data.
        </P>
        <P className="mb-2">
          We collect information you provide directly to us, such as your phone number and profile
          information.
        </P>
        <P className="mb-2">
          We use your data to provide and improve our services, and to communicate with you about
          our services.
        </P>
      </View>
    </SafeAreaView>
  );
}

import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H2, P } from '~/components/ui/typography';
import { Stack } from 'expo-router';

export default function TermsAndConditions() {
  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ title: 'Terms and Conditions' }} />
      <View className="flex-1 p-4">
        <H2 className="mb-4">Terms and Conditions</H2>
        <P className="mb-2">
          Welcome to Echo. By using our service, you agree to these terms and conditions.
        </P>
        <P className="mb-2">
          We reserve the right to modify these terms at any time. Your continued use of the service
          constitutes acceptance of the modified terms.
        </P>
        <P className="mb-2">Please read these terms carefully before using our service.</P>
      </View>
    </SafeAreaView>
  );
}

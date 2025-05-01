import React from 'react';
import { View } from 'react-native';
import { H1 } from '~/components/ui/typography';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { useRouter } from 'expo-router';

export default function ConnectionsSetup() {
  const { push } = useRouter();

  return (
    <View className="flex-1 p-4">
      <View className="flex-1 items-center justify-center">
        <H1 className="mb-8 text-center">Onboarding completed!</H1>

        <Text className="mb-8 text-center text-foreground">
          This is a placeholder for the onboarding completed screen.
        </Text>

        <Button onPress={() => push('/feed')} className="mt-4">
          <Text className="font-semibold text-white">Finish!</Text>
        </Button>
      </View>
    </View>
  );
}

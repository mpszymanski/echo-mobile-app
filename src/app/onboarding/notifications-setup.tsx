import React from 'react';
import { View } from 'react-native';
import { H1 } from '~/components/ui/typography';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { useOnboarding } from '~/contexts/onboarding';

export default function NotificationsSetup() {
  const { goToNextStep } = useOnboarding();

  return (
    <View className="flex-1 p-4">
      <View className="flex-1 items-center justify-center">
        <H1 className="mb-8 text-center">Notification Preferences</H1>

        <Text className="mb-8 text-center text-foreground">
          This is a placeholder for the notifications setup screen. In a real implementation, you
          would show options to configure notification preferences.
        </Text>

        <Button onPress={goToNextStep} className="mt-4">
          <Text className="font-semibold text-white">Complete Setup</Text>
        </Button>
      </View>
    </View>
  );
}

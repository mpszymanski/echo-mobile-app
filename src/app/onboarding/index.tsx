import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Route, useRouter } from 'expo-router';
import { Text } from '~/components/ui/text';
import { useOnboarding } from '~/contexts/onboarding';
import { OnboardingStep } from '~/contexts/onboarding/types';

export default function OnboardingRouter() {
  const { state } = useOnboarding();
  const router = useRouter();

  useEffect(() => {
    // Route to the appropriate onboarding step
    if (state.currentStep !== OnboardingStep.CHECKING) {
      if (state.isComplete) {
        router.replace('/feed');
      } else {
        router.replace(`/onboarding/${state.currentStep}` as Route);
      }
    }
  }, [state, router]);

  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
      <Text className="mt-4">Preparing your experience...</Text>
    </View>
  );
}

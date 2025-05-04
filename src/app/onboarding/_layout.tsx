import { Stack } from 'expo-router';
import { OnboardingProvider } from '~/contexts/onboarding';
import { ProtectedRoute } from '~/components/auth/ProtectedRoute';

export default function OnboardingLayout() {
  return (
    <ProtectedRoute>
      <OnboardingProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </OnboardingProvider>
    </ProtectedRoute>
  );
}

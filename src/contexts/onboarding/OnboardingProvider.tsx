import React, { useState, useEffect, useContext } from 'react';
import { Route, useRouter } from 'expo-router';
import { useAuth } from '~/contexts/auth';
import { OnboardingStep, OnboardingState } from './types';
import OnboardingContext from './OnboardingContext';

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const { user, hasProfile } = useAuth();
  const router = useRouter();

  const [state, setState] = useState<OnboardingState>({
    currentStep: OnboardingStep.CHECKING,
    completedSteps: [],
    isComplete: false,
  });

  // Initialize onboarding state based on user profile
  useEffect(() => {
    if (!user) return;

    if (hasProfile) {
      // User has completed basic profile
      setState(prev => ({
        ...prev,
        currentStep: OnboardingStep.LOCATION_SETUP,
        completedSteps: [OnboardingStep.PROFILE_CREATION],
        isComplete: false,
      }));
    } else {
      // User needs to create profile
      setState(prev => ({
        ...prev,
        currentStep: OnboardingStep.PROFILE_CREATION,
        completedSteps: [],
        isComplete: false,
      }));
    }
  }, [user, hasProfile]);

  const goToNextStep = () => {
    const steps = [
      OnboardingStep.PROFILE_CREATION,
      OnboardingStep.LOCATION_SETUP,
      OnboardingStep.CONNECTIONS_SETUP,
      OnboardingStep.NOTIFICATIONS_SETUP,
      OnboardingStep.COMPLETED,
    ];

    const currentIndex = steps.indexOf(state.currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      setState(prev => ({
        ...prev,
        currentStep: nextStep,
        completedSteps: [...prev.completedSteps, prev.currentStep],
      }));

      // Navigate to the appropriate screen
      router.replace(`/onboarding/${nextStep}` as Route);
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = () => {
    setState(prev => ({
      ...prev,
      currentStep: OnboardingStep.COMPLETED,
      isComplete: true,
    }));
    router.replace('/feed');
  };

  const resetOnboarding = () => {
    setState({
      currentStep: OnboardingStep.PROFILE_CREATION,
      completedSteps: [],
      isComplete: false,
    });
  };

  return (
    <OnboardingContext.Provider
      value={{
        state,
        goToNextStep,
        completeOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

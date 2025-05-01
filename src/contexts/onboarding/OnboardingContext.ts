import { createContext } from 'react';
import { OnboardingState, OnboardingStep } from './types';

interface OnboardingContextType {
  state: OnboardingState;
  goToNextStep: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const initialState: OnboardingState = {
  currentStep: OnboardingStep.CHECKING,
  completedSteps: [],
  isComplete: false
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export default OnboardingContext;
import { createContext } from 'react';
import { OnboardingState } from './types';

interface OnboardingContextType {
  state: OnboardingState;
  goToNextStep: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export default OnboardingContext;

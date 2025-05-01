export enum OnboardingStep {
  CHECKING = 'checking',
  PROFILE_CREATION = 'profile-creation',
  LOCATION_SETUP = 'location-setup',
  CONNECTIONS_SETUP = 'connections-setup',
  NOTIFICATIONS_SETUP = 'notifications-setup',
  COMPLETED = 'completed',
}

export interface OnboardingState {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  isComplete: boolean;
}

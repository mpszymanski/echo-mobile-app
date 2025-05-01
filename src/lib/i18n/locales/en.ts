export default {
  translation: {
    welcome: {
      header: 'Welcome to Echo',
      text: 'Log in or sign up to get started',
    },
    authPhone: {
      header: 'Enter your phone number',
      description: "We'll send you a verification code to confirm your identity",
      placeholder: 'Phone number',
      button: 'Continue',
      errors: {
        sendOTP: {
          title: 'Verification Code Error',
          description: "We couldn't send the verification code. Please check your phone number and try again."
        },
      },
    },
    authToken: {
      header: 'Enter verification code',
      description: 'We sent a verification code to your phone. Please enter it below.',
      button: 'Verify',
      errors: {
        verifyOTP: {
          title: 'Invalid Code',
          description: "That code doesn't seem right. Please double-check and try again, or request a new code."
        },
      },
    },
    auth: {
      checking: "Just a moment, we're getting things ready for you...",
      error: 'Oops! Something went wrong',
      logout: 'Logout',
      errors: {
        unknown: {
          title: 'Sign-in Error',
          description: "We're having trouble signing you in right now. Please try again in a moment."
        },
        signOut: {
          title: 'Sign-out Error',
          description: "We couldn't sign you out properly. Please close the app and try again."
        },
        stateChange: {
          title: 'Session Error',
          description: 'Something unexpected happened with your session. Please try signing in again.'
        },
        useAuthHook: {
          title: 'Technical Issue',
          description: "There's a technical issue with the app. Please restart and try again."
        },
      },
    },
    profile: {
      createTitle: 'Create Your Profile',
      displayNameLabel: 'Display Name',
      displayNamePlaceholder: 'Enter your name',
      create: 'Create Profile',
      creating: 'Creating...',
      loading: 'Loading profile...',
      errors: {
        nameRequired: {
          title: 'Name Required',
          description: 'Please enter a display name to create your profile.'
        },
        notAuthenticated: {
          title: 'Authentication Error',
          description: 'You need to be logged in to create a profile. Please sign in again.'
        },
        createFailed: {
          title: 'Profile Creation Failed',
          description: 'We couldn\'t create your profile. Please try again later.'
        },
      },
    },
  },
};

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
        sendOTP:
          "Oops! We couldn't send the verification code. Please check your phone number and try again.",
      },
    },
    authToken: {
      header: 'Enter verification code',
      description: 'We sent a verification code to your phone. Please enter it below.',
      button: 'Verify',
      errors: {
        verifyOTP:
          "Hmm, that code doesn't seem right. Please double-check and try again, or request a new code.",
      },
    },
    auth: {
      checking: "Just a moment, we're getting things ready for you...",
      error: 'Oops! Something went wrong',
      logout: 'Logout',
      errors: {
        unknown: "We're having trouble signing you in right now. Please try again in a moment.",
        signOut: "We couldn't sign you out properly. Please close the app and try again.",
        stateChange:
          'Something unexpected happened with your session. Please try signing in again.',
        useAuthHook: "There's a technical issue with the app. Please restart and try again.",
      },
    },
  },
};

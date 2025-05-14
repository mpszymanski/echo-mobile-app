export default {
  translation: {
    policy: {
      terms: 'Terms and Conditions',
      privacy: 'Data Policy',
      loading: 'Loading policy...',
      error: 'We failed to load policy. Try again later.',
      notAvailable: 'No policy available',
    },
    welcome: {
      header: 'Welcome to Echo',
      text: 'Log in or sign up to get started',
    },
    authPhone: {
      header: 'Enter your phone number',
      description: "We'll send you a verification code to confirm your identity",
      placeholder: 'Phone number',
      button: 'Continue',
      termsCheckbox: 'I accept the <0>Terms and Conditions</0> and <1>Data Policy</1>',
      errors: {
        sendOTP: {
          title: 'Verification Code Error',
          description:
            "We couldn't send the verification code. Please check your phone number and try again.",
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
          description:
            "That code doesn't seem right. Please double-check and try again, or request a new code.",
        },
      },
    },
    auth: {
      checking: "Just a moment, we're getting things ready for you...",
      logout: 'Logout',
      loggedOut: 'You have been logged out',
      errors: {
        signOut: {
          title: 'Sign-out Error',
          description: "We couldn't sign you out properly. Please close the app and try again.",
        },
      },
    },
    profile: {
      createTitle: 'Create Your Profile',
      displayNameLabel: 'User Name',
      displayNamePlaceholder: 'Enter your name',
      create: 'Create Profile',
      creating: 'Creating...',
      loading: 'Loading profile...',
      errors: {
        nameRequired: {
          title: 'Name Required',
          description: 'Please enter a display name to create your profile.',
        },
        createFailed: {
          title: 'Profile Creation Failed',
          description: "We couldn't create your profile. Please try again later.",
        },
      },
    },
  },
};

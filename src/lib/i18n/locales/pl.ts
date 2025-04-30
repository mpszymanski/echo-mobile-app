export default {
  translation: {
    welcome: {
      header: 'Witaj w Echo',
      text: 'Zaloguj się lub zarejestruj',
    },
    authPhone: {
      header: 'Wprowadź swój numer telefonu',
      description: 'Wyślemy Ci kod weryfikacyjny, aby potwierdzić Twoją tożsamość',
      placeholder: 'Numer telefonu',
      button: 'Kontynuuj',
      errors: {
        sendOTP:
          'Ups! Nie mogliśmy wysłać kodu weryfikacyjnego. Sprawdź swój numer telefonu i spróbuj ponownie.',
      },
    },
    authToken: {
      header: 'Wprowadź kod weryfikacyjny',
      description: 'Wysłaliśmy kod weryfikacyjny na Twój telefon. Wprowadź go poniżej.',
      button: 'Weryfikuj',
      errors: {
        verifyOTP:
          'Hmm, ten kod nie wydaje się poprawny. Sprawdź go dokładnie i spróbuj ponownie lub poproś o nowy kod.',
      },
    },
    profile: {
      createTitle: 'Utwórz swój profil',
      displayNameLabel: 'Nazwa wyświetlana',
      displayNamePlaceholder: 'Wprowadź swoją nazwę',
      create: 'Utwórz profil',
      creating: 'Tworzenie profilu...',
      loading: 'Sprawdzanie profilu...',
      errors: {
        nameRequired: 'Nazwa wyświetlana jest wymagana',
        notAuthenticated: 'Musisz być zalogowany, aby utworzyć profil',
        checkFailed: 'Nie udało się sprawdzić profilu. Spróbuj ponownie.',
        createFailed: 'Nie udało się utworzyć profilu. Spróbuj ponownie.',
      },
    },
    auth: {
      checking: 'Chwileczkę, przygotowujemy wszystko dla Ciebie...',
      error: 'Ups! Coś poszło nie tak',
      logout: 'Wyloguj',
      errors: {
        unknown: 'Mamy problem z zalogowaniem Cię w tej chwili. Spróbuj ponownie za moment.',
        signOut: 'Nie mogliśmy Cię poprawnie wylogować. Zamknij aplikację i spróbuj ponownie.',
        stateChange: 'Coś nieoczekiwanego stało się z Twoją sesją. Spróbuj zalogować się ponownie.',
        useAuthHook:
          'Wystąpił techniczny problem z aplikacją. Uruchom ją ponownie i spróbuj jeszcze raz.',
      },
    },
  },
};

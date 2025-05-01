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
        sendOTP: {
          title: 'Błąd kodu weryfikacyjnego',
          description: 'Nie mogliśmy wysłać kodu weryfikacyjnego. Sprawdź swój numer telefonu i spróbuj ponownie.'
        },
      },
    },
    authToken: {
      header: 'Wprowadź kod weryfikacyjny',
      description: 'Wysłaliśmy kod weryfikacyjny na Twój telefon. Wprowadź go poniżej.',
      button: 'Weryfikuj',
      errors: {
        verifyOTP: {
          title: 'Nieprawidłowy kod',
          description: 'Ten kod nie wydaje się poprawny. Sprawdź go dokładnie i spróbuj ponownie lub poproś o nowy kod.'
        },
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
        nameRequired: {
          title: 'Nazwa jest wymagana',
          description: 'Wprowadź nazwę wyświetlaną, aby utworzyć swój profil.'
        },
        notAuthenticated: {
          title: 'Błąd uwierzytelniania',
          description: 'Musisz być zalogowany, aby utworzyć profil. Zaloguj się ponownie.'
        },
        createFailed: {
          title: 'Tworzenie profilu nie powiodło się',
          description: 'Nie udało się utworzyć profilu. Spróbuj ponownie później.'
        },
      },
    },
    auth: {
      checking: 'Chwileczkę, przygotowujemy wszystko dla Ciebie...',
      error: 'Ups! Coś poszło nie tak',
      logout: 'Wyloguj',
      errors: {
        unknown: {
          title: 'Błąd logowania',
          description: 'Mamy problem z zalogowaniem Cię w tej chwili. Spróbuj ponownie za moment.'
        },
        signOut: {
          title: 'Błąd wylogowania',
          description: 'Nie mogliśmy Cię poprawnie wylogować. Zamknij aplikację i spróbuj ponownie.'
        },
        stateChange: {
          title: 'Błąd sesji',
          description: 'Coś nieoczekiwanego stało się z Twoją sesją. Spróbuj zalogować się ponownie.'
        },
        useAuthHook: {
          title: 'Problem techniczny',
          description: 'Wystąpił techniczny problem z aplikacją. Uruchom ją ponownie i spróbuj jeszcze raz.'
        },
      },
    },
  },
};

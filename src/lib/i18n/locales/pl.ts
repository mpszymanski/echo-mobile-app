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
          description:
            'Nie mogliśmy wysłać kodu weryfikacyjnego. Sprawdź swój numer telefonu i spróbuj ponownie.',
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
          description:
            'Ten kod nie wydaje się poprawny. Sprawdź go dokładnie i spróbuj ponownie lub poproś o nowy kod.',
        },
      },
    },
    auth: {
      checking: 'Chwileczkę, przygotowujemy wszystko dla Ciebie...',
      logout: 'Wyloguj',
      loggedOut: 'Zostałeś wylogowany',
      errors: {
        signOut: {
          title: 'Błąd wylogowania',
          description:
            'Nie mogliśmy Cię poprawnie wylogować. Zamknij aplikację i spróbuj ponownie.',
        },
      },
    },
    profile: {
      createTitle: 'Utwórz swój profil',
      displayNameLabel: 'Nazwa użytkownika',
      displayNamePlaceholder: 'Wprowadź swoje imię i nazwisko',
      create: 'Utwórz profil',
      creating: 'Tworzenie profilu...',
      loading: 'Sprawdzanie profilu...',
      errors: {
        nameRequired: {
          title: 'Nazwa jest wymagana',
          description: 'Wprowadź nazwę wyświetlaną, aby utworzyć swój profil.',
        },
        createFailed: {
          title: 'Tworzenie profilu nie powiodło się',
          description: 'Nie udało się utworzyć profilu. Spróbuj ponownie później.',
        },
      },
    },
  },
};

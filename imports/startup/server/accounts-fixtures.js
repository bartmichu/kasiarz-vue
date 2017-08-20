import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";


Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: "kasiarz",
      password: "kasiarz",
      profile: {
        daneOsobowe: {
          imie: "Imię",
          nazwisko: "Nazwisko",
        },
        serwis: {
          nazwa: "Projekt Kasiarz",
          nip: "1234567890",
          regonPesel: "987654321",
          adres: {
            kraj: "Polska",
            wojewodztwo: "wielkopolskie",
            gminaDzielnica: "Przykładowa",
            ulica: "Zmyślona",
            numerDomu: "99",
            numerLokalu: "",
            miejscowosc: "Przykładowa",
            kodPocztowy: "09-876",
            poczta: "Pocztowa",
            skrytkaPocztowa: "",
          },
          telefon: "111222333",
          email: "",
          dodatkoweInformacje: "",
          serwisanci: [{ imieNazwisko: "Serwisant Pierwszy", dodatkoweInformacje: "" }, { imieNazwisko: "Serwisant Drugi", dodatkoweInformacje: "" }],
        },
      },
    });

    Accounts.createUser({
      username: "test",
      password: "test",
      profile: {
        serwis: {},
      },
    });
  }
});

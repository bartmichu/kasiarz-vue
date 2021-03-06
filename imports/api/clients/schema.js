import Clients from "/imports/api/clients/clients.js";
import SimpleSchema from "simpl-schema";

const clientSchema = new SimpleSchema({
  uzytkownikId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "ID użytkownika",
    min: 1,
    optional: false,
    denyUpdate: true
  },
  nazwa: {
    type: String,
    label: "Nazwa/Imię i nazwisko",
    min: 1,
    max: 100,
    optional: false
  },
  nip: {
    type: String,
    label: "NIP",
    min: 1,
    max: 100,
    optional: false
  },
  regonPesel: {
    type: String,
    label: "REGON/PESEL",
    max: 100,
    optional: true
  },
  kraj: {
    type: String,
    label: "Kraj",
    min: 1,
    max: 100,
    optional: false
  },
  wojewodztwoId: {
    type: SimpleSchema.RegEx.Id,
    label: "Województwo",
    min: 1,
    max: 100,
    optional: false
  },
  gminaDzielnica: {
    type: String,
    label: "Gmina/dzielnica",
    max: 100,
    optional: true
  },
  ulica: {
    type: String,
    label: "Ulica",
    max: 100,
    optional: true
  },
  nrDomu: {
    type: String,
    label: "Numer domu",
    max: 100,
    optional: true
  },
  nrLokalu: {
    type: String,
    label: "Numer lokalu",
    max: 100,
    optional: true
  },
  miejscowosc: {
    type: String,
    label: "Miejscowość",
    min: 1,
    max: 100,
    optional: false
  },
  kodPocztowy: {
    type: String,
    label: "Kod pocztowy",
    min: 1,
    max: 100,
    optional: false
  },
  poczta: {
    type: String,
    label: "Poczta",
    min: 1,
    max: 100,
    optional: false
  },
  skrytkaPocztowa: {
    type: String,
    label: "Skrytka pocztowa",
    max: 100,
    optional: true
  },
  telefon: {
    type: String,
    label: "Telefon",
    max: 100,
    optional: true
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: "E-mail",
    max: 100,
    optional: true
  },
  dodatkoweInformacje: {
    type: String,
    label: "Dodatkowe informacje",
    max: 300,
    optional: true
  },
  miejscaInstalacji: {
    type: Array,
    label: "Miejsce instalacji",
    maxCount: 100,
    optional: true
  },
  "miejscaInstalacji.$": {
    type: String,
    max: 300,
    optional: true
  },
  dataUtworzenia: {
    type: Date,
    label: "Data utworzenia",
    optional: true,
    denyUpdate: true
  },
  dataModyfikacji: {
    type: Date,
    label: "Data modyfikacji",
    optional: true
  }
});

Clients.attachSchema(clientSchema);

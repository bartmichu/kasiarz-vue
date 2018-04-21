import SimpleSchema from "simpl-schema";
import Offices from "/imports/api/offices/offices.js";


const officeSchema = new SimpleSchema({
  uzytkownikId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "ID użytkownika",
    min: 1,
    optional: false,
    denyUpdate: true,
  },
  nazwa: {
    type: String,
    label: "Pełna nazwa",
    min: 1,
    max: 100,
    optional: false,
  },
  adresat: {
    type: String,
    label: "Adresat",
    min: 1,
    max: 100,
    optional: false,
  },
  adres: {
    type: Object,
  },
  "adres.kraj": {
    type: String,
    label: "Kraj",
    max: 100,
    defaultValue: "Polska",
    optional: true,
  },
  "adres.wojewodztwoId": {
    type: SimpleSchema.RegEx.Id,
    label: "Województwo",
    min: 1,
    max: 100,
    optional: false,
  },
  "adres.gminaDzielnica": {
    type: String,
    label: "Gmina / Dzielnica",
    min: 1,
    max: 100,
    optional: false,
  },
  "adres.ulica": {
    type: String,
    label: "Ulica",
    max: 100,
    optional: true,
  },
  "adres.nrDomu": {
    type: String,
    label: "Numer domu",
    min: 1,
    max: 100,
    optional: false,
  },
  "adres.nrLokalu": {
    type: String,
    label: "Numer lokalu",
    max: 100,
    optional: true,
  },
  "adres.miejscowosc": {
    type: String,
    label: "Miejscowość",
    min: 1,
    max: 100,
    optional: false,
  },
  "adres.kodPocztowy": {
    type: String,
    label: "Kod pocztowy",
    min: 1,
    max: 100,
    optional: false,
  },
  "adres.poczta": {
    type: String,
    label: "Poczta",
    min: 1,
    max: 100,
    optional: false,
  },
  telefon: {
    type: String,
    label: "Numer telefonu",
    max: 100,
    optional: true,
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: "Adres e-mail",
    max: 100,
    optional: true,
  },
  dodatkoweInformacje: {
    type: String,
    label: "Dodatkowe informacje",
    max: 300,
    optional: true,
  },
  dataUtworzenia: {
    type: Date,
    label: "Data utworzenia",
    optional: true,
    denyUpdate: true,
  },
  dataModyfikacji: {
    type: Date,
    label: "Data ostatniej modyfikacji",
    optional: true,
  },
});


Offices.attachSchema(officeSchema);

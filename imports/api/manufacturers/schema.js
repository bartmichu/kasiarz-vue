import SimpleSchema from "simpl-schema";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";


const manufacturerSchema = new SimpleSchema({
  uzytkownikId: {
    type: String,
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
  nazwaSortowalna: {
    type: String,
    label: "Pełna nazwa (sortowalna)",
    min: 1,
    max: 100,
    optional: true,
  },
  adres: {
    type: Object,
  },
  "adres.ulica": {
    type: String,
    label: "Ulica",
    min: 1,
    max: 100,
    optional: false,
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
    label: "Data modyfikacji",
    optional: true,
  },
});


Manufacturers.attachSchema(manufacturerSchema);


// TODO zastanowić się, czy export jest potrzebny?
export default { manufacturerSchema };

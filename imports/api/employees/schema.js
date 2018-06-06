import Employees from "/imports/api/employees/employees.js";
import SimpleSchema from "simpl-schema";

const licenseSchema = new SimpleSchema({
  numerUprawnien: {
    type: String,
    label: "Numer uprawnień",
    optional: false,
    min: 1,
    max: 100
  },
  modele: {
    type: Array,
    label: "Modele urządzeń",
    maxCount: 100,
    optional: false
  },
  "modele.$": {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  dodatkoweInformacje: {
    type: String,
    label: "Dodatkowe informacje",
    max: 300,
    optional: true
  }
});

const employeeSchema = new SimpleSchema({
  uzytkownikId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "ID użytkownika",
    min: 1,
    optional: false,
    denyUpdate: true
  },
  imieNazwisko: {
    type: String,
    label: "Imię i nazwisko",
    min: 1,
    max: 100,
    optional: false
  },
  serwisId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "Serwis",
    optional: false
  },
  uprawnienia: {
    type: Array,
    maxCount: 100,
    optional: true
  },
  "uprawnienia.$": {
    type: licenseSchema
  },
  dodatkoweInformacje: {
    type: String,
    label: "Dodatkowe informacje",
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

Employees.attachSchema(employeeSchema);

export default licenseSchema;

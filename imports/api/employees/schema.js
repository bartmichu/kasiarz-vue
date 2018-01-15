import SimpleSchema from "simpl-schema";
import Employees from "/imports/api/employees/employees.js";


const employeeSchema = new SimpleSchema({
  uzytkownikId: {
    type: String,
    label: "ID użytkownika",
    min: 1,
    optional: false,
    denyUpdate: true,
  },
  imieNazwisko: {
    type: String,
    label: "Imię i nazwisko",
    min: 1,
    max: 100,
    optional: false,
  },
  serwisId: {
    type: String,
    label: "Serwis",
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


Employees.attachSchema(employeeSchema);

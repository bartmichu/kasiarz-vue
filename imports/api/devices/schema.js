import SimpleSchema from "simpl-schema";
import Devices from "/imports/api/devices/devices.js";


const deviceSchema = new SimpleSchema({
  uzytkownikId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "ID użytkownika",
    min: 1,
    optional: false,
    denyUpdate: true,
  },
  producentId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "Producent",
    min: 1,
    max: 100,
    optional: false,
  },
  modelId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "Model",
    min: 1,
    max: 100,
    optional: false,
  },
  numerUnikatowy: {
    type: String,
    label: "Numer unikatowy",
    min: 1,
    max: 100,
    optional: false,
  },
  numerFabryczny: {
    type: String,
    label: "Numer fabryczny",
    min: 1,
    max: 100,
    optional: false,
  },
  klientId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "Klient",
    min: 1,
    max: 100,
    optional: false,
  },
  dataFiskalizacji: {
    type: Date,
    label: "Data fiskalizacji",
    optional: false,
  },
  miejsceInstalacji: {
    type: String,
    label: "Miejsce instalacji",
    max: 300,
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


Devices.attachSchema(deviceSchema);

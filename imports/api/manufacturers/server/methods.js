import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { check } from "meteor/check";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
// import { Models } from "/imports/api/collections/urzadzenia/urzadzenia.js";
import { manufacturerSchema } from "/imports/api/manufacturers/schema.js";


export const wstawProducenta = new ValidatedMethod({
  name: "producenci.wstaw",
  validate(producent) {
    const zalogowanyUzytkownikId = Meteor.userId();
    if (zalogowanyUzytkownikId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      producent.uzytkownikId = zalogowanyUzytkownikId;
      const kontekstWalidacji = manufacturerSchema.newContext();
      if (kontekstWalidacji.validate(producent) !== true) {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run(producent) {
    producent.uzytkownikId = Meteor.userId();
    producent.nazwaSortowalna = producent.nazwa.toLowerCase();
    producent.dataUtworzenia = new Date();
    producent.dataModyfikacji = producent.dataUtworzenia;
    return Manufacturers.insert(producent);
  },
});


export const usunProducenta = new ValidatedMethod({
  name: "producenci.usun",
  validate(documentId) {
    const zalogowanyUzytkownikId = Meteor.userId();
    if (zalogowanyUzytkownikId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      check(documentId, String);
      const producent = Manufacturers.findOne({ _id: documentId });
      // if (!producent || (producent.uzytkownikId !== zalogowanyUzytkownikId)) {
      //   throw new Meteor.Error("Błąd wywołania metody");
      // } else if (Models.find({ producentId: producent._id }).count() > 0) {
      //   throw new Meteor.Error("Błąd wywołania metody");
      // }
    }
  },
  run(documentId) {
    return Manufacturers.remove({ _id: documentId });
  },
});


export const aktualizujProducenta = new ValidatedMethod({
  name: "producenci.aktualizuj",
  validate({ documentId, daneFormularza }) {
    const zalogowanyUzytkownikId = Meteor.userId();
    if (zalogowanyUzytkownikId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      check(documentId, String);
      const kontekstWalidacji = manufacturerSchema.newContext();
      if (kontekstWalidacji.validate(daneFormularza) === true) {
        const producent = Manufacturers.findOne({ _id: documentId });
        if (!producent || (producent.uzytkownikId !== zalogowanyUzytkownikId)) {
          throw new Meteor.Error("Błąd wywołania metody");
        }
      } else {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run({ documentId, daneFormularza }) {
    return Manufacturers.update({ _id: documentId }, {
      $set: {
        nazwa: daneFormularza.nazwa,
        nazwaSortowalna: daneFormularza.nazwa.toLowerCase(),
        "adres.ulica": daneFormularza.adres.ulica,
        "adres.miejscowosc": daneFormularza.adres.miejscowosc,
        "adres.kodPocztowy": daneFormularza.adres.kodPocztowy,
        dodatkoweInformacje: daneFormularza.dodatkoweInformacje,
        dataModyfikacji: new Date(),
      },
    });
  },
});

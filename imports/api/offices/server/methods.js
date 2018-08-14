import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import Offices from "/imports/api/offices/offices.js";

export const insertOffice = new ValidatedMethod({
  name: "offices.insert",
  validate(office) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      office.uzytkownikId = actualUserId;
      const validationContext = Offices.simpleSchema().newContext();
      if (validationContext.validate(office) !== true) {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run(office) {
    office.uzytkownikId = Meteor.userId();
    office.dataUtworzenia = new Date();
    office.dataModyfikacji = office.dataUtworzenia;
    return Offices.insert(office);
  }
});

export const removeOffice = new ValidatedMethod({
  name: "offices.remove",
  validate(documentId) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      check(documentId, String);
      const office = Offices.findOne({
        uzytkownikId: actualUserId,
        _id: documentId
      });
      if (!office || office.uzytkownikId !== actualUserId) {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run(documentId) {
    return Offices.remove({ _id: documentId });
  }
});

export const updateOffice = new ValidatedMethod({
  name: "offices.update",
  validate({ documentId, formData }) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      check(documentId, String);
      const validationContext = Offices.simpleSchema().newContext();
      if (validationContext.validate(formData) === true) {
        const office = Offices.findOne({
          uzytkownikId: actualUserId,
          _id: documentId
        });
        if (!office || office.uzytkownikId !== actualUserId) {
          throw new Meteor.Error("Błąd wywołania metody");
        }
      } else {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run({ documentId, formData }) {
    return Offices.update(
      { _id: documentId },
      {
        $set: {
          nazwa: formData.nazwa,
          adresat: formData.adresat,
          kraj: formData.kraj,
          wojewodztwoId: formData.wojewodztwoId,
          gminaDzielnica: formData.gminaDzielnica,
          ulica: formData.ulica,
          nrDomu: formData.nrDomu,
          nrLokalu: formData.nrLokalu,
          miejscowosc: formData.miejscowosc,
          kodPocztowy: formData.kodPocztowy,
          poczta: formData.poczta,
          telefon: formData.telefon,
          email: formData.email,
          dodatkoweInformacje: formData.dodatkoweInformacje,
          dataModyfikacji: new Date()
        }
      }
    );
  }
});

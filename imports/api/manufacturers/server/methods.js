import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { check } from "meteor/check";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import Models from "/imports/api/models/models.js";

export const insertManufacturer = new ValidatedMethod({
  name: "manufacturers.insert",
  validate(manufacturer) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      manufacturer.uzytkownikId = actualUserId;
      const validationContext = Manufacturers.simpleSchema().newContext();
      if (validationContext.validate(manufacturer) !== true) {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run(manufacturer) {
    manufacturer.uzytkownikId = Meteor.userId();
    manufacturer.dataUtworzenia = new Date();
    manufacturer.dataModyfikacji = manufacturer.dataUtworzenia;
    return Manufacturers.insert(manufacturer);
  }
});

export const removeManufacturer = new ValidatedMethod({
  name: "manufacturers.remove",
  validate(documentId) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      check(documentId, String);
      const manufacturer = Manufacturers.findOne({
        uzytkownikId: actualUserId,
        _id: documentId
      });
      if (!manufacturer || manufacturer.uzytkownikId !== actualUserId) {
        throw new Meteor.Error("Błąd wywołania metody");
      } else if (
        Models.find({
          uzytkownikId: actualUserId,
          producentId: manufacturer._id
        }).count() > 0
      ) {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run(documentId) {
    return Manufacturers.remove({ _id: documentId });
  }
});

export const updateManufacturer = new ValidatedMethod({
  name: "manufacturers.update",
  validate({ documentId, formData }) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      check(documentId, String);
      const validationContext = Manufacturers.simpleSchema().newContext();
      if (validationContext.validate(formData) === true) {
        const manufacturer = Manufacturers.findOne({
          uzytkownikId: actualUserId,
          _id: documentId
        });
        if (!manufacturer || manufacturer.uzytkownikId !== actualUserId) {
          throw new Meteor.Error("Błąd wywołania metody");
        }
      } else {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run({ documentId, formData }) {
    return Manufacturers.update(
      { _id: documentId },
      {
        $set: {
          nazwa: formData.nazwa,
          "adres.ulica": formData.adres.ulica,
          "adres.miejscowosc": formData.adres.miejscowosc,
          "adres.kodPocztowy": formData.adres.kodPocztowy,
          dodatkoweInformacje: formData.dodatkoweInformacje,
          dataModyfikacji: new Date()
        }
      }
    );
  }
});

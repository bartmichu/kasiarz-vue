import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import Employees from "/imports/api/employees/employees.js";
import Shops from "/imports/api/shops/shops.js";

export const insertShop = new ValidatedMethod({
  name: "shops.insert",
  validate(shop) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      shop.uzytkownikId = actualUserId;
      const validationContext = Shops.simpleSchema().newContext();
      if (validationContext.validate(shop) !== true) {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run(shop) {
    shop.uzytkownikId = Meteor.userId();
    shop.dataUtworzenia = new Date();
    shop.dataModyfikacji = shop.dataUtworzenia;
    return Shops.insert(shop);
  }
});

export const removeShop = new ValidatedMethod({
  name: "shops.remove",
  validate(documentId) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      check(documentId, String);
      const shop = Shops.findOne({
        uzytkownikId: actualUserId,
        _id: documentId
      });
      if (!shop || shop.uzytkownikId !== actualUserId) {
        throw new Meteor.Error("Błąd wywołania metody");
      } else if (
        Employees.find({
          uzytkownikId: actualUserId,
          serwisId: shop._id
        }).count() > 0
      ) {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run(documentId) {
    return Shops.remove({ _id: documentId });
  }
});

export const updateShop = new ValidatedMethod({
  name: "shops.update",
  validate({ documentId, formData }) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      check(documentId, String);
      const validationContext = Shops.simpleSchema().newContext();
      if (validationContext.validate(formData) === true) {
        const shop = Shops.findOne({
          uzytkownikId: actualUserId,
          _id: documentId
        });
        if (!shop || shop.uzytkownikId !== actualUserId) {
          throw new Meteor.Error("Błąd wywołania metody");
        }
      } else {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run({ documentId, formData }) {
    return Shops.update(
      { _id: documentId },
      {
        $set: {
          nazwa: formData.nazwa,
          nip: formData.nip,
          regon: formData.regon,
          pesel: formData.pesel,
          kraj: formData.kraj,
          wojewodztwoId: formData.wojewodztwoId,
          gminaDzielnica: formData.gminaDzielnica,
          ulica: formData.ulica,
          nrDomu: formData.nrDomu,
          nrLokalu: formData.nrLokalu,
          miejscowosc: formData.miejscowosc,
          kodPocztowy: formData.kodPocztowy,
          poczta: formData.poczta,
          skrytkaPocztowa: formData.skrytkaPocztowa,
          telefon: formData.telefon,
          email: formData.email,
          dodatkoweInformacje: formData.dodatkoweInformacje,
          dataModyfikacji: new Date()
        }
      }
    );
  }
});

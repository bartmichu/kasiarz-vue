import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { check } from "meteor/check";
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
  },
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
        const shop = Shops.findOne({ _id: documentId });
        if (!shop || (shop.uzytkownikId !== actualUserId)) {
          throw new Meteor.Error("Błąd wywołania metody");
        }
      } else {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run({ documentId, formData }) {
    return Shops.update({ _id: documentId }, {
      $set: {
        nazwa: formData.nazwa,
        nip: formData.nip,
        regon: formData.regon,
        pesel: formData.pesel,
        "adres.kraj": formData.adres.kraj,
        "adres.wojewodztwoId": formData.adres.wojewodztwoId,
        "adres.gminaDzielnica": formData.adres.gminaDzielnica,
        "adres.ulica": formData.adres.ulica,
        "adres.nrDomu": formData.adres.nrDomu,
        "adres.nrLokalu": formData.adres.nrLokalu,
        "adres.miejscowosc": formData.adres.miejscowosc,
        "adres.kodPocztowy": formData.adres.kodPocztowy,
        "adres.poczta": formData.adres.poczta,
        "adres.skrytkaPocztowa": formData.adres.skrytkaPocztowa,
        telefon: formData.telefon,
        email: formData.email,
        dodatkoweInformacje: formData.dodatkoweInformacje,
        dataModyfikacji: new Date(),
      },
    });
  },
});


import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { check } from "meteor/check";
import Clients from "/imports/api/clients/clients.js";

export const insertClient = new ValidatedMethod({
  name: "clients.insert",
  validate(client) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      client.uzytkownikId = actualUserId;
      const validationContext = Clients.simpleSchema().newContext();
      if (validationContext.validate(client) !== true) {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run(client) {
    client.uzytkownikId = Meteor.userId();
    client.dataUtworzenia = new Date();
    client.dataModyfikacji = client.dataUtworzenia;
    return Clients.insert(client);
  }
});

export const removeClient = new ValidatedMethod({
  name: "clients.remove",
  validate(documentId) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      check(documentId, String);
      const client = Clients.findOne({
        uzytkownikId: actualUserId,
        _id: documentId
      });
      if (!client || client.uzytkownikId !== actualUserId) {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run(documentId) {
    return Clients.remove({ _id: documentId });
  }
});

export const updateClient = new ValidatedMethod({
  name: "clients.update",
  validate({ documentId, formData }) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      check(documentId, String);
      const validationContext = Clients.simpleSchema().newContext();
      if (validationContext.validate(formData) === true) {
        const client = Clients.findOne({
          uzytkownikId: actualUserId,
          _id: documentId
        });
        if (!client || client.uzytkownikId !== actualUserId) {
          throw new Meteor.Error("Błąd wywołania metody");
        }
      } else {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run({ documentId, formData }) {
    return Clients.update(
      { _id: documentId },
      {
        $set: {
          nazwa: formData.nazwa,
          nip: formData.nip,
          regonPesel: formData.regonPesel,
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
          dataModyfikacji: new Date()
        }
      }
    );
  }
});

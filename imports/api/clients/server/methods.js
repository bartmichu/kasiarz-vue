import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
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

import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { check } from "meteor/check";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import Models from "/imports/api/models/models.js";


export const insertModel = new ValidatedMethod({
  name: "models.insert",
  validate(model) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      const manufacturerId = model.producentId;
      check(manufacturerId, String);
      const manufacturer = Manufacturers.findOne({ _id: manufacturerId });
      if (!manufacturer || (manufacturer.uzytkownikId !== actualUserId)) {
        throw new Meteor.Error("Błąd wywołania metody");
      }

      model.uzytkownikId = actualUserId;

      const validationContext = Models.simpleSchema().newContext();
      if (validationContext.validate(model) !== true) {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run(model) {
    model.uzytkownikId = Meteor.userId();
    model.dataUtworzenia = new Date();
    model.dataModyfikacji = model.dataUtworzenia;
    return Models.insert(model);
  },
});


export const removeModel = new ValidatedMethod({
  name: "models.remove",
  validate(documentId) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      check(documentId, String);
      const model = Models.findOne({ _id: documentId });
      if (!model || (model.uzytkownikId !== actualUserId)) {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run(documentId) {
    return Models.remove({ _id: documentId });
  },
});


export const updateModel = new ValidatedMethod({
  name: "models.update",
  validate({ documentId, formData }) {
    const actualUserId = Meteor.userId();
    if (actualUserId === null) {
      throw new Meteor.Error("Błąd wywołania metody");
    } else {
      check(documentId, String);
      const validationContext = Models.simpleSchema().newContext();
      if (validationContext.validate(formData) === true) {
        const model = Models.findOne({ _id: documentId });
        if (!model || (model.uzytkownikId !== actualUserId)) {
          throw new Meteor.Error("Błąd wywołania metody");
        }
      } else {
        throw new Meteor.Error("Błąd wywołania metody");
      }
    }
  },
  run({ documentId, formData }) {
    return Models.update({ _id: documentId }, {
      $set: {
        nazwa: formData.nazwa,
        producentId: formData.producentId,
        dodatkoweInformacje: formData.dodatkoweInformacje,
        dataModyfikacji: new Date(),
      },
    });
  },
});

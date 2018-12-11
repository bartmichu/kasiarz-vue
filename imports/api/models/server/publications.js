import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import isNonEmptyString from "/imports/helpers/server/isNonEmptyString.js";
import Models from "/imports/api/models/models.js";

Meteor.publish("models.list", function publishFunction() {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Models.find({ uzytkownikId: actualUserId }, { fields: { nazwa: 1, producentId: 1, dataModyfikacji: 1 } });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("models.basic", function publishFunction() {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Models.find({ uzytkownikId: actualUserId }, { fields: { nazwa: 1 } });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("models.extended", function publishFunction() {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Models.find({ uzytkownikId: actualUserId }, { fields: { nazwa: 1, producentId: 1 } });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("models.one", function publishFunction(modelId) {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(modelId, isNonEmptyString);

    const data = Models.find({ uzytkownikId: actualUserId, _id: modelId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("models.manufacturer.basic", function publishFunction(manufacturerId) {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(manufacturerId, isNonEmptyString);

    const data = Models.find({ uzytkownikId: actualUserId, producentId: manufacturerId }, { fields: { nazwa: 1 } });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

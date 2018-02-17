import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { isNonEmptyString } from "/imports/util/server/server-functions.js";
import Models from "/imports/api/models/models.js";


Meteor.publish("models.all", function publishFunction() {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Models.find({ uzytkownikId: actualUserId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("models.modelFilter", function publishFunction(modelId) {
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

Meteor.publish("models.manufacturerFilter", function publishFunction(manufacturerId) {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(manufacturerId, isNonEmptyString);

    const data = Models.find({ uzytkownikId: actualUserId, producentId: manufacturerId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

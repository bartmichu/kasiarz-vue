import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import Models from "/imports/api/models/models.js";


Meteor.publish("models.private", (modelId, manufacturerId) => {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(modelId, Match.Maybe(String));
    check(manufacturerId, Match.Maybe(String));

    let data = null;

    if (modelId.length > 0) {
      data = Models.find({ uzytkownikId: actualUserId, _id: modelId });
    } else {
      if (manufacturerId.length > 0) {
        data = Models.find({ uzytkownikId: actualUserId, producentId: manufacturerId });
      } else {
        data = Models.find({ uzytkownikId: actualUserId });
      }
    }

    if (data) {
      return data;
    }
  }

  // TODO: sprawdzić jak to się ma do arrow function
  return this.ready();
});

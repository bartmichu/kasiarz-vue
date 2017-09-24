import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import Models from "/imports/api/models/models.js";


Meteor.publish("models.private", (manufacturer) => {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(manufacturer, Match.Maybe(String));

    let data = null;
    if (manufacturer.length > 0) {
      data = Models.find({ uzytkownikId: actualUserId, producentId: manufacturer });
    } else {
      data = Models.find({ uzytkownikId: actualUserId });
    }

    if (data) {
      return data;
    }
  }

  // TODO: sprawdzić jak to się ma do arrow function
  return this.ready();
});

import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import Models from "/imports/api/models/models.js";


Meteor.publish("models.private", (modelIdFilter, manufacturerIdFilter) => {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(modelIdFilter, Match.Maybe(String));
    check(manufacturerIdFilter, Match.Maybe(String));

    let data = null;

    if (modelIdFilter.length > 0) {
      data = Models.find({ uzytkownikId: actualUserId, _id: modelIdFilter });
    } else if (manufacturerIdFilter.length > 0) {
      data = Models.find({ uzytkownikId: actualUserId, producentId: manufacturerIdFilter });
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

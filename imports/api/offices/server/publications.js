import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Offices from "/imports/api/offices/offices.js";
import { isNonEmptyString } from "/imports/util/server/server-functions.js";


Meteor.publish("offices.all", function publishFunction() {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Offices.find({ uzytkownikId: actualUserId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("offices.officeFilter", function publishFunction(officeId) {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(officeId, isNonEmptyString);

    const data = Offices.find({ uzytkownikId: actualUserId, _id: officeId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

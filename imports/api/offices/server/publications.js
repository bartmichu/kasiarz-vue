import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Offices from "/imports/api/offices/offices.js";
import isNonEmptyString from "/imports/helpers/server/isNonEmptyString.js";

Meteor.publish("offices.list", function publishFunction() {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Offices.find(
      { uzytkownikId: actualUserId },
      { fields: { nazwa: 1, "adres.miejscowosc": 1, dataModyfikacji: 1 } }
    );

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("offices.one", function publishFunction(officeId) {
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

import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { isNonEmptyString } from "/imports/util/server/server-functions.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";


Meteor.publish("manufacturers.all", function publishFunction() {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Manufacturers.find({ uzytkownikId: actualUserId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("manufacturers.manufacturerFilter", function publishFunction(manufacturerId) {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(manufacturerId, isNonEmptyString);

    const data = Manufacturers.find({ uzytkownikId: actualUserId, _id: manufacturerId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import isNonEmptyString from "/imports/helpers/server/isNonEmptyString.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";

Meteor.publish("manufacturers.list", function publishFunction() {
  // TODO: remove in production
  Meteor._sleepForMs(1000);

  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Manufacturers.find(
      { uzytkownikId: actualUserId },
      {
        fields: {
          nazwa: 1,
          miejscowosc: 1,
          dataModyfikacji: 1
        }
      }
    );

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("manufacturers.basic", function publishFunction() {
  // TODO: remove in production
  Meteor._sleepForMs(1000);

  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Manufacturers.find({ uzytkownikId: actualUserId }, { fields: { nazwa: 1 } });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("manufacturers.one", function publishFunction(manufacturerId) {
  // TODO: remove in production
  Meteor._sleepForMs(1000);

  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(manufacturerId, isNonEmptyString);

    const data = Manufacturers.find({
      uzytkownikId: actualUserId,
      _id: manufacturerId
    });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

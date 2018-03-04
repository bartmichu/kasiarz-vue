import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Shops from "/imports/api/shops/shops.js";
import { isNonEmptyString } from "/imports/util/server/server-functions.js";


Meteor.publish("shops.list", function publishFunction() {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Shops.find({ uzytkownikId: actualUserId }, { fields: { nazwa: 1, nip: 1, dataModyfikacji: 1 } });

    if (data) {
      return data;
    }
  }

  return this.ready();
});


Meteor.publish("shops.basic", function publishFunction() {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Shops.find({ uzytkownikId: actualUserId }, { fields: { nazwa: 1 } });

    if (data) {
      return data;
    }
  }

  return this.ready();
});


Meteor.publish("shops.one", function publishFunction(shopId) {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(shopId, isNonEmptyString);

    const data = Shops.find({ uzytkownikId: actualUserId, _id: shopId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

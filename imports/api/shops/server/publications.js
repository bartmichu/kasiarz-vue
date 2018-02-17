import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Shops from "/imports/api/shops/shops.js";
import { isNonEmptyString } from "/imports/util/server/server-functions.js";


Meteor.publish("shops.all", function publishFunction() {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Shops.find({ uzytkownikId: actualUserId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("shops.shopFilter", function publishFunction(shopId) {
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

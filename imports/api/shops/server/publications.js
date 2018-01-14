import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import Shops from "/imports/api/shops/shops.js";


Meteor.publish("shops.private", (shopIdFilter) => {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(shopIdFilter, Match.Maybe(String));

    let data = null;

    if (shopIdFilter.length > 0) {
      data = Shops.find({ uzytkownikId: actualUserId, _id: shopIdFilter });
    } else {
      data = Shops.find({ uzytkownikId: actualUserId });
    }

    if (data) {
      return data;
    }
  }

  // TODO: sprawdzić jak to się ma do arrow function
  return this.ready();
});

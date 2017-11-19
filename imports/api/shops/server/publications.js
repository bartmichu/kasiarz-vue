import { Meteor } from "meteor/meteor";
import Shops from "/imports/api/shops/shops.js";


Meteor.publish("shops.private", () => {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Shops.find({ uzytkownikId: actualUserId });

    if (data) {
      return data;
    }
  }

  // TODO: sprawdzić jak to się ma do arrow function
  return this.ready();
});

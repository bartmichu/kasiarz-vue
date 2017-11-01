import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";


Meteor.publish("manufacturers.private", (manufacturerIdFilter) => {

  // symulacja opóźnienia połączenia
  // Meteor._sleepForMs(1000);

  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(manufacturerIdFilter, Match.Maybe(String));

    let data = null;

    if (manufacturerIdFilter.length > 0) {
      data = Manufacturers.find({ uzytkownikId: actualUserId, _id: manufacturerIdFilter });
    } else {
      data = Manufacturers.find({ uzytkownikId: actualUserId });
    }

    if (data) {
      return data;
    }
  }

  // TODO: sprawdzić jak to się ma do arrow function
  return this.ready();
});

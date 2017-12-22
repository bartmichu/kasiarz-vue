import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import Offices from "/imports/api/offices/offices.js";


Meteor.publish("offices.private", (officeIdFilter) => {
  // symulacja opóźnienia połączenia
  // Meteor._sleepForMs(1000);

  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(officeIdFilter, Match.Maybe(String));

    let data = null;

    if (officeIdFilter.length > 0) {
      data = Offices.find({ uzytkownikId: actualUserId, _id: officeIdFilter });
    } else {
      data = Offices.find({ uzytkownikId: actualUserId });
    }

    if (data) {
      return data;
    }
  }

  // TODO: sprawdzić jak to się ma do arrow function
  return this.ready();
});

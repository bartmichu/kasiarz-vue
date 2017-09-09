import { Meteor } from "meteor/meteor";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";


Meteor.publish("manufacturers.private", () => {
  // TODO usunąć w wersji produkcyjnej - symulacja opóźnienia połączenia
  Meteor._sleepForMs(1000);

  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Manufacturers.find({ uzytkownikId: actualUserId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

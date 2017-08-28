import { Meteor } from "meteor/meteor";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";


Meteor.publish("manufacturers.private", () => {
  const dane = Manufacturers.find({ uzytkownikId: Meteor.userId() });

  if (dane) {
    return dane;
  }

  return this.ready();
});

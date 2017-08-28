import { Meteor } from "meteor/meteor";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";


Meteor.publish("manufacturers.private", () => {
  const data = Manufacturers.find({ uzytkownikId: Meteor.userId() });

  if (data) {
    return data;
  }

  return this.ready();
});

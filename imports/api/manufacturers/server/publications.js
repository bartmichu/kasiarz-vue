import { Meteor } from "meteor/meteor";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";


Meteor.publish("manufacturers.private", () => {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Manufacturers.find({ uzytkownikId: actualUserId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

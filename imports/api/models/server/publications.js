import { Meteor } from "meteor/meteor";
import Models from "/imports/api/models/models.js";


Meteor.publish("models.private", () => {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Models.find({ uzytkownikId: actualUserId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

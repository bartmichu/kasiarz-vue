import { Meteor } from "meteor/meteor";
import Voivodeships from "/imports/api/voivodeships/voivodeships.js";

Meteor.publish("voivodeships.public", function publishFunction() {
  const data = Voivodeships.find({});

  if (data) {
    return data;
  }

  return this.ready();
});

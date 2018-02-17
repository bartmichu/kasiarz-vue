import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Clients from "/imports/api/clients/clients.js";
import { isNonEmptyString } from "/imports/util/server/server-functions.js";


Meteor.publish("clients.all", function publishFunction() {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Clients.find({ uzytkownikId: actualUserId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("clients.clientFilter", function publishFunction(clientId) {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(clientId, isNonEmptyString);

    const data = Clients.find({ uzytkownikId: actualUserId, _id: clientId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

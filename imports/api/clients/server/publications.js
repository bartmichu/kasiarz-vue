import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import Clients from "/imports/api/clients/clients.js";


Meteor.publish("clients.private", function publishFunction(clientIdFilter) {
  const actualUserId = Meteor.userId();

  if (actualUserId) {
    check(clientIdFilter, Match.Maybe(String));

    let data = null;

    if (clientIdFilter.length > 0) {
      data = Clients.find({ uzytkownikId: actualUserId, _id: clientIdFilter });
    } else {
      data = Clients.find({ uzytkownikId: actualUserId });
    }

    if (data) {
      return data;
    }
  }

  return this.ready();
});

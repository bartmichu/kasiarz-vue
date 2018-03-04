import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Clients from "/imports/api/clients/clients.js";
import { isNonEmptyString } from "/imports/util/server/server-functions.js";


Meteor.publish("clients.list", function publishFunction() {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Clients.find({ uzytkownikId: actualUserId }, { fields: { nazwa: 1, "adres.miejscowosc": 1, dataModyfikacji: 1 } });

    if (data) {
      return data;
    }
  }

  return this.ready();
});


Meteor.publish("clients.one", function publishFunction(clientId) {
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

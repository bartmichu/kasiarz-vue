import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Devices from "/imports/api/devices/devices.js";
import { isNonEmptyString } from "/imports/util/server/server-functions.js";


Meteor.publish("devices.list", function publishFunction() {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Devices.find({ uzytkownikId: actualUserId }, { fields: { modelId: 1, producentId: 1, klientId: 1, dataFiskalizacji: 1, dataModyfikacji: 1 } });

    if (data) {
      return data;
    }
  }

  return this.ready();
});


Meteor.publish("devices.one", function publishFunction(deviceId) {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(deviceId, isNonEmptyString);

    const data = Devices.find({ uzytkownikId: actualUserId, _id: deviceId });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

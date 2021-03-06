import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import Employees from "/imports/api/employees/employees.js";
import isNonEmptyString from "/imports/helpers/server/isNonEmptyString.js";

Meteor.publish("employees.list", function publishFunction() {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Employees.find({ uzytkownikId: actualUserId }, { fields: { imieNazwisko: 1, serwisId: 1, dataModyfikacji: 1 } });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("employees.extended", function publishFunction() {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    const data = Employees.find({ uzytkownikId: actualUserId }, { fields: { imieNazwisko: 1, "uprawnienia.modele": 1 } });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("employees.one", function publishFunction(employeeId) {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(employeeId, isNonEmptyString);

    const data = Employees.find({
      uzytkownikId: actualUserId,
      _id: employeeId
    });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("employees.shop.basic", function publishFunction(shopId) {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(shopId, isNonEmptyString);

    const data = Employees.find({ uzytkownikId: actualUserId, serwisId: shopId }, { fields: { imieNazwisko: 1 } });

    if (data) {
      return data;
    }
  }

  return this.ready();
});

Meteor.publish("employees.model.basic", function publishFunction(modelId) {
  const actualUserId = Meteor.userId();
  if (actualUserId) {
    check(modelId, isNonEmptyString);

    const data = Employees.find({ uzytkownikId: actualUserId, "uprawnienia.modele": modelId }, { fields: { imieNazwisko: 1 } });

    if (data) {
      return data;
    }
  }

  return this.ready();
});
